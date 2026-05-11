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

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

function MainLayout() {
  return (
    <div className="App flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <div className="flex-1 pt-[72px] md:pt-0 md:ml-64 w-full max-w-[100vw] overflow-x-hidden">
        <div className="w-full h-full">
          <Routes>
            <Route path="/" element={<PanelControlGlobal />} />
            <Route path="/mapa" element={<MapaNecesidades />} />
            <Route path="/registro" element={<RegistroDonaciones />} />
            <Route path="/reportes" element={<ReportesTerreno />} />
            <Route path="/perfil" element={<PerfilUsuario />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registro-usuario" element={<RegistroUsuario />} />
          
          {/* Rutas protegidas bajo MainLayout */}
          <Route path="/*" element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
