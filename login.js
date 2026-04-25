/* ── Store Supabase ─────────────────────────────────────────
   Remplace localStorage par de vrais appels base de données
────────────────────────────────────────────────────────── */

import { supabase } from '../supabase.js'

export const MONTHS = [
  'Janvier','Février','Mars','Avril','Mai','Juin',
  'Juillet','Août','Septembre','Octobre','Novembre','Décembre'
]

export const CONFIG_DEFAULTS = {
  objectif_ca:       160000,
  objectif_ca_off:   200000,
  objectif_excl_pct: 50,
  objectif_mandats:  36,
  taux_tva:          1.20,
  annee:             2026,
  mois_ecoules:      3.6,
}

export const fmt  = v => (+v||0).toLocaleString('fr-FR', { style:'currency', currency:'EUR', maximumFractionDigits:0 })
export const fmtN = v => Math.round(+v||0).toLocaleString('fr-FR')
export const moisNum = dateStr => dateStr ? new Date(dateStr).getMonth()+1 : null

/* ── Auth ── */
export const getUser   = async () => (await supabase.auth.getUser()).data.user
export const login     = async (email, pw) => { const {data,error} = await supabase.auth.signInWithPassword({email,password:pw}); if(error) throw error; return data }
export const signup    = async (email, pw) => { const {data,error} = await supabase.auth.signUp({email,password:pw}); if(error) throw error; return data }
export const logout    = async () => supabase.auth.signOut()

/* ── Config ── */
export async function getConfig() {
  const user = await getUser()
  if (!user) return CONFIG_DEFAULTS
  const { data } = await supabase.from('config').select('*').eq('user_id', user.id).maybeSingle()
  return { ...CONFIG_DEFAULTS, ...data }
}

export async function saveConfig(updates) {
  const user = await getUser()
  if (!user) return
  await supabase.from('config').upsert({ user_id: user.id, ...updates }, { onConflict: 'user_id' })
}

/* ── Mandats ── */
export async function getMandats() {
  const { data, error } = await supabase.from('mandats').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

export async function addMandat(mandat) {
  const user = await getUser()
  if (!user) throw new Error('Non connecté')
  const hon_ht        = mandat.hon_ttc ? mandat.hon_ttc / 1.20 : null
  const comm_nego_ht  = (hon_ht && mandat.pct_nego) ? hon_ht * mandat.pct_nego / 100 : null
  const comm_nego_ttc = comm_nego_ht ? comm_nego_ht * 1.20 : null
  const { data, error } = await supabase.from('mandats').insert({ user_id: user.id, ...mandat, hon_ht, comm_nego_ht, comm_nego_ttc }).select().single()
  if (error) throw error
  return data
}

export async function updateMandat(id, updates) {
  if (updates.hon_ttc) updates.hon_ht = updates.hon_ttc / 1.20
  if (updates.hon_ht && updates.pct_nego) {
    updates.comm_nego_ht  = updates.hon_ht * updates.pct_nego / 100
    updates.comm_nego_ttc = updates.comm_nego_ht * 1.20
  }
  const { data, error } = await supabase.from('mandats').update(updates).eq('id', id).select().single()
  if (error) throw error
  return data
}

export async function deleteMandat(id) {
  const { error } = await supabase.from('mandats').delete().eq('id', id)
  if (error) throw error
}

/* ── Stats mensuelles ── */
export async function getStatsMensuelles(annee = 2026) {
  const { data, error } = await supabase.from('stats_mensuelles').select('*').eq('annee', annee).order('mois')
  if (error) throw error
  return data || []
}

export async function saveStatsMensuelle(mois, annee, updates) {
  const user = await getUser()
  if (!user) return
  await supabase.from('stats_mensuelles').upsert({ user_id: user.id, mois, annee, ...updates }, { onConflict: 'user_id,mois,annee' })
}

/* ── Calculs agrégés ── */
export function computeStats(mandats, config = CONFIG_DEFAULTS) {
  const m26 = mandats.filter(m => !m.is_2025)
  const m25 = mandats.filter(m =>  m.is_2025)

  const totalMandats26 = m26.length
  const exclusifs26    = m26.filter(m => m.type_mandat === 'Exclusif').length
  const tauxExcl       = totalMandats26 ? exclusifs26 / totalMandats26 : 0

  const comp26 = m26.filter(m => m.date_compromis)
  const comp25 = m25.filter(m => m.date_compromis && String(m.date_compromis).startsWith('2026'))
  const totalComp = comp26.length + comp25.length

  const actes26 = m26.filter(m => m.date_acte)
  const actes25 = m25.filter(m => m.date_acte && String(m.date_acte).startsWith('2026'))
  const totalActes = actes26.length + actes25.length

  const totalCommHT  = [...actes26, ...actes25].reduce((s,m) => s + (+m.comm_nego_ht||0), 0)
  const totalCommTTC = totalCommHT * (config.taux_tva || 1.20)
  const moisEcoules  = config.mois_ecoules || 3.6
  const projCA       = moisEcoules > 0 ? totalCommHT / moisEcoules * 12 : 0
  const panierMoyen  = totalComp ? totalCommHT / totalComp : 0
  const avancementCA = totalCommHT / (config.objectif_ca || 160000)

  const commActeParMois = Array(12).fill(0)
  const compParMois     = Array(12).fill(0)
  const actesParMois    = Array(12).fill(0)

  ;[...comp26, ...comp25].forEach(m => {
    const mn = moisNum(m.date_compromis); if (mn) { compParMois[mn-1]++ }
  })
  ;[...actes26, ...actes25].forEach(m => {
    const mn = moisNum(m.date_acte); if (mn) { actesParMois[mn-1]++; commActeParMois[mn-1] += +m.comm_nego_ht||0 }
  })

  const pipeline     = [...comp26, ...comp25].filter(m => !m.date_acte)
  const pipelineComm = pipeline.reduce((s,m) => s + (+m.comm_nego_ht||0), 0)

  return {
    totalMandats26, exclusifs26, tauxExcl,
    totalComp, totalActes,
    totalCommHT, totalCommTTC, projCA, panierMoyen, avancementCA,
    commActeParMois, compParMois, actesParMois,
    pipeline, pipelineComm,
    m26, m25, comp26, comp25, actes26, actes25,
  }
}
