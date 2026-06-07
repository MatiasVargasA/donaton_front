import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../AuthContext';

export default function DashboardLogistica() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="p-4 p-md-5 min-vh-100 bg-light">
      <div className="mb-5">
        <h1 className="display-5 fw-bold text-dark mb-2">
          Bienvenido, {user?.nombre || 'Equipo de Logística'} 👋
        </h1>
        <p className="text-secondary fs-5">
          Aquí tienes un resumen rápido del estado operativo y la disponibilidad de recursos.
        </p>
      </div>

      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 h-100 bg-primary text-white p-4 hover-translate cursor-pointer" onClick={() => navigate('/registro')}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="material-symbols-outlined display-4">inbox</span>
              <span className="fs-3 fw-bold">12</span>
            </div>
            <h5 className="fw-bold mb-1">Donaciones Entrantes</h5>
            <p className="small mb-0 opacity-75">Nuevos ingresos pendientes de revisión</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 h-100 bg-success text-white p-4 hover-translate cursor-pointer" onClick={() => navigate('/inventario')}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="material-symbols-outlined display-4">inventory_2</span>
              <span className="fs-3 fw-bold">85%</span>
            </div>
            <h5 className="fw-bold mb-1">Capacidad del Almacén</h5>
            <p className="small mb-0 opacity-75">Nivel de ocupación estable</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 h-100 bg-danger text-white p-4 hover-translate cursor-pointer" onClick={() => navigate('/despachos')}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="material-symbols-outlined display-4">crisis_alert</span>
              <span className="fs-3 fw-bold">4</span>
            </div>
            <h5 className="fw-bold mb-1">Alertas en Terreno</h5>
            <p className="small mb-0 opacity-75">Necesidades críticas activas hoy</p>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 text-center bg-white">
        <span className="material-symbols-outlined text-primary mb-3" style={{ fontSize: '48px' }}>local_shipping</span>
        <h3 className="fw-bold text-dark">Gestión Rápida</h3>
        <p className="text-secondary mx-auto mb-4" style={{ maxWidth: '600px' }}>
          Desde el panel lateral puedes acceder a las herramientas para clasificar donaciones, controlar el inventario y organizar los despachos a las zonas afectadas.
        </p>
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <button onClick={() => navigate('/crear-despacho')} className="btn btn-primary rounded-pill px-4 fw-bold shadow-sm d-flex align-items-center gap-2">
            <span className="material-symbols-outlined">send</span>
            Iniciar Nuevo Despacho
          </button>
          <button onClick={() => navigate('/inventario')} className="btn btn-light rounded-pill px-4 fw-bold border text-secondary d-flex align-items-center gap-2">
            <span className="material-symbols-outlined">inventory</span>
            Ver Stock
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .hover-translate { transition: all 0.3s ease; }
        .hover-translate:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important; }
        .cursor-pointer { cursor: pointer; }
      `}} />
    </div>
  );
}
