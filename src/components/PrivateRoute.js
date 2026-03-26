import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div className="text-center mt-5"><h4>Loading Admin Panel...</h4></div>;
  return user && user.role === 'admin' ? children : <Navigate to="/login" />;
};

export default PrivateRoute;