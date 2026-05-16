import React, { useState, useEffect } from 'react';
import { apiLogistica, apiNecesidades } from '../api';
import toast from 'react-hot-toast';

export default function GestionLogistica() {
  const [envios, setEnvios] = useState([]);
  const [necesidades, setNecesidades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    destino: '',
    transporte: 'Camión Institucional',
    cantidad: '',
    estado: 'PENDIENTE'
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [resEnvios, resNecesidades] = await Promise.all([
        apiLogistica.get('/logistica'),
        apiNecesidades.get('/necesidades')
      ]);
      setEnvios(resEnvios.data);
      setNecesidades(resNecesidades.data);
    } catch (error) {
      console.error(error);
      toast.error('Error al cargar datos logísticos');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await apiLogistica.post('/logistica', formData);
      if (response.status === 200 || response.status === 201) {
        toast.success('Envío programado correctamente');
        setFormData({
          destino: '',
          transporte: 'Camión Institucional',
          cantidad: '',
          estado: 'PENDIENTE'
        });
        // Close modal if using one (Bootstrap modal requires JS or state-driven toggle)
        const modalElement = document.getElementById('despachoModal');
        const modal = window.bootstrap.Modal.getInstance(modalElement);
        if (modal) modal.hide();
        
        cargarDatos();
      }
    } catch (error) {
      console.error(error);
      toast.error('Error al registrar el envío');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 p-md-4">
      {/* Header & Filters Section */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 gap-3">
        <div>
          <h2 className="h3 fw-bold text-on-surface mb-1">Panel de Logística y Distribución</h2>
          <p className="text-on-surface-variant mb-0">Gestión operativa en tiempo real de recursos y flotas.</p>
        </div>
        <div className="d-flex flex-wrap gap-3">
          <div className="d-flex flex-column gap-1">
            <span className="small fw-bold text-secondary text-uppercase" style={{ fontSize: '10px' }}>Filtrar por Urgencia</span>
            <select className="form-select form-select-sm rounded-3 bg-surface-container-low border-outline-variant">
              <option>Todas las prioridades</option>
              <option>Crítica (Nivel 1)</option>
              <option>Alta (Nivel 2)</option>
              <option>Estándar</option>
            </select>
          </div>
          <button 
            className="btn btn-secondary-custom d-flex align-items-center gap-2 shadow-sm align-self-end"
            data-bs-toggle="modal" 
            data-bs-target="#despachoModal"
          >
            <span className="material-symbols-outlined">add_task</span>
            Nuevo Despacho
          </button>
        </div>
      </div>

      <div className="row g-4">
        {/* Column 1: Storage Hubs & Fleet */}
        <div className="col-12 col-xl-4 flex flex-column gap-4">
          <div className="d-flex flex-column gap-4">
            
            {/* Storage Hubs */}
            <div className="admin-card">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="h6 fw-bold mb-0">Centros de Acopio</h3>
                <span className="material-symbols-outlined text-primary">warehouse</span>
              </div>
              <div className="d-flex flex-column gap-4">
                <HubIndicator label="Hub Norte - Monterrey" percent={92} status="error" subtext="Capacidad Crítica: 1200m² restantes." />
                <HubIndicator label="Puerto Central - Veracruz" percent={45} status="tertiary" subtext="Operación estable: Flujo constante." />
                <HubIndicator label="Base Sur - Chiapas" percent={78} status="secondary" subtext="Carga alta: Priorizar despachos." />
              </div>
              <button className="btn btn-outline-primary w-100 mt-4 rounded-3 fw-bold small py-2">Ver todos los hubs</button>
            </div>

            {/* Fleet Management */}
            <div className="admin-card">
              <h3 className="h6 fw-bold mb-3">Gestión de Flota</h3>
              <div className="d-flex flex-column gap-3">
                <FleetItem icon="local_shipping" title="Camión #MX-402" status="En Ruta" route="Hub Norte → Sector A" color="primary" />
                <FleetItem icon="ac_unit" title="Frigo #RF-11" status="Disponible" route="Sin ruta asignada" color="secondary" />
              </div>
            </div>

          </div>
        </div>

        {/* Column 2: Route Planner & Orders */}
        <div className="col-12 col-xl-8">
          <div className="d-flex flex-column gap-4">
            
            {/* Visual Route Planner Card */}
            <div className="admin-card p-0 overflow-hidden shadow-sm d-flex flex-column" style={{ height: '400px' }}>
              <div className="p-3 border-bottom d-flex justify-content-between align-items-center bg-white">
                <h3 className="h6 fw-bold mb-0">Planificador de Rutas Activo</h3>
                <div className="d-flex gap-2">
                  <button className="btn btn-icon-sm p-1 rounded hover-bg-light text-secondary"><span className="material-symbols-outlined">layers</span></button>
                  <button className="btn btn-icon-sm p-1 rounded hover-bg-light text-secondary"><span className="material-symbols-outlined">zoom_in</span></button>
                </div>
              </div>
              <div className="flex-grow-1 position-relative bg-light overflow-hidden">
                <img 
                  alt="Route Map" 
                  className="w-100 h-100 object-fit-cover opacity-50 grayscale brightness-90" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdVixDg69d_H_A0VNmdipjpwUKFCakaJqPHyO-qAmCn00pfUYgN3F9g8HLnhOM73UA1N47TtE9wah2OCnyIuaC1PkZnU_6EWEg3WbUq1U4ZJbw6627ogTXvMc1VC0BWfXFFXxXr3Ogi3QbBX-iCJwUD77uRVzT7ATVLKtJP-rfVZ5zW3XBxCC8G7R1ZQ6LKMFa3CzR6XnSji3761mq98FfoJ3ggk9QQm40vyNz1iaFfJPKr9M7Tig94wT-vB5V5Rmpmv0h192mzZo" 
                />
                
                {/* Route Visualization Overlays */}
                <div className="position-absolute inset-0 p-3 p-md-4 d-flex flex-column justify-content-between pointer-events-none w-100 h-100" style={{ top: 0, left: 0 }}>
                  <div className="d-flex justify-content-between align-items-start w-100">
                    <div className="bg-white border p-2 p-md-3 rounded-4 shadow-sm pointer-events-auto border-primary-subtle" style={{ maxWidth: '45%' }}>
                      <span className="small fw-bold text-primary text-uppercase" style={{ fontSize: '10px' }}>Origen</span>
                      <div className="d-flex align-items-center gap-2 mt-1">
                        <span className="material-symbols-outlined text-primary small" style={{ fontVariationSettings: "'FILL' 1" }}>warehouse</span>
                        <p className="small fw-bold mb-0 text-truncate">Hub Norte Monterrey</p>
                      </div>
                    </div>
                    <div className="bg-white border p-2 p-md-3 rounded-4 shadow-sm pointer-events-auto border-danger-subtle" style={{ maxWidth: '45%' }}>
                      <span className="small fw-bold text-danger text-uppercase" style={{ fontSize: '10px' }}>Destino</span>
                      <div className="d-flex align-items-center gap-2 mt-1">
                        <span className="material-symbols-outlined text-danger small" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                        <p className="small fw-bold mb-0 text-truncate">Sector Gamma</p>
                      </div>
                    </div>
                  </div>
                  <div className="align-self-center bg-primary text-white px-4 py-2 rounded-pill shadow-lg d-flex align-items-center gap-3 pointer-events-auto animate-pulse-slow">
                    <div className="text-center">
                      <span className="d-block small opacity-75" style={{ fontSize: '9px' }}>TIEMPO EST.</span>
                      <span className="fw-bold">4h 25m</span>
                    </div>
                    <div className="vr opacity-25"></div>
                    <div className="text-center">
                      <span className="d-block small opacity-75" style={{ fontSize: '9px' }}>DISTANCIA</span>
                      <span className="fw-bold">342 km</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Orders Table Card */}
            <div className="admin-card p-0 overflow-hidden shadow-sm">
              <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
                <h3 className="h6 fw-bold mb-0">Órdenes de Despacho</h3>
                <button className="btn btn-link btn-sm text-primary fw-bold text-decoration-none d-flex align-items-center gap-1">
                  Ver historial <span className="material-symbols-outlined small">arrow_forward</span>
                </button>
              </div>
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="bg-surface-container-low border-bottom">
                    <tr>
                      <th className="px-4 py-3 small fw-bold text-secondary text-uppercase tracking-wider border-0">ID Orden</th>
                      <th className="px-4 py-3 small fw-bold text-secondary text-uppercase tracking-wider border-0">Tipo</th>
                      <th className="px-4 py-3 small fw-bold text-secondary text-uppercase tracking-wider border-0">Carga</th>
                      <th className="px-4 py-3 small fw-bold text-secondary text-uppercase tracking-wider border-0">Estado</th>
                      <th className="px-4 py-3 border-0 text-end">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {envios.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center py-5 text-secondary">No hay órdenes registradas.</td>
                      </tr>
                    ) : (
                      envios.map((e) => (
                        <tr key={e.id} className="transition-all hover-bg-light align-middle">
                          <td className="px-4 py-3 small fw-bold text-primary">ORD-2024-{e.id}</td>
                          <td className="px-4 py-3">
                            <div className="d-flex align-items-center gap-2 small text-on-surface-variant">
                              <span className="material-symbols-outlined small">
                                {e.transporte.includes('Avión') ? 'flight' : e.transporte.includes('Camión') ? 'local_shipping' : 'directions_car'}
                              </span>
                              {e.transporte}
                            </div>
                          </td>
                          <td className="px-4 py-3 small text-on-surface-variant">{e.destino} ({e.cantidad} Unid.)</td>
                          <td className="px-4 py-3">
                            <span className={`badge rounded-pill px-3 py-1 ${getStatusBadgeClass(e.estado)}`}>
                              {e.estado}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-end">
                            <div className="d-flex justify-content-end gap-1">
                              <button className="btn btn-icon-sm p-1 rounded hover-bg-light text-secondary"><span className="material-symbols-outlined small">print</span></button>
                              <button className="btn btn-primary btn-sm rounded-3 px-3 fw-bold small">Confirmar</button>
                            </div>
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
      </div>

      {/* Dispatch Modal */}
      <div className="modal fade" id="despachoModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '1.5rem' }}>
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-bold text-primary">Nuevo Despacho Operativo</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body p-4">
                <div className="mb-3">
                  <label className="form-label small fw-bold text-secondary text-uppercase" style={{ fontSize: '10px' }}>Destino (Reporte Terreno)</label>
                  <select
                    name="destino"
                    value={formData.destino}
                    onChange={handleChange}
                    required
                    className="form-select form-select-lg bg-light border-0 fw-bold"
                    style={{ borderRadius: '0.75rem' }}
                  >
                    <option value="">Seleccione destino...</option>
                    {necesidades.map((n) => (
                      <option key={n.id} value={n.ubicacion}>{n.ubicacion} - {n.descripcion}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-bold text-secondary text-uppercase" style={{ fontSize: '10px' }}>Medio de Transporte</label>
                  <select
                    name="transporte"
                    value={formData.transporte}
                    onChange={handleChange}
                    className="form-select form-select-lg bg-light border-0 fw-bold"
                    style={{ borderRadius: '0.75rem' }}
                  >
                    <option value="Camión Institucional">Camión Institucional</option>
                    <option value="Vehículo de Rescate">Vehículo de Rescate</option>
                    <option value="Avión de Carga">Avión de Carga</option>
                    <option value="Embarcación">Embarcación</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="form-label small fw-bold text-secondary text-uppercase" style={{ fontSize: '10px' }}>Cantidad a Despachar</label>
                  <input
                    type="number"
                    name="cantidad"
                    value={formData.cantidad}
                    onChange={handleChange}
                    required
                    placeholder="0"
                    className="form-control form-control-lg bg-light border-0 fw-bold"
                    style={{ borderRadius: '0.75rem' }}
                  />
                </div>
                <button 
                  type="submit" 
                  className="btn btn-primary btn-lg w-100 fw-bold shadow-sm"
                  style={{ borderRadius: '0.75rem' }}
                  disabled={loading}
                >
                  {loading ? 'Procesando...' : 'Iniciar Despacho'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Floating Notification */}
      <div className="position-fixed bottom-0 end-0 p-4 z-3" style={{ maxWidth: '350px' }}>
        <div className="admin-card bg-dark text-white p-3 shadow-lg d-flex align-items-start gap-3 border-0 transition-all">
          <span className="material-symbols-outlined text-warning" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
          <div className="flex-grow-1">
            <h4 className="small fw-bold mb-1">Actualización de Flota</h4>
            <p className="small opacity-75 mb-0" style={{ fontSize: '11px' }}>3 vehículos han ingresado a mantenimiento preventivo.</p>
          </div>
          <button className="btn btn-sm p-0 text-white opacity-50 hover-opacity-100"><span className="material-symbols-outlined small">close</span></button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .animate-pulse-slow { animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.85; } }
        .hover-bg-light:hover { background-color: var(--surface-container-low) !important; }
        .hover-opacity-100:hover { opacity: 1 !important; }
        .object-fit-cover { object-fit: cover; }
      `}} />
    </div>
  );
}

const HubIndicator = ({ label, percent, status, subtext }) => (
  <div>
    <div className="d-flex justify-content-between mb-2 align-items-center">
      <span className="small fw-bold text-dark">{label}</span>
      <span className={`small fw-bold text-${status}`}>{percent}%</span>
    </div>
    <div className="progress" style={{ height: '6px' }}>
      <div className={`progress-bar bg-${status}`} style={{ width: `${percent}%` }}></div>
    </div>
    <p className="small text-secondary mt-2 mb-0" style={{ fontSize: '11px' }}>{subtext}</p>
  </div>
);

const FleetItem = ({ icon, title, status, route, color }) => (
  <div className="d-flex align-items-center gap-3 p-2 rounded-3 bg-light border border-transparent transition-all cursor-pointer hover-border-outline">
    <div className={`rounded-circle bg-${color}-subtle d-flex align-items-center justify-content-center`} style={{ width: '40px', height: '40px' }}>
      <span className={`material-symbols-outlined text-${color} small`}>{icon}</span>
    </div>
    <div className="flex-grow-1">
      <div className="d-flex justify-content-between align-items-center">
        <span className="small fw-bold text-dark">{title}</span>
        <span className={`badge rounded-pill bg-${color}-subtle text-${color} border-0`} style={{ fontSize: '9px' }}>{status}</span>
      </div>
      <p className="small text-secondary mb-0" style={{ fontSize: '11px' }}>Ruta: {route}</p>
    </div>
    <style dangerouslySetInnerHTML={{ __html: `
      .hover-border-outline:hover { border-color: var(--outline-variant) !important; }
    `}} />
  </div>
);

const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'ENTREGADO': return 'bg-tertiary-subtle text-tertiary';
    case 'EN CAMINO': return 'bg-primary-subtle text-primary';
    case 'URGENTE': return 'bg-danger-subtle text-danger';
    case 'EN PREPARACIÓN': return 'bg-secondary-subtle text-secondary';
    default: return 'bg-light text-secondary';
  }
};
