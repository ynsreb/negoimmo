import { deleteMandat } from '../data/store.js'

export function renderMandats(mandats = []) {
  if (!mandats.length) return `
    <div class="table-wrap"><div class="empty-state">
      <div class="empty-state-icon" style="font-size:32px">📋</div>
      <div class="empty-state-text">Aucun mandat. Utilisez l'onglet Saisie pour commencer.</div>
    </div></div>`

  const rows = mandats.map(m => {
    const mBadge = m.type_mandat==='Exclusif' ? 'badge-excl' : 'badge-simple'
    const sBadge = {
      'Compromis signé':'badge-comp','Acte signé':'badge-acte','Perdu':'badge-perdu'
    }[m.statut] || 'badge-cours'
    const honHT  = Math.round(m.hon_ht||0)
    const commHT = Math.round(m.comm_nego_ht||0)
    const label25 = m.is_2025 ? '<span class="badge badge-2025">2025</span>' : ''
    const del = !m.is_2025
      ? `<button class="btn-icon" onclick="Mandats.delete('${m.id}')">✕</button>` : ''
    return `<div class="table-row ${m.is_2025?'is2025':''}">
      <span class="td">${m.adresse||'—'}${label25}</span>
      <span class="td td-muted">${m.type_bien||'—'}</span>
      <span class="td"><span class="badge ${mBadge}">${m.type_mandat}</span></span>
      <span class="td td-mono">${honHT ? fmtN(honHT)+' €' : '—'}</span>
      <span class="td td-mono" style="color:var(--c-accent)">${commHT ? fmtN(commHT)+' €' : '—'}</span>
      <span class="td"><span class="badge ${sBadge}">${m.statut||'—'}</span></span>
      <span class="td td-action">${del}</span>
    </div>`
  }).join('')

  return `<div class="table-wrap">
    <div class="table-toolbar">
      <span class="table-count">${mandats.length} mandat(s)</span>
    </div>
    <div class="table-head">
      <span class="th">Adresse</span><span class="th">Type</span><span class="th">Mandat</span>
      <span class="th">Hon. HT</span><span class="th">Comm. Négo HT</span><span class="th">Statut</span><span class="th"></span>
    </div>
    <div class="table-body">${rows}</div>
  </div>`
}

export const Mandats = {
  async delete(id) {
    if (!confirm('Supprimer ce mandat ?')) return
    try { await deleteMandat(id); App.showToast('Mandat supprimé'); await App.refresh() }
    catch(e) { App.showToast('Erreur : '+e.message) }
  }
}
