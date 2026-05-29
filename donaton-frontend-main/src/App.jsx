import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ReportesTerreno from './features/municipalidad/components/ReportesTerreno';
import DonacionesOverview from './features/municipalidad/components/DonacionesOverview';
import RegistroDonaciones from './features/logistica/components/RegistroDonaciones';
import PanelControlGlobal from './features/logistica/components/PanelControlGlobal';
import MapaNecesidades from './features/logistica/components/MapaNecesidades';
import PerfilUsuario from './features/usuarios/components/PerfilUsuario';
import Login from './features/usuarios/components/Login';
import RegistroUsuario from './features/usuarios/components/RegistroUsuario';
import GestionLogistica from './features/logistica/components/GestionLogistica';
import PortalDonante from './features/usuarios/components/PortalDonante';
import MisDonaciones from './features/usuarios/components/MisDonaciones';
import ImpactoSocial from './features/usuarios/components/ImpactoSocial';
import { Toaster } from 'react-hot-toast';
import RoleRoute from './components/RoleRoute';
import './App.css';

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
            <Route path="/" element={<RoleRoute allowedRoles={['ADMIN']}><PanelControlGlobal /></RoleRoute>} />
            <Route path="/mapa" element={<RoleRoute allowedRoles={['ADMIN', 'LOGISTICA', 'MUNICIPALIDAD']}><MapaNecesidades /></RoleRoute>} />
            <Route path="/registro" element={<RoleRoute allowedRoles={['ADMIN', 'LOGISTICA', 'USUARIO', 'USER']}><RegistroDonaciones /></RoleRoute>} />
            <Route path="/reportes" element={<RoleRoute allowedRoles={['ADMIN', 'MUNICIPALIDAD']}><ReportesTerreno /></RoleRoute>} />
            <Route path="/municipalidad" element={<RoleRoute allowedRoles={['ADMIN', 'MUNICIPALIDAD']}><DonacionesOverview /></RoleRoute>} />
            <Route path="/logistica" element={<RoleRoute allowedRoles={['ADMIN', 'LOGISTICA']}><GestionLogistica /></RoleRoute>} />
            <Route path="/perfil" element={<RoleRoute allowedRoles={['ADMIN', 'LOGISTICA', 'MUNICIPALIDAD', 'USUARIO', 'USER']}><PerfilUsuario /></RoleRoute>} />
            <Route path="/portal-donante" element={<RoleRoute allowedRoles={['USUARIO', 'USER']}><PortalDonante /></RoleRoute>} />
            <Route path="/mis-donaciones" element={<RoleRoute allowedRoles={['USUARIO', 'USER']}><MisDonaciones /></RoleRoute>} />
            <Route path="/impacto" element={<RoleRoute allowedRoles={['USUARIO', 'USER']}><ImpactoSocial /></RoleRoute>} />
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
            <RoleRoute>
              <MainLayout />
            </RoleRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;