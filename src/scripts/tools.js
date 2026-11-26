/* Outils interactifs : calculateurs, guide « quelle crevette », « Mon aquarium », filtres, checklist.
   Aucune dépendance. Les valeurs sont des REPÈRES et sont présentées comme tels. */
(function () {
  'use strict';
  var nf = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 });
  var fmt = function (n) { return nf.format(n); };
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var val = function (id) { var v = parseFloat(String(document.getElementById(id).value).replace(',', '.')); return isFinite(v) ? v : null; };
  var out = function (form) { return $('[data-out]', form); };

  // Densités indicatives par 10 L de volume net : [prudente, standard, élevée]
  var DENS = {
    neocaridina: { label: 'Neocaridina', d: [3, 5, 8], link: '/neocaridina/' },
    caridina: { label: 'Caridina cantonensis', d: [2, 3, 5], link: '/caridina/' },
    amano: { label: 'Amano', d: [1, 1.5, 2.5], link: '/crevette-amano/' },
    sulawesi: { label: 'Sulawesi', d: [1, 2, 3], link: '/crevette-sulawesi/' }
  };

  var tools = {};

  tools['calc-nombre'] = function (form) {
    function run(e) {
      if (e) e.preventDefault();
      var vol = val('cn-vol'), o = out(form);
      if (!vol || vol < 5) { o.innerHTML = '<p>Indiquez un volume d’au moins 5 L.</p>'; return; }
      var g = DENS[document.getElementById('cn-esp').value];
      var lvl = parseInt(document.getElementById('cn-dens').value, 10);
      var net = document.getElementById('cn-net').checked ? vol * 0.8 : vol;
      var n = g.d.map(function (d) { return Math.max(1, Math.round(net / 10 * d)); });
      var h = '<p class="big">Environ <strong>' + n[lvl] + '</strong> ' + g.label + ' pour ce bac</p>';
      h += '<ul><li>Démarrage prudent : environ <strong>' + n[0] + '</strong></li><li>Densité standard : environ <strong>' + n[1] + '</strong></li><li>Bac mature et stable : jusqu’à environ <strong>' + n[2] + '</strong></li></ul>';
      if (vol < 10) h += '<p><strong>Attention :</strong> en dessous de 10 L, la stabilité est difficile à tenir ; ce calcul est peu pertinent.</p>';
      if (g.label === 'Amano') h += '<p>Les Amano ne se reproduisent pas en eau douce : le nombre indiqué ne grandira pas tout seul.</p>';
      h += '<p class="hint">Estimation indicative, pas une règle absolue : elle dépend de la maturité du bac, de la filtration, des plantes et de la stabilité de l’eau. Commencez bas et laissez la colonie grandir. <a href="' + g.link + '">En savoir plus sur ' + g.label + '</a>.</p>';
      o.innerHTML = h;
    }
    form.addEventListener('submit', run);
    form.addEventListener('change', run);
    form.addEventListener('input', run);
    run();
  };

  tools['calc-eau'] = function (form) {
    function run(e) {
      if (e) e.preventDefault();
      var v = val('ce-vol'), p = val('ce-pct'), o = out(form);
      if (!v || !p || p <= 0 || p > 100) { o.innerHTML = '<p>Renseignez un volume et un pourcentage entre 1 et 100.</p>'; return; }
      var l = v * p / 100;
      var h = '<p class="big">Remplacer environ <strong>' + fmt(l) + ' L</strong> sur ' + fmt(v) + ' L</p><p>Il restera environ ' + fmt(v - l) + ' L d’ancienne eau.</p>';
      if (p > 30) h += '<p><strong>Attention :</strong> un changement supérieur à 25–30 % peut provoquer une variation importante des paramètres. Pour des crevettes, mieux vaut fractionner.</p>';
      h += '<p class="hint">Repère courant : 10 à 20 % par semaine, selon le bac et l’espèce. Utilisez une eau à la même température et aux paramètres proches de l’eau du bac, versée lentement. <a href="/changement-d-eau-crevettes/">Guide du changement d’eau</a>.</p>';
      o.innerHTML = h;
    }
    form.addEventListener('submit', run); form.addEventListener('input', run); run();
  };

  tools['calc-volume'] = function (form) {
    function run(e) {
      if (e) e.preventDefault();
      var l = val('cv-l'), w = val('cv-w'), h = val('cv-h'), o = out(form);
      if (!l || !w || !h) { o.innerHTML = '<p>Renseignez les trois dimensions.</p>'; return; }
      var t = l * w * h / 1000;
      o.innerHTML = '<p class="big">Volume théorique : <strong>' + fmt(t) + ' L</strong></p><p>Volume réel estimé après sol et décor : environ <strong>' + fmt(t * 0.75) + ' à ' + fmt(t * 0.9) + ' L</strong>.</p><p class="hint">Calcul : longueur × largeur × hauteur d’eau en cm, divisé par 1 000. Les vitres, le sol et le décor réduisent le volume d’eau réel.</p>';
    }
    form.addEventListener('submit', run); form.addEventListener('input', run); run();
  };

  tools.quiz = function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = new FormData(form), a = {}, k;
      ['exp', 'vol', 'eau', 'obj', 'col', 'poi'].forEach(function (n) { a[n] = f.get(n); });
      for (k in a) if (!a[k]) { out(form).innerHTML = '<p>Répondez aux six questions pour obtenir une recommandation.</p>'; return; }
      var hardOrUnknown = a.eau === 'hard' || a.eau === 'unknown';
      var easy = a.exp === 'debutant' || a.vol === 'lt20' || hardOrUnknown;
      var h = '', notes = [];
      var colors = {
        rouge: ['<a href="/crevette-red-cherry/">Red Cherry</a>', '<a href="/crevette-sakura-rouge/">Sakura Rouge</a>'],
        bleu: ['<a href="/crevette-blue-velvet/">Blue Velvet</a>', '<a href="/crevette-blue-dream/">Blue Dream</a>'],
        jaune: ['<a href="/crevette-yellow-fire/">Yellow Fire</a>', '<a href="/crevette-yellow-neon/">Yellow Neon</a>', '<a href="/crevette-orange-sakura/">Orange Sakura</a>'],
        vert: ['<a href="/crevette-green-jade/">Green Jade</a>', '<a href="/crevette-chocolate/">Chocolate</a>'],
        noir: ['<a href="/crevette-rili/">Rili</a>'],
        any: ['<a href="/crevette-red-cherry/">Red Cherry</a>', '<a href="/crevette-blue-velvet/">Blue Velvet</a>']
      };
      if (a.obj === 'algue' && a.vol !== 'lt20') {
        h = '<p class="big">Orientation : <strong>Amano</strong></p><p>Les <a href="/crevette-amano/">Amano</a> sont réputées pour brouter les algues. Elles ne se reproduisent pas en eau douce, et un bac d’au moins 30 L est préférable. Les Neocaridina restent une alternative si vous souhaitez une colonie.</p>';
      } else if (!easy && a.exp === 'avance' && (a.eau === 'osmose' || a.eau === 'soft') && a.vol !== 'lt20' && a.col === 'noir') {
        h = '<p class="big">Orientation : <strong>Caridina</strong> (Crystal, Taiwan Bee)</p><p>Votre profil permet d’envisager les <a href="/crevette-crystal-red/">Crystal Red</a>, <a href="/crevette-crystal-black/">Crystal Black</a> ou <a href="/crevette-taiwan-bee/">Taiwan Bee</a>. Elles demandent une eau stable et souvent préparée. Lisez d’abord <a href="/caridina/">le guide des Caridina</a>.</p>';
      } else {
        h = '<p class="big">Orientation : <strong>Neocaridina</strong></p><p>Dans votre situation, les <a href="/neocaridina/">Neocaridina</a> sont le choix le plus raisonnable.</p><p>Selon votre couleur préférée : ' + colors[a.col === 'noir' ? 'noir' : a.col].join(', ') + '.</p>';
        if (a.col === 'noir') notes.push('Les couleurs noir et blanc / rouge et blanc correspondent à des Caridina, plus exigeantes : gardez-les comme objectif à moyen terme et lisez <a href="/neocaridina-ou-caridina/">Neocaridina ou Caridina ?</a>.');
      }
      if (a.vol === 'lt20') notes.push('Sous 20 L, la stabilité de l’eau est plus difficile : voir <a href="/nano-aquarium-crevettes/">les nano-aquariums</a>.');
      if (hardOrUnknown) notes.push('Mesurez votre eau (GH, KH, pH) avant l’achat : voir <a href="/mesurer-parametres-eau-crevettes/">comment mesurer</a>.');
      if (a.poi === 'oui') notes.push('Avec des poissons, les juvéniles de crevettes seront souvent mangés : lisez <a href="/crevettes-avec-poissons/">crevettes avec poissons</a>.');
      if (a.obj === 'repro') notes.push('Pour la reproduction, voir <a href="/reproduire-neocaridina/">comment faire reproduire des Neocaridina</a>.');
      if (notes.length) h += '<h3>À garder en tête</h3><ul>' + notes.map(function (n) { return '<li>' + n + '</li>'; }).join('') + '</ul>';
      h += '<p class="hint">Recommandation indicative : elle ne remplace pas la lecture des guides, ni un échange avec un éleveur. <a href="/toutes-les-especes/">Voir toutes les espèces</a>.</p>';
      out(form).innerHTML = h;
    });
  };

  var RANGES = {
    neocaridina: { temp: [18, 26], ph: [6.5, 8], gh: [4, 12], kh: [2, 8], tds: [100, 300] },
    caridina: { temp: [19, 25], ph: [5.6, 7.2], gh: [3, 8], kh: [0, 4], tds: [80, 220] },
    amano: { temp: [20, 26], ph: [6.5, 7.8], gh: [4, 12], kh: [2, 8], tds: [100, 300] },
    sulawesi: { temp: [26, 30], ph: [7.5, 8.5] }
  };
  var LINKS = {
    neocaridina: { temp: '/temperature-aquarium-crevettes/', ph: '/ph-neocaridina/', gh: '/gh-neocaridina/', kh: '/kh-neocaridina/', tds: '/tds-neocaridina/' },
    caridina: { temp: '/temperature-aquarium-crevettes/', ph: '/parametres-caridina/', gh: '/parametres-caridina/', kh: '/parametres-caridina/', tds: '/parametres-caridina/' }
  };
  var NAMES = { temp: 'Température', ph: 'pH', gh: 'GH', kh: 'KH', tds: 'TDS' };

  tools['mon-aquarium'] = function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var g = document.getElementById('ma-esp').value, R = RANGES[g], good = [], watch = [], arts = {};
      var link = function (p) { var l = (LINKS[g] || LINKS.neocaridina)[p] || '/parametres-eau-crevettes/'; arts[l] = 1; return l; };
      ['temp', 'ph', 'gh', 'kh', 'tds'].forEach(function (p) {
        var v = val('ma-' + p);
        if (v === null || !R[p]) return;
        var lo = R[p][0], hi = R[p][1], unit = p === 'temp' ? ' °C' : p === 'tds' ? ' ppm' : '';
        if (v < lo) watch.push(NAMES[p] + ' (' + fmt(v) + unit + ') : sous le repère habituel de ' + lo + ' à ' + hi + unit + '. <a href="' + link(p) + '">En savoir plus</a>.');
        else if (v > hi) watch.push(NAMES[p] + ' (' + fmt(v) + unit + ') : au-dessus du repère habituel de ' + lo + ' à ' + hi + unit + '. <a href="' + link(p) + '">En savoir plus</a>.');
        else good.push(NAMES[p] + ' (' + fmt(v) + unit + ') est dans le repère habituel (' + lo + ' à ' + hi + unit + ').');
      });
      if (g === 'sulawesi') watch.push('Pour les Sulawesi, les valeurs varient selon l’espèce exacte : comparez avec les conditions de l’éleveur. <a href="/crevette-sulawesi/">Fiche Sulawesi</a>.');
      var vol = val('ma-vol'), n = val('ma-n');
      if (vol && n !== null) {
        var d = DENS[g].d, net = vol * 0.8 / 10;
        if (n > net * d[2]) watch.push('Densité élevée : environ ' + fmt(n / (vol * 0.8)) + ' crevettes par litre de volume net estimé. Surveillez nitrites et nitrates. <a href="/calculateur-nombre-crevettes/">Calculateur</a>.');
        else if (n <= net * d[1]) good.push('Le nombre de crevettes semble raisonnable pour le volume.');
        else good.push('Densité plutôt soutenue mais encore dans les repères : surveillez l’eau.');
      }
      if (vol && vol < 20) watch.push('Moins de 20 L : la stabilité demande plus de rigueur. <a href="/nano-aquarium-crevettes/">Nano-aquariums</a>.');
      if (document.getElementById('ma-poi').value === 'oui') watch.push('Poissons présents : les juvéniles ont peu de chances de survivre sans abris denses. <a href="/crevettes-avec-poissons/">Crevettes avec poissons</a>.');
      if (document.getElementById('ma-pla').value === 'non') watch.push('Peu de plantes ou de mousses : moins d’abris et de biofilm. <a href="/plantes-aquarium-crevettes/">Choisir ses plantes</a>.');
      else good.push('Plantes et mousses : bon support pour le biofilm et les abris.');
      var fil = document.getElementById('ma-fil').value;
      if (fil === 'nue') watch.push('Aspiration non protégée : risque pour les juvéniles. <a href="/filtre-aquarium-crevettes/">Choisir un filtre</a>.');
      else if (fil === 'aucun') watch.push('Sans filtre, l’équilibre biologique est plus fragile. <a href="/filtre-aquarium-crevettes/">Choisir un filtre</a>.');
      else good.push('Filtration adaptée aux crevettes.');
      var h = '<h3>Points positifs</h3>' + (good.length ? '<ul>' + good.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>' : '<p>Rien à signaler pour l’instant : renseignez davantage de champs.</p>');
      h += '<h3>Points à surveiller</h3>' + (watch.length ? '<ul>' + watch.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>' : '<p>Aucun point d’alerte sur les champs renseignés.</p>');
      h += '<h3>Pour aller plus loin</h3><ul><li><a href="/parametres-eau-crevettes/">Paramètres de l’eau pour les crevettes</a></li><li><a href="/problemes-crevettes/">Un problème avec vos crevettes ?</a></li></ul>';
      h += '<p class="hint">Repères informatifs. Chaque bac et chaque souche sont différents : en cas de doute, comparez avec les conditions de votre éleveur.</p>';
      out(form).innerHTML = h;
    });
  };

  tools.filters = function (form) {
    var cards = [].slice.call(document.querySelectorAll('[data-grid] > li'));
    var map = { 'f-niv': 'niveau', 'f-grp': 'groupe', 'f-col': 'couleur', 'f-eau': 'eau', 'f-rep': 'repro', 'f-tai': 'taille' };
    function run() {
      var shown = 0;
      cards.forEach(function (c) {
        var ok = true;
        Object.keys(map).forEach(function (id) {
          var v = document.getElementById(id).value;
          if (v && c.dataset[map[id]] !== v) ok = false;
        });
        c.hidden = !ok;
        if (ok) shown++;
      });
      $('[data-count]', form).textContent = shown + ' fiche' + (shown > 1 ? 's' : '') + ' affichée' + (shown > 1 ? 's' : '') + ' sur ' + cards.length + '.';
    }
    form.addEventListener('change', run);
    form.addEventListener('submit', function (e) { e.preventDefault(); });
    run();
  };

  tools.checklist = function (root) {
    var boxes = [].slice.call(root.querySelectorAll('input[type=checkbox]'));
    var store = null;
    try { store = window.localStorage; } catch (e) { store = null; }
    boxes.forEach(function (b) {
      try { if (store && store.getItem('chk-' + b.dataset.key) === '1') b.checked = true; } catch (e) {}
      b.addEventListener('change', function () { try { if (store) store.setItem('chk-' + b.dataset.key, b.checked ? '1' : '0'); } catch (e) {} });
    });
    var p = $('[data-print]', root), r = $('[data-reset]', root);
    if (p) p.addEventListener('click', function () { window.print(); });
    if (r) r.addEventListener('click', function () { boxes.forEach(function (b) { b.checked = false; try { if (store) store.setItem('chk-' + b.dataset.key, '0'); } catch (e) {} }); });
  };

  document.querySelectorAll('[data-tool]').forEach(function (el) { var t = tools[el.getAttribute('data-tool')]; if (t) t(el); });
})();
