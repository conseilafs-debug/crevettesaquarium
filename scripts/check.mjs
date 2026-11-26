// Vérifications post-build : liens, SEO, JSON-LD, Amazon, sitemap, robots.
import fs from 'node:fs';
import path from 'node:path';
const dist = path.resolve('dist');
const TAG = 'amalys-21';
const errors = [], warns = [];
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
const files = walk(dist);
const htmls = files.filter(f => f.endsWith('.html'));
const urlOf = (f) => '/' + path.relative(dist, f).replace(/index\.html$/, '').replace(/\\/g, '/');
const exists = new Set(files.map(f => '/' + path.relative(dist, f).replace(/\\/g, '/')));
const pageUrls = new Set(htmls.map(urlOf));
const inbound = new Map();
let amazonLinks = 0;

for (const f of htmls) {
  const u = urlOf(f);
  const h = fs.readFileSync(f, 'utf8');
  if (u === '/404.html') continue;
  const h1 = (h.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) errors.push(`${u}: ${h1} balise(s) H1`);
  if (!/<title>[^<]{5,}<\/title>/.test(h)) errors.push(`${u}: title manquant`);
  if (!/<meta name="description" content="[^"]{20,}"/.test(h)) errors.push(`${u}: meta description manquante`);
  if (!/<link rel="canonical" href="https?:\/\//.test(h)) errors.push(`${u}: canonical manquant`);
  if (!/property="og:title"/.test(h)) warns.push(`${u}: og:title manquant`);
  for (const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { const j = m[1]; JSON.parse(j); if (/ratingValue|reviewCount|aggregateRating/.test(j)) errors.push(`${u}: données d’avis interdites dans le JSON-LD`); }
    catch { errors.push(`${u}: JSON-LD invalide`); }
  }
  for (const m of h.matchAll(/<img\b[^>]*>/g)) if (!/\balt=/.test(m[0])) errors.push(`${u}: image sans alt`);
  for (const m of h.matchAll(/href="([^"#]+)(#[^"]*)?"/g)) {
    const href = m[1];
    if (/^https?:\/\//.test(href)) {
      if (/amazon\./.test(href)) {
        amazonLinks++;
        if (!href.includes(`tag=${TAG}`)) errors.push(`${u}: lien Amazon sans tag ${TAG}: ${href}`);
        const tags = [...href.matchAll(/tag=([^&]+)/g)].map(x => x[1]);
        if (tags.some(t => t !== TAG)) errors.push(`${u}: autre tag Amazon: ${href}`);
      }
      continue;
    }
    if (/^(mailto:|tel:|javascript:)/.test(href)) continue;
    let p = href.split('?')[0];
    if (!p.startsWith('/')) continue;
    if (exists.has(p) || pageUrls.has(p) || pageUrls.has(p.endsWith('/') ? p : p + '/')) {
      inbound.set(p.endsWith('/') ? p : p, (inbound.get(p) || 0) + 1);
    } else errors.push(`${u}: lien interne cassé → ${href}`);
  }
  if (/\d\s?(€|EUR)/.test(h.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, ''))) warns.push(`${u}: mention de prix (€) détectée — vérifier qu’aucun prix Amazon n’est figé`);
  if (/\[À COMPLÉTER/.test(h)) warns.push(`${u}: champ légal à compléter`);
}

// orphelins
for (const u of pageUrls) {
  if (['/', '/404.html'].includes(u)) continue;
  if (!inbound.get(u)) warns.push(`${u}: page orpheline (aucun lien entrant)`);
}

// sitemap / robots
const sm = path.join(dist, 'sitemap.xml');
if (!fs.existsSync(sm)) errors.push('sitemap.xml absent');
else for (const m of fs.readFileSync(sm, 'utf8').matchAll(/<loc>https?:\/\/[^/]+(\/[^<]*)<\/loc>/g))
  if (!pageUrls.has(m[1])) errors.push(`sitemap: URL inexistante ${m[1]}`);
const rb = path.join(dist, 'robots.txt');
if (!fs.existsSync(rb) || !/Sitemap:/i.test(fs.readFileSync(rb, 'utf8'))) errors.push('robots.txt sans directive Sitemap');
if (!fs.existsSync(path.join(dist, '_headers'))) warns.push('_headers absent');

console.log(`Pages HTML : ${htmls.length} — liens Amazon : ${amazonLinks}`);
warns.slice(0, 40).forEach(w => console.log('⚠ ' + w));
if (warns.length > 40) console.log(`⚠ … ${warns.length - 40} autres avertissements`);
errors.forEach(e => console.log('✖ ' + e));
console.log(errors.length ? `\n${errors.length} erreur(s).` : '\n✔ Aucune erreur bloquante.');
process.exit(errors.length ? 1 : 0);
