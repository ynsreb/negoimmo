export function renderDashboard(s, config = {}) {
  const objCA    = config.objectif_ca     || 160000
  const objCAOff = config.objectif_ca_off || 200000
  const objMand  = config.objectif_mandats || 36
  const objExcl  = (config.objectif_excl_pct || 50) / 100
  const moisEc   = config.mois_ecoules || 3.6

  const avPct    = Math.round(s.avancementCA * 100)
  const avPctOff = Math.round(s.totalCommHT / objCAOff * 100)
  const avMand   = Math.round(s.totalMandats26 / objMand * 100)
  const projCA   = Math.round(s.projCA)

  const caColor  = avPct >= 50 ? 'kpi-ok' : avPct >= 35 ? 'kpi-warn' : 'kpi-danger'
  const exclColor= s.tauxExcl >= objExcl ? 'kpi-ok' : 'kpi-warn'

  const months = ['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc']
  const barMax = Math.max(...s.commActeParMois, 1)
  const bars = months.map((mn, i) => {
    const v = s.commActeParMois[i], h = Math.round(v/barMax*100)
    return `<div class="bar-col">
      <div class="bar-wrap"><div class="bar" style="height:${h}%;background:${v>0?'var(--c-accent)':'var(--c-border)'}"></div></div>
      <div class="bar-label">${v>0 ? fmt(v).replace('\u00a0€','') : ''}</div>
      <div class="bar-month">${mn}</div>
    </div>`
  }).join('')

  return `
    <div class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-label">CA réalisé (actes)</div>
        <div class="kpi-value ${caColor}">${fmt(s.totalCommHT)}</div>
        <div class="kpi-sub">obj. ${fmt(objCA)} · ${avPct}% atteint</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Unités de vente</div>
        <div class="kpi-value kpi-neutral">${s.totalComp}</div>
        <div class="kpi-sub">compromis signés · ${s.totalActes} actes</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Taux d'exclusivité</div>
        <div class="kpi-value ${exclColor}">${Math.round(s.tauxExcl*100)}%</div>
        <div class="kpi-sub">objectif ${Math.round(objExcl*100)}% · ${s.exclusifs26}/${s.totalMandats26} mandats</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Panier moyen</div>
        <div class="kpi-value kpi-neutral">${s.totalComp ? fmt(s.panierMoyen) : '—'}</div>
        <div class="kpi-sub">commission négo HT / vente</div>
      </div>
    </div>

    <div class="progress-section">
      <div class="progress-card">
        <div class="progress-header"><span class="progress-title">CA — Objectif officiel</span>
          <span class="progress-pct ${caColor}">${avPct}%</span></div>
        <div class="progress-track"><div class="progress-fill" style="width:${Math.min(avPct,100)}%;background:var(--c-accent)"></div></div>
        <div class="progress-detail"><span>${fmt(s.totalCommHT)} réalisés</span><span>Proj. ${fmt(projCA)}</span></div>
      </div>
      <div class="progress-card">
        <div class="progress-header"><span class="progress-title">CA — Objectif officieux</span>
          <span class="progress-pct ${avPctOff>=50?'kpi-ok':'kpi-warn'}">${avPctOff}%</span></div>
        <div class="progress-track"><div class="progress-fill" style="width:${Math.min(avPctOff,100)}%;background:var(--c-amber)"></div></div>
        <div class="progress-detail"><span>${fmt(s.totalCommHT)} réalisés</span><span>Proj. ${fmt(projCA)}</span></div>
      </div>
      <div class="progress-card">
        <div class="progress-header"><span class="progress-title">Mandats pris (obj. ${objMand}/an)</span>
          <span class="progress-pct ${avMand>=40?'kpi-ok':'kpi-warn'}">${avMand}%</span></div>
        <div class="progress-track"><div class="progress-fill" style="width:${Math.min(avMand,100)}%;background:var(--c-blue)"></div></div>
        <div class="progress-detail"><span>${s.totalMandats26} pris</span><span>Proj. ${Math.round(moisEc>0?s.totalMandats26/moisEc*12:0)}</span></div>
      </div>
      <div class="progress-card">
        <div class="progress-header"><span class="progress-title">Actes authentiques</span>
          <span class="progress-pct kpi-neutral">${s.totalActes}</span></div>
        <div class="progress-track"><div class="progress-fill" style="width:${Math.min(s.totalActes/12*100,100)}%;background:var(--c-accent2)"></div></div>
        <div class="progress-detail"><span>${s.actes25.length} mandat(s) 2025 · ${s.actes26.length} mandat(s) 2026</span></div>
      </div>
    </div>

    <p class="section-title">Commissions négo HT — actes signés par mois</p>
    <div class="chart-card"><div class="bar-chart">${bars}</div></div>`
}
