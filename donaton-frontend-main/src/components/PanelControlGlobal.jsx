import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiDonaciones, apiNecesidades } from '../api';

export default function PanelControlGlobal() {
  const [donaciones, setDonaciones] = useState([]);
  const [necesidades, setNecesidades] = useState([]);
  const [totalCantidad, setTotalCantidad] = useState(0);

  useEffect(() => {
    cargarDonaciones();
    cargarNecesidades();
  }, []);

  const cargarDonaciones = async () => {
    try {
      const response = await apiDonaciones.get('/donaciones');
      const data = response.data;
      setDonaciones(data);
      const suma = data.reduce((acc, d) => acc + d.cantidad, 0);
      setTotalCantidad(suma);
    } catch (error) {
      console.error(error);
    }
  };

  const cargarNecesidades = async () => {
    try {
      const response = await apiNecesidades.get('/necesidades');
      setNecesidades(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen bg-[#F1F5F9] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">Panel de Control</h1>
          <p className="text-slate-500 font-medium italic">Visión estratégica de la ayuda humanitaria en tiempo real.</p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <div className="bg-white p-6 rounded-3xl shadow-sm border-b-4 border-[#1A4F8B] flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Total Donaciones</p>
              <p className="text-4xl font-black text-[#1A4F8B]">{donaciones.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-[#1A4F8B]">
              <span className="material-symbols-outlined text-3xl">volunteer_activism</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border-b-4 border-green-500 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Artículos Recibidos</p>
              <p className="text-4xl font-black text-green-600">{totalCantidad}</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
              <span className="material-symbols-outlined text-3xl">inventory_2</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border-b-4 border-orange-500 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Necesidades Críticas</p>
              <p className="text-4xl font-black text-orange-600">{necesidades.length}</p>
            </div>
            <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600">
              <span className="material-symbols-outlined text-3xl">emergency</span>
            </div>
          </div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Section: Donations */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-xl font-bold text-[#1A4F8B] flex items-center gap-2">
                <span className="material-symbols-outlined">history</span>
                Donaciones Recientes
              </h2>
              <Link to="/registro" className="text-xs font-bold text-blue-600 hover:underline">Ver todas</Link>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {donaciones.length === 0 ? (
                  <p className="text-center text-slate-400 py-10">No hay donaciones registradas.</p>
                ) : (
                  donaciones.slice(0, 5).map((d) => (
                    <div key={d.id} className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50/30 border border-blue-100/50 hover:bg-blue-50 transition-colors">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#1A4F8B] shadow-sm">
                        <span className="material-symbols-outlined">local_shipping</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-slate-700">{d.tipo}</p>
                        <p className="text-xs text-slate-500">Origen: {d.origen}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-[#1A4F8B]">+{d.cantidad}</p>
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Unidades</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Section: Needs/Reports */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-xl font-bold text-orange-600 flex items-center gap-2">
                <span className="material-symbols-outlined">warning</span>
                Necesidades en Terreno
              </h2>
              <Link to="/reportes" className="text-xs font-bold text-orange-600 hover:underline">Gestionar reportes</Link>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {necesidades.length === 0 ? (
                  <p className="text-center text-slate-400 py-10">No hay reportes de necesidad.</p>
                ) : (
                  necesidades.slice(0, 5).map((n) => (
                    <div key={n.id} className="flex items-center gap-4 p-4 rounded-2xl bg-orange-50/30 border border-orange-100/50 hover:bg-orange-50 transition-colors">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-orange-600 shadow-sm">
                        <span className="material-symbols-outlined">person_pin_circle</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-slate-700">{n.descripcion}</p>
                        <p className="text-xs text-slate-500">Ubicación: {n.ubicacion}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-orange-600">{n.cantidadNecesaria}</p>
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Requerido</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
