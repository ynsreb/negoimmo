/* ── Page Login ─────────────────────────────────────────────
   Affichée si l'utilisateur n'est pas connecté
────────────────────────────────────────────────────────── */

export function renderLogin(mode = 'login') {
  return `
    <div style="max-width:380px;margin:4rem auto;padding:0 1rem">
      <div style="text-align:center;margin-bottom:2rem">
        <div style="font-size:22px;font-weight:600;letter-spacing:-0.5px">
          négo<span style="color:var(--c-accent)">immo</span>
        </div>
        <div style="font-size:13px;color:var(--c-muted);margin-top:4px">KPI 2026 · Tableau de bord négociateur</div>
      </div>

      <div class="form-card">
        <div style="display:flex;gap:4px;background:var(--c-bg);border-radius:8px;padding:3px;margin-bottom:1.25rem">
          <button class="tab-btn ${mode==='login'?'active':''}" style="flex:1" onclick="Auth.showLogin()">Connexion</button>
          <button class="tab-btn ${mode==='signup'?'active':''}" style="flex:1" onclick="Auth.showSignup()">Inscription</button>
        </div>

        <div class="form-group" style="margin-bottom:10px">
          <label class="form-label">Email</label>
          <input class="form-input" id="auth-email" type="email" placeholder="votre@email.com" />
        </div>
        <div class="form-group" style="margin-bottom:1.25rem">
          <label class="form-label">Mot de passe</label>
          <input class="form-input" id="auth-password" type="password" placeholder="••••••••"
            onkeydown="if(event.key==='Enter') Auth.submit('${mode}')" />
        </div>

        <div id="auth-error" style="display:none;font-size:12px;color:var(--c-danger);margin-bottom:10px;padding:8px;background:var(--c-danger-light);border-radius:6px"></div>

        <button class="btn btn-primary" style="width:100%" onclick="Auth.submit('${mode}')">
          ${mode === 'login' ? 'Se connecter' : "Créer mon compte"}
        </button>

        ${mode === 'signup' ? `
          <p style="font-size:11px;color:var(--c-muted);text-align:center;margin-top:12px">
            Un email de confirmation vous sera envoyé.
          </p>` : ''}
      </div>
    </div>
  `
}

export const Auth = {
  showLogin()  { App.renderPage('login') },
  showSignup() { App.renderPage('signup') },

  async submit(mode) {
    const email    = document.getElementById('auth-email')?.value?.trim()
    const password = document.getElementById('auth-password')?.value
    const errEl    = document.getElementById('auth-error')

    if (!email || !password) {
      errEl.textContent = 'Veuillez remplir tous les champs.'
      errEl.style.display = 'block'
      return
    }

    try {
      errEl.style.display = 'none'
      const btn = document.querySelector('#page-login .btn-primary')
      if (btn) { btn.textContent = 'Connexion…'; btn.disabled = true }

      if (mode === 'login') {
        await login(email, password)
      } else {
        await signup(email, password)
        App.showToast('Compte créé ! Vérifiez votre email.')
        Auth.showLogin()
        return
      }

      await App.init()

    } catch(err) {
      const messages = {
        'Invalid login credentials': 'Email ou mot de passe incorrect.',
        'Email not confirmed': 'Veuillez confirmer votre email avant de vous connecter.',
        'User already registered': 'Un compte existe déjà avec cet email.',
      }
      errEl.textContent = messages[err.message] || err.message
      errEl.style.display = 'block'
      const btn = document.querySelector('.btn-primary')
      if (btn) { btn.textContent = mode === 'login' ? 'Se connecter' : 'Créer mon compte'; btn.disabled = false }
    }
  }
}
