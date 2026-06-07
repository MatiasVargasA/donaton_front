import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../AuthContext';
import { apiDonaciones, apiLogistica } from '../../../api';
import toast from 'react-hot-toast';

export default function RegistroDonaciones() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const categoriaInicial = searchParams.get('categoria') || '';

  const navigate = useNavigate();

  const [donaciones, setDonaciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('TODAS');

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'ACEPTADA': return 'bg-success-subtle text-success border-success-subtle';
      case 'RECIBIDA':
      case 'EN_LOGISTICA': return 'bg-info-subtle text-info border-info-subtle';
      case 'PENDIENTE': return 'bg-warning-subtle text-warning border-warning-subtle';
      case 'RECHAZADA': return 'bg-danger-subtle text-danger border-danger-subtle';
      default: return 'bg-secondary-subtle text-secondary border-secondary-subtle';
    }
  };

  const matchesStatusFilter = (d, filter) => {
    if (filter === 'TODAS') return true;
    const estadoReal = d.estado || 'PENDIENTE';
    if (filter === 'PENDIENTE') return estadoReal === 'PENDIENTE';
    if (filter === 'RECIBIDA') return estadoReal === 'RECIBIDA' || estadoReal === 'EN_LOGISTICA';
    return estadoReal === filter;
  };



  const cargarDonaciones = async () => {
    try {
      const response = await apiDonaciones.get('/donaciones');
      setDonaciones(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      cargarDonaciones();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const eliminarDonacion = async (id) => {
    if (!window.confirm('¿Eliminar este registro?')) return;
    try {
      await apiDonaciones.delete(`/donaciones/${id}`);
      toast.success('Registro eliminado');
      cargarDonaciones();
    } catch (error) {
      console.error(error);
    }
  };

  const recibirEnAlmacen = async (id) => {
    try {
      const donacion = donaciones.find(d => d.id === id);
      if (!donacion) {
        toast.error('No se encontró la donación');
        return;
      }

      // 1. Actualizar estado en el microservicio de donaciones a EN_LOGISTICA
      await apiDonaciones.put(`/donaciones/${id}/estado?estado=EN_LOGISTICA`);

      // 2. Registrar el ingreso de recurso en apiLogistica (enriquecido)
      await apiLogistica.post('/recursos/ingresar', {
        donacionId: donacion.id,
        categoria: donacion.categoria || donacion.tipo || 'GENERAL',
        cantidadDisponible: parseInt(donacion.cantidad, 10),
        descripcion: donacion.descripcion || 'Sin descripción',
        nombreDonante: donacion.nombreDonante || donacion.origen || 'Anónimo',
        comuna: donacion.comuna || 'No especificada',
        direccionRetiro: donacion.direccionRetiro || 'No especificada',
        usuarioId: donacion.usuarioId || null,
        fechaIngreso: new Date().toISOString()
      });

      toast.success('Donación recibida en almacén y registrada en logística correctamente');
      cargarDonaciones();
    } catch (error) {
      console.error(error);
      toast.error('Error al recibir la donación en el almacén de logística');
    }
  };

  // Calculate real capacity based on total units RECIBIDA/EN_LOGISTICA (assuming 10 units = 1m²)
  const totalUnits = donaciones.filter(d => d.estado === 'RECIBIDA' || d.estado === 'EN_LOGISTICA').reduce((sum, d) => sum + (d.cantidad || 0), 0);
  const usedSquareMeters = Math.min(100, Math.floor(totalUnits / 10)); // max 100m²
  const capacityPercent = usedSquareMeters;

  return (
    <div className="p-3 p-md-4">
      {/* Dashboard Header & CTA */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 gap-3">
        <div>
          <h2 className="h3 fw-bold text-on-surface mb-2">Donaciones Entrantes</h2>
          <p className="text-on-surface-variant mb-0" style={{ maxWidth: '600px' }}>
            Visualiza todas las donaciones. Acepta en almacén las donaciones que ya fueron verificadas y aceptadas por la Municipalidad.
          </p>
        </div>
        <button
          className="btn btn-primary-custom d-flex align-items-center gap-2 shadow-sm"
          onClick={() => navigate('/nueva-donacion')}
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>inventory</span>
          Registrar Nueva Donación
        </button>
      </div>

      {/* Bento Layout */}
      <div className="row g-4">
        {/* Left Column (Main Table) */}
        <div className="col-12 col-xl-9">
          <div className="d-flex flex-column gap-4">

            {/* Smart Filters */}
            <div className="admin-card py-3 px-3 d-flex align-items-center gap-3 overflow-auto">
              <span className="small fw-bold text-secondary text-nowrap">Estado:</span>
              <div className="d-flex gap-2">
                <button onClick={() => setStatusFilter('TODAS')} className={`btn btn-sm rounded-pill px-4 ${statusFilter === 'TODAS' ? 'bg-primary text-white' : 'bg-surface-container-high text-on-surface-variant border-0'}`}>Todas</button>
                <button onClick={() => setStatusFilter('PENDIENTE')} className={`btn btn-sm rounded-pill px-4 ${statusFilter === 'PENDIENTE' ? 'bg-primary text-white' : 'bg-surface-container-high text-on-surface-variant border-0'}`}>Pendientes</button>
                <button onClick={() => setStatusFilter('ACEPTADA')} className={`btn btn-sm rounded-pill px-4 ${statusFilter === 'ACEPTADA' ? 'bg-primary text-white' : 'bg-surface-container-high text-on-surface-variant border-0'}`}>Aceptadas</button>
                <button onClick={() => setStatusFilter('RECIBIDA')} className={`btn btn-sm rounded-pill px-4 ${statusFilter === 'RECIBIDA' ? 'bg-primary text-white' : 'bg-surface-container-high text-on-surface-variant border-0'}`}>Recibidas</button>
              </div>
              <div className="ms-auto d-flex gap-2 ps-3 border-start">
                <button className="btn btn-icon-sm border rounded-3 text-secondary p-2">
                  <span className="material-symbols-outlined small">download</span>
                </button>
              </div>
            </div>

            {/* Detailed Inventory Table */}
            <div className="admin-card p-0 overflow-hidden shadow-sm">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="bg-surface-container-low border-bottom">
                    <tr>
                      <th className="px-4 py-3 small fw-bold text-secondary text-uppercase tracking-wider border-0">Nombre del Ítem</th>
                      <th className="px-4 py-3 small fw-bold text-secondary text-uppercase tracking-wider border-0">Cantidad</th>
                      <th className="px-4 py-3 small fw-bold text-secondary text-uppercase tracking-wider border-0">Origen</th>
                      <th className="px-4 py-3 small fw-bold text-secondary text-uppercase tracking-wider border-0">Estado</th>
                      <th className="px-4 py-3 border-0">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {donaciones.filter(d => matchesStatusFilter(d, statusFilter)).length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center py-5 text-secondary">No hay donaciones que coincidan.</td>
                      </tr>
                    ) : (
                      donaciones
                        .filter(d => matchesStatusFilter(d, statusFilter))
                        .map((d) => {
                          const estadoReal = d.estado || 'PENDIENTE';
                          return (
                            <tr key={d.id} className="transition-all hover-bg-light align-middle">
                              <td className="px-4 py-3">
                                <div className="d-flex align-items-center gap-3">
                                  <div className="rounded-3 bg-primary-subtle p-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                    <span className="material-symbols-outlined text-primary">package_2</span>
                                  </div>
                                  <div>
                                    <p className="small fw-bold text-dark mb-0">{d.categoria || d.tipo || 'General'}</p>
                                    <p className="small text-secondary mb-0">{d.descripcion || 'Sin descripción'}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3 small fw-bold text-dark">{d.cantidad} Unid.</td>
                              <td className="px-4 py-3">
                                <div className="d-flex align-items-center gap-2">
                                  <span className="small fw-bold text-primary">{d.nombreDonante || d.origen || 'Anónimo'}</span>
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <span className={`badge rounded-pill px-3 py-1 border ${getStatusBadgeClass(estadoReal)}`}>
                                  {estadoReal}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-end">
                                {estadoReal === 'ACEPTADA' ? (
                                  <button
                                    onClick={() => recibirEnAlmacen(d.id)}
                                    className="btn btn-info btn-sm text-white fw-bold px-3 rounded-pill"
                                  >
                                    Recibir en Almacén
                                  </button>
                                ) : (
                                  <span className="small text-secondary">
                                    {(estadoReal === 'RECIBIDA' || estadoReal === 'EN_LOGISTICA') ? 'En Stock' : 'Solo Visualización'}
                                  </span>
                                )}
                              </td>
                            </tr>
                          );
                        })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Panels) */}
        <div className="col-12 col-xl-3">
          <div className="d-flex flex-column gap-4">
            {/* Warehouse Capacity */}
            <div className="admin-card bg-primary text-white border-0">
              <h3 className="small fw-bold mb-4 opacity-75 text-uppercase">Ocupación Almacén (100 m²)</h3>
              <div className="d-flex justify-content-center mb-4">
                <div className="rounded-circle border border-5 border-primary-subtle d-flex align-items-center justify-content-center" style={{ width: '120px', height: '120px' }}>
                  <h4 className="mb-0 fw-bold">{capacityPercent}%</h4>
                </div>
              </div>
              <div className="row text-center g-0">
                <div className="col-6 border-end border-white border-opacity-10">
                  <p className="small mb-0 opacity-50">LIBRE</p>
                  <p className="fw-bold mb-0">{100 - usedSquareMeters} m²</p>
                </div>
                <div className="col-6">
                  <p className="small mb-0 opacity-50">USADO</p>
                  <p className="fw-bold mb-0">{usedSquareMeters} m²</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .hover-text-danger:hover { color: #dc3545!important; }
      `}</style>
    </div>
  );
}
