import { Link } from 'react-router-dom';
import { useAuth } from '../../../AuthContext';

export default function PortalDonante() {
  const { user } = useAuth();

  return (
    <div className="container-fluid py-4 bg-light min-vh-100">
      <div className="mx-auto" style={{ maxWidth: '1200px' }}>
        
        {/* Welcome Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-4">
          <div>
            <h2 className="fw-bold text-dark mb-1">¡Hola, {user?.nombre || 'Donante'}!</h2>
            <p className="text-secondary mb-0">Bienvenido de nuevo a tu panel de ayuda humanitaria.</p>
          </div>
          <Link 
            to="/registro"
            className="btn btn-warning rounded-pill px-4 py-2.5 fw-bold d-flex align-items-center gap-2 shadow-sm text-dark border-0 hover-bg-warning-dark text-decoration-none"
          >
            <span className="material-symbols-outlined fs-5">volunteer_activism</span>
            Realizar Donación Rápida
          </Link>
        </div>

        {/* Bento Grid: Impact Summary & Progress */}
        <div className="row g-4 mb-5">
          <div className="col-12 col-lg-8">
            <div className="bg-primary rounded-4 p-4 text-white shadow-sm position-relative overflow-hidden h-100" style={{ minHeight: '200px' }}>
              <div className="position-relative z-1">
                <h3 className="fw-bold mb-2">Tu generosidad está cambiando vidas</h3>
                <p className="fs-5 opacity-75 mb-4">Gracias a tus aportes este mes, hemos logrado cubrir parte de las necesidades en el sector norte de la ciudad.</p>
                
                <div className="d-flex gap-5">
                  <div>
                    <p className="small text-uppercase tracking-widest opacity-75 mb-1">Total Donado</p>
                    <p className="display-5 fw-bolder mb-0">12,450 <span className="fs-6 fw-normal opacity-75">kg</span></p>
                  </div>
                  <div className="border-start border-white-50 ps-5">
                    <p className="small text-uppercase tracking-widest opacity-75 mb-1">Familias Ayudadas</p>
                    <p className="display-5 fw-bolder mb-0">412</p>
                  </div>
                </div>
              </div>
              <span className="material-symbols-outlined position-absolute opacity-25" style={{ fontSize: '240px', right: '-40px', bottom: '-40px', transform: 'rotate(-12deg)' }}>favorite</span>
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="bg-white border rounded-4 p-4 d-flex flex-column justify-content-between shadow-sm h-100" style={{ minHeight: '200px' }}>
              <div>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h4 className="text-primary fw-bold mb-0">Próxima Meta</h4>
                  <span className="material-symbols-outlined text-warning fs-3">emoji_events</span>
                </div>
                <p className="text-secondary small mb-4">Faltan 50kg para convertirte en "Donante Platino" y desbloquear beneficios exclusivos.</p>
              </div>
              
              <div>
                <div className="d-flex justify-content-between small fw-bold mb-1">
                  <span className="text-secondary">Progreso de Nivel</span>
                  <span className="text-primary">75%</span>
                </div>
                <div className="progress rounded-pill bg-light" style={{ height: '8px' }}>
                  <div className="progress-bar bg-warning rounded-pill" role="progressbar" style={{ width: '75%' }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Urgencies & Access Panels */}
        <div className="row g-4">
          {/* Active Urgencies List */}
          <div className="col-12 col-lg-8">
            <h3 className="h4 fw-bold text-dark mb-4 d-flex align-items-center gap-2">
              <span className="material-symbols-outlined text-danger">crisis_alert</span>
              Urgencias en Tiempo Real
            </h3>
            
            <div className="row g-4">
              {/* Urgency 1 */}
              <div className="col-12 col-md-6">
                <div className="card bg-white border-0 shadow-sm rounded-4 overflow-hidden h-100 d-flex flex-column justify-content-between">
                  <div className="position-relative" style={{ height: '150px' }}>
                    <img 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5ucpPzAWyUibacpUF7ceuhCBsUwu2F0eeiVMV42O_FVUbHMzXbHY86BBBqBFaLnGfC9-0keXkuhwjx6K1eljWEZl0gxUI9Mska0CHyf7jAqHcypZC5e1Lhg-Ms8uJucxfU-wzggecePAQd3dLYtWkq4IIiU1gC0qqWa5AK2sD9ItRje7YpADADo8segLHsTIJUj8ynCzDHPz5RYmJ5C6MXyviF18mBtpz3lLfBVjjChb3WXpiodlikENPr5ts1F4vHSwaI1D2KKs" 
                      alt="Feeding Program" 
                      className="w-100 h-100 object-fit-cover" 
                    />
                    <span className="badge bg-danger position-absolute top-0 start-0 m-3 px-3 py-2 rounded-pill shadow-sm d-inline-flex align-items-center gap-1">
                      <span className="material-symbols-outlined fs-6">priority_high</span> Crítico
                    </span>
                  </div>
                  <div className="p-4 flex-grow-1 d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="fw-bold text-dark mb-1">Comedor Comunitario Norte</h5>
                      <p className="small text-secondary mb-4">Se requieren 200kg de arroz y legumbres para abastecer esta semana.</p>
                    </div>
                    <Link 
                      to="/registro?categoria=Alimentos"
                      className="btn btn-outline-primary w-100 fw-bold py-2 rounded-3 text-decoration-none text-center"
                    >
                      Donar Alimentos
                    </Link>
                  </div>
                </div>
              </div>

              {/* Urgency 2 */}
              <div className="col-12 col-md-6">
                <div className="card bg-white border-0 shadow-sm rounded-4 overflow-hidden h-100 d-flex flex-column justify-content-between">
                  <div className="position-relative" style={{ height: '150px' }}>
                    <img 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwNHoExSf4KWsO0ARpyRLusFT7k_1adT9tscl-XyOAcB8ySB4IT6IUF-juMvDZNtbme_B3wF4pL5OF7wVucEUDf3OjTskCNSGEI7GMLdUGIrDn6tIeXHgUy7TBEWsez9kfaRQwZYyAhJ3IAZYF2Bk4yKdp7zMH3cqZsZef18_BC5H7wuTGV2NQF0e1igHDh33OWATNTm7Y55wYo_3TRKXu_hWHi7qC49Y7Ym-HcpOfmr5UzLc4-Y5-cPVF145TG9kEkyDil8FW8VM" 
                      alt="Medicine Center" 
                      className="w-100 h-100 object-fit-cover" 
                    />
                    <span className="badge bg-warning text-dark position-absolute top-0 start-0 m-3 px-3 py-2 rounded-pill shadow-sm d-inline-flex align-items-center gap-1">
                      <span className="material-symbols-outlined fs-6 text-dark">schedule</span> Urgente
                    </span>
                  </div>
                  <div className="p-4 flex-grow-1 d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="fw-bold text-dark mb-1">Campaña de Invierno</h5>
                      <p className="small text-secondary mb-4">Escasez grave de mantas térmicas y abrigos gruesos para adultos mayores.</p>
                    </div>
                    <Link 
                      to="/registro?categoria=Ropa"
                      className="btn btn-outline-primary w-100 fw-bold py-2 rounded-3 text-decoration-none text-center"
                    >
                      Donar Abrigo/Mantas
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions & Navigation Link */}
          <div className="col-12 col-lg-4">
            <h3 className="h4 fw-bold text-dark mb-4">Secciones Recomendadas</h3>
            
            <div className="d-flex flex-column gap-3">
              {/* Map Panel Link */}
              <div className="bg-white border rounded-4 p-4 text-center shadow-sm">
                <span className="material-symbols-outlined text-primary fs-1 mb-2">map</span>
                <h5 className="fw-bold text-dark mb-1">Mapa de Necesidades</h5>
                <p className="small text-secondary mb-3">Encuentra dónde se requiere más ayuda cerca de ti de forma interactiva.</p>
                <Link to="/mapa" className="btn btn-light text-primary fw-bold px-4 py-2 w-100 rounded-3 border">
                  Ver Mapa de Necesidades
                </Link>
              </div>

              {/* My Donations Link */}
              <div className="bg-white border rounded-4 p-4 text-center shadow-sm">
                <span className="material-symbols-outlined text-warning-emphasis fs-1 mb-2">history</span>
                <h5 className="fw-bold text-dark mb-1">Ver Mis Donaciones</h5>
                <p className="small text-secondary mb-3">Realiza el seguimiento de tus donaciones y descarga certificados.</p>
                <Link to="/mis-donaciones" className="btn btn-light text-primary fw-bold px-4 py-2 w-100 rounded-3 border">
                  Ir al Historial
                </Link>
              </div>

              {/* Impact Panel Link */}
              <div className="bg-white border rounded-4 p-4 text-center shadow-sm">
                <span className="material-symbols-outlined text-success fs-1 mb-2">trending_up</span>
                <h5 className="fw-bold text-dark mb-1">Ver Impacto y Noticias</h5>
                <p className="small text-secondary mb-3">Descubre los hitos y novedades logrados por la comunidad.</p>
                <Link to="/impacto" className="btn btn-light text-primary fw-bold px-4 py-2 w-100 rounded-3 border">
                  Ver Impacto Social
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .hover-bg-warning-dark:hover { background-color: #e0a800 !important; }
      `}} />
    </div>
  );
}
