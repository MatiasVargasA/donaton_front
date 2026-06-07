import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../AuthContext';
import { apiDonaciones } from '../../../api';
import toast from 'react-hot-toast';

export default function NuevaDonacion() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
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

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

      const response = await apiDonaciones.post('/donaciones', payload);
      if (response.status === 200 || response.status === 201) {
        toast.success('Donación registrada correctamente');
        setFormData({ categoria: '', cantidad: '', descripcion: '', nombreDonante: '', direccionRetiro: '', comuna: '' });

        // Si es logística, lo mandamos de vuelta a ver las donaciones
        if (!isDonor) {
          navigate('/registro');
        } else {
          navigate('/mis-donaciones');
        }
      } else {
        toast.error('Error al registrar donación');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Error de conexión con el servicio de donaciones');
    } finally {
      setLoading(false);
    }
  };

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

        <div className="mb-4 text-center text-md-start">
          <h2 className="display-6 fw-bold mb-1 text-dark">Hacer una Donación</h2>
          <p className="text-secondary mb-0">Selecciona la categoría de ayuda y registra la cantidad de tu aporte solidario.</p>
        </div>

        <div className="row g-4">
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

          <div className="col-12 col-lg-5">
            <div className="card border-0 shadow-sm p-4 bg-white rounded-4 h-100 d-flex flex-column justify-content-between">
              <div>
                <h4 className="fw-bold mb-3 text-dark text-uppercase small tracking-wider">2. Detalles del Aporte</h4>

                <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
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
                  {isDonor
                    ? 'Cada donación completada puede ser rastreada en tiempo real desde tu pestaña de "Mis Donaciones".'
                    : 'La donación quedará en estado PENDIENTE para ser validada por la Municipalidad.'}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .hover-translate { transition: all 0.25s ease-in-out; }
        .hover-translate:hover { transform: translateY(-3px); border-color: var(--bs-primary) !important; }
        .cursor-pointer { cursor: pointer; }
      `}} />
    </div>
  );
}
