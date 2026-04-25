# NégoImmo · KPI 2026

Application web de suivi KPI pour négociateur immobilier.

## Structure

```
negoimmo/
├── index.html              # Point d'entrée
├── src/
│   ├── style.css           # Tous les styles
│   ├── app.js              # Contrôleur principal + routage
│   ├── data/
│   │   └── store.js        # Source de données, localStorage, calculs
│   ├── components/
│   │   └── nav.js          # Barre de navigation
│   └── pages/
│       ├── dashboard.js    # Page Dashboard KPI
│       ├── saisie.js       # Formulaire de saisie mandats
│       ├── mandats.js      # Liste des mandats
│       └── remuneration.js # Récap rémunérations & pipeline
└── README.md
```

## Déploiement en 5 minutes (Vercel)

### Étape 1 — GitHub
1. Créez un compte sur github.com (gratuit)
2. Cliquez "New repository" → nommez-le `negoimmo`
3. Uploadez tous les fichiers (glisser-déposer dans l'interface web)

### Étape 2 — Vercel
1. Allez sur vercel.com → "Sign up with GitHub"
2. Cliquez "New Project" → sélectionnez votre repo `negoimmo`
3. Cliquez "Deploy" → attendez 30 secondes
4. Votre URL : `negoimmo.vercel.app` (ou personnalisée)

### Étape 3 (optionnel) — Nom de domaine
- Achetez un domaine sur OVH ou Namecheap (~10€/an)
- Dans Vercel > Settings > Domains → ajoutez votre domaine

## Personnalisation

### Modifier les objectifs (store.js)
```js
const CONFIG = {
  objectifCA:      160000,  // ← votre objectif officiel
  objectifCAOff:   200000,  // ← votre objectif officieux
  objectifExcl:    0.5,     // ← 50% d'exclusivité
  objectifMandats: 36,      // ← 3 mandats/mois = 36/an
  moisEcoules:     3.6,     // ← à mettre à jour chaque mois
  tauxTVA:         1.2,     // ← TVA 20%
};
```

### Ajouter vos mandats 2025 (store.js)
Dans le tableau `MANDATS_2025`, ajoutez une ligne par mandat :
```js
{
  adresse:'32 rue Jean Rostand', ville:'Lanester',
  type:'Maison', mandat:'Exclusif',
  mois:'2025', prix:391000,
  honTTC:15000, honHT:12500,
  pct:22, commHT:2750, commTTC:3300,
  statut:'Acte signé',
  dateComp:null, dateActe:'2026-01-07',
  prixVente:391000, is2025:true
},
```

## Données

Les données saisies sont sauvegardées dans le **localStorage** du navigateur.
Elles persistent entre les sessions sur le même appareil/navigateur.

Pour une vraie base de données partagée entre appareils → évolution possible
vers Supabase (gratuit jusqu'à 500 MB).
