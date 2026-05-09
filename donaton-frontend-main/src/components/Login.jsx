import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // En un caso real, aquí validaríamos credenciales.
    // Por ahora, redirigimos al dashboard.
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-stretch text-on-surface w-full bg-background">
      <main className="flex w-full min-h-screen">
        {/* Left Panel: Imagery & Brand Message */}
        <section className="hidden lg:flex lg:w-1/2 relative items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img className="w-full h-full object-cover" data-alt="A cinematic, high-quality photograph of humanitarian workers in soft morning light, carefully handing boxes of essential food and medical supplies to local community members in a remote village." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8rqC4imeIBb5KpFUCatjl2htLsDTa58QM7P4T-xF30ZJwr8Fv9Wt4aitT2S8nhhgnROymQE2IOmjP7kefCQOD2UOLBQoXZLWj142AflX6w4eTRNufMZY3bQ7ATtcNPk9pyRnuBbPDSdNPwgpFJOTmdVv7GcER1kaMJdJEMQyi43QupybfabmH5q7fzM-6jPVDLRfTgT0WCeNGe3bL-TqrOSQ11RsQJ0wOhW8Ad_C3jMbUEb5IaXqZRL0ZCgC3Ih7RGlTtUXb9GsY"/>
            <div className="absolute inset-0 bg-primary/40 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
          </div>
          <div className="relative z-10 px-gutter max-w-2xl text-white">
            <h1 className="font-headline-lg text-display-lg mb-stack-sm">Donaton: Conectando Ayuda con Necesidad</h1>
            <p className="font-body-lg text-body-lg opacity-90 max-w-lg">
                Optimizando la respuesta humanitaria global mediante una coordinación institucional precisa y transparente.
            </p>
          </div>
        </section>

        {/* Right Panel: Login Form */}
        <section className="w-full lg:w-1/2 flex items-center justify-center bg-surface-container-lowest p-margin-mobile md:p-margin-desktop">
          <div className="w-full max-w-md flex flex-col gap-stack-md">
            {/* Brand Header */}
            <div className="flex flex-col gap-stack-xs items-center lg:items-start">
              <div className="flex items-center gap-2 mb-stack-sm">
                <span className="material-symbols-outlined text-primary text-4xl" data-icon="volunteer_activism">volunteer_activism</span>
                <span className="font-headline-lg text-headline-lg text-primary tracking-tight">Donaton</span>
              </div>
              <h2 className="font-headline-md text-headline-md text-on-surface">Bienvenido de nuevo</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Inicie sesión en su cuenta institucional</p>
            </div>
            
            {/* Form */}
            <form className="flex flex-col gap-stack-md" onSubmit={handleLogin}>
              {/* Email Field */}
              <div className="flex flex-col gap-stack-xs">
                <label className="font-label-md text-label-md text-outline" htmlFor="email">CORREO ELECTRÓNICO INSTITUCIONAL</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg" data-icon="mail">mail</span>
                  <input className="w-full pl-10 pr-4 py-3 bg-white border border-outline-variant rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-body-md" id="email" name="email" placeholder="ejemplo@organizacion.org" type="email" required/>
                </div>
              </div>
              
              {/* Password Field */}
              <div className="flex flex-col gap-stack-xs">
                <div className="flex justify-between items-center">
                  <label className="font-label-md text-label-md text-outline" htmlFor="password">CONTRASEÑA</label>
                  <a className="font-label-md text-label-md text-primary hover:underline transition-all" href="#">¿Olvidó su contraseña?</a>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg" data-icon="lock">lock</span>
                  <input className="w-full pl-10 pr-10 py-3 bg-white border border-outline-variant rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-body-md" id="password" name="password" placeholder="••••••••" type="password" required/>
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-primary" type="button">
                    <span className="material-symbols-outlined text-lg" data-icon="visibility">visibility</span>
                  </button>
                </div>
              </div>
              
              {/* Action Button */}
              <button className="w-full bg-primary hover:bg-primary-container text-on-primary py-4 rounded font-headline-md text-body-md shadow-sm transition-all active:opacity-80" type="submit">
                Acceder al Sistema
              </button>
            </form>
            
            {/* Divider */}
            <div className="flex items-center gap-stack-sm my-stack-sm">
              <div className="h-px bg-outline-variant flex-grow"></div>
              <span className="font-label-md text-label-md text-outline">O</span>
              <div className="h-px bg-outline-variant flex-grow"></div>
            </div>
            
            {/* SSO Login */}
            <button className="w-full flex items-center justify-center gap-stack-sm border border-outline-variant bg-white py-3 rounded font-data-tabular text-body-md text-on-surface hover:bg-surface-container-low transition-all" type="button">
              <span className="material-symbols-outlined text-xl text-primary" data-icon="id_card">id_card</span>
              Inicio de sesión con Single Sign-On (SSO)
            </button>
            
            {/* Footer */}
            <footer className="mt-stack-lg text-center lg:text-left">
              <p className="font-body-sm text-body-sm text-outline">
                © 2024 Donaton Humanitarian Platform. 
                <br className="md:hidden"/>
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
