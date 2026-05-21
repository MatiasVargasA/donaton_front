import React, { useState, useEffect } from 'react';
import { apiDonaciones } from '../../../api';
import toast from 'react-hot-toast';

export default function RegistroDonaciones() {
  const [formData, setFormData] = useState({
    tipo: '',
    cantidad: '',
    origen: ''
  });

  const [donaciones, setDonaciones] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    cargarDonaciones();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await apiDonaciones.post('/donaciones', formData);
      if (response.status === 200 || response.status === 201) {
        toast.success('Donación registrada correctamente');
        setFormData({ tipo: '', cantidad: '', origen: '' });
        cargarDonaciones();
      } else {
        toast.error('Error al registrar donación');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error de conexión con el servicio de donaciones');
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <div className="p-3 p-md-4">
      {/* Dashboard Header & CTA */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 gap-3">
        <div>
          <h2 className="h3 fw-bold text-on-surface mb-2">Gestión de Inventario</h2>
          <p className="text-on-surface-variant mb-0" style={{ maxWidth: '600px' }}>
            Administre el flujo de recursos humanitarios con trazabilidad completa y monitoreo de stock en tiempo real.
          </p>
        </div>
        <button
          className="btn btn-primary-custom d-flex align-items-center gap-2 shadow-sm"
          data-bs-toggle="modal"
          data-bs-target="#registroModal"
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
              <span className="small fw-bold text-secondary text-nowrap">Categorías:</span>
              <div className="d-flex gap-2">
                <button className="btn btn-sm rounded-pill px-4 bg-primary text-white">Todos</button>
                <button className="btn btn-sm rounded-pill px-4 bg-surface-container-high text-on-surface-variant border-0">Alimentos</button>
                <button className="btn btn-sm rounded-pill px-4 bg-surface-container-high text-on-surface-variant border-0">Insumos Médicos</button>
              </div>
              <div className="ms-auto d-flex gap-2 ps-3 border-start">
                <button className="btn btn-icon-sm border rounded-3 text-secondary p-2">
                  <span className="material-symbols-outlined small">filter_list</span>
                </button>
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
                      <th className="px-4 py-3 small fw-bold text-secondary text-uppercase tracking-wider border-0">Fecha</th>
                      <th className="px-4 py-3 small fw-bold text-secondary text-uppercase tracking-wider border-0">Origen</th>
                      <th className="px-4 py-3 border-0"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {donaciones.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center py-5 text-secondary">No hay registros aún.</td>
                      </tr>
                    ) : (
                      donaciones.map((d) => (
                        <tr key={d.id} className="transition-all hover-bg-light">
                          <td className="px-4 py-3">
                            <div className="d-flex align-items-center gap-3">
                              <div className="rounded-3 bg-primary-subtle p-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                <span className="material-symbols-outlined text-primary">package_2</span>
                              </div>
                              <div>
                                <p className="small fw-bold text-dark mb-0">{d.tipo}</p>
                                <p className="small text-secondary mb-0">Suministro General</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 small fw-bold text-dark">{d.cantidad} Unid.</td>
                          <td className="px-4 py-3 small text-secondary">Reciente</td>
                          <td className="px-4 py-3">
                            <div className="d-flex align-items-center gap-2">
                              <div className="bg-primary rounded-circle" style={{ width: '8px', height: '8px' }}></div>
                              <span className="small fw-bold text-primary">{d.origen}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-end">
                            <button
                              onClick={() => eliminarDonacion(d.id)}
                              className="btn btn-link text-secondary hover-text-danger p-0"
                            >
                              <span className="material-symbols-outlined">delete</span>
                            </button>
                          </td>
                        </tr>
                      ))
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
            {/* Critical Stock Panel */}
            <div className="admin-card border-danger bg-danger-subtle p-4 position-relative overflow-hidden">
              <span className="material-symbols-outlined position-absolute top-0 end-0 p-3 opacity-10" style={{ fontSize: '4rem' }}>warning</span>
              <h3 className="h6 fw-bold text-danger mb-3 d-flex align-items-center gap-2">
                <span className="material-symbols-outlined">emergency</span>
                Alertas de Stock
              </h3>
              <div className="d-flex flex-column gap-3">
                <div className="bg-white p-3 rounded-3 shadow-sm border-0">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="small fw-bold text-dark">Agua Potable</span>
                    <span className="text-danger fw-bold small">8%</span>
                  </div>
                  <div className="progress" style={{ height: '4px' }}>
                    <div className="progress-bar bg-danger" style={{ width: '8%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Warehouse Capacity */}
            <div className="admin-card bg-primary text-white border-0">
              <h3 className="small fw-bold mb-4 opacity-75 text-uppercase">Ocupación Almacén</h3>
              <div className="d-flex justify-content-center mb-4">
                <div className="rounded-circle border border-5 border-primary-subtle d-flex align-items-center justify-content-center" style={{ width: '120px', height: '120px' }}>
                  <h4 className="mb-0 fw-bold">74%</h4>
                </div>
              </div>
              <div className="row text-center g-0">
                <div className="col-6 border-end border-white border-opacity-10">
                  <p className="small mb-0 opacity-50">LIBRE</p>
                  <p className="fw-bold mb-0">260 m²</p>
                </div>
                <div className="col-6">
                  <p className="small mb-0 opacity-50">USADO</p>
                  <p className="fw-bold mb-0">740 m²</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Registro Modal */}
      <div className="modal fade" id="registroModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '1.5rem' }}>
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-bold text-primary">Nueva Donación</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body p-4">
                <div className="mb-3">
                  <label className="form-label small fw-bold text-secondary text-uppercase">Tipo de Ayuda</label>
                  <input
                    type="text"
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                    required
                    placeholder="Ej: Alimentos No Perecibles"
                    className="form-control form-control-lg bg-light border-0"
                    style={{ borderRadius: '0.75rem' }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-bold text-secondary text-uppercase">Cantidad</label>
                  <input
                    type="number"
                    name="cantidad"
                    value={formData.cantidad}
                    onChange={handleChange}
                    required
                    placeholder="0"
                    className="form-control form-control-lg bg-light border-0"
                    style={{ borderRadius: '0.75rem' }}
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label small fw-bold text-secondary text-uppercase">Origen</label>
                  <input
                    type="text"
                    name="origen"
                    value={formData.origen}
                    onChange={handleChange}
                    required
                    placeholder="Ej: Particular / Empresa"
                    className="form-control form-control-lg bg-light border-0"
                    style={{ borderRadius: '0.75rem' }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 fw-bold shadow-sm"
                  style={{ borderRadius: '0.75rem' }}
                  disabled={loading}
                >
                  {loading ? 'Procesando...' : 'Registrar Ingreso'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .hover-text-danger:hover { color: #dc3545!important; }
        .modal-backdrop.show { opacity: 0.2; }
      `}</style>
    </div>
  );
}
