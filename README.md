# Portfolio Sergiahos

Portfolio React 18, TypeScript et Vite. Les réalisations, partenaires et autres contenus publics sont intégrés au frontend ; le site n’utilise ni base de données, ni comptes, ni espace administrateur.

## Développement

```sh
npm install
Copy-Item .env.example .env
npm run dev
```

`npm run dev` lance le site et le petit service Node utilisé uniquement pour l’audit SEO. Pour ne lancer que le frontend : `npm run dev:web`.

## Production

```sh
npm run build
npm run preview
```

Le frontend peut être hébergé comme un site statique. Pour que l’audit SEO puisse analyser les pages de sites externes (que le navigateur ne peut pas lire directement à cause des règles CORS), déployer aussi `server/index.js`, le service sans état dédié à cette seule fonction, puis définir `VITE_API_URL` sur son URL publique suivie de `/api`. Le service n’utilise aucune base de données et ne conserve pas les audits.

Les formulaires préparent les informations saisies dans un message WhatsApp adressé au numéro indiqué dans `src/data/profile.ts`. L’utilisateur doit confirmer l’envoi dans WhatsApp ; le site ne prétend pas envoyer ou stocker les demandes lui-même.

## Configuration

- `VITE_API_URL` : URL du service SEO, par exemple `http://localhost:3000/api` en développement.
- `CORS_ORIGINS` : origines autorisées par le service SEO, séparées par des virgules. Ajouter l’origine du site en production.

Les images des projets et partenaires, ainsi que leurs descriptions, sont référencées dans `src/data/content.ts`.
