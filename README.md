# Crevettes Aquarium — site statique

Site éditorial français sur les crevettes d’aquarium d’eau douce, avec affiliation Amazon.fr (tracking ID `amalys-21`).
Générateur Node sans dépendance : Markdown → HTML statique dans `dist/`.

## Commandes

```bash
npm run build     # génère dist/
npm run check     # vérifie liens, SEO, JSON-LD, liens Amazon, sitemap, robots
npm run dev       # build + serveur local http://localhost:8788
node scripts/suggest-links.mjs <slug>   # idées de maillage interne
```

## Déploiement : GitHub + Cloudflare Pages (adresse *.pages.dev)

Aucun domaine n’est acheté ni configuré.

1. Créez un dépôt GitHub vide, puis :
   ```bash
   git init && git add . && git commit -m "Site crevettes"
   git branch -M main
   git remote add origin https://github.com/<compte>/<depot>.git
   git push -u origin main
   ```
2. Cloudflare → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → choisissez le dépôt.
3. Réglages de build :
   - Framework preset : **None**
   - Build command : `npm run build`
   - Build output directory : `dist`
   - Variables d’environnement : `NODE_VERSION` = `22`, et `SITE_URL` = l’adresse finale, par ex. `https://<projet>.pages.dev` (utilisée pour canonical, sitemap, Open Graph).
4. Déployez, puis relancez un déploiement si vous avez dû corriger `SITE_URL` après coup.

## À compléter avant la mise en ligne

- **Mentions légales, contact, confidentialité** : remplacez les champs `[À COMPLÉTER…]` dans `src/config.mjs` (`legal`). `npm run check` les signale.
- **Auteur** : `site.author` dans `src/config.mjs`.
- **Produits Amazon** : aucun ASIN n’a été saisi, car aucun n’a pu être vérifié. Les blocs produits affichent des critères de choix et un lien de recherche Amazon.fr balisé `tag=amalys-21`. Pour ajouter un produit réel, renseignez `items` dans `src/data/products.mjs` avec `amazonProduct('<ASIN vérifié>')`, sans prix ni note figés.
- **AdSense** : `site.adsense.enabled` dans `src/config.mjs` (désactivé par défaut).
- Mention d’affiliation obligatoire : déjà présente dans le pied de page et sur `/affiliation/`.

## Structure

- `src/content/` : pages Markdown (une par fichier, front matter en tête).
- `src/data/` : catégories, espèces (les 16 fiches espèces sont générées), produits.
- `src/lib/` : parseur Markdown, rendu, SVG, outils.
- `public/` : favicon, icônes, image Open Graph.
