import React from 'react';

export default function PanelControlGlobal() {
  return (
    <div className="d-flex flex-column h-100 w-100">
      {/* Dashboard Canvas */}
      <div className="container-fluid p-4 mx-auto" style={{ maxWidth: '1600px' }}>
        {/* Welcome Header */}
        <div className="mb-4">
          <h2 className="fw-bold text-dark mb-1">Centro de Comando Operativo</h2>
          <p className="text-secondary fs-5">Estado actual de la red de ayuda humanitaria nacional.</p>
        </div>

        {/* KPI Bento Grid */}
        <div className="row g-4 mb-4">
          {/* KPI Card 1 */}
          <div className="col-12 col-md-6 col-lg-3">
            <div className="card h-100 border-0 shadow-sm p-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <span className="material-symbols-outlined text-primary fs-1">volunteer_activism</span>
                <span className="badge bg-success bg-opacity-25 text-success">+12% vs last week</span>
              </div>
              <div>
                <p className="text-secondary text-uppercase small fw-bold mb-1 letter-spacing-1">Total Donaciones</p>
                <h3 className="text-dark fw-bold mb-0">$4,280,500</h3>
              </div>
            </div>
          </div>

          {/* KPI Card 2 */}
          <div className="col-12 col-md-6 col-lg-3">
            <div className="card h-100 border-0 shadow-sm p-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <span className="material-symbols-outlined text-danger fs-1">priority_high</span>
                <span className="badge bg-danger bg-opacity-25 text-danger">Urgente</span>
              </div>
              <div>
                <p className="text-secondary text-uppercase small fw-bold mb-1 letter-spacing-1">Necesidades Críticas</p>
                <h3 className="text-dark fw-bold mb-0">42 Casos</h3>
              </div>
            </div>
          </div>

          {/* KPI Card 3 */}
          <div className="col-12 col-md-6 col-lg-3">
            <div className="card h-100 border-0 shadow-sm p-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <span className="material-symbols-outlined text-warning fs-1">local_shipping</span>
                <span className="badge bg-warning bg-opacity-25 text-warning text-dark">En Tránsito</span>
              </div>
              <div>
                <p className="text-secondary text-uppercase small fw-bold mb-1 letter-spacing-1">Ayuda Despachada</p>
                <h3 className="text-dark fw-bold mb-0">18 Toneladas</h3>
              </div>
            </div>
          </div>

          {/* KPI Card 4 */}
          <div className="col-12 col-md-6 col-lg-3">
            <div className="card h-100 border-0 shadow-sm p-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <span className="material-symbols-outlined text-info fs-1">family_restroom</span>
                <span className="badge bg-info bg-opacity-25 text-info">Impacto Real</span>
              </div>
              <div>
                <p className="text-secondary text-uppercase small fw-bold mb-1 letter-spacing-1">Familias Beneficiadas</p>
                <h3 className="text-dark fw-bold mb-0">1,240</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Main Layout Grid */}
        <div className="row g-4">
          {/* Weekly Flow Chart */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm p-4 h-100">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h4 className="fw-bold text-dark mb-0">Flujo Semanal de Ayuda</h4>
                  <p className="text-secondary small mb-0">Toneladas de suministros distribuidos por día</p>
                </div>
                <select className="form-select form-select-sm w-auto border-0 bg-light">
                  <option>Últimos 7 días</option>
                  <option>Últimos 30 días</option>
                </select>
              </div>
              
              {/* Simple Chart Representation using standard Bootstrap progress bars/divs vertically */}
              <div className="d-flex align-items-end justify-content-between pt-3" style={{ height: '300px' }}>
                {[{day:'LUN', val: 40, label:'2.4T'}, {day:'MAR', val: 60, label:'3.8T'}, {day:'MIE', val: 80, label:'5.1T'}, {day:'JUE', val: 50, label:'2.9T'}, {day:'VIE', val: 95, label:'6.2T'}, {day:'SAB', val: 30, label:'1.8T'}, {day:'DOM', val: 15, label:'0.9T'}].map((item, i) => (
                  <div key={i} className="d-flex flex-column align-items-center w-100 px-1">
                    <div className="w-100 bg-light rounded-top position-relative d-flex align-items-end" style={{ height: '250px' }}>
                      <div className="bg-primary w-100 rounded-top" style={{ height: `${item.val}%` }}></div>
                    </div>
                    <span className="text-secondary small fw-bold mt-2">{item.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm p-4 h-100">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold text-dark mb-0">Alertas Recientes</h4>
                <span className="material-symbols-outlined text-secondary">more_vert</span>
              </div>
              
              <div className="d-flex flex-column gap-3 mb-4">
                <div className="d-flex gap-3 p-3 bg-danger bg-opacity-10 border-start border-danger border-4 rounded-end">
                  <span className="material-symbols-outlined text-danger">flood</span>
                  <div>
                    <h6 className="fw-bold text-danger mb-1">Inundación en Sector Norte</h6>
                    <p className="text-secondary small mb-1">Se requieren 500 kits de higiene urgentes.</p>
                    <small className="fw-bold text-danger" style={{fontSize:'10px'}}>HACE 15 MIN</small>
                  </div>
                </div>

                <div className="d-flex gap-3 p-3 bg-warning bg-opacity-10 border-start border-warning border-4 rounded-end">
                  <span className="material-symbols-outlined text-warning">warning</span>
                  <div>
                    <h6 className="fw-bold text-warning mb-1">Escasez de Agua Potable</h6>
                    <p className="text-secondary small mb-1">Municipalidad de Santa Rosa reporta desabastecimiento.</p>
                    <small className="fw-bold text-warning" style={{fontSize:'10px'}}>HACE 2 HORAS</small>
                  </div>
                </div>

                <div className="d-flex gap-3 p-3 bg-light border-start border-secondary border-4 rounded-end">
                  <span className="material-symbols-outlined text-secondary">info</span>
                  <div>
                    <h6 className="fw-bold text-dark mb-1">Cierre de Ruta 7</h6>
                    <p className="text-secondary small mb-1">Logística afectada para despachos al sur.</p>
                    <small className="fw-bold text-secondary" style={{fontSize:'10px'}}>HACE 4 HORAS</small>
                  </div>
                </div>
              </div>

              <button className="btn btn-outline-primary w-100 fw-bold mt-auto">
                Ver todas las alertas
              </button>
            </div>
          </div>

          {/* Recent Dispatches List */}
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white p-4 border-bottom d-flex justify-content-between align-items-center">
                <h4 className="fw-bold text-dark mb-0">Despachos Recientes</h4>
                <div className="d-flex gap-2">
                  <button className="btn btn-outline-secondary btn-sm fw-bold px-3">Filtrar</button>
                  <button className="btn btn-primary btn-sm fw-bold px-3">Exportar Log</button>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-hover mb-0 align-middle">
                  <thead className="table-light text-secondary">
                    <tr>
                      <th className="px-4 py-3 border-0">ID Despacho</th>
                      <th className="px-4 py-3 border-0">Destino</th>
                      <th className="px-4 py-3 border-0">Suministro</th>
                      <th className="px-4 py-3 border-0">Fecha</th>
                      <th className="px-4 py-3 border-0">Estado</th>
                      <th className="px-4 py-3 border-0"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-3 fw-bold">#D-8829</td>
                      <td className="px-4 py-3 text-secondary">Centro Comunitario El Sol</td>
                      <td className="px-4 py-3 text-secondary">Alimentos No Perecederos</td>
                      <td className="px-4 py-3 text-secondary">Hoy, 10:45 AM</td>
                      <td className="px-4 py-3">
                        <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-2 d-inline-flex align-items-center gap-2">
                          <span className="bg-success rounded-circle" style={{width:'8px',height:'8px'}}></span> Entregado
                        </span>
                      </td>
                      <td className="px-4 py-3 text-end">
                        <button className="btn btn-link text-decoration-none text-primary fw-bold p-0">Detalles</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 fw-bold">#D-8830</td>
                      <td className="px-4 py-3 text-secondary">Hospital Regional Norte</td>
                      <td className="px-4 py-3 text-secondary">Insumos Médicos Clase A</td>
                      <td className="px-4 py-3 text-secondary">Hoy, 08:30 AM</td>
                      <td className="px-4 py-3">
                        <span className="badge bg-warning bg-opacity-10 text-warning rounded-pill px-3 py-2 d-inline-flex align-items-center gap-2">
                          <span className="bg-warning rounded-circle spinner-grow spinner-grow-sm" style={{width:'8px',height:'8px'}}></span> En Camino
                        </span>
                      </td>
                      <td className="px-4 py-3 text-end">
                        <button className="btn btn-link text-decoration-none text-primary fw-bold p-0">Detalles</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 fw-bold">#D-8831</td>
                      <td className="px-4 py-3 text-secondary">Campamento Esperanza</td>
                      <td className="px-4 py-3 text-secondary">Carpas y Mantas Termicas</td>
                      <td className="px-4 py-3 text-secondary">Pendiente</td>
                      <td className="px-4 py-3">
                        <span className="badge bg-secondary bg-opacity-10 text-secondary rounded-pill px-3 py-2 d-inline-flex align-items-center gap-2">
                          <span className="bg-secondary rounded-circle" style={{width:'8px',height:'8px'}}></span> En Preparación
                        </span>
                      </td>
                      <td className="px-4 py-3 text-end">
                        <button className="btn btn-link text-decoration-none text-primary fw-bold p-0">Detalles</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Footer Branding */}
      <footer className="mt-auto px-4 py-3 bg-light border-top d-flex justify-content-between align-items-center w-100">
        <div className="d-flex align-items-center gap-2 text-secondary opacity-75">
          <span className="material-symbols-outlined fs-6">shield</span>
          <span className="fw-bold text-uppercase" style={{fontSize: '10px', letterSpacing: '1px'}}>Protocolo de Emergencia Activado</span>
        </div>
        <p className="mb-0 text-secondary fw-medium" style={{fontSize: '10px'}}>© 2024 Donaton Central - Red Global de Ayuda Humanitaria</p>
      </footer>

      {/* FAB */}
      <button className="btn btn-primary rounded-circle position-fixed shadow-lg d-flex align-items-center justify-content-center" style={{bottom: '30px', right: '30px', width: '56px', height: '56px', zIndex: 100}}>
        <span className="material-symbols-outlined fs-4">add_alert</span>
      </button>
    </div>
  );
}
