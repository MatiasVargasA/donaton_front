import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ReportesTerreno from './features/municipalidad/components/ReportesTerreno';
import RegistroDonaciones from './features/logistica/components/RegistroDonaciones';
import PanelControlGlobal from './features/logistica/components/PanelControlGlobal';
import MapaNecesidades from './features/logistica/components/MapaNecesidades';
import PerfilUsuario from './features/usuarios/components/PerfilUsuario';
import Login from './features/usuarios/components/Login';
import RegistroUsuario from './features/usuarios/components/RegistroUsuario';
import GestionLogistica from './features/logistica/components/GestionLogistica';
import { Toaster } from 'react-hot-toast';
import './App.css';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="d-flex w-100 min-vh-100">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="main-content-wrapper flex-grow-1 w-100 overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<PanelControlGlobal />} />
            <Route path="/mapa" element={<MapaNecesidades />} />
            <Route path="/registro" element={<RegistroDonaciones />} />
            <Route path="/reportes" element={<ReportesTerreno />} />
            <Route path="/logistica" element={<GestionLogistica />} />
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
      <Toaster position="top-right" reverseOrder={false} />
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