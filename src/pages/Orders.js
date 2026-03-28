import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { sharedPageStyles } from '../styles/sharedStyles';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/orders', { withCredentials: true });
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    if (status === 'pending') return 'ag-badge ag-badge-pending';
    if (status === 'completed' || status === 'delivered') return 'ag-badge ag-badge-completed';
    return 'ag-badge ag-badge-cancelled';
  };

  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);

  return (
    <>
      <style>{sharedPageStyles + `
        .ag-orders-summary {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }
        .ag-order-mini-card {
          background: #fff;
          border-radius: 12px;
          border: 1px solid var(--cream-deep);
          padding: 18px 20px;
          box-shadow: 0 1px 6px rgba(107,76,38,0.05);
        }
        .ag-omc-label {
          font-size: 10.5px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--muted);
          font-weight: 500;
          margin-bottom: 8px;
        }
        .ag-omc-val {
          font-family: 'Cormorant Garamond', serif;
          font-size: 30px;
          font-weight: 700;
          color: var(--brown-deep);
          line-height: 1;
        }
        .ag-omc-val.gold { color: var(--gold); }
        .ag-total-cell {
          font-variant-numeric: tabular-nums;
          font-weight: 500;
          color: var(--brown-mid);
        }
      `}</style>

      <div className="ag-layout">
        <Sidebar />
        <div className="ag-main">
          <Navbar />
          <div className="ag-content">

            <div className="ag-page-header">
              <div className="ag-page-eyebrow">Transaction Management</div>
              <h1 className="ag-page-title">All Orders</h1>
              <p className="ag-page-sub">Monitor every transaction across the AgriManage platform</p>
              <div className="ag-page-rule">
                <div className="ag-pr-line" />
                <div className="ag-pr-diamond" />
                <div className="ag-pr-line-r" />
              </div>
            </div>

            {/* Mini summary strip */}
            {!loading && (
              <div className="ag-orders-summary">
                <div className="ag-order-mini-card">
                  <div className="ag-omc-label">Total Orders</div>
                  <div className="ag-omc-val">{orders.length}</div>
                </div>
                <div className="ag-order-mini-card">
                  <div className="ag-omc-label">Pending</div>
                  <div className="ag-omc-val" style={{ color: '#9a6e10' }}>
                    {orders.filter(o => o.status === 'pending').length}
                  </div>
                </div>
                <div className="ag-order-mini-card">
                  <div className="ag-omc-label">Total Revenue</div>
                  <div className="ag-omc-val gold">₹{totalRevenue.toLocaleString('en-IN')}</div>
                </div>
              </div>
            )}

            <div className="ag-table-card">
              <div className="ag-table-toolbar">
                <div className="ag-table-toolbar-left">
                  <span className="ag-toolbar-title">📦 Order Ledger</span>
                  <span className="ag-table-count">{orders.length} orders</span>
                </div>
              </div>

              {loading ? (
                <div className="ag-loading">
                  <div className="ag-loading-ring" />
                  <div className="ag-loading-text">Fetching order records…</div>
                </div>
              ) : orders.length === 0 ? (
                <div className="ag-empty">No orders found in the system.</div>
              ) : (
                <div className="ag-table-wrap">
                  <table className="ag-table">
                    <thead>
                      <tr>
                        <th>Buyer</th>
                        <th>Farmer</th>
                        <th>Crop</th>
                        <th>Quantity</th>
                        <th>Total (₹)</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(order => (
                        <tr key={order._id}>
                          <td>
                            <div className="ag-avatar-cell">
                              <div className="ag-avatar" style={{ background: '#ede5f5', color: '#5c3d8a', border: '1px solid rgba(124,92,158,0.2)' }}>
                                {(order.buyerId?.name || 'B').charAt(0).toUpperCase()}
                              </div>
                              <span className="ag-cell-name">{order.buyerId?.name || '—'}</span>
                            </div>
                          </td>
                          <td>
                            <div className="ag-avatar-cell">
                              <div className="ag-avatar">
                                {(order.farmerId?.name || 'F').charAt(0).toUpperCase()}
                              </div>
                              <span>{order.farmerId?.name || '—'}</span>
                            </div>
                          </td>
                          <td>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                              <span>🌱</span>
                              {order.cropId?.name || '—'}
                            </span>
                          </td>
                          <td>{order.quantity} kg</td>
                          <td>
                            <span className="ag-total-cell">
                              ₹{(order.totalPrice || 0).toLocaleString('en-IN')}
                            </span>
                          </td>
                          <td>
                            <span className={getStatusClass(order.status)}>
                              {order.status || 'pending'}
                            </span>
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