import { addMandat } from '../data/store.js'


export function renderSaisie(config = {}) {
  const moisOptions = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'].map(m=>`<option>${m}</option>`).join('')
  return `
    <div class="form-card">
      <div class="form-title">Nouveau mandat</div>
      <div class="form-grid">
        <div class="form-group"><label class="form-label">Adresse</label><input class="form-input" id="f-adresse" placeholder="12 rue des Lilas"/></div>
        <div class="form-group"><label class="form-label">Ville</label><input class="form-input" id="f-ville" placeholder="LORIENT"/></div>
        <div class="form-group"><label class="form-label">Type de bien</label><select class="form-select" id="f-type"><option>Maison</option><option>Appartement</option><option>Terrain</option><option>Autre</option></select></div>
        <div class="form-group"><label class="form-label">Type de mandat</label><select class="form-select" id="f-mandat"><option>Exclusif</option><option>Simple</option></select></div>
        <div class="form-group"><label class="form-label">Mois</label><select class="form-select" id="f-mois">${moisOptions}</select></div>
        <div class="form-group"><label class="form-label">Origine RDV</label><select class="form-select" id="f-origine"><option>Prospection terrain</option><option>Prospection ciblée</option><option>Bouche-à-oreille</option><option>Réseau / partenaire</option><option>Notoriété agence</option><option>Acquéreur</option><option>Autre</option></select></div>
        <div class="form-group"><label class="form-label">Prix mandat (€)</label><input class="form-input" id="f-prix" type="number" placeholder="350000"/></div>
        <div class="form-group"><label class="form-label">Honoraires latents TTC (€)</label><input class="form-input" id="f-honTTC" type="number" placeholder="15000" oninput="Saisie.preview()"/></div>
        <div class="form-group"><label class="form-label">Honoraires latents HT (auto)</label><input class="form-input" id="f-honHT" type="number" readonly style="background:#f1efe8;color:var(--c-muted);cursor:default"/></div>
        <div class="form-group"><label class="form-label">% Négociateur</label><input class="form-input" id="f-pct" type="number" placeholder="22" oninput="Saisie.preview()"/></div>
        <div class="form-group"><label class="form-label">Comm. Négo HT (auto)</label><input class="form-input" id="f-commHT" type="number" readonly style="background:#f1efe8;color:var(--c-muted);cursor:default"/></div>
        <div class="form-group"><label class="form-label">Comm. Négo TTC (auto)</label><input class="form-input" id="f-commTTC" type="number" readonly style="background:#f1efe8;color:var(--c-muted);cursor:default"/></div>
        <div class="form-group"><label class="form-label">Statut</label><select class="form-select" id="f-statut"><option>En cours</option><option>Compromis signé</option><option>Acte signé</option><option>Perdu</option></select></div>
        <div class="form-group"><label class="form-label">Prix de vente (€)</label><input class="form-input" id="f-prixVente" type="number" placeholder="si compromis ou acte"/></div>
        <div class="form-group"><label class="form-label">Date compromis</label><input class="form-input" id="f-dateComp" type="date"/></div>
        <div class="form-group"><label class="form-label">Date acte authentique</label><input class="form-input" id="f-dateActe" type="date"/></div>
        <div class="form-group"><label class="form-label">Mandat 2025 ?</label>
          <select class="form-select" id="f-is2025"><option value="false">Non — mandat 2026</option><option value="true">Oui — mandat 2025</option></select></div>
      </div>
      <div class="form-actions">
        <button class="btn btn-primary" onclick="Saisie.submit()">Enregistrer le mandat</button>
        <button class="btn btn-secondary" onclick="Saisie.reset()">Effacer</button>
      </div>
    </div>`
}

export const Saisie = {
  preview() {
    const ttc = parseFloat(document.getElementById('f-honTTC')?.value)||0
    const ht  = ttc/1.20, pct = parseFloat(document.getElementById('f-pct')?.value)||0
    const commHT = ht*pct/100
    if(document.getElementById('f-honHT'))  document.getElementById('f-honHT').value  = ht  ? ht.toFixed(2)      : ''
    if(document.getElementById('f-commHT')) document.getElementById('f-commHT').value = commHT ? commHT.toFixed(2): ''
    if(document.getElementById('f-commTTC'))document.getElementById('f-commTTC').value = commHT ? (commHT*1.20).toFixed(2): ''
  },
  async submit() {
    const g = id => document.getElementById(id)?.value?.trim()||''
    const gf= id => parseFloat(document.getElementById(id)?.value)||0
    try {
      await addMandat({
        adresse: g('f-adresse')||'—', ville: g('f-ville')||'—',
        type_bien: g('f-type'), type_mandat: g('f-mandat'),
        mois: g('f-mois'), origine_rdv: g('f-origine'),
        prix_mandat: gf('f-prix'), hon_ttc: gf('f-honTTC'), pct_nego: gf('f-pct'),
        statut: g('f-statut'), prix_vente: gf('f-prixVente')||null,
        date_compromis: g('f-dateComp')||null, date_acte: g('f-dateActe')||null,
        is_2025: g('f-is2025') === 'true',
      })
      App.showToast('Mandat enregistré !')
      this.reset()
      await App.refresh()
    } catch(e) { App.showToast('Erreur : '+e.message) }
  },
  reset() {
    ['f-adresse','f-ville','f-prix','f-honTTC','f-honHT','f-pct','f-commHT','f-commTTC','f-prixVente','f-dateComp','f-dateActe']
      .forEach(id => { const el=document.getElementById(id); if(el) el.value='' })
  }
}
