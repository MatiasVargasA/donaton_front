import React from 'react';
import { useAuth } from '../../../AuthContext';

export default function PerfilUsuario() {
  const { user } = useAuth();

  return (
    <div className="container-fluid py-4 bg-light min-vh-100">
      {/* Header / Cover Area */}
      <div className="row mb-5">
        <div className="col-12 px-0">
          <div className="position-relative w-100" style={{ height: '200px', background: 'linear-gradient(to right, #003f87, #006722)' }}>
            <div className="position-absolute bottom-0 start-0 ms-4 ms-md-5 mb-n5 d-flex align-items-end gap-4" style={{ transform: 'translateY(50%)' }}>
              <div className="bg-white rounded-circle shadow-lg d-flex align-items-center justify-content-center border border-4 border-white text-primary fw-bold" style={{ width: '120px', height: '120px', fontSize: '3rem' }}>
                {user?.nombre?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div className="d-none d-md-block text-white pb-2 mb-5">
                <h1 className="fw-bold fs-2 text-shadow">
                  {user?.nombre || 'Usuario Registrado'}
                </h1>
                <p className="d-flex align-items-center gap-2 mb-0 opacity-75">
                  <span className="material-symbols-outlined fs-6">verified</span>
                  {user?.rol || 'Coordinador Institucional'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row pt-5 mt-4 px-3 px-md-5">
        <div className="col-lg-8 mb-4">
          {/* Main Info Card */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-4 p-md-5">
              <h4 className="fw-bold text-dark mb-4 d-flex align-items-center gap-2">
                <span className="material-symbols-outlined text-primary">account_circle</span>
                Información Institucional
              </h4>
              
              <div className="row g-4">
                <div className="col-12 col-md-6">
                  <p className="small fw-bold text-secondary text-uppercase mb-1">Nombre Completo</p>
                  <p className="fs-5 fw-semibold text-dark mb-0">{user?.nombre || 'No disponible'}</p>
                </div>
                <div className="col-12 col-md-6">
                  <p className="small fw-bold text-secondary text-uppercase mb-1">Organización</p>
                  <p className="fs-5 fw-semibold text-primary mb-0">{user?.organizacion || 'Donatón Global'}</p>
                </div>
                <div className="col-12 col-md-6">
                  <p className="small fw-bold text-secondary text-uppercase mb-1">Correo Electrónico</p>
                  <p className="fs-5 fw-semibold text-dark mb-0">{user?.correo || 'No disponible'}</p>
                </div>
                <div className="col-12 col-md-6">
                  <p className="small fw-bold text-secondary text-uppercase mb-1">Ubicación</p>
                  <p className="fs-5 fw-semibold text-dark mb-0">Chile (Central)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Badge Section */}
          <div className="card border-0 shadow-sm bg-white">
            <div className="card-body p-4 p-md-5">
              <h4 className="fw-bold text-dark mb-4">Insignias y Logros</h4>
              <div className="d-flex flex-wrap gap-3">
                <div className="d-flex align-items-center gap-3 bg-light p-3 rounded border">
                  <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center text-primary" style={{width: '40px', height: '40px'}}>
                    <span className="material-symbols-outlined">verified_user</span>
                  </div>
                  <span className="fw-bold text-secondary">Verificado</span>
                </div>
                <div className="d-flex align-items-center gap-3 bg-light p-3 rounded border">
                  <div className="bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center text-success" style={{width: '40px', height: '40px'}}>
                    <span className="material-symbols-outlined">volunteer_activism</span>
                  </div>
                  <span className="fw-bold text-secondary">Donante Activo</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm bg-primary text-white mb-4">
            <div className="card-body p-4 p-md-5">
              <h4 className="fw-bold mb-4">Resumen de Impacto</h4>
              <div className="mb-4">
                <div className="d-flex justify-content-between small mb-2 opacity-75">
                  <span>Donaciones registradas</span>
                  <span>85%</span>
                </div>
                <div className="progress bg-white bg-opacity-25" style={{height: '8px'}}>
                  <div className="progress-bar bg-white" style={{width: '85%'}}></div>
                </div>
              </div>
              <div className="row text-center pt-3 border-top border-white border-opacity-25">
                <div className="col-6">
                  <p className="display-6 fw-bold mb-0">12</p>
                  <p className="small text-uppercase opacity-75 mb-0">Misiones</p>
                </div>
                <div className="col-6">
                  <p className="display-6 fw-bold mb-0">54</p>
                  <p className="small text-uppercase opacity-75 mb-0">Reportes</p>
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={() => alert('Función de edición próximamente')}
            className="btn btn-outline-secondary w-100 py-3 fw-bold bg-white d-flex align-items-center justify-content-center gap-2"
          >
            <span className="material-symbols-outlined">edit</span>
            Editar Datos Públicos
          </button>
        </div>
      </div>
    </div>
  );
}
