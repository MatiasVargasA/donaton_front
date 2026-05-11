import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiDonaciones } from '../api';
import toast from 'react-hot-toast';

export default function RegistroDonaciones() {
  const [formData, setFormData] = useState({
    tipo: '',
    cantidad: '',
    origen: ''
  });

  const [donaciones, setDonaciones] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const cargarDonaciones = async () => {
    try {
      const response = await apiDonaciones.get('/donaciones');
      setDonaciones(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cargarDonaciones();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await apiDonaciones.post('/donaciones', formData);
      if (response.status === 200 || response.status === 201) {

        toast.success('Donación registrada correctamente');

        setFormData({
          tipo: '',
          cantidad: '',
          origen: ''
        });

        cargarDonaciones();

      } else {
        toast.error('Error al registrar donación');
      }

    } catch (error) {
      console.error(error);
      toast.error('Error de conexión con el servicio de donaciones');
    } finally {
      setLoading(false);
    }
  };

  const eliminarDonacion = async (id) => {
    if (!window.confirm('¿Eliminar este registro?')) return;
    try {
      await apiDonaciones.delete(`/donaciones/${id}`);
      toast.success('Registro eliminado');
      cargarDonaciones();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-12">
      <div className="bg-[#1A4F8B] text-white py-12 px-8 mb-10">
        <div className="max-w-4xl mx-auto flex items-center gap-6">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
            <span className="material-symbols-outlined text-4xl">inventory</span>
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tight">Gestión de Inventario</h1>
            <p className="text-blue-100 opacity-80">Registra el ingreso de ayuda humanitaria al sistema.</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-10">
        
        {/* Form Column */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 sticky top-10">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Nueva Donación</h2>
            
            <div className="space-y-5">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Tipo de Ayuda</label>
                <input
                  type="text"
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                  required
                  placeholder="Ej: Alimentos No Perecibles"
                  className="w-full p-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#1A4F8B] outline-none transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Cantidad (Unidades)</label>
                <input
                  type="number"
                  name="cantidad"
                  value={formData.cantidad}
                  onChange={handleChange}
                  required
                  placeholder="0"
                  className="w-full p-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#1A4F8B] outline-none transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Institución de Origen</label>
                <input
                  type="text"
                  name="origen"
                  value={formData.origen}
                  onChange={handleChange}
                  required
                  placeholder="Ej: Banco de Alimentos"
                  className="w-full p-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#1A4F8B] outline-none transition-all"
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#1A4F8B] text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-blue-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {loading ? 'Procesando...' : 'Registrar Ingreso'}
              </button>
            </div>
          </form>
        </div>

        {/* List Column */}
        <div className="lg:col-span-3">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#1A4F8B]">list_alt</span>
            Últimos Ingresos
          </h2>
          
          <div className="space-y-4">
            {donaciones.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 text-center border-2 border-dashed border-slate-200">
                <p className="text-slate-400">No hay registros de donaciones aún.</p>
              </div>
            ) : (
              donaciones.map((d) => (
                <div key={d.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-md transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 text-[#1A4F8B] rounded-xl flex items-center justify-center">
                      <span className="material-symbols-outlined">package_2</span>
                    </div>
                    <div>
                      <p className="font-bold text-slate-700">{d.tipo}</p>
                      <p className="text-xs text-slate-400">{d.origen}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-xl font-black text-[#1A4F8B]">{d.cantidad}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Unid.</p>
                    </div>
                    <button 
                      onClick={() => eliminarDonacion(d.id)}
                      className="text-slate-300 hover:text-red-500 transition-colors"
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
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
