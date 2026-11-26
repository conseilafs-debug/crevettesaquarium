// Vues spéciales : accueil, hubs de catégories, outils, recherche, 404, espèces filtrables.
import { site, abs } from '../config.mjs';
import { categories, catById, equipment } from '../data/categories.mjs';
import { species, groups, levelLabel } from '../data/species.mjs';
import { esc } from './md.mjs';
import { shell, breadcrumb, cardList, adSlot } from './render.mjs';
import { filtersHtml } from './tools.mjs';

const link = (slug, text, env) => {
  if (!env.bySlug.has(slug)) console.warn(`⚠ lien d’accueil vers une page inexistante : ${slug}`);
  return `<li><a href="/${slug}/">${esc(text)}</a></li>`;
};
const list = (items, env) => `<ul class="link-list">${items.map(([s, t]) => link(s, t, env)).join('')}</ul>`;

const colorFamily = (sp) => {
  const m = { rouge: 'rouge', bleu: 'bleu', jaune: 'jaune-orange', orange: 'jaune-orange', vert: 'vert-brun', brun: 'vert-brun', 'noir et blanc': 'noir-blanc', 'rouge et blanc': 'rouge' };
  return m[sp.color] || 'autre';
};

export function speciesCards(env, withData = true) {
  return species
    .map((sp) => {
      const g = groups[sp.group];
      const small = parseFloat(sp.size) < 3 || /^2/.test(sp.size) ? 'petite' : 'grande';
      const data = withData
        ? ` data-niveau="${sp.level}" data-groupe="${sp.group}" data-couleur="${colorFamily(sp)}" data-eau="${g.water}" data-repro="${sp.group === 'amano' ? 'non' : 'oui'}" data-taille="${sp.group === 'amano' ? 'grande' : small === 'petite' ? 'petite' : 'grande'}"`
        : '';
      return `<li${data}><a href="/${sp.slug}/"><span class="swatch" style="--c:${sp.hex}" aria-hidden="true"></span><span class="card-title">${esc(sp.name)}</span><span class="card-desc">${esc(g.short)} · ${levelLabel[sp.level]} · ${esc(sp.color)}</span></a></li>`;
    })
    .join('');
}

/* ---------- Accueil ---------- */
export function renderHome(env) {
  const b = (title, items, more = '') => `<section class="block"><h3>${title}</h3>${list(items, env)}${more}</section>`;
  const main = `<section class="hero">
<div class="container hero-inner">
<div class="hero-text">
<h1>Crevettes d’aquarium : le guide complet pour bien débuter</h1>
<p class="hero-sub">Espèces, aquarium, eau, alimentation, reproduction, cohabitation et matériel : tout pour réussir votre aquarium à crevettes.</p>
<p class="hero-intro">Que vous installiez votre premier bac ou que vous cherchiez à affiner votre maintenance, ce site vous accompagne avec des guides pratiques, des repères nuancés (jamais des chiffres présentés comme absolus) et des outils gratuits.</p>
<form class="hero-search" role="search" action="/recherche/" method="get"><label class="sr-only" for="q-hero">Rechercher un sujet</label><input id="q-hero" name="q" type="search" placeholder="Que cherchez-vous ? ex. pH Neocaridina" autocomplete="off"><button type="submit">Rechercher</button></form>
<p class="hero-links"><a class="btn" href="/je-debute-par-ou-commencer/">Je débute : par où commencer ?</a> <a class="btn btn-ghost-light" href="/quelle-crevette-choisir/">Quelle crevette choisir ?</a></p>
</div>
<img class="hero-img-home" src="/images/cat/home.svg" alt="Aquarium planté avec une crevette rouge, illustration" width="640" height="400" fetchpriority="high" decoding="async">
</div>
</section>
<div class="container">
${adSlot('home-top')}
<section class="alert-block" aria-labelledby="pb">
<h2 id="pb">Votre crevette a un problème ?</h2>
<p>Des pistes de diagnostic prudentes : on distingue le problème possible, la cause probable, les vérifications et les actions.</p>
${list(
  [
    ['pourquoi-mes-crevettes-meurent', 'Crevettes mortes'],
    ['crevette-ne-bouge-plus', 'Crevettes qui ne bougent plus'],
    ['problemes-de-mue', 'Problèmes de mue'],
    ['crevettes-qui-disparaissent', 'Crevettes qui disparaissent'],
    ['crevettes-ne-se-reproduisent-pas', 'Crevettes qui ne se reproduisent pas'],
    ['crevettes-mortes-apres-changement-d-eau', 'Mortalité après changement d’eau'],
    ['crevettes-mortes-apres-introduction', 'Mortalité après introduction'],
    ['temperature-aquarium-crevettes', 'Problème de température'],
    ['parametres-eau-crevettes', 'Problème de paramètres'],
  ],
  env
)}
</section>
<div class="blocks">
${b('Débuter avec les crevettes', [
  ['comment-debuter-crevettes-aquarium', 'Comment débuter avec des crevettes d’aquarium'],
  ['quelle-crevette-pour-debuter', 'Quelle crevette choisir pour débuter ?'],
  ['neocaridina-ou-caridina', 'Neocaridina ou Caridina ?'],
  ['quel-aquarium-pour-crevettes', 'Quel aquarium choisir ?'],
  ['materiel-aquarium-crevettes', 'Quel matériel faut-il ?'],
])}
${b('Eau et paramètres', [
  ['ph-neocaridina', 'pH'],
  ['gh-neocaridina', 'GH'],
  ['kh-neocaridina', 'KH'],
  ['tds-neocaridina', 'TDS'],
  ['temperature-aquarium-crevettes', 'Température'],
  ['ammoniac-nitrites-nitrates-crevettes', 'Nitrates et nitrites'],
  ['eau-du-robinet-ou-eau-osmosee', 'Eau du robinet ou osmosée'],
  ['remineraliser-eau-crevettes', 'Reminéralisation'],
])}
${b('Aquarium', [
  ['aquarium-20-litres-crevettes', 'Aquarium 20 litres'],
  ['aquarium-30-litres-crevettes', 'Aquarium 30 litres'],
  ['aquarium-40-litres-crevettes', 'Aquarium 40 litres'],
  ['aquarium-60-litres-crevettes', 'Aquarium 60 litres'],
  ['nano-aquarium-crevettes', 'Nano-aquarium'],
  ['filtre-aquarium-crevettes', 'Filtre'],
  ['sol-neocaridina', 'Sol'],
  ['plantes-aquarium-crevettes', 'Plantes'],
  ['mousse-aquarium-crevettes', 'Mousse'],
  ['eclairage-aquarium-crevettes', 'Éclairage'],
  ['chauffage-aquarium-crevettes', 'Chauffage'],
])}
${b('Reproduction', [
  ['reproduire-neocaridina', 'Reproduction des Neocaridina'],
  ['crevette-grainee', 'Femelle grainée et œufs'],
  ['bebes-crevettes', 'Bébés crevettes'],
  ['selection-couleurs-neocaridina', 'Sélection des couleurs'],
  ['croissance-crevettes', 'Croissance'],
  ['mue-crevettes', 'Mues'],
])}
</div>
<section class="block block-wide" aria-labelledby="esp"><h2 id="esp">Les espèces et variétés</h2>
<p>Une fiche par variété, avec les paramètres indicatifs et les points de vigilance. <a href="/neocaridina/">Neocaridina</a> · <a href="/caridina/">Caridina</a> · <a href="/toutes-les-especes/">Toutes les espèces, avec filtres</a></p>
<ul class="cards species-grid">${speciesCards(env, false)}</ul></section>
<section class="block block-wide" aria-labelledby="mat"><h2 id="mat">Matériel recommandé</h2>
<p>Des catégories de matériel et des critères de choix, plutôt qu’une liste de produits : les liens Amazon sont intégrés dans les guides concernés.</p>
<ul class="chips">${equipment.map((e) => `<li><a href="/${e.slug}/">${esc(e.name)}</a></li>`).join('')}</ul></section>
<section class="block block-wide tools-teaser" aria-labelledby="out"><h2 id="out">Outils gratuits</h2>
<ul class="cards">
<li><a href="/calculateur-nombre-crevettes/"><span class="card-title">Combien de crevettes dans mon aquarium ?</span><span class="card-desc">Une estimation selon le volume et l’espèce.</span></a></li>
<li><a href="/calculateur-changement-d-eau/"><span class="card-title">Calculateur de changement d’eau</span><span class="card-desc">Litres à remplacer selon le pourcentage.</span></a></li>
<li><a href="/calculateur-volume-aquarium/"><span class="card-title">Volume d’un aquarium</span><span class="card-desc">Longueur × largeur × hauteur.</span></a></li>
<li><a href="/quelle-crevette-choisir/"><span class="card-title">Quelle crevette choisir ?</span><span class="card-desc">Six questions, une orientation.</span></a></li>
<li><a href="/mon-aquarium/"><span class="card-title">Mon aquarium</span><span class="card-desc">Points positifs et points à surveiller.</span></a></li>
</ul></section>
<section class="block block-wide" aria-labelledby="dos"><h2 id="dos">Les grands dossiers</h2>${cardList(env.pages.filter((p) => p.type === 'pillar'))}</section>
</div>`;
  const ld = [
    {
      '@type': 'Organization',
      '@id': site.url + '/#organization',
      name: site.name,
      url: site.url,
      logo: { '@type': 'ImageObject', url: abs('/logo-512.png') },
    },
    {
      '@type': 'WebSite',
      '@id': site.url + '/#website',
      url: site.url,
      name: site.name,
      description: site.description,
      inLanguage: 'fr-FR',
      publisher: { '@id': site.url + '/#organization' },
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: site.url + '/recherche/?q={search_term_string}' },
        'query-input': 'required name=search_term_string',
      },
    },
  ];
  return shell({
    title: `${site.name} : le guide complet des crevettes d’aquarium`,
    desc: site.description,
    path: '/',
    ld,
    main,
  });
}

/* ---------- Hubs de catégories ---------- */
export function renderHub(cat, env) {
  const pages = env.pages.filter((p) => p.cat === cat.id && p.type !== 'page');
  const pillar = env.bySlug.get(cat.parent);
  const bc = breadcrumb([{ name: 'Accueil', url: '/' }, { name: cat.name, url: `/${cat.slug}/` }]);
  let content;
  if (cat.id === 'especes') {
    content = `<h2>Neocaridina (facile)</h2><ul class="cards species-grid">${speciesCards(env, false)
      .split('</li>')
      .filter((x) => /Neocaridina/.test(x))
      .map((x) => x + '</li>')
      .join('')}</ul>
<h2>Caridina, Amano et autres</h2><ul class="cards species-grid">${speciesCards(env, false)
      .split('</li>')
      .filter((x) => x && !/Neocaridina/.test(x))
      .map((x) => x + '</li>')
      .join('')}</ul>
<h2>Comparatifs</h2>${cardList(pages.filter((p) => p.type === 'compare' || p.type === 'article'))}
<p><a class="btn" href="/toutes-les-especes/">Toutes les espèces, avec filtres</a></p>`;
  } else if (cat.id === 'materiel') {
    content = `<h2>Les grandes familles de matériel</h2><ul class="cards">${equipment
      .map((e) => {
        const p = env.bySlug.get(e.slug);
        return `<li><a href="/${e.slug}/"><span class="card-title">${esc(e.name)}</span><span class="card-desc">${esc(p ? p.desc : '')}</span></a></li>`;
      })
      .join('')}</ul>${pages.length ? `<h2>Guides généraux</h2>${cardList(pages)}` : ''}`;
  } else {
    const rest = pages.filter((p) => p.type !== 'pillar');
    content = `${pages.some((p) => p.type === 'pillar') ? `<h2>Le guide de référence</h2>${cardList(pages.filter((p) => p.type === 'pillar'))}` : ''}<h2>Tous les articles</h2>${cardList(rest.sort((a, b) => a.title.localeCompare(b.title, 'fr')))}`;
  }
  const main = `<div class="container page-wrap">${bc.html}<header class="article-head"><div><p class="kicker">Catégorie</p><h1>${esc(cat.name)}</h1><p class="lead">${esc(cat.desc)}</p></div><img class="hero-img" src="/images/cat/${cat.id}.svg" alt="Illustration d’un aquarium à crevettes — ${esc(cat.name)}" width="640" height="400" decoding="async"></header>
${pillar && pillar.cat !== cat.id ? `<aside class="quick"><p class="quick-title">Guide de référence</p><p><a href="${pillar.path}">${esc(pillar.title)}</a></p></aside>` : ''}
${content}</div>`;
  return shell({
    title: `${cat.name} : guides pour aquarium à crevettes | ${site.name}`,
    desc: cat.desc,
    path: `/${cat.slug}/`,
    ld: [bc.ld, { '@type': 'CollectionPage', name: cat.name, description: cat.desc, url: abs(`/${cat.slug}/`) }],
    activeCat: cat.id,
    main,
  });
}

/* ---------- Toutes les espèces (filtres) ---------- */
export function renderSpeciesIndex(env) {
  const bc = breadcrumb([{ name: 'Accueil', url: '/' }, { name: 'Espèces', url: '/especes/' }, { name: 'Toutes les espèces', url: '/toutes-les-especes/' }]);
  const main = `<div class="container page-wrap">${bc.html}<header class="article-head"><div><p class="kicker"><a href="/especes/">Espèces</a></p><h1>Toutes les espèces de crevettes d’aquarium</h1><p class="lead">Filtrez par niveau, famille, couleur, eau nécessaire ou reproduction pour trouver la crevette qui correspond à votre projet.</p></div></header>
${filtersHtml(speciesCards(env, true))}
<p class="hint">Les niveaux de difficulté et les besoins en eau sont des repères qui varient selon la souche. Pas sûr de votre choix ? <a href="/quelle-crevette-choisir/">Essayez le guide interactif</a>.</p></div>`;
  return shell({
    title: `Toutes les espèces de crevettes d’aquarium (avec filtres) | ${site.name}`,
    desc: 'Liste filtrable des crevettes d’aquarium d’eau douce : Neocaridina, Caridina, Amano, Tiger, Sulawesi. Filtrez par niveau, couleur, eau et reproduction.',
    path: '/toutes-les-especes/',
    ld: [bc.ld],
    activeCat: 'especes',
    main,
    scripts: ['tools.js'],
  });
}

/* ---------- Hub des outils ---------- */
export function renderToolsHub(env) {
  const tools = env.pages.filter((p) => p.type === 'tool');
  const bc = breadcrumb([{ name: 'Accueil', url: '/' }, { name: 'Outils', url: '/outils/' }]);
  const extra = [
    { path: '/toutes-les-especes/', title: 'Toutes les espèces (filtres)', desc: 'Filtrez les fiches par niveau, famille, couleur, eau et reproduction.' },
    { path: '/recherche/', title: 'Recherche sur le site', desc: 'Retrouvez espèces, articles, paramètres, matériel et problèmes.' },
  ];
  const main = `<div class="container page-wrap">${bc.html}<header class="article-head"><div><p class="kicker">Gratuit, sans inscription</p><h1>Outils gratuits pour votre aquarium à crevettes</h1><p class="lead">Calculateurs et guides interactifs : ils donnent des estimations et des repères, pas des règles absolues.</p></div></header>${cardList([...tools, ...extra])}</div>`;
  return shell({
    title: `Outils gratuits pour aquarium à crevettes | ${site.name}`,
    desc: 'Calculateurs gratuits : nombre de crevettes, changement d’eau, volume d’aquarium, guide interactif pour choisir sa crevette et analyse de votre aquarium.',
    path: '/outils/',
    ld: [bc.ld],
    activeCat: 'outils',
    main,
  });
}

/* ---------- Recherche ---------- */
export function renderSearch() {
  const main = `<div class="container page-wrap"><header class="article-head"><div><h1>Rechercher sur le site</h1><p class="lead">Espèces, articles, paramètres, matériel, problèmes : tapez quelques mots.</p></div></header>
<form class="search search-page" role="search" action="/recherche/" method="get"><label class="sr-only" for="q-s">Votre recherche</label><input id="q-s" name="q" type="search" placeholder="ex. pH Neocaridina, crevette blanche, filtre" autocomplete="off" autofocus><button type="submit">Rechercher</button></form>
<p id="search-status" class="hint" role="status" aria-live="polite"></p>
<ul id="search-results" class="cards"></ul>
<noscript><p>La recherche nécessite JavaScript. Parcourez les <a href="/bien-debuter/">catégories</a> ou le <a href="/crevettes-aquarium/">guide complet</a>.</p></noscript></div>`;
  return shell({
    title: `Recherche | ${site.name}`,
    desc: 'Recherchez dans les guides sur les crevettes d’aquarium.',
    path: '/recherche/',
    noindex: true,
    main,
    scripts: ['search.js'],
  });
}

/* ---------- 404 ---------- */
export function render404(env) {
  const popular = ['quelle-crevette-pour-debuter', 'parametres-neocaridina', 'pourquoi-mes-crevettes-meurent', 'quel-aquarium-pour-crevettes', 'filtre-aquarium-crevettes']
    .map((s) => env.bySlug.get(s))
    .filter(Boolean);
  const main = `<div class="container page-wrap"><header class="article-head"><div><h1>Oups, cette crevette s’est cachée !</h1><p class="lead">La page demandée n’existe pas ou a changé d’adresse. Essayez la recherche, une catégorie ou un article populaire.</p></div></header>
<form class="search search-page" role="search" action="/recherche/" method="get"><label class="sr-only" for="q-4">Rechercher</label><input id="q-4" name="q" type="search" placeholder="Rechercher sur le site" autocomplete="off"><button type="submit">Rechercher</button></form>
<h2>Catégories</h2><ul class="chips">${categories.map((c) => `<li><a href="/${c.slug}/">${esc(c.name)}</a></li>`).join('')}</ul>
<h2>Articles populaires</h2>${cardList(popular)}
<p><a class="btn" href="/">Retour à l’accueil</a></p></div>`;
  return shell({ title: `Page introuvable | ${site.name}`, desc: 'Page introuvable.', path: '/404.html', noindex: true, main });
}
