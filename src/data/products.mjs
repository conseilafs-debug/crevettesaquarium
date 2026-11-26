// Produits et catégories Amazon.
//
// RÈGLES (cahier des charges) :
//  - Aucun ASIN inventé. Un produit n'apparaît que s'il est ajouté ici avec un VRAI ASIN vérifié à la main.
//  - Aucun prix statique, aucune note, aucun avis.
//  - Tant que `items` est vide, le site affiche la catégorie + les critères de choix + un lien de
//    recherche Amazon.fr balisé avec le tracking ID (amalys-21). Ce lien n'invente aucun produit.
//
// Pour ajouter un vrai produit dans une catégorie :
//   items: [{
//     asin: 'B0XXXXXXXX',            // ASIN réel, vérifié sur amazon.fr
//     name: 'Nom exact du produit',
//     forTank: 'Pour quel aquarium (ex. 20 à 40 L)',
//     pros: ['avantage 1', 'avantage 2'],
//     cons: ['limite 1'],
//     image: '/images/products/xxx.jpg' // seulement si l'image est utilisable légalement (sinon laisser vide)
//   }]
// Le lien généré sera https://www.amazon.fr/dp/ASIN?tag=amalys-21

import { site } from '../config.mjs';

export const amazonSearch = (q) =>
  `https://${site.amazonHost}/s?k=${encodeURIComponent(q)}&tag=${site.amazonTag}`;
export const amazonProduct = (asin) => `https://${site.amazonHost}/dp/${asin}?tag=${site.amazonTag}`;

export const productCategories = {
  filtre: {
    label: 'Filtres adaptés aux crevettes',
    q: 'filtre à mousse aquarium crevettes',
    criteria: [
      'Entrée d’eau protégée par une mousse ou une crépine fine : les juvéniles ne doivent pas pouvoir être aspirés.',
      'Débit modéré ou réglable, proportionné au volume du bac.',
      'Entretien simple : rinçage de la mousse dans l’eau du bac, jamais sous le robinet.',
      'Bruit et consommation raisonnables si le bac est dans une pièce de vie.',
    ],
    items: [],
  },
  exhausteur: {
    label: 'Filtres exhausteurs (à air) et mousses',
    q: 'filtre exhausteur mousse aquarium',
    criteria: [
      'Taille de la mousse adaptée au volume du bac.',
      'Fonctionne avec une pompe à air : prévoir pompe, tuyau, clapet anti-retour.',
      'Surface de mousse importante : bonne colonisation bactérienne et bébés protégés.',
    ],
    items: [],
  },
  'pompe-air': {
    label: 'Pompes à air et accessoires',
    q: 'pompe à air aquarium silencieuse',
    criteria: [
      'Débit réglable et fonctionnement silencieux.',
      'Clapet anti-retour pour éviter le retour d’eau en cas de coupure.',
      'Tuyau souple en silicone, diffuseur ou pierre si besoin d’oxygénation.',
    ],
    items: [],
  },
  chauffage: {
    label: 'Chauffages pour petits aquariums',
    q: 'chauffage aquarium réglable 25W',
    criteria: [
      'Puissance proportionnée au volume (un chauffage trop puissant en petit bac fait osciller la température).',
      'Thermostat intégré et réglable avec une bonne précision.',
      'Fonctionnement toujours immergé, protection contre les contacts avec les crevettes.',
    ],
    items: [],
  },
  thermometre: {
    label: 'Thermomètres d’aquarium',
    q: 'thermomètre aquarium digital',
    criteria: [
      'Lecture facile et précision suffisante (la stabilité compte plus que la décimale).',
      'Sonde ou ventouse stable, discrète dans le bac.',
      'Possibilité de contrôler la température avec un second thermomètre si le bac est important.',
    ],
    items: [],
  },
  'test-ph': {
    label: 'Tests pH',
    q: 'test pH aquarium gouttes',
    criteria: [
      'Tests en gouttes plutôt que bandelettes si vous cherchez une lecture plus fiable.',
      'Plage de mesure adaptée (eau douce, valeurs entre 6 et 8).',
      'Coût par test et date de péremption.',
    ],
    items: [],
  },
  'test-ghkh': {
    label: 'Tests GH / KH',
    q: 'test GH KH aquarium gouttes',
    criteria: [
      'Test en gouttes : on compte les gouttes jusqu’au virage de couleur, résultat directement en °dGH / °dKH.',
      'Bonne lisibilité du virage de couleur.',
      'Nombre de tests par flacon (important pour le coût par mesure).',
    ],
    items: [],
  },
  'test-no': {
    label: 'Tests nitrites / nitrates (NO2 / NO3)',
    q: 'test nitrite nitrate aquarium gouttes',
    criteria: [
      'Un test NO2 spécifique, lisible aux faibles valeurs.',
      'Un test NO3 lisible entre 0 et 40 mg/L environ.',
      'Fiabilité de l’échelle de couleurs et date de péremption.',
    ],
    items: [],
  },
  tds: {
    label: 'TDS-mètres',
    q: 'TDS mètre testeur eau',
    criteria: [
      'Étalonnage possible ou précision annoncée raisonnable.',
      'Rinçage de la sonde entre deux mesures, appareil étanche ou résistant aux éclaboussures.',
      'Affichage en ppm (certains appareils affichent aussi en µS/cm).',
    ],
    items: [],
  },
  sol: {
    label: 'Substrats pour aquarium à crevettes',
    q: 'sol aquarium crevettes substrat',
    criteria: [
      'Type adapté à l’espèce : sol neutre ou sable fin pour Neocaridina, sol technique tamponnant pour Caridina.',
      'Granulométrie fine, qui ne blesse pas et se laisse coloniser par le biofilm.',
      'Sérieux de la description : composition et effet sur l’eau explicités par le fabricant.',
    ],
    items: [],
  },
  mousse: {
    label: 'Mousses d’aquarium',
    q: 'mousse aquarium java moss crevettes',
    criteria: [
      'Espèce de mousse adaptée à l’éclairage et à la température.',
      'Origine saine, absence d’escargots indésirables ou de traitements douteux : rincer avant introduction.',
      'Quantité adaptée au volume du bac.',
    ],
    items: [],
  },
  plantes: {
    label: 'Plantes pour aquarium à crevettes',
    q: 'plantes aquarium crevettes faciles',
    criteria: [
      'Plantes robustes et sans exigences fortes de CO2 ou de lumière.',
      'Origine culture in vitro ou garantie sans pesticide (cuivre, insecticides) dont les crevettes sont très sensibles.',
      'Quarantaine et rinçage conseillés avant introduction.',
    ],
    items: [],
  },
  eclairage: {
    label: 'Éclairages LED pour petit aquarium',
    q: 'éclairage LED aquarium plantes nano',
    criteria: [
      'Intensité réglable et minuterie pour éviter la prolifération d’algues.',
      'Faible dégagement de chaleur (bac de petit volume).',
      'Longueur adaptée au bac.',
    ],
    items: [],
  },
  nourriture: {
    label: 'Nourriture pour crevettes',
    q: 'nourriture crevettes aquarium',
    criteria: [
      'Composition lisible : matières végétales, minéraux, absence de cuivre ajouté.',
      'Format adapté (poudre ou micro-granulés pour juvéniles, granulés ou sticks pour adultes).',
      'Petit conditionnement, à renouveler régulièrement.',
    ],
    items: [],
  },
  catappa: {
    label: 'Feuilles et cônes (catappa, aulne…)',
    q: 'feuilles catappa aquarium crevettes',
    criteria: [
      'Feuilles séchées, propres, sans traitement.',
      'Quantité raisonnable : la feuille se dégrade et nourrit le biofilm.',
      'Rinçage avant usage.',
    ],
    items: [],
  },
  pierres: {
    label: 'Pierres et racines',
    q: 'racines pierres aquarium décoration crevettes',
    criteria: [
      'Pierres inertes (qui n’augmentent pas fortement GH/KH) pour les Caridina ; pierres calcaires à éviter dans ce cas.',
      'Racines préparées, sans résine ni traitement, trempées avant usage.',
      'Surface irrégulière : support pour le biofilm et abris pour les mues.',
    ],
    items: [],
  },
  epuisette: {
    label: 'Épuisettes à mailles fines',
    q: 'épuisette aquarium maille fine crevettes',
    criteria: [
      'Mailles fines pour ne pas coincer les pattes des crevettes.',
      'Taille adaptée au bac.',
      'Matériau lisse, sans arêtes.',
    ],
    items: [],
  },
  tuyau: {
    label: 'Tuyaux, siphons et accessoires de changement d’eau',
    q: 'siphon aquarium nano tuyau silicone',
    criteria: [
      'Tuyau souple de petit diamètre pour un débit lent.',
      'Pré-filtre ou grille sur l’extrémité d’aspiration pour ne pas aspirer de juvéniles.',
      'Vanne ou pince de réglage du débit.',
    ],
    items: [],
  },
  acclimatation: {
    label: 'Accessoires d’acclimatation (goutte à goutte)',
    q: 'kit acclimatation crevettes goutte à goutte',
    criteria: [
      'Tuyau d’air fin et vanne de réglage du débit.',
      'Récipient propre et réservé à cet usage.',
      'Ventouse ou support pour stabiliser le dispositif.',
    ],
    items: [],
  },
  remineralisant: {
    label: 'Reminéralisants pour eau osmosée',
    q: 'remineralisant eau osmosée crevettes GH KH',
    criteria: [
      'Produit conçu pour le profil visé (GH seul, GH/KH, composition équilibrée) : se renseigner sur la souche.',
      'Notice claire avec dosage par litre pour atteindre un GH donné.',
      'Prévoir un test GH/KH et un TDS-mètre pour vérifier le résultat.',
    ],
    items: [],
  },
  conditionneur: {
    label: 'Conditionneurs d’eau (anti-chlore)',
    q: 'conditionneur eau aquarium chlore chloramine crevettes',
    criteria: [
      'Neutralise le chlore et, si besoin, les chloramines.',
      'Composition sans cuivre ni ajout inutile.',
      'Dosage simple pour de petits volumes.',
    ],
    items: [],
  },
  aquarium: {
    label: 'Aquariums et kits nano',
    q: 'aquarium nano 20 litres kit crevettes',
    criteria: [
      'Volume réel supérieur ou égal à 20 L pour débuter sereinement.',
      'Couvercle ou possibilité d’en ajouter un.',
      'Verre de qualité, silicone propre ; surface d’échange suffisante.',
    ],
    items: [],
  },
};
