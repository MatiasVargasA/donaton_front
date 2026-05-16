import React, { useEffect, useState } from 'react';
import { apiNecesidades } from '../../../api';
import toast from 'react-hot-toast';

export default function ReportesTerreno() {
  const [formData, setFormData] = useState({
    descripcion: '',
    cantidadNecesaria: '',
    ubicacion: ''
  });

  const [necesidades, setNecesidades] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    cargarNecesidades();
  }, []);

  const cargarNecesidades = async () => {
    try {
      const response = await apiNecesidades.get('/necesidades');
      setNecesidades(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await apiNecesidades.post('/necesidades', formData);
      if (response.status === 200 || response.status === 201) {
        toast.success('Reporte de necesidad enviado con éxito');
        setFormData({ descripcion: '', cantidadNecesaria: '', ubicacion: '' });
        cargarNecesidades();
      } else {
        toast.error('Error al enviar el reporte');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error de conexión con el servicio de alertas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid p-0 bg-light min-vh-100">
      {/* Emergency Header */}
      <div className="bg-danger text-white py-5 px-4 mb-4 shadow" style={{ background: 'linear-gradient(to right, #e65100, #ff8f00)' }}>
        <div className="container d-flex align-items-center gap-4">
          <div className="bg-white bg-opacity-25 rounded d-flex align-items-center justify-content-center" style={{ width: '64px', height: '64px' }}>
            <span className="material-symbols-outlined fs-1">emergency_share</span>
          </div>
          <div>
            <h1 className="display-5 fw-bold mb-0">Reportes de Terreno</h1>
            <p className="fs-5 text-white-50 mb-0">Gestión de alertas y necesidades críticas en zonas de emergencia.</p>
          </div>
        </div>
      </div>

      <div className="container py-4">
        <div className="row g-4">
          
          {/* List Column */}
          <div className="col-lg-7 order-2 order-lg-1">
            <h4 className="fw-bold text-dark mb-4 d-flex align-items-center gap-2">
              <span className="material-symbols-outlined text-danger">notification_important</span>
              Alertas Activas
            </h4>

            <div className="d-flex flex-column gap-3">
              {necesidades.length === 0 ? (
                <div className="card border-0 shadow-sm p-5 text-center bg-white border border-danger border-opacity-25 border-dashed">
                  <p className="text-secondary font-italic mb-0">No hay reportes de necesidad activos.</p>
                </div>
              ) : (
                necesidades.map((n) => (
                  <div key={n.id} className="card border-0 shadow-sm border-start border-4 border-danger hover-shadow transition p-4">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <h5 className="fw-bold text-dark mb-1">{n.descripcion}</h5>
                        <div className="d-flex align-items-center gap-1 text-secondary small">
                          <span className="material-symbols-outlined fs-6">location_on</span>
                          <span className="fw-bold text-uppercase">{n.ubicacion}</span>
                        </div>
                      </div>
                      <span className="badge bg-danger bg-opacity-10 text-danger rounded-pill px-3 py-1 text-uppercase">
                        Urgente
                      </span>
                    </div>

                    <div className="bg-danger bg-opacity-10 p-3 rounded d-flex justify-content-between align-items-center border border-danger border-opacity-25">
                      <span className="small fw-bold text-secondary font-italic">Déficit estimado</span>
                      <span className="fs-4 fw-bold text-danger mb-0">
                        {n.cantidadNecesaria} <span className="small opacity-75">Requerido</span>
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Form Column */}
          <div className="col-lg-5 order-1 order-lg-2">
            <form onSubmit={handleSubmit} className="card shadow-sm border-0 border-top border-4 border-warning p-4 sticky-top" style={{ top: '20px' }}>
              <h4 className="fw-bold text-dark mb-4">Nuevo Reporte</h4>

              <div className="mb-3">
                <label className="form-label small fw-bold text-warning text-uppercase">Descripción de Necesidad</label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  required
                  rows="3"
                  placeholder="Ej: Se requieren 500 litros de agua potable para sector norte."
                  className="form-control form-control-lg bg-warning bg-opacity-10 border-0"
                  style={{ resize: 'none' }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold text-warning text-uppercase">Población Afectada / Unidades</label>
                <input
                  type="number"
                  name="cantidadNecesaria"
                  value={formData.cantidadNecesaria}
                  onChange={handleChange}
                  required
                  placeholder="0"
                  className="form-control form-control-lg bg-warning bg-opacity-10 border-0"
                />
              </div>

              <div className="mb-4">
                <label className="form-label small fw-bold text-warning text-uppercase">Ubicación Geográfica</label>
                <div className="position-relative">
                  <input
                    type="text"
                    name="ubicacion"
                    value={formData.ubicacion}
                    onChange={handleChange}
                    required
                    placeholder="Ej: Valparaíso, Sector Viña"
                    className="form-control form-control-lg bg-warning bg-opacity-10 border-0 ps-5"
                  />
                  <span className="material-symbols-outlined position-absolute top-50 start-0 translate-middle-y ms-3 text-warning">near_me</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-warning btn-lg w-100 fw-bold text-dark border-0 shadow"
                style={{ background: 'linear-gradient(to right, #ff8f00, #ffc107)' }}
              >
                {loading ? 'Enviando Alerta...' : 'Emitir Reporte'}
              </button>
            </form>
          </div>

        </div>
      </div>
      <style>{`
        .hover-shadow:hover { box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important; }
      `}</style>
    </div>
  );
}