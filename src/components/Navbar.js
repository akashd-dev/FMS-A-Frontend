import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark py-3">
      <div className="container-fluid">
        <span className="navbar-brand fw-bold fs-3">🌾 AgriManage - Admin</span>
        <div className="d-flex align-items-center gap-3">
          <span className="text-white">Admin: {user?.name}</span>
          <button className="btn btn-light btn-sm px-4" onClick={logout}>Logout</button>
        </div>
      </div>
    </nav>
  );
}