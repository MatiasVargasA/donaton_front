import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import toast from 'react-hot-toast';

export default function Sidebar({ isOpen, toggleSidebar }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Sesión cerrada correctamente');
    navigate('/login');
  };

  const isUser = user?.rol === 'USUARIO' || user?.rol === 'USER';
  const isMun = user?.rol === 'MUNICIPALIDAD';
  const isLogistica = user?.rol === 'LOGISTICA';

  return (
    <>
      <aside className={`sidebar-wrapper shadow-sm ${isOpen ? 'show' : ''}`}>
        <div className="d-flex flex-column h-100">
          <div className="mb-4 px-2 pt-2">
            <h1 className="h4 fw-bold text-primary mb-0">Donaton</h1>
            <p className="text-secondary small mb-0">{isUser ? 'Portal del Donante' : 'Admin Console'}</p>
          </div>

          <nav className="nav flex-column flex-grow-1 gap-2">
            {isUser ? (
              <>
                <NavLink 
                  to="/portal-donante" 
                  onClick={() => window.innerWidth < 992 && toggleSidebar()}
                  className={({ isActive }) => 
                    `nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 transition-all ${isActive ? 'bg-primary text-white shadow-sm' : 'text-secondary-emphasis hover-bg-light'}`
                  }
                  end
                >
                  <span className="material-symbols-outlined">home</span>
                  <span className="fw-semibold">Inicio</span>
                </NavLink>
                <NavLink 
                  to="/registro" 
                  onClick={() => window.innerWidth < 992 && toggleSidebar()}
                  className={({ isActive }) => 
                    `nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 transition-all ${isActive ? 'bg-primary text-white shadow-sm' : 'text-secondary-emphasis hover-bg-light'}`
                  }
                >
                  <span className="material-symbols-outlined">favorite</span>
                  <span className="fw-semibold">Hacer Donación</span>
                </NavLink>
                <NavLink 
                  to="/mis-donaciones" 
                  onClick={() => window.innerWidth < 992 && toggleSidebar()}
                  className={({ isActive }) => 
                    `nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 transition-all ${isActive ? 'bg-primary text-white shadow-sm' : 'text-secondary-emphasis hover-bg-light'}`
                  }
                >
                  <span className="material-symbols-outlined">volunteer_activism</span>
                  <span className="fw-semibold">Mis Donaciones</span>
                </NavLink>
                <NavLink 
                  to="/impacto" 
                  onClick={() => window.innerWidth < 992 && toggleSidebar()}
                  className={({ isActive }) => 
                    `nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 transition-all ${isActive ? 'bg-primary text-white shadow-sm' : 'text-secondary-emphasis hover-bg-light'}`
                  }
                >
                  <span className="material-symbols-outlined">equalizer</span>
                  <span className="fw-semibold">Impacto y Novedades</span>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink 
                  to={isMun ? "/municipalidad" : isLogistica ? "/logistica" : "/"} 
                  onClick={() => window.innerWidth < 992 && toggleSidebar()}
                  className={({ isActive }) => 
                    `nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 transition-all ${isActive ? 'bg-primary text-white shadow-sm' : 'text-secondary-emphasis hover-bg-light'}`
                  }
                  end
                >
                  <span className="material-symbols-outlined">dashboard</span>
                  <span className="fw-semibold">Dashboard</span>
                </NavLink>

                {isLogistica && (
                  <>
                    <NavLink 
                      to="/registro" 
                      onClick={() => window.innerWidth < 992 && toggleSidebar()}
                      className={({ isActive }) => 
                        `nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 transition-all ${isActive ? 'bg-primary text-white shadow-sm' : 'text-secondary-emphasis hover-bg-light'}`
                      }
                    >
                      <span className="material-symbols-outlined">inbox</span>
                      <span className="fw-semibold">Donaciones Entrantes</span>
                    </NavLink>
                    <NavLink 
                      to="/inventario" 
                      onClick={() => window.innerWidth < 992 && toggleSidebar()}
                      className={({ isActive }) => 
                        `nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 transition-all ${isActive ? 'bg-primary text-white shadow-sm' : 'text-secondary-emphasis hover-bg-light'}`
                      }
                    >
                      <span className="material-symbols-outlined">inventory_2</span>
                      <span className="fw-semibold">Stock / Inventario</span>
                    </NavLink>
                    <NavLink 
                      to="/logistica" 
                      onClick={() => window.innerWidth < 992 && toggleSidebar()}
                      className={({ isActive }) => 
                        `nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 transition-all ${isActive ? 'bg-primary text-white shadow-sm' : 'text-secondary-emphasis hover-bg-light'}`
                      }
                    >
                      <span className="material-symbols-outlined">local_shipping</span>
                      <span className="fw-semibold">Despachos</span>
                    </NavLink>
                  </>
                )}

                <NavLink 
                  to="/mapa" 
                  onClick={() => window.innerWidth < 992 && toggleSidebar()}
                  className={({ isActive }) => 
                    `nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 transition-all ${isActive ? 'bg-primary text-white shadow-sm' : 'text-secondary-emphasis hover-bg-light'}`
                  }
                >
                  <span className="material-symbols-outlined">map</span>
                  <span className="fw-semibold">Needs Map</span>
                </NavLink>

                {isMun && (
                  <NavLink 
                    to="/reportes" 
                    onClick={() => window.innerWidth < 992 && toggleSidebar()}
                    className={({ isActive }) => 
                      `nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 transition-all ${isActive ? 'bg-primary text-white shadow-sm' : 'text-secondary-emphasis hover-bg-light'}`
                    }
                  >
                    <span className="material-symbols-outlined">analytics</span>
                    <span className="fw-semibold">Reports</span>
                  </NavLink>
                )}
              </>
            )}
          </nav>

          <div className="mt-auto">
            {!isUser && (
              <button className="btn btn-secondary-custom w-100 d-flex align-items-center justify-content-center gap-2 mb-4 py-2">
                <span className="material-symbols-outlined">add</span>
                New Dispatch
              </button>
            )}

            <div className="pt-3 border-top">
              <NavLink 
                to="/perfil" 
                onClick={() => window.innerWidth < 992 && toggleSidebar()}
                className={({ isActive }) => 
                  `nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 transition-all mb-1 ${isActive ? 'bg-light text-primary' : 'text-secondary-emphasis hover-bg-light'}`
                }
              >
                <span className="material-symbols-outlined">settings</span>
                <span className="small fw-medium">Settings</span>
              </NavLink>
              <button 
                onClick={handleLogout}
                className="nav-link w-100 d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-danger hover-bg-light border-0 bg-transparent text-start"
              >
                <span className="material-symbols-outlined">logout</span>
                <span className="small fw-medium">Logout</span>
              </button>
            </div>
          </div>

          <style dangerouslySetInnerHTML={{ __html: `
            .transition-all { transition: all 0.2s ease; }
            .hover-bg-light:hover { background-color: var(--surface-container-high); }
            .nav-link { color: inherit; text-decoration: none; }
          `}} />
        </div>
      </aside>
      {isOpen && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark opacity-25 z-2 d-lg-none" 
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}
