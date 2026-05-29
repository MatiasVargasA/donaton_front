import { useState, useEffect } from 'react';
import { useAuth } from '../../../AuthContext';
import { apiDonaciones } from '../../../api';
import toast from 'react-hot-toast';

export default function MisDonaciones() {
  const { user } = useAuth();
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [selectedTracking, setSelectedTracking] = useState(null);
  
  // State for dynamic donations from backend
  const [backendDonaciones, setBackendDonaciones] = useState([]);
  const [selectedFilterStatus, setSelectedFilterStatus] = useState('Todos');
  const [selectedFilterCategory, setSelectedFilterCategory] = useState('Todas');

  const cargarDonaciones = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('donaton_user') || '{}');
      const usuarioId = storedUser.id || storedUser.idUsuario || user?.id || 1;
      
      let donacionesData = [];
      try {
        const response = await apiDonaciones.get(`/donaciones/usuario/${usuarioId}`);
        donacionesData = response.data;
      } catch (err) {
        console.warn("Fallo endpoint por usuario, intentando obtener todas y filtrar...", err);
        const response = await apiDonaciones.get('/donaciones');
        donacionesData = response.data.filter(d => 
          String(d.usuarioId) === String(usuarioId) ||
          d.nombreDonante?.toLowerCase() === (storedUser.nombre || user?.nombre || '').toLowerCase()
        );
      }
      
      setBackendDonaciones(Array.isArray(donacionesData) ? donacionesData : []);
    } catch (error) {
      console.error("Error cargando donaciones de la API", error);
      setBackendDonaciones([]);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      cargarDonaciones();
    }, 0);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenCertificate = (tracking) => {
    setSelectedTracking(tracking);
    setShowCertificateModal(true);
  };

  const handleCloseCertificate = () => {
    setShowCertificateModal(false);
    setSelectedTracking(null);
  };

  const handleEliminarDonacion = async (id) => {
    if (!window.confirm('¿Desea cancelar y eliminar este registro de donación?')) return;
    try {
      await apiDonaciones.delete(`/donaciones/${id}`);
      toast.success('Registro de donación eliminado');
      cargarDonaciones();
    } catch (error) {
      console.error(error);
      toast.error('No se pudo eliminar el registro');
    }
  };

  // Map backend entries
  const formatEstado = (estado) => {
    if (!estado) return 'En proceso';
    const e = estado.toUpperCase();
    if (e === 'PENDIENTE') return 'En proceso';
    if (e === 'ACEPTADA') return 'Aceptado';
    if (e === 'RECHAZADA') return 'Rechazado';
    if (e === 'EN_RUTA') return 'En ruta';
    if (e === 'ENTREGADA') return 'Entregado';
    return estado;
  };

  const todasLasDonaciones = backendDonaciones.map(d => ({
    id: d.id,
    tipo: d.categoria || d.tipo || 'General',
    cantidad: d.cantidad,
    origen: d.nombreDonante || d.origen || 'Donante',
    tracking: d.tracking || `#DT-REAL-${d.id}`,
    estado: formatEstado(d.estado),
    detalle: d.descripcion || `Donación registrada a nombre de ${d.nombreDonante || d.origen}. Cantidad: ${d.cantidad} unidades.`,
    fecha: d.fechaCreacion || 'Hoy',
    destino: d.comuna || 'Centro de Recepción Principal',
    isReal: true
  }));

  // Filtering logic
  const filteredDonaciones = todasLasDonaciones.filter(d => {
    const categoryMatch = selectedFilterCategory === 'Todas' || 
      d.tipo.toLowerCase().includes(selectedFilterCategory.toLowerCase());
    
    const statusMatch = selectedFilterStatus === 'Todos' || 
      d.estado.toLowerCase() === selectedFilterStatus.toLowerCase();

    return categoryMatch && statusMatch;
  });

  // Calculate statistics dynamically
  const totalAceptadas = todasLasDonaciones.filter(d => d.estado.toLowerCase() === 'aceptado').length;
  const totalEnProceso = todasLasDonaciones.filter(d => d.estado.toLowerCase() === 'en proceso').length;
  const totalRechazadas = todasLasDonaciones.filter(d => d.estado.toLowerCase() === 'rechazado').length;

  return (
    <div className="container-fluid py-4 bg-light min-vh-100">
      <div className="mx-auto" style={{ maxWidth: '1200px' }}>
        
        {/* Header Action Row */}
        <div className="d-flex flex-column flex-md-row align-items-md-end justify-content-between gap-4 mb-5">
          <div>
            <h2 className="display-6 fw-bold mb-1 text-dark">Mis Donaciones</h2>
            <p className="text-secondary mb-0">Revisa el historial de tus aportes, sus estados y certificados.</p>
          </div>
        </div>

        {/* Dashboard Statistics Bento */}
        <div className="row g-4 mb-5">
          <div className="col-md-3">
            <div className="bg-white p-4 rounded-4 border-0 shadow-sm h-100">
              <span className="material-symbols-outlined text-warning fs-1 mb-3">pending_actions</span>
              <p className="small text-secondary fw-bold text-uppercase mb-1">En Proceso</p>
              <p className="fs-2 fw-bold text-dark mb-0">{totalEnProceso}</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="bg-white p-4 rounded-4 border-0 shadow-sm h-100">
              <span className="material-symbols-outlined text-success fs-1 mb-3">task_alt</span>
              <p className="small text-secondary fw-bold text-uppercase mb-1">Aceptadas</p>
              <p className="fs-2 fw-bold text-dark mb-0">{totalAceptadas}</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="bg-white p-4 rounded-4 border-0 shadow-sm h-100">
              <span className="material-symbols-outlined text-danger fs-1 mb-3">cancel</span>
              <p className="small text-secondary fw-bold text-uppercase mb-1">Rechazadas</p>
              <p className="fs-2 fw-bold text-dark mb-0">{totalRechazadas}</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="bg-primary text-white p-4 rounded-4 shadow-sm position-relative overflow-hidden h-100 d-flex flex-column justify-content-center">
              <div className="position-relative z-1">
                <p className="small text-white-50 text-uppercase fw-bold mb-2">Total Donado</p>
                <h4 className="fw-bold mb-0">{todasLasDonaciones.length} Aportes</h4>
              </div>
              <span className="material-symbols-outlined position-absolute opacity-25" style={{ fontSize: '90px', right: '-10px', bottom: '-10px', transform: 'rotate(-12deg)' }}>public</span>
            </div>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-white border-0 p-3 rounded-4 mb-4 d-flex flex-wrap align-items-center gap-4 shadow-sm">
          <div className="d-flex align-items-center gap-2">
            <span className="material-symbols-outlined text-secondary">filter_list</span>
            <span className="fw-bold text-secondary">Filtros:</span>
          </div>
          <div className="d-flex flex-grow-1 flex-wrap align-items-center gap-3">
            <select 
              value={selectedFilterStatus}
              onChange={(e) => setSelectedFilterStatus(e.target.value)}
              className="form-select w-auto bg-light border-0 fw-semibold text-secondary"
            >
              <option value="Todos">Estado: Todos</option>
              <option value="Aceptado">Aceptado</option>
              <option value="En proceso">En proceso</option>
              <option value="En ruta">En ruta</option>
              <option value="Entregado">Entregado</option>
              <option value="Rechazado">Rechazado</option>
            </select>
            
            <select 
              value={selectedFilterCategory}
              onChange={(e) => setSelectedFilterCategory(e.target.value)}
              className="form-select w-auto bg-light border-0 fw-semibold text-secondary"
            >
              <option value="Todas">Categoría: Todas</option>
              <option value="Alimentos">Alimentos</option>
              <option value="Medicina">Medicinas</option>
              <option value="Ropa">Ropa</option>
              <option value="Escolares">Escolares</option>
            </select>
          </div>
          <button 
            onClick={() => { setSelectedFilterStatus('Todos'); setSelectedFilterCategory('Todas'); }} 
            className="btn btn-link text-primary fw-bold text-decoration-none"
          >
            Limpiar Filtros
          </button>
        </div>

        {/* Donation History List */}
        <div className="d-flex flex-column gap-3">
          {filteredDonaciones.length === 0 ? (
            <div className="bg-white border rounded-4 p-5 text-center text-secondary shadow-sm">
              <span className="material-symbols-outlined fs-1 mb-2">volunteer_activism</span>
              <p className="fw-bold mb-0">No se encontraron donaciones con los filtros activos.</p>
            </div>
          ) : (
            filteredDonaciones.map((d) => {
              const isAceptado = d.estado === 'Aceptado';
              const isEnProceso = d.estado === 'En proceso';
              const isEnRuta = d.estado === 'En ruta';
              const isEntregado = d.estado === 'Entregado';
              
              const badgeClass = isAceptado || isEntregado
                ? 'bg-success bg-opacity-10 text-success border border-success border-opacity-25' 
                : isEnProceso || isEnRuta
                  ? 'bg-warning bg-opacity-10 text-warning-emphasis border border-warning border-opacity-25' 
                  : 'bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25';
              
              const iconName = d.tipo.toLowerCase().includes('aliment') 
                ? 'restaurant' 
                : d.tipo.toLowerCase().includes('med') 
                  ? 'medical_services' 
                  : d.tipo.toLowerCase().includes('ropa') 
                    ? 'checkroom' 
                    : 'package_2';

              return (
                <div key={d.id} className="bg-white border-0 rounded-4 p-4 d-flex flex-column flex-md-row gap-4 shadow-sm align-items-md-center transition-all hover-translate">
                  <div className={`rounded-3 ${badgeClass} d-flex align-items-center justify-content-center`} style={{ width: '64px', height: '64px', flexShrink: 0 }}>
                    <span className="material-symbols-outlined fs-2">{iconName}</span>
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <span className="small text-secondary fw-bold text-uppercase tracking-widest" style={{ fontSize: '0.65rem' }}>Tracking: {d.tracking}</span>
                        <h4 className="fw-bold text-dark mb-0 mt-1 h5">{d.tipo} <span className="text-secondary fw-normal">({d.cantidad} U.)</span></h4>
                      </div>
                      <span className={`badge ${badgeClass} rounded-pill px-3 py-2 fw-bold`} style={{ fontSize: '0.75rem' }}>{d.estado}</span>
                    </div>
                    <p className="text-secondary small mb-3">{d.detalle}</p>
                    <div className="d-flex align-items-center gap-4 text-secondary small fw-bold mt-2" style={{ fontSize: '0.75rem' }}>
                      <div className="d-flex align-items-center gap-2">
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>calendar_month</span>
                        <span>{d.fecha}</span>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>location_on</span>
                        <span>{d.destino}</span>
                      </div>
                    </div>
                  </div>
                  <div className="border-start-md ps-md-4 d-flex flex-column gap-2 align-items-center justify-content-center">
                    {isAceptado || isEntregado || isEnRuta ? (
                      <button 
                        onClick={() => handleOpenCertificate(d.tracking)} 
                        className="btn btn-light text-primary d-flex flex-column align-items-center p-3 rounded-3 fw-bold w-100 hover-bg-light border"
                        style={{ minWidth: '130px' }}
                      >
                        <span className="material-symbols-outlined fs-4 mb-1">verified</span>
                        Ver Certificado
                      </button>
                    ) : (
                      <button 
                        disabled 
                        className="btn btn-light text-secondary d-flex flex-column align-items-center p-3 rounded-3 fw-bold w-100 opacity-75 border"
                        style={{ minWidth: '130px' }}
                      >
                        <span className="material-symbols-outlined fs-4 mb-1">hourglass_top</span>
                        En Proceso
                      </button>
                    )}
                    
                    {d.isReal && (
                      <button
                        onClick={() => handleEliminarDonacion(d.id)}
                        className="btn btn-outline-danger btn-sm w-100 py-1.5 fw-bold d-flex align-items-center justify-content-center gap-1 mt-1"
                        style={{ borderRadius: '0.5rem' }}
                      >
                        <span className="material-symbols-outlined fs-6">delete</span>
                        Eliminar
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Certificate Modal */}
      {showCertificateModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center z-3" style={{ backdropFilter: 'blur(4px)' }}>
          <div className="bg-white rounded-4 p-5 mx-3 shadow-lg text-center" style={{ maxWidth: '450px', width: '100%' }}>
            <div className="text-success bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: '80px', height: '80px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '48px' }}>check_circle</span>
            </div>
            <h3 className="fw-bold mb-2">¡Certificado Generado!</h3>
            <p className="text-secondary mb-4">Su certificado de donación para el tracking {selectedTracking} ha sido preparado exitosamente.</p>
            <div className="d-flex gap-3 mt-4">
              <button onClick={handleCloseCertificate} className="btn btn-outline-secondary w-50 rounded-3 fw-bold py-3">Cerrar</button>
              <button onClick={() => { toast.success('Descargando Certificado PDF...'); handleCloseCertificate(); }} className="btn btn-primary w-50 rounded-3 fw-bold py-3 text-white">Descargar PDF</button>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .hover-translate { transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out; }
        .hover-translate:hover { transform: translateY(-3px); box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1) !important; }
        @media (min-width: 768px) {
          .border-start-md { border-left: 1px solid #dee2e6 !important; }
        }
      `}} />
    </div>
  );
}
