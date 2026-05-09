import React from 'react';
import { Link } from 'react-router-dom';

export default function RegistroDonaciones() {
  return (
    <>
      {/* TopAppBar Shell */}
      <header className="bg-white dark:bg-slate-900 text-[#1A4F8B] dark:text-blue-400 font-public-sans text-sm font-medium docked full-width top-0 z-40 border-b border-slate-200 dark:border-slate-800 flat no shadows flex justify-between items-center w-full px-6 h-16 fixed">
        <div className="flex items-center gap-margin-desktop">
          <span className="text-2xl font-black text-[#1A4F8B] dark:text-blue-400 tracking-tight">Donaton</span>
          <div className="hidden md:flex gap-6 items-center">
            <nav className="flex gap-4">
              <span className="text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer active:opacity-80 px-2 py-1">Panel de Control</span>
              <span className="text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer active:opacity-80 px-2 py-1">Mapa de Necesidades</span>
              <span className="text-[#1A4F8B] dark:text-blue-400 border-b-2 border-[#1A4F8B] px-2 py-1">Registro de Donaciones</span>
              <span className="text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer active:opacity-80 px-2 py-1">Reportes de Terreno</span>
            </nav>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors rounded-full">
            <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
          </button>
          <button className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors rounded-full">
            <span className="material-symbols-outlined" data-icon="help_outline">help_outline</span>
          </button>
          <Link to="/perfil" className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 block">
            <img alt="Avatar del usuario administrativo" className="w-full h-full object-cover" data-alt="Close-up portrait of a professional male administrator in a brightly lit modern office environment" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAScWNdot5OqRN6S8SBZx0GFByQY-eeYbX2wrenG65mWPzsZDbGyJW-Vk2Iy-zOlaKw07-r0apumSEu3zgszKbCuFiUBdKLnHddonR5sIj0Pdpz4pVjQ4y2WTcxbuXUhTrmfk75NWNPttwD3B8MtmKcCml5gBXpxhdrad2RCPxJZo1DbFC9-9OTq8453cdMGxGS6iXoq5YAA1lzPojaO4ffwsSsYkh3IpN7d0xQwxMTt3tMuT3M-ZXs7fmGR7MOrXUj1Nom9Hlb-_M"/>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="lg:ml-64 pt-24 pb-12 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-[1200px] mx-auto">
          {/* Header Section */}
          <div className="mb-stack-lg">
            <h1 className="font-display-lg text-display-lg text-primary mb-2">Registro de Donaciones</h1>
            <p className="font-body-lg text-body-lg text-outline">Formulario de alta eficiencia para la gestión de suministros humanitarios.</p>
          </div>
          
          {/* Bento Form Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            {/* Primary Form Fields */}
            <div className="md:col-span-8 space-y-gutter">
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6 text-primary">
                  <span className="material-symbols-outlined" data-icon="description">description</span>
                  <h3 className="font-headline-md text-headline-md">Detalles del Suministro</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-stack-md">
                  <div className="flex flex-col gap-stack-xs">
                    <label className="font-label-md text-label-md text-on-surface-variant">Tipo de Donación</label>
                    <select className="w-full p-3 border-2 border-surface-container rounded-lg focus:border-primary outline-none transition-all bg-surface-container-low font-body-md text-body-md">
                      <option value="">Seleccionar categoría...</option>
                      <option value="alimentos">Alimentos No Perecederos</option>
                      <option value="medico">Suministros Médicos</option>
                      <option value="agua">Agua y Saneamiento</option>
                      <option value="refugio">Material de Refugio</option>
                      <option value="higiene">Kits de Higiene</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-stack-xs">
                    <label className="font-label-md text-label-md text-on-surface-variant">Entidad Donante</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline" data-icon="business">business</span>
                      <input className="w-full pl-10 p-3 border-2 border-surface-container rounded-lg focus:border-primary outline-none transition-all bg-surface-container-low font-body-md text-body-md" placeholder="Nombre de la organización" type="text"/>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-stack-xs">
                      <label className="font-label-md text-label-md text-on-surface-variant">Cantidad</label>
                      <input className="w-full p-3 border-2 border-surface-container rounded-lg focus:border-primary outline-none transition-all bg-surface-container-low font-body-md text-body-md" placeholder="0.00" type="number"/>
                    </div>
                    <div className="flex flex-col gap-stack-xs">
                      <label className="font-label-md text-label-md text-on-surface-variant">Unidad</label>
                      <select className="w-full p-3 border-2 border-surface-container rounded-lg focus:border-primary outline-none transition-all bg-surface-container-low font-body-md text-body-md">
                        <option value="kg">Kilogramos (kg)</option>
                        <option value="l">Litros (l)</option>
                        <option value="un">Unidades (un)</option>
                        <option value="cajas">Cajas</option>
                        <option value="pallets">Pallets</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col gap-stack-xs">
                    <label className="font-label-md text-label-md text-on-surface-variant">Fecha de Recepción</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline" data-icon="calendar_today">calendar_today</span>
                      <input className="w-full pl-10 p-3 border-2 border-surface-container rounded-lg focus:border-primary outline-none transition-all bg-surface-container-low font-body-md text-body-md" type="date"/>
                    </div>
                  </div>
                </div>
                <div className="mt-stack-md flex flex-col gap-stack-xs">
                  <label className="font-label-md text-label-md text-on-surface-variant">Descripción de la Carga</label>
                  <textarea className="w-full p-3 border-2 border-surface-container rounded-lg focus:border-primary outline-none transition-all bg-surface-container-low font-body-md text-body-md resize-none" placeholder="Detalle el contenido, fechas de vencimiento si aplica o especificaciones técnicas..." rows="4"></textarea>
                </div>
              </div>
              
              {/* Additional Notes & Urgency */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6 text-primary">
                  <span className="material-symbols-outlined" data-icon="assignment">assignment</span>
                  <h3 className="font-headline-md text-headline-md">Información Logística</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-stack-md">
                  <div className="flex flex-col gap-stack-xs">
                    <label className="font-label-md text-label-md text-on-surface-variant">Prioridad de Distribución</label>
                    <div className="flex gap-4 mt-2">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input className="text-secondary focus:ring-secondary" name="priority" type="radio"/>
                        <span className="font-body-sm text-body-sm group-hover:text-secondary transition-colors">Normal</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input className="text-tertiary focus:ring-tertiary" name="priority" type="radio"/>
                        <span className="font-body-sm text-body-sm group-hover:text-tertiary transition-colors">Urgente</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input className="text-error focus:ring-error" name="priority" type="radio"/>
                        <span className="font-body-sm text-body-sm group-hover:text-error transition-colors">Crítica</span>
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-col gap-stack-xs">
                    <label className="font-label-md text-label-md text-on-surface-variant">Destino Sugerido</label>
                    <input className="w-full p-3 border-2 border-surface-container rounded-lg focus:border-primary outline-none transition-all bg-surface-container-low font-body-md text-body-md" placeholder="Ej. Almacén Central, Zona de Desastre A" type="text"/>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Media & Actions Column */}
            <div className="md:col-span-4 space-y-gutter">
              {/* Verification Photos */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4 text-primary">
                  <span className="material-symbols-outlined" data-icon="photo_camera">photo_camera</span>
                  <h3 className="font-headline-md text-headline-md">Verificación</h3>
                </div>
                <p className="font-body-sm text-body-sm text-outline mb-4">Suba fotos del estado de la carga y sellos de seguridad.</p>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="aspect-square rounded-lg border-2 border-dashed border-outline-variant flex flex-col items-center justify-center bg-surface-container-low hover:bg-surface-variant transition-colors cursor-pointer group">
                    <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors" data-icon="add_a_photo">add_a_photo</span>
                    <span className="font-label-md text-label-md text-outline mt-2">Añadir</span>
                  </div>
                  <div className="aspect-square rounded-lg overflow-hidden border border-outline-variant relative group">
                    <img alt="Cajas de suministros" className="w-full h-full object-cover" data-alt="Close-up of stacked cardboard boxes in a clean warehouse with bright industrial lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7HovgFYx-UwCyoqhzVCrXE-23BEHvxRLS-doNEZCZcOfj9irITvdx3Z6vYUhKu6mUFqTJahkKpSdngrQPizYG-jmfwQGJCZvfoJjwBgh6qS5EOgO5RIYIuxd0qfmPMgcWrr2Fs5rxtst-ww-HwoenadYr0HkHNXa2lH0n2XNQ0XmTMXK3uRHgwqCTMkc22WCh58ylSb-vu9shgWdtrEc-Kempukl1k2Z6XwC_ABfaKfyyzjAXwvY1sX6TqyE76jeKeegUELaaLPE"/>
                    <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <span className="material-symbols-outlined text-white cursor-pointer" data-icon="delete">delete</span>
                    </div>
                  </div>
                </div>
                <button className="w-full py-2 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary/5 transition-colors flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined" data-icon="cloud_upload">cloud_upload</span>
                  Subir Archivos
                </button>
              </div>
              
              {/* Summary Card */}
              <div className="bg-primary-container text-white rounded-xl p-6 shadow-lg overflow-hidden relative">
                <div className="absolute -right-8 -top-8 opacity-10">
                  <span className="material-symbols-outlined text-[120px]" data-icon="volunteer_activism">volunteer_activism</span>
                </div>
                <h3 className="font-headline-md text-headline-md mb-4 relative z-10">Resumen del Registro</h3>
                <div className="space-y-3 relative z-10">
                  <div className="flex justify-between border-b border-white/20 pb-2">
                    <span className="font-body-sm text-body-sm opacity-80">Categoría</span>
                    <span className="font-body-sm text-body-sm font-bold">Por definir</span>
                  </div>
                  <div className="flex justify-between border-b border-white/20 pb-2">
                    <span className="font-body-sm text-body-sm opacity-80">Cantidad Total</span>
                    <span className="font-body-sm text-body-sm font-bold">0.00</span>
                  </div>
                  <div className="flex justify-between border-b border-white/20 pb-2">
                    <span className="font-body-sm text-body-sm opacity-80">Prioridad</span>
                    <span className="font-body-sm text-body-sm font-bold">Pendiente</span>
                  </div>
                </div>
                <div className="mt-8 space-y-3 relative z-10">
                  <button className="w-full bg-secondary text-white py-4 rounded-lg font-bold text-lg shadow-md hover:bg-[#802a00] transition-transform active:scale-[0.98]">
                    Confirmar Donación
                  </button>
                  <button className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg font-medium transition-colors">
                    Guardar como Borrador
                  </button>
                </div>
              </div>
              
              {/* Help Alert */}
              <div className="bg-secondary-fixed text-on-secondary-fixed p-4 rounded-lg flex gap-3">
                <span className="material-symbols-outlined" data-icon="info">info</span>
                <div>
                  <p className="font-label-md text-label-md font-bold mb-1">Guía de Inspección</p>
                  <p className="text-[11px] leading-tight">Asegúrese de que todos los productos perecederos tengan al menos 6 meses de vigencia antes del registro.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
