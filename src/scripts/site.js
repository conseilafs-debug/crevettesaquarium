/* Comportements globaux : menu mobile et sommaire repliable. Le site reste utilisable sans JavaScript. */
(function () {
  'use strict';
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        btn.focus();
      }
    });
  }
  var toc = document.querySelector('.toc details');
  if (toc && window.matchMedia && window.matchMedia('(max-width: 900px)').matches) toc.removeAttribute('open');
})();
