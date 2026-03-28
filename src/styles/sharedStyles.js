// Shared luxury table page styles - import and inject into <style> tags
export const sharedPageStyles = `
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

.ag-page-header { margin-bottom: 32px; }
.ag-page-eyebrow {
  font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase;
  color: var(--gold); font-weight: 500; margin-bottom: 8px;
}
.ag-page-title {
  font-family: 'Cormorant Garamond', serif; font-size: 36px;
  font-weight: 700; color: var(--brown-deep); line-height: 1.1; margin-bottom: 4px;
}
.ag-page-sub { font-size: 14px; color: var(--muted); font-weight: 300; }
.ag-page-rule { display: flex; align-items: center; gap: 12px; margin-top: 18px; }
.ag-pr-line { width: 40px; height: 1px; background: linear-gradient(to right, var(--gold), transparent); }
.ag-pr-diamond { width: 5px; height: 5px; background: var(--gold); transform: rotate(45deg); flex-shrink: 0; }
.ag-pr-line-r { flex: 1; height: 1px; background: var(--cream-deep); }

.ag-table-card {
  background: #fff;
  border-radius: 16px;
  border: 1px solid var(--cream-deep);
  box-shadow: 0 2px 16px rgba(107,76,38,0.07);
  overflow: hidden;
}
.ag-table-toolbar {
  padding: 18px 24px;
  border-bottom: 1px solid var(--cream-deep);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}
.ag-table-toolbar-left { display: flex; align-items: center; gap: 12px; }
.ag-table-count {
  font-size: 12px;
  color: var(--muted);
  background: var(--cream);
  border: 1px solid var(--cream-deep);
  border-radius: 100px;
  padding: 4px 12px;
  font-weight: 400;
}
.ag-toolbar-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 18px;
  font-weight: 600;
  color: var(--brown-deep);
}

.ag-table-wrap { overflow-x: auto; }
.ag-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13.5px;
}
.ag-table thead tr {
  background: var(--cream);
  border-bottom: 1px solid var(--cream-deep);
}
.ag-table thead th {
  padding: 13px 20px;
  text-align: left;
  font-size: 10.5px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--brown-light);
  font-weight: 600;
  white-space: nowrap;
}
.ag-table tbody tr {
  border-bottom: 1px solid rgba(240,228,200,0.5);
  transition: background 0.15s;
}
.ag-table tbody tr:last-child { border-bottom: none; }
.ag-table tbody tr:hover { background: rgba(245,233,200,0.25); }
.ag-table td {
  padding: 14px 20px;
  color: var(--ink);
  font-weight: 400;
  vertical-align: middle;
}
.ag-table td .ag-cell-muted { color: var(--muted); font-size: 12.5px; }

.ag-avatar-cell { display: flex; align-items: center; gap: 10px; }
.ag-avatar {
  width: 32px; height: 32px;
  background: linear-gradient(145deg, var(--gold-pale), var(--cream-deep));
  border: 1px solid rgba(201,151,44,0.25);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 600; color: var(--brown-mid);
  flex-shrink: 0;
}
.ag-cell-name { font-weight: 500; color: var(--ink); }

.ag-btn-delete {
  display: inline-flex; align-items: center; gap: 6px;
  background: transparent;
  border: 1.5px solid rgba(200,80,60,0.2);
  border-radius: 7px;
  padding: 7px 14px;
  font-size: 12px;
  font-weight: 500;
  color: #b04030;
  font-family: 'Jost', sans-serif;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, box-shadow 0.2s;
  white-space: nowrap;
}
.ag-btn-delete:hover {
  background: #fff2f0;
  border-color: rgba(200,80,60,0.4);
  box-shadow: 0 2px 8px rgba(200,80,60,0.1);
}

.ag-loading {
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; padding: 80px 24px; gap: 16px;
}
.ag-loading-ring {
  width: 40px; height: 40px;
  border: 3px solid var(--cream-deep);
  border-top-color: var(--gold);
  border-radius: 50%;
  animation: ag-spin 0.8s linear infinite;
}
.ag-loading-text { font-size: 13px; color: var(--muted); font-weight: 300; }
@keyframes ag-spin { to { transform: rotate(360deg); } }

.ag-empty {
  text-align: center; padding: 60px 24px;
  font-size: 14px; color: var(--muted); font-weight: 300;
}

.ag-badge {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 4px 10px; border-radius: 100px;
  font-size: 11px; font-weight: 500; letter-spacing: 0.06em;
}
.ag-badge-pending {
  background: #fff8e6; color: #9a6e10;
  border: 1px solid rgba(201,151,44,0.3);
}
.ag-badge-completed {
  background: #e8f5ee; color: #2a7a4f;
  border: 1px solid rgba(58,138,92,0.3);
}
.ag-badge-cancelled {
  background: #fef0ee; color: #b04030;
  border: 1px solid rgba(200,80,60,0.3);
}
`;