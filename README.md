# Portfolio — Frontend
React 18 + TypeScript + Vite + Tailwind + React Router. Indépendant du backend (API REST Nest.js + PostgreSQL à venir).

## Lancer
```
npm install
cp .env.example .env
npm run dev      # développement
npm run build    # production
```
## Variables
- `VITE_API_URL` : URL de l'API Nest.js
- `VITE_USE_MOCK` : `true` = données mock, `false` = vraie API

## Structure
`src/` : `pages/` `layouts/` `components/` `services/api.ts` (seul point d'accès API) `data/mock.ts` `hooks/` `types/`

## Connexion à l'API
Mettre `VITE_USE_MOCK=false`. Endpoints attendus : `GET /:resource`, `GET /:resource/:id`, `POST /requests`, `POST /messages`, `POST /seo-audits`, `POST /auth/login` (retourne `{token, role}`). Le serveur doit gérer et vérifier les comptes ; le mode démo ne fournit pas de connexion et aucun mot de passe n'est stocké dans le frontend.

## Profil et coordonnées
Mettre à jour `src/data/profile.ts` avec le téléphone et les URL des réseaux sociaux avant publication. Le portrait est importé depuis `images/profil.jpeg` et l’image d’arrière-plan depuis `images/aplan.jpeg`. L'adresse e-mail du portfolio est définie dans le fichier de profil.
