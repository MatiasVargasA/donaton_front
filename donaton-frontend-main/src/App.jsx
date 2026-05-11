import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ReportesTerreno from './components/ReportesTerreno';
import RegistroDonaciones from './components/RegistroDonaciones';
import PanelControlGlobal from './components/PanelControlGlobal';
import MapaNecesidades from './components/MapaNecesidades';
import PerfilUsuario from './components/PerfilUsuario';
import Login from './components/Login';
import { useAuth } from './AuthContext';
import './App.css';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function MainLayout() {
  return (
    <div className="App flex">
      <Sidebar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<PanelControlGlobal />} />
          <Route path="/mapa" element={<MapaNecesidades />} />
          <Route path="/registro" element={<RegistroDonaciones />} />
          <Route path="/reportes" element={<ReportesTerreno />} />
          <Route path="/perfil" element={<PerfilUsuario />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/*" 
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
