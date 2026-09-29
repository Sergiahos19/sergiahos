# Portfolio — Frontend
React 18 + TypeScript + Vite + Tailwind + React Router. Indépendant du backend (API REST Nest.js + PostgreSQL à venir).

## Lancer
```
npm install
cp .env.example .env
npm run dev      # développement (frontend + API du diagnostic)
npm run build    # production
npm run test:api # tests du diagnostic SEO
```
## Variables
- `VITE_API_URL` : URL de l'API Nest.js
- `VITE_USE_MOCK` : `true` = données mock, `false` = vraie API pour les autres fonctionnalités
- `CORS_ORIGINS` : origines autorisées par l’API, séparées par des virgules

## Structure
`src/` : `pages/` `layouts/` `components/` `services/api.ts` (seul point d'accès API) `data/mock.ts` `hooks/` `types/`

## Connexion à l'API
Mettre `VITE_USE_MOCK=false`. Endpoints attendus : `GET /:resource`, `GET /:resource/:id`, `POST /projects`, `POST /partners`, `POST /requests`, `POST /messages`, `POST /seo-audits`, `POST /auth/login` (retourne `{token, role}`). L’ajout d’une réalisation envoie son nom, sa description et son image encodée en Data URL à `POST /projects`. Les ajouts en mode mock sont conservés dans le navigateur utilisé et ne sont pas publiés sur les autres appareils.

Le diagnostic SEO est servi par `server/index.js` et fonctionne même lorsque `VITE_USE_MOCK=true`. Il vérifie le domaine et la page côté serveur, bloque les destinations réseau privées et analyse les balises title, description, H1, images, viewport, langue, HTTPS et URL canonique. Les sites inexistants ou inaccessibles ne reçoivent aucun score. En production, déployer également cette API Node et configurer `VITE_API_URL` ainsi que `CORS_ORIGINS`. Les autres fonctionnalités peuvent continuer à utiliser le mode mock. Le serveur doit gérer et vérifier les comptes ; aucun mot de passe n'est stocké dans le frontend.

## Profil et coordonnées
Mettre à jour `src/data/profile.ts` avec le téléphone et les URL des réseaux sociaux avant publication. Le portrait est importé depuis `images/profil.jpeg` et l’image d’arrière-plan depuis `images/aplan.jpeg`. L'adresse e-mail du portfolio est définie dans le fichier de profil.
