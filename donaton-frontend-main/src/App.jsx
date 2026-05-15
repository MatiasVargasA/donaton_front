import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ReportesTerreno from './components/ReportesTerreno';
import RegistroDonaciones from './components/RegistroDonaciones';
import PanelControlGlobal from './components/PanelControlGlobal';
import MapaNecesidades from './components/MapaNecesidades';
import PerfilUsuario from './components/PerfilUsuario';
import Login from './components/Login';
import RegistroUsuario from './components/RegistroUsuario';
import GestionLogistica from './components/GestionLogistica';
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