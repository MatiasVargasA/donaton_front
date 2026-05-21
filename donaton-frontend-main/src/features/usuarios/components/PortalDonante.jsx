import React from 'react';
import { Link } from 'react-router-dom';

export default function PortalDonante() {
  return (
    <div className="container-fluid py-4">
      {/* Bento Grid Section: Impact Summary */}
      <div className="row g-4 mb-5">
        <div className="col-lg-8">
          <div className="bg-primary rounded-4 p-4 text-white shadow-sm position-relative overflow-hidden h-100">
            <div className="position-relative z-1">
              <h3 className="fw-bold mb-2">Tu generosidad está cambiando vidas</h3>
              <p className="fs-5 opacity-75 mb-4">Gracias a tus aportes este mes, hemos logrado cubrir el 85% de las necesidades en el sector norte de la ciudad.</p>
              
              <div className="d-flex gap-5">
                <div>
                  <p className="small text-uppercase tracking-widest opacity-75 mb-1">Total Donado (kg)</p>
                  <p className="display-5 fw-bolder mb-0">12,450</p>
                </div>
                <div className="border-start border-white-50 ps-5">
                  <p className="small text-uppercase tracking-widest opacity-75 mb-1">Familias Ayudadas</p>
                  <p className="display-5 fw-bolder mb-0">412</p>
                </div>
              </div>
            </div>
            {/* The icon in the background */}
            <span className="material-symbols-outlined position-absolute opacity-25" style={{ fontSize: '240px', right: '-40px', bottom: '-40px', transform: 'rotate(-12deg)' }}>favorite</span>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="bg-white border rounded-4 p-4 d-flex flex-column justify-content-between shadow-sm h-100">
            <div>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h4 className="text-primary fw-bold mb-0">Próxima Meta</h4>
                <span className="material-symbols-outlined text-warning fs-3">emoji_events</span>
              </div>
              <p className="text-secondary small mb-4">Faltan 50kg para convertirte en "Donante Platino" y desbloquear el informe de impacto detallado anual.</p>
            </div>
            
            <div>
              <div className="d-flex justify-content-between small fw-bold mb-1">
                <span>Progreso</span>
                <span>75%</span>
              </div>
              <div className="progress" style={{ height: '8px' }}>
                <div className="progress-bar bg-warning" role="progressbar" style={{ width: '75%' }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Selection: Nueva Donación */}
      <div className="mb-5">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h3 className="fw-bold d-flex align-items-center gap-2 mb-0">
            <span className="material-symbols-outlined text-success">add_circle</span>
            Nueva Donación
          </h3>
        </div>
        <div className="row row-cols-2 row-cols-md-5 g-3">
          {[
            { icon: 'restaurant', label: 'Alimentos' },
            { icon: 'medical_services', label: 'Medicinas' },
            { icon: 'checkroom', label: 'Ropa' },
            { icon: 'school', label: 'Escolares' },
            { icon: 'more_horiz', label: 'Otros' }
          ].map((item, idx) => (
            <div className="col" key={idx}>
              <Link to="/registro" className="text-decoration-none">
                <div className="bg-white border rounded-4 p-4 text-center text-primary transition-all h-100 d-flex flex-column align-items-center justify-content-center" style={{ cursor: 'pointer' }}>
                  <span className="material-symbols-outlined display-6 mb-2">{item.icon}</span>
                  <span className="fw-bold">{item.label}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area: History & Urgencies */}
      <div className="row g-4">
        {/* Donation History */}
        <div className="col-lg-8">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h3 className="fw-bold mb-0">Historial Reciente</h3>
            <button className="btn btn-link text-primary text-decoration-none fw-bold">Ver todo el historial</button>
          </div>
          
          <div className="bg-white rounded-4 border overflow-hidden shadow-sm">
            <div className="table-responsive">
              <table className="table table-hover mb-0 align-middle">
                <thead className="table-light">
                  <tr>
                    <th className="py-3 px-4 text-secondary">ID Donación</th>
                    <th className="py-3 px-4 text-secondary">Categoría</th>
                    <th className="py-3 px-4 text-secondary">Fecha</th>
                    <th className="py-3 px-4 text-secondary">Estado</th>
                  </tr>
                </thead>
                <tbody className="border-top-0">
                  <tr>
                    <td className="py-3 px-4 fw-bold text-primary">#DON-2940</td>
                    <td className="py-3 px-4">Alimentos No Perecibles</td>
                    <td className="py-3 px-4 text-secondary">12 Oct 2023</td>
                    <td className="py-3 px-4">
                      <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-2 d-inline-flex align-items-center gap-1 border border-success border-opacity-25">
                        <span className="bg-success rounded-circle" style={{ width: '8px', height: '8px' }}></span>
                        Entregado
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 fw-bold text-primary">#DON-2981</td>
                    <td className="py-3 px-4">Medicamentos (Antibióticos)</td>
                    <td className="py-3 px-4 text-secondary">25 Oct 2023</td>
                    <td className="py-3 px-4">
                      <span className="badge bg-warning bg-opacity-10 text-warning rounded-pill px-3 py-2 d-inline-flex align-items-center gap-1 border border-warning border-opacity-25">
                        <span className="bg-warning rounded-circle" style={{ width: '8px', height: '8px' }}></span>
                        Despachado
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 fw-bold text-primary">#DON-3012</td>
                    <td className="py-3 px-4">Ropa de Invierno</td>
                    <td className="py-3 px-4 text-secondary">Ayer</td>
                    <td className="py-3 px-4">
                      <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3 py-2 d-inline-flex align-items-center gap-1 border border-primary border-opacity-25">
                        <span className="bg-primary rounded-circle" style={{ width: '8px', height: '8px' }}></span>
                        En Clasificación
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Urgencies Section */}
        <div className="col-lg-4">
          <h3 className="fw-bold mb-3">Urgencias Actuales</h3>
          <div className="d-flex flex-column gap-3">
            {/* Urgency Card */}
            <div className="bg-white border rounded-4 overflow-hidden shadow-sm">
              <div className="position-relative" style={{ height: '140px', backgroundColor: '#e9ecef' }}>
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5ucpPzAWyUibacpUF7ceuhCBsUwu2F0eeiVMV42O_FVUbHMzXbHY86BBBqBFaLnGfC9-0keXkuhwjx6K1eljWEZl0gxUI9Mska0CHyf7jAqHcypZC5e1Lhg-Ms8uJucxfU-wzggecePAQd3dLYtWkq4IIiU1gC0qqWa5AK2sD9ItRje7YpADADo8segLHsTIJUj8ynCzDHPz5RYmJ5C6MXyviF18mBtpz3lLfBVjjChb3WXpiodlikENPr5ts1F4vHSwaI1D2KKs" alt="Feeding Program" className="w-100 h-100 object-fit-cover" />
                <div className="position-absolute top-0 start-0 m-2">
                  <span className="badge bg-danger d-flex align-items-center gap-1">
                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>priority_high</span> Crítico
                  </span>
                </div>
              </div>
              <div className="p-3">
                <h5 className="fw-bold mb-1">Comedor Comunitario Norte</h5>
                <p className="small text-secondary mb-3">Se requieren 200kg de arroz y legumbres para cubrir la semana.</p>
                <button className="btn btn-outline-primary w-100 fw-bold">Donar Ahora</button>
              </div>
            </div>

            {/* Urgency Card 2 */}
            <div className="bg-white border rounded-4 overflow-hidden shadow-sm">
              <div className="position-relative" style={{ height: '140px', backgroundColor: '#e9ecef' }}>
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwNHoExSf4KWsO0ARpyRLusFT7k_1adT9tscl-XyOAcB8ySB4IT6IUF-juMvDZNtbme_B3wF4pL5OF7wVucEUDf3OjTskCNSGEI7GMLdUGIrDn6tIeXHgUy7TBEWsez9kfaRQwZYyAhJ3IAZYF2Bk4yKdp7zMH3cqZsZef18_BC5H7wuTGV2NQF0e1igHDh33OWATNTm7Y55wYo_3TRKXu_hWHi7qC49Y7Ym-HcpOfmr5UzLc4-Y5-cPVF145TG9kEkyDil8FW8VM" alt="Medicine Center" className="w-100 h-100 object-fit-cover" />
                <div className="position-absolute top-0 start-0 m-2">
                  <span className="badge bg-warning text-dark d-flex align-items-center gap-1">
                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>schedule</span> Urgente
                  </span>
                </div>
              </div>
              <div className="p-3">
                <h5 className="fw-bold mb-1">Campaña de Invierno</h5>
                <p className="small text-secondary mb-3">Escasez de mantas térmicas y abrigos para adultos mayores.</p>
                <button className="btn btn-outline-primary w-100 fw-bold">Contribuir</button>
              </div>
            </div>

            {/* Map link */}
            <div className="bg-light p-4 rounded-4 text-center border">
              <span className="material-symbols-outlined text-primary fs-1 mb-2">map</span>
              <h5 className="fw-bold mb-1">Ver Mapa de Necesidades</h5>
              <p className="small text-secondary mb-3">Encuentra dónde se requiere más ayuda cerca de ti.</p>
              <Link to="/mapa" className="text-primary fw-bold text-decoration-none">Explorar Mapa</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
