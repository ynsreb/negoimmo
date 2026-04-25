@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --c-bg:           #f7f6f3;
  --c-surface:      #ffffff;
  --c-border:       rgba(0,0,0,0.08);
  --c-border-strong:rgba(0,0,0,0.15);
  --c-text:         #1a1916;
  --c-muted:        #7a786f;
  --c-accent:       #1a5f3f;
  --c-accent-light: #e8f5ee;
  --c-accent2:      #c55a11;
  --c-accent2-light:#fce4d6;
  --c-amber:        #854f0b;
  --c-amber-light:  #faeeda;
  --c-blue:         #185fa5;
  --c-blue-light:   #e6f1fb;
  --c-danger:       #a32d2d;
  --c-danger-light: #fcebeb;
}

body {
  font-family: 'DM Sans', sans-serif;
  background: var(--c-bg);
  color: var(--c-text);
  min-height: 100vh;
  font-size: 14px;
  line-height: 1.5;
}

/* ── Layout ── */
.app { max-width: 1040px; margin: 0 auto; padding: 1.5rem 1.25rem 4rem; }

/* ── Navigation ── */
.nav {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 2rem; padding-bottom: 1rem;
  border-bottom: 0.5px solid var(--c-border-strong);
}
.nav-logo { font-size: 16px; font-weight: 600; letter-spacing: -0.4px; }
.nav-logo span { color: var(--c-accent); }
.nav-tabs {
  display: flex; gap: 3px;
  background: var(--c-surface);
  border: 0.5px solid var(--c-border);
  border-radius: 10px; padding: 3px;
}
.tab-btn {
  font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
  padding: 6px 16px; border-radius: 7px; border: none; cursor: pointer;
  background: transparent; color: var(--c-muted);
  transition: all 0.15s ease;
}
.tab-btn.active { background: var(--c-accent); color: #fff; }
.tab-btn:hover:not(.active) { background: var(--c-bg); color: var(--c-text); }

/* ── Pages ── */
.page { display: none; animation: fadeIn 0.2s ease; }
.page.active { display: block; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }

/* ── Section titles ── */
.section-title {
  font-size: 11px; font-weight: 600; color: var(--c-muted);
  text-transform: uppercase; letter-spacing: 0.08em;
  margin: 1.75rem 0 0.75rem;
}

/* ── KPI Cards ── */
.kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 1.25rem; }
.kpi-card {
  background: var(--c-surface); border: 0.5px solid var(--c-border);
  border-radius: 12px; padding: 1rem 1.1rem;
}
.kpi-label {
  font-size: 10px; font-weight: 600; color: var(--c-muted);
  text-transform: uppercase; letter-spacing: 0.07em; margin-bottom: 6px;
}
.kpi-value {
  font-size: 26px; font-weight: 600; font-family: 'DM Mono', monospace;
  line-height: 1; margin-bottom: 4px; letter-spacing: -0.5px;
}
.kpi-sub { font-size: 11px; color: var(--c-muted); }
.kpi-ok     { color: var(--c-accent); }
.kpi-warn   { color: var(--c-amber); }
.kpi-danger { color: var(--c-danger); }
.kpi-neutral { color: var(--c-text); }

/* ── Progress bars ── */
.progress-section { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 1.25rem; }
.progress-card {
  background: var(--c-surface); border: 0.5px solid var(--c-border);
  border-radius: 12px; padding: 1rem 1.1rem;
}
.progress-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 10px; }
.progress-title { font-size: 12px; font-weight: 500; }
.progress-pct { font-size: 13px; font-weight: 600; font-family: 'DM Mono', monospace; }
.progress-track { height: 5px; background: var(--c-bg); border-radius: 3px; overflow: hidden; margin-bottom: 6px; }
.progress-fill { height: 100%; border-radius: 3px; transition: width 0.5s ease; }
.progress-detail { display: flex; justify-content: space-between; font-size: 11px; color: var(--c-muted); }

/* ── Chart ── */
.chart-card {
  background: var(--c-surface); border: 0.5px solid var(--c-border);
  border-radius: 12px; padding: 1.25rem; margin-bottom: 1.25rem;
}
.chart-title { font-size: 12px; font-weight: 500; color: var(--c-muted); margin-bottom: 1rem; }
.bar-chart { display: flex; align-items: flex-end; gap: 6px; height: 120px; }
.bar-col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; height: 100%; }
.bar-wrap { flex: 1; width: 100%; display: flex; align-items: flex-end; }
.bar { width: 100%; border-radius: 4px 4px 0 0; min-height: 2px; transition: height 0.5s ease; }
.bar-label { font-size: 9px; color: var(--c-muted); font-family: 'DM Mono', monospace; text-align: center; min-height: 12px; }
.bar-month { font-size: 9px; color: var(--c-muted); text-align: center; }

/* ── Forms ── */
.form-card {
  background: var(--c-surface); border: 0.5px solid var(--c-border);
  border-radius: 12px; padding: 1.4rem 1.5rem; margin-bottom: 1rem;
}
.form-title { font-size: 15px; font-weight: 600; margin-bottom: 1.25rem; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.form-group { display: flex; flex-direction: column; gap: 5px; }
.form-group.full { grid-column: 1 / -1; }
.form-group.span3 { grid-column: span 1; }
.form-label {
  font-size: 10px; font-weight: 600; color: var(--c-muted);
  text-transform: uppercase; letter-spacing: 0.06em;
}
.form-input, .form-select {
  font-family: 'DM Sans', sans-serif; font-size: 13px;
  border: 0.5px solid var(--c-border-strong); border-radius: 8px;
  padding: 8px 11px; background: var(--c-bg); color: var(--c-text);
  outline: none; transition: border-color 0.15s, background 0.15s;
  width: 100%;
}
.form-input:focus, .form-select:focus { border-color: var(--c-accent); background: #fff; }
.form-input::placeholder { color: var(--c-muted); }
.form-actions { display: flex; gap: 8px; margin-top: 1.25rem; flex-wrap: wrap; }

/* ── Buttons ── */
.btn {
  font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
  border-radius: 8px; padding: 9px 20px; cursor: pointer;
  transition: all 0.15s; border: none; white-space: nowrap;
}
.btn-primary { background: var(--c-accent); color: #fff; }
.btn-primary:hover { opacity: 0.88; }
.btn-secondary {
  background: transparent; color: var(--c-accent);
  border: 0.5px solid var(--c-accent);
}
.btn-secondary:hover { background: var(--c-accent-light); }
.btn-danger { background: transparent; color: var(--c-danger); border: 0.5px solid var(--c-danger); }
.btn-danger:hover { background: var(--c-danger-light); }

/* ── Table ── */
.table-wrap {
  background: var(--c-surface); border: 0.5px solid var(--c-border);
  border-radius: 12px; overflow: hidden; margin-bottom: 1rem;
}
.table-toolbar {
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 14px; border-bottom: 0.5px solid var(--c-border);
}
.table-count { font-size: 12px; color: var(--c-muted); }
.table-search {
  font-family: 'DM Sans', sans-serif; font-size: 12px;
  border: 0.5px solid var(--c-border-strong); border-radius: 7px;
  padding: 5px 10px; background: var(--c-bg); color: var(--c-text);
  outline: none; width: 180px;
}
.table-head {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.2fr 1.2fr 1fr 0.5fr;
  padding: 8px 14px; background: var(--c-bg);
  border-bottom: 0.5px solid var(--c-border);
}
.th { font-size: 10px; font-weight: 600; color: var(--c-muted); text-transform: uppercase; letter-spacing: 0.06em; }
.table-body { max-height: 480px; overflow-y: auto; }
.table-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.2fr 1.2fr 1fr 0.5fr;
  padding: 10px 14px; border-bottom: 0.5px solid var(--c-border);
  align-items: center; transition: background 0.1s; cursor: default;
}
.table-row:last-child { border-bottom: none; }
.table-row:hover { background: var(--c-bg); }
.table-row.is2025 { opacity: 0.72; }
.td { font-size: 12px; color: var(--c-text); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.td-mono { font-family: 'DM Mono', monospace; font-size: 11px; }
.td-muted { color: var(--c-muted); font-size: 11px; }
.td-action { display: flex; gap: 4px; justify-content: flex-end; }
.btn-icon {
  font-size: 12px; background: none; border: none; cursor: pointer;
  color: var(--c-muted); padding: 3px 5px; border-radius: 4px;
  transition: background 0.1s, color 0.1s;
}
.btn-icon:hover { background: var(--c-danger-light); color: var(--c-danger); }

/* ── Badges ── */
.badge {
  display: inline-block; font-size: 10px; font-weight: 600;
  padding: 2px 8px; border-radius: 20px; white-space: nowrap;
}
.badge-excl   { background: var(--c-accent-light); color: var(--c-accent); }
.badge-simple { background: var(--c-blue-light);   color: var(--c-blue); }
.badge-comp   { background: var(--c-amber-light);  color: var(--c-amber); }
.badge-acte   { background: var(--c-accent-light); color: var(--c-accent); }
.badge-cours  { background: #f1efe8; color: #7a786f; }
.badge-perdu  { background: var(--c-danger-light); color: var(--c-danger); }
.badge-2025   { background: var(--c-accent2-light); color: var(--c-accent2); font-size: 9px; margin-left: 5px; }

/* ── Recap / Rémunération ── */
.recap-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 1.25rem; }
.recap-card {
  background: var(--c-surface); border: 0.5px solid var(--c-border);
  border-radius: 12px; padding: 1rem 1.1rem;
}
.recap-head {
  font-size: 10px; font-weight: 600; color: var(--c-muted);
  text-transform: uppercase; letter-spacing: 0.07em;
  margin-bottom: 0.75rem; padding-bottom: 0.5rem;
  border-bottom: 0.5px solid var(--c-border);
}
.recap-row {
  display: flex; justify-content: space-between; align-items: baseline;
  padding: 5px 0; font-size: 12px;
  border-bottom: 0.5px solid var(--c-border);
}
.recap-row:last-child { border-bottom: none; }
.recap-month { color: var(--c-muted); font-size: 12px; }
.recap-val { font-family: 'DM Mono', monospace; font-size: 12px; font-weight: 500; }
.recap-empty { font-size: 12px; color: var(--c-muted); padding: 8px 0; }

/* ── Toast ── */
.toast {
  position: fixed; bottom: 24px; right: 24px;
  background: var(--c-accent); color: #fff;
  font-size: 13px; font-weight: 500;
  padding: 10px 18px; border-radius: 10px;
  opacity: 0; pointer-events: none;
  transition: opacity 0.25s, transform 0.25s;
  transform: translateY(8px); z-index: 999;
}
.toast.show { opacity: 1; transform: translateY(0); }

/* ── Empty state ── */
.empty-state {
  text-align: center; padding: 3rem 1rem; color: var(--c-muted);
}
.empty-state-icon { font-size: 32px; margin-bottom: 0.75rem; }
.empty-state-text { font-size: 14px; }

/* ── Responsive ── */
@media (max-width: 700px) {
  .kpi-grid { grid-template-columns: 1fr 1fr; }
  .progress-section { grid-template-columns: 1fr; }
  .recap-grid { grid-template-columns: 1fr; }
  .form-grid { grid-template-columns: 1fr; }
  .nav-tabs .tab-btn { padding: 6px 10px; font-size: 12px; }
  .table-head, .table-row { grid-template-columns: 2fr 1fr 1fr; }
  .th:nth-child(n+4), .td:nth-child(n+4) { display: none; }
}
