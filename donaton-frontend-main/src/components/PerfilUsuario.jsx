import React from 'react';
import { Link } from 'react-router-dom';

export default function PerfilUsuario() {
  return (
    <>
      <main className="ml-64 min-h-screen">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-40 flex justify-between items-center w-full px-6 h-16">
          <div className="flex items-center gap-4">
            <span className="text-2xl font-black text-[#1A4F8B] tracking-tight">Donaton</span>
            <div className="h-6 w-px bg-slate-200 mx-2"></div>
            <h2 className="font-public-sans text-sm font-medium text-slate-500">Perfil de Usuario</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <span className="material-symbols-outlined text-slate-500 cursor-pointer p-2 hover:bg-slate-50 rounded-full transition-colors" data-icon="notifications">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full border-2 border-white"></span>
            </div>
            <span className="material-symbols-outlined text-slate-500 cursor-pointer p-2 hover:bg-slate-50 rounded-full transition-colors" data-icon="help_outline">help_outline</span>
            <Link to="/perfil">
              <img alt="Avatar del usuario administrativo" className="w-8 h-8 rounded-full border border-slate-200 object-cover" data-alt="A professional headshot of a woman in her late 30s with a warm and confident expression." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5i87aY5GVUeUjtZ7peH4rTv8XBxBUb8vyZXTcq-bj3XDB0ZAXK4I-u0vG3ft0SzRlhlKqORDCGJ9Yjty8JlKk250-qKDYhhGBUWDh4rXHqqRT86zveudy_95fKrUH7-wBeSyrvXWKeY55gdwJsrFxDQJ2t_3q5lRrJ-ma3CLdamoHI76A83_NCFkq-0RPPlFaUSX0o5dHVL3rS6Qy7aIehi7xeHpID55LW4j9AGLLhJxPdrrzfzAG-Pwrwj7WPBHASeh6SA7okks"/>
            </Link>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto space-y-stack-md">
          {/* Hero Profile Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
            {/* User Identity Card */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-outline-variant p-stack-md flex flex-col md:flex-row gap-stack-md items-center md:items-start">
              <div className="relative">
                <img alt="Elena Rodríguez Profile" className="w-32 h-32 md:w-40 md:h-40 rounded-xl object-cover border-4 border-surface-container-low shadow-sm" data-alt="A high-quality, professional portrait of Elena Rodríguez" src="https://lh3.googleusercontent.com/aida-public/AB6AXuASFAb7eJZ5l8JpVCyA4Pr6v329hs88ZJxnfRudCHYQQYuQhq3mO3EXxhSIL79dBk-iq8lrIBxVwl0338jFAg7EwAF69sKYorjKOogg_3aYSyJELHf--KESHEE54O6b2wm4KYkw4XToP7zr_2roJEBAcFo5CXkoWyso2CewOOVVGyTBBAw4gj1VsRsPQmkh1w8A9QiQWz_OkOLsd69uE7uZ4UxWVfftOjkIWloMvJ3vfH2afumk-eHfoD2Nv93I52emAejF4JmJznE"/>
                <div className="absolute -bottom-2 -right-2 bg-[#1A4F8B] text-white p-2 rounded-lg shadow-lg">
                  <span className="material-symbols-outlined text-sm" data-icon="verified" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                </div>
              </div>
              <div className="flex-grow space-y-stack-xs text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-stack-xs">
                  <h1 className="font-headline-lg text-headline-lg text-on-surface">Elena Rodríguez</h1>
                  <button className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-md text-label-md hover:bg-primary-container transition-colors flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-sm" data-icon="edit">edit</span>
                    Editar Perfil
                  </button>
                </div>
                <p className="font-body-lg text-body-lg text-primary font-semibold">Coordinadora de Campo</p>
                <div className="flex items-center justify-center md:justify-start gap-2 text-on-surface-variant font-body-md text-body-md">
                  <span className="material-symbols-outlined text-sm" data-icon="corporate_fare">corporate_fare</span>
                  Cruz Roja Internacional
                </div>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-stack-sm">
                  <span className="bg-surface-container text-primary px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]" data-icon="location_on">location_on</span> Ginebra, CH
                  </span>
                  <span className="bg-surface-container text-primary px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]" data-icon="language">language</span> Español, Inglés, Francés
                  </span>
                </div>
              </div>
            </div>
            {/* Contact Details */}
            <div className="bg-white rounded-xl border border-outline-variant p-stack-md space-y-stack-sm">
              <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Contacto</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-surface-container transition-colors group">
                  <div className="bg-primary-fixed text-on-primary-fixed p-2 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined" data-icon="mail">mail</span>
                  </div>
                  <div>
                    <p className="text-xs text-outline font-semibold">EMAIL</p>
                    <p className="font-body-md text-body-md text-on-surface">e.rodriguez@ifrc.org</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-surface-container transition-colors group">
                  <div className="bg-primary-fixed text-on-primary-fixed p-2 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined" data-icon="phone">phone</span>
                  </div>
                  <div>
                    <p className="text-xs text-outline font-semibold">TELÉFONO</p>
                    <p className="font-body-md text-body-md text-on-surface">+41 22 730 4212</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Impact Statistics (Bento Style) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            <div className="bg-surface-container-low border border-outline-variant p-stack-md rounded-xl flex flex-col items-center justify-center text-center space-y-2 group hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#1A4F8B] shadow-sm mb-2 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl" data-icon="volunteer_activism" style={{ fontVariationSettings: "'FILL' 1" }}>volunteer_activism</span>
              </div>
              <span className="font-display-lg text-display-lg text-primary">1,240</span>
              <span className="font-label-md text-label-md text-outline uppercase tracking-wider">Donaciones Facilitadas</span>
            </div>
            <div className="bg-surface-container-low border border-outline-variant p-stack-md rounded-xl flex flex-col items-center justify-center text-center space-y-2 group hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-secondary shadow-sm mb-2 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl" data-icon="fact_check" style={{ fontVariationSettings: "'FILL' 1" }}>fact_check</span>
              </div>
              <span className="font-display-lg text-display-lg text-secondary">856</span>
              <span className="font-label-md text-label-md text-outline uppercase tracking-wider">Reportes Verificados</span>
            </div>
            <div className="bg-surface-container-low border border-outline-variant p-stack-md rounded-xl flex flex-col items-center justify-center text-center space-y-2 group hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-tertiary shadow-sm mb-2 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl" data-icon="rocket_launch" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
              </div>
              <span className="font-display-lg text-display-lg text-tertiary">42</span>
              <span className="font-label-md text-label-md text-outline uppercase tracking-wider">Misiones Completadas</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
            {/* Activity Feed */}
            <div className="lg:col-span-2 space-y-stack-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-headline-md text-headline-md text-on-surface">Historial de Actividad</h3>
                <button className="text-primary font-label-md text-label-md flex items-center gap-1 hover:underline">Ver todo <span className="material-symbols-outlined text-sm" data-icon="chevron_right">chevron_right</span></button>
              </div>
              <div className="space-y-4">
                {/* Activity Card 1 */}
                <div className="bg-white p-stack-md rounded-xl border border-outline-variant hover:border-primary transition-colors flex gap-stack-md">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined" data-icon="inventory_2">inventory_2</span>
                    </div>
                    <div className="w-0.5 flex-grow bg-slate-100"></div>
                  </div>
                  <div className="flex-grow space-y-1">
                    <div className="flex justify-between items-start">
                      <p className="font-body-md text-body-md font-bold text-on-surface">Validación de Carga Humanitaria</p>
                      <span className="text-xs text-outline">Hace 2 horas</span>
                    </div>
                    <p className="text-on-surface-variant font-body-sm text-body-sm">Elena verificó el contenido de 50 kits de primeros auxilios destinados a la región norte.</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Completado</span>
                      <span className="text-[10px] text-outline font-medium">ID: #HK-9821</span>
                    </div>
                  </div>
                </div>
                {/* Activity Card 2 */}
                <div className="bg-white p-stack-md rounded-xl border border-outline-variant hover:border-primary transition-colors flex gap-stack-md">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
                      <span className="material-symbols-outlined" data-icon="emergency">emergency</span>
                    </div>
                    <div className="w-0.5 flex-grow bg-slate-100"></div>
                  </div>
                  <div className="flex-grow space-y-1">
                    <div className="flex justify-between items-start">
                      <p className="font-body-md text-body-md font-bold text-on-surface">Reporte de Emergencia: Inundaciones</p>
                      <span className="text-xs text-outline">Ayer, 16:45</span>
                    </div>
                    <p className="text-on-surface-variant font-body-sm text-body-sm">Se emitió un reporte de necesidades críticas de agua potable en el sector costero.</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="bg-orange-100 text-orange-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Urgente</span>
                      <span className="text-[10px] text-outline font-medium">Zona A-4</span>
                    </div>
                  </div>
                </div>
                {/* Activity Card 3 */}
                <div className="bg-white p-stack-md rounded-xl border border-outline-variant hover:border-primary transition-colors flex gap-stack-md">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined" data-icon="group">group</span>
                    </div>
                  </div>
                  <div className="flex-grow space-y-1">
                    <div className="flex justify-between items-start">
                      <p className="font-body-md text-body-md font-bold text-on-surface">Reunión de Coordinación Regional</p>
                      <span className="text-xs text-outline">24 May, 2024</span>
                    </div>
                    <p className="text-on-surface-variant font-body-sm text-body-sm">Coordinación con equipos de logística locales para optimizar rutas de entrega.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Settings & Privacy */}
            <div className="space-y-stack-sm">
              <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Configuración</h3>
              <div className="bg-white rounded-xl border border-outline-variant overflow-hidden">
                <div className="p-4 border-b border-outline-variant hover:bg-slate-50 cursor-pointer transition-colors flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-outline" data-icon="notifications">notifications</span>
                    <span className="font-body-md text-body-md text-on-surface">Notificaciones</span>
                  </div>
                  <span className="material-symbols-outlined text-outline" data-icon="chevron_right">chevron_right</span>
                </div>
                <div className="p-4 border-b border-outline-variant hover:bg-slate-50 cursor-pointer transition-colors flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-outline" data-icon="language">language</span>
                    <div>
                      <span className="font-body-md text-body-md text-on-surface">Idioma</span>
                      <p className="text-xs text-outline">Español (ES)</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-outline" data-icon="chevron_right">chevron_right</span>
                </div>
                <div className="p-4 border-b border-outline-variant hover:bg-slate-50 cursor-pointer transition-colors flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-outline" data-icon="security">security</span>
                    <span className="font-body-md text-body-md text-on-surface">Seguridad y Acceso</span>
                  </div>
                  <span className="material-symbols-outlined text-outline" data-icon="chevron_right">chevron_right</span>
                </div>
                <div className="p-4 hover:bg-slate-50 cursor-pointer transition-colors flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-outline" data-icon="visibility">visibility</span>
                    <span className="font-body-md text-body-md text-on-surface">Privacidad de Datos</span>
                  </div>
                  <span className="material-symbols-outlined text-outline" data-icon="chevron_right">chevron_right</span>
                </div>
              </div>

              {/* App Stats Summary */}
              <div className="mt-stack-md bg-primary p-stack-md rounded-xl text-white">
                <p className="font-label-md text-label-md opacity-80 mb-2 uppercase tracking-widest">Resumen del Sistema</p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span>Tiempo de Respuesta</span>
                    <span className="font-bold">4.2 min</span>
                  </div>
                  <div className="w-full bg-primary-container h-1 rounded-full">
                    <div className="bg-white h-1 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Eficiencia Logística</span>
                    <span className="font-bold">92%</span>
                  </div>
                  <div className="w-full bg-primary-container h-1 rounded-full">
                    <div className="bg-white h-1 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
