import React, { useState, useEffect } from 'react';
import { apiLogistica, apiNecesidades } from '../api';
import toast from 'react-hot-toast';

export default function GestionLogistica() {
  const [envios, setEnvios] = useState([]);
  const [necesidades, setNecesidades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    destino: '',
    transporte: 'Camión Institucional',
    cantidad: '',
    estado: 'PENDIENTE'
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [resEnvios, resNecesidades] = await Promise.all([
        apiLogistica.get('/logistica'),
        apiNecesidades.get('/necesidades')
      ]);
      setEnvios(resEnvios.data);
      setNecesidades(resNecesidades.data);
    } catch (error) {
      console.error(error);
      toast.error('Error al cargar datos logísticos');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await apiLogistica.post('/logistica', formData);
      if (response.status === 200 || response.status === 201) {
        toast.success('Envío programado correctamente');
        setFormData({
          destino: '',
          transporte: 'Camión Institucional',
          cantidad: '',
          estado: 'PENDIENTE'
        });
        cargarDatos();
      }
    } catch (error) {
      console.error(error);
      toast.error('Error al registrar el envío');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ENTREGADO': return 'bg-success bg-opacity-10 text-success border border-success';
      case 'EN CAMINO': return 'bg-primary bg-opacity-10 text-primary border border-primary';
      default: return 'bg-warning bg-opacity-10 text-warning border border-warning';
    }
  };

  const getStatusIconColor = (status) => {
    switch (status) {
      case 'ENTREGADO': return 'bg-success text-white';
      case 'EN CAMINO': return 'bg-primary text-white';
      default: return 'bg-warning text-dark';
    }
  };

  return (
    <div className="container-fluid p-0 bg-light min-vh-100 pb-5">
      {/* Header Logistics */}
      <div className="bg-dark text-white py-5 px-4 mb-4 shadow">
        <div className="container d-flex align-items-center gap-4">
          <div className="bg-primary rounded d-flex align-items-center justify-content-center shadow" style={{ width: '80px', height: '80px' }}>
            <span className="material-symbols-outlined fs-1">local_shipping</span>
          </div>
          <div>
            <h1 className="display-4 fw-bold mb-1">Gestión Logística</h1>
            <p className="fs-5 text-secondary mb-0">Coordinación de despacho y transporte de ayuda humanitaria.</p>
          </div>
        </div>
      </div>

      <div className="container py-4">
        <div className="row g-4">

          {/* Form Column */}
          <div className="col-lg-4">
            <form onSubmit={handleSubmit} className="card shadow-sm border-0 p-4 sticky-top rounded-4" style={{ top: '20px' }}>
              <h3 className="fw-bold text-dark mb-4">Programar Envío</h3>

              <div className="mb-4">
                <label className="form-label small fw-bold text-secondary text-uppercase tracking-widest">Destino (Reporte Terreno)</label>
                <select
                  name="destino"
                  value={formData.destino}
                  onChange={handleChange}
                  required
                  className="form-select form-select-lg bg-light fw-bold text-dark"
                >
                  <option value="">Seleccione destino...</option>
                  {necesidades.map((n) => (
                    <option key={n.id} value={n.ubicacion}>{n.ubicacion} - {n.descripcion}</option>
                  ))}
                </select>
              </div>

              {formData.destino && (
                <div className="alert alert-primary mb-4 p-3">
                  <p className="fw-bold mb-1">Destino seleccionado:</p>
                  <p className="small mb-0">{formData.destino}</p>
                </div>
              )}

              <div className="mb-4">
                <label className="form-label small fw-bold text-secondary text-uppercase tracking-widest">Medio de Transporte</label>
                <select
                  name="transporte"
                  value={formData.transporte}
                  onChange={handleChange}
                  className="form-select form-select-lg bg-light fw-bold text-dark"
                >
                  <option value="Camión Institucional">Camión Institucional</option>
                  <option value="Vehículo de Rescate">Vehículo de Rescate</option>
                  <option value="Avión de Carga">Avión de Carga</option>
                  <option value="Embarcación">Embarcación</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="form-label small fw-bold text-secondary text-uppercase tracking-widest">Cantidad a Despachar</label>
                <input
                  type="number"
                  name="cantidad"
                  value={formData.cantidad}
                  onChange={handleChange}
                  required
                  placeholder="Ej: 500"
                  className="form-control form-control-lg bg-light fw-bold"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary btn-lg w-100 fw-bold shadow-sm"
              >
                {loading ? 'Procesando...' : 'Iniciar Despacho'}
              </button>
            </form>
          </div>

          {/* Tracking List Column */}
          <div className="col-lg-8">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="fw-bold text-dark d-flex align-items-center gap-2 mb-0">
                <span className="material-symbols-outlined text-primary fs-3">trolley</span>
                Seguimiento de Envíos
              </h2>
              <button onClick={cargarDatos} className="btn btn-light border d-flex align-items-center justify-content-center text-secondary">
                <span className="material-symbols-outlined">refresh</span>
              </button>
            </div>

            <div className="d-flex flex-column gap-4">
              {envios.length === 0 ? (
                <div className="card border-0 shadow-sm p-5 text-center bg-white border border-secondary border-opacity-25 border-dashed rounded-4">
                  <span className="material-symbols-outlined display-1 text-secondary opacity-50 mb-3">package</span>
                  <p className="text-secondary fw-bold fs-5 font-italic mb-0">No hay envíos programados actualmente.</p>
                </div>
              ) : (
                envios.map((e) => (
                  <div key={e.id} className="card border-0 shadow-sm p-4 rounded-4 hover-shadow transition">
                    <div className="row align-items-center">
                      <div className="col-auto">
                        <div className={`rounded d-flex align-items-center justify-content-center shadow-sm ${getStatusIconColor(e.estado)}`} style={{ width: '64px', height: '64px' }}>
                          <span className="material-symbols-outlined fs-2">
                            {e.transporte.includes('Avión') ? 'flight' : e.transporte.includes('Camión') ? 'local_shipping' : 'directions_car'}
                          </span>
                        </div>
                      </div>

                      <div className="col text-center text-md-start mb-3 mb-md-0">
                        <div className="d-flex flex-column flex-md-row align-items-md-center gap-2 mb-1">
                          <h5 className="fw-bold text-dark mb-0">{e.destino}</h5>
                          <span className={`badge rounded-pill ${getStatusColor(e.estado)}`}>
                            {e.estado}
                          </span>
                        </div>
                        <p className="small text-secondary fw-bold text-uppercase mb-0">Vía: {e.transporte}</p>
                      </div>

                      <div className="col-12 col-md-auto d-flex align-items-center justify-content-between justify-content-md-end gap-4 border-top border-md-top-0 border-md-start pt-3 pt-md-0 ps-md-4">
                        <div className="text-center">
                          <p className="fs-3 fw-bold text-primary mb-0">{e.cantidad}</p>
                          <p className="small text-secondary fw-bold text-uppercase mb-0" style={{ fontSize: '10px' }}>Unidades</p>
                        </div>
                        <button className="btn btn-light rounded d-flex align-items-center justify-content-center text-secondary p-2">
                          <span className="material-symbols-outlined">arrow_forward_ios</span>
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
        .hover-shadow:hover { box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important; transform: translateY(-2px); }
        .border-dashed { border-style: dashed !important; }
      `}</style>
    </div>
  );
}
