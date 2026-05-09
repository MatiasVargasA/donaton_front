import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const baseLinkClasses = "flex items-center gap-3 px-4 py-3 hover:pl-5 transition-all duration-200 cursor-pointer";
  const activeClasses = "bg-white text-[#1A4F8B] font-bold border-r-4 border-[#1A4F8B] shadow-sm";
  const inactiveClasses = "text-slate-600 hover:bg-slate-100";

  return (
    <aside className="h-screen w-64 border-r fixed left-0 top-0 bg-slate-50 border-slate-200 z-50 flex flex-col py-6">
      <div className="px-6 mb-8">
        <h1 className="text-xl font-bold text-[#1A4F8B]">Donaton</h1>
        <p className="text-xs text-slate-500 tracking-wide font-public-sans">Gestión Humanitaria</p>
      </div>
      <nav className="flex-1 space-y-1">
        <NavLink 
          to="/" 
          className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeClasses : inactiveClasses}`}
        >
          <span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
          <span className="font-public-sans text-sm tracking-wide">Panel de Control</span>
        </NavLink>
        <NavLink 
          to="/mapa" 
          className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeClasses : inactiveClasses}`}
        >
          <span className="material-symbols-outlined" data-icon="location_on">location_on</span>
          <span className="font-public-sans text-sm tracking-wide">Mapa de Necesidades</span>
        </NavLink>
        <NavLink 
          to="/registro" 
          className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeClasses : inactiveClasses}`}
        >
          <span className="material-symbols-outlined" data-icon="volunteer_activism">volunteer_activism</span>
          <span className="font-public-sans text-sm tracking-wide">Registro de Donaciones</span>
        </NavLink>
        <NavLink 
          to="/reportes" 
          className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeClasses : inactiveClasses}`}
        >
          <span className="material-symbols-outlined" data-icon="analytics">analytics</span>
          <span className="font-public-sans text-sm tracking-wide">Reportes de Terreno</span>
        </NavLink>
      </nav>
      <div className="px-4 mb-6">
        <button className="w-full py-3 px-4 bg-secondary text-on-secondary rounded-lg font-bold text-sm flex items-center justify-center gap-2 shadow-sm hover:opacity-90 transition-opacity">
          <span className="material-symbols-outlined" data-icon="add_alert">add_alert</span>
          Nueva Emergencia
        </button>
      </div>
      <div className="border-t border-slate-200 pt-4">
        <NavLink 
          to="/perfil" 
          className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeClasses : inactiveClasses}`}
        >
          <span className="material-symbols-outlined" data-icon="person">person</span>
          <span className="font-public-sans text-sm tracking-wide">Perfil</span>
        </NavLink>
        <a className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-100 hover:pl-5 transition-all duration-200 cursor-pointer" href="#">
          <span className="material-symbols-outlined" data-icon="settings">settings</span>
          <span className="font-public-sans text-sm tracking-wide">Configuración</span>
        </a>
        <a className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-100 hover:pl-5 transition-all duration-200 cursor-pointer" href="#">
          <span className="material-symbols-outlined" data-icon="logout">logout</span>
          <span className="font-public-sans text-sm tracking-wide">Cerrar Sesión</span>
        </a>
      </div>
    </aside>
  );
}
