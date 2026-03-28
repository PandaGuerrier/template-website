# Template Website

Boilerplate AdonisJS v6 + React + Inertia.js avec authentification, gestion des utilisateurs et système de rôles & permissions intégré.

## Stack

- **Backend :** [AdonisJS v6](https://adonisjs.com/)
- **Frontend :** [React 19](https://react.dev/) + [Inertia.js](https://inertiajs.com/)
- **Styling :** [Tailwind CSS v4](https://tailwindcss.com/)
- **Base de données :** [PostgreSQL](https://www.postgresql.org/)
- **Monorepo :** [TurboRepo](https://turbo.build/)
- **Infrastructure :** [Docker](https://www.docker.com/)

## Fonctionnalités incluses

- **Auth complète** — inscription, connexion, déconnexion, réinitialisation de mot de passe, vérification email
- **Gestion des utilisateurs** — CRUD, ban/unban, impersonation admin, invitation par email
- **Rôles & Permissions** — système CASL avec éditeur de rôles dans le dashboard
- **Dashboard admin** — gestion des utilisateurs et des rôles
- **Paramètres utilisateur** — profil, mot de passe, tokens API
- **i18n** — support multilingue (FR/EN)
- **SSR** — rendu côté serveur avec Inertia

## Prérequis

- [Node.js](https://nodejs.org/) v20+
- [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/) & Docker Compose

## Installation

```bash
# 1. Cloner le dépôt
git clone <repo-url>
cd template-website

# 2. Installer les dépendances
pnpm install

# 3. Variables d'environnement
cp apps/web/.env.example apps/web/.env

# 4. Lancer la base de données
docker-compose up -d

# 5. Migrations + seed
cd apps/web
node ace migration:run
node ace db:seed
cd ../..
```

## Démarrage

```bash
pnpm dev
```

Accessible sur `http://localhost:3333`.

Compte admin par défaut (après seed) : voir `apps/web/app/core/database/seeders/user_seeder.ts`.

## Structure

```
template-website/
├── apps/
│   └── web/                  # Application AdonisJS
│       ├── app/
│       │   ├── auth/         # Authentification
│       │   ├── users/        # Utilisateurs, rôles, ban, tokens
│       │   ├── dashboard/    # Admin dashboard (users, roles)
│       │   └── common/       # Composants partagés, layout
│       ├── app/core/
│       │   └── database/     # Migrations & seeders
│       └── config/           # Configuration AdonisJS
└── packages/
    ├── ui/                   # Librairie de composants (shadcn/ui)
    ├── eslint-config/
    └── typescript-config/
```

## Routes principales

| Route | Description |
|---|---|
| `/login` | Connexion |
| `/sign-up` | Inscription |
| `/forgot-password` | Réinitialisation mot de passe |
| `/dashboard/users` | Gestion des utilisateurs (admin) |
| `/dashboard/admin/roles` | Gestion des rôles (admin) |
| `/settings/profile` | Paramètres du profil |
| `/settings/password` | Changement de mot de passe |
| `/settings/tokens` | Tokens API |
