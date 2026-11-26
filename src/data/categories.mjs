// Catégories du site, navigation principale et pilier « parent » par défaut.

export const categories = [
  {
    id: 'bien-debuter',
    slug: 'bien-debuter',
    name: 'Bien débuter',
    parent: 'debuter-aquarium-crevettes',
    desc: 'Le parcours pas à pas pour démarrer un aquarium à crevettes sans erreur coûteuse : choix de l’espèce, du bac, de l’eau, acclimatation.',
  },
  {
    id: 'especes',
    slug: 'especes',
    name: 'Espèces',
    parent: 'neocaridina',
    desc: 'Neocaridina, Caridina, Amano, Tiger, Sulawesi : une fiche détaillée par variété, avec paramètres indicatifs, points de vigilance et comparatifs.',
  },
  {
    id: 'aquarium',
    slug: 'aquarium',
    name: 'Aquarium',
    parent: 'aquarium-crevettes',
    desc: 'Volume, sol, plantes, mousse, éclairage, chauffage : choisir et installer un bac adapté aux crevettes.',
  },
  {
    id: 'eau-parametres',
    slug: 'eau-parametres',
    name: 'Eau & paramètres',
    parent: 'parametres-eau-crevettes',
    desc: 'pH, GH, KH, TDS, température, nitrites, eau du robinet ou osmosée, cyclage : comprendre l’eau sans se tromper de combat.',
  },
  {
    id: 'alimentation',
    slug: 'alimentation',
    name: 'Alimentation',
    parent: 'alimentation-crevettes',
    desc: 'Que donner à manger aux crevettes, en quelle quantité, à quelle fréquence, et comment éviter la suralimentation.',
  },
  {
    id: 'reproduction',
    slug: 'reproduction',
    name: 'Reproduction',
    parent: 'reproduction-crevettes',
    desc: 'Femelles grainées, œufs, bébés, croissance, mues, sélection des couleurs : tout sur la reproduction des crevettes d’eau douce.',
  },
  {
    id: 'cohabitation',
    slug: 'cohabitation',
    name: 'Cohabitation',
    parent: 'cohabitation-crevettes',
    desc: 'Poissons, escargots, mélange de variétés : ce qui peut cohabiter avec des crevettes, et à quelles conditions.',
  },
  {
    id: 'problemes',
    slug: 'problemes',
    name: 'Problèmes',
    parent: 'problemes-crevettes',
    desc: 'Crevettes mortes, immobiles, qui ne se reproduisent pas, mues ratées : des pistes de diagnostic prudentes et des actions concrètes.',
  },
  {
    id: 'materiel',
    slug: 'materiel',
    name: 'Matériel',
    parent: 'aquarium-crevettes',
    desc: 'Les grandes familles de matériel utiles pour un aquarium à crevettes, avec renvoi vers le guide détaillé de chaque catégorie.',
  },
  {
    id: 'guides-achat',
    slug: 'guides-achat',
    name: 'Guides d’achat',
    parent: 'aquarium-crevettes',
    desc: 'Des guides d’aide à la décision (critères, erreurs à éviter, usages) avant de choisir un produit.',
  },
  {
    id: 'blog',
    slug: 'blog',
    name: 'Blog',
    parent: 'crevettes-aquarium',
    desc: 'Dossiers, conseils saisonniers et analyses complémentaires aux guides.',
  },
];

export const catById = Object.fromEntries(categories.map((c) => [c.id, c]));

// Ordre de la navigation principale (l’accueil est ajouté en tête par le gabarit).
export const nav = [
  'bien-debuter',
  'especes',
  'aquarium',
  'eau-parametres',
  'alimentation',
  'reproduction',
  'cohabitation',
  'problemes',
  'materiel',
  'guides-achat',
  'blog',
];

// Familles de matériel présentées sur la page /materiel/ (chaque entrée renvoie vers un guide existant).
export const equipment = [
  { name: 'Filtres protégés (mousse sur l’entrée)', slug: 'filtre-aquarium-crevettes' },
  { name: 'Filtres exhausteurs', slug: 'filtre-exhausteur-ou-filtre-classique' },
  { name: 'Pompes à air', slug: 'pompe-a-air-aquarium-crevettes' },
  { name: 'Tests d’eau', slug: 'tests-eau-crevettes' },
  { name: 'Tests GH/KH', slug: 'test-gh-kh-crevettes' },
  { name: 'Tests nitrites / nitrates', slug: 'test-no2-no3-crevettes' },
  { name: 'TDS-mètres', slug: 'tds-metre-crevettes' },
  { name: 'Thermomètres', slug: 'thermometre-aquarium-crevettes' },
  { name: 'Chauffages', slug: 'chauffage-aquarium-crevettes' },
  { name: 'Éclairages', slug: 'eclairage-aquarium-crevettes' },
  { name: 'Substrats (sols)', slug: 'sol-neocaridina' },
  { name: 'Mousses', slug: 'mousse-aquarium-crevettes' },
  { name: 'Nourriture', slug: 'nourriture-crevettes' },
  { name: 'Feuilles (catappa…)', slug: 'feuilles-catappa-crevettes' },
  { name: 'Pierres et racines', slug: 'pierres-racines-aquarium-crevettes' },
  { name: 'Épuisettes', slug: 'epuisette-crevettes' },
  { name: 'Tuyaux et siphons', slug: 'siphon-tuyau-changement-eau' },
  { name: 'Accessoires d’acclimatation', slug: 'kit-acclimatation-crevettes' },
  { name: 'Reminéralisants', slug: 'remineralisants-crevettes' },
];
