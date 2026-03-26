import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default function Dashboard() {
  const [stats, setStats] = useState({ farmers: 0, buyers: 0, crops: 0, orders: 0 });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/stats', { withCredentials: true });
      if (res.data.success) setStats(res.data.stats);
    } catch (err) {
      console.error("Failed to load stats");
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div style={{ marginLeft: '270px', width: '100%' }}>
        <Navbar />
        <div className="container mt-4">
          <h2 className="fade-in">Admin Dashboard</h2>
          <p className="text-muted">Monitor and manage the entire platform</p>

          <div className="row g-4 mt-3">
            <div className="col-md-3">
              <div className="card p-4 text-center">
                <h5>👨‍🌾 Total Farmers</h5>
                <h2 className="text-success">{stats.farmers}</h2>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card p-4 text-center">
                <h5>🛍️ Total Buyers</h5>
                <h2 className="text-success">{stats.buyers}</h2>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card p-4 text-center">
                <h5>🌱 Total Crops</h5>
                <h2 className="text-success">{stats.crops}</h2>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card p-4 text-center">
                <h5>📦 Total Orders</h5>
                <h2 className="text-success">{stats.orders}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}