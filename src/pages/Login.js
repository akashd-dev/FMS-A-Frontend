import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: 'admin@admin.com', password: 'admin123' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    setTimeout(() => setMounted(true), 80);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form, { withCredentials: true });
      if (res.data.success) {
        setUser(res.data.user);
        window.location.href = '/';
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid admin credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Jost:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --gold:        #c9972c;
          --gold-light:  #e8c46a;
          --gold-pale:   #f5e9c8;
          --cream:       #fdf8f0;
          --cream-deep:  #f0e4c8;
          --brown-deep:  #3b2a14;
          --brown-mid:   #6b4c26;
          --brown-light: #a07840;
          --ink:         #2a1f10;
          --muted:       #9e8568;
        }

        .lx-root {
          min-height: 100vh;
          background: var(--cream);
          display: flex;
          align-items: stretch;
          font-family: 'Jost', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .lx-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 15% 10%, rgba(201,151,44,0.10) 0%, transparent 60%),
            radial-gradient(ellipse 60% 80% at 90% 90%, rgba(160,120,64,0.12) 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 70% 20%, rgba(245,233,200,0.6) 0%, transparent 50%);
          pointer-events: none;
          z-index: 0;
        }

        .corner {
          position: absolute;
          width: 160px;
          height: 160px;
          pointer-events: none;
          z-index: 1;
          opacity: 0.22;
        }
        .corner-tl { top: 0; left: 0; }
        .corner-br { bottom: 0; right: 0; transform: rotate(180deg); }

        /* Left panel */
        .lx-left {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 80px 64px;
          position: relative;
          z-index: 2;
          opacity: ${mounted ? 1 : 0};
          transform: ${mounted ? 'translateX(0)' : 'translateX(-24px)'};
          transition: opacity 0.9s ease, transform 0.9s ease;
        }
        @media (max-width: 860px) { .lx-left { display: none; } }

        .lx-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--gold-pale);
          border: 1px solid rgba(201,151,44,0.35);
          border-radius: 100px;
          padding: 6px 16px;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--brown-mid);
          font-weight: 500;
          margin-bottom: 40px;
          width: fit-content;
        }
        .lx-badge::before {
          content: '';
          width: 6px; height: 6px;
          background: var(--gold);
          border-radius: 50%;
          flex-shrink: 0;
        }

        .lx-headline {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(48px, 5.5vw, 78px);
          line-height: 1.0;
          color: var(--brown-deep);
          font-weight: 600;
          margin-bottom: 28px;
          letter-spacing: -0.01em;
        }
        .lx-headline em {
          font-style: italic;
          color: var(--gold);
          font-weight: 400;
        }

        .lx-rule {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 28px;
        }
        .lx-rule-line { width: 48px; height: 1px; background: linear-gradient(to right, var(--gold), transparent); }
        .lx-rule-diamond { width: 6px; height: 6px; background: var(--gold); transform: rotate(45deg); flex-shrink: 0; }
        .lx-rule-line-r { flex: 1; height: 1px; background: linear-gradient(to right, transparent, rgba(201,151,44,0.12)); }

        .lx-desc {
          font-size: 15px;
          color: var(--muted);
          line-height: 1.85;
          max-width: 320px;
          font-weight: 300;
          margin-bottom: 64px;
        }

        .lx-pillars { display: flex; flex-direction: column; gap: 20px; }
        .lx-pillar { display: flex; align-items: flex-start; gap: 16px; }
        .lx-pillar-icon {
          width: 38px; height: 38px;
          background: linear-gradient(135deg, var(--gold-pale), #fff);
          border: 1px solid rgba(201,151,44,0.3);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(201,151,44,0.12);
        }
        .lx-pillar-text strong {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: var(--brown-deep);
          margin-bottom: 2px;
          letter-spacing: 0.02em;
        }
        .lx-pillar-text span { font-size: 12px; color: var(--muted); font-weight: 300; }

        /* Vertical divider */
        .lx-divider {
          width: 1px;
          background: linear-gradient(to bottom, transparent 5%, rgba(201,151,44,0.22) 30%, rgba(201,151,44,0.22) 70%, transparent 95%);
          position: relative;
          z-index: 2;
          flex-shrink: 0;
        }
        @media (max-width: 860px) { .lx-divider { display: none; } }

        /* Right form panel */
        .lx-right {
          width: 460px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 64px 56px;
          position: relative;
          z-index: 2;
          background: rgba(255,252,245,0.65);
          backdrop-filter: blur(6px);
          opacity: ${mounted ? 1 : 0};
          transform: ${mounted ? 'translateY(0)' : 'translateY(18px)'};
          transition: opacity 0.9s ease 0.15s, transform 0.9s ease 0.15s;
        }
        @media (max-width: 860px) {
          .lx-right { width: 100%; padding: 48px 32px; background: rgba(253,248,240,0.85); }
        }

        .lx-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 52px;
        }
        .lx-logo-mark {
          width: 40px; height: 40px;
          background: linear-gradient(145deg, var(--gold), var(--brown-mid));
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 16px rgba(201,151,44,0.3);
          font-size: 18px;
          color: #fff;
        }
        .lx-logo-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          font-weight: 700;
          color: var(--brown-deep);
          letter-spacing: 0.04em;
        }
        .lx-logo-text span { color: var(--gold); }

        .lx-form-eyebrow {
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--gold);
          font-weight: 500;
          margin-bottom: 10px;
        }
        .lx-form-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 40px;
          font-weight: 600;
          color: var(--brown-deep);
          line-height: 1.1;
          margin-bottom: 6px;
        }
        .lx-form-sub {
          font-size: 13px;
          color: var(--muted);
          margin-bottom: 36px;
          font-weight: 300;
          line-height: 1.5;
        }
        .lx-form-sub code {
          font-family: 'Courier New', monospace;
          font-size: 11.5px;
          background: var(--gold-pale);
          color: var(--brown-mid);
          padding: 2px 7px;
          border-radius: 4px;
          border: 1px solid rgba(201,151,44,0.25);
        }

        .form-ornament {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 32px;
        }
        .fo-line { flex: 1; height: 1px; background: var(--cream-deep); }
        .fo-dot { width: 5px; height: 5px; background: var(--gold-light); border-radius: 50%; flex-shrink: 0; }

        .lx-field { margin-bottom: 20px; }
        .lx-label {
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--brown-light);
          font-weight: 500;
          display: block;
          margin-bottom: 9px;
        }
        .lx-input-wrap { position: relative; }
        .lx-input-icon {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 14px;
          color: var(--gold-light);
          pointer-events: none;
          transition: color 0.2s;
        }
        .lx-input {
          width: 100%;
          background: #fff;
          border: 1.5px solid var(--cream-deep);
          border-radius: 10px;
          padding: 15px 15px 15px 44px;
          font-size: 14px;
          color: var(--ink);
          font-family: 'Jost', sans-serif;
          font-weight: 400;
          outline: none;
          transition: border-color 0.25s, box-shadow 0.25s;
          box-shadow: 0 1px 4px rgba(107,76,38,0.05);
        }
        .lx-input::placeholder { color: rgba(158,133,104,0.45); }
        .lx-input:focus {
          border-color: var(--gold);
          box-shadow: 0 0 0 3px rgba(201,151,44,0.12), 0 1px 4px rgba(107,76,38,0.05);
        }
        .lx-input:focus ~ .lx-input-icon { color: var(--gold); }

        .lx-error {
          background: #fff8f5;
          border: 1.5px solid rgba(220,100,60,0.25);
          border-radius: 10px;
          padding: 13px 16px;
          margin-bottom: 20px;
          font-size: 13px;
          color: #c0522a;
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .lx-btn {
          width: 100%;
          background: linear-gradient(135deg, var(--gold) 0%, #a87320 100%);
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 17px;
          font-size: 13px;
          font-weight: 500;
          font-family: 'Jost', sans-serif;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          margin-top: 8px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(201,151,44,0.35), 0 1px 3px rgba(107,76,38,0.15);
          transition: transform 0.15s, box-shadow 0.2s;
        }
        .lx-btn::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s ease;
        }
        .lx-btn:hover:not(:disabled)::before { left: 100%; }
        .lx-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(201,151,44,0.45), 0 1px 3px rgba(107,76,38,0.15);
        }
        .lx-btn:active:not(:disabled) { transform: translateY(0); }
        .lx-btn:disabled { opacity: 0.65; cursor: not-allowed; }

        .lx-spinner {
          display: inline-block;
          width: 14px; height: 14px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: lxspin 0.7s linear infinite;
          vertical-align: middle;
          margin-right: 8px;
        }
        @keyframes lxspin { to { transform: rotate(360deg); } }

        .lx-footer {
          margin-top: 32px;
          text-align: center;
        }
        .lx-footer-inner {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11.5px;
          color: var(--muted);
          font-weight: 300;
        }
        .lx-footer-dot { width: 3px; height: 3px; background: var(--gold-light); border-radius: 50%; flex-shrink: 0; }
      `}</style>

      <div className="lx-root">
        {/* Corner SVG flourishes */}
        <svg className="corner corner-tl" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0 L160 0 L0 160 Z" fill="url(#gg1)" />
          <path d="M20 0 Q0 20 0 40" stroke="#c9972c" strokeWidth="1" fill="none" />
          <path d="M60 0 Q0 60 0 100" stroke="#c9972c" strokeWidth="0.5" fill="none" />
          <defs>
            <linearGradient id="gg1" x1="0" y1="0" x2="160" y2="160">
              <stop offset="0%" stopColor="#c9972c" stopOpacity="0.18"/>
              <stop offset="100%" stopColor="#c9972c" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>
        <svg className="corner corner-br" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0 L160 0 L0 160 Z" fill="url(#gg2)" />
          <path d="M20 0 Q0 20 0 40" stroke="#c9972c" strokeWidth="1" fill="none" />
          <defs>
            <linearGradient id="gg2" x1="0" y1="0" x2="160" y2="160">
              <stop offset="0%" stopColor="#c9972c" stopOpacity="0.14"/>
              <stop offset="100%" stopColor="#c9972c" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>

        {/* Left panel */}
        <div className="lx-left">
          <div className="lx-badge">Admin Portal</div>

          <h1 className="lx-headline">
            Where<br />
            <em>excellence</em><br />
            is managed.
          </h1>

          <div className="lx-rule">
            <div className="lx-rule-line" />
            <div className="lx-rule-diamond" />
            <div className="lx-rule-line-r" />
          </div>

          <p className="lx-desc">
            A refined command centre for those who demand precision, elegance, and complete control over their platform.
          </p>

          <div className="lx-pillars">
            {[
              { icon: '🔐', title: 'Bank-grade Security', sub: 'End-to-end encrypted sessions' },
              { icon: '⚡', title: 'Instant Access', sub: 'Sub-100ms authenticated responses' },
              { icon: '🏛️', title: 'Audit Trails', sub: 'Every action logged and traceable' },
            ].map((p) => (
              <div className="lx-pillar" key={p.title}>
                <div className="lx-pillar-icon">{p.icon}</div>
                <div className="lx-pillar-text">
                  <strong>{p.title}</strong>
                  <span>{p.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lx-divider" />

        {/* Right form panel */}
        <div className="lx-right">
          <div className="lx-logo">
            <div className="lx-logo-mark">✦</div>
            <div className="lx-logo-text">Admin<span>OS</span></div>
          </div>

          <div className="lx-form-eyebrow">Secure Sign In</div>
          <h2 className="lx-form-title">Welcome<br />back.</h2>
          <p className="lx-form-sub">
            Default credentials: <code>admin@admin.com</code>
          </p>

          <div className="form-ornament">
            <div className="fo-line" />
            <div className="fo-dot" />
            <div className="fo-line" />
          </div>

          {error && (
            <div className="lx-error">
              <span>⚠</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="lx-field">
              <label className="lx-label">Email Address</label>
              <div className="lx-input-wrap">
                <input
                  className="lx-input"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <span className="lx-input-icon">✉</span>
              </div>
            </div>

            <div className="lx-field">
              <label className="lx-label">Password</label>
              <div className="lx-input-wrap">
                <input
                  className="lx-input"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <span className="lx-input-icon">🔑</span>
              </div>
            </div>

            <button className="lx-btn" type="submit" disabled={loading}>
              {loading
                ? <><span className="lx-spinner" />Authenticating...</>
                : 'Enter the Console →'
              }
            </button>
          </form>

          <div className="lx-footer">
            <div className="lx-footer-inner">
              <span>Secured</span>
              <div className="lx-footer-dot" />
              <span>Encrypted</span>
              <div className="lx-footer-dot" />
              <span>Monitored</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}