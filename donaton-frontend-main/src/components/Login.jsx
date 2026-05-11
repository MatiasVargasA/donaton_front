import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import api from '../api';
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

      const response = await api.post(
        '/auth/login',
        {
          correo: email,
          password: password
        }
      );

      const token = response.data.token;

      // Usamos los datos reales que devuelve tu backend
      const userData = {
        nombre: response.data.nombre || response.data.user?.nombre || email.split('@')[0],
        correo: response.data.correo || response.data.user?.correo || email,
        rol: response.data.role || response.data.user?.rol || 'USER',
        organizacion: response.data.organizacion || response.data.user?.organizacion || 'Donatón'
      };

      login(userData, token);
      toast.success(`¡Bienvenido de nuevo, ${userData.nombre}!`);

      navigate('/');

    } catch (error) {

      console.error(error);
      toast.error('Credenciales incorrectas. Intenta de nuevo.');

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen flex items-stretch text-on-surface w-full bg-background absolute inset-0 z-50 overflow-y-auto">
      <main className="flex w-full min-h-full">
        {/* Left Panel: Imagery & Brand Message */}
        <section className="hidden lg:flex lg:w-1/2 relative items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img className="w-full h-full object-cover" data-alt="Humanitarian workers" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8rqC4imeIBb5KpFUCatjl2htLsDTa58QM7P4T-xF30ZJwr8Fv9Wt4aitT2S8nhhgnROymQE2IOmjP7kefCQOD2UOLBQoXZLWj142AflX6w4eTRNufMZY3bQ7ATtcNPk9pyRnuBbPDSdNPwgpFJOTmdVv7GcER1kaMJdJEMQyi43QupybfabmH5q7fzM-6jPVDLRfTgT0WCeNGe3bL-TqrOSQ11RsQJ0wOhW8Ad_C3jMbUEb5IaXqZRL0ZCgC3Ih7RGlTtUXb9GsY" />
            <div className="absolute inset-0 bg-primary/40 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
          </div>
          <div className="relative z-10 px-gutter max-w-2xl text-white text-left">
            <h1 className="font-display-lg text-[48px] leading-[56px] font-bold mb-stack-sm">Donaton: Conectando Ayuda con Necesidad</h1>
            <p className="font-body-lg text-[18px] leading-[28px] opacity-90 max-w-lg">
              Optimizando la respuesta humanitaria global mediante una coordinación institucional precisa y transparente.
            </p>
          </div>
        </section>

        {/* Right Panel: Login Form */}
        <section className="w-full lg:w-1/2 flex items-center justify-center bg-surface-container-lowest p-6 md:p-12 overflow-y-auto">
          <div className="w-full max-w-md flex flex-col gap-6 text-left my-auto">
            {/* Brand Header */}
            <div className="flex flex-col gap-2 items-center lg:items-start">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined notranslate text-primary text-4xl">volunteer_activism</span>
                <span className="font-headline-lg text-3xl font-bold text-primary tracking-tight">Donaton</span>
              </div>
              <h2 className="font-headline-md text-2xl font-semibold text-on-surface">Bienvenido de nuevo</h2>
              <p className="font-body-md text-on-surface-variant">Inicie sesión en su cuenta institucional</p>
            </div>

            {/* Form */}
            <form className="flex flex-col gap-6" onSubmit={handleLogin}>
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-200">
                  {error}
                </div>
              )}

              {/* Email Field */}
              <div className="flex flex-col gap-1">
                <label className="font-label-md text-xs font-semibold text-outline uppercase tracking-wider" htmlFor="email">Correo Electrónico Institucional</label>
                <div className="relative">
                  <span className="material-symbols-outlined notranslate absolute left-3 top-1/2 -translate-y-1/2 text-outline text-xl">mail</span>
                  <input
                    className="w-full pl-10 pr-4 py-3 bg-white border border-outline-variant rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-md text-on-surface"
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

              {/* Password Field */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <label className="font-label-md text-xs font-semibold text-outline uppercase tracking-wider" htmlFor="password">Contraseña</label>
                  <a className="text-xs font-medium text-primary hover:underline transition-all" href="#" onClick={(e) => { e.preventDefault(); alert('Enviando enlace de recuperación...'); }}>¿Olvidó su contraseña?</a>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined notranslate absolute left-3 top-1/2 -translate-y-1/2 text-outline text-xl">lock</span>
                  <input
                    className="w-full pl-10 pr-10 py-3 bg-white border border-outline-variant rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-md text-on-surface"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-primary" type="button" onClick={() => setShowPassword(!showPassword)}>
                    <span className="material-symbols-outlined notranslate text-xl">{showPassword ? "visibility_off" : "visibility"}</span>
                  </button>
                </div>
              </div>

              {/* Action Button */}
              <button disabled={loading} className="w-full bg-primary hover:bg-primary/90 text-on-primary py-4 rounded-lg font-bold shadow-sm transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed" type="submit">
                {loading ? 'Ingresando...' : 'Acceder al Sistema'}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-2">
              <div className="h-px bg-outline-variant flex-grow"></div>
              <span className="text-xs font-semibold text-outline">O</span>
              <div className="h-px bg-outline-variant flex-grow"></div>
            </div>

            {/* SSO Login */}
            <button className="w-full flex items-center justify-center gap-3 border border-outline-variant bg-white py-3 rounded-lg font-medium text-on-surface hover:bg-slate-50 transition-all" type="button" onClick={() => alert('Iniciando sesión con proveedor SSO...')}>
              <span className="material-symbols-outlined notranslate text-xl text-primary">id_card</span>
              Inicio de sesión con SSO
            </button>

            {/* Registration Link */}
            <div className="text-center mt-2">
              <p className="text-sm text-on-surface-variant">
                ¿No tienes una cuenta?
                <Link className="text-primary font-bold ml-1 hover:underline" to="/registro-usuario">
                  Crear Cuenta Institucional
                </Link>
              </p>
            </div>

            {/* Footer */}
            <footer className="mt-8 text-center text-xs text-outline leading-relaxed">
              <p>
                © 2024 Donaton Humanitarian Platform.
                <br />
                <a className="hover:text-primary underline mx-1" href="#">Términos de Servicio</a> |
                <a className="hover:text-primary underline mx-1" href="#">Soporte</a>
              </p>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}
