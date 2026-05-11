import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    
    // Aquí puedes agregar la lógica para enviar los datos al backend
    console.log('Formulario de registro enviado:', formData);
    alert('Cuenta creada exitosamente (simulado)');
    
    // Redirigir al panel de control u otra página después del registro
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden bg-surface font-body-md text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed w-full absolute inset-0 z-50">
      {/* Left Side: Hero Section */}
      <div className="relative hidden md:flex md:w-1/2 lg:w-3/5 bg-primary overflow-hidden">
        <img 
          alt="Humanitarian Aid Workers" 
          className="absolute inset-0 w-full h-full object-cover" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeeIyVsDDOQkKpM0HNGE2gUe3XdvAxa6xiqr5r3VW1NmSbIVqVYJzy9OAp1EgCqHlt4ubQ3XITGlm7woskatA6P0Cctdn_7Csn9cjOpuAOBFoKh-KCtRsZxp0xaXf7TeaNFwT3zbeCua2TjUM8_6oBQxC55wSAkjdIqbbhk7WbUx67xdfekcbNVYBpMPbNqDuni0sPF9agXdcF-a7HXlFpJul6cVEoTDhTfGTub5yrMWxIrr5BOTMEcVvLyzzZV_fPn7TCht2MCVI" 
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0, 56, 108, 0.4), rgba(0, 56, 108, 0.9))' }}></div>
        <div className="relative z-10 flex flex-col justify-between h-full p-12 lg:p-20 text-left">
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-on-primary-container/20 text-on-primary-container font-label-md text-label-md mb-6 backdrop-blur-sm">
              Plataforma de Gestión Humanitaria
            </span>
            <h1 className="font-display-lg text-display-lg text-on-primary mb-4 leading-tight">
              Donaton: Conectando Ayuda con Necesidad
            </h1>
            <p className="font-body-lg text-body-lg text-on-primary/80 max-w-xl">
              Únete a la red logística más confiable para la distribución de ayuda humanitaria en tiempo real. Facilitamos la coordinación entre donantes y receptores para maximizar el impacto.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 pt-12 border-t border-on-primary/20">
            <div className="space-y-1">
              <p className="font-display-lg text-display-lg text-on-primary">1.2M</p>
              <p className="font-label-md text-label-md uppercase tracking-wider text-on-primary/60">Kits entregados</p>
            </div>
            <div className="space-y-1">
              <p className="font-display-lg text-display-lg text-on-primary">850+</p>
              <p className="font-label-md text-label-md uppercase tracking-wider text-on-primary/60">Organizaciones aliadas</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Side: Registration Form */}
      <div className="flex-1 flex flex-col bg-surface overflow-y-auto">
        {/* Mobile Brand Header */}
        <div className="md:hidden p-6 flex justify-between items-center bg-white border-b border-outline-variant">
          <span className="text-xl font-bold text-[#1A4F8B] tracking-tight">Donaton</span>
        </div>
        <div className="max-w-md w-full mx-auto px-6 py-12 md:py-24 flex-1 flex flex-col justify-center text-left">
          <div className="mb-10">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-2">Crear una cuenta</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Regístrese para comenzar a gestionar donaciones institucionales.</p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="space-y-2">
              <label className="block font-label-md text-label-md text-on-surface-variant" htmlFor="fullName">Nombre Completo</label>
              <div className="relative">
                <input 
                  className="w-full h-12 px-4 rounded-lg border border-outline-variant bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-body-md text-on-surface" 
                  id="fullName" 
                  name="fullName" 
                  placeholder="Ej. Juan Pérez" 
                  required 
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline">person</span>
              </div>
            </div>
            {/* Institutional Email */}
            <div className="space-y-2">
              <label className="block font-label-md text-label-md text-on-surface-variant" htmlFor="email">Correo Institucional</label>
              <div className="relative">
                <input 
                  className="w-full h-12 px-4 rounded-lg border border-outline-variant bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-body-md text-on-surface" 
                  id="email" 
                  name="email" 
                  placeholder="nombre@organizacion.org" 
                  required 
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline">mail</span>
              </div>
            </div>
            {/* Organization Name */}
            <div className="space-y-2">
              <label className="block font-label-md text-label-md text-on-surface-variant" htmlFor="organization">Nombre de la Organización</label>
              <div className="relative">
                <select 
                  className="w-full h-12 px-4 pr-10 rounded-lg border border-outline-variant bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-body-md text-on-surface appearance-none" 
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
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none">corporate_fare</span>
              </div>
            </div>
            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block font-label-md text-label-md text-on-surface-variant" htmlFor="password">Contraseña</label>
                <div className="relative">
                  <input 
                    className="w-full h-12 px-4 rounded-lg border border-outline-variant bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-body-md text-on-surface" 
                    id="password" 
                    name="password" 
                    placeholder="••••••••" 
                    required 
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline">lock</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block font-label-md text-label-md text-on-surface-variant" htmlFor="confirmPassword">Confirmar Contraseña</label>
                <div className="relative">
                  <input 
                    className="w-full h-12 px-4 rounded-lg border border-outline-variant bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-body-md text-on-surface" 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    placeholder="••••••••" 
                    required 
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline">lock_reset</span>
                </div>
              </div>
            </div>
            {/* Terms and Conditions */}
            <div className="flex items-start gap-3 pt-2">
              <div className="flex items-center h-5">
                <input 
                  className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary" 
                  id="terms" 
                  name="terms" 
                  required 
                  type="checkbox"
                  checked={formData.terms}
                  onChange={handleChange}
                />
              </div>
              <label className="text-body-sm font-body-sm text-on-surface-variant leading-tight" htmlFor="terms">
                Acepto los <a className="text-primary hover:underline font-medium" href="#">términos y condiciones</a> y la <a className="text-primary hover:underline font-medium" href="#">política de privacidad</a> para el manejo de datos humanitarios.
              </label>
            </div>
            {/* Submit Button */}
            <button className="w-full h-14 bg-primary text-on-primary rounded-lg font-headline-md text-[18px] hover:bg-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm" type="submit">
              <span>Crear Cuenta Institucional</span>
              <span className="material-symbols-outlined">how_to_reg</span>
            </button>
          </form>
          {/* Footer Link */}
          <div className="mt-10 pt-8 border-t border-outline-variant text-center">
            <p className="font-body-md text-on-surface-variant">
              ¿Ya tienes una cuenta? 
              <Link className="text-primary font-bold ml-1 hover:underline" to="/login">Iniciar Sesión</Link>
            </p>
          </div>
        </div>
        {/* Subtle Footer Metadata */}
        <div className="mt-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-outline font-label-md text-label-md border-t border-outline-variant/30">
          <p>© 2024 Donaton Plataforma Humanitaria</p>
          <div className="flex gap-6">
            <a className="hover:text-primary" href="#">Seguridad</a>
            <a className="hover:text-primary" href="#">Soporte</a>
            <a className="hover:text-primary" href="#">ES</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistroUsuario;
