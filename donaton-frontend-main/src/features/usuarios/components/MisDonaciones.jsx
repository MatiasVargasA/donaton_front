import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function MisDonaciones() {
  const [showModal, setShowModal] = useState(false);
  const [selectedTracking, setSelectedTracking] = useState(null);

  const handleOpenModal = (tracking) => {
    setSelectedTracking(tracking);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTracking(null);
  };

  return (
    <div className="container-fluid py-4">
      <div className="mx-auto" style={{ maxWidth: '1200px' }}>
        {/* Header Action Row */}
        <div className="d-flex flex-column flex-md-row align-items-md-end justify-content-between gap-4 mb-5">
          <div>
            <h2 className="display-6 fw-bold mb-1">Mis Donaciones</h2>
            <p className="text-secondary mb-0">Gestione y realice el seguimiento de sus contribuciones humanitarias.</p>
          </div>
          <Link to="/registro" className="btn btn-warning rounded-pill px-4 py-3 fw-bold d-flex align-items-center gap-2 shadow-sm text-dark text-decoration-none">
            <span className="material-symbols-outlined">add_location</span>
            Agendar Nueva Recolección
          </Link>
        </div>

        {/* Dashboard Statistics Bento */}
        <div className="row g-4 mb-5">
          <div className="col-md-3">
            <div className="bg-white p-4 rounded-4 border h-100 shadow-sm">
              <span className="material-symbols-outlined text-warning fs-1 mb-3">pending_actions</span>
              <p className="small text-secondary fw-bold text-uppercase mb-1">En Tránsito</p>
              <p className="fs-2 fw-bold mb-0">12</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="bg-white p-4 rounded-4 border h-100 shadow-sm">
              <span className="material-symbols-outlined text-success fs-1 mb-3">task_alt</span>
              <p className="small text-secondary fw-bold text-uppercase mb-1">Entregadas</p>
              <p className="fs-2 fw-bold mb-0">84</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="bg-primary text-white p-4 rounded-4 shadow-sm position-relative overflow-hidden h-100 d-flex flex-column justify-content-center">
              <div className="position-relative z-1">
                <p className="small text-white-50 text-uppercase fw-bold mb-2">Estado de Impacto</p>
                <h3 className="fw-bold mb-2">Ayudando a más de 2,400 personas</h3>
                <p className="small opacity-90 mb-0">Tus contribuciones de este año han llegado a 14 regiones diferentes.</p>
              </div>
              <span className="material-symbols-outlined position-absolute opacity-25" style={{ fontSize: '140px', right: '-20px', bottom: '-30px', transform: 'rotate(-12deg)' }}>public</span>
            </div>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-white border p-3 rounded-4 mb-4 d-flex flex-wrap align-items-center gap-4 shadow-sm">
          <div className="d-flex align-items-center gap-2">
            <span className="material-symbols-outlined text-secondary">filter_list</span>
            <span className="fw-bold text-secondary">Filtros:</span>
          </div>
          <div className="d-flex flex-grow-1 flex-wrap align-items-center gap-3">
            <select className="form-select w-auto bg-light border-0">
              <option>Estado: Todos</option>
              <option>Donado</option>
              <option>En Tránsito</option>
              <option>Entregado</option>
            </select>
            <select className="form-select w-auto bg-light border-0">
              <option>Categoría: Todas</option>
              <option>Alimentos</option>
              <option>Medicinas</option>
              <option>Ropa</option>
            </select>
            <input type="date" className="form-control w-auto bg-light border-0" />
          </div>
          <button className="btn btn-link text-primary fw-bold text-decoration-none">Limpiar Filtros</button>
        </div>

        {/* Donation History List */}
        <div className="d-flex flex-column gap-3">
          {/* Donation Item 1 */}
          <div className="bg-white border rounded-4 p-4 d-flex flex-column flex-md-row gap-4 shadow-sm align-items-md-center transition-all" style={{ cursor: 'pointer' }}>
            <div className="rounded-3 bg-success bg-opacity-10 text-success d-flex align-items-center justify-content-center" style={{ width: '64px', height: '64px', flexShrink: 0 }}>
              <span className="material-symbols-outlined fs-2">restaurant</span>
            </div>
            <div className="flex-grow-1">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <span className="small text-secondary fw-bold text-uppercase tracking-widest">Tracking: #DT-99420</span>
                  <h4 className="fw-bold mb-0 mt-1">Alimentos No Perecederos</h4>
                </div>
                <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-2 fw-bold">Entregado</span>
              </div>
              <p className="text-secondary mb-3">24 latas de atún, 10kg arroz, 5L aceite, 15 paquetes de pasta.</p>
              <div className="d-flex align-items-center gap-4 text-secondary small fw-bold mt-2">
                <div className="d-flex align-items-center gap-2">
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>calendar_month</span>
                  <span>Oct 24, 2023</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>location_on</span>
                  <span>Banco de Alimentos Central</span>
                </div>
              </div>
            </div>
            <div className="border-start-md ps-md-4 d-flex align-items-center justify-content-center">
              <button onClick={() => handleOpenModal('#DT-99420')} className="btn btn-light text-primary d-flex flex-column align-items-center p-3 rounded-4 fw-bold w-100 hover-bg-light transition-all">
                <span className="material-symbols-outlined fs-3 mb-1">verified</span>
                Ver Certificado
              </button>
            </div>
          </div>

          {/* Donation Item 2 */}
          <div className="bg-white border rounded-4 p-4 d-flex flex-column flex-md-row gap-4 shadow-sm align-items-md-center transition-all" style={{ cursor: 'pointer' }}>
            <div className="rounded-3 bg-warning bg-opacity-10 text-warning d-flex align-items-center justify-content-center" style={{ width: '64px', height: '64px', flexShrink: 0 }}>
              <span className="material-symbols-outlined fs-2">medical_services</span>
            </div>
            <div className="flex-grow-1">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <span className="small text-secondary fw-bold text-uppercase tracking-widest">Tracking: #DT-99421</span>
                  <h4 className="fw-bold mb-0 mt-1">Kit de Ayuda Médica</h4>
                </div>
                <span className="badge bg-warning bg-opacity-10 text-warning rounded-pill px-3 py-2 fw-bold">En Tránsito</span>
              </div>
              <p className="text-secondary mb-3">5 Botiquines de primeros auxilios, mascarillas quirúrgicas (500 unid), desinfectantes.</p>
              <div className="d-flex align-items-center gap-4 text-secondary small fw-bold mt-2">
                <div className="d-flex align-items-center gap-2">
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>calendar_month</span>
                  <span>Nov 02, 2023</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>local_shipping</span>
                  <span>Estimado: Nov 05</span>
                </div>
              </div>
            </div>
            <div className="border-start-md ps-md-4 d-flex align-items-center justify-content-center">
              <button disabled className="btn btn-light text-secondary d-flex flex-column align-items-center p-3 rounded-4 fw-bold w-100 opacity-50">
                <span className="material-symbols-outlined fs-3 mb-1">lock</span>
                Procesando
              </button>
            </div>
          </div>

          {/* Donation Item 3 */}
          <div className="bg-white border rounded-4 p-4 d-flex flex-column flex-md-row gap-4 shadow-sm align-items-md-center transition-all" style={{ cursor: 'pointer' }}>
            <div className="rounded-3 bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center" style={{ width: '64px', height: '64px', flexShrink: 0 }}>
              <span className="material-symbols-outlined fs-2">checkroom</span>
            </div>
            <div className="flex-grow-1">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <span className="small text-secondary fw-bold text-uppercase tracking-widest">Tracking: #DT-99395</span>
                  <h4 className="fw-bold mb-0 mt-1">Paquete Ropa de Invierno</h4>
                </div>
                <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-2 fw-bold">Entregado</span>
              </div>
              <p className="text-secondary mb-3">12 Abrigos gruesos, 20 mantas térmicas, accesorios de invierno variados.</p>
              <div className="d-flex align-items-center gap-4 text-secondary small fw-bold mt-2">
                <div className="d-flex align-items-center gap-2">
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>calendar_month</span>
                  <span>Sep 15, 2023</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>location_on</span>
                  <span>Centro de Acopio Norte</span>
                </div>
              </div>
            </div>
            <div className="border-start-md ps-md-4 d-flex align-items-center justify-content-center">
              <button onClick={() => handleOpenModal('#DT-99395')} className="btn btn-light text-primary d-flex flex-column align-items-center p-3 rounded-4 fw-bold w-100 hover-bg-light transition-all">
                <span className="material-symbols-outlined fs-3 mb-1">verified</span>
                Ver Certificado
              </button>
            </div>
          </div>
        </div>

        {/* Load More */}
        <div className="text-center mt-5">
          <button className="btn btn-outline-secondary rounded-pill px-5 py-3 fw-bold shadow-sm">Cargar más donaciones</button>
        </div>
      </div>

      {/* Modal Overlay */}
      {showModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center" style={{ zIndex: 1050, backdropFilter: 'blur(4px)' }}>
          <div className="bg-white rounded-4 p-5 mx-3 shadow-lg" style={{ maxWidth: '450px', width: '100%' }}>
            <div className="text-success bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: '80px', height: '80px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '48px' }}>check_circle</span>
            </div>
            <h3 className="fw-bold text-center mb-2">¡Certificado Generado!</h3>
            <p className="text-center text-secondary mb-4">Su certificado de donación para el tracking {selectedTracking} ha sido preparado exitosamente.</p>
            <div className="d-flex gap-3 mt-4">
              <button onClick={handleCloseModal} className="btn btn-outline-secondary w-50 rounded-3 fw-bold py-3">Cerrar</button>
              <button className="btn btn-primary w-50 rounded-3 fw-bold py-3">Descargar PDF</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
