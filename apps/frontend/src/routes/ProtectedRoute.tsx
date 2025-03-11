import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router';
import { AuthContext } from '../context/AuthContext';

export default function ProtectedRoute() {
  const { token } = useContext(AuthContext)!;
  return token ? <Outlet /> : <Navigate to="/login" />;
}
