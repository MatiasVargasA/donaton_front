import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import toast from 'react-hot-toast';

export default function Sidebar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const baseLinkClasses = "flex items-center gap-4 px-4 py-3 mx-3 rounded-2xl transition-all duration-300 group";
  const activeClasses = "bg-[#1A4F8B] text-white shadow-lg shadow-blue-900/20";
  const inactiveClasses = "text-slate-500 hover:bg-slate-100 hover:text-[#1A4F8B]";

  const handleLogout = () => {
    logout();
    toast.success('Sesión cerrada correctamente');
    navigate('/login');
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  const NavContent = () => (
    <div className="flex flex-col h-full py-6">
      <div className="px-8 mb-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#1A4F8B] rounded-2xl flex items-center justify-center text-white">
            <span className="material-symbols-outlined">volunteer_activism</span>
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tighter">Donaton</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Plataforma Global</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        <NavLink
          to="/"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeClasses : inactiveClasses}`}
        >
          <span className="material-symbols-outlined">dashboard</span>
          <span className="font-bold text-sm">Panel de Control</span>
        </NavLink>
        
        <NavLink
          to="/mapa"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeClasses : inactiveClasses}`}
        >
          <span className="material-symbols-outlined">map</span>
          <span className="font-bold text-sm">Mapa de Necesidades</span>
        </NavLink>

        <NavLink
          to="/registro"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeClasses : inactiveClasses}`}
        >
          <span className="material-symbols-outlined">inventory_2</span>
          <span className="font-bold text-sm">Donaciones</span>
        </NavLink>

        <NavLink
          to="/reportes"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeClasses : inactiveClasses}`}
        >
          <span className="material-symbols-outlined">emergency</span>
          <span className="font-bold text-sm">Reportes Terreno</span>
        </NavLink>

        <NavLink
          to="/logistica"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeClasses : inactiveClasses}`}
        >
          <span className="material-symbols-outlined">local_shipping</span>
          <span className="font-bold text-sm">Gestión Logística</span>
        </NavLink>
      </nav>

      <div className="px-3 pt-6 border-t border-slate-100 space-y-2">
        <NavLink
          to="/perfil"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeClasses : inactiveClasses}`}
        >
          <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs text-slate-500 overflow-hidden">
             {user?.nombre?.charAt(0).toUpperCase()}
          </div>
          <span className="font-bold text-sm">Mi Perfil</span>
        </NavLink>

        <button
          onClick={handleLogout}
          className="w-[calc(100%-24px)] flex items-center gap-4 px-4 py-3 mx-3 rounded-2xl text-red-400 hover:bg-red-50 hover:text-red-600 transition-all duration-300"
        >
          <span className="material-symbols-outlined">logout</span>
          <span className="font-bold text-sm">Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 fixed top-0 left-0 right-0 z-40">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#1A4F8B]">volunteer_activism</span>
          <span className="text-xl font-black text-slate-800">Donaton</span>
        </div>
        <button onClick={toggleSidebar} className="text-slate-600">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex h-screen w-72 border-r fixed left-0 top-0 bg-white border-slate-100 z-50 flex-col shadow-sm">
        <NavContent />
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Mobile Sidebar (Drawer) */}
      <aside className={`fixed top-0 left-0 h-full w-72 bg-white z-[70] transform transition-transform duration-500 md:hidden shadow-2xl ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <NavContent />
      </aside>
    </>
  );
}
