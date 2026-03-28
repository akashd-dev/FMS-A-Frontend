import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/',         icon: '📊', label: 'Dashboard'      },
  { to: '/farmers',  icon: '👨‍🌾', label: 'Farmers'        },
  { to: '/buyers',   icon: '🛍️', label: 'Buyers'         },
  { to: '/crops',    icon: '🌱', label: 'Crops'          },
  { to: '/orders',   icon: '📦', label: 'Orders'         },
];

export default function Sidebar() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400&family=Jost:wght@300;400;500;600&display=swap');

        :root {
          --gold: #c9972c; --gold-light: #e8c46a; --gold-pale: #f5e9c8;
          --cream: #fdf8f0; --cream-deep: #f0e4c8;
          --brown-deep: #3b2a14; --brown-mid: #6b4c26; --brown-light: #a07840;
          --ink: #2a1f10; --muted: #9e8568;
        }

        .ag-sidebar {
          width: 260px;
          min-height: 100vh;
          background: var(--brown-deep);
          display: flex;
          flex-direction: column;
          position: fixed;
          left: 0; top: 0;
          z-index: 100;
          font-family: 'Jost', sans-serif;
          overflow: hidden;
        }

        /* Texture overlay */
        .ag-sidebar::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 120% 60% at 50% 0%, rgba(201,151,44,0.18) 0%, transparent 60%),
            radial-gradient(ellipse 80% 40% at 50% 100%, rgba(201,151,44,0.10) 0%, transparent 50%);
          pointer-events: none;
        }

        /* Thin gold left border accent */
        .ag-sidebar::after {
          content: '';
          position: absolute;
          top: 0; right: 0;
          width: 1px; height: 100%;
          background: linear-gradient(to bottom, transparent 5%, rgba(201,151,44,0.3) 30%, rgba(201,151,44,0.3) 70%, transparent 95%);
        }

        .ag-sb-brand {
          padding: 28px 24px 24px;
          position: relative;
          z-index: 1;
          border-bottom: 1px solid rgba(201,151,44,0.15);
        }
        .ag-sb-brand-mark {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 4px;
        }
        .ag-sb-icon {
          width: 36px; height: 36px;
          background: linear-gradient(145deg, var(--gold), #8a5f18);
          border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          font-size: 17px;
          box-shadow: 0 3px 12px rgba(201,151,44,0.35);
          flex-shrink: 0;
        }
        .ag-sb-brand-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.04em;
          line-height: 1;
        }
        .ag-sb-brand-name span { color: var(--gold-light); font-style: italic; }
        .ag-sb-brand-sub {
          font-size: 10.5px;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin-top: 6px;
          font-weight: 400;
        }

        .ag-sb-section-label {
          font-size: 9.5px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(201,151,44,0.45);
          font-weight: 600;
          padding: 24px 24px 10px;
          position: relative;
          z-index: 1;
        }

        .ag-sb-nav {
          flex: 1;
          padding: 0 12px;
          position: relative;
          z-index: 1;
        }

        .ag-sb-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          border-radius: 10px;
          margin-bottom: 3px;
          text-decoration: none;
          color: rgba(255,255,255,0.55);
          font-size: 13.5px;
          font-weight: 400;
          letter-spacing: 0.02em;
          transition: background 0.2s, color 0.2s, transform 0.15s;
          position: relative;
          overflow: hidden;
        }
        .ag-sb-link::before {
          content: '';
          position: absolute;
          left: 0; top: 50%;
          transform: translateY(-50%) scaleY(0);
          width: 3px; height: 60%;
          background: var(--gold);
          border-radius: 0 3px 3px 0;
          transition: transform 0.2s;
        }
        .ag-sb-link:hover {
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.85);
          transform: translateX(2px);
        }
        .ag-sb-link.active {
          background: linear-gradient(135deg, rgba(201,151,44,0.2), rgba(201,151,44,0.08));
          color: var(--gold-light);
          font-weight: 500;
          box-shadow: inset 0 0 0 1px rgba(201,151,44,0.18);
        }
        .ag-sb-link.active::before {
          transform: translateY(-50%) scaleY(1);
        }

        .ag-sb-link-icon {
          font-size: 16px;
          width: 22px;
          text-align: center;
          flex-shrink: 0;
        }

        .ag-sb-footer {
          padding: 20px 24px;
          border-top: 1px solid rgba(201,151,44,0.12);
          position: relative;
          z-index: 1;
        }
        .ag-sb-footer-text {
          font-size: 11px;
          color: rgba(255,255,255,0.2);
          font-weight: 300;
          text-align: center;
          letter-spacing: 0.05em;
        }
        .ag-sb-footer-dot {
          display: inline-block;
          width: 4px; height: 4px;
          background: rgba(201,151,44,0.4);
          border-radius: 50%;
          margin: 0 6px;
          vertical-align: middle;
        }
      `}</style>

      <div className="ag-sidebar">
        {/* Brand */}
        <div className="ag-sb-brand">
          <div className="ag-sb-brand-mark">
            <div className="ag-sb-icon">🌾</div>
            <div className="ag-sb-brand-name">
              Agri<span>Manage</span>
            </div>
          </div>
          <div className="ag-sb-brand-sub">Admin Console</div>
        </div>

        {/* Nav */}
        <div className="ag-sb-section-label">Navigation</div>
        <nav className="ag-sb-nav">
          {navItems.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => `ag-sb-link${isActive ? ' active' : ''}`}
            >
              <span className="ag-sb-link-icon">{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="ag-sb-footer">
          <div className="ag-sb-footer-text">
            Secured <span className="ag-sb-footer-dot" /> Encrypted <span className="ag-sb-footer-dot" /> v2.0
          </div>
        </div>
      </div>
    </>
  );
}