import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Sidebar from './components/Sidebar';
import ReportesTerreno from './components/ReportesTerreno';
import RegistroDonaciones from './components/RegistroDonaciones';
import PanelControlGlobal from './components/PanelControlGlobal';
import MapaNecesidades from './components/MapaNecesidades';
import PerfilUsuario from './components/PerfilUsuario';
import Login from './components/Login';
import RegistroUsuario from './components/RegistroUsuario';
import './App.css';

// Componente para manejar la ruta raíz dinámicamente
const RootRoute = () => {
  const { user } = useAuth();
  // Si el usuario está logueado, vamos al panel. Si no, al login.
  return user ? <MainLayout /> : <Navigate to="/login" replace />;
};

function MainLayout() {
  return (
    <div className="App flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <div className="flex-1 md:ml-64 pt-16 md:pt-0">
        <main className="p-4 md:p-8">
          <Routes>
            <Route path="/" element={<PanelControlGlobal />} />
            <Route path="/mapa" element={<MapaNecesidades />} />
            <Route path="/registro" element={<RegistroDonaciones />} />
            <Route path="/reportes" element={<ReportesTerreno />} />
            <Route path="/perfil" element={<PerfilUsuario />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Ruta raíz inteligente */}
          <Route path="/" element={<RootRoute />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/registro-usuario" element={<RegistroUsuario />} />
          
          {/* Rutas protegidas */}
          <Route path="/*" element={<RootRoute />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
