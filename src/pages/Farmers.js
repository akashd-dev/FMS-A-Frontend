import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { sharedPageStyles } from '../styles/sharedStyles';

export default function Farmers() {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => { fetchFarmers(); }, []);

  const fetchFarmers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/farmers', { withCredentials: true });
      setFarmers(res.data.farmers || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteFarmer = async (id) => {
    if (!window.confirm('Permanently delete this farmer?')) return;
    setDeletingId(id);
    try {
      await axios.delete(`http://localhost:5000/api/admin/user/${id}`, { withCredentials: true });
      setFarmers(farmers.filter(f => f._id !== id));
    } catch (err) {
      alert('Failed to delete farmer');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <style>{sharedPageStyles}</style>
      <div className="ag-layout">
        <Sidebar />
        <div className="ag-main">
          <Navbar />
          <div className="ag-content">

            <div className="ag-page-header">
              <div className="ag-page-eyebrow">User Management</div>
              <h1 className="ag-page-title">Manage Farmers</h1>
              <p className="ag-page-sub">View and administer all registered farmers on the platform</p>
              <div className="ag-page-rule">
                <div className="ag-pr-line" />
                <div className="ag-pr-diamond" />
                <div className="ag-pr-line-r" />
              </div>
            </div>

            <div className="ag-table-card">
              <div className="ag-table-toolbar">
                <div className="ag-table-toolbar-left">
                  <span className="ag-toolbar-title">👨‍🌾 Farmer Registry</span>
                  <span className="ag-table-count">{farmers.length} records</span>
                </div>
              </div>

              {loading ? (
                <div className="ag-loading">
                  <div className="ag-loading-ring" />
                  <div className="ag-loading-text">Fetching farmer records…</div>
                </div>
              ) : farmers.length === 0 ? (
                <div className="ag-empty">No farmers found in the system.</div>
              ) : (
                <div className="ag-table-wrap">
                  <table className="ag-table">
                    <thead>
                      <tr>
                        <th>Farmer</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Location</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {farmers.map(farmer => (
                        <tr key={farmer._id}>
                          <td>
                            <div className="ag-avatar-cell">
                              <div className="ag-avatar">
                                {farmer.name?.charAt(0)?.toUpperCase() || 'F'}
                              </div>
                              <span className="ag-cell-name">{farmer.name}</span>
                            </div>
                          </td>
                          <td><span className="ag-cell-muted">{farmer.email}</span></td>
                          <td>{farmer.phone || '—'}</td>
                          <td>{farmer.location || '—'}</td>
                          <td>
                            <button
                              className="ag-btn-delete"
                              onClick={() => deleteFarmer(farmer._id)}
                              disabled={deletingId === farmer._id}
                            >
                              {deletingId === farmer._id ? '…' : '✕'} Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}