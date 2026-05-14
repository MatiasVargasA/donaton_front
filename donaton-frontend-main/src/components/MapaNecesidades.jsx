import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { apiNecesidades } from '../api';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function MapaNecesidades() {
  const [necesidades, setNecesidades] = useState([]);
  const [loading, setLoading] = useState(true);

  const position = [-33.4489, -70.6693];

  useEffect(() => {
    cargarNecesidades();
  }, []);

  const cargarNecesidades = async () => {
    try {
      const response = await apiNecesidades.get('/necesidades');
      setNecesidades(response.data);
    } catch (error) {
      console.error("Error cargando necesidades para el mapa", error);
    } finally {
      setLoading(false);
    }
  };

  const getCoords = (ubicacion, index) => {
    const loc = ubicacion?.toLowerCase() || '';
    if (loc.includes('valparaíso')) return [-33.0472, -71.6127 + (index * 0.01)];
    if (loc.includes('concepción')) return [-36.8201, -73.0444 + (index * 0.01)];
    if (loc.includes('la serena')) return [-29.9027, -71.2519 + (index * 0.01)];
    return [-33.4489 + (Math.random() - 0.5) * 0.1, -70.6693 + (Math.random() - 0.5) * 0.1];
  };

  return (
    <div className="d-flex flex-column vh-100 bg-light">
      {/* Header */}
      <header className="bg-white border-bottom z-3 py-3 px-4 shadow-sm flex-shrink-0 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-3">
          <span className="material-symbols-outlined text-primary fs-2">map</span>
          <h2 className="fs-4 fw-bold text-dark mb-0">Geolocalización de Ayuda</h2>
        </div>
        
        <div className="d-flex align-items-center gap-3">
          <Link to="/reportes" className="btn btn-primary fw-bold btn-sm shadow-sm">
             + Nuevo Reporte
          </Link>
          <Link to="/perfil" className="btn btn-light border rounded-circle p-2 d-flex align-items-center justify-content-center text-primary">
             <span className="material-symbols-outlined fs-6">person</span>
          </Link>
        </div>
      </header>

      {/* Map Area */}
      <div className="flex-grow-1 position-relative z-1">
        {loading ? (
          <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-white bg-opacity-75" style={{zIndex: 20}}>
            <div className="text-center">
              <div className="spinner-border text-primary border-4 mb-3" role="status" style={{width: '3rem', height: '3rem'}}></div>
              <p className="text-secondary fw-bold">Cargando Mapa Satelital...</p>
            </div>
          </div>
        ) : (
          <MapContainer 
            center={position} 
            zoom={12} 
            scrollWheelZoom={true} 
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {necesidades.map((n, index) => (
              <Marker key={n.id || index} position={getCoords(n.ubicacion, index)}>
                <Popup className="custom-popup">
                  <div className="p-2">
                    <div className="d-flex align-items-center gap-2 mb-2">
                       <span className="spinner-grow text-warning" style={{width: '8px', height: '8px'}}></span>
                       <span className="small fw-bold text-warning text-uppercase" style={{fontSize: '10px'}}>Necesidad Crítica</span>
                    </div>
                    <h6 className="fw-bold text-dark mb-1">{n.descripcion}</h6>
                    <p className="small text-secondary fw-bold mb-3 text-uppercase d-flex align-items-center gap-1" style={{fontSize: '10px'}}>
                       <span className="material-symbols-outlined" style={{fontSize: '12px'}}>location_on</span> {n.ubicacion}
                    </p>
                    <div className="bg-light p-2 rounded border d-flex justify-content-between align-items-center">
                       <span className="fw-bold text-secondary text-uppercase" style={{fontSize: '9px'}}>Requerido</span>
                       <span className="fw-bold text-primary">{n.cantidadNecesaria}</span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}

        {/* Legend / Status Overlay */}
        <div className="position-absolute bottom-0 start-0 m-4 z-3 bg-white bg-opacity-75 p-4 rounded shadow-lg border" style={{backdropFilter: 'blur(10px)', maxWidth: '280px', zIndex: 1000}}>
          <div className="d-flex align-items-center gap-3 mb-3">
             <div className="bg-primary text-white rounded d-flex align-items-center justify-content-center" style={{width: '40px', height: '40px'}}>
                <span className="material-symbols-outlined fs-5">insights</span>
             </div>
             <div>
                <h6 className="fw-bold text-dark mb-0">Resumen Terreno</h6>
                <p className="small text-secondary fw-bold mb-0" style={{fontSize: '10px'}}>Datos en tiempo real</p>
             </div>
          </div>
          <div className="d-flex flex-column gap-2">
             <div className="d-flex justify-content-between align-items-center">
                <span className="small fw-medium text-secondary">Total Necesidades</span>
                <span className="badge bg-light text-dark border px-2 py-1">{necesidades.length}</span>
             </div>
             <div className="d-flex justify-content-between align-items-center">
                <span className="small fw-medium text-secondary">Zonas Activas</span>
                <span className="badge bg-warning bg-opacity-25 text-warning text-uppercase px-2 py-1" style={{fontSize: '10px'}}>Alertas</span>
             </div>
          </div>
        </div>
      </div>

      <style>{`
        .leaflet-container {
          filter: grayscale(0.2) contrast(1.1);
        }
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 1rem;
          padding: 0;
          overflow: hidden;
          box-shadow: 0 .5rem 1rem rgba(0,0,0,.15);
        }
        .custom-popup .leaflet-popup-content {
          margin: 0;
          width: 200px !important;
        }
      `}</style>
    </div>
  );
}
