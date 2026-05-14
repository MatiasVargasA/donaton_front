import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import toast from 'react-hot-toast';

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const baseLinkClasses = "d-flex align-items-center gap-3 px-3 py-2 rounded text-decoration-none transition-colors";
  const activeClasses = "bg-primary text-white fw-bold shadow-sm";
  const inactiveClasses = "text-secondary custom-hover-bg";

  const handleLogout = () => {
    logout();
    toast.success('Sesión cerrada correctamente');
    navigate('/login');
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  const NavContent = () => (
    <div className="d-flex flex-column h-100 bg-white">
      <div className="mb-4 px-3 pt-4">
        <h3 className="fw-bold text-primary mb-0">Donaton</h3>
        <p className="text-secondary small mb-0">Admin Console</p>
      </div>

      <nav className="flex-grow-1 px-3 d-flex flex-column gap-1">
        <NavLink to="/" onClick={() => setIsOpen(false)} className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeClasses : inactiveClasses}`}>
          <span className="material-symbols-outlined">dashboard</span>
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink to="/registro" onClick={() => setIsOpen(false)} className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeClasses : inactiveClasses}`}>
          <span className="material-symbols-outlined">inventory_2</span>
          <span>Inventory</span>
        </NavLink>

        <NavLink to="/mapa" onClick={() => setIsOpen(false)} className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeClasses : inactiveClasses}`}>
          <span className="material-symbols-outlined">map</span>
          <span>Needs Map</span>
        </NavLink>

        <NavLink to="/logistica" onClick={() => setIsOpen(false)} className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeClasses : inactiveClasses}`}>
          <span className="material-symbols-outlined">local_shipping</span>
          <span>Logistics</span>
        </NavLink>

        <NavLink to="/reportes" onClick={() => setIsOpen(false)} className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeClasses : inactiveClasses}`}>
          <span className="material-symbols-outlined">analytics</span>
          <span>Reports</span>
        </NavLink>
      </nav>

      <div className="mt-auto pt-3 border-top px-3 pb-4 d-flex flex-column gap-2">
        <button className="btn btn-warning w-100 fw-bold d-flex align-items-center justify-content-center gap-2 mb-2">
          <span className="material-symbols-outlined">add</span>
          New Dispatch
        </button>
        <div className="d-flex flex-column gap-1">
          <NavLink to="/perfil" onClick={() => setIsOpen(false)} className="d-flex align-items-center gap-3 px-3 py-2 rounded text-secondary text-decoration-none custom-hover-bg">
            <span className="material-symbols-outlined">settings</span>
            <span>Settings</span>
          </NavLink>
          <button onClick={handleLogout} className="btn btn-outline-danger d-flex align-items-center gap-3 px-3 py-2 text-start border-0 text-danger rounded">
            <span className="material-symbols-outlined">logout</span>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style>
        {`
          .custom-hover-bg:hover { background-color: #f8f9fa; }
        `}
      </style>

      {/* Mobile Top Bar */}
      <div className="d-md-none d-flex align-items-center justify-content-between px-3 py-2 bg-white border-bottom fixed-top z-3">
        <h4 className="fw-bold text-primary mb-0">Donaton</h4>
        <button onClick={toggleSidebar} className="btn border-0 text-dark">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>

      {/* Desktop & Mobile Sidebar Wrapper */}
      <aside className={`sidebar-wrapper shadow-sm ${isOpen ? 'open' : ''}`}>
        <NavContent />
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark opacity-50 z-2 d-md-none"
          onClick={toggleSidebar}
          style={{ zIndex: 999 }}
        />
      )}
    </>
  );
}
