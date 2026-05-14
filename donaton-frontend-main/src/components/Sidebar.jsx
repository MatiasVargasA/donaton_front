import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import toast from 'react-hot-toast';

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const baseLinkClasses = "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors";
  const activeClasses = "bg-primary-container text-on-primary-container font-bold scale-95 transition-transform duration-150";
  const inactiveClasses = "text-on-surface-variant hover:bg-surface-container-high";

  const handleLogout = () => {
    logout();
    toast.success('Sesión cerrada correctamente');
    navigate('/login');
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  const NavContent = () => (
    <div className="flex flex-col h-full bg-surface-container-lowest dark:bg-surface-dim">
      <div className="mb-8 px-4 pt-6">
        <h1 className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed">Donaton</h1>
        <p className="font-body-md text-body-md text-on-surface-variant">Admin Console</p>
      </div>

      <nav className="flex-1 space-y-1 px-4">
        <NavLink to="/" onClick={() => setIsOpen(false)} className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeClasses : inactiveClasses}`}>
          <span className="material-symbols-outlined">dashboard</span>
          <span className="font-label-lg text-label-lg">Dashboard</span>
        </NavLink>
        
        <NavLink to="/registro" onClick={() => setIsOpen(false)} className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeClasses : inactiveClasses}`}>
          <span className="material-symbols-outlined">inventory_2</span>
          <span className="font-label-lg text-label-lg">Inventory</span>
        </NavLink>

        <NavLink to="/mapa" onClick={() => setIsOpen(false)} className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeClasses : inactiveClasses}`}>
          <span className="material-symbols-outlined">map</span>
          <span className="font-label-lg text-label-lg">Needs Map</span>
        </NavLink>

        <NavLink to="/logistica" onClick={() => setIsOpen(false)} className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeClasses : inactiveClasses}`}>
          <span className="material-symbols-outlined">local_shipping</span>
          <span className="font-label-lg text-label-lg">Logistics</span>
        </NavLink>

        <NavLink to="/reportes" onClick={() => setIsOpen(false)} className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeClasses : inactiveClasses}`}>
          <span className="material-symbols-outlined">analytics</span>
          <span className="font-label-lg text-label-lg">Reports</span>
        </NavLink>
      </nav>

      <div className="mt-auto space-y-4 pt-4 border-t border-outline-variant px-4 pb-6">
        <button className="w-full bg-secondary-container text-on-secondary-container py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
          <span className="material-symbols-outlined">add</span>
          New Dispatch
        </button>
        <div className="space-y-1">
          <NavLink to="/perfil" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined">settings</span>
            <span className="font-label-lg text-label-lg">Settings</span>
          </NavLink>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-error hover:bg-error-container transition-colors">
            <span className="material-symbols-outlined">logout</span>
            <span className="font-label-lg text-label-lg">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between px-6 py-4 bg-surface-container-lowest border-b border-outline-variant fixed top-0 left-0 right-0 z-40">
        <div className="flex items-center gap-2">
          <h1 className="font-headline-md text-headline-md font-bold text-primary">Donaton</h1>
        </div>
        <button onClick={toggleSidebar} className="text-on-surface">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 h-full w-[280px] bg-surface-container-lowest dark:bg-surface-dim border-r border-outline-variant dark:border-outline shadow-sm dark:shadow-none z-50">
        <NavContent />
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-on-surface/40 backdrop-blur-sm z-[60] md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Mobile Sidebar (Drawer) */}
      <aside className={`fixed top-0 left-0 h-full w-[280px] bg-surface-container-lowest z-[70] transform transition-transform duration-500 md:hidden shadow-2xl ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <NavContent />
      </aside>
    </>
  );
}
