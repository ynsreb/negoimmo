/* ── App · Contrôleur principal ────────────────────────────── */

import { getUser, getMandats, getConfig, computeStats,
         MONTHS, fmt, fmtN, logout } from './data/store.js'
import { renderLogin, Auth } from './pages/login.js'
import { renderDashboard }   from './pages/dashboard.js'
import { renderSaisie, Saisie }    from './pages/saisie.js'
import { renderMandats, Mandats }  from './pages/mandats.js'
import { renderRemuneration }      from './pages/remuneration.js'

window.Auth = Auth; window.Saisie = Saisie; window.Mandats = Mandats
window.fmt = fmt; window.fmtN = fmtN; window.MONTHS = MONTHS

let _mandats = [], _config = {}, _user = null

const App = {
  currentPage: 'dashboard',

  async init() {
    _user = await getUser()
    if (!_user) { this.renderPage('login'); return }
    ;[_mandats, _config] = await Promise.all([getMandats(), getConfig()])
    this.render()
  },

  async refresh() {
    ;[_mandats, _config] = await Promise.all([getMandats(), getConfig()])
    this.render()
  },

  render() {
    const stats = computeStats(_mandats, _config)
    window._stats = stats; window._mandats = _mandats; window._config = _config

    const tabs = ['dashboard','saisie','mandats','remuneration']
    const labels = ['Dashboard','Saisie','Mandats','Rémunération']
    const nav = `
      <nav class="nav">
        <div class="nav-logo">négo<span>immo</span> · KPI ${_config.annee||2026}</div>
        <div style="display:flex;align-items:center;gap:10px">
          <div class="nav-tabs">
            ${tabs.map((p,i) => `<button class="tab-btn ${this.currentPage===p?'active':''}"
              onclick="App.goTo('${p}')">${labels[i]}</button>`).join('')}
          </div>
          <button class="btn btn-secondary" style="font-size:11px;padding:5px 12px"
            onclick="App.logout()">Déconnexion</button>
        </div>
      </nav>`

    const content = {
      dashboard:    renderDashboard(stats, _config),
      saisie:       renderSaisie(_config),
      mandats:      renderMandats(_mandats),
      remuneration: renderRemuneration(stats, _config),
    }[this.currentPage] || ''

    document.getElementById('app').innerHTML =
      nav + `<div id="page-${this.currentPage}" class="page active">${content}</div>`
  },

  renderPage(name) {
    document.getElementById('app').innerHTML = renderLogin(name === 'signup' ? 'signup' : 'login')
  },

  goTo(page) { this.currentPage = page; this.render(); window.scrollTo({top:0,behavior:'smooth'}) },

  async logout() {
    await logout(); _user=null; _mandats=[]; _config={}; this.renderPage('login')
  },

  showToast(msg, duration=2500) {
    const el = document.getElementById('toast')
    el.textContent = msg; el.classList.add('show')
    setTimeout(() => el.classList.remove('show'), duration)
  },
}

window.App = App
App.init()
