// HTML des outils interactifs. La logique (JavaScript) se trouve dans src/scripts/tools.js.
import { esc } from './md.mjs';

const field = (id, label, input, hint = '') =>
  `<div class="field"><label for="${id}">${label}</label>${input}${hint ? `<p class="hint">${hint}</p>` : ''}</div>`;

const select = (id, opts, sel) =>
  `<select id="${id}">${opts.map(([v, l]) => `<option value="${v}"${v === sel ? ' selected' : ''}>${l}</option>`).join('')}</select>`;

const radios = (name, opts) =>
  opts.map(([v, l], i) => `<label class="radio"><input type="radio" name="${name}" value="${v}"${i === 0 ? ' required' : ''}> <span>${l}</span></label>`).join('');

const GROUPS = [
  ['neocaridina', 'Neocaridina (Red Cherry, Blue Velvet, Yellow…)'],
  ['caridina', 'Caridina cantonensis (Crystal, Taiwan Bee, Tiger)'],
  ['amano', 'Amano'],
  ['sulawesi', 'Sulawesi'],
];

const noscript = '<noscript><p class="callout callout-warning">Cet outil a besoin de JavaScript pour calculer. Les explications ci-dessous restent valables sans lui.</p></noscript>';

export const toolHtml = {
  'calc-nombre': () => `<form class="tool" data-tool="calc-nombre" novalidate>
${field('cn-vol', 'Volume du bac (litres)', '<input id="cn-vol" type="number" inputmode="decimal" min="5" max="1000" step="1" value="20">')}
${field('cn-esp', 'Espèce', select('cn-esp', GROUPS, 'neocaridina'))}
${field('cn-dens', 'Densité souhaitée', select('cn-dens', [['0', 'Prudente (démarrage)'], ['1', 'Standard'], ['2', 'Élevée (bac mature et stable)']], '1'))}
<div class="field checkbox"><input id="cn-net" type="checkbox" checked> <label for="cn-net">Déduire sol et décor (environ 20 % du volume)</label></div>
<button class="btn" type="submit">Calculer</button>
<div class="result" role="status" aria-live="polite" data-out></div>${noscript}</form>`,

  'calc-eau': () => `<form class="tool" data-tool="calc-eau" novalidate>
${field('ce-vol', 'Volume d’eau du bac (litres)', '<input id="ce-vol" type="number" inputmode="decimal" min="1" max="1000" step="1" value="30">')}
${field('ce-pct', 'Pourcentage à remplacer', '<input id="ce-pct" type="number" inputmode="decimal" min="1" max="100" step="1" value="15">', 'Pour un bac à crevettes, de petits changements réguliers valent mieux qu’un gros changement rare.')}
<button class="btn" type="submit">Calculer</button>
<div class="result" role="status" aria-live="polite" data-out></div>${noscript}</form>`,

  'calc-volume': () => `<form class="tool" data-tool="calc-volume" novalidate>
${field('cv-l', 'Longueur (cm)', '<input id="cv-l" type="number" inputmode="decimal" min="1" step="0.5" value="40">')}
${field('cv-w', 'Largeur (cm)', '<input id="cv-w" type="number" inputmode="decimal" min="1" step="0.5" value="25">')}
${field('cv-h', 'Hauteur d’eau (cm)', '<input id="cv-h" type="number" inputmode="decimal" min="1" step="0.5" value="25">', 'Mesurez la hauteur d’eau réelle, pas la hauteur de la cuve.')}
<button class="btn" type="submit">Calculer</button>
<div class="result" role="status" aria-live="polite" data-out></div>${noscript}</form>`,

  quiz: () => `<form class="tool" data-tool="quiz" novalidate>
<fieldset><legend>1. Votre niveau</legend>${radios('exp', [['debutant', 'Je débute en aquariophilie'], ['inter', 'J’ai déjà un aquarium stable depuis plus d’un an'], ['avance', 'J’ai déjà de l’expérience avec les crevettes ou l’eau préparée']])}</fieldset>
<fieldset><legend>2. Volume disponible</legend>${radios('vol', [['lt20', 'Moins de 20 L'], ['mid', '20 à 40 L'], ['big', 'Plus de 40 L']])}</fieldset>
<fieldset><legend>3. Votre eau</legend>${radios('eau', [['soft', 'Eau du robinet douce ou moyenne (GH inférieur à 8)'], ['hard', 'Eau du robinet dure (GH supérieur à 8)'], ['unknown', 'Je ne sais pas'], ['osmose', 'Je suis prêt à utiliser de l’eau osmosée']])}</fieldset>
<fieldset><legend>4. Votre objectif</legend>${radios('obj', [['repro', 'Voir une colonie se développer'], ['algue', 'Surtout lutter contre les algues'], ['peu', 'Observer quelques crevettes, sans souci de reproduction']])}</fieldset>
<fieldset><legend>5. Couleur préférée</legend>${radios('col', [['rouge', 'Rouge'], ['bleu', 'Bleu'], ['jaune', 'Jaune ou orange'], ['vert', 'Vert ou brun'], ['noir', 'Noir et blanc, rouge et blanc'], ['any', 'Peu importe']])}</fieldset>
<fieldset><legend>6. Poissons dans le bac ?</legend>${radios('poi', [['non', 'Non, bac dédié aux crevettes'], ['oui', 'Oui, je garde déjà des poissons']])}</fieldset>
<button class="btn" type="submit">Voir ma recommandation</button>
<div class="result" role="status" aria-live="polite" data-out></div>${noscript}</form>`,

  'mon-aquarium': () => `<form class="tool tool-wide" data-tool="mon-aquarium" novalidate>
<div class="grid2">
${field('ma-vol', 'Volume (litres)', '<input id="ma-vol" type="number" inputmode="decimal" min="1" step="1" value="30">')}
${field('ma-esp', 'Espèce', select('ma-esp', GROUPS, 'neocaridina'))}
${field('ma-temp', 'Température (°C)', '<input id="ma-temp" type="number" inputmode="decimal" step="0.5" placeholder="ex. 22">')}
${field('ma-ph', 'pH', '<input id="ma-ph" type="number" inputmode="decimal" step="0.1" placeholder="ex. 7">')}
${field('ma-gh', 'GH (°dGH)', '<input id="ma-gh" type="number" inputmode="decimal" step="0.5" placeholder="ex. 8">')}
${field('ma-kh', 'KH (°dKH)', '<input id="ma-kh" type="number" inputmode="decimal" step="0.5" placeholder="ex. 4">')}
${field('ma-tds', 'TDS (ppm)', '<input id="ma-tds" type="number" inputmode="decimal" step="1" placeholder="ex. 200">')}
${field('ma-n', 'Nombre de crevettes', '<input id="ma-n" type="number" inputmode="decimal" min="0" step="1" placeholder="ex. 15">')}
${field('ma-poi', 'Poissons dans le bac ?', select('ma-poi', [['non', 'Non'], ['oui', 'Oui']], 'non'))}
${field('ma-pla', 'Plantes / mousses', select('ma-pla', [['oui', 'Oui'], ['non', 'Non ou très peu']], 'oui'))}
${field('ma-fil', 'Filtration', select('ma-fil', [['mousse', 'Filtre à mousse / exhausteur'], ['protege', 'Filtre avec entrée protégée'], ['nue', 'Filtre sans protection'], ['aucun', 'Pas de filtre']], 'mousse'))}
</div>
<button class="btn" type="submit">Analyser mon aquarium</button>
<p class="hint">Les champs laissés vides sont ignorés. Cet outil reste informatif : il ne remplace pas l’avis d’un aquariophile qui voit votre bac.</p>
<div class="result" role="status" aria-live="polite" data-out></div>${noscript}</form>`,
};

export const filtersHtml = (cards) => `<form class="tool filters" data-tool="filters" novalidate>
<div class="grid3">
${field('f-niv', 'Niveau', select('f-niv', [['', 'Tous'], ['facile', 'Facile'], ['intermediaire', 'Intermédiaire'], ['avance', 'Avancé']], ''))}
${field('f-grp', 'Famille', select('f-grp', [['', 'Toutes'], ['neocaridina', 'Neocaridina'], ['caridina', 'Caridina'], ['amano', 'Amano'], ['sulawesi', 'Sulawesi']], ''))}
${field('f-col', 'Couleur', select('f-col', [['', 'Toutes'], ['rouge', 'Rouge'], ['bleu', 'Bleu'], ['jaune-orange', 'Jaune / orange'], ['vert-brun', 'Vert / brun'], ['noir-blanc', 'Noir / blanc'], ['autre', 'Autre']], ''))}
${field('f-eau', 'Eau nécessaire', select('f-eau', [['', 'Toutes'], ['robinet', 'Robinet souvent possible'], ['preparee', 'Eau préparée souvent nécessaire']], ''))}
${field('f-rep', 'Reproduction', select('f-rep', [['', 'Toutes'], ['oui', 'Possible en eau douce'], ['non', 'Pas en eau douce']], ''))}
${field('f-tai', 'Taille adulte', select('f-tai', [['', 'Toutes'], ['petite', 'Petite (jusqu’à 3 cm)'], ['grande', 'Plus grande (3 cm et plus)']], ''))}
</div>
<p class="hint" data-count aria-live="polite"></p>
</form>
<ul class="cards species-grid" data-grid>${cards}</ul>`;

export const checklistHtml = () => {
  const groups = [
    ['Avant l’achat', ['J’ai choisi l’espèce (Neocaridina pour débuter)', 'J’ai mesuré mon eau du robinet (GH, KH, pH, TDS)', 'J’ai choisi un volume d’au moins 20 L', 'J’ai trouvé un éleveur ou un vendeur sérieux qui m’indique ses paramètres']],
    ['Matériel', ['Aquarium et support stable', 'Filtre à mousse ou filtre à entrée protégée', 'Sol adapté à l’espèce', 'Thermomètre', 'Couvercle ou protection', 'Tests d’eau (pH, GH/KH, NO2, NO3) et, si possible, un TDS-mètre', 'Conditionneur d’eau si nécessaire', 'Épuisette à mailles fines et tuyau de siphonnage fin']],
    ['Décor', ['Plantes et mousses rincées', 'Racines et pierres inertes préparées', 'Quelques feuilles (catappa, aulne…) rincées']],
    ['Eau et cyclage', ['Eau préparée et stabilisée', 'Bac mis en eau, filtre en marche', 'Cyclage suivi : ammoniaque et nitrites à zéro', 'Température stable']],
    ['Arrivée des crevettes', ['Sachet ouvert et crevettes acclimatées goutte à goutte', 'Introduction sans l’eau du sachet', 'Peu de nourriture les premiers jours']],
    ['Entretien', ['Petits changements d’eau réguliers', 'Contrôle des paramètres au moins une fois par mois', 'Retrait des restes de nourriture', 'Observation hebdomadaire : crevettes actives, mues normales']],
  ];
  return `<div class="tool checklist" data-tool="checklist">${groups
    .map(
      ([t, items], gi) =>
        `<fieldset><legend>${esc(t)}</legend>${items.map((it, i) => `<label class="radio"><input type="checkbox" data-key="c${gi}-${i}"> <span>${esc(it)}</span></label>`).join('')}</fieldset>`
    )
    .join('')}<p class="no-print"><button class="btn" type="button" data-print>Imprimer ou enregistrer en PDF</button> <button class="btn btn-ghost" type="button" data-reset>Tout décocher</button></p></div>`;
};
