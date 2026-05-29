import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../../AuthContext';
import { apiDonaciones } from '../../../api';
import toast from 'react-hot-toast';

export default function RegistroDonaciones() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const categoriaInicial = searchParams.get('categoria') || '';

  const isDonor = user?.rol === 'USUARIO' || user?.rol === 'USER';

  const [formData, setFormData] = useState(() => ({
    categoria: categoriaInicial,
    cantidad: '',
    descripcion: '',
    nombreDonante: user ? (user.nombre || user.correo || '') : '',
    direccionRetiro: '',
    comuna: ''
  }));

  const [donaciones, setDonaciones] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const cargarDonaciones = async () => {
    try {
      const response = await apiDonaciones.get('/donaciones');
      setDonaciones(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      cargarDonaciones();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const storedUser = JSON.parse(localStorage.getItem('donaton_user') || '{}');
      const usuarioId = storedUser.id || storedUser.idUsuario || user?.id || 1;
      
      const payload = {
        categoria: formData.categoria.toUpperCase(),
        cantidad: parseInt(formData.cantidad, 10),
        descripcion: formData.descripcion,
        nombreDonante: formData.nombreDonante,
        direccionRetiro: formData.direccionRetiro,
        comuna: formData.comuna,
        usuarioId: usuarioId
      };
      
      console.log("DATA ENVIADA:", payload);
      
      const response = await apiDonaciones.post('/donaciones', payload);
      if (response.status === 200 || response.status === 201) {
        toast.success('Donación registrada correctamente');
        setFormData({ categoria: '', cantidad: '', descripcion: '', nombreDonante: '', direccionRetiro: '', comuna: '' });
        cargarDonaciones();
      } else {
        toast.error('Error al registrar donación');
      }
    } catch (error) {
      console.error("Error del backend:", error.response?.data);
      console.error(error);
      toast.error(error.response?.data?.message || 'Error de conexión con el servicio de donaciones');
    } finally {
      setLoading(false);
    }
  };

  const eliminarDonacion = async (id) => {
    if (!window.confirm('¿Eliminar este registro?')) return;
    try {
      await apiDonaciones.delete(`/donaciones/${id}`);
      toast.success('Registro eliminado');
      cargarDonaciones();
    } catch (error) {
      console.error(error);
    }
  };

  if (isDonor) {
    const categories = [
      { label: 'Alimentos', icon: 'restaurant', color: 'success', bg: 'bg-success-subtle', text: 'text-success', desc: 'Comida, agua, legumbres' },
      { label: 'Medicinas', icon: 'medical_services', color: 'primary', bg: 'bg-primary-subtle', text: 'text-primary', desc: 'Kit de primeros auxilios' },
      { label: 'Ropa', icon: 'checkroom', color: 'warning', bg: 'bg-warning-subtle', text: 'text-warning-emphasis', desc: 'Abrigos, frazadas, calzado' },
      { label: 'Escolares', icon: 'school', color: 'info', bg: 'bg-info-subtle', text: 'text-info-emphasis', desc: 'Útiles, cuadernos, mochilas' },
      { label: 'Otros', icon: 'package_2', color: 'secondary', bg: 'bg-secondary-subtle', text: 'text-secondary', desc: 'Herramientas, varios' }
    ];

    const handleSelectCategory = (catLabel) => {
      setFormData(prev => ({ ...prev, categoria: catLabel }));
      toast.success(`Categoría seleccionada: ${catLabel}`);
    };

    return (
      <div className="container-fluid py-4 bg-light min-vh-100">
        <div className="mx-auto" style={{ maxWidth: '1200px' }}>
          
          {/* Header Section */}
          <div className="mb-4 text-center text-md-start">
            <h2 className="display-6 fw-bold mb-1 text-dark">Hacer una Donación</h2>
            <p className="text-secondary mb-0">Selecciona la categoría de ayuda y registra la cantidad de tu aporte solidario.</p>
          </div>

          <div className="row g-4">
            
            {/* Left Column: Category Selector Grid */}
            <div className="col-12 col-lg-7">
              <div className="card border-0 shadow-sm p-4 bg-white rounded-4 h-100">
                <h4 className="fw-bold mb-3 text-dark text-uppercase small tracking-wider">1. Selecciona la Categoría</h4>
                
                <div className="row g-3">
                  {categories.map((cat, idx) => {
                    const isSelected = formData.categoria.toLowerCase() === cat.label.toLowerCase();
                    return (
                      <div className="col-12 col-sm-6" key={idx}>
                        <div 
                          onClick={() => handleSelectCategory(cat.label)}
                          className={`card rounded-4 p-3 border-2 h-100 cursor-pointer transition-all hover-translate text-start ${isSelected ? 'border-primary shadow-sm bg-primary bg-opacity-10' : 'border-light-subtle bg-light bg-opacity-50'}`}
                          style={{ cursor: 'pointer' }}
                        >
                          <div className="d-flex align-items-center gap-3">
                            <div className={`rounded-3 ${cat.bg} ${cat.text} d-flex align-items-center justify-content-center`} style={{ width: '48px', height: '48px', flexShrink: 0 }}>
                              <span className="material-symbols-outlined fs-3">{cat.icon}</span>
                            </div>
                            <div>
                              <h5 className="fw-bold mb-1 text-dark h6">{cat.label}</h5>
                              <p className="small text-secondary mb-0" style={{ fontSize: '0.75rem' }}>{cat.desc}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 pt-3 border-top d-none d-md-block">
                  <div className="d-flex gap-3 align-items-center bg-light p-3 rounded-4">
                    <span className="material-symbols-outlined text-primary fs-3" style={{ fontVariationSettings: "'FILL' 1" }}>volunteer_activism</span>
                    <p className="small text-secondary mb-0">
                      Tus aportes se registran inmediatamente y se clasifican de forma transparente en nuestro panel logístico municipal.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Form Details Box */}
            <div className="col-12 col-lg-5">
              <div className="card border-0 shadow-sm p-4 bg-white rounded-4 h-100 d-flex flex-column justify-content-between">
                <div>
                  <h4 className="fw-bold mb-3 text-dark text-uppercase small tracking-wider">2. Detalles del Aporte</h4>
                  
                  <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                    
                    {/* Selected Category Indicator */}
                    <div className="bg-light p-3 rounded-3 mb-1 border border-light-subtle">
                      <label className="small text-secondary fw-bold text-uppercase d-block mb-1">Categoría Seleccionada</label>
                      {formData.categoria ? (
                        <div className="d-flex align-items-center gap-2">
                          <span className="material-symbols-outlined text-primary">check_circle</span>
                          <span className="fw-bold text-dark">{formData.categoria}</span>
                        </div>
                      ) : (
                        <span className="small text-danger fw-bold">Por favor selecciona un recuadro a la izquierda</span>
                      )}
                    </div>

                    <div className="row g-2">
                      {/* Quantity input */}
                      <div className="col-sm-6">
                        <label className="form-label small fw-bold text-secondary text-uppercase mb-1">Cantidad</label>
                        <div className="position-relative">
                          <span className="material-symbols-outlined position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary">tag</span>
                          <input
                            type="number"
                            name="cantidad"
                            value={formData.cantidad}
                            onChange={handleChange}
                            required
                            placeholder="Ej: 20"
                            className="form-control ps-5 bg-light border-0"
                            style={{ borderRadius: '0.75rem' }}
                            min="1"
                          />
                        </div>
                      </div>

                      {/* Name / Donor input */}
                      <div className="col-sm-6">
                        <label className="form-label small fw-bold text-secondary text-uppercase mb-1">Donante</label>
                        <div className="position-relative">
                          <span className="material-symbols-outlined position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary">person</span>
                          <input
                            type="text"
                            name="nombreDonante"
                            value={formData.nombreDonante}
                            onChange={handleChange}
                            required
                            placeholder="Ej: Alejandro Silva"
                            className="form-control ps-5 bg-light border-0"
                            style={{ borderRadius: '0.75rem' }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Descripcion input */}
                    <div>
                      <label className="form-label small fw-bold text-secondary text-uppercase mb-1">Descripción</label>
                      <div className="position-relative">
                        <span className="material-symbols-outlined position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary">description</span>
                        <input
                          type="text"
                          name="descripcion"
                          value={formData.descripcion}
                          onChange={handleChange}
                          required
                          placeholder="Ej: Cajas de comida"
                          className="form-control ps-5 bg-light border-0"
                          style={{ borderRadius: '0.75rem' }}
                        />
                      </div>
                    </div>

                    <div className="row g-2">
                      {/* Comuna input */}
                      <div className="col-sm-6">
                        <label className="form-label small fw-bold text-secondary text-uppercase mb-1">Comuna</label>
                        <div className="position-relative">
                          <span className="material-symbols-outlined position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary">location_city</span>
                          <input
                            type="text"
                            name="comuna"
                            value={formData.comuna}
                            onChange={handleChange}
                            required
                            placeholder="Ej: Santiago"
                            className="form-control ps-5 bg-light border-0"
                            style={{ borderRadius: '0.75rem' }}
                          />
                        </div>
                      </div>

                      {/* DireccionRetiro input */}
                      <div className="col-sm-6">
                        <label className="form-label small fw-bold text-secondary text-uppercase mb-1">Dirección de Retiro</label>
                        <div className="position-relative">
                          <span className="material-symbols-outlined position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary">home_pin</span>
                          <input
                            type="text"
                            name="direccionRetiro"
                            value={formData.direccionRetiro}
                            onChange={handleChange}
                            required
                            placeholder="Ej: Av Central 123"
                            className="form-control ps-5 bg-light border-0"
                            style={{ borderRadius: '0.75rem' }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Confirm Button */}
                    <button
                      type="submit"
                      disabled={loading || !formData.categoria}
                      className="btn btn-primary btn-lg w-100 fw-bold shadow-sm mt-3 py-3 d-flex align-items-center justify-content-center gap-2"
                      style={{ borderRadius: '0.75rem' }}
                    >
                      <span className="material-symbols-outlined">{loading ? 'sync' : 'favorite'}</span>
                      <span>{loading ? 'Procesando...' : 'Confirmar Donación'}</span>
                    </button>
                  </form>
                </div>

                <div className="bg-success bg-opacity-10 border border-success border-opacity-25 rounded-4 p-3 text-success-emphasis mt-4">
                  <div className="d-flex gap-2 align-items-center mb-1">
                    <span className="material-symbols-outlined text-success" style={{ fontVariationSettings: "'FILL' 1" }}>handshake</span>
                    <span className="fw-bold small">Tu Impacto</span>
                  </div>
                  <p className="small text-secondary mb-0" style={{ fontSize: '0.8rem' }}>
                    Cada donación completada puede ser rastreada en tiempo real desde tu pestaña de "Mis Donaciones".
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
        
        <style dangerouslySetInnerHTML={{ __html: `
          .hover-translate { transition: all 0.25s ease-in-out; }
          .hover-translate:hover { transform: translateY(-3px); border-color: var(--bs-primary) !important; }
          .cursor-pointer { cursor: pointer; }
        `}} />
      </div>
    );
  }

  return (
    <div className="p-3 p-md-4">
      {/* Dashboard Header & CTA */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 gap-3">
        <div>
          <h2 className="h3 fw-bold text-on-surface mb-2">Gestión de Inventario</h2>
          <p className="text-on-surface-variant mb-0" style={{ maxWidth: '600px' }}>
            Administre el flujo de recursos humanitarios con trazabilidad completa y monitoreo de stock en tiempo real.
          </p>
        </div>
        <button
          className="btn btn-primary-custom d-flex align-items-center gap-2 shadow-sm"
          data-bs-toggle="modal"
          data-bs-target="#registroModal"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>inventory</span>
          Registrar Nueva Donación
        </button>
      </div>

      {/* Bento Layout */}
      <div className="row g-4">
        {/* Left Column (Main Table) */}
        <div className="col-12 col-xl-9">
          <div className="d-flex flex-column gap-4">

            {/* Smart Filters */}
            <div className="admin-card py-3 px-3 d-flex align-items-center gap-3 overflow-auto">
              <span className="small fw-bold text-secondary text-nowrap">Categorías:</span>
              <div className="d-flex gap-2">
                <button className="btn btn-sm rounded-pill px-4 bg-primary text-white">Todos</button>
                <button className="btn btn-sm rounded-pill px-4 bg-surface-container-high text-on-surface-variant border-0">Alimentos</button>
                <button className="btn btn-sm rounded-pill px-4 bg-surface-container-high text-on-surface-variant border-0">Insumos Médicos</button>
              </div>
              <div className="ms-auto d-flex gap-2 ps-3 border-start">
                <button className="btn btn-icon-sm border rounded-3 text-secondary p-2">
                  <span className="material-symbols-outlined small">filter_list</span>
                </button>
                <button className="btn btn-icon-sm border rounded-3 text-secondary p-2">
                  <span className="material-symbols-outlined small">download</span>
                </button>
              </div>
            </div>

            {/* Detailed Inventory Table */}
            <div className="admin-card p-0 overflow-hidden shadow-sm">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="bg-surface-container-low border-bottom">
                    <tr>
                      <th className="px-4 py-3 small fw-bold text-secondary text-uppercase tracking-wider border-0">Nombre del Ítem</th>
                      <th className="px-4 py-3 small fw-bold text-secondary text-uppercase tracking-wider border-0">Cantidad</th>
                      <th className="px-4 py-3 small fw-bold text-secondary text-uppercase tracking-wider border-0">Fecha</th>
                      <th className="px-4 py-3 small fw-bold text-secondary text-uppercase tracking-wider border-0">Origen</th>
                      <th className="px-4 py-3 border-0"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {donaciones.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center py-5 text-secondary">No hay registros aún.</td>
                      </tr>
                    ) : (
                      donaciones.map((d) => (
                        <tr key={d.id} className="transition-all hover-bg-light">
                          <td className="px-4 py-3">
                            <div className="d-flex align-items-center gap-3">
                              <div className="rounded-3 bg-primary-subtle p-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                <span className="material-symbols-outlined text-primary">package_2</span>
                              </div>
                              <div>
                                <p className="small fw-bold text-dark mb-0">{d.tipo}</p>
                                <p className="small text-secondary mb-0">Suministro General</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 small fw-bold text-dark">{d.cantidad} Unid.</td>
                          <td className="px-4 py-3 small text-secondary">Reciente</td>
                          <td className="px-4 py-3">
                            <div className="d-flex align-items-center gap-2">
                              <div className="bg-primary rounded-circle" style={{ width: '8px', height: '8px' }}></div>
                              <span className="small fw-bold text-primary">{d.origen}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-end">
                            <button
                              onClick={() => eliminarDonacion(d.id)}
                              className="btn btn-link text-secondary hover-text-danger p-0"
                            >
                              <span className="material-symbols-outlined">delete</span>
                            </button>
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

        {/* Right Column (Panels) */}
        <div className="col-12 col-xl-3">
          <div className="d-flex flex-column gap-4">
            {/* Critical Stock Panel */}
            <div className="admin-card border-danger bg-danger-subtle p-4 position-relative overflow-hidden">
              <span className="material-symbols-outlined position-absolute top-0 end-0 p-3 opacity-10" style={{ fontSize: '4rem' }}>warning</span>
              <h3 className="h6 fw-bold text-danger mb-3 d-flex align-items-center gap-2">
                <span className="material-symbols-outlined">emergency</span>
                Alertas de Stock
              </h3>
              <div className="d-flex flex-column gap-3">
                <div className="bg-white p-3 rounded-3 shadow-sm border-0">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="small fw-bold text-dark">Agua Potable</span>
                    <span className="text-danger fw-bold small">8%</span>
                  </div>
                  <div className="progress" style={{ height: '4px' }}>
                    <div className="progress-bar bg-danger" style={{ width: '8%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Warehouse Capacity */}
            <div className="admin-card bg-primary text-white border-0">
              <h3 className="small fw-bold mb-4 opacity-75 text-uppercase">Ocupación Almacén</h3>
              <div className="d-flex justify-content-center mb-4">
                <div className="rounded-circle border border-5 border-primary-subtle d-flex align-items-center justify-content-center" style={{ width: '120px', height: '120px' }}>
                  <h4 className="mb-0 fw-bold">74%</h4>
                </div>
              </div>
              <div className="row text-center g-0">
                <div className="col-6 border-end border-white border-opacity-10">
                  <p className="small mb-0 opacity-50">LIBRE</p>
                  <p className="fw-bold mb-0">260 m²</p>
                </div>
                <div className="col-6">
                  <p className="small mb-0 opacity-50">USADO</p>
                  <p className="fw-bold mb-0">740 m²</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Registro Modal */}
      <div className="modal fade" id="registroModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '1.5rem' }}>
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-bold text-primary">Nueva Donación</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body p-4">
                <div className="mb-3">
                  <label className="form-label small fw-bold text-secondary text-uppercase">Categoría</label>
                  <input
                    type="text"
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleChange}
                    required
                    placeholder="Ej: Alimentos No Perecibles"
                    className="form-control form-control-lg bg-light border-0"
                    style={{ borderRadius: '0.75rem' }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-bold text-secondary text-uppercase">Cantidad</label>
                  <input
                    type="number"
                    name="cantidad"
                    value={formData.cantidad}
                    onChange={handleChange}
                    required
                    placeholder="0"
                    className="form-control form-control-lg bg-light border-0"
                    style={{ borderRadius: '0.75rem' }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-bold text-secondary text-uppercase">Donante</label>
                  <input
                    type="text"
                    name="nombreDonante"
                    value={formData.nombreDonante}
                    onChange={handleChange}
                    required
                    placeholder="Ej: Particular / Empresa"
                    className="form-control form-control-lg bg-light border-0"
                    style={{ borderRadius: '0.75rem' }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-bold text-secondary text-uppercase">Descripción</label>
                  <input
                    type="text"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    required
                    placeholder="Ej: Cajas de comida"
                    className="form-control form-control-lg bg-light border-0"
                    style={{ borderRadius: '0.75rem' }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-bold text-secondary text-uppercase">Comuna</label>
                  <input
                    type="text"
                    name="comuna"
                    value={formData.comuna}
                    onChange={handleChange}
                    required
                    placeholder="Ej: Santiago"
                    className="form-control form-control-lg bg-light border-0"
                    style={{ borderRadius: '0.75rem' }}
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label small fw-bold text-secondary text-uppercase">Dirección de Retiro</label>
                  <input
                    type="text"
                    name="direccionRetiro"
                    value={formData.direccionRetiro}
                    onChange={handleChange}
                    required
                    placeholder="Ej: Av Central 123"
                    className="form-control form-control-lg bg-light border-0"
                    style={{ borderRadius: '0.75rem' }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 fw-bold shadow-sm"
                  style={{ borderRadius: '0.75rem' }}
                  disabled={loading}
                >
                  {loading ? 'Procesando...' : 'Registrar Ingreso'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .hover-text-danger:hover { color: #dc3545!important; }
        .modal-backdrop.show { opacity: 0.2; }
      `}</style>
    </div>
  );
}
