import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import toast from 'react-hot-toast';

const RegistroUsuario = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    organization: '',
    password: '',
    confirmPassword: '',
    terms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    try {
      await api.post('/usuarios', {
        nombre: formData.fullName,
        correo: formData.email,
        password: formData.password,
        organizacion: formData.organization,
        rol: 'USER'
      });

      toast.success('¡Cuenta creada exitosamente! Ya puedes iniciar sesión.');
      navigate('/login');
    } catch (error) {
      console.error(error);
      toast.error('Error al registrar usuario. Intenta con otro correo.');
    }
  };

  return (
    <div className="container-fluid p-0 vh-100 position-fixed top-0 start-0 z-3 bg-light" style={{ overflowY: 'auto' }}>
      <div className="row g-0 min-vh-100">
        {/* Left Side: Hero Section */}
        <div className="col-md-5 col-lg-6 d-none d-md-flex flex-column position-relative bg-primary overflow-hidden">
          <div className="position-absolute w-100 h-100 start-0 top-0">
            <img
              alt="Humanitarian Aid Workers"
              className="w-100 h-100"
              style={{ objectFit: 'cover' }}
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeeIyVsDDOQkKpM0HNGE2gUe3XdvAxa6xiqr5r3VW1NmSbIVqVYJzy9OAp1EgCqHlt4ubQ3XITGlm7woskatA6P0Cctdn_7Csn9cjOpuAOBFoKh-KCtRsZxp0xaXf7TeaNFwT3zbeCua2TjUM8_6oBQxC55wSAkjdIqbbhk7WbUx67xdfekcbNVYBpMPbNqDuni0sPF9agXdcF-a7HXlFpJul6cVEoTDhTfGTub5yrMWxIrr5BOTMEcVvLyzzZV_fPn7TCht2MCVI"
            />
            <div className="position-absolute w-100 h-100 start-0 top-0" style={{ background: 'linear-gradient(to bottom, rgba(0, 56, 108, 0.4), rgba(0, 56, 108, 0.9))' }}></div>
          </div>
          <div className="position-relative z-1 d-flex flex-column justify-content-between h-100 p-5 text-white">
            <div>
              <span className="badge bg-light text-primary bg-opacity-25 mb-4 px-3 py-2 rounded-pill">
                Plataforma de Gestión Humanitaria
              </span>
              <h1 className="display-4 fw-bold mb-4">
                Donaton: Conectando Ayuda con Necesidad
              </h1>
              <p className="fs-5 opacity-75">
                Únete a la red logística más confiable para la distribución de ayuda humanitaria en tiempo real. Facilitamos la coordinación entre donantes y receptores para maximizar el impacto.
              </p>
            </div>
            <div className="row pt-5 border-top border-light border-opacity-25 mt-5">
              <div className="col-6">
                <p className="display-5 fw-bold mb-0">1.2M</p>
                <p className="small text-uppercase opacity-75 fw-bold">Kits entregados</p>
              </div>
              <div className="col-6">
                <p className="display-5 fw-bold mb-0">850+</p>
                <p className="small text-uppercase opacity-75 fw-bold">Organizaciones aliadas</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Registration Form */}
        <div className="col-12 col-md-7 col-lg-6 d-flex flex-column bg-white">
          <div className="d-md-none p-3 border-bottom d-flex align-items-center">
            <span className="fs-4 fw-bold text-primary">Donaton</span>
          </div>
          <div className="d-flex flex-column flex-grow-1 justify-content-center px-4 py-5 mx-auto w-100" style={{ maxWidth: '500px' }}>
            <div className="mb-4">
              <h2 className="fw-bold text-primary">Crear una cuenta</h2>
              <p className="text-secondary">Regístrese para comenzar a gestionar donaciones institucionales.</p>
            </div>

            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
              <div className="form-group">
                <label className="small fw-bold text-secondary text-uppercase mb-1" htmlFor="fullName">Nombre Completo</label>
                <div className="position-relative">
                  <input
                    className="form-control form-control-lg pe-5"
                    id="fullName"
                    name="fullName"
                    placeholder="Ej. Juan Pérez"
                    required
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                  <span className="material-symbols-outlined position-absolute top-50 end-0 translate-middle-y me-3 text-secondary">person</span>
                </div>
              </div>

              <div className="form-group">
                <label className="small fw-bold text-secondary text-uppercase mb-1" htmlFor="email">Correo Institucional</label>
                <div className="position-relative">
                  <input
                    className="form-control form-control-lg pe-5"
                    id="email"
                    name="email"
                    placeholder="nombre@organizacion.org"
                    required
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <span className="material-symbols-outlined position-absolute top-50 end-0 translate-middle-y me-3 text-secondary">mail</span>
                </div>
              </div>

              <div className="form-group">
                <label className="small fw-bold text-secondary text-uppercase mb-1" htmlFor="organization">Nombre de la Organización</label>
                <div className="position-relative">
                  <select
                    className="form-select form-select-lg pe-5"
                    id="organization"
                    name="organization"
                    required
                    value={formData.organization}
                    onChange={handleChange}
                  >
                    <option disabled value="">Seleccione una organización</option>
                    <option value="ong_red_cruz">Cruz Roja Internacional</option>
                    <option value="ong_unicef">UNICEF</option>
                    <option value="ong_caritas">Cáritas Internacional</option>
                    <option value="ong_medicos">Médicos Sin Fronteras</option>
                    <option value="other">Otra (Especificar más adelante)</option>
                  </select>
                  <span className="material-symbols-outlined position-absolute top-50 end-0 translate-middle-y me-4 text-secondary pointer-events-none">corporate_fare</span>
                </div>
              </div>

              <div className="row g-3">
                <div className="col-12 col-md-6 form-group">
                  <label className="small fw-bold text-secondary text-uppercase mb-1" htmlFor="password">Contraseña</label>
                  <div className="position-relative">
                    <input
                      className="form-control form-control-lg pe-5"
                      id="password"
                      name="password"
                      placeholder="••••••••"
                      required
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <span className="material-symbols-outlined position-absolute top-50 end-0 translate-middle-y me-3 text-secondary">lock</span>
                  </div>
                </div>
                <div className="col-12 col-md-6 form-group">
                  <label className="small fw-bold text-secondary text-uppercase mb-1" htmlFor="confirmPassword">Confirmar</label>
                  <div className="position-relative">
                    <input
                      className="form-control form-control-lg pe-5"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="••••••••"
                      required
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    <span className="material-symbols-outlined position-absolute top-50 end-0 translate-middle-y me-3 text-secondary">lock_reset</span>
                  </div>
                </div>
              </div>

              <div className="form-check mt-2">
                <input
                  className="form-check-input"
                  id="terms"
                  name="terms"
                  required
                  type="checkbox"
                  checked={formData.terms}
                  onChange={handleChange}
                />
                <label className="form-check-label small text-secondary" htmlFor="terms">
                  Acepto los <a className="text-primary text-decoration-none fw-bold" href="#">términos</a> y la <a className="text-primary text-decoration-none fw-bold" href="#">política de privacidad</a>.
                </label>
              </div>

              <button className="btn btn-primary btn-lg w-100 fw-bold mt-3 d-flex align-items-center justify-content-center gap-2" type="submit">
                <span>Crear Cuenta</span>
                <span className="material-symbols-outlined">how_to_reg</span>
              </button>
            </form>

            <div className="text-center mt-5 pt-4 border-top">
              <p className="text-secondary mb-0">
                ¿Ya tienes una cuenta?
                <Link className="text-primary fw-bold ms-1 text-decoration-none" to="/login">Iniciar Sesión</Link>
              </p>
            </div>
          </div>

          <div className="mt-auto px-4 py-3 d-flex flex-column flex-md-row justify-content-between align-items-center bg-light border-top text-secondary small fw-bold">
            <p className="mb-0">© 2024 Donaton Plataforma Humanitaria</p>
            <div className="d-flex gap-3 mt-2 mt-md-0">
              <a className="text-secondary text-decoration-none" href="#">Seguridad</a>
              <a className="text-secondary text-decoration-none" href="#">Soporte</a>
              <a className="text-secondary text-decoration-none" href="#">ES</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistroUsuario;
