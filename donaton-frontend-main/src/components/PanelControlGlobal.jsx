import React from 'react';

export default function PanelControlGlobal() {
  return (
    <div className="flex flex-col min-h-full w-full">
      {/* Dashboard Canvas */}
      <div className="p-margin-desktop space-y-8 max-w-[1600px] w-full mx-auto">
        {/* Welcome Header */}
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-background">Centro de Comando Operativo</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Estado actual de la red de ayuda humanitaria nacional.</p>
        </div>

        {/* KPI Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {/* KPI Card 1 */}
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="material-symbols-outlined text-primary text-3xl">volunteer_activism</span>
              <span className="text-tertiary font-bold text-xs bg-tertiary/10 px-2 py-1 rounded">+12% vs last week</span>
            </div>
            <div className="mt-4">
              <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Total Donaciones</p>
              <p className="font-headline-md text-headline-md text-on-surface mt-1">$4,280,500</p>
            </div>
          </div>

          {/* KPI Card 2 */}
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="material-symbols-outlined text-error text-3xl">priority_high</span>
              <span className="text-error font-bold text-xs bg-error/10 px-2 py-1 rounded">Urgente</span>
            </div>
            <div className="mt-4">
              <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Necesidades Críticas</p>
              <p className="font-headline-md text-headline-md text-on-surface mt-1">42 Casos</p>
            </div>
          </div>

          {/* KPI Card 3 */}
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="material-symbols-outlined text-secondary text-3xl">local_shipping</span>
              <span className="text-secondary font-bold text-xs bg-secondary/10 px-2 py-1 rounded">En Tránsito</span>
            </div>
            <div className="mt-4">
              <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Ayuda Despachada</p>
              <p className="font-headline-md text-headline-md text-on-surface mt-1">18 Toneladas</p>
            </div>
          </div>

          {/* KPI Card 4 */}
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="material-symbols-outlined text-tertiary text-3xl">family_restroom</span>
              <span className="text-tertiary font-bold text-xs bg-tertiary/10 px-2 py-1 rounded">Impacto Real</span>
            </div>
            <div className="mt-4">
              <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Familias Beneficiadas</p>
              <p className="font-headline-md text-headline-md text-on-surface mt-1">1,240</p>
            </div>
          </div>
        </div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
          {/* Weekly Flow Chart */}
          <div className="lg:col-span-2 bg-surface-container-lowest p-8 rounded-xl border border-outline-variant shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Flujo Semanal de Ayuda</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Toneladas de suministros distribuidos por día</p>
              </div>
              <select className="bg-surface-container-low border-none rounded-lg text-sm px-4 py-2 focus:ring-primary">
                <option>Últimos 7 días</option>
                <option>Últimos 30 días</option>
              </select>
            </div>
            {/* Chart Simulation */}
            <div className="h-[300px] flex items-end justify-between gap-4 pt-4">
              <div className="w-full flex flex-col items-center gap-2">
                <div className="w-full bg-primary-container/20 rounded-t-lg h-[40%] relative group overflow-hidden">
                  <div className="absolute bottom-0 w-full bg-primary h-[80%] rounded-t-lg"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-on-surface/5 text-[10px] font-bold">2.4T</div>
                </div>
                <span className="text-[10px] font-bold text-on-surface-variant">LUN</span>
              </div>
              <div className="w-full flex flex-col items-center gap-2">
                <div className="w-full bg-primary-container/20 rounded-t-lg h-[60%] relative group overflow-hidden">
                  <div className="absolute bottom-0 w-full bg-primary h-[90%] rounded-t-lg"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-on-surface/5 text-[10px] font-bold">3.8T</div>
                </div>
                <span className="text-[10px] font-bold text-on-surface-variant">MAR</span>
              </div>
              <div className="w-full flex flex-col items-center gap-2">
                <div className="w-full bg-primary-container/20 rounded-t-lg h-[80%] relative group overflow-hidden">
                  <div className="absolute bottom-0 w-full bg-primary h-[100%] rounded-t-lg"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-on-surface/5 text-[10px] font-bold">5.1T</div>
                </div>
                <span className="text-[10px] font-bold text-on-surface-variant">MIE</span>
              </div>
              <div className="w-full flex flex-col items-center gap-2">
                <div className="w-full bg-primary-container/20 rounded-t-lg h-[50%] relative group overflow-hidden">
                  <div className="absolute bottom-0 w-full bg-primary h-[70%] rounded-t-lg"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-on-surface/5 text-[10px] font-bold">2.9T</div>
                </div>
                <span className="text-[10px] font-bold text-on-surface-variant">JUE</span>
              </div>
              <div className="w-full flex flex-col items-center gap-2">
                <div className="w-full bg-primary-container/20 rounded-t-lg h-[95%] relative group overflow-hidden">
                  <div className="absolute bottom-0 w-full bg-primary h-[100%] rounded-t-lg"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-on-surface/5 text-[10px] font-bold">6.2T</div>
                </div>
                <span className="text-[10px] font-bold text-on-surface-variant">VIE</span>
              </div>
              <div className="w-full flex flex-col items-center gap-2">
                <div className="w-full bg-primary-container/20 rounded-t-lg h-[40%] relative group overflow-hidden">
                  <div className="absolute bottom-0 w-full bg-primary h-[50%] rounded-t-lg"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-on-surface/5 text-[10px] font-bold">1.8T</div>
                </div>
                <span className="text-[10px] font-bold text-on-surface-variant">SAB</span>
              </div>
              <div className="w-full flex flex-col items-center gap-2">
                <div className="w-full bg-primary-container/20 rounded-t-lg h-[25%] relative group overflow-hidden">
                  <div className="absolute bottom-0 w-full bg-primary h-[40%] rounded-t-lg"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-on-surface/5 text-[10px] font-bold">0.9T</div>
                </div>
                <span className="text-[10px] font-bold text-on-surface-variant">DOM</span>
              </div>
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Alertas Recientes</h3>
              <span className="material-symbols-outlined text-outline">more_vert</span>
            </div>
            <div className="space-y-4">
              <div className="flex gap-4 p-3 bg-error-container/20 border-l-4 border-error rounded-r-lg">
                <span className="material-symbols-outlined text-error shrink-0">flood</span>
                <div>
                  <p className="font-label-lg text-label-lg text-on-error-container">Inundación en Sector Norte</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Se requieren 500 kits de higiene urgentes.</p>
                  <p className="text-[10px] font-bold text-error mt-2">HACE 15 MIN</p>
                </div>
              </div>

              <div className="flex gap-4 p-3 bg-secondary-container/10 border-l-4 border-secondary rounded-r-lg">
                <span className="material-symbols-outlined text-secondary shrink-0">warning</span>
                <div>
                  <p className="font-label-lg text-label-lg text-on-secondary-container">Escasez de Agua Potable</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Municipalidad de Santa Rosa reporta desabastecimiento.</p>
                  <p className="text-[10px] font-bold text-secondary mt-2">HACE 2 HORAS</p>
                </div>
              </div>

              <div className="flex gap-4 p-3 bg-surface-container-low border-l-4 border-outline rounded-r-lg">
                <span className="material-symbols-outlined text-on-surface-variant shrink-0">info</span>
                <div>
                  <p className="font-label-lg text-label-lg text-on-surface">Cierre de Ruta 7</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Logística afectada para despachos al sur.</p>
                  <p className="text-[10px] font-bold text-on-surface-variant mt-2">HACE 4 HORAS</p>
                </div>
              </div>
            </div>
            <button className="w-full text-primary font-bold text-sm py-2 hover:bg-primary-container/10 rounded-lg transition-colors">
              Ver todas las alertas
            </button>
          </div>

          {/* Recent Dispatches List */}
          <div className="lg:col-span-3 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
            <div className="p-6 border-b border-outline-variant flex items-center justify-between">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Despachos Recientes</h3>
              <div className="flex gap-2">
                <button className="px-4 py-2 text-sm font-bold border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors">Filtrar</button>
                <button className="px-4 py-2 text-sm font-bold bg-primary text-on-primary rounded-lg hover:opacity-90 transition-opacity">Exportar Log</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-surface-container-low">
                  <tr>
                    <th className="px-6 py-4 font-label-lg text-label-lg text-on-surface-variant">ID Despacho</th>
                    <th className="px-6 py-4 font-label-lg text-label-lg text-on-surface-variant">Destino</th>
                    <th className="px-6 py-4 font-label-lg text-label-lg text-on-surface-variant">Suministro</th>
                    <th className="px-6 py-4 font-label-lg text-label-lg text-on-surface-variant">Fecha</th>
                    <th className="px-6 py-4 font-label-lg text-label-lg text-on-surface-variant">Estado</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  <tr>
                    <td className="px-6 py-4 font-label-lg text-on-surface">#D-8829</td>
                    <td className="px-6 py-4 font-body-md text-on-surface-variant">Centro Comunitario El Sol</td>
                    <td className="px-6 py-4 font-body-md text-on-surface-variant">Alimentos No Perecederos</td>
                    <td className="px-6 py-4 font-body-md text-on-surface-variant">Hoy, 10:45 AM</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-container/20 text-tertiary text-xs font-bold">
                        <span className="w-2 h-2 rounded-full bg-tertiary"></span> Entregado
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-primary hover:underline font-bold text-sm">Detalles</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-label-lg text-on-surface">#D-8830</td>
                    <td className="px-6 py-4 font-body-md text-on-surface-variant">Hospital Regional Norte</td>
                    <td className="px-6 py-4 font-body-md text-on-surface-variant">Insumos Médicos Clase A</td>
                    <td className="px-6 py-4 font-body-md text-on-surface-variant">Hoy, 08:30 AM</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/20 text-secondary text-xs font-bold">
                        <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span> En Camino
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-primary hover:underline font-bold text-sm">Detalles</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-label-lg text-on-surface">#D-8831</td>
                    <td className="px-6 py-4 font-body-md text-on-surface-variant">Campamento Esperanza</td>
                    <td className="px-6 py-4 font-body-md text-on-surface-variant">Carpas y Mantas Termicas</td>
                    <td className="px-6 py-4 font-body-md text-on-surface-variant">Pendiente</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant text-xs font-bold">
                        <span className="w-2 h-2 rounded-full bg-outline"></span> En Preparación
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-primary hover:underline font-bold text-sm">Detalles</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Footer Branding */}
      <footer className="mt-auto p-gutter bg-surface-container-low border-t border-outline-variant flex justify-between items-center w-full">
        <div className="flex items-center gap-2 opacity-50">
          <span className="material-symbols-outlined text-sm">shield</span>
          <span className="text-[10px] font-bold tracking-widest uppercase">Protocolo de Emergencia Activado</span>
        </div>
        <p className="text-[10px] text-on-surface-variant font-medium">© 2024 Donaton Central - Red Global de Ayuda Humanitaria</p>
      </footer>

      {/* FAB */}
      <button className="fixed bottom-margin-desktop right-margin-desktop bg-primary text-on-primary h-14 w-14 rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform">
        <span className="material-symbols-outlined text-3xl">add_alert</span>
      </button>
    </div>
  );
}
