import React, { useState, useEffect } from 'react';
import { apiDonaciones } from '../api';
import toast from 'react-hot-toast';

export default function RegistroDonaciones() {
  const [formData, setFormData] = useState({
    tipo: '',
    cantidad: '',
    origen: ''
  });

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
    cargarDonaciones();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await apiDonaciones.post('/donaciones', formData);
      if (response.status === 200 || response.status === 201) {
        toast.success('Donación registrada correctamente');
        setFormData({ tipo: '', cantidad: '', origen: '' });
        cargarDonaciones();
      } else {
        toast.error('Error al registrar donación');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error de conexión con el servicio de donaciones');
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

  return (
    <div className="container-fluid p-0 bg-light min-vh-100">
      <div className="bg-primary text-white py-5 px-4 mb-4 shadow">
        <div className="container d-flex align-items-center gap-4">
          <div className="bg-white bg-opacity-25 rounded d-flex align-items-center justify-content-center" style={{ width: '64px', height: '64px' }}>
            <span className="material-symbols-outlined fs-1">inventory</span>
          </div>
          <div>
            <h1 className="display-5 fw-bold mb-0">Gestión de Inventario</h1>
            <p className="fs-5 text-white-50 mb-0">Registra el ingreso de ayuda humanitaria al sistema.</p>
          </div>
        </div>
      </div>

      <div className="container py-4">
        <div className="row g-4">
          {/* Form Column */}
          <div className="col-lg-5">
            <form onSubmit={handleSubmit} className="card shadow-sm border-0 p-4 sticky-top" style={{ top: '20px' }}>
              <h4 className="fw-bold text-dark mb-4">Nueva Donación</h4>
              
              <div className="mb-3">
                <label className="form-label small fw-bold text-secondary text-uppercase">Tipo de Ayuda</label>
                <input
                  type="text"
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                  required
                  placeholder="Ej: Alimentos No Perecibles"
                  className="form-control form-control-lg bg-light"
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold text-secondary text-uppercase">Cantidad (Unidades)</label>
                <input
                  type="number"
                  name="cantidad"
                  value={formData.cantidad}
                  onChange={handleChange}
                  required
                  placeholder="0"
                  className="form-control form-control-lg bg-light"
                />
              </div>

              <div className="mb-4">
                <label className="form-label small fw-bold text-secondary text-uppercase">Institución de Origen</label>
                <input
                  type="text"
                  name="origen"
                  value={formData.origen}
                  onChange={handleChange}
                  required
                  placeholder="Ej: Banco de Alimentos"
                  className="form-control form-control-lg bg-light"
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="btn btn-primary btn-lg w-100 fw-bold"
              >
                {loading ? 'Procesando...' : 'Registrar Ingreso'}
              </button>
            </form>
          </div>

          {/* List Column */}
          <div className="col-lg-7">
            <h4 className="fw-bold text-dark mb-4 d-flex align-items-center gap-2">
              <span className="material-symbols-outlined text-primary">list_alt</span>
              Últimos Ingresos
            </h4>
            
            <div className="d-flex flex-column gap-3">
              {donaciones.length === 0 ? (
                <div className="card border-0 shadow-sm p-5 text-center bg-white border border-secondary border-opacity-25 border-dashed">
                  <p className="text-secondary mb-0">No hay registros de donaciones aún.</p>
                </div>
              ) : (
                donaciones.map((d) => (
                  <div key={d.id} className="card border-0 shadow-sm p-3 hover-shadow transition">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-3">
                        <div className="bg-primary bg-opacity-10 text-primary rounded d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                          <span className="material-symbols-outlined">package_2</span>
                        </div>
                        <div>
                          <p className="fw-bold text-dark mb-0">{d.tipo}</p>
                          <p className="small text-secondary mb-0">{d.origen}</p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-4">
                        <div className="text-end">
                          <p className="fs-4 fw-bold text-primary mb-0">{d.cantidad}</p>
                          <p className="small text-secondary text-uppercase fw-bold mb-0" style={{ fontSize: '10px' }}>Unid.</p>
                        </div>
                        <button 
                          onClick={() => eliminarDonacion(d.id)}
                          className="btn btn-link text-secondary hover-text-danger p-0"
                        >
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .hover-shadow:hover { box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important; }
        .hover-text-danger:hover { color: #dc3545!important; }
      `}</style>
    </div>
  );
}
