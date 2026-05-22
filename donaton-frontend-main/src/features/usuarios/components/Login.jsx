import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../AuthContext';
import api from '../../../api';
import toast from 'react-hot-toast';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', {
        correo: email,
        password: password
      });

      const token = response.data.token;
      const userData = {
        nombre: response.data.nombre || response.data.user?.nombre || email.split('@')[0],
        correo: response.data.correo || response.data.user?.correo || email,
        rol: response.data.role || response.data.user?.rol || 'USER',
        organizacion: response.data.organizacion || response.data.user?.organizacion || 'Donatón'
      };

      login(userData, token);
      toast.success(`¡Bienvenido de nuevo, ${userData.nombre}!`);

      if (userData.rol === 'USUARIO' || userData.rol === 'USER') {
        navigate('/portal-donante');
      } else if (userData.rol === 'LOGISTICA') {
        navigate('/logistica');
      } else if (userData.rol === 'MUNICIPALIDAD') {
        navigate('/municipalidad');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      toast.error('Credenciales incorrectas. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid p-0 vh-100 bg-light position-fixed top-0 start-0 z-3" style={{ overflowY: 'auto' }}>
      <div className="row g-0 min-vh-100">
        {/* Left Panel */}
        <div className="col-lg-6 d-none d-lg-flex position-relative align-items-center justify-content-center overflow-hidden">
          <div className="position-absolute w-100 h-100 start-0 top-0 z-0">
            <img className="w-100 h-100" style={{ objectFit: 'cover' }} alt="Humanitarian workers" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8rqC4imeIBb5KpFUCatjl2htLsDTa58QM7P4T-xF30ZJwr8Fv9Wt4aitT2S8nhhgnROymQE2IOmjP7kefCQOD2UOLBQoXZLWj142AflX6w4eTRNufMZY3bQ7ATtcNPk9pyRnuBbPDSdNPwgpFJOTmdVv7GcER1kaMJdJEMQyi43QupybfabmH5q7fzM-6jPVDLRfTgT0WCeNGe3bL-TqrOSQ11RsQJ0wOhW8Ad_C3jMbUEb5IaXqZRL0ZCgC3Ih7RGlTtUXb9GsY" />
            <div className="position-absolute w-100 h-100 start-0 top-0 bg-primary opacity-50 mix-blend-multiply"></div>
          </div>
          <div className="position-relative z-1 px-5 text-white" style={{ maxWidth: '600px' }}>
            <h1 className="display-4 fw-bold mb-4">Donaton: Conectando Ayuda con Necesidad</h1>
            <p className="fs-5 opacity-75">
              Optimizando la respuesta humanitaria global mediante una coordinación institucional precisa y transparente.
            </p>
          </div>
        </div>

        {/* Right Panel: Login Form */}
        <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center bg-white p-4 p-md-5">
          <div className="w-100" style={{ maxWidth: '450px' }}>
            <div className="text-center text-lg-start mb-5">
              <div className="d-flex align-items-center justify-content-center justify-content-lg-start gap-2 mb-3">
                <span className="material-symbols-outlined text-primary fs-1">volunteer_activism</span>
                <span className="fs-2 fw-bold text-primary">Donaton</span>
              </div>
              <h2 className="fs-4 fw-bold text-dark">Bienvenido de nuevo</h2>
              <p className="text-secondary">Inicie sesión en su cuenta como usuario Donante</p>
            </div>

            <form onSubmit={handleLogin} className="d-flex flex-column gap-4">
              {error && (
                <div className="alert alert-danger py-2 px-3 small border-danger text-danger">
                  {error}
                </div>
              )}

              <div className="form-group">
                <label className="small fw-bold text-secondary text-uppercase mb-1" htmlFor="email">Correo Electrónico</label>
                <div className="position-relative">
                  <span className="material-symbols-outlined position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary">mail</span>
                  <input
                    className="form-control form-control-lg ps-5"
                    id="email"
                    name="email"
                    placeholder="ejemplo@organizacion.org"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <label className="small fw-bold text-secondary text-uppercase" htmlFor="password">Contraseña</label>
                  <a className="small text-primary text-decoration-none" href="#" onClick={(e) => { e.preventDefault(); alert('Enviando enlace de recuperación...'); }}>¿Olvidó su contraseña?</a>
                </div>
                <div className="position-relative">
                  <span className="material-symbols-outlined position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary">lock</span>
                  <input
                    className="form-control form-control-lg ps-5 pe-5"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button className="btn btn-link position-absolute top-50 end-0 translate-middle-y text-secondary text-decoration-none" type="button" onClick={() => setShowPassword(!showPassword)}>
                    <span className="material-symbols-outlined">{showPassword ? "visibility_off" : "visibility"}</span>
                  </button>
                </div>
              </div>

              <button disabled={loading} className="btn btn-primary btn-lg w-100 fw-bold mt-2" type="submit">
                {loading ? 'Ingresando...' : 'Acceder al Sistema'}
              </button>
            </form>

            <div className="text-center mt-4">
              <p className="small text-secondary">
                ¿No tienes una cuenta?
                <Link className="text-primary fw-bold ms-1 text-decoration-none" to="/registro-usuario">
                  Crear Cuenta Donante
                </Link>
              </p>
            </div>

            <footer className="mt-5 text-center small text-secondary">
              <p className="mb-0">© 2026 Donaton Humanitarian Platform.</p>
              <div className="d-flex justify-content-center gap-2 mt-1">
                <a className="text-secondary text-decoration-none hover-text-primary" href="#">Términos de Servicio</a>
                <span>|</span>
                <a className="text-secondary text-decoration-none hover-text-primary" href="#">Soporte</a>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
