import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function RoleRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const userRole = user.rol || 'USER';

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Redirect based on role if they try to access an unauthorized route
    if (userRole === 'USUARIO' || userRole === 'USER') {
      return <Navigate to="/portal-donante" replace />;
    } else if (userRole === 'LOGISTICA') {
      return <Navigate to="/logistica" replace />;
    } else if (userRole === 'MUNICIPALIDAD') {
      return <Navigate to="/municipalidad" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
}
