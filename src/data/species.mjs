// Données des fiches espèces. Les pages sont générées à partir de ces données.
// Toutes les valeurs de paramètres sont des REPÈRES : elles dépendent de la souche et des conditions d'élevage.

export const groups = {
  neocaridina: {
    label: 'Neocaridina davidi',
    short: 'Neocaridina',
    pillar: 'neocaridina',
    water: 'robinet',
    params: {
      temp: '18 à 26 °C (confort : 20 à 24 °C)',
      ph: '6,5 à 8,0 selon la souche',
      gh: '4 à 12 °dGH environ',
      kh: '2 à 8 °dKH environ',
      tds: '150 à 300 ppm environ',
    },
    volume: 'À partir de 20 L pour débuter sereinement (10 L possible en nano, pour aquariophile expérimenté)',
    waterText:
      'Les *Neocaridina davidi* tolèrent une plage large : les sources aquariophiles sérieuses citent typiquement un pH de 6,5 à 8, un GH de 4 à 12 °dGH et un KH de 2 à 8 °dKH, et certains élevages les maintiennent dans des plages plus larges encore. Ce qui compte surtout, c’est la **stabilité** et une eau cyclée (ammoniaque et nitrites à zéro). Ces chiffres sont des repères, pas des absolus : ils dépendent de la souche et de l’eau dans laquelle les crevettes ont été élevées. Voir [les paramètres des Neocaridina](/parametres-neocaridina/).',
    aquarium: [
      'Volume : à partir de 20 L pour débuter, voir [quel aquarium pour des crevettes](/quel-aquarium-pour-crevettes/).',
      'Sol : sable fin, gravier fin ou sol neutre, voir [le sol pour Neocaridina](/sol-neocaridina/).',
      'Plantes et mousses : mousse de Java, Christmas moss, fougères, anubias et plantes flottantes offrent abris et biofilm.',
      'Filtration : mousse (exhausteur) ou filtre dont l’aspiration est protégée, voir [le filtre pour crevettes](/filtre-aquarium-crevettes/).',
      'Chauffage : rarement indispensable dans une pièce entre 18 et 24 °C ; la stabilité prime.',
    ],
    food:
      'Les Neocaridina sont omnivores. Elles broutent le biofilm et les algues, et acceptent granulés, feuilles et légumes blanchis. Une petite quantité tous les un ou deux jours suffit : voir [que mangent les crevettes](/que-mangent-les-crevettes/).',
    repro:
      'La reproduction se fait en eau douce : la femelle porte les œufs sous l’abdomen (elle est dite « grainée ») et les jeunes naissent sous forme de petites crevettes miniatures. Détails dans [comment faire reproduire des Neocaridina](/reproduire-neocaridina/).',
    compat:
      'Plutôt pacifiques entre elles. Les petites crevettes sont des proies pour de nombreux poissons : lire [crevettes avec poissons](/crevettes-avec-poissons/). Si vous souhaitez conserver une couleur nette, évitez d’en mélanger plusieurs : voir [mélanger les couleurs](/melanger-couleurs-neocaridina/).',
    mistakes: [
      'Introduire les crevettes dans un bac non cyclé : voir [cycler un aquarium](/cycler-aquarium-crevettes/).',
      'Acclimater trop vite à la sortie du sachet : voir [l’acclimatation](/acclimatation-crevettes/).',
      'Corriger sans cesse l’eau avec des produits : une eau stable vaut mieux qu’une eau « parfaite » qui oscille.',
      'Suralimenter : les restes de nourriture dégradent l’eau.',
    ],
    products: ['nourriture', 'test-ghkh'],
  },
  caridina: {
    label: 'Caridina',
    short: 'Caridina',
    pillar: 'caridina',
    water: 'preparee',
    params: {
      temp: '19 à 25 °C (idéalement sous 24 °C)',
      ph: '5,6 à 7,2 selon la souche et le sol',
      gh: '3 à 8 °dGH (souvent 4 à 6)',
      kh: '0 à 4 °dKH (souvent 0 à 2)',
      tds: '100 à 200 ppm environ',
    },
    volume: 'À partir de 30 L de préférence (20 L possible pour aquariophile expérimenté)',
    waterText:
      'Les Caridina de type *cantonensis* (Crystal, Taiwan Bee, Tiger) sont généralement maintenues dans une eau douce, plutôt acide à neutre, peu minéralisée et stable : on cite souvent un pH de 5,6 à 7,2, un GH de 3 à 8 °dGH et un KH de 0 à 4 °dKH, avec de nombreuses variations selon les élevages. Une eau du robinet dure convient rarement sans préparation. Ces valeurs restent des repères : les souches élevées dans de l’eau différente supportent mal un changement brutal. Voir [les paramètres des Caridina](/parametres-caridina/).',
    aquarium: [
      'Volume : à partir de 30 L de préférence, une eau plus stable pardonne davantage.',
      'Sol : sol technique tamponnant (selon l’eau), voir [le sol pour Caridina](/sol-caridina/).',
      'Eau : souvent osmosée puis reminéralisée, voir [eau du robinet ou osmosée](/eau-du-robinet-ou-eau-osmosee/).',
      'Température : de préférence fraîche et stable ; l’été est la période délicate (voir [température](/temperature-aquarium-crevettes/)).',
      'Filtration : filtre à mousse ou exhausteur, débit doux.',
    ],
    food:
      'Même principe que pour les Neocaridina, avec davantage de vigilance sur les excès : petite quantité, nourriture de qualité, retrait des restes. Voir [que mangent les crevettes](/que-mangent-les-crevettes/).',
    repro:
      'La reproduction est possible en eau douce quand les paramètres sont stables, mais ces espèces pardonnent moins les erreurs que les Neocaridina. Voir [la reproduction des Caridina](/reproduction-caridina/).',
    compat:
      'À réserver de préférence à un bac dédié, car les besoins diffèrent de ceux des Neocaridina : voir [mélanger Neocaridina et Caridina](/melanger-neocaridina-caridina/). Évitez les poissons ; voir [crevettes avec poissons](/crevettes-avec-poissons/).',
    mistakes: [
      'Partir d’une eau du robinet inadaptée sans avoir mesuré GH, KH et TDS.',
      'Changer l’eau de manière trop importante ou avec des paramètres différents : voir [changement d’eau](/changement-d-eau-crevettes/).',
      'Laisser la température monter l’été : voir [température](/temperature-aquarium-crevettes/).',
      'Acheter des sujets très sélectionnés avant d’avoir stabilisé son bac.',
    ],
    products: ['sol', 'remineralisant', 'tds'],
  },
  amano: {
    label: 'Caridina multidentata',
    short: 'Amano',
    pillar: 'caridina',
    water: 'robinet',
    params: {
      temp: '20 à 26 °C',
      ph: '6,5 à 7,8',
      gh: '4 à 12 °dGH environ',
      kh: '2 à 8 °dKH environ',
      tds: '150 à 300 ppm environ',
    },
    volume: 'À partir de 30 L pour un petit groupe',
    waterText:
      'La crevette Amano se montre en général plus tolérante que les Caridina de type Crystal : elle s’adapte souvent à une eau du robinet de dureté moyenne. On cite des repères autour de 20 à 26 °C, pH 6,5 à 7,8, GH 4 à 12 °dGH et KH 2 à 8 °dKH, mais la stabilité reste plus importante que les chiffres. Voir [les paramètres de l’eau](/parametres-eau-crevettes/).',
    aquarium: [
      'Volume : 30 L et plus pour un petit groupe (elle est plus grande que Neocaridina).',
      'Couvercle conseillé : elle peut grimper et s’échapper.',
      'Plantes et racines pour grignoter le biofilm.',
      'Filtration modérée, bien oxygénée.',
    ],
    food:
      'Grande mangeuse d’algues filamenteuses et de biofilm ; elle accepte aussi granulés et légumes blanchis. Voir [crevettes et algues](/crevettes-et-algues/).',
    repro:
      'En eau douce, les Amano ne bouclent pas leur cycle : les femelles portent des œufs, mais les larves ont besoin d’eau saumâtre à salée pour se développer (cycle dit amphidrome). Voir [reproduction des Amano](/reproduction-amano/).',
    compat:
      'Pacifique ; compatible avec la plupart des petites espèces calmes. Bien plus robuste que les Neocaridina face à de petits poissons, mais des poissons assez grands pourront la manger : voir [crevettes avec poissons](/crevettes-avec-poissons/).',
    mistakes: [
      'S’attendre à une colonie qui se multiplie seule en eau douce.',
      'Oublier le couvercle.',
      'La nourrir en excès si elle semble « manger tout le temps » : elle cherche surtout le biofilm.',
    ],
    products: ['nourriture', 'tds'],
  },
  sulawesi: {
    label: 'Caridina spp. (Sulawesi)',
    short: 'Sulawesi',
    pillar: 'caridina',
    water: 'preparee',
    params: {
      temp: 'souvent plus chaud : environ 26 à 30 °C selon l’espèce',
      ph: 'souvent alcalin selon l’espèce',
      gh: 'variable selon l’espèce',
      kh: 'variable selon l’espèce',
      tds: 'variable selon l’espèce',
    },
    volume: '30 L et plus, bac dédié',
    waterText:
      'Sous le nom « Sulawesi » se cachent plusieurs espèces des lacs de l’île de Sulawesi, aux besoins qui varient d’une espèce à l’autre. De façon générale, ces crevettes sont maintenues dans une eau plus chaude et minéralisée que les Caridina de type Crystal, avec un pH plutôt alcalin. Comme aucune valeur ne s’applique à toutes les espèces, il faut identifier l’espèce exacte et suivre les conditions de l’éleveur. Voir [les paramètres de l’eau](/parametres-eau-crevettes/).',
    aquarium: [
      'Bac dédié : ni Neocaridina ni Crystal dans le même bac.',
      'Chauffage fiable et thermomètre : la température visée est plus élevée que pour les autres espèces.',
      'Sol et eau choisis en fonction de l’espèce (souvent plus minéralisés).',
      'Filtration bien oxygénée, à débit modéré.',
    ],
    food:
      'Alimentation proche des autres Caridina (biofilm, feuilles, granulés de qualité), en petites quantités.',
    repro:
      'Beaucoup d’espèces des lacs de Sulawesi pondent peu d’œufs, de grande taille, et les jeunes naissent déjà formés, mais cela dépend des espèces. Renseignez-vous sur l’espèce exacte.',
    compat:
      'À maintenir seule dans un bac dédié, avec des conditions stables ; voir [cohabitation des crevettes](/cohabitation-crevettes/).',
    mistakes: [
      'Appliquer les paramètres des Neocaridina ou des Crystal.',
      'Acheter sans connaître l’espèce exacte.',
      'Sous-estimer l’importance d’un chauffage fiable.',
    ],
    products: ['chauffage', 'thermometre'],
  },
};

const S = (o) => o;

export const species = [
  S({
    slug: 'crevette-red-cherry',
    name: 'Red Cherry',
    group: 'neocaridina',
    level: 'facile',
    color: 'rouge',
    hex: '#d8452f',
    pattern: 'solid',
    size: '2 à 3,5 cm',
    life: '1 à 2 ans environ',
    origin: 'Variété sélectionnée de *Neocaridina davidi* (espèce originaire de Taïwan et de Chine)',
    quick:
      'La Red Cherry est la variété de départ la plus courante : robuste, adaptée à de nombreuses eaux du robinet et qui se reproduit facilement dans un bac cyclé et stable.',
    intro:
      'La Red Cherry est la crevette d’eau douce la plus répandue en aquariophilie, souvent proposée en premier choix aux débutants. Sa coloration va d’un rouge pâle, presque translucide, à un rouge dense. Les femelles sont en général plus colorées et plus grandes que les mâles.',
    behavior:
      'Active, curieuse, elle passe son temps à brouter le biofilm sur le décor, les plantes et le sol. Elle devient timide quand elle mue ou lorsque l’eau change brutalement.',
    originNote:
      'Le nom « Red Cherry » désigne le plus souvent le niveau d’entrée de gamme du rouge ; des lignées plus denses sont vendues sous d’autres noms (voir [Sakura Rouge](/crevette-sakura-rouge/)). Les appellations varient selon les éleveurs.',
    waterNote:
      'C’est la variété que l’on associe le plus souvent à une eau du robinet de dureté moyenne, mais il vaut mieux mesurer GH, KH et pH avant l’achat et demander à l’éleveur les paramètres d’origine.',
    foodNote:
      'Elle mange à peu près tout ce qui est petit et comestible : le principal risque est la quantité, pas la variété.',
    reproNote:
      'C’est l’une des variétés qui se reproduisent le plus facilement ; en l’absence de sélection, la colonie peut produire des juvéniles de teintes variables.',
    compatNote:
      'Évitez de la mélanger avec d’autres couleurs de Neocaridina si vous voulez garder un rouge net.',
    watch: [
      'Une couleur pâle n’est pas forcément un signe de maladie : elle dépend de la lignée, du fond du bac, de l’alimentation, du stress ou d’une mue proche.',
      'Mélange avec d’autres couleurs : les juvéniles de teinte « sauvage » (brun, gris-vert) peuvent apparaître.',
      'Les achats sur sachets de petite taille se paient parfois en mortalité à l’arrivée : acclimater longuement.',
    ],
    extraMistakes: ['Acheter uniquement sur la couleur, sans se renseigner sur l’eau d’élevage d’origine.'],
    faq: [
      [
        'Une Red Cherry pâle est-elle malade ?',
        'Pas nécessairement. L’intensité de la couleur dépend de la lignée, du fond du bac, de l’alimentation, de l’éclairage et du stress. Une crevette qui mue peut aussi paraître plus pâle un temps. En cas de doute, contrôlez l’eau et observez le comportement.',
      ],
    ],
    compare: ['red-cherry-ou-blue-velvet', 'crevette-sakura-rouge'],
  }),
  S({
    slug: 'crevette-sakura-rouge',
    name: 'Sakura Rouge',
    group: 'neocaridina',
    level: 'facile',
    color: 'rouge',
    hex: '#c2271f',
    pattern: 'solid',
    size: '2 à 3,5 cm',
    life: '1 à 2 ans environ',
    origin: 'Lignée de *Neocaridina davidi* sélectionnée pour un rouge plus dense',
    quick:
      'La Sakura Rouge est une Red Cherry sélectionnée pour un rouge plus uniforme et plus dense ; ses besoins en eau sont les mêmes que ceux des autres Neocaridina.',
    intro:
      'On appelle souvent « Sakura » une lignée de Red Cherry dont la couleur est plus dense et plus régulière. Les termes de grade (Sakura, Fire Red, Painted Fire Red…) ne sont pas normalisés : un même nom peut recouvrir des qualités différentes d’un vendeur à l’autre.',
    behavior:
      'Comportement identique à celui de la Red Cherry : brouteuse active, discrète au moment de la mue.',
    originNote:
      'Issue de la sélection de lignées rouges de *Neocaridina davidi*. Le maintien de la couleur demande de conserver une colonie homogène.',
    waterNote:
      'Mêmes repères que pour les autres Neocaridina (voir le tableau ci-dessus). La qualité de l’eau et la stabilité influencent surtout l’intensité de la couleur.',
    foodNote:
      'Une alimentation variée à base de végétaux et de biofilm soutient la couleur ; évitez les excès de protéines.',
    reproNote:
      'Elle se reproduit comme les autres Neocaridina. Pour garder un rouge dense, écartez les juvéniles clairement plus pâles ([sélection des couleurs](/selection-couleurs-neocaridina/)).',
    compatNote:
      'Évitez les mélanges de couleurs : un mélange avec du bleu ou du jaune dilue la sélection.',
    watch: [
      'Un grade élevé n’est pas un gage de robustesse : la souche reste un Neocaridina, sensible aux mêmes erreurs.',
      'Le fond clair du bac peut donner l’impression d’une couleur plus pâle.',
    ],
    extraMistakes: ['Payer un surcoût pour un grade élevé puis le diluer en mélangeant les couleurs.'],
    faq: [
      [
        'Quelle différence entre Red Cherry et Sakura ?',
        'Le terme Sakura désigne généralement une Red Cherry dont la couleur est plus dense et uniforme. Il n’existe pas de norme stricte : les appellations varient selon les élevages, il est donc utile de comparer les photos et de questionner le vendeur.',
      ],
    ],
    compare: ['red-cherry-ou-blue-velvet', 'crevette-red-cherry'],
  }),
  S({
    slug: 'crevette-blue-velvet',
    name: 'Blue Velvet',
    group: 'neocaridina',
    level: 'facile',
    color: 'bleu',
    hex: '#243f8c',
    pattern: 'solid',
    size: '2 à 3,5 cm',
    life: '1 à 2 ans environ',
    origin: 'Variété bleue de *Neocaridina davidi* obtenue par sélection',
    quick:
      'La Blue Velvet est une Neocaridina au bleu profond, souvent mate : mêmes besoins que la Red Cherry, mais elle se garde plus facilement pure dans un bac dédié.',
    intro:
      'La Blue Velvet se reconnaît à son bleu profond, parfois très sombre, souvent comparé à du velours. Les jeunes peuvent paraître plus pâles ou plus transparents avant de colorer progressivement.',
    behavior:
      'Calme et active ; sur un sol sombre elle se voit moins, un décor plus clair la met en valeur.',
    originNote:
      'Il existe plusieurs lignées bleues vendues sous des noms proches (Blue Velvet, Blue Dream…) ; les appellations varient selon les éleveurs, voir [Blue Dream ou Blue Velvet](/blue-dream-ou-blue-velvet/).',
    waterNote:
      'Mêmes repères que les autres Neocaridina. Une eau très dure ou instable favorise les mues difficiles quelle que soit la couleur.',
    foodNote:
      'Alimentation classique de Neocaridina, avec des légumes blanchis et du biofilm.',
    reproNote:
      'Elle se reproduit facilement. Si l’on y mêle une autre couleur (rouge, jaune…), une partie des juvéniles reviendra souvent à des teintes sauvages.',
    compatNote:
      'Garder les bleus entre eux ; évitez les autres couleurs de Neocaridina dans le même bac pour préserver la teinte.',
    watch: [
      'Les juvéniles bleus peuvent sembler ternes jusqu’à leur première vraie phase de coloration.',
      'Le mélange de lignées bleues de qualités différentes peut diluer la teinte.',
    ],
    extraMistakes: ['Mélanger avec des rouges ou des jaunes et s’étonner de voir apparaître des juvéniles bruns.'],
    faq: [
      [
        'Les Blue Velvet gardent-elles toujours leur bleu ?',
        'Une partie de la couleur dépend de la lignée, de l’alimentation et du fond du bac. En l’absence de mélange avec d’autres couleurs, la teinte se maintient généralement mieux que dans une colonie hétérogène.',
      ],
    ],
    compare: ['blue-dream-ou-blue-velvet', 'red-cherry-ou-blue-velvet'],
  }),
  S({
    slug: 'crevette-blue-dream',
    name: 'Blue Dream',
    group: 'neocaridina',
    level: 'facile',
    color: 'bleu',
    hex: '#2c7fd1',
    pattern: 'solid',
    size: '2 à 3,5 cm',
    life: '1 à 2 ans environ',
    origin: 'Lignée bleue de *Neocaridina davidi* au bleu plus vif',
    quick:
      'La Blue Dream est une Neocaridina au bleu plus vif et plus lumineux que la Blue Velvet ; sa maintenance est identique à celle des autres Neocaridina.',
    intro:
      'La Blue Dream est décrite le plus souvent avec un bleu plus saturé et lumineux que la Blue Velvet. Selon les éleveurs, la frontière entre les deux appellations est floue : mieux vaut juger sur photos et sur la lignée proposée.',
    behavior:
      'Active et peu craintive dans un bac planté et stable.',
    originNote:
      'Sélection issue de lignées bleues de *Neocaridina davidi*. Les noms de variétés sont des appellations commerciales qui changent selon les pays et les élevages.',
    waterNote:
      'Mêmes repères que les autres Neocaridina. Les variétés très sélectionnées gagnent à être maintenues dans une eau stable, aussi proche que possible de celle de l’éleveur.',
    foodNote:
      'Alimentation variée à dominante végétale ; évitez les excès.',
    reproNote:
      'Elle se reproduit comme les autres Neocaridina. La sélection se fait en écartant les juvéniles aux teintes ternes.',
    compatNote:
      'Idéalement seule ou avec une autre lignée bleue de qualité proche.',
    watch: [
      'Un bleu délavé peut venir d’un stress, d’une eau instable ou d’un mélange de lignées.',
      'La qualité des lots varie fortement d’un vendeur à l’autre.',
    ],
    extraMistakes: ['Se fier uniquement au nom commercial sans voir les crevettes réelles (photos du lot).'],
    faq: [
      [
        'Blue Dream et Blue Velvet : est-ce la même chose ?',
        'Ce sont deux appellations commerciales de Neocaridina bleues. On associe généralement la Blue Dream à un bleu plus vif, mais la frontière dépend des éleveurs. Les besoins en eau sont identiques.',
      ],
    ],
    compare: ['blue-dream-ou-blue-velvet', 'crevette-blue-velvet'],
  }),
  S({
    slug: 'crevette-yellow-fire',
    name: 'Yellow Fire',
    group: 'neocaridina',
    level: 'facile',
    color: 'jaune',
    hex: '#f0b429',
    pattern: 'solid',
    size: '2 à 3,5 cm',
    life: '1 à 2 ans environ',
    origin: 'Variété jaune de *Neocaridina davidi* obtenue par sélection',
    quick:
      'La Yellow Fire est une Neocaridina au jaune franc ; elle partage les besoins des autres Neocaridina et se comporte bien dans un bac planté.',
    intro:
      'La Yellow Fire est l’une des variétés jaunes de Neocaridina. Selon les élevages, la teinte va d’un jaune franc à un jaune orangé. Elle ressort particulièrement sur un décor sombre ou un fond vert.',
    behavior:
      'Comportement classique de Neocaridina : brouteuse, discrète à la mue.',
    originNote:
      'Il existe plusieurs appellations proches pour les Neocaridina jaunes (Yellow Fire, Yellow Neon, Yellow Goldenback…), sans standard commun, voir [Yellow Neon](/crevette-yellow-neon/).',
    waterNote:
      'Mêmes repères que les autres Neocaridina. La teinte dépend aussi de l’alimentation et du stress.',
    foodNote:
      'Alimentation habituelle des Neocaridina ; des légumes colorés (par exemple courgette blanchie) varient l’apport sans excès.',
    reproNote:
      'Elle se reproduit facilement ; en cas de mélange avec d’autres couleurs, la teinte jaune se dilue vite.',
    compatNote:
      'À garder avec des crevettes de même couleur.',
    watch: [
      'Des jaunes très pâles peuvent être des mâles ou des sujets peu sélectionnés.',
      'Éviter les mélanges de couleurs pour préserver le jaune.',
    ],
    extraMistakes: ['Confondre appellations commerciales et variétés réellement distinctes.'],
    faq: [
      [
        'Quelle différence entre Yellow Fire et Yellow Neon ?',
        'Ce sont des appellations proches : le Neon désigne généralement un jaune plus lumineux, le Fire une teinte plus chaude. Aucun standard n’existe : fiez-vous aux photos du lot et à l’éleveur.',
      ],
    ],
    compare: ['crevette-yellow-neon', 'crevette-orange-sakura'],
  }),
  S({
    slug: 'crevette-yellow-neon',
    name: 'Yellow Neon',
    group: 'neocaridina',
    level: 'facile',
    color: 'jaune',
    hex: '#e7d21b',
    pattern: 'solid',
    size: '2 à 3,5 cm',
    life: '1 à 2 ans environ',
    origin: 'Lignée jaune de *Neocaridina davidi* au jaune lumineux',
    quick:
      'La Yellow Neon est une Neocaridina au jaune lumineux, facile à entretenir : mêmes paramètres et mêmes précautions que les autres Neocaridina.',
    intro:
      'Le nom Yellow Neon désigne généralement une Neocaridina au jaune très lumineux, parfois quasi fluo. Les lots peuvent présenter un jaune plus ou moins uniforme selon la sélection.',
    behavior:
      'Active dans le bac, elle se cache beaucoup plus au moment de la mue.',
    originNote:
      'Variété de sélection, issue de lignées de *Neocaridina davidi*. Vendeurs et éleveurs utilisent des noms différents pour des teintes proches.',
    waterNote:
      'Mêmes repères que les autres Neocaridina ; la stabilité prime.',
    foodNote:
      'Alimentation habituelle des Neocaridina ; pas de régime spécifique nécessaire pour la couleur.',
    reproNote:
      'Elle se reproduit facilement ; en cas de mélange avec d’autres couleurs, certains juvéniles auront une teinte différente.',
    compatNote:
      'Idéalement maintenue entre jaunes, voir [mélanger les couleurs](/melanger-couleurs-neocaridina/).',
    watch: [
      'Un jaune terne peut être lié à la lignée, à l’alimentation ou au stress.',
      'Les lots de qualité hétérogène donnent des juvéniles très variables.',
    ],
    extraMistakes: ['Attendre qu’un jaune intense apparaisse dans un bac mélangé.'],
    faq: [
      [
        'Les Yellow Neon sont-elles plus fragiles ?',
        'Pas particulièrement : leurs besoins sont ceux des Neocaridina. Les problèmes viennent surtout d’une eau instable ou d’un lot peu sélectionné.',
      ],
    ],
    compare: ['crevette-yellow-fire', 'crevette-orange-sakura'],
  }),
  S({
    slug: 'crevette-orange-sakura',
    name: 'Orange Sakura',
    group: 'neocaridina',
    level: 'facile',
    color: 'orange',
    hex: '#ee7a1d',
    pattern: 'solid',
    size: '2 à 3,5 cm',
    life: '1 à 2 ans environ',
    origin: 'Variété orange de *Neocaridina davidi*',
    quick:
      'L’Orange Sakura est une Neocaridina orange, réputée facile ; seule la couleur la distingue des autres Neocaridina dans l’entretien.',
    intro:
      'L’Orange Sakura offre un orange vif qui se détache bien sur un décor vert. La teinte va d’un orange clair à un orange soutenu selon la sélection.',
    behavior:
      'Comportement identique aux autres Neocaridina.',
    originNote:
      'Elle est issue de la sélection de lignées orange de *Neocaridina davidi*. Les noms de variétés orange sont nombreux (Orange Pumpkin, Orange Sakura…) et peu normalisés.',
    waterNote:
      'Mêmes repères que les autres Neocaridina, voir [paramètres des Neocaridina](/parametres-neocaridina/).',
    foodNote:
      'Alimentation classique, sans besoin particulier pour la couleur.',
    reproNote:
      'Se reproduit facilement ; en cas de mélange avec du rouge ou du jaune, les teintes se confondent progressivement.',
    compatNote:
      'À maintenir avec des crevettes de même couleur pour garder un orange net.',
    watch: [
      'Des oranges peuvent être confondus avec des rouges clairs selon les lots.',
      'Même sensibilité que les autres Neocaridina aux variations brutales.',
    ],
    extraMistakes: ['Acheter sans comparer plusieurs photos réelles du lot.'],
    faq: [
      [
        'Peut-on mélanger Orange Sakura et Red Cherry ?',
        'C’est possible techniquement (même espèce), mais la couleur des juvéniles devient hétérogène et la sélection se perd. Voir [mélanger les couleurs](/melanger-couleurs-neocaridina/).',
      ],
    ],
    compare: ['crevette-yellow-fire', 'crevette-red-cherry'],
  }),
  S({
    slug: 'crevette-green-jade',
    name: 'Green Jade',
    group: 'neocaridina',
    level: 'facile',
    color: 'vert',
    hex: '#3f8f4f',
    pattern: 'solid',
    size: '2 à 3,5 cm',
    life: '1 à 2 ans environ',
    origin: 'Variété verte de *Neocaridina davidi*',
    quick:
      'La Green Jade est une Neocaridina verte, moins répandue que les rouges et les bleues : mêmes besoins, mais la qualité du lot varie beaucoup.',
    intro:
      'La Green Jade présente une teinte verte, plus ou moins soutenue. Elle est moins courante que les rouges et les bleues, et la qualité des lots varie beaucoup d’un élevage à l’autre.',
    behavior:
      'Comportement classique de Neocaridina.',
    originNote:
      'Variété de sélection de *Neocaridina davidi* : les noms et la stabilité de la couleur dépendent de l’éleveur.',
    waterNote:
      'Mêmes repères que les autres Neocaridina.',
    foodNote:
      'Alimentation habituelle ; évitez les produits qui pourraient altérer l’eau.',
    reproNote:
      'Elle se reproduit comme les autres Neocaridina. Le maintien du vert exige de trier les juvéniles.',
    compatNote:
      'À garder entre sujets de même teinte.',
    watch: [
      'Une teinte verte peut être confondue avec une couleur « sauvage » : demandez la lignée.',
      'Surveillez la stabilité de la couleur sur plusieurs générations.',
    ],
    extraMistakes: ['Prendre une crevette sauvage pour une Green Jade de qualité.'],
    faq: [
      [
        'La Green Jade est-elle plus difficile ?',
        'Non, ses besoins sont ceux des autres Neocaridina. La difficulté vient plutôt de trouver un lot de qualité homogène.',
      ],
    ],
    compare: ['crevette-chocolate', 'crevette-red-cherry'],
  }),
  S({
    slug: 'crevette-chocolate',
    name: 'Chocolate',
    group: 'neocaridina',
    level: 'facile',
    color: 'brun',
    hex: '#6b4226',
    pattern: 'solid',
    size: '2 à 3,5 cm',
    life: '1 à 2 ans environ',
    origin: 'Variété brune de *Neocaridina davidi*',
    quick:
      'La Chocolate est une Neocaridina brune à noirâtre, robuste et facile : ses besoins sont ceux des autres Neocaridina.',
    intro:
      'La Chocolate présente une teinte brune, parfois très foncée. Elle passe volontiers inaperçue sur un sol sombre, mais ressort bien sur un fond clair ou des plantes vertes.',
    behavior:
      'Calme, active, discrète à la mue.',
    originNote:
      'Variété de *Neocaridina davidi* proche des lignées sauvages brunes ; l’intensité de la couleur varie selon la sélection.',
    waterNote:
      'Mêmes repères que les autres Neocaridina ; on cite un GH de 4 à 10 et un KH de 1 à 8 °dKH pour limiter le risque de mues difficiles.',
    foodNote:
      'Alimentation classique.',
    reproNote:
      'Elle se reproduit facilement ; sa teinte sauvage peut être confondue avec celle de juvéniles issus de mélanges.',
    compatNote:
      'Compatible entre Neocaridina, mais attention aux mélanges qui produisent des teintes brunes confuses.',
    watch: [
      'La couleur brune est proche de celle des juvéniles sauvages, ce qui complique le tri.',
      'Elle se voit peu sur un sol sombre.',
    ],
    extraMistakes: ['Choisir un sol sombre puis chercher ses crevettes.'],
    faq: [
      [
        'La Chocolate est-elle plus résistante ?',
        'On la dit robuste parce que sa teinte rappelle celle des formes sauvages, mais ses besoins sont ceux des Neocaridina. La stabilité de l’eau reste le critère principal.',
      ],
    ],
    compare: ['crevette-green-jade', 'crevette-rili'],
  }),
  S({
    slug: 'crevette-rili',
    name: 'Rili',
    group: 'neocaridina',
    level: 'facile',
    color: 'translucide',
    hex: '#c0392b',
    pattern: 'rili',
    size: '2 à 3,5 cm',
    life: '1 à 2 ans environ',
    origin: 'Variété de *Neocaridina davidi* à corps translucide et taches colorées',
    quick:
      'La Rili est une Neocaridina au corps translucide avec des plages de couleur ; sa maintenance est celle des Neocaridina.',
    intro:
      'La Rili se reconnaît à son corps translucide, avec des plages colorées (le plus souvent rouges) à la tête et à la queue. Les motifs varient d’un sujet à l’autre.',
    behavior:
      'Comportement classique de Neocaridina ; la transparence permet d’observer facilement les œufs et la digestion.',
    originNote:
      'Sélection de *Neocaridina davidi*. Selon les lots, la répartition des couleurs est plus ou moins régulière.',
    waterNote:
      'Mêmes repères que les autres Neocaridina.',
    foodNote:
      'Alimentation habituelle ; la transparence rend la surveillance de la digestion facile.',
    reproNote:
      'La transparence permet de voir les œufs et les selles ; la reproduction se déroule comme chez les autres Neocaridina.',
    compatNote:
      'Compatible avec les autres Neocaridina, mais les motifs risquent de disparaître en cas de mélanges.',
    watch: [
      'Le motif peut varier fortement d’un lot à l’autre.',
      'Les juvéniles sont très peu colorés au début.',
    ],
    extraMistakes: ['S’attendre à un motif identique chez tous les sujets.'],
    faq: [
      [
        'La transparence est-elle un signe de maladie ?',
        'Non, c’est une caractéristique de la variété. Une crevette qui devient laiteuse ou blanchâtre est un autre cas : voir [crevette devenue blanche](/crevette-devient-blanche/).',
      ],
    ],
    compare: ['crevette-chocolate', 'crevette-red-cherry'],
  }),
  S({
    slug: 'crevette-crystal-red',
    name: 'Crystal Red',
    group: 'caridina',
    level: 'avance',
    color: 'rouge et blanc',
    hex: '#c92a2a',
    pattern: 'banded',
    size: '2 à 3 cm',
    life: '1,5 à 2 ans environ',
    origin: 'Sélection issue de crevettes de type Bee (*Caridina cf. cantonensis*), avec une origine au Japon',
    quick:
      'La Crystal Red est une Caridina rouge et blanche, plus exigeante que les Neocaridina : eau douce et stable, température fraîche et sol adapté.',
    intro:
      'La Crystal Red (CRS) se reconnaît à ses bandes rouges et blanches contrastées. Elle est élevée depuis longtemps en aquariophilie et demeure une référence parmi les Caridina sélectionnées. Les grades (S, SS, SSS…) reposent sur la proportion de blanc et le motif, sans norme commune.',
    behavior:
      'Plus discrète que les Neocaridina, elle apprécie les bacs calmes et plantés.',
    originNote:
      'Variété issue de sélections de Bee shrimp. Les noms de grades varient selon les éleveurs, voir [Crystal Red ou Crystal Black](/crystal-red-ou-crystal-black/).',
    waterNote:
      'Eau douce, plutôt acide à neutre et stable ; l’eau du robinet est souvent trop dure et nécessite une préparation. Adaptez-vous aux conditions de l’éleveur et mesurez GH, KH et TDS.',
    foodNote:
      'Petite quantité d’une nourriture de qualité adaptée aux Caridina, plus biofilm et feuilles.',
    reproNote:
      'Elle se reproduit en eau douce quand les conditions sont bonnes ; les pertes d’œufs sont fréquentes en cas de variations.',
    compatNote:
      'À maintenir dans un bac dédié, sans poissons.',
    watch: [
      'Plus sensible aux variations de température, de GH/KH et aux nitrites que les Neocaridina.',
      'L’été est une période délicate : au-delà de 25 à 26 °C les problèmes augmentent.',
      'Les grades très élevés coûtent cher et supportent mal les débutants.',
    ],
    extraMistakes: ['Choisir la Crystal Red comme première crevette sans expérience du bac cyclé.'],
    faq: [
      [
        'La Crystal Red est-elle adaptée aux débutants ?',
        'Généralement pas en première crevette : elle demande une eau stable, souvent préparée, et pardonne moins les erreurs. Les Neocaridina constituent un meilleur point de départ ; voir [quelle crevette choisir pour débuter](/quelle-crevette-pour-debuter/).',
      ],
    ],
    compare: ['crystal-red-ou-crystal-black', 'crevette-taiwan-bee'],
  }),
  S({
    slug: 'crevette-crystal-black',
    name: 'Crystal Black',
    group: 'caridina',
    level: 'avance',
    color: 'noir et blanc',
    hex: '#1f2933',
    pattern: 'banded',
    size: '2 à 3 cm',
    life: '1,5 à 2 ans environ',
    origin: 'Sélection issue de crevettes de type Bee (*Caridina cf. cantonensis*)',
    quick:
      'La Crystal Black est la déclinaison noire et blanche de la lignée Crystal : mêmes exigences que la Crystal Red.',
    intro:
      'La Crystal Black (CBS) présente des bandes noires et blanches contrastées. Ses besoins sont les mêmes que ceux de la Crystal Red : eau stable, peu minéralisée, température fraîche.',
    behavior:
      'Calme et discrète ; la teinte noire ressort particulièrement sur un fond clair.',
    originNote:
      'Variété issue des mêmes sélections que la Crystal Red. Les motifs et les grades varient selon l’éleveur.',
    waterNote:
      'Même profil que la Crystal Red : mesurez GH, KH, TDS et température et demandez les paramètres d’élevage.',
    foodNote:
      'Alimentation fine et de qualité, en petite quantité.',
    reproNote:
      'Reproduction possible en eau douce, comme chez la Crystal Red, dans un bac stable.',
    compatNote:
      'Bac dédié sans poissons, ni Neocaridina.',
    watch: [
      'Sensibilité aux variations brutales de paramètres.',
      'Chaleur estivale à surveiller ; un thermomètre fiable est indispensable.',
    ],
    extraMistakes: ['Garder des Crystal Black dans un bac chauffé en permanence à 26 °C ou plus.'],
    faq: [
      [
        'Crystal Red et Crystal Black demandent-elles les mêmes soins ?',
        'Oui, ce sont des lignées proches, avec les mêmes besoins en eau et en température. La différence tient à la couleur et à la sélection : voir [Crystal Red ou Crystal Black](/crystal-red-ou-crystal-black/).',
      ],
    ],
    compare: ['crystal-red-ou-crystal-black', 'crevette-tiger'],
  }),
  S({
    slug: 'crevette-taiwan-bee',
    name: 'Taiwan Bee',
    group: 'caridina',
    level: 'avance',
    color: 'variable',
    hex: '#8a1c3c',
    pattern: 'banded',
    size: '2 à 3 cm',
    life: '1,5 à 2 ans environ',
    origin: 'Lignées de type Bee (*Caridina cf. cantonensis*) sélectionnées à Taïwan',
    quick:
      'Les Taiwan Bee sont des lignées sélectionnées à Taïwan à partir de Bee shrimp, aux motifs et aux couleurs variés ; leurs besoins sont proches de ceux des Crystal.',
    intro:
      'Sous le nom Taiwan Bee on regroupe des lignées sélectionnées à Taïwan, aux motifs variés (Wine Red, Blue Bolt…). Elles partagent le profil exigeant des Caridina de type Bee.',
    behavior:
      'Discrètes et sensibles ; elles supportent mal les ruptures de stabilité.',
    originNote:
      'Le terme regroupe plusieurs lignées dont les noms ne sont pas normalisés. Les besoins précis dépendent de la lignée et de l’éleveur.',
    waterNote:
      'Eau douce stable, peu minéralisée ; reprendre autant que possible les paramètres de l’éleveur, voir [paramètres des Caridina](/parametres-caridina/).',
    foodNote:
      'Alimentation fine en petites quantités ; veillez à retirer les restes.',
    reproNote:
      'Reproduction possible dans un bac mature et stable ; patience.',
    compatNote:
      'Bac dédié, sans poissons.',
    watch: [
      'Plus exigeante que la Neocaridina ; les débutants sont souvent déçus.',
      'Attention aux croisements entre lignées Bee, qui brouillent les motifs.',
    ],
    extraMistakes: ['Mélanger plusieurs lignées de Bee dans un même bac sans projet de sélection.'],
    faq: [
      [
        'Taiwan Bee et Crystal Red, quelle différence ?',
        'Les deux dérivent de crevettes de type Bee, mais les lignées Taiwan Bee ont été sélectionnées à Taïwan, avec des motifs et des couleurs différents. Les exigences en eau restent proches : voir [Crystal Red](/crevette-crystal-red/).',
      ],
    ],
    compare: ['crevette-crystal-red', 'crevette-tiger'],
  }),
  S({
    slug: 'crevette-amano',
    name: 'Amano',
    group: 'amano',
    level: 'intermediaire',
    color: 'transparent à grisâtre',
    hex: '#8a9a8f',
    pattern: 'clear',
    size: '3 à 5 cm',
    life: '2 à 3 ans environ',
    origin: '*Caridina multidentata* (Japon, Taïwan)',
    quick:
      'La crevette Amano est une grande mangeuse d’algues ; plus tolérante que les Crystal, mais elle ne se reproduit pas en eau douce.',
    intro:
      'La crevette Amano (*Caridina multidentata*) est plus grande que les Neocaridina et réputée pour consommer des algues filamenteuses et du biofilm. Son corps est translucide, avec des ponctuations alignées sur les flancs.',
    behavior:
      'Active et pacifique ; elle fouille en permanence le décor.',
    originNote:
      'Elle doit son nom à Takashi Amano, qui l’a popularisée dans ses aquariums plantés. Les larves se développent en eau saumâtre à salée : le cycle ne peut pas se boucler en aquarium d’eau douce.',
    waterNote:
      'Elle s’adapte souvent à une eau du robinet de dureté moyenne ; la température ne doit pas être excessive.',
    foodNote:
      'Elle apprécie les algues, le biofilm, les feuilles, les granulés et légumes blanchis.',
    reproNote:
      'Les femelles peuvent porter des œufs, mais les larves ne survivent pas sans eau saumâtre. Voir [reproduction des Amano](/reproduction-amano/).',
    compatNote:
      'Plus robuste que les Neocaridina, elle reste vulnérable face à de gros poissons.',
    watch: [
      'Elle peut escalader : couvercle conseillé.',
      'La colonie ne se multiplie pas en eau douce : prévoir un renouvellement.',
    ],
    extraMistakes: ['Acheter des Amano pour « lancer une colonie » en eau douce.'],
    faq: [
      [
        'Les Amano se reproduisent-elles en aquarium ?',
        'En eau douce, non : les larves ont besoin d’eau saumâtre à salée pour se développer, comme le montrent les études sur les crevettes amphidromes du genre Caridina. La reproduction est donc très difficile en aquarium domestique.',
      ],
    ],
    compare: ['amano-ou-neocaridina', 'crevette-red-cherry'],
  }),
  S({
    slug: 'crevette-tiger',
    name: 'Tiger',
    group: 'caridina',
    level: 'intermediaire',
    color: 'rayée',
    hex: '#7a5c3e',
    pattern: 'tiger',
    size: '2 à 3 cm',
    life: '1,5 à 2 ans environ',
    origin: 'Lignées rayées de *Caridina cf. cantonensis*',
    quick:
      'Les Tiger sont des Caridina rayées, parfois jugées un peu plus tolérantes que les Crystal, mais qui restent sensibles à l’eau dure et aux variations.',
    intro:
      'Les crevettes « Tiger » regroupent des lignées rayées de *Caridina* de type cantonensis (Tiger, Orange Eye Tiger, Blue Tiger…). Elles sont souvent présentées comme un intermédiaire entre Neocaridina et Crystal.',
    behavior:
      'Calmes et actives en bac planté, plutôt timides avec des poissons.',
    originNote:
      'Les noms de variétés rayées ne sont pas standardisés, et des croisements existent. Se renseigner sur la lignée précise.',
    waterNote:
      'Même logique que pour les Caridina : eau douce, plutôt acide à neutre, stable ; les Tiger acceptent parfois des conditions légèrement moins strictes que les Crystal, selon la lignée.',
    foodNote:
      'Alimentation fine, en petite quantité.',
    reproNote:
      'Reproduction possible en eau douce dans un bac stable ; elle est plus lente qu’avec les Neocaridina.',
    compatNote:
      'Bac dédié ; évitez les croisements avec d’autres lignées de Caridina cantonensis si vous cherchez à conserver le motif.',
    watch: [
      'Les Tiger peuvent s’hybrider avec d’autres lignées de Caridina cantonensis (Bee, Crystal).',
      'Elles sont sensibles à l’eau dure et aux nitrites.',
    ],
    extraMistakes: ['Les croire aussi tolérantes que les Neocaridina.'],
    faq: [
      [
        'La Tiger est-elle plus facile que la Crystal ?',
        'Elle est souvent décrite comme un peu plus tolérante, mais cela dépend de la lignée. L’eau douce et stable reste indispensable.',
      ],
    ],
    compare: ['crevette-crystal-red', 'crevette-taiwan-bee'],
  }),
  S({
    slug: 'crevette-sulawesi',
    name: 'Sulawesi',
    group: 'sulawesi',
    level: 'avance',
    color: 'variable',
    hex: '#a33a2a',
    pattern: 'banded',
    size: '1,5 à 3 cm selon l’espèce',
    life: 'variable selon l’espèce',
    origin: 'Plusieurs espèces de *Caridina* (et genres voisins) des lacs de Sulawesi (Indonésie)',
    quick:
      'Les crevettes Sulawesi regroupent plusieurs espèces des lacs de l’île de Sulawesi ; elles demandent un bac dédié et des conditions précises, plus chaudes et minéralisées que les Crystal.',
    intro:
      'Les « Sulawesi » sont des crevettes d’eau douce originaires des grands lacs de l’île de Sulawesi. Elles sont recherchées pour leurs motifs très marqués, mais leur maintenance est réservée aux aquariophiles expérimentés.',
    behavior:
      'Discrètes, souvent sensibles au stress ; elles apprécient les caches et les surfaces rugueuses.',
    originNote:
      'Plusieurs espèces sont vendues sous cette appellation. Les conditions dépendent de l’espèce : il faut absolument identifier laquelle vous achetez.',
    waterNote:
      'On cite en général des températures plus élevées que pour les autres crevettes et un pH alcalin, avec des variations selon l’espèce. Se référer aux conditions de l’éleveur.',
    foodNote:
      'Alimentation fine et variée, en petite quantité.',
    reproNote:
      'Beaucoup d’espèces lacustres de Sulawesi pondent peu d’œufs, de grande taille, et les jeunes naissent formés ; cela dépend de l’espèce.',
    compatNote:
      'Bac dédié, sans poissons ni autres crevettes.',
    watch: [
      'La température doit être élevée et stable ; un chauffage défaillant est un risque majeur.',
      'Les valeurs d’eau diffèrent fortement de celles des Neocaridina et des Crystal.',
      'Des informations fiables sur l’espèce exacte sont indispensables avant l’achat.',
    ],
    extraMistakes: ['Se fier à une fiche générique « Sulawesi » plutôt qu’aux conditions de l’espèce précise.'],
    faq: [
      [
        'Les Sulawesi sont-elles adaptées aux débutants ?',
        'Non : leurs besoins sont spécifiques et elles ne tolèrent pas les approximations. Mieux vaut commencer par des Neocaridina et gagner en expérience.',
      ],
    ],
    compare: ['crevette-crystal-red', 'crevette-tiger'],
  }),
];

export const levelLabel = { facile: 'Facile', intermediaire: 'Intermédiaire', avance: 'Avancé' };

// Génère le markdown d'une fiche espèce (rendu ensuite comme n'importe quelle page).
export function speciesMarkdown(sp) {
  const g = groups[sp.group];
  const p = g.params;
  const rows = [
    ['Nom scientifique', g.label === 'Caridina spp. (Sulawesi)' ? 'Caridina spp. (plusieurs espèces)' : g.label],
    ['Origine', sp.origin],
    ['Taille adulte', sp.size],
    ['Durée de vie indicative', sp.life],
    ['Difficulté', levelLabel[sp.level]],
    ['Température', p.temp],
    ['pH', p.ph],
    ['GH', p.gh],
    ['KH', p.kh],
    ['TDS', p.tds],
    ['Volume conseillé', g.volume],
    ['Eau', g.water === 'robinet' ? 'Eau du robinet souvent possible selon dureté' : 'Eau préparée souvent nécessaire'],
  ];
  const table = ['| Critère | Repère |', '|---|---|', ...rows.map((r) => `| ${r[0]} | ${r[1]} |`)].join('\n');
  const mistakes = [...g.mistakes, ...(sp.extraMistakes || [])].map((m) => `- ${m}`).join('\n');
  const aq = g.aquarium.map((m) => `- ${m}`).join('\n');
  const watch = sp.watch.map((m) => `- ${m}`).join('\n');
  const faq = [
    ...sp.faq,
    [
      `Quels paramètres pour la crevette ${sp.name} ?`,
      `Les repères généralement cités sont : ${p.temp} ; pH ${p.ph} ; GH ${p.gh} ; KH ${p.kh}. Ils varient selon la souche et l’élevage d’origine : mesurez votre eau et privilégiez la stabilité.`,
    ],
    [
      `La ${sp.name} convient-elle à un débutant ?`,
      sp.level === 'facile'
        ? 'Oui, c’est une variété réputée facile, à condition de partir d’un bac cyclé et stable. Voir [comment débuter](/comment-debuter-crevettes-aquarium/).'
        : sp.level === 'intermediaire'
          ? 'Elle convient plutôt à un aquariophile qui a déjà une première expérience avec un bac stable ; les Neocaridina restent un meilleur point de départ.'
          : 'Elle est plutôt réservée aux aquariophiles expérimentés : les Neocaridina restent un meilleur point de départ. Voir [quelle crevette choisir pour débuter](/quelle-crevette-pour-debuter/).',
    ],
  ]
    .map(([q, a]) => `### ${q}\n${a}`)
    .join('\n\n');

  return `## Fiche d’identité

${table}

:::note Des repères, pas des absolus
Ces valeurs sont des repères indicatifs. Les besoins varient selon la souche, l’éleveur et les conditions de maintenance : commencez toujours par mesurer votre propre eau.
:::

## Présentation

${sp.intro}

## Origine et sélection

${sp.origin}. ${sp.originNote}

## Comportement

${sp.behavior}

## Paramètres de l’eau

${g.waterText}

${sp.waterNote}

## Aquarium conseillé

${aq}

## Alimentation

${g.food} ${sp.foodNote}

## Reproduction

${g.repro} ${sp.reproNote}

## Compatibilité

${g.compat} ${sp.compatNote}

## Points de vigilance

${watch}

## Erreurs à éviter

${mistakes}

## FAQ

${faq}
`;
}
