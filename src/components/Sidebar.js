import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="p-4 text-center border-bottom">
        <h4 className="mb-0">Admin Dashboard</h4>
      </div>
      <NavLink to="/" className="nav-link">📊 Dashboard</NavLink>
      <NavLink to="/farmers" className="nav-link">👨‍🌾 Manage Farmers</NavLink>
      <NavLink to="/buyers" className="nav-link">🛍️ Manage Buyers</NavLink>
      <NavLink to="/crops" className="nav-link">🌱 Manage Crops</NavLink>
      <NavLink to="/orders" className="nav-link">📦 Manage Orders</NavLink>
    </div>
  );
}