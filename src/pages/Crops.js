import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { sharedPageStyles } from '../styles/sharedStyles';

export default function Crops() {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => { fetchCrops(); }, []);

  const fetchCrops = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/crops/all', { withCredentials: true });
      setCrops(res.data.crops || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteCrop = async (id) => {
    if (!window.confirm('Permanently delete this crop?')) return;
    setDeletingId(id);
    try {
      await axios.delete(`http://localhost:5000/api/admin/crop/${id}`, { withCredentials: true });
      setCrops(crops.filter(c => c._id !== id));
    } catch (err) {
      alert('Failed to delete crop');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <style>{sharedPageStyles + `
        .ag-price-cell {
          font-variant-numeric: tabular-nums;
          font-weight: 500;
          color: var(--brown-mid);
        }
        .ag-price-cell::before { content: '₹'; font-size: 11px; opacity: 0.7; margin-right: 2px; }
        .ag-qty-pill {
          display: inline-flex; align-items: center; gap: 4px;
          background: var(--cream); border: 1px solid var(--cream-deep);
          border-radius: 100px; padding: 3px 10px;
          font-size: 12px; color: var(--brown-mid); font-weight: 500;
        }
      `}</style>

      <div className="ag-layout">
        <Sidebar />
        <div className="ag-main">
          <Navbar />
          <div className="ag-content">

            <div className="ag-page-header">
              <div className="ag-page-eyebrow">Listings Management</div>
              <h1 className="ag-page-title">Manage Crops</h1>
              <p className="ag-page-sub">Oversee all crop listings across the platform</p>
              <div className="ag-page-rule">
                <div className="ag-pr-line" />
                <div className="ag-pr-diamond" />
                <div className="ag-pr-line-r" />
              </div>
            </div>

            <div className="ag-table-card">
              <div className="ag-table-toolbar">
                <div className="ag-table-toolbar-left">
                  <span className="ag-toolbar-title">🌱 Crop Listings</span>
                  <span className="ag-table-count">{crops.length} listings</span>
                </div>
              </div>

              {loading ? (
                <div className="ag-loading">
                  <div className="ag-loading-ring" />
                  <div className="ag-loading-text">Fetching crop listings…</div>
                </div>
              ) : crops.length === 0 ? (
                <div className="ag-empty">No crop listings found.</div>
              ) : (
                <div className="ag-table-wrap">
                  <table className="ag-table">
                    <thead>
                      <tr>
                        <th>Crop Name</th>
                        <th>Farmer</th>
                        <th>Price (₹/kg)</th>
                        <th>Quantity</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {crops.map(crop => (
                        <tr key={crop._id}>
                          <td>
                            <div className="ag-avatar-cell">
                              <div className="ag-avatar" style={{ background: '#e8f5ee', color: '#2a7a4f', border: '1px solid rgba(58,138,92,0.2)' }}>
                                🌱
                              </div>
                              <span className="ag-cell-name">{crop.name}</span>
                            </div>
                          </td>
                          <td>
                            <div className="ag-avatar-cell">
                              <div className="ag-avatar">
                                {(crop.farmerId?.name || 'U').charAt(0).toUpperCase()}
                              </div>
                              <span>{crop.farmerId?.name || 'Unknown'}</span>
                            </div>
                          </td>
                          <td><span className="ag-price-cell">{crop.price}</span></td>
                          <td><span className="ag-qty-pill">⚖ {crop.quantity} kg</span></td>
                          <td>
                            <button
                              className="ag-btn-delete"
                              onClick={() => deleteCrop(crop._id)}
                              disabled={deletingId === crop._id}
                            >
                              {deletingId === crop._id ? '…' : '✕'} Delete
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