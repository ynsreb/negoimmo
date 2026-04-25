function renderNav(activePage) {
  const pages = [
    { id: 'dashboard',    label: 'Dashboard' },
    { id: 'saisie',       label: 'Saisie' },
    { id: 'mandats',      label: 'Mandats' },
    { id: 'remuneration', label: 'Rémunération' },
  ];

  return `
    <nav class="nav">
      <div class="nav-logo">négo<span>immo</span> · KPI 2026</div>
      <div class="nav-tabs">
        ${pages.map(p => `
          <button class="tab-btn ${activePage === p.id ? 'active' : ''}"
            onclick="App.goTo('${p.id}')">${p.label}</button>
        `).join('')}
      </div>
    </nav>
  `;
}
