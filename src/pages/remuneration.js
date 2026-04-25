export function renderRemuneration(s, config = {}) {
  const objCA = config.objectif_ca || 160000
  const moisEc = config.mois_ecoules || 3.6
  const projCA = Math.round(s.projCA)

  const months = ['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc']
  const mkRecap = (arr, isAmt) => {
    const rows = arr.map((v,i) => !v ? '' :
      `<div class="recap-row"><span class="recap-month">${months[i]}</span>
       <span class="recap-val">${isAmt ? fmt(Math.round(v)) : v}</span></div>`
    ).join('')
    return rows || '<p class="recap-empty">Aucune donnée</p>'
  }

  const pipeline = s.pipeline || []
  const pipelineComm = s.pipelineComm || 0

  return `
    <div class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-label">Comm. Négo HT (actes)</div>
        <div class="kpi-value kpi-ok">${fmt(Math.round(s.totalCommHT))}</div>
        <div class="kpi-sub">mandats 2025 inclus</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Comm. Négo TTC</div>
        <div class="kpi-value kpi-neutral">${fmt(Math.round(s.totalCommTTC))}</div>
        <div class="kpi-sub">× 1,20</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">En attente (compromis)</div>
        <div class="kpi-value kpi-warn">${fmt(Math.round(pipelineComm))}</div>
        <div class="kpi-sub">${pipeline.length} compromis sans acte</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Projection annuelle</div>
        <div class="kpi-value kpi-ok">${fmt(projCA)}</div>
        <div class="kpi-sub">au rythme actuel</div>
      </div>
    </div>

    <p class="section-title">Récapitulatif mensuel</p>
    <div class="recap-grid">
      <div class="recap-card"><div class="recap-head">Compromis / mois</div>${mkRecap(s.compParMois, false)}</div>
      <div class="recap-card"><div class="recap-head">Actes / mois</div>${mkRecap(s.actesParMois, false)}</div>
      <div class="recap-card"><div class="recap-head">Comm. Négo HT / mois</div>${mkRecap(s.commActeParMois, true)}</div>
    </div>

    <p class="section-title">Pipeline — commissions à venir</p>
    <div class="table-wrap">
      ${!pipeline.length
        ? '<div class="empty-state"><div class="empty-state-text">Aucun compromis en attente d\'acte.</div></div>'
        : `<div class="table-head" style="grid-template-columns:2fr 1fr 1fr 1fr 1fr">
             <span class="th">Adresse</span><span class="th">Type</span>
             <span class="th">Date compromis</span><span class="th">Hon. HT</span><span class="th">Comm. Négo HT</span>
           </div>
           <div class="table-body">
             ${pipeline.map(m=>`<div class="table-row" style="grid-template-columns:2fr 1fr 1fr 1fr 1fr">
               <span class="td">${m.adresse||'—'}</span>
               <span class="td td-muted">${m.type_bien||'—'}</span>
               <span class="td td-mono">${m.date_compromis ? new Date(m.date_compromis).toLocaleDateString('fr-FR') : '—'}</span>
               <span class="td td-mono">${m.hon_ht ? fmtN(Math.round(m.hon_ht))+' €' : '—'}</span>
               <span class="td td-mono" style="color:var(--c-accent)">${m.comm_nego_ht ? fmtN(Math.round(m.comm_nego_ht))+' €' : '—'}</span>
             </div>`).join('')}
           </div>
           <div style="padding:10px 14px;border-top:0.5px solid var(--c-border);display:flex;justify-content:flex-end;gap:1.5rem;font-size:12px;font-weight:500">
             <span style="color:var(--c-muted)">Total en attente :</span>
             <span style="font-family:'DM Mono',monospace;color:var(--c-accent)">${fmt(Math.round(pipelineComm))} HT</span>
             <span style="font-family:'DM Mono',monospace;color:var(--c-muted)">${fmt(Math.round(pipelineComm*1.20))} TTC</span>
           </div>`}
    </div>`
}
