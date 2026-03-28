import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { sharedPageStyles } from '../styles/sharedStyles';

export default function Buyers() {
  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => { fetchBuyers(); }, []);

  const fetchBuyers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/buyers', { withCredentials: true });
      setBuyers(res.data.buyers || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteBuyer = async (id) => {
    if (!window.confirm('Permanently delete this buyer?')) return;
    setDeletingId(id);
    try {
      await axios.delete(`http://localhost:5000/api/admin/user/${id}`, { withCredentials: true });
      setBuyers(buyers.filter(b => b._id !== id));
    } catch (err) {
      alert('Failed to delete buyer');
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
              <h1 className="ag-page-title">Manage Buyers</h1>
              <p className="ag-page-sub">View and administer all registered buyers on the platform</p>
              <div className="ag-page-rule">
                <div className="ag-pr-line" />
                <div className="ag-pr-diamond" />
                <div className="ag-pr-line-r" />
              </div>
            </div>

            <div className="ag-table-card">
              <div className="ag-table-toolbar">
                <div className="ag-table-toolbar-left">
                  <span className="ag-toolbar-title">🛍️ Buyer Registry</span>
                  <span className="ag-table-count">{buyers.length} records</span>
                </div>
              </div>

              {loading ? (
                <div className="ag-loading">
                  <div className="ag-loading-ring" />
                  <div className="ag-loading-text">Fetching buyer records…</div>
                </div>
              ) : buyers.length === 0 ? (
                <div className="ag-empty">No buyers found in the system.</div>
              ) : (
                <div className="ag-table-wrap">
                  <table className="ag-table">
                    <thead>
                      <tr>
                        <th>Buyer</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Location</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {buyers.map(buyer => (
                        <tr key={buyer._id}>
                          <td>
                            <div className="ag-avatar-cell">
                              <div className="ag-avatar">
                                {buyer.name?.charAt(0)?.toUpperCase() || 'B'}
                              </div>
                              <span className="ag-cell-name">{buyer.name}</span>
                            </div>
                          </td>
                          <td><span className="ag-cell-muted">{buyer.email}</span></td>
                          <td>{buyer.phone || '—'}</td>
                          <td>{buyer.location || '—'}</td>
                          <td>
                            <button
                              className="ag-btn-delete"
                              onClick={() => deleteBuyer(buyer._id)}
                              disabled={deletingId === buyer._id}
                            >
                              {deletingId === buyer._id ? '…' : '✕'} Delete
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