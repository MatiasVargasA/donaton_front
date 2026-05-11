import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const baseLinkClasses = "flex items-center gap-3 px-4 py-3 hover:pl-5 transition-all duration-200 cursor-pointer";
  const activeClasses = "bg-white text-[#1A4F8B] font-bold border-r-4 border-[#1A4F8B] shadow-sm";
  const inactiveClasses = "text-slate-600 hover:bg-slate-100";

  const toggleSidebar = () => setIsOpen(!isOpen);

  const NavContent = () => (
    <>
      <div className="px-6 mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-[#1A4F8B]">Donaton</h1>
          <p className="text-xs text-slate-500 tracking-wide font-public-sans">Gestión Humanitaria</p>
        </div>
        <button onClick={toggleSidebar} className="md:hidden text-slate-600">
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
      <nav className="flex-1 space-y-1">
        <NavLink 
          to="/" 
          onClick={() => setIsOpen(false)}
          className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeClasses : inactiveClasses}`}
        >
          <span className="material-symbols-outlined">dashboard</span>
          <span className="font-public-sans text-sm tracking-wide">Panel de Control</span>
        </NavLink>
        <NavLink 
          to="/mapa" 
          onClick={() => setIsOpen(false)}
          className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeClasses : inactiveClasses}`}
        >
          <span className="material-symbols-outlined">location_on</span>
          <span className="font-public-sans text-sm tracking-wide">Mapa de Necesidades</span>
        </NavLink>
        <NavLink 
          to="/registro" 
          onClick={() => setIsOpen(false)}
          className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeClasses : inactiveClasses}`}
        >
          <span className="material-symbols-outlined">volunteer_activism</span>
          <span className="font-public-sans text-sm tracking-wide">Registro de Donaciones</span>
        </NavLink>
        <NavLink 
          to="/reportes" 
          onClick={() => setIsOpen(false)}
          className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeClasses : inactiveClasses}`}
        >
          <span className="material-symbols-outlined">analytics</span>
          <span className="font-public-sans text-sm tracking-wide">Reportes de Terreno</span>
        </NavLink>
      </nav>
      <div className="px-4 mb-6">
        <button className="w-full py-3 px-4 bg-secondary text-on-secondary rounded-lg font-bold text-sm flex items-center justify-center gap-2 shadow-sm hover:opacity-90 transition-opacity">
          <span className="material-symbols-outlined">add_alert</span>
          Nueva Emergencia
        </button>
      </div>
      <div className="border-t border-slate-200 pt-4">
        <NavLink 
          to="/perfil" 
          onClick={() => setIsOpen(false)}
          className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeClasses : inactiveClasses}`}
        >
          <span className="material-symbols-outlined">person</span>
          <span className="font-public-sans text-sm tracking-wide">Perfil</span>
        </NavLink>
        <a className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-100 hover:pl-5 transition-all duration-200 cursor-pointer" href="#">
          <span className="material-symbols-outlined">settings</span>
          <span className="font-public-sans text-sm tracking-wide">Configuración</span>
        </a>
        <a className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-100 hover:pl-5 transition-all duration-200 cursor-pointer" href="#">
          <span className="material-symbols-outlined">logout</span>
          <span className="font-public-sans text-sm tracking-wide">Cerrar Sesión</span>
        </a>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 fixed top-0 left-0 right-0 z-40">
        <span className="text-xl font-bold text-[#1A4F8B]">Donaton</span>
        <button onClick={toggleSidebar} className="text-slate-600">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex h-screen w-64 border-r fixed left-0 top-0 bg-slate-50 border-slate-200 z-50 flex-col py-6">
        <NavContent />
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[60] md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Mobile Sidebar (Drawer) */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-slate-50 z-[70] transform transition-transform duration-300 md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full py-6">
          <NavContent />
        </div>
      </aside>
    </>
  );
}
