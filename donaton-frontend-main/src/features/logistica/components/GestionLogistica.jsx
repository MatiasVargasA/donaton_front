import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { apiDonaciones, apiNecesidades, apiLogistica } from '../../../api';

export default function GestionLogistica() {
  const [loading, setLoading] = useState(false);
  const [necesidades, setNecesidades] = useState([]);
  const [historialDespachos, setHistorialDespachos] = useState([]);
  const [filtroAlerta, setFiltroAlerta] = useState('PENDIENTES');
  
  const [despachoSeleccionado, setDespachoSeleccionado] = useState(null);
  const [formData, setFormData] = useState({
    cantidadAEnviar: '',
    transporte: 'Camión Institucional',
    responsable: '',
    observaciones: ''
  });

  const cargarNecesidades = async () => {
    try {
      // Endpoint sugerido por el usuario
      const response = await apiNecesidades.get('/necesidades/activas');
      setNecesidades(response.data);
    } catch (error) {
      console.error("Error cargando necesidades activas", error);
      // Fallback a /necesidades si /activas no existe temporalmente
      try {
        const fallbackRes = await apiNecesidades.get('/necesidades');
        // Filtramos simulando "activas" si es necesario
        setNecesidades(fallbackRes.data.filter(n => parseInt(n.cantidadNecesaria || 0, 10) > 0));
      } catch (fallbackError) {
        setNecesidades([]);
      }
    }
  };

  const cargarHistorial = async () => {
    try {
      const response = await apiLogistica.get('/despachos');
      setHistorialDespachos(response.data);
    } catch (error) {
      console.error("Error cargando historial de despachos", error);
      // Mantener vacío si no existe el endpoint aún
      setHistorialDespachos([]);
    }
  };

  useEffect(() => {
    cargarNecesidades();
    cargarHistorial();
  }, []);

  const validarStock = async (categoria, cantidadRequerida) => {
    // 1. Obtener donaciones válidas
    const resDon = await apiDonaciones.get('/donaciones');
    const donacionesValidas = resDon.data.filter(
      d => d.estado === 'EN_LOGISTICA' || d.estado === 'RECIBIDA'
    );

    let catMatch = categoria || 'General';
    catMatch = catMatch.charAt(0).toUpperCase() + catMatch.slice(1).toLowerCase();

    // 2. Sumar entradas de la categoría
    const candidatas = donacionesValidas.filter(d => {
      let c = d.categoria || d.tipo || 'General';
      c = c.charAt(0).toUpperCase() + c.slice(1).toLowerCase();
      return c === catMatch || c.includes(catMatch) || catMatch.includes(c);
    });
    const stockEntradas = candidatas.reduce((sum, d) => sum + parseInt(d.cantidad || 0, 10), 0);

    // 3. Obtener despachos (salidas)
    let stockSalidas = 0;
    try {
      const resDespachos = await apiLogistica.get('/despachos');
      const despachosCat = resDespachos.data.filter(d => {
        let c = d.categoria || 'General';
        c = c.charAt(0).toUpperCase() + c.slice(1).toLowerCase();
        return c === catMatch || c.includes(catMatch) || catMatch.includes(c);
      });
      stockSalidas = despachosCat.reduce((sum, d) => sum + parseInt(d.cantidad || d.cantidadAEnviar || d.unidades || 0, 10), 0);
    } catch(e) {
      console.warn("No se pudo cargar historial de despachos para validar stock", e);
    }

    // 4. Calcular stock real
    let stockReal = stockEntradas - stockSalidas;
    if (stockReal < 0) stockReal = 0;

    if (stockReal < cantidadRequerida && catMatch !== 'Otro') {
      throw new Error(`Stock insuficiente. Se requiere ${cantidadRequerida} de ${catMatch}, pero el inventario real disponible es ${stockReal}.`);
    }
    
    // Al ser un modelo de inventario no destructivo, ya no modificamos donaciones físicas.
  };

  const despachar = async (e) => {
    e.preventDefault();
    if (!despachoSeleccionado) return;
    const necesidad = despachoSeleccionado;

    const aEnviar = parseInt(formData.cantidadAEnviar, 10);
    const solicitada = parseInt(necesidad.cantidadNecesaria, 10);

    if (isNaN(aEnviar) || aEnviar <= 0) {
      toast.error('Ingrese una cantidad válida mayor a 0.');
      return;
    }
    if (aEnviar > solicitada) {
      toast.error('No puedes enviar más de lo solicitado originalmente.');
      return;
    }

    try {
      setLoading(true);
      
      // 1. Validar Stock Real Dinámicamente (Lanza error si no hay)
      await validarStock(necesidad.categoria, aEnviar);

      // 2. Ejecutar POST a /despachos
      const payloadDespacho = {
        destino: necesidad.comuna || necesidad.ubicacion,
        ubicacion: necesidad.comuna || necesidad.ubicacion,
        categoria: necesidad.categoria,
        cantidad: aEnviar,
        transporte: formData.transporte,
        responsable: formData.responsable,
        descripcion: formData.observaciones || 'Despacho a terreno',
        estado: 'EN_RUTA',
        fechaEnvio: new Date().toISOString()
      };
      await apiLogistica.post('/despachos', payloadDespacho);

      // 3. Actualizar la necesidad descontando la cantidad enviada
      const restante = solicitada - aEnviar;
      try {
        await apiNecesidades.put(`/necesidades/${necesidad.id}`, {
          ...necesidad,
          cantidadNecesaria: restante.toString(),
          estado: restante === 0 ? "COMPLETADO" : "EN PROCESO"
        });
      } catch (err) {
        console.warn("No se pudo actualizar la necesidad en apiNecesidades", err);
      }

      toast.success('Despacho realizado y en ruta');
      
      // Recargar datos
      cargarNecesidades();
      cargarHistorial();
      setDespachoSeleccionado(null);
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'No fue posible realizar el despacho');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const confirmarDespacho = (necesidad) => {
    setDespachoSeleccionado(necesidad);
    setFormData({
      cantidadAEnviar: necesidad.cantidadNecesaria || '',
      transporte: 'Camión Municipal',
      responsable: '',
      observaciones: ''
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Fecha desconocida';
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString; // Fallback
    return d.toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="p-3 p-md-4 min-vh-100 bg-light">
      {/* Header */}
      <div className="mb-4">
        <h2 className="h3 fw-bold text-dark mb-1">Despacho de Logística</h2>
        <p className="text-secondary mb-0">Visualiza reportes de terreno y realiza despachos asignando inventario automáticamente.</p>
      </div>

      <div className="row g-4">
        {/* Active Needs Column */}
        <div className="col-12 col-xl-12">
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
            <div className="card-header bg-white p-4 border-bottom d-flex justify-content-between align-items-center">
              <h3 className="h5 fw-bold mb-0 d-flex align-items-center gap-2">
                <span className="material-symbols-outlined text-danger">crisis_alert</span>
                Reportes / Necesidades
              </h3>
              <button onClick={cargarNecesidades} className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1 rounded-pill px-3">
                <span className="material-symbols-outlined small">refresh</span>
                Actualizar
              </button>
            </div>

            <div className="bg-light p-3 border-bottom d-flex gap-2">
              <button 
                onClick={() => setFiltroAlerta('PENDIENTES')}
                className={`btn btn-sm px-4 rounded-pill fw-bold ${filtroAlerta === 'PENDIENTES' ? 'btn-danger shadow-sm' : 'btn-outline-secondary bg-white'}`}
              >
                Pendientes por Despachar
              </button>
              <button 
                onClick={() => setFiltroAlerta('COMPLETADAS')}
                className={`btn btn-sm px-4 rounded-pill fw-bold ${filtroAlerta === 'COMPLETADAS' ? 'btn-success shadow-sm' : 'btn-outline-secondary bg-white'}`}
              >
                Completadas / Despachadas
              </button>
            </div>
            
            <div className="table-responsive">
              <table className="table table-hover mb-0 align-middle">
                <thead className="bg-light">
                  <tr>
                    <th className="px-4 py-3 small fw-bold text-secondary text-uppercase border-0">Comuna / Ubicación</th>
                    <th className="px-4 py-3 small fw-bold text-secondary text-uppercase border-0">Categoría</th>
                    <th className="px-4 py-3 small fw-bold text-secondary text-uppercase border-0 text-end">Cantidad</th>
                    <th className="px-4 py-3 small fw-bold text-secondary text-uppercase border-0">Prioridad</th>
                    <th className="px-4 py-3 small fw-bold text-secondary text-uppercase border-0">Estado</th>
                    <th className="px-4 py-3 border-0 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    const filtradas = necesidades.filter(n => {
                      if (filtroAlerta === 'PENDIENTES') return parseInt(n.cantidadNecesaria || 0, 10) > 0 && n.estado !== 'COMPLETADO';
                      return parseInt(n.cantidadNecesaria || 0, 10) <= 0 || n.estado === 'COMPLETADO';
                    });

                    if (filtradas.length === 0) {
                      return (
                        <tr>
                          <td colSpan="6" className="text-center py-5 text-secondary">
                            No hay necesidades {filtroAlerta.toLowerCase()} en este momento.
                          </td>
                        </tr>
                      );
                    }

                    return filtradas.map(n => (
                      <tr key={n.id} className="transition-all hover-bg-light">
                        <td className="px-4 py-3">
                          <div className="fw-bold text-dark">{n.comuna || n.ubicacion}</div>
                          <div className="small text-secondary">{n.descripcion}</div>
                        </td>
                        <td className="px-4 py-3 fw-semibold text-primary">{n.categoria || 'General'}</td>
                        <td className="px-4 py-3 text-end fw-bold text-dark">{n.cantidadNecesaria} de {n.categoria || 'Suministro'}</td>
                        <td className="px-4 py-3">
                          <span className={`badge rounded-pill px-3 py-1 ${
                            n.prioridad === 'Alta' ? 'bg-danger text-white' : 
                            n.prioridad === 'Media' ? 'bg-warning text-dark' : 'bg-info text-white'
                          }`}>
                            {n.prioridad || 'Media'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`badge border px-2 py-1 ${filtroAlerta === 'PENDIENTES' ? 'bg-light text-secondary' : 'bg-success-subtle text-success border-success-subtle'}`}>
                            {filtroAlerta === 'PENDIENTES' ? (n.estado || 'Activo') : 'Completado'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          {filtroAlerta === 'PENDIENTES' && (
                            <button 
                              onClick={() => confirmarDespacho(n)}
                              className="btn btn-primary btn-sm rounded-pill px-3 fw-bold shadow-sm d-inline-flex align-items-center gap-1"
                            >
                              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>local_shipping</span>
                              Despachar
                            </button>
                          )}
                        </td>
                      </tr>
                    ));
                  })()}
                </tbody>
              </table>
            </div>
          </div>

          {/* Dispatch History Column */}
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div className="card-header bg-white p-4 border-bottom d-flex justify-content-between align-items-center">
              <h3 className="h5 fw-bold mb-0 d-flex align-items-center gap-2">
                <span className="material-symbols-outlined text-success">history</span>
                Historial de Despachos
              </h3>
              <button onClick={cargarHistorial} className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1 rounded-pill px-3">
                <span className="material-symbols-outlined small">refresh</span>
                Actualizar Historial
              </button>
            </div>
            
            <div className="table-responsive" style={{ maxHeight: '400px' }}>
              <table className="table table-hover mb-0 align-middle">
                <thead className="bg-light sticky-top">
                  <tr>
                    <th className="px-4 py-3 small fw-bold text-secondary text-uppercase border-0">Fecha</th>
                    <th className="px-4 py-3 small fw-bold text-secondary text-uppercase border-0">Destino (Comuna)</th>
                    <th className="px-4 py-3 small fw-bold text-secondary text-uppercase border-0">Categoría</th>
                    <th className="px-4 py-3 small fw-bold text-secondary text-uppercase border-0 text-end">Cantidad</th>
                  </tr>
                </thead>
                <tbody>
                  {historialDespachos.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center py-5 text-secondary">
                        Aún no se han registrado despachos en el sistema.
                      </td>
                    </tr>
                  ) : (
                    historialDespachos.slice().reverse().map((d, index) => (
                      <tr key={d.id || index} className="transition-all">
                        <td className="px-4 py-3 text-secondary small">
                          {formatDate(d.fechaEnvio || d.fechaCreacion || d.timestamp || d.fecha || d.fechaDespacho || d.createdAt)}
                        </td>
                        <td className="px-4 py-3 fw-semibold text-dark">
                          <span className="material-symbols-outlined text-secondary me-2" style={{ fontSize: '16px', verticalAlign: 'text-bottom' }}>location_on</span>
                          {d.ubicacion || d.destino || d.comuna || 'No especificado'}
                        </td>
                        <td className="px-4 py-3">
                          <span className="badge bg-primary-subtle text-primary border-0">
                            {d.categoria || 'General'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-end fw-bold text-dark">
                          {d.cantidadNecesaria || d.cantidad || d.unidades} Unid.
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {despachoSeleccionado && (
        <>
          <div className="modal-backdrop fade show" style={{ zIndex: 1040 }}></div>
          <div className="modal fade show d-block" tabIndex="-1" style={{ zIndex: 1050 }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content border-0 shadow-lg rounded-4">
                <div className="modal-header border-bottom-0 pb-0 bg-white">
                  <h5 className="fw-bold text-dark d-flex align-items-center gap-2 mb-0">
                    <span className="material-symbols-outlined text-primary">local_shipping</span>
                    Configurar Despacho Operativo
                  </h5>
                  <button type="button" className="btn-close" onClick={() => setDespachoSeleccionado(null)} disabled={loading}></button>
                </div>
                <form onSubmit={despachar}>
                  <div className="modal-body p-4">
                    <div className="p-3 bg-light rounded-3 mb-4 border">
                      <div className="row g-2">
                        <div className="col-12 d-flex justify-content-between border-bottom pb-2">
                          <span className="small text-secondary fw-bold">Destino:</span>
                          <span className="fw-bold text-dark">{despachoSeleccionado.comuna || despachoSeleccionado.ubicacion}</span>
                        </div>
                        <div className="col-12 d-flex justify-content-between border-bottom py-2">
                          <span className="small text-secondary fw-bold">Categoría:</span>
                          <span className="fw-bold text-primary">{despachoSeleccionado.categoria}</span>
                        </div>
                        <div className="col-12 d-flex justify-content-between pt-2">
                          <span className="small text-secondary fw-bold">Cantidad Solicitada:</span>
                          <span className="fw-bold text-danger">{despachoSeleccionado.cantidadNecesaria} de {despachoSeleccionado.categoria || 'Suministro'}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label fw-bold text-secondary small">Cantidad a Enviar</label>
                        <input 
                          type="number" 
                          className="form-control bg-light" 
                          name="cantidadAEnviar"
                          value={formData.cantidadAEnviar}
                          onChange={handleChange}
                          max={despachoSeleccionado.cantidadNecesaria}
                          min="1"
                          required
                        />
                      </div>
                      
                      <div className="col-md-6">
                        <label className="form-label fw-bold text-secondary small">Transporte</label>
                        <select 
                          className="form-select bg-light" 
                          name="transporte"
                          value={formData.transporte}
                          onChange={handleChange}
                          required
                        >
                          <option value="Camión Municipal">Camión Municipal</option>
                          <option value="Camión Institucional">Camión Institucional</option>
                          <option value="Furgón de Rescate">Furgón de Rescate</option>
                          <option value="Vehículo Particular">Vehículo Particular</option>
                          <option value="Helicóptero">Helicóptero</option>
                        </select>
                      </div>

                      <div className="col-md-12">
                        <label className="form-label fw-bold text-secondary small">Responsable del Envío</label>
                        <input 
                          type="text" 
                          className="form-control bg-light" 
                          name="responsable"
                          value={formData.responsable}
                          onChange={handleChange}
                          placeholder="Ej: Juan Pérez"
                          required
                        />
                      </div>

                      <div className="col-md-12">
                        <label className="form-label fw-bold text-secondary small">Observaciones</label>
                        <textarea 
                          className="form-control bg-light" 
                          name="observaciones"
                          value={formData.observaciones}
                          onChange={handleChange}
                          rows="2"
                          placeholder="Ej: Primera entrega, llegar por acceso principal..."
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  
                  <div className="modal-footer border-top-0 bg-white p-4">
                    <button 
                      type="button"
                      className="btn btn-light rounded-pill px-4 fw-bold border" 
                      onClick={() => setDespachoSeleccionado(null)}
                      disabled={loading}
                    >
                      Cancelar
                    </button>
                    <button 
                      type="submit"
                      className="btn btn-primary rounded-pill px-4 fw-bold d-flex align-items-center justify-content-center gap-2"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                          Procesando...
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>send</span>
                          Realizar Despacho
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .hover-bg-light:hover { background-color: var(--surface-container-low) !important; }
        .bg-primary-subtle { background-color: #eaf1ff !important; }
      `}} />
    </div>
  );
}
