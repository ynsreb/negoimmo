-- ============================================================
-- NégoImmo · Schéma base de données Supabase
-- Coller dans SQL Editor → cliquer Run
-- ============================================================

-- ── Extension UUID ──────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ── Table : mandats ─────────────────────────────────────────
-- Une ligne = un mandat (2026 ou 2025)
create table if not exists mandats (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid references auth.users(id) on delete cascade,

  -- Identification
  adresse       text,
  ville         text,
  type_bien     text check (type_bien in ('Maison','Appartement','Terrain','Autre')),
  type_mandat   text check (type_mandat in ('Exclusif','Simple')),
  mois          text,          -- "Janvier", "Février"... ou "2025" pour mandats antérieurs
  is_2025       boolean default false,  -- true = mandat 2025, hors stats mandats 2026

  -- Prospection
  origine_rdv   text,

  -- Financier mandat
  prix_mandat   numeric(12,2),
  hon_ttc       numeric(12,2),  -- honoraires latents TTC
  hon_ht        numeric(12,2),  -- calculé = hon_ttc / 1.20

  -- Négociateur
  pct_nego      numeric(5,2),   -- ex: 22 pour 22%
  comm_nego_ht  numeric(12,2),  -- calculé = hon_ht * pct_nego / 100
  comm_nego_ttc numeric(12,2),  -- calculé = comm_nego_ht * 1.20

  -- Compromis
  date_compromis date,
  prix_vente     numeric(12,2),
  hon_reels_ht   numeric(12,2),  -- hon réels HT après négociation

  -- Acte authentique
  date_acte     date,

  -- Statut
  statut        text check (statut in ('En cours','Compromis signé','Acte signé','Perdu'))
                default 'En cours',

  -- Métadonnées
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- ── Table : config ──────────────────────────────────────────
-- Objectifs et paramètres personnalisables par utilisateur
create table if not exists config (
  id                  uuid primary key default uuid_generate_v4(),
  user_id             uuid references auth.users(id) on delete cascade unique,

  objectif_ca         numeric(12,2) default 160000,
  objectif_ca_off     numeric(12,2) default 200000,
  objectif_excl_pct   numeric(5,2)  default 50,    -- 50 = 50%
  objectif_mandats    integer       default 36,
  taux_tva            numeric(5,2)  default 1.20,
  annee               integer       default 2026,

  created_at          timestamptz   default now(),
  updated_at          timestamptz   default now()
);

-- ── Table : stats_mensuelles ────────────────────────────────
-- Saisie manuelle des données non déductibles du log
-- (RDV propriétaires, visites acquéreurs)
create table if not exists stats_mensuelles (
  id              uuid primary key default uuid_generate_v4(),
  user_id         uuid references auth.users(id) on delete cascade,

  mois            integer check (mois between 1 and 12),
  annee           integer default 2026,

  rdv_terrain           integer default 0,
  rdv_bouche_oreille    integer default 0,
  rdv_reseau            integer default 0,
  rdv_internet          integer default 0,
  rdv_autre             integer default 0,

  visites_acquereurs    integer default 0,

  created_at      timestamptz default now(),
  updated_at      timestamptz default now(),

  unique (user_id, mois, annee)
);

-- ============================================================
-- Sécurité : Row Level Security (RLS)
-- Chaque utilisateur ne voit que ses propres données
-- ============================================================

alter table mandats         enable row level security;
alter table config          enable row level security;
alter table stats_mensuelles enable row level security;

-- Policies mandats
create policy "Voir ses mandats"
  on mandats for select using (auth.uid() = user_id);

create policy "Créer ses mandats"
  on mandats for insert with check (auth.uid() = user_id);

create policy "Modifier ses mandats"
  on mandats for update using (auth.uid() = user_id);

create policy "Supprimer ses mandats"
  on mandats for delete using (auth.uid() = user_id);

-- Policies config
create policy "Voir sa config"
  on config for select using (auth.uid() = user_id);

create policy "Créer sa config"
  on config for insert with check (auth.uid() = user_id);

create policy "Modifier sa config"
  on config for update using (auth.uid() = user_id);

-- Policies stats_mensuelles
create policy "Voir ses stats"
  on stats_mensuelles for select using (auth.uid() = user_id);

create policy "Créer ses stats"
  on stats_mensuelles for insert with check (auth.uid() = user_id);

create policy "Modifier ses stats"
  on stats_mensuelles for update using (auth.uid() = user_id);

-- ============================================================
-- Trigger : updated_at automatique
-- ============================================================

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger mandats_updated_at
  before update on mandats
  for each row execute function set_updated_at();

create trigger config_updated_at
  before update on config
  for each row execute function set_updated_at();

create trigger stats_updated_at
  before update on stats_mensuelles
  for each row execute function set_updated_at();

-- ============================================================
-- Vérification : doit retourner vos 3 tables
-- ============================================================
select table_name from information_schema.tables
where table_schema = 'public'
order by table_name;
