import { useState, useEffect } from 'react';
import { apiDonaciones, apiNecesidades, apiLogistica } from '../../../api';
import toast from 'react-hot-toast';

export default function InventarioStock() {
  const [inventario, setInventario] = useState({});
  const [donacionesRaw, setDonacionesRaw] = useState([]);
  const [necesidades, setNecesidades] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [selectedNecesidad, setSelectedNecesidad] = useState(null);
  const [asignacionCantidad, setAsignacionCantidad] = useState('');
  const [categoriaDescuento, setCategoriaDescuento] = useState('');
  const [transporte, setTransporte] = useState('Camión Municipal');
  const [responsable, setResponsable] = useState('');
  const [observaciones, setObservaciones] = useState('');

  const cargarDatos = async () => {
    setLoading(true);
    try {
      const [resDonaciones, resNecesidades] = await Promise.all([
        apiDonaciones.get('/donaciones'),
        apiNecesidades.get('/necesidades')
      ]);

      let despachosData = [];
      try {
        const resDespachos = await apiLogistica.get('/despachos');
        despachosData = resDespachos.data;
      } catch (e) {
        console.warn("No se pudo cargar historial de despachos", e);
      }

      // Filtrar donaciones válidas
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

      // 2. Restar Salidas (Despachos)
      despachosData.forEach(d => {
        let nombre = d.categoria || 'Suministro General';
        nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
        if (stockAgrupado[nombre]) {
          stockAgrupado[nombre] -= parseInt(d.cantidad || d.cantidadAEnviar || d.unidades || 0, 10);
        }
      });

      // Limpiar negativos (por despachos antiguos donde ya se había restado la donación manual)
      Object.keys(stockAgrupado).forEach(k => {
        if (stockAgrupado[k] < 0) stockAgrupado[k] = 0;
      });

      setInventario(stockAgrupado);

      // Filtrar necesidades que aún requieren cantidad
      const needs = resNecesidades.data.filter(n => parseInt(n.cantidadNecesaria, 10) > 0);
      setNecesidades(needs);

    } catch (error) {
      console.error("Error al cargar datos:", error);
      toast.error('Error al cargar inventario y necesidades');
    } finally {
      setLoading(false);
    }
  };

  // Ya no modificamos donaciones físicamente.
  // El inventario se calcula dinámicamente en cargarDatos().

  useEffect(() => {
    cargarDatos();
  }, []);

  const getIconForCategory = (cat) => {
    const text = (cat || '').toLowerCase();
    if (text.includes('aliment') || text.includes('agua') || text.includes('comida')) return { icon: 'restaurant', color: 'success' };
    if (text.includes('med') || text.includes('insumo') || text.includes('salud')) return { icon: 'medical_services', color: 'primary' };
    if (text.includes('ropa') || text.includes('abrig') || text.includes('manta')) return { icon: 'checkroom', color: 'warning' };
    return { icon: 'package_2', color: 'info' };
  };

  const handleOpenModal = (necesidad) => {
    setSelectedNecesidad(necesidad);
    setAsignacionCantidad('');
    // Preseleccionar si la categoría existe en el inventario
    let catNecesidad = necesidad.categoria || '';
    catNecesidad = catNecesidad.charAt(0).toUpperCase() + catNecesidad.slice(1).toLowerCase();
    setCategoriaDescuento(catNecesidad);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedNecesidad(null);
    setAsignacionCantidad('');
    setCategoriaDescuento('');
    setTransporte('Camión Municipal');
    setResponsable('');
    setObservaciones('');
  };

  const handleAsignar = async () => {
    if (!selectedNecesidad || !asignacionCantidad) return;

    const cantidadAAsignar = parseInt(asignacionCantidad, 10);
    const requerida = parseInt(selectedNecesidad.cantidadNecesaria, 10);

    if (cantidadAAsignar <= 0) {
      toast.error('La cantidad debe ser mayor a cero');
      return;
    }

    if (cantidadAAsignar > requerida) {
      toast.error('No puedes asignar más de lo requerido');
      return;
    }

    if (!categoriaDescuento) {
      toast.error('Selecciona qué categoría de stock vas a asignar');
      return;
    }

    if (!responsable) {
      toast.error('Debe ingresar un responsable para el despacho');
      return;
    }

    const stockTotalCandidato = inventario[categoriaDescuento] || 0;

    if (stockTotalCandidato < cantidadAAsignar) {
      toast.error(`Stock insuficiente de "${categoriaDescuento}". Disponible: ${stockTotalCandidato}`);
      return;
    }

    setLoading(true);
    try {
      // 1. Reducir la cantidad de la Necesidad en el microservicio de Necesidades
      const nuevaCantidadNecesidad = requerida - cantidadAAsignar;
      await apiNecesidades.put(`/necesidades/${selectedNecesidad.id}`, {
        ...selectedNecesidad,
        cantidadNecesaria: nuevaCantidadNecesidad.toString(),
        estado: nuevaCantidadNecesidad === 0 ? 'COMPLETADO' : 'EN PROCESO'
      });

      // 2. Crear el registro de Despacho (apiLogistica) adaptado EXACTAMENTE a tu DespachoDTO
      const payloadDespacho = {
        necesidadId: parseInt(selectedNecesidad.id, 10), // Atributo crucial para el DTO
        categoria: categoriaDescuento,                   // "Alimentos", "Ropa", etc.
        cantidad: cantidadAAsignar,
        destino: selectedNecesidad.comuna || selectedNecesidad.ubicacion,
        transporte: transporte,
        responsable: responsable,
        observaciones: observaciones || 'Despacho originado desde Control de Stock'
      };

      // Enviamos a Logística
      await apiLogistica.post('/despachos', payloadDespacho);

      toast.success(`Despacho creado exitosamente. Se descontaron ${cantidadAAsignar} unidades de stock.`);
      handleCloseModal();
      cargarDatos(); // Recargar las tablas e inventario dinámico

    } catch (error) {
      console.error(error);
      toast.error('Ocurrió un error durante la asignación');
      setLoading(false);
    }
  };

  const items = Object.entries(inventario);

  return (
    <div className="p-3 p-md-4 min-vh-100 bg-light">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 gap-3">
        <div>
          <h2 className="h3 fw-bold text-dark mb-2">Control de Stock y Asignación</h2>
          <p className="text-secondary mb-0">
            Inventario consolidado de almacén y asignación de recursos a reportes críticos.
          </p>
        </div>
        <button onClick={cargarDatos} className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2 rounded-pill px-3 shadow-sm">
          <span className="material-symbols-outlined small">refresh</span>
          Actualizar
        </button>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="text-secondary mt-3">Calculando inventario y necesidades...</p>
        </div>
      ) : (
        <div className="row g-4">

          {/* Columna Izquierda: Stock */}
          <div className="col-12 col-xl-7">
            <h4 className="fw-bold mb-3 d-flex align-items-center gap-2" style={{ fontSize: '18px' }}>
              <span className="material-symbols-outlined text-primary">inventory_2</span>
              Stock en Almacén
            </h4>

            {items.length === 0 ? (
              <div className="text-center py-5 bg-white rounded-4 shadow-sm border">
                <span className="material-symbols-outlined text-secondary" style={{ fontSize: '3rem' }}>inventory_2</span>
                <h4 className="mt-3 text-dark">Almacén Vacío</h4>
                <p className="text-secondary mb-0">No hay donaciones disponibles en stock.</p>
              </div>
            ) : (
              <div className="row g-3">
                {items.map(([nombre, cantidad], idx) => {
                  if (cantidad === 0) return null; // No mostrar si es 0
                  const { icon, color } = getIconForCategory(nombre);
                  return (
                    <div className="col-12 col-sm-6" key={idx}>
                      <div className="card border-0 shadow-sm rounded-4 h-100 transition-all hover-translate">
                        <div className="card-body p-3 d-flex align-items-center gap-3">
                          <div className={`rounded-circle bg-${color}-subtle text-${color} d-flex align-items-center justify-content-center`} style={{ width: '48px', height: '48px', minWidth: '48px' }}>
                            <span className="material-symbols-outlined">{icon}</span>
                          </div>
                          <div className="flex-grow-1">
                            <h5 className="fw-bold text-dark mb-0" style={{ fontSize: '15px' }}>{nombre}</h5>
                            <span className="small text-secondary">Bodega Central</span>
                          </div>
                          <div className="text-end bg-light rounded px-3 py-1 border">
                            <span className="h5 fw-bold text-dark mb-0">{cantidad}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Columna Derecha: Necesidades Activas */}
          <div className="col-12 col-xl-5">
            <h4 className="fw-bold mb-3 d-flex align-items-center gap-2" style={{ fontSize: '18px' }}>
              <span className="material-symbols-outlined text-error" style={{ color: '#ba1a1a' }}>warning</span>
              Reportes Críticos
            </h4>

            <div className="d-flex flex-column gap-3" style={{ maxHeight: '600px', overflowY: 'auto' }}>
              {necesidades.length === 0 ? (
                <div className="text-center py-5 bg-white rounded-4 shadow-sm border">
                  <span className="material-symbols-outlined text-success" style={{ fontSize: '3rem' }}>check_circle</span>
                  <p className="text-secondary mt-2 mb-0">No hay necesidades pendientes.</p>
                </div>
              ) : (
                necesidades.map(n => {
                  const req = parseInt(n.cantidadNecesaria, 10);
                  const isHighPriority = n.prioridad === 'Alta';
                  return (
                    <div key={n.id} className="card border-0 shadow-sm rounded-4 overflow-hidden">
                      <div className="card-body p-3">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="fw-bold mb-0 text-dark">{n.descripcion}</h6>
                          {isHighPriority && (
                            <span className="badge bg-danger text-white rounded-pill ms-2">Alta</span>
                          )}
                        </div>
                        <div className="d-flex align-items-center gap-2 small text-secondary mb-3">
                          <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>location_on</span>
                          <span className="text-uppercase fw-semibold">{n.ubicacion || n.comuna}</span>
                          <span className="mx-1">•</span>
                          <span className="fw-semibold text-primary">{n.categoria || 'General'}</span>
                        </div>

                        <div className="d-flex align-items-center justify-content-between bg-light p-2 rounded border">
                          <div>
                            <span className="small text-secondary d-block" style={{ fontSize: '11px' }}>Requerido</span>
                            <span className="fw-bold text-dark">{req} de {n.categoria || 'Suministro'}</span>
                          </div>
                          <button
                            onClick={() => handleOpenModal(n)}
                            className="btn btn-sm btn-primary d-flex align-items-center gap-1 rounded-pill px-3"
                          >
                            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>local_shipping</span>
                            Despachar Stock
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

        </div>
      )}

      {/* Modal de Asignación */}
      {showModal && selectedNecesidad && (
        <>
          <div className="modal-backdrop fade show" style={{ zIndex: 1040 }}></div>
          <div className="modal fade show d-block" style={{ zIndex: 1050 }} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
                <div className="modal-header bg-light border-bottom-0 pb-0">
                  <h5 className="modal-title fw-bold text-dark d-flex align-items-center gap-2">
                    <span className="material-symbols-outlined text-primary">local_shipping</span>
                    Configurar Despacho Directo
                  </h5>
                  <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                </div>
                <div className="modal-body pt-3 pb-4">

                  <div className="p-3 bg-primary-subtle border border-primary-subtle rounded-3 mb-4">
                    <p className="small text-primary-emphasis mb-1 fw-bold">Reporte de Necesidad:</p>
                    <p className="mb-0 text-dark">{selectedNecesidad.descripcion}</p>
                    <div className="d-flex justify-content-between mt-2 pt-2 border-top border-primary border-opacity-25">
                      <span className="small">Categoría: <strong className="text-primary">{selectedNecesidad.categoria || 'General'}</strong></span>
                      <span className="small">Faltan: <strong className="text-danger">{selectedNecesidad.cantidadNecesaria} {selectedNecesidad.categoria || 'Unid.'}</strong></span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold small text-secondary">Seleccionar Categoría de Stock a Consumir:</label>
                    <select
                      className="form-select bg-light mb-3 border-primary"
                      value={categoriaDescuento}
                      onChange={(e) => setCategoriaDescuento(e.target.value)}
                    >
                      <option value="">-- Elija el inventario a asignar --</option>
                      {Object.entries(inventario).map(([cat, qty]) => (
                        <option key={cat} value={cat}>{cat} ({qty} disp.)</option>
                      ))}
                    </select>

                    <label className="form-label fw-bold small text-secondary">Cantidad a despachar (consumir del stock):</label>
                    <input
                      type="number"
                      className="form-control form-control-lg bg-light"
                      value={asignacionCantidad}
                      onChange={(e) => setAsignacionCantidad(e.target.value)}
                      placeholder="Ej: 100"
                      min="1"
                    />
                  </div>

                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-bold small text-secondary">Transporte:</label>
                      <select
                        className="form-select bg-light"
                        value={transporte}
                        onChange={(e) => setTransporte(e.target.value)}
                      >
                        <option value="Camión Municipal">Camión Municipal</option>
                        <option value="Camión Institucional">Camión Institucional</option>
                        <option value="Furgón de Rescate">Furgón de Rescate</option>
                        <option value="Vehículo Particular">Vehículo Particular</option>
                        <option value="Helicóptero">Helicóptero</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold small text-secondary">Responsable:</label>
                      <input
                        type="text"
                        className="form-control bg-light"
                        value={responsable}
                        onChange={(e) => setResponsable(e.target.value)}
                        placeholder="Ej: Juan Pérez"
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-bold small text-secondary">Observaciones:</label>
                      <textarea
                        className="form-control bg-light"
                        rows="2"
                        value={observaciones}
                        onChange={(e) => setObservaciones(e.target.value)}
                        placeholder="Ej: Entrega de emergencia en zona sur"
                        style={{ resize: 'none' }}
                      />
                    </div>
                  </div>

                </div>
                <div className="modal-footer border-top-0 bg-light p-3 d-flex justify-content-end gap-2">
                  <button type="button" className="btn btn-light rounded-pill px-4 fw-bold border" onClick={handleCloseModal}>Cancelar</button>
                  <button type="button" className="btn btn-primary rounded-pill px-4 fw-bold d-flex align-items-center gap-2" onClick={handleAsignar}>
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>send</span>
                    Confirmar Despacho
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <style>{`
          .hover-translate { transition: transform 0.2s; cursor: default; }
          .hover-translate:hover { transform: translateY(-3px); box-shadow: 0 .5rem 1rem rgba(0,0,0,.1)!important; }
          .bg-primary-subtle { background-color: var(--surface-container)!important; }
          .text-primary-emphasis { color: var(--on-surface-variant)!important; }
        `}</style>
    </div>
  );
}
