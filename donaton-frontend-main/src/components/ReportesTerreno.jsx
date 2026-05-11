import React, { useEffect, useState } from 'react';
import { apiNecesidades } from '../api';
import toast from 'react-hot-toast';

export default function ReportesTerreno() {
  const [formData, setFormData] = useState({
    descripcion: '',
    cantidadNecesaria: '',
    ubicacion: ''
  });

  const [necesidades, setNecesidades] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    cargarNecesidades();
  }, []);

  const cargarNecesidades = async () => {
    try {
      const response = await apiNecesidades.get('/necesidades');
      setNecesidades(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await apiNecesidades.post('/necesidades', formData);
      if (response.status === 200 || response.status === 201) {
        toast.success('Reporte de necesidad enviado con éxito');
        setFormData({ descripcion: '', cantidadNecesaria: '', ubicacion: '' });
        cargarNecesidades();
      } else {
        toast.error('Error al enviar el reporte');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error de conexión con el servicio de alertas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FFFBF7] pb-12">
      {/* Emergency Header */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-500 text-white py-12 px-8 mb-10 shadow-lg shadow-orange-900/10">
        <div className="max-w-4xl mx-auto flex items-center gap-6">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
            <span className="material-symbols-outlined text-4xl">emergency_share</span>
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tight">Reportes de Terreno</h1>
            <p className="text-orange-50 opacity-90">Gestión de alertas y necesidades críticas en zonas de emergencia.</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-10">

        {/* List Column (Priority on mobile) */}
        <div className="lg:col-span-3 order-2 lg:order-1">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-orange-600">notification_important</span>
            Alertas Activas
          </h2>

          <div className="space-y-4">
            {necesidades.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 text-center border-2 border-dashed border-orange-100">
                <p className="text-slate-400 font-medium italic">No hay reportes de necesidad activos.</p>
              </div>
            ) : (
              necesidades.map((n) => (
                <div key={n.id} className="bg-white p-6 rounded-3xl shadow-sm border-l-8 border-orange-500 flex flex-col gap-4 hover:shadow-md transition-all">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-lg font-black text-slate-800">{n.descripcion}</p>
                      <div className="flex items-center gap-2 text-slate-400 mt-1">
                        <span className="material-symbols-outlined text-sm">location_on</span>
                        <span className="text-xs font-bold uppercase tracking-wider">{n.ubicacion}</span>
                      </div>
                    </div>
                    <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                      Urgente
                    </div>
                  </div>

                  <div className="bg-orange-50/50 p-4 rounded-2xl flex justify-between items-center border border-orange-100/50">
                    <span className="text-sm font-bold text-slate-500 italic">Déficit estimado</span>
                    <span className="text-2xl font-black text-orange-600">
                      {n.cantidadNecesaria} <span className="text-xs font-bold opacity-60">Requerido</span>
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-2 order-1 lg:order-2">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-xl border border-orange-50 sticky top-10">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Nuevo Reporte</h2>

            <div className="space-y-5">
              <div>
                <label className="text-xs font-bold text-orange-400 uppercase mb-2 block">Descripción de Necesidad</label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  required
                  rows="3"
                  placeholder="Ej: Se requieren 500 litros de agua potable para sector norte."
                  className="w-full p-4 bg-orange-50/30 border-2 border-transparent rounded-2xl focus:bg-white focus:border-orange-500 outline-none transition-all resize-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-orange-400 uppercase mb-2 block">Población Afectada / Unidades</label>
                <input
                  type="number"
                  name="cantidadNecesaria"
                  value={formData.cantidadNecesaria}
                  onChange={handleChange}
                  required
                  placeholder="0"
                  className="w-full p-4 bg-orange-50/30 border-2 border-transparent rounded-2xl focus:bg-white focus:border-orange-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-orange-400 uppercase mb-2 block">Ubicación Geográfica</label>
                <div className="relative">
                  <input
                    type="text"
                    name="ubicacion"
                    value={formData.ubicacion}
                    onChange={handleChange}
                    required
                    placeholder="Ej: Valparaíso, Sector Viña"
                    className="w-full p-4 pl-12 bg-orange-50/30 border-2 border-transparent rounded-2xl focus:bg-white focus:border-orange-500 outline-none transition-all"
                  />
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-orange-400">near_me</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-orange-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {loading ? 'Enviando Alerta...' : 'Emitir Reporte'}
              </button>
            </div>
          </form>
        </div>

      </div>
    </main>
  );
}