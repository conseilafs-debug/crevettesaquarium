// Configuration centrale du site.
// Tout ce qui est « à remplacer plus tard » (nom, domaine, informations légales) se trouve ici.

export const site = {
  // Nom interne provisoire : à remplacer quand le nom définitif sera choisi.
  name: 'Crevettes Aquarium',
  tagline: 'Le guide pratique des crevettes d’aquarium d’eau douce',
  description:
    'Espèces, aquarium, eau, alimentation, reproduction, cohabitation et matériel : le guide pratique pour réussir un aquarium à crevettes.',

  // URL publique. Définir la variable d'environnement SITE_URL dans Cloudflare Pages
  // (ex. https://mon-projet.pages.dev, puis le domaine définitif plus tard).
  url: (process.env.SITE_URL || 'https://crevettes-aquarium.pages.dev').replace(/\/$/, ''),
  locale: 'fr_FR',
  lang: 'fr',

  // Affiliation Amazon.fr
  amazonTag: 'amalys-21',
  amazonHost: 'www.amazon.fr',

  // Dates éditoriales par défaut (modifiables page par page via le front matter : published / updated)
  published: '2026-11-26',
  updated: '2026-11-26',
  year: 2026,

  // Auteur affiché sur les articles. Remplacer par un vrai nom si souhaité (E-E-A-T).
  author: { name: 'La rédaction Crevettes Aquarium', url: '/a-propos/' },

  // Publicité contextuelle (étape ultérieure). Passer enabled à true et renseigner l'identifiant éditeur.
  adsense: { enabled: false, client: 'ca-pub-XXXXXXXXXXXXXXXX' },

  // Informations légales : renseignées (Athéna Office).
  legal: {
    editorName: 'Tiffany Lesieur EI, sous le nom commercial Athéna Office',
    editorStatus: 'entreprise individuelle (micro-entreprise) ; TVA non applicable, art. 293 B du CGI',
    editorAddress: '2 résidence Pierre Jacques, rue des Chardonnerets, 62600 Groffliers, France',
    editorEmail: 'contact@athena-office.fr',
    editorId: 'SIREN 105 858 328',
    publicationDirector: 'Philippe Lesieur',
    hostName: 'Cloudflare, Inc.',
    hostAddress: '101 Townsend St, San Francisco, CA 94107, États-Unis',
  },
};

export const abs = (path) => site.url + path;
