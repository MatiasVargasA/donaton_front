import { useState, useEffect } from 'react';
import { apiDonaciones } from '../../../api';

export default function InventarioStock() {
  const [inventario, setInventario] = useState({});
  const [loading, setLoading] = useState(true);

  const cargarInventario = async () => {
    setLoading(true);
    try {
      // Obtenemos las recibidas (y por si acaso las aceptadas si la API no filtra)
      const response = await apiDonaciones.get('/donaciones');
      const recibidas = response.data.filter(d => d.estado === 'RECIBIDA');
      
      // Agrupar por nombre/categoria
      const stockAgrupado = {};
      recibidas.forEach(d => {
        const nombre = d.categoria || d.tipo || 'Suministro General';
        if (!stockAgrupado[nombre]) {
          stockAgrupado[nombre] = 0;
        }
        stockAgrupado[nombre] += d.cantidad || 0;
      });
      
      setInventario(stockAgrupado);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarInventario();
  }, []);

  const getIconForCategory = (cat) => {
    const text = cat.toLowerCase();
    if (text.includes('aliment') || text.includes('agua') || text.includes('comida')) return { icon: 'restaurant', color: 'success' };
    if (text.includes('med') || text.includes('insumo') || text.includes('salud')) return { icon: 'medical_services', color: 'primary' };
    if (text.includes('ropa') || text.includes('abrig') || text.includes('manta')) return { icon: 'checkroom', color: 'warning' };
    return { icon: 'package_2', color: 'info' };
  };

  const items = Object.entries(inventario);

  return (
    <div className="p-3 p-md-4 min-vh-100 bg-light">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 gap-3">
        <div>
          <h2 className="h3 fw-bold text-dark mb-2">Control de Stock</h2>
          <p className="text-secondary mb-0">
            Inventario consolidado de donaciones que se encuentran físicamente en almacén.
          </p>
        </div>
        <button onClick={cargarInventario} className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2 rounded-pill px-3 shadow-sm">
          <span className="material-symbols-outlined small">refresh</span>
          Actualizar
        </button>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="text-secondary mt-3">Calculando stock...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-5 bg-white rounded-4 shadow-sm">
          <span className="material-symbols-outlined text-secondary" style={{ fontSize: '3rem' }}>inventory_2</span>
          <h4 className="mt-3 text-dark">Almacén Vacío</h4>
          <p className="text-secondary">No hay donaciones en estado RECIBIDA.</p>
        </div>
      ) : (
        <div className="row g-4">
          {items.map(([nombre, cantidad], idx) => {
            const { icon, color } = getIconForCategory(nombre);
            return (
              <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={idx}>
                <div className="card border-0 shadow-sm rounded-4 h-100 transition-all hover-translate">
                  <div className="card-body p-4 d-flex flex-column align-items-center text-center position-relative">
                    <div className={`rounded-circle bg-${color}-subtle text-${color} d-flex align-items-center justify-content-center mb-3`} style={{ width: '64px', height: '64px' }}>
                      <span className="material-symbols-outlined fs-2">{icon}</span>
                    </div>
                    <h5 className="fw-bold text-dark mb-1 h6">{nombre}</h5>
                    <p className="small text-secondary mb-3">En bodega principal</p>
                    <div className="mt-auto bg-light rounded-3 w-100 py-2 border">
                      <span className="h4 fw-bold text-dark mb-0">{cantidad}</span>
                      <span className="small text-secondary ms-1">Unid.</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <style>{`
        .hover-translate { transition: transform 0.2s; cursor: default; }
        .hover-translate:hover { transform: translateY(-5px); }
      `}</style>
    </div>
  );
}
