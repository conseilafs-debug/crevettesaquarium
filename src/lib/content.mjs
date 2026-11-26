// Chargement des contenus Markdown + génération des fiches espèces + maillage interne automatique.
import fs from 'node:fs';
import path from 'node:path';
import { site } from '../config.mjs';
import { catById } from '../data/categories.mjs';
import { species, groups, speciesMarkdown } from '../data/species.mjs';

// Jetons {{site.name}}, {{legal.editorEmail}}… remplacés au chargement.
const interp = (str) =>
  String(str || '').replace(/\{\{\s*(site|legal)\.(\w+)\s*\}\}/g, (m, ns, key) => {
    if (ns === 'site') return key === 'author' ? site.author.name : String(site[key] ?? m);
    return String(site.legal[key] ?? m);
  });

const LIST_KEYS = ['related', 'products', 'tags', 'sources'];

export function parseFront(raw) {
  raw = raw.replace(/\r/g, '');
  if (!raw.startsWith('---\n')) return { meta: {}, body: raw };
  const end = raw.indexOf('\n---', 4);
  const head = raw.slice(4, end);
  const body = raw.slice(end + 4).replace(/^\n/, '');
  const meta = {};
  for (const l of head.split('\n')) {
    const k = l.match(/^([\w-]+):\s*(.*)$/);
    if (!k) continue;
    let v = k[2].trim();
    if (/^(["']).*\1$/.test(v)) v = v.slice(1, -1);
    meta[k[1]] = v;
  }
  for (const key of LIST_KEYS) {
    if (typeof meta[key] === 'string') {
      meta[key] = key === 'sources' ? meta[key].split(';;').map((s) => s.trim()).filter(Boolean) : meta[key].split(',').map((s) => s.trim()).filter(Boolean);
    }
  }
  return { meta, body };
}

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : p.endsWith('.md') ? [p] : [];
  });

// Vocabulaire pour déduire automatiquement des « tags » depuis le slug (aide au maillage).
const VOCAB = [
  'neocaridina', 'caridina', 'amano', 'tiger', 'sulawesi', 'crystal', 'taiwan', 'cherry', 'velvet', 'dream',
  'ph', 'gh', 'kh', 'tds', 'osmosee', 'robinet', 'remineral', 'temperature', 'chauffage', 'nitrite', 'nitrate',
  'ammoniac', 'cycle', 'cycler', 'filtre', 'exhausteur', 'sol', 'plante', 'mousse', 'eclairage', 'co2', 'test',
  'nourri', 'mange', 'biofilm', 'catappa', 'legume', 'algue', 'reprod', 'graine', 'oeuf', 'bebe', 'mue', 'poisson',
  'betta', 'escargot', 'melanger', 'meurent', 'mort', 'blanche', 'couleur', 'acclimat', 'changement', 'cuivre',
  'litre', 'nano', 'aquarium', 'debut',
];
const deriveTags = (slug) => VOCAB.filter((w) => slug.includes(w));

export function loadPages(contentDir) {
  const pages = [];
  const seen = new Set();

  const add = (raw) => {
    const { meta, file } = raw;
    const body = interp(raw.body);
    for (const k of ['title', 'seo', 'desc', 'quick']) if (meta[k]) meta[k] = interp(meta[k]);
    const slug = meta.slug || path.basename(file || '', '.md');
    if (seen.has(slug)) throw new Error(`Slug en double : ${slug}`);
    seen.add(slug);
    const cat = meta.cat || 'blog';
    const type = meta.type || (cat === 'guides-achat' ? 'guide' : 'article');
    const parent = meta.parent === 'none' ? null : meta.parent || (type === 'pillar' || type === 'page' || type === 'tool' ? null : catById[cat]?.parent || null);
    const page = {
      slug,
      type,
      cat,
      title: meta.title,
      seo: meta.seo || '',
      desc: meta.desc || '',
      quick: meta.quick || '',
      body,
      related: meta.related || [],
      products: meta.products || [],
      parent,
      published: meta.published || site.published,
      updated: meta.updated || site.updated,
      tool: meta.tool || '',
      sources: meta.sources || [],
      noindex: meta.noindex === 'true',
      image: meta.image || '',
      species: meta.species || '',
      tags: deriveTags(slug),
      path: type === 'blog' ? `/blog/${slug}/` : `/${slug}/`,
    };
    if (!page.title) throw new Error(`Titre manquant : ${slug}`);
    if (!page.desc) console.warn(`⚠ description manquante : ${slug}`);
    pages.push(page);
  };

  for (const file of walk(contentDir)) {
    const { meta, body } = parseFront(fs.readFileSync(file, 'utf8'));
    add({ meta, body, file });
  }

  for (const sp of species) {
    add({
      meta: {
        slug: sp.slug,
        cat: 'especes',
        type: 'species',
        title: `Crevette ${sp.name} : fiche complète, paramètres et entretien`,
        seo: `Crevette ${sp.name} : paramètres, entretien, reproduction`,
        desc: `Fiche de la crevette ${sp.name} (${groups[sp.group].short}) : origine, taille, paramètres indicatifs, alimentation, reproduction, compatibilité et erreurs à éviter.`,
        quick: sp.quick,
        parent: groups[sp.group].pillar,
        related: [...(sp.compare || []), groups[sp.group].pillar, 'toutes-les-especes'],
        products: groups[sp.group].products,
        species: sp.slug,
      },
      body: speciesMarkdown(sp),
    });
  }
  return pages;
}

export function buildIndex(pages) {
  const bySlug = new Map(pages.map((p) => [p.slug, p]));
  const children = new Map();
  for (const p of pages) {
    if (p.parent) {
      if (!children.has(p.parent)) children.set(p.parent, []);
      children.get(p.parent).push(p);
    }
  }
  return { bySlug, children };
}

const overlap = (a, b) => a.tags.filter((t) => b.tags.includes(t)).length;

/** Articles connexes : explicites d'abord, puis parent, puis proximité (tags + catégorie). */
export function relatedFor(page, pages, bySlug, n = 6) {
  const out = [];
  const push = (p) => {
    if (p && p.slug !== page.slug && !out.includes(p) && p.type !== 'page') out.push(p);
  };
  page.related.forEach((s) => push(bySlug.get(s)));
  if (page.parent) push(bySlug.get(page.parent));
  const scored = pages
    .filter((p) => p.slug !== page.slug && p.type !== 'page' && p.type !== 'tool' && p.type !== 'blog')
    .map((p) => ({ p, s: overlap(page, p) * 3 + (p.cat === page.cat ? 1 : 0) + (p.parent && p.parent === page.parent ? 1 : 0) }))
    .filter((x) => x.s > 1)
    .sort((a, b) => b.s - a.s || a.p.title.localeCompare(b.p.title));
  for (const { p } of scored) {
    if (out.length >= n) break;
    push(p);
  }
  return out.slice(0, n);
}
