import React from 'react';
import { Link } from 'react-router-dom';

export default function MapaNecesidades() {
  return (
    <div className="flex h-screen bg-background font-body-md text-on-background overflow-hidden">

      {/* Main Content Canvas */}
      <main className="ml-64 flex-1 flex flex-col relative h-full">
        {/* TopAppBar */}
        <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 z-40 h-16 flex justify-between items-center px-6 sticky top-0">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg" data-icon="search">search</span>
              <input className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-full pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary-container outline-none" placeholder="Buscar regiones, necesidades o incidentes..." type="text"/>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-slate-500 cursor-pointer hover:text-primary transition-colors" data-icon="notifications">notifications</span>
              <span className="material-symbols-outlined text-slate-500 cursor-pointer hover:text-primary transition-colors" data-icon="help_outline">help_outline</span>
            </div>
            <Link to="/perfil" className="h-8 w-8 rounded-full bg-primary-container flex items-center justify-center overflow-hidden border-2 border-white shadow-sm block">
              <img alt="Avatar del usuario administrativo" data-alt="Close-up portrait of a professional man in his 40s with a kind expression and clean-cut appearance for an administrative profile avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9MTjmtOdGzPBT-IUjsP7J_pjEK1WUyNVYGBUmGZBQ6wCZ3FmdpvKUC1SbCwD2iX057iKkxsqzFEqoJfUvUHrVft7D8gTDJ-5T0dTz-Hbp0WdeZjkBz_r4MkwpfjecQDqvZrCsSaRsv6syXRLvCLhRvrnUBNWOtk9Fmzl9h4-nZHpXF3dA_mjpM0kOsD4YsSr9DhGqRYDW0b_cq29FntS79ZL3iYndUnWElkcy50dirZO9PN2xfPGZ_k9t7CvxFBTMgf8xhBZyviM"/>
            </Link>
          </div>
        </header>

        {/* Map Workspace Area */}
        <div className="flex-1 relative overflow-hidden bg-surface flex">
          {/* Filter Sidebar (Right side, overlay or docked) */}
          <div className="w-80 h-full bg-white/90 backdrop-blur-md border-l border-slate-200 z-30 flex flex-col shadow-xl">
            <div className="p-6 border-b border-slate-100">
              <h2 className="font-headline-md text-primary mb-1">Filtros de Red</h2>
              <p className="text-xs text-outline font-label-md">Personalizar vista de despliegue</p>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Type of Need */}
              <div>
                <h3 className="font-label-md text-on-surface-variant uppercase mb-4">Tipo de Necesidad</h3>
                <div className="space-y-3">
                  <label className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded bg-error flex items-center justify-center">
                        <span className="material-symbols-outlined text-[10px] text-white" data-icon="check">check</span>
                      </div>
                      <span className="text-body-sm font-medium">Medicina &amp; Salud</span>
                    </div>
                    <span className="text-xs font-bold bg-error-container text-on-error-container px-2 py-0.5 rounded-full">12</span>
                  </label>
                  <label className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded bg-primary flex items-center justify-center">
                        <span className="material-symbols-outlined text-[10px] text-white" data-icon="check">check</span>
                      </div>
                      <span className="text-body-sm font-medium">Alimentos &amp; Agua</span>
                    </div>
                    <span className="text-xs font-bold bg-primary-container text-on-primary-container px-2 py-0.5 rounded-full">28</span>
                  </label>
                  <label className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 border border-outline rounded"></div>
                      <span className="text-body-sm font-medium text-outline">Refugio &amp; Techo</span>
                    </div>
                    <span className="text-xs font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">08</span>
                  </label>
                </div>
              </div>
              {/* Regions */}
              <div>
                <h3 className="font-label-md text-on-surface-variant uppercase mb-4">Región de Impacto</h3>
                <select className="w-full bg-surface border border-outline-variant rounded-lg text-body-sm py-2 px-3 focus:ring-primary focus:border-primary outline-none">
                  <option>Todas las regiones</option>
                  <option>Zona Norte - Alta Prioridad</option>
                  <option>Zona Centro - Estable</option>
                  <option>Zona Sur - Vigilancia</option>
                </select>
              </div>
              {/* Legend */}
              <div>
                <h3 className="font-label-md text-on-surface-variant uppercase mb-4">Niveles de Urgencia</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="relative h-4 w-4">
                      <div className="absolute inset-0 bg-error rounded-full marker-pulse"></div>
                      <div className="absolute inset-1 bg-error rounded-full border border-white"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="text-body-sm font-bold text-error">Crítico</span>
                        <span className="text-xs text-outline">Inmediato</span>
                      </div>
                      <div className="h-1.5 w-full bg-error-container rounded-full mt-1">
                        <div className="h-full bg-error w-4/5 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-4 w-4 bg-secondary rounded-full border-2 border-white shadow-sm"></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="text-body-sm font-bold text-secondary">Moderado</span>
                        <span className="text-xs text-outline">24-48 hrs</span>
                      </div>
                      <div className="h-1.5 w-full bg-secondary-fixed rounded-full mt-1">
                        <div className="h-full bg-secondary w-2/5 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 bg-surface-container-low border-t border-slate-200">
              <button className="w-full flex items-center justify-center gap-2 text-primary font-bold text-sm hover:underline">
                <span className="material-symbols-outlined text-lg" data-icon="file_download">file_download</span>
                Exportar Datos Geográficos
              </button>
            </div>
          </div>
          {/* The Map Content */}
          <div className="flex-1 relative map-grid-overlay overflow-hidden">
            {/* Abstract Vector Map Mockup */}
            <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
              <path d="M150,200 Q200,100 400,150 T700,200 T900,400 T800,700 T500,800 T200,600 Z" fill="none" stroke="#1A4F8B" strokeWidth="0.5"></path>
              <path d="M300,300 L500,350 L700,300 L800,500 L600,600 L400,550 Z" fill="none" stroke="#1A4F8B" strokeDasharray="5,5" strokeWidth="0.25"></path>
              <path d="M0,500 Q500,450 1000,500" fill="none" stroke="#cfe6f2" strokeWidth="1"></path>
              <path d="M500,0 Q450,500 500,1000" fill="none" stroke="#cfe6f2" strokeWidth="1"></path>
            </svg>
            {/* Map Markers (Simulated Geolocated Points) */}
            {/* Marker 1: High Urgency */}
            <div className="absolute top-[25%] left-[35%] group cursor-pointer z-20">
              <div className="relative h-10 w-10">
                <div className="absolute inset-0 bg-error rounded-full marker-pulse opacity-20"></div>
                <div className="absolute inset-2 bg-error rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white transition-transform group-hover:scale-125">
                  <span className="material-symbols-outlined text-sm" data-icon="medical_services">medical_services</span>
                </div>
              </div>
              {/* Tooltip Card */}
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-48 bg-white p-3 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-error/20">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-bold text-error uppercase">Crítico</span>
                  <span className="text-[10px] text-outline">Hace 15 min</span>
                </div>
                <p className="text-xs font-bold text-on-surface">Insulina y Antibióticos</p>
                <p className="text-[10px] text-on-surface-variant">Centro Comunitario San José</p>
                <div className="mt-2 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-error w-4/5"></div>
                </div>
              </div>
            </div>
            {/* Marker 2: Moderate Urgency */}
            <div className="absolute top-[45%] left-[60%] group cursor-pointer z-20">
              <div className="relative h-8 w-8">
                <div className="absolute inset-0 bg-secondary rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white transition-transform group-hover:scale-125">
                  <span className="material-symbols-outlined text-sm" data-icon="restaurant">restaurant</span>
                </div>
              </div>
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-48 bg-white p-3 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-secondary/20">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-bold text-secondary uppercase">Moderado</span>
                  <span className="text-[10px] text-outline">Hace 2 hrs</span>
                </div>
                <p className="text-xs font-bold text-on-surface">50 Kits de Alimentos</p>
                <p className="text-[10px] text-on-surface-variant">Escuela Rural N° 14</p>
                <div className="mt-2 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-secondary w-1/3"></div>
                </div>
              </div>
            </div>
            {/* Marker 3: Low Urgency / General */}
            <div className="absolute top-[60%] left-[20%] group cursor-pointer z-20">
              <div className="relative h-8 w-8">
                <div className="absolute inset-0 bg-primary rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white transition-transform group-hover:scale-125">
                  <span className="material-symbols-outlined text-sm" data-icon="water_drop">water_drop</span>
                </div>
              </div>
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-48 bg-white p-3 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-primary/20">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-bold text-primary uppercase">Estable</span>
                  <span className="text-[10px] text-outline">Recurrente</span>
                </div>
                <p className="text-xs font-bold text-on-surface">Suministro de Agua Potable</p>
                <p className="text-[10px] text-on-surface-variant">Sector Industrial Sur</p>
                <div className="mt-2 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-full"></div>
                </div>
              </div>
            </div>
            {/* Map Controls Overlay */}
            <div className="absolute bottom-8 left-8 flex flex-col gap-2 z-40">
              <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center text-on-surface hover:bg-slate-50 transition-colors border border-slate-200">
                <span className="material-symbols-outlined" data-icon="add">add</span>
              </button>
              <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center text-on-surface hover:bg-slate-50 transition-colors border border-slate-200">
                <span className="material-symbols-outlined" data-icon="remove">remove</span>
              </button>
              <div className="h-px w-6 bg-slate-200 my-1 self-center"></div>
              <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center text-primary hover:bg-slate-50 transition-colors border border-slate-200">
                <span className="material-symbols-outlined" data-icon="my_location">my_location</span>
              </button>
            </div>
            {/* Status Summary Float */}
            <div className="absolute top-8 left-8 bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white z-40 max-w-xs">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-primary-container/20 rounded-lg">
                  <span className="material-symbols-outlined text-primary" data-icon="map">map</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-primary">Vista de Campo</h4>
                  <p className="text-[10px] text-outline">Actualizado en tiempo real</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-2 bg-surface rounded-lg">
                  <p className="text-[10px] uppercase text-outline font-bold">Activos</p>
                  <p className="text-lg font-black text-primary">48</p>
                </div>
                <div className="text-center p-2 bg-error-container/20 rounded-lg">
                  <p className="text-[10px] uppercase text-error font-bold">Alertas</p>
                  <p className="text-lg font-black text-error">05</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* FAB Action Button */}
      <button className="fixed bottom-8 z-50 h-14 w-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-105 transition-transform group" style={{ right: "340px" }}>
        <span className="material-symbols-outlined text-2xl" data-icon="add_location">add_location</span>
        <span className="absolute right-full mr-4 bg-primary text-white px-3 py-1.5 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">Reportar Necesidad</span>
      </button>
    </div>
  );
}
