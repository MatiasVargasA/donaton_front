import React from 'react';
import { useAuth } from '../AuthContext';

export default function PerfilUsuario() {
  const { user } = useAuth();

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* Header / Cover Area */}
      <div className="h-48 w-full bg-gradient-to-r from-[#1A4F8B] to-[#2E7D32] relative">
        <div className="absolute -bottom-16 left-8 md:left-16 flex items-end gap-6">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-white shadow-xl border-4 border-white flex items-center justify-center text-[#1A4F8B] text-5xl font-black overflow-hidden">
            {user?.nombre?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div className="pb-4 hidden md:block">
            <h1 className="text-3xl font-bold text-white drop-shadow-md">
              {user?.nombre || 'Usuario Registrado'}
            </h1>
            <p className="text-blue-100 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">verified</span>
              {user?.rol || 'Coordinador Institucional'}
            </p>
          </div>
        </div>
      </div>

      <div className="pt-20 px-8 md:px-16 pb-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Info Card */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#1A4F8B]">account_circle</span>
                Información Institucional
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Nombre Completo</p>
                  <p className="text-lg font-semibold text-slate-700">{user?.nombre || 'No disponible'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Organización</p>
                  <p className="text-lg font-semibold text-[#1A4F8B]">{user?.organizacion || 'Donatón Global'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Correo Electrónico</p>
                  <p className="text-lg font-semibold text-slate-700">{user?.correo || 'No disponible'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ubicación</p>
                  <p className="text-lg font-semibold text-slate-700">Chile (Central)</p>
                </div>
              </div>
            </div>

            {/* Badge Section */}
            <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-8 shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold text-slate-800 mb-6">Insignias y Logros</h2>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-3 bg-white p-3 rounded-2xl shadow-sm border border-blue-50">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    <span className="material-symbols-outlined">verified_user</span>
                  </div>
                  <span className="font-bold text-sm text-slate-600">Verificado</span>
                </div>
                <div className="flex items-center gap-3 bg-white p-3 rounded-2xl shadow-sm border border-green-50">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <span className="material-symbols-outlined">volunteer_activism</span>
                  </div>
                  <span className="font-bold text-sm text-slate-600">Donante Activo</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-8">
            <div className="bg-[#1A4F8B] rounded-3xl p-8 text-white shadow-lg shadow-blue-900/20">
              <h3 className="text-lg font-bold mb-4">Resumen de Impacto</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2 opacity-80">
                    <span>Donaciones registradas</span>
                    <span>85%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-black">12</p>
                    <p className="text-[10px] uppercase opacity-60">Misiones</p>
                  </div>
                  <div>
                    <p className="text-2xl font-black">54</p>
                    <p className="text-[10px] uppercase opacity-60">Reportes</p>
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => alert('Función de edición próximamente')}
              className="w-full py-4 bg-white border-2 border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">edit</span>
              Editar Datos Públicos
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}
