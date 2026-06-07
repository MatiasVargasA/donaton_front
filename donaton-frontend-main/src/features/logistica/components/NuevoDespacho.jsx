import { useState, useEffect } from 'react';
import { apiDonaciones, apiLogistica, apiNecesidades } from '../../../api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function NuevoDespacho() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [inventario, setInventario] = useState({});
  const [donacionesRaw, setDonacionesRaw] = useState([]);
  const [necesidades, setNecesidades] = useState([]);
  
  const [selectedNecesidadId, setSelectedNecesidadId] = useState('');
  
  const [formData, setFormData] = useState({
    destino: '',
    categoria: '',
    cantidad: '',
    transporte: 'Camión Municipal',
    responsable: '',
    observaciones: ''
  });

  const cargarDatos = async () => {
    try {
      // Cargar inventario
      const resDonaciones = await apiDonaciones.get('/donaciones');
      
      let despachosData = [];
      try {
        const resDespachos = await apiLogistica.get('/despachos');
        despachosData = resDespachos.data;
      } catch(e) {
        console.warn("No se pudo cargar historial de despachos", e);
      }

      const validas = resDonaciones.data.filter(
        d => d.estado === 'EN_LOGISTICA' || d.estado === 'RECIBIDA'
      );
      setDonacionesRaw(validas);

      const stockAgrupado = {};
      
      // 1. Sumar Entradas
      validas.forEach(d => {
        let nombre = d.categoria || d.tipo || 'Suministro General';
        nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
        if (!stockAgrupado[nombre]) stockAgrupado[nombre] = 0;
        stockAgrupado[nombre] += parseInt(d.cantidad || 0, 10);
      });

      // 2. Restar Salidas
      despachosData.forEach(d => {
        let nombre = d.categoria || 'Suministro General';
        nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
        if (stockAgrupado[nombre]) {
          stockAgrupado[nombre] -= parseInt(d.cantidad || d.cantidadAEnviar || d.unidades || 0, 10);
        }
      });

      Object.keys(stockAgrupado).forEach(k => {
        if (stockAgrupado[k] < 0) stockAgrupado[k] = 0;
      });

      setInventario(stockAgrupado);

      // Cargar necesidades activas
      let activas = [];
      try {
        const resNec = await apiNecesidades.get('/necesidades/activas');
        activas = resNec.data.filter(n => parseInt(n.cantidadNecesaria || 0, 10) > 0 && n.estado !== 'COMPLETADO');
      } catch (err) {
        // Fallback
        const fallback = await apiNecesidades.get('/necesidades');
        activas = fallback.data.filter(n => parseInt(n.cantidadNecesaria || 0, 10) > 0 && n.estado !== 'COMPLETADO');
      }
      setNecesidades(activas);

    } catch (error) {
      console.error("Error cargando datos", error);
      toast.error('No se pudieron cargar los datos necesarios');
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleSelectNecesidad = (e) => {
    const id = e.target.value;
    setSelectedNecesidadId(id);
    
    if (!id) {
      setFormData(prev => ({ ...prev, destino: '', categoria: '', cantidad: '', responsable: '' }));
      return;
    }
    
    const nec = necesidades.find(n => n.id.toString() === id);
    if (nec) {
      setFormData(prev => ({
        ...prev,
        destino: nec.comuna || nec.ubicacion,
        categoria: nec.categoria,
        cantidad: '', // Dejar vacío para entrada manual
        responsable: ''
      }));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Ya no modificamos donaciones físicamente.
  // El inventario se calcula dinámicamente.

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedNecesidadId) {
      toast.error('Debes seleccionar un reporte para despachar');
      return;
    }

    const nec = necesidades.find(n => n.id.toString() === selectedNecesidadId);
    if (!nec) return;

    const cantidadADespachar = parseInt(formData.cantidad, 10);
    const solicitada = parseInt(nec.cantidadNecesaria, 10);
    let catMatch = formData.categoria;
    catMatch = catMatch.charAt(0).toUpperCase() + catMatch.slice(1).toLowerCase();

    // Verificación flexible de stock
    const stockDisponible = Object.keys(inventario).reduce((acc, k) => {
      if (k.includes(catMatch) || catMatch.includes(k) || catMatch === 'Otro') {
        return acc + inventario[k];
      }
      return acc;
    }, 0);

    if (isNaN(cantidadADespachar) || cantidadADespachar <= 0) {
      toast.error('Cantidad inválida');
      return;
    }

    if (cantidadADespachar > solicitada) {
      toast.error(`No puedes despachar más de lo solicitado por el reporte (${solicitada} unidades).`);
      return;
    }

    if (cantidadADespachar > stockDisponible && catMatch !== 'Otro') {
      toast.error(`Stock insuficiente en bodega. Tienes ${stockDisponible} unidades de ${catMatch} disponibles.`);
      return;
    }

    setLoading(true);

    try {
      // 1. Registrar el despacho
      const payloadDespacho = {
        necesidadId: parseInt(selectedNecesidadId, 10), // Debe coincidir con 'private Long necesidadId'
        categoria: formData.categoria,                  // Debe coincidir con 'private String categoria'
        cantidad: cantidadADespachar,                   // Debe coincidir con 'private Integer cantidad'
        destino: formData.destino,                      // Debe coincidir con 'private String destino'
        transporte: formData.transporte,                // Debe coincidir con 'private String transporte'
        responsable: formData.responsable,              // Debe coincidir con 'private String responsable'
        observaciones: formData.observaciones           // Debe coincidir con 'private String observaciones'
      };

      // Enviamos el payload limpio a logística
      await apiLogistica.post('/despachos', payloadDespacho);
      
      // 2. Descontar parcialmente de la necesidad
      const restante = solicitada - cantidadADespachar;
      try {
        await apiNecesidades.put(`/necesidades/${nec.id}`, {
          ...nec,
          cantidadNecesaria: restante.toString(),
          estado: restante === 0 ? "COMPLETADO" : "EN PROCESO"
        });
      } catch (err) {
        console.warn('Error al actualizar la necesidad original', err);
      }
      
      toast.success('Despacho creado y registrado con éxito');
      
      setTimeout(() => {
        navigate('/logistica');
      }, 1500);

    } catch (error) {
      console.error(error);
      toast.error('Ocurrió un error al registrar el despacho');
      setLoading(false);
    }
  };

  return (
    <div className="p-3 p-md-4 min-vh-100 bg-light">
      <div className="mb-4">
        <button 
          onClick={() => navigate('/logistica')} 
          className="btn btn-link text-decoration-none p-0 mb-3 d-flex align-items-center gap-1 text-secondary"
        >
          <span className="material-symbols-outlined small">arrow_back</span>
          Volver a Gestión de Despachos
        </button>
        <h2 className="h3 fw-bold text-dark mb-1">Nuevo Despacho Operativo</h2>
        <p className="text-secondary mb-0">Selecciona una alerta activa para autocompletar y proceder con el envío.</p>
      </div>

      <div className="row justify-content-center">
        <div className="col-12 col-xl-8">
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div className="card-header bg-white p-4 border-bottom">
              <h3 className="h5 fw-bold mb-0 d-flex align-items-center gap-2 text-primary">
                <span className="material-symbols-outlined">assignment</span>
                Selección de Reporte
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="card-body p-4 p-md-5">
                
                <div className="row g-4">
                  {/* Selector de Reporte */}
                  <div className="col-md-12 mb-2">
                    <label className="form-label fw-bold text-primary small text-uppercase">1. Elegir Reporte a Despachar</label>
                    <select 
                      className="form-select form-select-lg bg-primary-subtle border-primary border-opacity-25 fw-bold" 
                      value={selectedNecesidadId}
                      onChange={handleSelectNecesidad}
                      required
                    >
                      <option value="">Seleccione un reporte activo...</option>
                      {necesidades.map(n => (
                        <option key={n.id} value={n.id}>
                          {n.comuna || n.ubicacion} - {n.categoria} (Faltan {n.cantidadNecesaria})
                        </option>
                      ))}
                    </select>
                    {necesidades.length === 0 && (
                      <div className="form-text text-danger mt-1">
                        No hay reportes de necesidades activas para despachar.
                      </div>
                    )}
                  </div>

                  <hr className="text-secondary opacity-25 my-4" />

                  {/* Destino Autocompletado */}
                  <div className="col-md-12">
                    <label className="form-label fw-bold text-secondary small text-uppercase">Destino (Autocompletado)</label>
                    <input 
                      type="text" 
                      className="form-control form-control-lg bg-light border-0 text-secondary fw-semibold" 
                      name="destino"
                      value={formData.destino}
                      readOnly
                      placeholder="Se llenará automáticamente"
                    />
                  </div>

                  {/* Categoría Autocompletada */}
                  <div className="col-md-6">
                    <label className="form-label fw-bold text-secondary small text-uppercase">Categoría (Autocompletada)</label>
                    <input 
                      type="text" 
                      className="form-control form-control-lg bg-light border-0 text-secondary fw-semibold" 
                      name="categoria"
                      value={formData.categoria}
                      readOnly
                      placeholder="Se llenará automáticamente"
                    />
                  </div>

                  {/* Cantidad a Despachar (Entrada Manual) */}
                  <div className="col-md-6">
                    <label className="form-label fw-bold text-dark small text-uppercase">Cantidad a Despachar</label>
                    <input 
                      type="number" 
                      className="form-control form-control-lg bg-white border fw-bold" 
                      name="cantidad"
                      value={formData.cantidad}
                      onChange={handleChange}
                      placeholder={selectedNecesidadId ? "Ingrese cantidad a enviar" : "Seleccione reporte primero"}
                      min="1"
                      required
                      disabled={!selectedNecesidadId}
                    />
                    {selectedNecesidadId && formData.categoria && (
                      <div className="mt-2 p-2 bg-light rounded border small text-secondary">
                        <div className="d-flex justify-content-between mb-1">
                          <span>Solicitado por el reporte:</span>
                          <strong className="text-primary">
                            {necesidades.find(n => n.id.toString() === selectedNecesidadId)?.cantidadNecesaria || 0} unidades
                          </strong>
                        </div>
                        <div className="d-flex justify-content-between">
                          <span>Stock disponible en bodega:</span>
                          <strong className={
                            (inventario[formData.categoria] || 0) < parseInt(formData.cantidad || 0, 10) ? 'text-danger' : 'text-success'
                          }>
                            {inventario[formData.categoria] || 0} unidades
                          </strong>
                        </div>
                      </div>
                    )}
                  </div>

                  <hr className="text-secondary opacity-25 my-4" />

                  {/* Transporte (Elegible) */}
                  <div className="col-md-6">
                    <label className="form-label fw-bold text-dark small text-uppercase">Transporte</label>
                    <select 
                      className="form-select form-select-lg bg-white border" 
                      name="transporte"
                      value={formData.transporte}
                      onChange={handleChange}
                      required
                      disabled={!selectedNecesidadId}
                    >
                      <option value="Camión Municipal">Camión Municipal</option>
                      <option value="Camión Institucional">Camión Institucional</option>
                      <option value="Furgón de Rescate">Furgón de Rescate</option>
                      <option value="Vehículo Particular">Vehículo Particular</option>
                      <option value="Helicóptero">Helicóptero / Vuelo</option>
                    </select>
                  </div>

                  {/* Responsable (Elegible) */}
                  <div className="col-md-6">
                    <label className="form-label fw-bold text-dark small text-uppercase">Responsable del Envío</label>
                    <input 
                      type="text" 
                      className="form-control form-control-lg bg-white border" 
                      name="responsable"
                      value={formData.responsable || ''}
                      onChange={handleChange}
                      placeholder="Ej: Juan Pérez"
                      required
                      disabled={!selectedNecesidadId}
                    />
                  </div>

                  {/* Observaciones (Elegible) */}
                  <div className="col-md-12">
                    <label className="form-label fw-bold text-dark small text-uppercase">Observación</label>
                    <textarea 
                      className="form-control bg-white border" 
                      name="observaciones"
                      value={formData.observaciones}
                      onChange={handleChange}
                      rows="3"
                      placeholder="Ingrese detalles del envío..."
                      style={{ resize: 'none' }}
                      disabled={!selectedNecesidadId}
                    />
                  </div>

                </div>
              </div>

              <div className="card-footer bg-white p-4 border-top d-flex justify-content-end gap-3">
                <button 
                  type="button" 
                  className="btn btn-light rounded-pill px-4 fw-bold border" 
                  onClick={() => navigate('/logistica')}
                  disabled={loading}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary rounded-pill px-5 fw-bold shadow-sm d-flex align-items-center gap-2"
                  disabled={loading || !selectedNecesidadId}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Procesando...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined">send</span>
                      Despachar
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .bg-primary-subtle { background-color: #eaf1ff !important; }
      `}} />
    </div>
  );
}
