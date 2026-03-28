import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,400&family=Jost:wght@300;400;500;600&display=swap');

        :root {
          --gold: #c9972c; --gold-light: #e8c46a; --gold-pale: #f5e9c8;
          --cream: #fdf8f0; --cream-deep: #f0e4c8;
          --brown-deep: #3b2a14; --brown-mid: #6b4c26;
          --ink: #2a1f10; --muted: #9e8568;
        }

        .ag-navbar {
          height: 68px;
          background: #fff;
          border-bottom: 1px solid var(--cream-deep);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 32px;
          position: sticky;
          top: 0;
          z-index: 50;
          font-family: 'Jost', sans-serif;
          box-shadow: 0 1px 12px rgba(107,76,38,0.06);
        }

        /* Thin gold top line */
        .ag-navbar::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(to right, transparent, var(--gold) 30%, var(--gold-light) 60%, transparent);
          opacity: 0.6;
        }

        .ag-nb-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .ag-nb-page-indicator {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--muted);
          font-weight: 500;
        }
        .ag-nb-breadcrumb-dot {
          width: 4px; height: 4px;
          background: var(--gold-light);
          border-radius: 50%;
        }

        .ag-nb-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .ag-nb-user {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .ag-nb-avatar {
          width: 34px; height: 34px;
          background: linear-gradient(145deg, var(--gold), #8a5f18);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px;
          font-weight: 600;
          color: #fff;
          font-family: 'Jost', sans-serif;
          box-shadow: 0 2px 8px rgba(201,151,44,0.3);
          flex-shrink: 0;
        }
        .ag-nb-user-info {}
        .ag-nb-user-name {
          font-size: 13px;
          font-weight: 500;
          color: var(--ink);
          line-height: 1.2;
        }
        .ag-nb-user-role {
          font-size: 10.5px;
          color: var(--muted);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: 400;
        }

        .ag-nb-divider {
          width: 1px;
          height: 28px;
          background: var(--cream-deep);
        }

        .ag-nb-logout {
          display: flex;
          align-items: center;
          gap: 7px;
          background: transparent;
          border: 1.5px solid var(--cream-deep);
          border-radius: 8px;
          padding: 8px 16px;
          font-size: 12.5px;
          font-weight: 500;
          color: var(--brown-mid);
          font-family: 'Jost', sans-serif;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, color 0.2s, box-shadow 0.2s;
        }
        .ag-nb-logout:hover {
          background: #fff5f5;
          border-color: rgba(200,80,60,0.3);
          color: #c0522a;
          box-shadow: 0 2px 8px rgba(200,80,60,0.08);
        }

        .ag-nb-time {
          font-size: 11.5px;
          color: var(--muted);
          font-weight: 300;
          font-variant-numeric: tabular-nums;
        }
      `}</style>

      <nav className="ag-navbar">
        <div className="ag-nb-left">
          <div className="ag-nb-page-indicator">
            <span>AgriManage</span>
            <div className="ag-nb-breadcrumb-dot" />
            <span>Admin</span>
          </div>
        </div>

        <div className="ag-nb-right">
          <div className="ag-nb-user">
            <div className="ag-nb-avatar">
              {user?.name?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            <div className="ag-nb-user-info">
              <div className="ag-nb-user-name">{user?.name || 'Admin'}</div>
              <div className="ag-nb-user-role">Administrator</div>
            </div>
          </div>

          <div className="ag-nb-divider" />

          <button className="ag-nb-logout" onClick={logout}>
            ↩ Sign Out
          </button>
        </div>
      </nav>
    </>
  );
}