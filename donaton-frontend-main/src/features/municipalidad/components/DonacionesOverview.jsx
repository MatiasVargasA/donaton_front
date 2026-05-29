import { useState, useEffect } from 'react';
import { apiDonaciones } from '../../../api';
import toast from 'react-hot-toast';

export default function DonacionesOverview() {
  const [donaciones, setDonaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedStatus, setSelectedStatus] = useState('Todos');

  const cargarDonaciones = async () => {
    setLoading(true);
    try {
      const response = await apiDonaciones.get('/donaciones/estado/PENDIENTE');
      setDonaciones(response.data);
    } catch (error) {
      console.error(error);
      toast.error('Error de conexión con el servicio de donaciones');
      setDonaciones([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      cargarDonaciones();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const getDonationStatus = (id, estadoBackend) => {
    return estadoBackend || 'PENDIENTE';
  };

  const getStatusBadge = (status) => {
    const s = status ? status.toUpperCase() : '';
    if (s === 'PENDIENTE') {
      return (
        <span className="badge bg-warning bg-opacity-10 text-warning rounded-pill px-3 py-2 border border-warning border-opacity-25 d-inline-flex align-items-center gap-1">
          <span className="bg-warning rounded-circle" style={{ width: '6px', height: '6px' }}></span>
          Pendiente
        </span>
      );
    }
    if (s === 'ACEPTADA') {
      return (
        <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-2 border border-success border-opacity-25 d-inline-flex align-items-center gap-1">
          <span className="bg-success rounded-circle" style={{ width: '6px', height: '6px' }}></span>
          Aceptada
        </span>
      );
    }
    if (s === 'RECHAZADA') {
      return (
        <span className="badge bg-danger bg-opacity-10 text-danger rounded-pill px-3 py-2 border border-danger border-opacity-25 d-inline-flex align-items-center gap-1">
          <span className="bg-danger rounded-circle" style={{ width: '6px', height: '6px' }}></span>
          Rechazada
        </span>
      );
    }
    return <span className="badge bg-secondary">{status}</span>;
  };

  // Clasificar de forma simplificada el tipo de ayuda en categorías principales
  const getCategory = (tipoHelp) => {
    const text = tipoHelp.toLowerCase();
    if (text.includes('aliment') || text.includes('agua') || text.includes('comida') || text.includes('bebida')) {
      return { name: 'Food & Nutrition', color: 'text-orange', bg: 'bg-orange-subtle', icon: 'restaurant' };
    }
    if (text.includes('med') || text.includes('insumo') || text.includes('salud') || text.includes('doctor') || text.includes('kit')) {
      return { name: 'Medical Supplies', color: 'text-success', bg: 'bg-success-subtle', icon: 'medical_services' };
    }
    if (text.includes('ropa') || text.includes('abrig') || text.includes('manta') || text.includes('tents') || text.includes('carpa') || text.includes('pallet')) {
      return { name: 'Emergency Shelter', color: 'text-primary', bg: 'bg-primary-subtle', icon: 'holiday_village' };
    }
    return { name: 'Otros Suministros', color: 'text-secondary', bg: 'bg-secondary-subtle', icon: 'package_2' };
  };

  // Validación de una donación
  const handleValidate = async (id, status) => {
    try {
      await apiDonaciones.put(`/donaciones/${id}/estado`, {
        nuevoEstado: status,
        mensajeMunicipalidad: `Estado actualizado a ${status}`
      });
      toast.success(`¡Donación ${status.toLowerCase()} correctamente!`);
      cargarDonaciones();
    } catch (error) {
      console.error(error);
      toast.error('Error al actualizar estado de la donación');
    }
  };

  // Exportar a CSV simulado
  const handleExportCSV = () => {
    if (donaciones.length === 0) {
      toast.error('No hay datos para exportar');
      return;
    }
    const headers = ['ID', 'Donante', 'Item', 'Cantidad', 'Estado', 'Fecha'];
    const rows = donaciones.map(d => [
      d.id,
      d.nombreDonante || d.origen || '',
      d.categoria || d.tipo || '',
      d.cantidad,
      getDonationStatus(d.id, d.estado),
      d.fechaCreacion || new Date().toISOString().split('T')[0]
    ]);

    const csvContent = "data:text/csv;charset=utf-8,"
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `donaciones_municipalidad_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Descarga de CSV iniciada');
  };

  // Filtrar donaciones
  const filteredDonaciones = donaciones.filter(d => {
    // Filtro por término de búsqueda (Donante u Origen)
    const matchesSearch = (d.nombreDonante || d.origen || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (d.categoria || d.tipo || '').toLowerCase().includes(searchTerm.toLowerCase());

    // Filtro por categoría
    const categoryInfo = getCategory(d.categoria || d.tipo || '');
    const matchesCategory = selectedCategory === 'Todas' || categoryInfo.name === selectedCategory;

    // Filtro por estado
    const status = getDonationStatus(d.id, d.estado);
    const matchesStatus = selectedStatus === 'Todos' ||
      (selectedStatus === 'PENDIENTE' && status === 'PENDIENTE') ||
      (selectedStatus === 'ACEPTADA' && status === 'ACEPTADA') ||
      (selectedStatus === 'RECHAZADA' && status === 'RECHAZADA');

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="p-3 p-md-4 bg-light min-vh-100">
      <div className="container-fluid max-w-container px-0">

        {/* Heading & Global Actions */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-4">
          <div>
            <h2 className="h3 fw-bold text-dark mb-1">Resumen de Donaciones</h2>
            <p className="text-secondary mb-0">
              Seguimiento de inventario en tiempo real y ayuda humanitaria entrante para el Distrito Metropolitano.
            </p>
          </div>
          <button
            onClick={handleExportCSV}
            className="btn btn-outline-primary d-flex align-items-center gap-2 shadow-sm fw-bold border-2"
            style={{ borderRadius: '0.75rem' }}
          >
            <span className="material-symbols-outlined fs-5">download</span>
            Descargar CSV
          </button>
        </div>

        {/* Bento Filters Grid */}
        <div className="row g-3 mb-4">
          <div className="col-12 col-md-3">
            <div className="card border-0 shadow-sm p-3 bg-white h-100" style={{ borderRadius: '1rem' }}>
              <label className="small fw-bold text-secondary text-uppercase tracking-wider mb-2">Buscar Inventario</label>
              <div className="position-relative">
                <span className="material-symbols-outlined position-absolute top-50 start-0 translate-middle-y ms-2 text-primary">search</span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Donante o artículo..."
                  className="form-control form-control-sm border-0 border-bottom rounded-0 ps-5 bg-transparent shadow-none"
                  style={{ borderBottom: '1px solid #ced4da !important' }}
                />
              </div>
            </div>
          </div>

          <div className="col-12 col-md-3">
            <div className="card border-0 shadow-sm p-3 bg-white h-100" style={{ borderRadius: '1rem' }}>
              <label className="small fw-bold text-secondary text-uppercase tracking-wider mb-2">Categoría</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="form-select form-select-sm border-0 bg-transparent font-semibold shadow-none cursor-pointer"
              >
                <option value="Todas">Todas las Categorías</option>
                <option value="Medical Supplies">Suministros Médicos</option>
                <option value="Food & Nutrition">Alimentos y Nutrición</option>
                <option value="Emergency Shelter">Refugio de Emergencia</option>
                <option value="Otros Suministros">Otros Suministros</option>
              </select>
            </div>
          </div>

          <div className="col-12 col-md-3">
            <div className="card border-0 shadow-sm p-3 bg-white h-100" style={{ borderRadius: '1rem' }}>
              <label className="small fw-bold text-secondary text-uppercase tracking-wider mb-2">Estado</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="form-select form-select-sm border-0 bg-transparent font-semibold shadow-none cursor-pointer"
              >
                <option value="Todos">Todos los Estados</option>
                <option value="PENDIENTE">Pendiente</option>
                <option value="ACEPTADA">Aceptada</option>
                <option value="RECHAZADA">Rechazada</option>
              </select>
            </div>
          </div>

          <div className="col-12 col-md-3">
            <div className="card border-0 shadow-sm p-3 bg-white h-100" style={{ borderRadius: '1rem' }}>
              <label className="small fw-bold text-secondary text-uppercase tracking-wider mb-2">Rango de Fecha</label>
              <div className="d-flex align-items-center gap-2 pt-1">
                <span className="material-symbols-outlined text-secondary fs-5">calendar_month</span>
                <span className="small fw-bold text-dark">Últimos 30 días</span>
              </div>
            </div>
          </div>
        </div>

        {/* Donation Table Card */}
        <div className="card border-0 shadow-sm bg-white overflow-hidden mb-4" style={{ borderRadius: '1.25rem' }}>
          <div className="table-responsive">
            <table className="table align-middle table-hover mb-0">
              <thead className="bg-light">
                <tr className="border-bottom text-secondary">
                  <th className="px-4 py-3 small fw-bold text-uppercase border-0">Donante</th>
                  <th className="px-4 py-3 small fw-bold text-uppercase border-0">Detalle del Ítem</th>
                  <th className="px-4 py-3 small fw-bold text-uppercase border-0">Cantidad</th>
                  <th className="px-4 py-3 small fw-bold text-uppercase border-0">Estado</th>
                  <th className="px-4 py-3 small fw-bold text-uppercase border-0">Fecha de Recibo</th>
                  <th className="px-4 py-3 small fw-bold text-uppercase text-end border-0">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-5">
                      <div className="spinner-border text-primary spinner-border-sm me-2" role="status"></div>
                      <span className="text-secondary small">Cargando donaciones...</span>
                    </td>
                  </tr>
                ) : filteredDonaciones.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-5 text-secondary small">
                      No se encontraron donaciones con los filtros seleccionados.
                    </td>
                  </tr>
                ) : (
                  filteredDonaciones.map((d) => {
                    const tipoLabel = d.categoria || d.tipo || 'General';
                    const cat = getCategory(tipoLabel);
                    const status = getDonationStatus(d.id, d.estado);
                    const donante = d.nombreDonante || d.origen || 'Anónimo';
                    return (
                      <tr key={d.id} className="transition-all hover-bg-light">
                        <td className="px-4 py-3">
                          <div className="d-flex align-items-center gap-3">
                            <div className="rounded-3 bg-light p-2 d-flex align-items-center justify-content-center text-primary" style={{ width: '40px', height: '40px' }}>
                              <span className="material-symbols-outlined">{donante.length > 12 ? 'corporate_fare' : 'person'}</span>
                            </div>
                            <div>
                              <p className="small fw-bold text-dark mb-0">{donante}</p>
                              <p className="small text-secondary mb-0" style={{ fontSize: '0.8rem' }}>
                                {donante.length > 12 ? 'Organización Partner' : 'Donante Individual'}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="d-flex flex-column">
                            <span className="small fw-bold text-dark">{tipoLabel}</span>
                            <span className={`badge ${cat.bg} ${cat.color} rounded px-2 py-1 small align-self-start mt-1`} style={{ fontSize: '0.65rem' }}>
                              {cat.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="small fw-bold text-dark">{d.cantidad} <span className="text-secondary fw-normal">U.</span></span>
                        </td>
                        <td className="px-4 py-3">
                          {getStatusBadge(status)}
                        </td>
                        <td className="px-4 py-3 text-secondary small">
                          {d.fechaCreacion || '22 May 2026'}
                        </td>
                        <td className="px-4 py-3 text-end">
                          {status === 'PENDIENTE' ? (
                            <div className="d-flex gap-2 justify-content-end">
                              <button
                                onClick={() => handleValidate(d.id, 'ACEPTADA')}
                                className="btn btn-success btn-sm fw-bold px-3 py-1 text-white shadow-sm"
                                style={{ borderRadius: '0.5rem' }}
                              >
                                Aceptar
                              </button>
                              <button
                                onClick={() => handleValidate(d.id, 'RECHAZADA')}
                                className="btn btn-danger btn-sm fw-bold px-3 py-1 text-white shadow-sm"
                                style={{ borderRadius: '0.5rem' }}
                              >
                                Rechazar
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => toast.success(`Detalles de la donación #${d.id}`)}
                              className="btn btn-link btn-sm text-primary fw-bold text-decoration-none"
                            >
                              Detalles
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Table Pagination */}
          <div className="card-footer bg-light px-4 py-3 border-0 d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
            <p className="small text-secondary mb-0">
              Mostrando <span className="fw-bold">{filteredDonaciones.length}</span> donaciones
            </p>
            <div className="d-flex gap-1">
              <button className="btn btn-outline-secondary btn-sm rounded px-3" disabled>
                Anterior
              </button>
              <button className="btn btn-primary btn-sm rounded px-3 text-white">1</button>
              <button className="btn btn-outline-secondary btn-sm rounded px-3" disabled>
                Siguiente
              </button>
            </div>
          </div>
        </div>

        {/* Stats overlay section */}
        <div className="row g-4 mb-4">
          {/* Chart Cards */}
          <div className="col-12 col-lg-8">
            <div className="card border-0 shadow-sm p-4 bg-white" style={{ borderRadius: '1.25rem' }}>
              <h3 className="h6 fw-bold text-dark mb-4">Tendencias de Distribución Semanal</h3>

              <div className="d-flex align-items-end justify-content-between gap-2 px-2" style={{ height: '200px' }}>
                <div className="flex-grow-1 bg-light rounded-top position-relative group hover-bg-primary" style={{ height: '40%', transition: 'all 0.2s' }}>
                  <span className="position-absolute top-0 start-50 translate-middle-x mt-n4 small fw-bold opacity-0 group-hover-opacity-100">420</span>
                </div>
                <div className="flex-grow-1 bg-light rounded-top position-relative group hover-bg-primary" style={{ height: '65%', transition: 'all 0.2s' }}>
                  <span className="position-absolute top-0 start-50 translate-middle-x mt-n4 small fw-bold opacity-0 group-hover-opacity-100">680</span>
                </div>
                <div className="flex-grow-1 bg-primary rounded-top position-relative group" style={{ height: '85%' }}>
                  <span className="position-absolute text-dark top-0 start-50 translate-middle-x mt-n4 small fw-bold">950</span>
                </div>
                <div className="flex-grow-1 bg-light rounded-top position-relative group hover-bg-primary" style={{ height: '55%', transition: 'all 0.2s' }}>
                  <span className="position-absolute top-0 start-50 translate-middle-x mt-n4 small fw-bold opacity-0 group-hover-opacity-100">580</span>
                </div>
                <div className="flex-grow-1 bg-light rounded-top position-relative group hover-bg-primary" style={{ height: '92%', transition: 'all 0.2s' }}>
                  <span className="position-absolute top-0 start-50 translate-middle-x mt-n4 small fw-bold opacity-0 group-hover-opacity-100">1020</span>
                </div>
                <div className="flex-grow-1 bg-light rounded-top position-relative group hover-bg-primary" style={{ height: '75%', transition: 'all 0.2s' }}>
                  <span className="position-absolute top-0 start-50 translate-middle-x mt-n4 small fw-bold opacity-0 group-hover-opacity-100">820</span>
                </div>
                <div className="flex-grow-1 bg-light rounded-top position-relative group hover-bg-primary" style={{ height: '60%', transition: 'all 0.2s' }}>
                  <span className="position-absolute top-0 start-50 translate-middle-x mt-n4 small fw-bold opacity-0 group-hover-opacity-100">640</span>
                </div>
              </div>

              <div className="d-flex justify-content-between mt-3 text-uppercase text-secondary fw-bold px-2" style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                <span>Lun</span><span>Mar</span><span>Mié</span><span>Jue</span><span>Vie</span><span>Sáb</span><span>Dom</span>
              </div>
            </div>
          </div>

          {/* Storage capacity card */}
          <div className="col-12 col-lg-4">
            <div className="card border-0 shadow-sm p-4 bg-white h-100 d-flex flex-column justify-content-between" style={{ borderRadius: '1.25rem' }}>
              <div>
                <h3 className="h6 fw-bold text-primary mb-1">Capacidad de Almacén</h3>
                <p className="small text-secondary mb-0">Centro de Acopio Principal</p>
              </div>

              <div className="my-4">
                <div className="d-flex justify-content-between mb-2">
                  <span className="small fw-bold text-dark">Espacio Total Utilizado</span>
                  <span className="small fw-bold text-dark">78%</span>
                </div>
                <div className="progress rounded-pill bg-light" style={{ height: '12px' }}>
                  <div
                    className="progress-bar rounded-pill bg-warning shadow-sm"
                    role="progressbar"
                    style={{ width: '78%' }}
                    aria-valuenow="78"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>

              <button
                onClick={() => toast.success('Gestión de Almacén Abierta')}
                className="btn btn-primary btn-lg w-100 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2 py-3"
                style={{ borderRadius: '0.75rem' }}
              >
                <span className="material-symbols-outlined">warehouse</span>
                Gestionar Almacén
              </button>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .bg-orange-subtle { background-color: #ffe8d6; }
        .text-orange { color: #fd7e14; }
        .hover-bg-primary:hover { background-color: var(--bs-primary-bg-subtle) !important; cursor: pointer; }
        .group:hover span { opacity: 1 !important; }
        .transition-all { transition: all 0.2s ease-in-out; }
      `}</style>
    </div>
  );
}
