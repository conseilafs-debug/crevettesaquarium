// Générateur statique : lit src/content (Markdown) + src/data, produit dist/ (prêt pour Cloudflare Pages).
// Aucune dépendance : Node 18+ suffit.  Usage : npm run build
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { site, abs } from './src/config.mjs';
import { categories, catById } from './src/data/categories.mjs';
import { species } from './src/data/species.mjs';
import { loadPages, buildIndex } from './src/lib/content.mjs';
import { renderPage, assetVersion } from './src/lib/render.mjs';
import { renderHome, renderHub, renderSpeciesIndex, renderToolsHub, renderSearch, render404 } from './src/lib/views.mjs';
import { sceneSvg, speciesSvg, faviconSvg, scenes } from './src/lib/svg.mjs';

const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, 'dist');
const t0 = Date.now();

const write = (rel, data) => {
  const f = path.join(dist, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, data);
};
const copyDir = (from, to) => {
  if (!fs.existsSync(from)) return;
  for (const e of fs.readdirSync(from, { withFileTypes: true })) {
    const a = path.join(from, e.name);
    const b = path.join(to, e.name);
    if (e.isDirectory()) {
      fs.mkdirSync(b, { recursive: true });
      copyDir(a, b);
    } else {
      fs.mkdirSync(path.dirname(b), { recursive: true });
      fs.copyFileSync(a, b);
    }
  }
};

// 1) Nettoyage + fichiers statiques
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });
copyDir(path.join(root, 'public'), dist);

// 2) Assets (CSS minifié + scripts) avec empreinte pour le cache
const minCss = (s) =>
  s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').replace(/\s*([{}:;,>])\s*/g, '$1').replace(/;}/g, '}').trim();
const assetDefs = [
  ['main.css', path.join(root, 'src/styles/main.css'), minCss],
  ['site.js', path.join(root, 'src/scripts/site.js'), (s) => s],
  ['tools.js', path.join(root, 'src/scripts/tools.js'), (s) => s],
  ['search.js', path.join(root, 'src/scripts/search.js'), (s) => s],
];
for (const [name, file, fn] of assetDefs) {
  const out = fn(fs.readFileSync(file, 'utf8'));
  assetVersion[name] = crypto.createHash('md5').update(out).digest('hex').slice(0, 8);
  write(`assets/${name}`, out);
}

// 3) Images générées (SVG)
write('favicon.svg', faviconSvg());
for (const id of Object.keys(scenes)) write(`images/cat/${id}.svg`, sceneSvg({ scene: id }));
write('images/cat/home.svg', sceneSvg({ scene: 'default', label: 'Illustration d’un aquarium planté avec une crevette rouge' }));
for (const sp of species) write(`images/species/${sp.slug}.svg`, speciesSvg(sp));

// 4) Contenu
const pages = loadPages(path.join(root, 'src/content'));
const { bySlug, children } = buildIndex(pages);
const env = { pages, bySlug, children };

const reserved = new Set(['recherche', 'outils', 'toutes-les-especes', 'assets', 'images', 'blog', ...categories.map((c) => c.slug)]);
for (const p of pages) {
  if (p.type !== 'blog' && reserved.has(p.slug) && p.slug !== 'toutes-les-especes') throw new Error(`Slug réservé : ${p.slug}`);
  if (p.slug === 'toutes-les-especes') throw new Error('Le slug toutes-les-especes est généré automatiquement.');
}
// Vérification des références parent / related
let warnings = 0;
for (const p of pages) {
  if (p.parent && !bySlug.has(p.parent)) { console.warn(`⚠ parent introuvable (${p.slug}) : ${p.parent}`); warnings++; }
  for (const r of p.related) if (!bySlug.has(r) && r !== 'toutes-les-especes') { console.warn(`⚠ related introuvable (${p.slug}) : ${r}`); warnings++; }
}

// 5) Rendu des pages
const generated = []; // { path, lastmod, noindex }
const emit = (urlPath, html, meta = {}) => {
  const rel = urlPath.endsWith('.html') ? urlPath.slice(1) : path.join(urlPath, 'index.html');
  write(rel, html);
  generated.push({ path: urlPath, ...meta });
};

emit('/', renderHome(env), { lastmod: site.updated });
for (const c of categories) emit(`/${c.slug}/`, renderHub(c, env), { lastmod: site.updated });
emit('/toutes-les-especes/', renderSpeciesIndex(env), { lastmod: site.updated });
emit('/outils/', renderToolsHub(env), { lastmod: site.updated });
emit('/recherche/', renderSearch(), { noindex: true });
write('404.html', render404(env));
for (const p of pages) emit(p.path, renderPage(p, env), { lastmod: p.updated, noindex: p.noindex });

// 6) Index de recherche
const search = pages
  .filter((p) => p.type !== 'page' || ['a-propos', 'sources-et-methode'].includes(p.slug))
  .map((p) => ({
    t: p.title,
    u: p.path,
    c: p.type === 'tool' ? 'Outils' : p.type === 'page' ? 'Le site' : catById[p.cat]?.name || '',
    d: p.desc,
    h: [...(p._toc || []).map((x) => x.text), ...(p._faq || []).map((x) => x.q)].join(' | '),
    k: [p.slug.replace(/-/g, ' '), ...p.tags, p.species ? 'crevette espece variete fiche' : ''].join(' '),
  }));
search.push(
  { t: 'Toutes les espèces', u: '/toutes-les-especes/', c: 'Espèces', d: 'Liste filtrable des espèces et variétés.', h: '', k: 'especes varietes filtres couleur niveau' },
  { t: 'Outils gratuits', u: '/outils/', c: 'Outils', d: 'Calculateurs et guides interactifs.', h: '', k: 'outils calculateur' }
);
write('search-index.json', JSON.stringify(search));

// 7) Sitemap, robots, RSS, en-têtes Cloudflare
const urls = generated.filter((g) => !g.noindex);
write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((g) => `<url><loc>${abs(g.path)}</loc>${g.lastmod ? `<lastmod>${g.lastmod}</lastmod>` : ''}</url>`)
    .join('\n')}\n</urlset>\n`
);
write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${abs('/sitemap.xml')}\n`);

const xml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const feed = pages
  .filter((p) => p.type !== 'page' && p.type !== 'tool')
  .sort((a, b) => (a.type === 'blog' ? 0 : 1) - (b.type === 'blog' ? 0 : 1) || b.updated.localeCompare(a.updated))
  .slice(0, 40);
write(
  'rss.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${xml(site.name)}</title><link>${site.url}</link><description>${xml(site.description)}</description><language>fr-FR</language><atom:link href="${abs('/rss.xml')}" rel="self" type="application/rss+xml"/>\n${feed
    .map((p) => `<item><title>${xml(p.title)}</title><link>${abs(p.path)}</link><guid>${abs(p.path)}</guid><pubDate>${new Date(p.published + 'T12:00:00Z').toUTCString()}</pubDate><description>${xml(p.desc)}</description></item>`)
    .join('\n')}\n</channel></rss>\n`
);

write(
  '_headers',
  `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  X-Frame-Options: SAMEORIGIN

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/images/*
  Cache-Control: public, max-age=604800

/search-index.json
  Cache-Control: public, max-age=3600
`
);

const sec = ((Date.now() - t0) / 1000).toFixed(1);
console.log(`✔ ${generated.length} pages générées (${pages.length} contenus) dans dist/ en ${sec}s — ${warnings} avertissement(s).`);
console.log(`  URL de base : ${site.url}`);
