// Gabarits HTML : shell de page, en-tête, pied de page, articles, blocs produits, JSON-LD.
import { site, abs } from '../config.mjs';
import { categories, catById, nav } from '../data/categories.mjs';
import { productCategories, amazonSearch, amazonProduct } from '../data/products.mjs';
import { esc, parseMarkdown, plain, inline } from './md.mjs';
import { logoMark } from './svg.mjs';
import { toolHtml, checklistHtml } from './tools.mjs';
import { relatedFor } from './content.mjs';

export const assetVersion = {};
export const asset = (name) => `/assets/${name}?v=${assetVersion[name] || '1'}`;

export const fmtDate = (iso) =>
  new Date(iso + 'T12:00:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

const AMAZON_NOTICE =
  'Ce site participe au Programme Partenaires d’Amazon EU, un programme conçu pour permettre à des sites de percevoir une rémunération grâce à la création de liens vers Amazon.fr.';

const jsonScript = (data) =>
  `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;

const titleTag = (page) => {
  const t = page.seo || page.title;
  const full = `${t} | ${site.name}`;
  return full.length <= 66 ? full : t;
};

export const ogImage = abs('/images/og-default.png');

/* ---------- Composants ---------- */

export function breadcrumb(crumbs) {
  const items = crumbs
    .map((c, i) =>
      i === crumbs.length - 1
        ? `<li aria-current="page"><span>${esc(c.name)}</span></li>`
        : `<li><a href="${esc(c.url)}">${esc(c.name)}</a></li>`
    )
    .join('');
  const ld = {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      ...(c.url && i < crumbs.length - 1 ? { item: abs(c.url) } : i === crumbs.length - 1 && c.url ? { item: abs(c.url) } : {}),
    })),
  };
  return { html: `<nav class="breadcrumb" aria-label="Fil d’Ariane"><ol>${items}</ol></nav>`, ld };
}

function header(activeCat = '', activePath = '') {
  const links = [
    `<li><a href="/"${activePath === '/' ? ' aria-current="page"' : ''}>Accueil</a></li>`,
    ...nav.map((id) => {
      const c = catById[id];
      return `<li><a href="/${c.slug}/"${activeCat === id ? ' aria-current="true"' : ''}>${esc(c.name)}</a></li>`;
    }),
    `<li><a href="/outils/"${activeCat === 'outils' ? ' aria-current="true"' : ''}>Outils</a></li>`,
  ].join('');
  return `<a class="skip" href="#main">Aller au contenu</a>
<header class="site-header">
<div class="container bar">
<a class="brand" href="/" aria-label="${esc(site.name)} — accueil">${logoMark()}<span>${esc(site.name)}</span></a>
<form class="search" role="search" action="/recherche/" method="get">
<label class="sr-only" for="q-h">Rechercher sur le site</label>
<input id="q-h" name="q" type="search" placeholder="Rechercher : pH, Red Cherry, mue…" autocomplete="off" enterkeyhint="search">
<button type="submit">Rechercher</button>
</form>
<button class="menu-btn" type="button" aria-expanded="false" aria-controls="nav">Menu</button>
</div>
<nav id="nav" class="nav" aria-label="Navigation principale"><div class="container"><ul>${links}</ul></div></nav>
</header>`;
}

function footer() {
  const catLinks = categories
    .filter((c) => c.id !== 'blog')
    .map((c) => `<li><a href="/${c.slug}/">${esc(c.name)}</a></li>`)
    .join('');
  return `<footer class="site-footer">
<div class="container foot-grid">
<div>
<a class="brand brand-foot" href="/">${logoMark()}<span>${esc(site.name)}</span></a>
<p>${esc(site.tagline)}. Un guide indépendant, rédigé pour être utile même si vous n’achetez rien.</p>
</div>
<div><h2 class="foot-title">Catégories</h2><ul>${catLinks}<li><a href="/blog/">Blog</a></li></ul></div>
<div><h2 class="foot-title">Outils gratuits</h2><ul>
<li><a href="/calculateur-nombre-crevettes/">Combien de crevettes ?</a></li>
<li><a href="/calculateur-changement-d-eau/">Changement d’eau</a></li>
<li><a href="/calculateur-volume-aquarium/">Volume d’un aquarium</a></li>
<li><a href="/quelle-crevette-choisir/">Quelle crevette choisir ?</a></li>
<li><a href="/mon-aquarium/">Mon aquarium</a></li>
<li><a href="/checklist-aquarium-crevettes/">Checklist de démarrage</a></li>
</ul></div>
<div><h2 class="foot-title">Le site</h2><ul>
<li><a href="/a-propos/">À propos</a></li>
<li><a href="/sources-et-methode/">Sources et méthode</a></li>
<li><a href="/contact/">Contact</a></li>
<li><a href="/mentions-legales/">Mentions légales</a></li>
<li><a href="/confidentialite/">Confidentialité</a></li>
<li><a href="/cookies/">Cookies</a></li>
<li><a href="/affiliation/">Affiliation Amazon</a></li>
<li><a href="/rss.xml">Flux RSS</a></li>
</ul></div>
</div>
<div class="container foot-bottom">
<p class="amazon-notice">${AMAZON_NOTICE}</p>
<p>© ${site.year} ${esc(site.name)}. Les informations de ce site sont données à titre indicatif et ne remplacent pas l’avis d’un professionnel.</p>
</div>
</footer>`;
}

const adScript = () =>
  site.adsense.enabled
    ? `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${esc(site.adsense.client)}" crossorigin="anonymous"></script>`
    : '';

export const adSlot = (name) =>
  site.adsense.enabled
    ? `<div class="ad-slot" data-slot="${esc(name)}"><ins class="adsbygoogle" style="display:block" data-ad-client="${esc(site.adsense.client)}" data-ad-format="auto" data-full-width-responsive="true"></ins></div>`
    : '';

/** Enveloppe complète d'une page HTML. */
export function shell({ title, desc, path, ogType = 'website', image = ogImage, noindex = false, ld = [], activeCat = '', main, scripts = [], rss = true }) {
  const url = abs(path);
  const robots = noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large';
  const t = title;
  return `<!doctype html>
<html lang="${site.lang}" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(t)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${esc(url)}">
<meta name="robots" content="${robots}">
<meta name="theme-color" content="#0f5257">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
${rss ? `<link rel="alternate" type="application/rss+xml" title="${esc(site.name)}" href="/rss.xml">` : ''}
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:locale" content="${site.locale}">
<meta property="og:type" content="${ogType}">
<meta property="og:title" content="${esc(t)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:image" content="${esc(image)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(t)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${esc(image)}">
<link rel="stylesheet" href="${asset('main.css')}">
<script>document.documentElement.className='js'</script>
${ld.length ? jsonScript({ '@context': 'https://schema.org', '@graph': ld }) : ''}
${adScript()}
</head>
<body>
${header(activeCat, path)}
<main id="main">
${main}
</main>
${footer()}
<script src="${asset('site.js')}" defer></script>
${scripts.map((s) => `<script src="${asset(s)}" defer></script>`).join('\n')}
</body>
</html>`;
}

/* ---------- Blocs produits (Amazon) ---------- */

export function productBlock(keys) {
  const blocks = keys
    .map((k) => {
      const c = productCategories[k];
      if (!c) {
        console.warn(`⚠ catégorie produit inconnue : ${k}`);
        return '';
      }
      const crit = `<ul class="criteria">${c.criteria.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`;
      const items = (c.items || [])
        .map(
          (p) => `<article class="product-card"><h4>${esc(p.name)}</h4>
${p.forTank ? `<p class="for">Pour : ${esc(p.forTank)}</p>` : ''}
${p.pros?.length ? `<p class="pc-label">Points forts</p><ul>${p.pros.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
${p.cons?.length ? `<p class="pc-label">Limites</p><ul>${p.cons.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
<p><a class="btn btn-amazon" href="${esc(amazonProduct(p.asin))}" rel="sponsored nofollow noopener" target="_blank">Voir le produit sur Amazon</a></p></article>`
        )
        .join('');
      return `<div class="product-cat"><h3>${esc(c.label)}</h3>
<p class="pc-label">Critères à vérifier avant d’acheter</p>${crit}
${items ? `<div class="product-grid">${items}</div>` : ''}
<p><a class="btn btn-amazon" href="${esc(amazonSearch(c.q))}" rel="sponsored nofollow noopener" target="_blank">Voir les produits sur Amazon</a></p></div>`;
    })
    .join('');
  return `<section class="products" aria-labelledby="produits"><h2 id="produits">Produits et critères de choix</h2>
<p>Les liens ci-dessous mènent vers Amazon.fr. Aucun prix, aucune note et aucun avis n’est reproduit ici : ils changent souvent, vérifiez-les directement sur la fiche du produit.</p>
${blocks}
<p class="disclosure">${AMAZON_NOTICE} Cela ne change pas le prix que vous payez. <a href="/affiliation/">En savoir plus</a>.</p></section>`;
}

/* ---------- Page « article » ---------- */

const TYPE_LABEL = { pillar: 'Guide complet', guide: 'Guide d’achat', compare: 'Comparatif', species: 'Fiche espèce', blog: 'Dossier', article: 'Guide', tool: 'Outil', page: '' };

const CTA = {
  'bien-debuter': ['Vous cherchez le matériel adapté ?', 'Voir notre guide du matériel pour aquarium à crevettes', '/materiel-aquarium-crevettes/'],
  especes: ['Quelle crevette choisir ?', 'Essayer le guide interactif', '/quelle-crevette-choisir/'],
  aquarium: ['Vous cherchez le matériel adapté ?', 'Voir notre guide du matériel pour aquarium à crevettes', '/materiel-aquarium-crevettes/'],
  'eau-parametres': ['Vérifier votre aquarium', 'Analyser mon aquarium avec l’outil Mon aquarium', '/mon-aquarium/'],
  alimentation: ['Vous cherchez la bonne nourriture ?', 'Lire le guide : quelle nourriture pour crevettes ?', '/nourriture-crevettes/'],
  reproduction: ['Vous voulez estimer la densité de votre bac ?', 'Utiliser le calculateur : combien de crevettes ?', '/calculateur-nombre-crevettes/'],
  cohabitation: ['Un doute sur votre bac ?', 'Analyser mon aquarium avec l’outil Mon aquarium', '/mon-aquarium/'],
  problemes: ['Vérifiez d’abord votre eau', 'Analyser mon aquarium avec l’outil Mon aquarium', '/mon-aquarium/'],
  materiel: ['Vous cherchez le matériel adapté ?', 'Voir notre guide du matériel pour aquarium à crevettes', '/materiel-aquarium-crevettes/'],
  'guides-achat': ['Besoin d’un coup de main pour démarrer ?', 'Suivre le parcours « Je débute : par où commencer ? »', '/je-debute-par-ou-commencer/'],
  blog: ['Pour aller plus loin', 'Lire le guide complet des crevettes d’aquarium', '/crevettes-aquarium/'],
};

const wordCount = (html) => plain(html).split(' ').filter(Boolean).length;

const cardList = (items) =>
  `<ul class="cards">${items
    .map((p) => `<li><a href="${esc(p.path)}"><span class="card-title">${esc(p.title)}</span><span class="card-desc">${esc(p.desc)}</span></a></li>`)
    .join('')}</ul>`;
export { cardList };

function childrenBlock(page, env) {
  let kids;
  if (page.slug === 'crevettes-aquarium') kids = env.pages.filter((p) => p.type === 'pillar' && p.slug !== page.slug);
  else kids = (env.children.get(page.slug) || []).filter((p) => p.slug !== page.slug);
  if (!kids.length) return '';
  const order = categories.map((c) => c.id);
  const byCat = new Map();
  kids.sort((a, b) => order.indexOf(a.cat) - order.indexOf(b.cat) || a.title.localeCompare(b.title, 'fr'));
  for (const k of kids) {
    if (!byCat.has(k.cat)) byCat.set(k.cat, []);
    byCat.get(k.cat).push(k);
  }
  const multi = byCat.size > 1;
  return `<section class="dossier" aria-labelledby="dossier"><h2 id="dossier">${page.slug === 'crevettes-aquarium' ? 'Les grands dossiers' : 'Dans ce dossier'}</h2>${[...byCat.entries()]
    .map(([id, list]) => `${multi ? `<h3>${esc(catById[id].name)}</h3>` : ''}${cardList(list)}`)
    .join('')}</section>`;
}

export function renderPage(page, env) {
  const cat = catById[page.cat] || { id: '', slug: '', name: 'Le site' };
  const ctx = { links: [] };
  const hasProducts = page.products.length > 0;
  ctx.products = (keys) => productBlock(keys);
  if (hasProducts) ctx.beforeFaq = () => productBlock(page.products);
  const parsed = parseMarkdown(page.body, ctx);
  let bodyHtml = parsed.html;
  const toc = parsed.toc.slice();
  const faqIdx = toc.findIndex((t) => /^faq\b/i.test(t.text));
  if (hasProducts && !ctx.productsInserted) {
    bodyHtml += productBlock(page.products);
    ctx.productsInserted = true;
  }
  if (ctx.productsInserted) {
    const entry = { id: 'produits', text: 'Produits et critères de choix' };
    if (faqIdx >= 0) toc.splice(faqIdx, 0, entry);
    else toc.push(entry);
  }
  const dossier = page.type === 'pillar' ? childrenBlock(page, env) : '';
  if (dossier) toc.push({ id: 'dossier', text: page.slug === 'crevettes-aquarium' ? 'Les grands dossiers' : 'Dans ce dossier' });

  const related = relatedFor(page, env.pages, env.bySlug, 6);
  const words = wordCount(bodyHtml);
  const minutes = Math.max(1, Math.round(words / 210));

  // Fil d'Ariane
  const crumbs = [{ name: 'Accueil', url: '/' }];
  if (page.type !== 'page' && page.type !== 'tool') crumbs.push({ name: cat.name, url: `/${cat.slug}/` });
  else if (page.type === 'tool') crumbs.push({ name: 'Outils', url: '/outils/' });
  crumbs.push({ name: page.title.length > 70 ? page.shortTitle || page.title : page.title, url: page.path });
  const bc = breadcrumb(crumbs);

  const image =
    page.type === 'species' ? `/images/species/${page.slug}.svg` : page.type === 'page' ? '' : `/images/cat/${page.cat}.svg`;
  const imageAlt =
    page.type === 'species'
      ? `Illustration stylisée d’une crevette ${page.title.replace(/^Crevette /, '').split(' :')[0]}`
      : `Illustration d’un aquarium planté avec une crevette (thème : ${cat.name.toLowerCase()})`;
  const showMeta = page.type !== 'page';

  const tocHtml =
    toc.length >= 3
      ? `<aside class="toc" aria-label="Sommaire"><details open><summary>Sommaire</summary><ol>${toc
          .map((t) => `<li><a href="#${t.id}">${esc(t.text)}</a></li>`)
          .join('')}</ol></details></aside>`
      : '';

  const toolWidget = page.tool ? (page.tool === 'checklist' ? checklistHtml() : toolHtml[page.tool]?.() || '') : '';

  const ctaTuple = CTA[page.cat];
  const cta =
    page.type === 'page' || page.type === 'tool' || !ctaTuple
      ? ''
      : `<aside class="cta" aria-label="Pour continuer"><p class="cta-title">${esc(ctaTuple[0])}</p><p><a class="cta-link" href="${esc(ctaTuple[2])}">${esc(ctaTuple[1])} →</a></p></aside>`;

  const sources = page.sources.length
    ? `<section class="sources"><h2 id="sources">Sources et références</h2><ul>${page.sources
        .map((s) => {
          const [t, u] = s.split('|').map((x) => x.trim());
          return `<li><a href="${esc(u)}" rel="noopener" target="_blank">${esc(t)}</a></li>`;
        })
        .join('')}</ul></section>`
    : '';

  const methodNote =
    showMeta
      ? `<aside class="method-note"><p><strong>Méthode.</strong> Cette page est rédigée par ${esc(site.author.name)} à partir de sources aquariophiles et scientifiques, sans copier de texte existant. Les valeurs de paramètres sont des <strong>repères</strong> : elles varient selon la souche et la méthode de maintenance. <a href="/sources-et-methode/">Sources et méthode</a>.</p></aside>`
      : '';

  const main = `<div class="container page-wrap">
${bc.html}
<article class="article" itemscope itemtype="https://schema.org/Article">
<header class="article-head${image ? ' has-img' : ''}">
<div>
${showMeta ? `<p class="kicker">${cat.slug ? `<a href="/${cat.slug}/">${esc(cat.name)}</a>` : (page.type === 'tool' ? '<a href="/outils/">Outils</a>' : '')}${TYPE_LABEL[page.type] ? ` · ${TYPE_LABEL[page.type]}` : ''}</p>` : ''}
<h1 itemprop="headline">${esc(page.title)}</h1>
<p class="lead">${inline(page.desc)}</p>
${showMeta ? `<p class="meta">Par <a href="${esc(site.author.url)}">${esc(site.author.name)}</a> · Publié le <time datetime="${page.published}">${fmtDate(page.published)}</time> · Mis à jour le <time datetime="${page.updated}">${fmtDate(page.updated)}</time> · ${minutes} min de lecture</p>` : ''}
</div>
${image ? `<img class="hero-img" src="${image}" alt="${esc(imageAlt)}" width="640" height="400" fetchpriority="high" decoding="async">` : ''}
</header>
${page.quick ? `<aside class="quick" aria-label="Réponse rapide"><p class="quick-title">Réponse rapide</p><p>${inline(page.quick)}</p></aside>` : ''}
${adSlot('after-intro')}
<div class="article-grid${tocHtml ? ' with-toc' : ''}">
${tocHtml}
<div class="prose" itemprop="articleBody">
${bodyHtml.includes('<!--tool-->') ? bodyHtml.replace('<!--tool-->', toolWidget) : bodyHtml + toolWidget}
${dossier}
${sources}
</div>
</div>
${cta}
${related.length ? `<section class="related" aria-labelledby="lire"><h2 id="lire">À lire ensuite</h2>${cardList(related)}</section>` : ''}
${methodNote}
</article>
</div>`;

  const ld = [bc.ld];
  if (page.type !== 'page' && page.type !== 'tool') {
    ld.push({
      '@type': page.type === 'blog' ? 'BlogPosting' : 'Article',
      headline: page.title.slice(0, 110),
      description: page.desc,
      image: [ogImage],
      datePublished: page.published,
      dateModified: page.updated,
      inLanguage: 'fr-FR',
      author: { '@type': 'Organization', name: site.author.name, url: abs(site.author.url) },
      publisher: { '@type': 'Organization', name: site.name, url: site.url },
      mainEntityOfPage: { '@type': 'WebPage', '@id': abs(page.path) },
    });
  }
  if (parsed.faq.length) {
    ld.push({
      '@type': 'FAQPage',
      mainEntity: parsed.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    });
  }

  page._links = ctx.links;
  page._plain = plain(bodyHtml);
  page._toc = toc;
  page._faq = parsed.faq;

  return shell({
    title: titleTag(page),
    desc: page.desc,
    path: page.path,
    ogType: 'article',
    noindex: page.noindex,
    ld,
    activeCat: page.cat,
    main,
    scripts: page.tool || page.type === 'tool' ? ['tools.js'] : [],
  });
}
