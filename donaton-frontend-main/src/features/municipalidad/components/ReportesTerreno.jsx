import { useEffect, useState } from 'react';
import { apiNecesidades } from '../../../api';
import toast from 'react-hot-toast';
import './ReportesTerreno.css';

export default function ReportesTerreno() {
  const [formData, setFormData] = useState({
    comuna: '',
    incidente: '',
    categoria: '',
    cantidadNecesaria: '',
    descripcion: '',
    prioridad: 'Media'
  });

  const [necesidades, setNecesidades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filtroAlerta, setFiltroAlerta] = useState('PENDIENTES');

  const cargarNecesidades = async () => {
    try {
      const response = await apiNecesidades.get('/necesidades');
      setNecesidades(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cargarNecesidades();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePrioridad = (prio) => {
    setFormData(prev => ({ ...prev, prioridad: prio }));
  };

  const handleEditClick = (report) => {
    setFormData({
      comuna: report.comuna || report.ubicacion || '',
      categoria: report.categoria || '',
      cantidadNecesaria: report.cantidadNecesaria || '',
      descripcion: report.descripcion || '',
      prioridad: report.prioridad || 'Media'
    });
    setEditingId(report.id);
    // Hacer scroll arriba suavemente
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ comuna: '', incidente: '', categoria: '', cantidadNecesaria: '', descripcion: '', prioridad: 'Media' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.categoria || !formData.comuna || !formData.descripcion || !formData.cantidadNecesaria) {
      toast.error('Por favor, complete todos los campos requeridos');
      return;
    }
    setLoading(true);
    try {
      const payload = {
        descripcion: formData.incidente ? `[${formData.incidente}] ${formData.descripcion}` : formData.descripcion,
        cantidadNecesaria: formData.cantidadNecesaria,
        ubicacion: formData.comuna, // Mantenemos para compatibilidad con backend
        categoria: formData.categoria, // Usado ahora para Recurso a Enviar (Agua, Alimentos...)
        prioridad: formData.prioridad,
        comuna: formData.comuna
      };
      
      let response;
      if (editingId) {
        response = await apiNecesidades.put(`/necesidades/${editingId}`, payload);
      } else {
        response = await apiNecesidades.post('/necesidades', payload);
      }

      if (response.status === 200 || response.status === 201) {
        toast.success(editingId ? 'Reporte actualizado con éxito' : 'Reporte de emergencia enviado con éxito');
        handleCancelEdit();
        cargarNecesidades();
      } else {
        toast.error('Error al guardar el reporte');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error de conexión con el servicio');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid py-4" style={{ backgroundColor: 'var(--background)', color: 'var(--on-surface)', minHeight: '100vh' }}>
      
      {/* Title & Breadcrumbs */}
      <div className="mb-4">
        <div className="d-flex align-items-center gap-2 mb-2" style={{ color: 'var(--on-surface-variant)', fontSize: '12px', fontWeight: 600 }}>
          <span>Operaciones</span>
          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chevron_right</span>
          <span style={{ color: 'var(--primary)' }}>{editingId ? 'Editar Reporte de Emergencia' : 'Nuevo Reporte de Emergencia'}</span>
        </div>
        <h1 className="fw-bold mb-1" style={{ color: 'var(--on-surface)', fontSize: '32px', letterSpacing: '-0.02em' }}>
          {editingId ? 'Editar Reporte' : 'Reporte de Emergencia'}
        </h1>
        <p style={{ color: 'var(--on-surface-variant)', fontSize: '16px' }}>
          {editingId ? 'Actualice los detalles críticos para la asignación de recursos.' : 'Proporcione detalles críticos para iniciar la respuesta inmediata y el despliegue de recursos.'}
        </p>
      </div>

      <div className="row g-4">
        {/* Left Column: Form */}
        <div className="col-lg-8 d-flex flex-column gap-4">
          
          {/* Step 1: Incident Identification */}
          <section className="admin-card">
            <div className="d-flex align-items-center justify-content-between mb-4 border-bottom pb-3" style={{ borderColor: 'var(--outline-variant)' }}>
              <div className="d-flex align-items-center gap-2">
                <span className="material-symbols-outlined" style={{ color: 'var(--secondary)' }}>emergency_home</span>
                <h2 className="fw-bold mb-0 fs-5">1. Identificación del Incidente</h2>
              </div>
              <span className="text-uppercase small fw-bold" style={{ color: 'var(--outline)' }}>Paso 1 de 2</span>
            </div>
            
            <div className="row g-4">
              <div className="col-md-4">
                <label className="form-label fw-bold" style={{ color: 'var(--on-surface)', fontSize: '14px' }}>Tipo de Emergencia</label>
                <select 
                  className="form-select border-0 p-3 shadow-none" 
                  name="incidente" 
                  value={formData.incidente} 
                  onChange={handleChange}
                  style={{ backgroundColor: 'var(--surface-container-low)', color: 'var(--on-surface)' }}
                  required
                >
                  <option value="">Seleccionar Incidente</option>
                  <option value="Incendio">Incendio / Forestal</option>
                  <option value="Inundación">Inundación / Aluvión</option>
                  <option value="Sismo">Sismo / Terremoto</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label fw-bold" style={{ color: 'var(--on-surface)', fontSize: '14px' }}>Recurso Principal Requerido</label>
                <select 
                  className="form-select border-0 p-3 shadow-none" 
                  name="categoria" 
                  value={formData.categoria} 
                  onChange={handleChange}
                  style={{ backgroundColor: 'var(--surface-container-low)', color: 'var(--on-surface)' }}
                  required
                >
                  <option value="">Seleccionar Recurso</option>
                  <option value="Alimentos">Alimentos</option>
                  <option value="Medicinas">Medicinas</option>
                  <option value="Ropa">Ropa</option>
                  <option value="Escolares">Escolares</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
              
              <div className="col-md-4">
                <label className="form-label fw-bold" style={{ color: 'var(--on-surface)', fontSize: '14px' }}>Prioridad</label>
                <div className="d-flex gap-2">
                  <button 
                    type="button" 
                    onClick={() => handlePrioridad('Baja')} 
                    className={`btn flex-fill ${formData.prioridad === 'Baja' ? 'fw-bold' : ''}`} 
                    style={{ 
                      border: `2px solid ${formData.prioridad === 'Baja' ? 'var(--primary)' : 'var(--outline-variant)'}`, 
                      backgroundColor: formData.prioridad === 'Baja' ? 'var(--primary-fixed-dim)' : 'transparent', 
                      fontSize: '14px',
                      color: formData.prioridad === 'Baja' ? 'var(--on-primary-fixed)' : 'var(--on-surface)'
                    }}
                  >
                    Baja
                  </button>
                  <button 
                    type="button" 
                    onClick={() => handlePrioridad('Media')} 
                    className={`btn flex-fill ${formData.prioridad === 'Media' ? 'fw-bold' : ''}`} 
                    style={{ 
                      border: `2px solid ${formData.prioridad === 'Media' ? 'var(--primary)' : 'var(--outline-variant)'}`, 
                      backgroundColor: formData.prioridad === 'Media' ? 'var(--primary-fixed-dim)' : 'transparent', 
                      fontSize: '14px',
                      color: formData.prioridad === 'Media' ? 'var(--on-primary-fixed)' : 'var(--on-surface)'
                    }}
                  >
                    Media
                  </button>
                  <button 
                    type="button" 
                    onClick={() => handlePrioridad('Alta')} 
                    className={`btn flex-fill ${formData.prioridad === 'Alta' ? 'fw-bold text-white' : ''}`} 
                    style={{ 
                      border: `2px solid ${formData.prioridad === 'Alta' ? 'var(--error)' : 'var(--outline-variant)'}`, 
                      backgroundColor: formData.prioridad === 'Alta' ? 'var(--error)' : 'transparent', 
                      fontSize: '14px',
                      color: formData.prioridad === 'Alta' ? 'var(--on-error)' : 'var(--on-surface)'
                    }}
                  >
                    Alta
                  </button>
                </div>
              </div>

              <div className="col-md-4">
                <label className="form-label fw-bold" style={{ color: 'var(--on-surface)', fontSize: '14px' }}>Comuna</label>
                <input 
                  type="text" 
                  className="form-control border-0 p-3 shadow-none" 
                  name="comuna" 
                  value={formData.comuna} 
                  onChange={handleChange}
                  placeholder="Ej: Viña del Mar"
                  style={{ backgroundColor: 'var(--surface-container-low)', color: 'var(--on-surface)' }}
                  required
                />
              </div>
            </div>
          </section>

          {/* Step 2: Resource Orchestration */}
          <section className="admin-card">
            <div className="d-flex align-items-center justify-content-between mb-4 border-bottom pb-3" style={{ borderColor: 'var(--outline-variant)' }}>
              <div className="d-flex align-items-center gap-2">
                <span className="material-symbols-outlined" style={{ color: 'var(--tertiary)' }}>conveyor_belt</span>
                <h2 className="fw-bold mb-0 fs-5">2. Orquestación de Recursos</h2>
              </div>
              <span className="text-uppercase small fw-bold" style={{ color: 'var(--outline)' }}>Paso 2 de 2</span>
            </div>
            
            <div className="row g-4">
              <div className="col-md-7">
                <label className="form-label fw-bold" style={{ color: 'var(--on-surface)', fontSize: '14px' }}>Descripción de la Necesidad</label>
                <textarea 
                  className="form-control border-0 p-3 shadow-none" 
                  name="descripcion" 
                  value={formData.descripcion} 
                  onChange={handleChange}
                  rows="4"
                  placeholder="Describa la situación y los recursos específicos que se requieren (ej: palas, agua, alimento para mascotas)..."
                  style={{ backgroundColor: 'var(--surface-container-low)', color: 'var(--on-surface)', resize: 'none' }}
                  required
                />
              </div>
              
              <div className="col-md-5">
                <label className="form-label fw-bold" style={{ color: 'var(--on-surface)', fontSize: '14px' }}>Cantidad Necesaria</label>
                <div className="p-3 rounded-3 d-flex align-items-center justify-content-between mb-3" style={{ backgroundColor: 'var(--surface-container-low)' }}>
                  <span className="fw-semibold small" style={{ color: 'var(--on-surface)' }}>Unidades estimadas</span>
                  <input 
                    type="number" 
                    className="form-control border bg-white text-end w-50 shadow-none" 
                    name="cantidadNecesaria" 
                    value={formData.cantidadNecesaria} 
                    onChange={handleChange}
                    placeholder="Ej: 500"
                    style={{ borderColor: 'var(--outline-variant)' }}
                    required
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Sidebar Actions & Data */}
        <div className="col-lg-4 d-flex flex-column gap-4">
          
          {/* Actions Card */}
          <section className="admin-card">
            <div className="d-flex flex-column gap-3">
              <button 
                onClick={handleSubmit} 
                disabled={loading}
                className="btn d-flex align-items-center justify-content-center gap-2 py-3 fw-bold shadow-sm custom-hover-scale text-white"
                style={{ backgroundColor: editingId ? 'var(--primary)' : 'var(--secondary-container)', color: 'white', borderRadius: '0.75rem', fontSize: '18px' }}
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{editingId ? 'save' : 'send_and_archive'}</span>
                {loading ? 'Guardando...' : (editingId ? 'Actualizar Reporte' : 'Publicar Alerta')}
              </button>
              
              <div className="d-flex gap-2">
                {editingId ? (
                  <button onClick={handleCancelEdit} className="btn flex-fill py-2 fw-bold custom-hover-bg" style={{ border: '1px solid var(--error)', color: 'var(--error)', borderRadius: '0.75rem' }}>
                    Cancelar Edición
                  </button>
                ) : (
                  <button className="btn flex-fill py-2 fw-bold custom-hover-bg" style={{ border: '1px solid var(--outline)', color: 'var(--on-surface-variant)', borderRadius: '0.75rem' }}>
                    Guardar Borrador
                  </button>
                )}
              </div>

              <div className="mt-2 p-3 rounded-3 d-flex align-items-start gap-3" style={{ backgroundColor: 'var(--surface-container)' }}>
                <span className="material-symbols-outlined mt-1" style={{ color: 'var(--primary)', fontSize: '20px' }}>info</span>
                <p className="mb-0" style={{ color: 'var(--on-surface-variant)', fontSize: '13px' }}>
                  {editingId 
                    ? 'La actualización será visible inmediatamente para los equipos de logística y operaciones en terreno.'
                    : 'Publicar transmitirá esta alerta a todos los equipos de respuesta de la municipalidad y la registrará en el sistema central.'}
                </p>
              </div>
            </div>
          </section>

          {/* Active Alerts Summary */}
          <section className="admin-card">
            <h3 className="fw-bold mb-3 fs-6 d-flex align-items-center justify-content-between" style={{ color: 'var(--on-surface)' }}>
              <div className="d-flex align-items-center gap-2">
                <span className="material-symbols-outlined" style={{ color: 'var(--error)' }}>warning</span>
                Alertas Recientes
              </div>
            </h3>

            <div className="d-flex gap-2 mb-3">
              <button 
                onClick={() => setFiltroAlerta('PENDIENTES')}
                className={`btn btn-sm flex-fill rounded-pill fw-bold ${filtroAlerta === 'PENDIENTES' ? 'btn-danger' : 'btn-light text-secondary border'}`}
              >
                Pendientes
              </button>
              <button 
                onClick={() => setFiltroAlerta('COMPLETADAS')}
                className={`btn btn-sm flex-fill rounded-pill fw-bold ${filtroAlerta === 'COMPLETADAS' ? 'btn-success' : 'btn-light text-secondary border'}`}
              >
                Despachadas
              </button>
            </div>

            <div className="d-flex flex-column gap-2 active-alerts-list" style={{ maxHeight: '300px', overflowY: 'auto', paddingRight: '4px' }}>
              {(() => {
                const filtradas = necesidades.filter(n => {
                  if (filtroAlerta === 'PENDIENTES') return parseInt(n.cantidadNecesaria || 0, 10) > 0 && n.estado !== 'COMPLETADO';
                  return parseInt(n.cantidadNecesaria || 0, 10) <= 0 || n.estado === 'COMPLETADO';
                });

                if (filtradas.length === 0) {
                  return <p className="small text-muted mb-0">No hay alertas {filtroAlerta.toLowerCase()} en el momento.</p>;
                }

                return filtradas.slice().reverse().map(n => (
                  <div key={n.id} className="d-flex flex-column p-3 rounded-3 transition-colors hover-bg-surface-container-low" style={{ borderLeft: `4px solid ${filtroAlerta === 'PENDIENTES' ? 'var(--error)' : 'var(--success)'}`, backgroundColor: editingId === n.id ? 'var(--surface-container-low)' : 'var(--surface-container-lowest)', borderTop: '1px solid var(--outline-variant)', borderRight: '1px solid var(--outline-variant)', borderBottom: '1px solid var(--outline-variant)' }}>
                    <div className="d-flex align-items-start justify-content-between">
                      <div>
                        <div className="fw-bold mb-1" style={{ color: 'var(--on-surface)', fontSize: '13px' }}>
                          <span className="text-primary me-1">[{n.categoria}]</span>
                          {n.descripcion}
                        </div>
                        <div className="d-flex align-items-center gap-1">
                          <span className="material-symbols-outlined" style={{ fontSize: '14px', color: filtroAlerta === 'PENDIENTES' ? 'var(--error)' : 'var(--success)' }}>location_on</span>
                          <span className="text-uppercase" style={{ fontSize: '11px', color: filtroAlerta === 'PENDIENTES' ? 'var(--error)' : 'var(--success)', fontWeight: 'bold' }}>{n.ubicacion || n.comuna}</span>
                        </div>
                      </div>
                      <span className={`badge ${filtroAlerta === 'PENDIENTES' ? 'bg-danger text-danger' : 'bg-success text-success'} bg-opacity-10 rounded-pill px-2 py-1 ms-2`} style={{ fontSize: '12px' }}>
                        {filtroAlerta === 'PENDIENTES' ? `${n.cantidadNecesaria} req.` : 'Completada'}
                      </span>
                    </div>
                    {filtroAlerta === 'PENDIENTES' && (
                      <div className="mt-2 text-end">
                        <button 
                          onClick={() => handleEditClick(n)}
                          className="btn btn-sm btn-light p-1 d-inline-flex align-items-center justify-content-center text-primary border" 
                          title="Editar Reporte"
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>edit</span>
                        </button>
                      </div>
                    )}
                  </div>
                ));
              })()}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}