import React, { useState, useEffect } from 'react';
import { apiLogistica, apiNecesidades } from '../api';
import toast from 'react-hot-toast';

export default function GestionLogistica() {
  const [envios, setEnvios] = useState([]);
  const [necesidades, setNecesidades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    destino: '',
    transporte: 'Camión Institucional',
    cantidad: '',
    estado: 'PENDIENTE'
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [resEnvios, resNecesidades] = await Promise.all([
        apiLogistica.get('/logistica'),
        apiNecesidades.get('/necesidades')
      ]);
      setEnvios(resEnvios.data);
      setNecesidades(resNecesidades.data);
    } catch (error) {
      console.error(error);
      toast.error('Error al cargar datos logísticos');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await apiLogistica.post('/logistica', formData);
      if (response.status === 200 || response.status === 201) {
        toast.success('Envío programado correctamente');
        setFormData({
          destino: '',
          transporte: 'Camión Institucional',
          cantidad: '',
          estado: 'PENDIENTE'
        });
        cargarDatos();
      }
    } catch (error) {
      console.error(error);
      toast.error('Error al registrar el envío');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ENTREGADO': return 'bg-green-100 text-green-700 border-green-200';
      case 'EN CAMINO': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-amber-100 text-amber-700 border-amber-200';
    }
  };

  return (
    <main className="min-h-screen bg-[#F1F5F9] pb-20">
      {/* Header Logistics */}
      <div className="bg-[#0F172A] text-white py-14 px-8 mb-10 shadow-2xl">
        <div className="max-w-6xl mx-auto flex items-center gap-8">
          <div className="w-20 h-20 bg-blue-500 rounded-3xl flex items-center justify-center shadow-lg shadow-blue-500/30">
            <span className="material-symbols-outlined text-5xl">local_shipping</span>
          </div>
          <div>
            <h1 className="text-5xl font-black tracking-tighter mb-2">Gestión Logística</h1>
            <p className="text-slate-400 text-lg font-medium">Coordinación de despacho y transporte de ayuda humanitaria.</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Form Column */}
        <div className="lg:col-span-1">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 sticky top-10">
            <h2 className="text-2xl font-black text-slate-800 mb-8">Programar Envío</h2>

            <div className="space-y-6">
              <div>
                <label className="text-xs font-black text-slate-400 uppercase mb-3 block tracking-widest">Destino (Reporte Terreno)</label>
                <select
                  name="destino"
                  value={formData.destino}
                  onChange={handleChange}
                  required
                  className="w-full p-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-500 outline-none transition-all font-bold text-slate-700"
                >
                  <option value="">Seleccione destino...</option>
                  {necesidades.map((n) => (
                    <option key={n.id} value={n.ubicacion}>{n.ubicacion} - {n.descripcion}</option>
                  ))}
                </select>
              </div>

              {formData.destino && (
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                  <p className="font-bold text-blue-800">
                    Destino seleccionado:
                  </p>
                  <p className="text-sm text-slate-700">
                    {formData.destino}
                  </p>
                </div>
              )}

              <div>
                <label className="text-xs font-black text-slate-400 uppercase mb-3 block tracking-widest">Medio de Transporte</label>
                <select
                  name="transporte"
                  value={formData.transporte}
                  onChange={handleChange}
                  className="w-full p-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-500 outline-none transition-all font-bold text-slate-700"
                >
                  <option value="Camión Institucional">Camión Institucional</option>
                  <option value="Vehículo de Rescate">Vehículo de Rescate</option>
                  <option value="Avión de Carga">Avión de Carga</option>
                  <option value="Embarcación">Embarcación</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-black text-slate-400 uppercase mb-3 block tracking-widest">Cantidad a Despachar</label>
                <input
                  type="number"
                  name="cantidad"
                  value={formData.cantidad}
                  onChange={handleChange}
                  required
                  placeholder="Ej: 500"
                  className="w-full p-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-500 outline-none transition-all font-bold"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-blue-600/20 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {loading ? 'Procesando...' : 'Iniciar Despacho'}
              </button>
            </div>
          </form>
        </div>

        {/* Tracking List Column */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
              <span className="material-symbols-outlined text-blue-600">trolley</span>
              Seguimiento de Envíos
            </h2>
            <button onClick={cargarDatos} className="p-3 bg-white rounded-2xl border border-slate-200 text-slate-500 hover:text-blue-600 transition-colors">
              <span className="material-symbols-outlined">refresh</span>
            </button>
          </div>

          <div className="grid gap-6">
            {envios.length === 0 ? (
              <div className="bg-white rounded-[2.5rem] p-16 text-center border-2 border-dashed border-slate-200">
                <span className="material-symbols-outlined text-7xl text-slate-200 mb-4">package</span>
                <p className="text-slate-400 font-bold text-xl italic">No hay envíos programados actualmente.</p>
              </div>
            ) : (
              envios.map((e) => (
                <div key={e.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6 items-center group hover:shadow-xl transition-all">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${getStatusColor(e.estado)}`}>
                    <span className="material-symbols-outlined text-3xl">
                      {e.transporte.includes('Avión') ? 'flight' : e.transporte.includes('Camión') ? 'local_shipping' : 'directions_car'}
                    </span>
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-col md:flex-row items-center gap-3 mb-1">
                      <p className="text-xl font-black text-slate-800">{e.destino}</p>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black border ${getStatusColor(e.estado)}`}>
                        {e.estado}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 font-bold uppercase tracking-tight">Vía: {e.transporte}</p>
                  </div>

                  <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-10 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-10">
                    <div className="text-center">
                      <p className="text-2xl font-black text-blue-600">{e.cantidad}</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase">Unidades</p>
                    </div>
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-300 group-hover:text-blue-500 transition-colors">
                      <span className="material-symbols-outlined">arrow_forward_ios</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </main>
  );
}
