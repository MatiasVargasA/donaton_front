import React from 'react';
import { Link } from 'react-router-dom';

export default function ReportesTerreno() {
  return (
    <>
      {/* TopAppBar */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 fixed top-0 z-40 w-full">
        <div className="flex justify-between items-center w-full px-6 h-16">
          <div className="flex items-center gap-8">
            <span className="text-2xl font-black text-[#1A4F8B] dark:text-blue-400 tracking-tight">Donaton</span>
            <div className="hidden md:flex relative group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
              <input className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm w-64 focus:ring-2 focus:ring-primary-container outline-none transition-all" placeholder="Buscar reportes..." type="text"/>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button className="p-2 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors rounded-full cursor-pointer">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button className="p-2 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors rounded-full cursor-pointer">
                <span className="material-symbols-outlined">help_outline</span>
              </button>
            </div>
            <Link to="/perfil" className="h-8 w-8 rounded-full overflow-hidden border border-slate-200 block">
              <img alt="Avatar del usuario administrativo" className="w-full h-full object-cover" data-alt="Professional portrait of a humanitarian administrator in a neutral office setting with soft natural light" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTdJnQQQu4XCsCItMeiIdylpEWwEOGYneG3VSz26G9YzWYvgg2FDO9e__ZD0zcV4Q4yMbSszozVoDUFgAS46Ul83Z1oxBNUcYYaCdeLKxLMUHEOii0G1y7pK3sskSbcvZz_rYQzPpqXmFDqcH3Fbg8yd8i1tiqwx4DPQnF7TaRZcwdfusA4BQP8F6fsD8Se1vq73XqC6E8G_JpST2ZlYhlhbxGAFibl4W4FRCng-ZkiGBoIg4Rbz-RxFAF0AHta-xBcNgV11-bO1s"/>
            </Link>
          </div>
        </div>
      </header>



      {/* Main Content */}
      <main className="md:ml-64 pt-16 min-h-screen">
        <div className="p-8 max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h1 className="font-headline-lg text-headline-lg text-primary mb-2">Reportes de Terreno</h1>
              <p className="font-body-md text-body-md text-on-surface-variant">Monitoreo y evaluación de incidencias críticas en tiempo real.</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-outline rounded-lg font-label-md text-label-md text-on-surface hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined text-[18px]">download</span>
                Exportar CSV
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-lg font-label-md text-label-md shadow-sm hover:opacity-90 transition-opacity">
                <span className="material-symbols-outlined text-[18px]">add</span>
                Nuevo Reporte
              </button>
            </div>
          </div>

          {/* Dashboard Analytics Quick View */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-stack-lg">
            <div className="bg-surface-container-lowest border border-outline-variant p-stack-md rounded-xl flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-error-container flex items-center justify-center text-error">
                <span className="material-symbols-outlined">warning</span>
              </div>
              <div>
                <p className="text-label-md text-on-surface-variant uppercase">Críticos</p>
                <p className="text-headline-md font-bold">12</p>
              </div>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant p-stack-md rounded-xl flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined">priority_high</span>
              </div>
              <div>
                <p className="text-label-md text-on-surface-variant uppercase">Alta Prioridad</p>
                <p className="text-headline-md font-bold">45</p>
              </div>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant p-stack-md rounded-xl flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-surface-container-highest flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">update</span>
              </div>
              <div>
                <p className="text-label-md text-on-surface-variant uppercase">Pendientes</p>
                <p className="text-headline-md font-bold">28</p>
              </div>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant p-stack-md rounded-xl flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary-container flex items-center justify-center text-white">
                <span className="material-symbols-outlined">task_alt</span>
              </div>
              <div>
                <p className="text-label-md text-on-surface-variant uppercase">Resueltos</p>
                <p className="text-headline-md font-bold">156</p>
              </div>
            </div>
          </div>

          {/* Filters & Search */}
          <div className="bg-white rounded-xl border border-outline-variant p-4 mb-stack-md flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px] relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
              <input className="w-full pl-10 pr-4 py-2 border border-outline-variant rounded-lg text-sm focus:ring-1 focus:ring-primary-container outline-none" placeholder="Filtrar por ID, ubicación o descripción..." type="text"/>
            </div>
            <select className="border border-outline-variant rounded-lg px-4 py-2 text-sm bg-white focus:ring-1 focus:ring-primary-container outline-none">
              <option>Todas las Prioridades</option>
              <option>Crítico</option>
              <option>Alto</option>
              <option>Medio</option>
            </select>
            <select className="border border-outline-variant rounded-lg px-4 py-2 text-sm bg-white focus:ring-1 focus:ring-primary-container outline-none">
              <option>Últimas 24 horas</option>
              <option>Última semana</option>
              <option>Último mes</option>
            </select>
            <button className="p-2 border border-outline-variant rounded-lg hover:bg-slate-50 transition-colors">
              <span className="material-symbols-outlined">filter_list</span>
            </button>
          </div>

          {/* Reports Grid (Asymmetric Layout / Bento Style Cards) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Large Featured Report */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-outline-variant overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-48">
                <img className="w-full h-full object-cover" data-alt="Satellite or high-angle view of a humanitarian supply hub with logistics trucks and organized aid packages in a desert environment" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3AUmG8EaJbA5QJFZnlC0jGcCjtoX7EqmQtqaDLai0eg52zkl5P-7kO2BYTZ9sQTk4-GqfiPMbTEh16amlAsinP1HJGvlUHjBBzzV-wCozS8oXPQmXXy9g_L5Dw2Xt1E7BJkbQnkZxfVxBk45SYdeSVtl8QVDoRVy2s3-OILU5KjO3AkC2i8PWhcUd9hKoc5ONZHQvps4F3nt38FmR0RaojoxSiep2laIFf30yXOhExM84cuT4l3l93IHnMf_OtjzKjsNPDhOtdUQ"/>
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 bg-error text-white text-[10px] font-bold uppercase rounded-full tracking-wider flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>emergency</span>
                    CRÍTICO
                  </span>
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-on-surface text-[10px] font-bold uppercase rounded-full tracking-wider">ID: #REP-2024-001</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-headline-md text-primary mb-1">Inundación Sector Norte - Albergue 4</h3>
                    <div className="flex items-center gap-4 text-on-surface-variant font-body-sm">
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">location_on</span> Zona 7, Guayaquil</span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">schedule</span> Hace 15 minutos</span>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-slate-50 rounded-full"><span className="material-symbols-outlined">more_vert</span></button>
                </div>
                <p className="font-body-md text-on-surface-variant mb-6">El albergue temporal ha superado su capacidad máxima tras el desbordamiento del río. Se requiere envío urgente de kits de higiene y agua potable para 200 familias adicionales.</p>
                <div className="flex items-center justify-between border-t border-outline-variant pt-4">
                  <div className="flex -space-x-2">
                    <img className="w-8 h-8 rounded-full border-2 border-white" data-alt="Volunteer field worker profile photo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfARn8CTpfepISyRrCsAE2d03p4pAn1ZYgzE7XVojdSc0Ic7Cc-sewkrmclqF3SadPMtmd1Hv0Gjdm6djyob53aqHWqxX4CpcRObVnGOv9Lkl-AqlV5Hd-sTlnj91VfkwwCuUD7v8oyp3WgKAjVQKsYLTz43YYspbCOwiPTicMNHxYVLcCEl_XBTTQC5AqAyNBc8ktdoriE6L8kfj8xcj3k7HVWE9dwfbUjxN0nIpZL7FnXFhvfsNkA0vCu3Kp_pRupfxdA5ytbz8"/>
                    <img className="w-8 h-8 rounded-full border-2 border-white" data-alt="Logistics coordinator profile photo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOzx_4meXC7EDHxEfH-jXoWcSxZBps6Z1kV65mm3fCYwEDqy9fbNb0G84D6n9J6czTvdMS0RgbbjGDncVWgX4UPtdqvMXy_ikWg3Z2QWXNlcMvxNllW0Xuons5DoJEOyAxjqPWGswQpqa-wO0WOzbVXmhQiTI2AoAVcQY8R3DI2IGiLMnz824W1ruRW167zrQrL-gHLXlt1lXZznQnr9tnGJ2Bkvd4UAD8ny9fmrGK170z6hWPtzgTJx8Aci41yAfUIGsVXb2A4IA"/>
                    <div className="w-8 h-8 rounded-full bg-surface-variant border-2 border-white flex items-center justify-center text-[10px] font-bold">+2</div>
                  </div>
                  <button className="text-primary font-label-md flex items-center gap-1 hover:underline">
                    Ver evaluación completa
                    <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Vertical Stats/Activity Column */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-surface-container-low border border-outline-variant rounded-xl p-6">
                <h4 className="font-label-md text-on-surface uppercase mb-4 tracking-widest">Actividad Reciente</h4>
                <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-outline-variant">
                  <div className="relative pl-8">
                    <div className="absolute left-0 top-1 w-[24px] h-[24px] rounded-full bg-white border-2 border-secondary flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-secondary"></div>
                    </div>
                    <p className="text-xs text-on-surface-variant">09:45 AM</p>
                    <p className="text-sm font-bold text-on-surface">Prioridad escalada</p>
                    <p className="text-xs text-on-surface-variant">Sector Sur: Incendio controlado</p>
                  </div>
                  <div className="relative pl-8">
                    <div className="absolute left-0 top-1 w-[24px] h-[24px] rounded-full bg-white border-2 border-primary flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <p className="text-xs text-on-surface-variant">09:12 AM</p>
                    <p className="text-sm font-bold text-on-surface">Reporte Cerrado</p>
                    <p className="text-xs text-on-surface-variant">Kits entregados en Comuna 4</p>
                  </div>
                  <div className="relative pl-8">
                    <div className="absolute left-0 top-1 w-[24px] h-[24px] rounded-full bg-white border-2 border-error flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-error"></div>
                    </div>
                    <p className="text-xs text-on-surface-variant">08:50 AM</p>
                    <p className="text-sm font-bold text-on-surface">Nueva Alerta Crítica</p>
                    <p className="text-xs text-on-surface-variant">Deslizamiento en Vía Panamericana</p>
                  </div>
                </div>
              </div>
              <div className="bg-primary text-white rounded-xl p-6 overflow-hidden relative">
                <div className="relative z-10">
                  <h4 className="font-headline-md mb-2">Resumen de Impacto</h4>
                  <p className="text-sm text-primary-fixed mb-4">Total de personas asistidas hoy</p>
                  <p className="text-4xl font-black mb-6">4,829</p>
                  <div className="w-full bg-primary-container h-2 rounded-full overflow-hidden">
                    <div className="bg-white h-full" style={{ width: "75%" }}></div>
                  </div>
                  <p className="text-[10px] mt-2 text-primary-fixed uppercase tracking-wider">75% de la meta diaria alcanzada</p>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container rounded-full -mr-10 -mt-10 opacity-50 blur-3xl"></div>
              </div>
            </div>

            {/* Regular Report Cards */}
            <div className="bg-white rounded-xl border border-outline-variant p-5 shadow-sm hover:border-primary transition-all group">
              <div className="flex justify-between items-center mb-3">
                <span className="px-2 py-1 bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold rounded">ALTO</span>
                <span className="text-[10px] text-on-surface-variant font-data-tabular">#REP-2024-042</span>
              </div>
              <h5 className="font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">Escasez de Medicinas</h5>
              <p className="text-sm text-on-surface-variant line-clamp-2 mb-4">Puesto médico rural requiere reposición inmediata de antibióticos y kits de primeros auxilios.</p>
              <div className="flex items-center gap-2 text-[11px] text-on-surface-variant">
                <span className="material-symbols-outlined text-[14px]">location_on</span>
                Poblado El Cedro, Loja
              </div>
            </div>

            <div className="bg-white rounded-xl border border-outline-variant p-5 shadow-sm hover:border-primary transition-all group">
              <div className="flex justify-between items-center mb-3">
                <span className="px-2 py-1 bg-surface-variant text-primary text-[10px] font-bold rounded">MEDIO</span>
                <span className="text-[10px] text-on-surface-variant font-data-tabular">#REP-2024-043</span>
              </div>
              <h5 className="font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">Evaluación de Estructura</h5>
              <p className="text-sm text-on-surface-variant line-clamp-2 mb-4">Puente peatonal con fisuras visibles tras sismo leve. Se requiere inspección de ingeniería.</p>
              <div className="flex items-center gap-2 text-[11px] text-on-surface-variant">
                <span className="material-symbols-outlined text-[14px]">location_on</span>
                Río Guayas, Muelle 2
              </div>
            </div>

            <div className="bg-white rounded-xl border border-outline-variant p-5 shadow-sm hover:border-primary transition-all group">
              <div className="flex justify-between items-center mb-3">
                <span className="px-2 py-1 bg-error-container text-on-error-container text-[10px] font-bold rounded">CRÍTICO</span>
                <span className="text-[10px] text-on-surface-variant font-data-tabular">#REP-2024-044</span>
              </div>
              <h5 className="font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">Corte de Energía - Hospital</h5>
              <p className="text-sm text-on-surface-variant line-clamp-2 mb-4">Generador de emergencia fallando. 15 pacientes en cuidados intensivos en riesgo.</p>
              <div className="flex items-center gap-2 text-[11px] text-on-surface-variant">
                <span className="material-symbols-outlined text-[14px]">location_on</span>
                Distrito Central
              </div>
            </div>
          </div>

          {/* Detailed Table View */}
          <div className="mt-stack-lg bg-white rounded-xl border border-outline-variant overflow-hidden">
            <div className="p-4 border-b border-outline-variant bg-slate-50 flex justify-between items-center">
              <h3 className="font-label-md text-on-surface-variant uppercase tracking-widest">Todos los Reportes (Historial)</h3>
              <div className="flex items-center gap-2">
                <button className="p-1 hover:bg-white rounded"><span className="material-symbols-outlined text-[20px]">chevron_left</span></button>
                <span className="text-xs font-data-tabular">1-10 de 256</span>
                <button className="p-1 hover:bg-white rounded"><span className="material-symbols-outlined text-[20px]">chevron_right</span></button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 text-[11px] text-on-surface-variant font-bold uppercase tracking-wider">
                    <th className="px-6 py-3 border-b border-outline-variant">ID</th>
                    <th className="px-6 py-3 border-b border-outline-variant">Fecha</th>
                    <th className="px-6 py-3 border-b border-outline-variant">Prioridad</th>
                    <th className="px-6 py-3 border-b border-outline-variant">Ubicación</th>
                    <th className="px-6 py-3 border-b border-outline-variant">Descripción</th>
                    <th className="px-6 py-3 border-b border-outline-variant">Estado</th>
                    <th className="px-6 py-3 border-b border-outline-variant"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-data-tabular text-sm">#REP-039</td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant">14 May, 2024</td>
                    <td className="px-6 py-4">
                      <span className="inline-block w-2 h-2 rounded-full bg-secondary mr-2"></span>
                      <span className="text-sm font-medium">Alto</span>
                    </td>
                    <td className="px-6 py-4 text-sm">San Francisco, Sector B</td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant max-w-xs truncate">Fuga de gas en cocina comunitaria. Evacuación preventiva...</td>
                    <td className="px-6 py-4">
                      <span className="bg-surface-container-high text-on-primary-fixed-variant px-2 py-1 rounded-full text-[10px] font-bold">EN PROCESO</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-primary hover:text-primary-container"><span className="material-symbols-outlined">visibility</span></button>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-data-tabular text-sm">#REP-038</td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant">14 May, 2024</td>
                    <td className="px-6 py-4">
                      <span className="inline-block w-2 h-2 rounded-full bg-surface-variant mr-2"></span>
                      <span className="text-sm font-medium">Medio</span>
                    </td>
                    <td className="px-6 py-4 text-sm">Escuela Fiscal 12</td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant max-w-xs truncate">Petición de carpas adicionales para actividades lúdicas...</td>
                    <td className="px-6 py-4">
                      <span className="bg-primary-container text-white px-2 py-1 rounded-full text-[10px] font-bold">RESUELTO</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-primary hover:text-primary-container"><span className="material-symbols-outlined">visibility</span></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Navigation (Bottom Bar) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 flex justify-around items-center h-16 px-4">
        <a className="flex flex-col items-center gap-1 text-slate-500">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[10px]">Inicio</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-slate-500">
          <span className="material-symbols-outlined">location_on</span>
          <span className="text-[10px]">Mapa</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-[#1A4F8B] font-bold">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>analytics</span>
          <span className="text-[10px]">Reportes</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-slate-500">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px]">Perfil</span>
        </a>
      </nav>
    </>
  );
}
