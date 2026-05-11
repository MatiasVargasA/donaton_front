import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { apiNecesidades } from '../api';

// Corregir problema de iconos de Leaflet en React
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

  // Coordenadas base (Santiago de Chile)
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

  // Función para simular coordenadas basadas en el nombre de la ubicación 
  // (En un caso real, esto vendría del backend con lat/lng)
  const getCoords = (ubicacion, index) => {
    const loc = ubicacion?.toLowerCase() || '';
    if (loc.includes('valparaíso')) return [-33.0472, -71.6127 + (index * 0.01)];
    if (loc.includes('concepción')) return [-36.8201, -73.0444 + (index * 0.01)];
    if (loc.includes('la serena')) return [-29.9027, -71.2519 + (index * 0.01)];
    // Por defecto, dispersar alrededor de Santiago
    return [-33.4489 + (Math.random() - 0.5) * 0.1, -70.6693 + (Math.random() - 0.5) * 0.1];
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-body-md">
      
      {/* Header */}
      <header className="bg-white border-b border-slate-200 z-30 h-16 flex justify-between items-center px-6 shrink-0 shadow-sm">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-[#1A4F8B] text-3xl">map</span>
          <h1 className="text-xl font-black text-slate-800 tracking-tight">Geolocalización de Ayuda</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <Link to="/reportes" className="bg-[#1A4F8B] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md hover:bg-blue-800 transition-all">
             + Nuevo Reporte
          </Link>
          <Link to="/perfil" className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-[#1A4F8B] text-xs font-bold border border-slate-200">
             <span className="material-symbols-outlined text-sm">person</span>
          </Link>
        </div>
      </header>

      {/* Map Area */}
      <div className="flex-1 relative z-10">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-20">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 border-4 border-[#1A4F8B] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-slate-500 font-bold">Cargando Mapa Satelital...</p>
            </div>
          </div>
        ) : (
          <MapContainer 
            center={position} 
            zoom={12} 
            scrollWheelZoom={true} 
            style={{ height: '100%', width: '100%' }}
          >
            {/* Capa de Mapa (OpenStreetMap) */}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Marcadores Dinámicos */}
            {necesidades.map((n, index) => (
              <Marker key={n.id || index} position={getCoords(n.ubicacion, index)}>
                <Popup className="custom-popup">
                  <div className="p-2">
                    <div className="flex items-center gap-2 mb-2">
                       <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                       <span className="text-[10px] font-black text-orange-600 uppercase tracking-tighter">Necesidad Crítica</span>
                    </div>
                    <h3 className="font-black text-slate-800 text-sm leading-tight mb-1">{n.descripcion}</h3>
                    <p className="text-[10px] text-slate-500 font-bold mb-3 uppercase flex items-center gap-1">
                       <span className="material-symbols-outlined text-[12px]">location_on</span> {n.ubicacion}
                    </p>
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 flex justify-between items-center">
                       <span className="text-[9px] font-bold text-slate-400 uppercase">Requerido</span>
                       <span className="text-sm font-black text-[#1A4F8B]">{n.cantidadNecesaria}</span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}

        {/* Legend / Status Overlay */}
        <div className="absolute bottom-8 left-8 z-[1000] bg-white/95 backdrop-blur-md p-5 rounded-3xl shadow-2xl border border-white max-w-xs">
          <div className="flex items-center gap-3 mb-4">
             <div className="w-10 h-10 bg-[#1A4F8B] text-white rounded-2xl flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">insights</span>
             </div>
             <div>
                <h4 className="text-sm font-black text-slate-800">Resumen Terreno</h4>
                <p className="text-[10px] text-slate-400 font-bold">Datos en tiempo real</p>
             </div>
          </div>
          <div className="space-y-3">
             <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-slate-600">Total Necesidades</span>
                <span className="bg-slate-100 px-2 py-0.5 rounded-lg text-xs font-black">{necesidades.length}</span>
             </div>
             <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-slate-600">Zonas Activas</span>
                <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-lg text-[10px] font-black uppercase">Alertas</span>
             </div>
          </div>
        </div>
      </div>

      {/* Inline Styles for Leaflet customization */}
      <style>{`
        .leaflet-container {
          filter: grayscale(0.2) contrast(1.1);
        }
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 1.5rem;
          padding: 0;
          overflow: hidden;
          box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
        }
        .custom-popup .leaflet-popup-content {
          margin: 0;
          width: 200px !important;
        }
      `}</style>
    </div>
  );
}
