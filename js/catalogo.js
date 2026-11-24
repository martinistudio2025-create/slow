/* SLOW Concreto Circular | Catálogo: filtros y enlaces de WhatsApp */
(function () {
  'use strict';

  var WHATSAPP = '573054215050'; // formato internacional, sin + ni espacios

  // Cada botón con data-wa abre WhatsApp con el nombre de la pieza.
  document.querySelectorAll('[data-wa]').forEach(function (el) {
    var text = 'Hola SLOW, vi el catálogo y me interesa: ' + el.getAttribute('data-wa') +
      '. ¿Me pueden enviar muestra o cotización?';
    el.href = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(text);
    el.target = '_blank';
    el.rel = 'noopener';
  });

  // Filtros por categoría.
  var buttons = document.querySelectorAll('.chip-btn');
  var sections = document.querySelectorAll('.cat-section');

  function apply(filter) {
    sections.forEach(function (s) {
      s.hidden = !(filter === 'all' || s.getAttribute('data-cat') === filter);
    });
    buttons.forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-filter') === filter ? 'true' : 'false');
    });
  }

  buttons.forEach(function (b) {
    b.addEventListener('click', function () { apply(b.getAttribute('data-filter')); });
  });

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
