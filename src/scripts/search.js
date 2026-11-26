/* Recherche interne : index JSON léger chargé à la demande, filtrage côté navigateur. */
(function () {
  'use strict';
  var input = document.getElementById('q-s');
  var list = document.getElementById('search-results');
  var status = document.getElementById('search-status');
  if (!input || !list) return;

  var norm = function (s) {
    return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/œ/g, 'oe').replace(/[^a-z0-9]+/g, ' ').trim();
  };
  var index = null;
  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); };

  function score(entry, tokens) {
    var s = 0;
    for (var i = 0; i < tokens.length; i++) {
      var t = tokens[i], hit = false;
      if (entry.tn.indexOf(t) !== -1) { s += entry.tn.indexOf(t) === 0 ? 8 : 6; hit = true; }
      if (entry.kn.indexOf(t) !== -1) { s += 4; hit = true; }
      if (entry.hn.indexOf(t) !== -1) { s += 3; hit = true; }
      if (entry.dn.indexOf(t) !== -1) { s += 2; hit = true; }
      if (entry.cn.indexOf(t) !== -1) { s += 1; hit = true; }
      if (!hit) return 0;
    }
    return s;
  }

  function render(q) {
    var tokens = norm(q).split(' ').filter(function (t) { return t.length > 1 || /\d|ph|gh|kh/.test(t); });
    if (!tokens.length) { list.innerHTML = ''; status.textContent = 'Saisissez au moins un mot.'; return; }
    var res = index.map(function (e) { return { e: e, s: score(e, tokens) }; })
      .filter(function (x) { return x.s > 0; })
      .sort(function (a, b) { return b.s - a.s; })
      .slice(0, 30);
    if (!res.length) {
      list.innerHTML = '';
      status.innerHTML = 'Aucun résultat pour « ' + esc(q) + ' ». Essayez un mot plus court ou parcourez les <a href="/bien-debuter/">catégories</a>.';
      return;
    }
    status.textContent = res.length + ' résultat' + (res.length > 1 ? 's' : '') + ' pour « ' + q + ' ».';
    list.innerHTML = res.map(function (x) {
      return '<li><a href="' + esc(x.e.u) + '"><span class="card-title">' + esc(x.e.t) + '</span><span class="card-desc">' + esc(x.e.c) + ' · ' + esc(x.e.d) + '</span></a></li>';
    }).join('');
  }

  function load(cb) {
    if (index) return cb();
    status.textContent = 'Chargement de l’index…';
    fetch('/search-index.json').then(function (r) { return r.json(); }).then(function (data) {
      index = data.map(function (e) {
        e.tn = norm(e.t); e.dn = norm(e.d); e.hn = norm(e.h); e.cn = norm(e.c); e.kn = norm(e.k);
        return e;
      });
      cb();
    }).catch(function () { status.textContent = 'La recherche est momentanément indisponible. Parcourez les catégories du menu.'; });
  }

  var params = new URLSearchParams(location.search);
  var q0 = params.get('q') || '';
  input.value = q0;
  if (q0) load(function () { render(q0); });
  var timer;
  input.addEventListener('input', function () {
    clearTimeout(timer);
    timer = setTimeout(function () { load(function () { render(input.value); }); }, 120);
  });
  input.form.addEventListener('submit', function (e) {
    e.preventDefault();
    var v = input.value;
    history.replaceState(null, '', '?q=' + encodeURIComponent(v));
    load(function () { render(v); });
  });
})();
