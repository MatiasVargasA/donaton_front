import React from 'react';
import { Link } from 'react-router-dom';

export default function PanelControlGlobal() {
  return (
    <>

      <main className="ml-64 min-h-screen">
        <header className="bg-white border-b border-slate-200 h-16 sticky top-0 z-40 flex justify-between items-center w-full px-6">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg" data-icon="search">search</span>
              <input className="w-full bg-slate-50 border-none rounded-full pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-[#1A4F8B]/20" placeholder="Buscar ayuda, envíos o reportes..." type="text"/>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <button className="text-slate-500 hover:bg-slate-50 p-2 rounded-full transition-colors cursor-pointer active:opacity-80">
                <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
              </button>
              <button className="text-slate-500 hover:bg-slate-50 p-2 rounded-full transition-colors cursor-pointer active:opacity-80">
                <span className="material-symbols-outlined" data-icon="help_outline">help_outline</span>
              </button>
            </div>
            <div className="flex items-center gap-3 border-l border-slate-200 pl-6">
              <div className="text-right">
                <p className="text-sm font-bold text-on-surface leading-tight">Admin Central</p>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Coordinador Global</p>
              </div>
              <Link to="/perfil" className="w-10 h-10 rounded-full bg-primary-container overflow-hidden border-2 border-white shadow-sm block">
                <img alt="Avatar del usuario administrativo" data-alt="professional portrait of a middle-aged administrative man with a neutral and confident expression in a clean studio setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuApICQXy7hUbLDlEIdNycBw-69CVDxq2WT6960fELha-9O-XXx8QQ3cFDzTa0ipjdSrkFKqm4pqlzhw00WmH4Bi7pkKZIWpSI-ItJ0RxieO0i-rxSDR853JC8Orp7isxOjXTpCBptXwp6ttO_bGSA2mYuLj653czwZ9Mn9oWpp8YAxXOa7Ltj6w3ja4pgihdLg1_9gBQ7kLZT9F5syeTJTILOHVAnNEIhMRTYEFcCccoMRS6hKwJG2yR4C98ZAeYWj7I4x5ZRSFtLY"/>
              </Link>
            </div>
          </div>
        </header>
        <div className="p-8 max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Resumen Operativo Global</h2>
            <p className="font-body-md text-body-md text-slate-500">Estado en tiempo real de la respuesta humanitaria y distribución de recursos.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-50 text-[#1A4F8B] flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl" data-icon="payments">payments</span>
                </div>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">+12% hoy</span>
              </div>
              <p className="text-slate-500 font-label-md uppercase mb-1">Fondos Desplegados</p>
              <h3 className="text-2xl font-black text-on-surface">$4.2M <span className="text-sm font-normal text-slate-400">USD</span></h3>
            </div>
            <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl" data-icon="warning">warning</span>
                </div>
                <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded">Alta Prioridad</span>
              </div>
              <p className="text-slate-500 font-label-md uppercase mb-1">Alertas Críticas</p>
              <h3 className="text-2xl font-black text-on-surface">14 <span className="text-sm font-normal text-slate-400">Activas</span></h3>
            </div>
            <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl" data-icon="groups">groups</span>
                </div>
                <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded">Meta 85%</span>
              </div>
              <p className="text-slate-500 font-label-md uppercase mb-1">Vidas Impactadas</p>
              <h3 className="text-2xl font-black text-on-surface">128.4k <span className="text-sm font-normal text-slate-400">Personas</span></h3>
            </div>
            <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl" data-icon="local_shipping">local_shipping</span>
                </div>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">En ruta</span>
              </div>
              <p className="text-slate-500 font-label-md uppercase mb-1">Entregas Hoy</p>
              <h3 className="text-2xl font-black text-on-surface">342 <span className="text-sm font-normal text-slate-400">Kits</span></h3>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                  <h4 className="font-headline-md text-headline-md">Mapa de Intervención Activa</h4>
                  <div className="flex gap-2">
                    <span className="flex items-center gap-1 text-xs text-slate-500"><span className="w-2 h-2 rounded-full bg-red-500"></span> Emergencia</span>
                    <span className="flex items-center gap-1 text-xs text-slate-500"><span className="w-2 h-2 rounded-full bg-green-500"></span> Despliegue</span>
                  </div>
                </div>
                <div className="relative h-[400px] w-full bg-slate-100 overflow-hidden">
                  <img alt="Mapa regional interactivo" className="w-full h-full object-cover opacity-80" data-alt="clean minimal topographic map of a region with subtle grid lines and highlighted hot zones in red and blue" data-location="Mexico City" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfMqX9djb8_4C_VhJVOxyZjNUAGlMgf0bP8s5iqS5znnEiqj_zjWwMFxjc-1x0OCCNrLhQN5WSjKkIpEgEsCzngvUXb1_vUkYVCuvXD7PMVjotXZGD5pCMX8_zDtdZHoxqA8hYhE5CV9PMfs7O9piYPIsg6xXjmijVF9pCvWASkY9s19DzV0QRwnrMA4CLC-XALzbumlrtfmwWEbv8Gb_ejdcw_5dNzTjD-y3xLBDXQJgWX3FtKWD45TnJeRIznOlURp7jjRtwwCo"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div>
                  <div className="absolute top-1/4 left-1/3 group cursor-pointer">
                    <div className="w-4 h-4 bg-red-500 rounded-full animate-ping absolute opacity-75"></div>
                    <div className="relative w-4 h-4 bg-red-600 border-2 border-white rounded-full"></div>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white px-3 py-1 rounded shadow-lg text-[10px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Sector Norte: Agua Potable</div>
                  </div>
                  <div className="absolute bottom-1/3 right-1/4 group cursor-pointer">
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-ping absolute opacity-75"></div>
                    <div className="relative w-4 h-4 bg-green-600 border-2 border-white rounded-full"></div>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white px-3 py-1 rounded shadow-lg text-[10px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Logística Central: Suministros</div>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 flex justify-between items-center px-6">
                  <p className="text-xs text-slate-500">Última actualización: hace 4 minutos</p>
                  <button className="text-[#1A4F8B] text-xs font-bold flex items-center gap-1 hover:underline">
                    Ver Mapa Completo <span className="material-symbols-outlined text-sm" data-icon="chevron_right">chevron_right</span>
                  </button>
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                  <h4 className="font-headline-md text-headline-md">Flujo de Actividad</h4>
                  <button className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">Filtrar</button>
                </div>
                <div className="p-6">
                  <div className="relative space-y-8 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
                    <div className="relative pl-10">
                      <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-blue-100 border-4 border-white flex items-center justify-center">
                        <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      </div>
                      <div className="flex justify-between items-start mb-1">
                        <h5 className="text-sm font-bold text-on-surface">Envío confirmado a Sector Este</h5>
                        <span className="text-[10px] font-bold text-slate-400">HACE 15 MIN</span>
                      </div>
                      <p className="text-sm text-slate-600 mb-2">2,500 kits de higiene médica han salido del almacén central.</p>
                      <div className="flex gap-2">
                        <span className="text-[10px] px-2 py-0.5 bg-surface-variant text-primary rounded font-bold uppercase tracking-wider">Logística</span>
                        <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-500 rounded font-bold uppercase tracking-wider">ID: #8821</span>
                      </div>
                    </div>
                    <div className="relative pl-10">
                      <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-orange-100 border-4 border-white flex items-center justify-center">
                        <span className="w-2 h-2 rounded-full bg-orange-600"></span>
                      </div>
                      <div className="flex justify-between items-start mb-1">
                        <h5 className="text-sm font-bold text-on-surface">Alerta de Escasez: Zona Inundada A</h5>
                        <span className="text-[10px] font-bold text-slate-400">HACE 1 HORA</span>
                      </div>
                      <p className="text-sm text-slate-600 mb-2">Se requiere refuerzo de raciones de alimentos secos para 500 familias.</p>
                      <div className="flex gap-2">
                        <span className="text-[10px] px-2 py-0.5 bg-orange-100 text-orange-700 rounded font-bold uppercase tracking-wider">Crítico</span>
                        <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-500 rounded font-bold uppercase tracking-wider">Refugio 4</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm">
                <div className="p-6 border-b border-slate-100">
                  <h4 className="font-headline-md text-headline-md">Necesidades Prioritarias</h4>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-blue-600" data-icon="water_drop">water_drop</span>
                        <span className="text-sm font-bold">Agua Potable</span>
                      </div>
                      <span className="text-xs font-bold text-slate-400">75% Cubierto</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-green-600" data-icon="medication">medication</span>
                        <span className="text-sm font-bold">Insumos Médicos</span>
                      </div>
                      <span className="text-xs font-bold text-slate-400">42% Cubierto</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-600 rounded-full" style={{ width: '42%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-orange-600" data-icon="restaurant">restaurant</span>
                        <span className="text-sm font-bold">Raciones Alimenticias</span>
                      </div>
                      <span className="text-xs font-bold text-slate-400">90% Cubierto</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-600 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-purple-600" data-icon="home">home</span>
                        <span className="text-sm font-bold">Kits de Refugio</span>
                      </div>
                      <span className="text-xs font-bold text-slate-400">28% Cubierto</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-600 rounded-full" style={{ width: '28%' }}></div>
                    </div>
                  </div>
                  <button className="w-full py-2 text-sm font-bold text-[#1A4F8B] border border-[#1A4F8B] rounded-lg hover:bg-blue-50 transition-colors">Ver Detalles de Inventario</button>
                </div>
              </div>
              <div className="bg-primary-container rounded-xl p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="relative z-10">
                  <span className="material-symbols-outlined text-3xl mb-4" data-icon="volunteer_activism">volunteer_activism</span>
                  <h4 className="text-lg font-bold mb-2">Impulsa una Campaña</h4>
                  <p className="text-blue-100 text-sm mb-6 leading-relaxed">Las necesidades de Refugio han aumentado un 15% esta semana. Crea una nueva campaña de recaudación focalizada.</p>
                  <button className="bg-white text-primary px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-slate-50 transition-colors">Iniciar Campaña</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="fixed bottom-8 right-8 z-50">
        <button className="w-14 h-14 bg-[#1A4F8B] text-white rounded-full shadow-xl flex items-center justify-center hover:scale-105 transition-transform active:scale-95 group">
          <span className="material-symbols-outlined text-2xl group-hover:rotate-12 transition-transform" data-icon="add">add</span>
        </button>
      </div>
    </>
  );
}
