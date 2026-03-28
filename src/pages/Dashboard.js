import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const statCards = [
  { key: 'farmers', label: 'Total Farmers', icon: '👨‍🌾', color: '#c9972c', bg: '#f5e9c8' },
  { key: 'buyers',  label: 'Total Buyers',  icon: '🛍️', color: '#7c5c9e', bg: '#ede5f5' },
  { key: 'crops',   label: 'Total Crops',   icon: '🌱', color: '#3a8a5c', bg: '#e0f2ea' },
  { key: 'orders',  label: 'Total Orders',  icon: '📦', color: '#b05a20', bg: '#fce8d8' },
];

export default function Dashboard() {
  const [stats, setStats] = useState({ farmers: 0, buyers: 0, crops: 0, orders: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    fetchStats();
    setTimeout(() => setMounted(true), 60);
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/stats', { withCredentials: true });
      if (res.data.success) setStats(res.data.stats);
    } catch (err) {
      console.error('Failed to load stats');
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400&family=Jost:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --gold: #c9972c; --gold-light: #e8c46a; --gold-pale: #f5e9c8;
          --cream: #fdf8f0; --cream-deep: #f0e4c8;
          --brown-deep: #3b2a14; --brown-mid: #6b4c26; --brown-light: #a07840;
          --ink: #2a1f10; --muted: #9e8568;
        }
        body { background: var(--cream); }

        .ag-layout { display: flex; min-height: 100vh; font-family: 'Jost', sans-serif; }
        .ag-main { margin-left: 260px; flex: 1; min-height: 100vh; background: var(--cream); }
        .ag-content { padding: 36px 40px; }

        /* Page header */
        .ag-page-header { margin-bottom: 36px; }
        .ag-page-eyebrow {
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--gold);
          font-weight: 500;
          margin-bottom: 8px;
        }
        .ag-page-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px;
          font-weight: 700;
          color: var(--brown-deep);
          line-height: 1.1;
          margin-bottom: 6px;
        }
        .ag-page-sub { font-size: 14px; color: var(--muted); font-weight: 300; }
        .ag-page-rule {
          display: flex; align-items: center; gap: 12px; margin-top: 20px;
        }
        .ag-pr-line { width: 40px; height: 1px; background: linear-gradient(to right, var(--gold), transparent); }
        .ag-pr-diamond { width: 5px; height: 5px; background: var(--gold); transform: rotate(45deg); flex-shrink: 0; }
        .ag-pr-line-r { flex: 1; height: 1px; background: var(--cream-deep); }

        /* Stat cards */
        .ag-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 36px;
        }
        @media (max-width: 1100px) { .ag-stats-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .ag-stats-grid { grid-template-columns: 1fr; } }

        .ag-stat-card {
          background: #fff;
          border-radius: 14px;
          padding: 24px;
          border: 1px solid var(--cream-deep);
          box-shadow: 0 2px 12px rgba(107,76,38,0.06);
          display: flex;
          flex-direction: column;
          gap: 14px;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.5s ease, transform 0.5s ease, box-shadow 0.2s;
        }
        .ag-stat-card.visible { opacity: 1; transform: translateY(0); }
        .ag-stat-card:hover {
          box-shadow: 0 6px 24px rgba(107,76,38,0.1);
          transform: translateY(-2px);
        }
        .ag-stat-card:nth-child(1) { transition-delay: 0.05s; }
        .ag-stat-card:nth-child(2) { transition-delay: 0.12s; }
        .ag-stat-card:nth-child(3) { transition-delay: 0.19s; }
        .ag-stat-card:nth-child(4) { transition-delay: 0.26s; }

        .ag-stat-top { display: flex; align-items: center; justify-content: space-between; }
        .ag-stat-icon {
          width: 44px; height: 44px;
          border-radius: 11px;
          display: flex; align-items: center; justify-content: center;
          font-size: 20px;
        }
        .ag-stat-badge {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
          background: var(--cream);
          border-radius: 100px;
          padding: 3px 10px;
          border: 1px solid var(--cream-deep);
        }
        .ag-stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 48px;
          font-weight: 700;
          line-height: 1;
          color: var(--brown-deep);
          letter-spacing: -0.02em;
        }
        .ag-stat-label {
          font-size: 12.5px;
          color: var(--muted);
          font-weight: 400;
          letter-spacing: 0.03em;
        }
        .ag-stat-bar-track {
          height: 3px;
          background: var(--cream-deep);
          border-radius: 99px;
          overflow: hidden;
        }
        .ag-stat-bar-fill {
          height: 100%;
          border-radius: 99px;
          width: 0;
          transition: width 1.2s cubic-bezier(0.22,1,0.36,1) 0.4s;
        }
        .ag-stat-card.visible .ag-stat-bar-fill { width: 70%; }

        /* Summary row */
        .ag-summary-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        @media (max-width: 800px) { .ag-summary-row { grid-template-columns: 1fr; } }

        .ag-card {
          background: #fff;
          border-radius: 14px;
          border: 1px solid var(--cream-deep);
          box-shadow: 0 2px 12px rgba(107,76,38,0.06);
          overflow: hidden;
        }
        .ag-card-header {
          padding: 18px 24px;
          border-bottom: 1px solid var(--cream-deep);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .ag-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-weight: 600;
          color: var(--brown-deep);
        }
        .ag-card-tag {
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--gold);
          font-weight: 500;
          background: var(--gold-pale);
          padding: 3px 10px;
          border-radius: 100px;
          border: 1px solid rgba(201,151,44,0.25);
        }
        .ag-card-body { padding: 20px 24px; }

        .ag-quick-list { display: flex; flex-direction: column; gap: 12px; }
        .ag-quick-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid var(--cream-deep);
        }
        .ag-quick-item:last-child { border-bottom: none; }
        .ag-quick-left { display: flex; align-items: center; gap: 10px; }
        .ag-quick-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .ag-quick-name { font-size: 13.5px; font-weight: 400; color: var(--ink); }
        .ag-quick-val {
          font-size: 13px;
          font-weight: 500;
          color: var(--brown-mid);
          font-variant-numeric: tabular-nums;
        }
      `}</style>

      <div className="ag-layout">
        <Sidebar />
        <div className="ag-main">
          <Navbar />
          <div className="ag-content">

            {/* Header */}
            <div className="ag-page-header">
              <div className="ag-page-eyebrow">Overview</div>
              <h1 className="ag-page-title">Admin Dashboard</h1>
              <p className="ag-page-sub">Monitor and manage the entire AgriManage platform</p>
              <div className="ag-page-rule">
                <div className="ag-pr-line" />
                <div className="ag-pr-diamond" />
                <div className="ag-pr-line-r" />
              </div>
            </div>

            {/* Stats */}
            <div className="ag-stats-grid">
              {statCards.map((s) => (
                <div key={s.key} className={`ag-stat-card${mounted ? ' visible' : ''}`}>
                  <div className="ag-stat-top">
                    <div className="ag-stat-icon" style={{ background: s.bg }}>
                      {s.icon}
                    </div>
                    <span className="ag-stat-badge">Active</span>
                  </div>
                  <div className="ag-stat-num" style={{ color: s.color }}>
                    {stats[s.key]}
                  </div>
                  <div className="ag-stat-label">{s.label}</div>
                  <div className="ag-stat-bar-track">
                    <div className="ag-stat-bar-fill" style={{ background: s.color }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Summary cards */}
            <div className="ag-summary-row">
              <div className="ag-card">
                <div className="ag-card-header">
                  <div className="ag-card-title">Platform Summary</div>
                  <span className="ag-card-tag">Live</span>
                </div>
                <div className="ag-card-body">
                  <div className="ag-quick-list">
                    {[
                      { label: 'Total Users', val: stats.farmers + stats.buyers, dot: '#c9972c' },
                      { label: 'Active Listings', val: stats.crops, dot: '#3a8a5c' },
                      { label: 'Orders Placed', val: stats.orders, dot: '#b05a20' },
                      { label: 'Avg Orders/Farmer', val: stats.farmers ? (stats.orders / stats.farmers).toFixed(1) : 0, dot: '#7c5c9e' },
                    ].map((r) => (
                      <div className="ag-quick-item" key={r.label}>
                        <div className="ag-quick-left">
                          <div className="ag-quick-dot" style={{ background: r.dot }} />
                          <span className="ag-quick-name">{r.label}</span>
                        </div>
                        <span className="ag-quick-val">{r.val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="ag-card">
                <div className="ag-card-header">
                  <div className="ag-card-title">Quick Navigation</div>
                  <span className="ag-card-tag">Shortcuts</span>
                </div>
                <div className="ag-card-body">
                  <div className="ag-quick-list">
                    {[
                      { label: 'Manage Farmers', href: '/farmers', icon: '👨‍🌾' },
                      { label: 'Manage Buyers', href: '/buyers', icon: '🛍️' },
                      { label: 'View All Crops', href: '/crops', icon: '🌱' },
                      { label: 'Review Orders', href: '/orders', icon: '📦' },
                    ].map((r) => (
                      <a href={r.href} key={r.label} style={{ textDecoration: 'none' }}>
                        <div className="ag-quick-item" style={{ cursor: 'pointer' }}>
                          <div className="ag-quick-left">
                            <span style={{ fontSize: 16 }}>{r.icon}</span>
                            <span className="ag-quick-name">{r.label}</span>
                          </div>
                          <span style={{ color: 'var(--gold)', fontSize: 14 }}>→</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}