
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface AuthGuardProps {
  children: React.ReactNode;
}

const publicRoutes = ['/login', '/signup'];

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = localStorage.getItem('sanamana-user');
  const isPublicRoute = publicRoutes.includes(location.pathname);
  
  useEffect(() => {
    if (!user && !isPublicRoute) {
      navigate('/login');
    } else if (user && isPublicRoute) {
      navigate('/');
    }
  }, [user, navigate, isPublicRoute, location.pathname]);

  if (!user && !isPublicRoute) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
