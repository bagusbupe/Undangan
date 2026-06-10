import { Navigate } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';

export default function ProtectedRoute({ children }) {
  const { admin, loading } = useAdmin();

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (!admin) {
    return <Navigate to="/admin/login" />;
  }

  return children;
}
