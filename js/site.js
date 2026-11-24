(function () {
  'use strict';
  var WA = '573054215050';
  function waLink(msg) { return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(msg); }

  // Enlaces de WhatsApp con mensaje: data-wa="mensaje"
  document.querySelectorAll('[data-wa]').forEach(function (a) {
    a.href = waLink(a.getAttribute('data-wa'));
    a.target = '_blank';
    a.rel = 'noopener';
  });

  // Filtros del catálogo
  var chips = document.querySelectorAll('.chip[data-filter]');
  var sections = document.querySelectorAll('.cat-section[data-cat]');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var f = chip.getAttribute('data-filter');
      chips.forEach(function (c) { c.setAttribute('aria-pressed', c === chip ? 'true' : 'false'); });
      sections.forEach(function (s) { s.hidden = !(f === 'todo' || s.getAttribute('data-cat') === f); });
      var first = document.querySelector('.cat-section:not([hidden])');
      if (first && f !== 'todo') first.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
  var hash = location.hash.replace('#', '');
  if (hash) {
    var target = document.querySelector('.chip[data-filter="' + hash + '"]');
    if (target) target.click();
  }

  // Visor del catálogo
  var dlg = document.getElementById('viewer');
  if (dlg && dlg.showModal) {
    var vImg = dlg.querySelector('.viewer-img');
    var img = vImg.querySelector('img');
    var title = dlg.querySelector('h3');
    var desc = dlg.querySelector('.v-desc');
    var cta = dlg.querySelector('.v-cta');
    document.querySelectorAll('.tile-media').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var t = btn.closest('.tile');
        var tone = t.getAttribute('data-tone') || 'sand';
        var prod = t.getAttribute('data-kind') === 'product';
        img.src = t.getAttribute('data-full');
        img.alt = t.getAttribute('data-alt');
        vImg.className = 'viewer-img ' + tone + (prod ? ' product' : '');
        title.textContent = t.getAttribute('data-name');
        desc.textContent = t.getAttribute('data-desc');
        cta.href = waLink('Hola SLOW, vi el catálogo y me interesa: ' + t.getAttribute('data-name') + '. ¿Me pueden enviar muestra o cotización?');
        dlg.showModal();
      });
    });
    dlg.querySelector('.viewer-close').addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  }

  // Formulario -> WhatsApp
  var form = document.getElementById('quote-form');
  if (form) {
    var needs = { muestras: 'Muestras físicas', cotizacion: 'Cotización de un proyecto', medida: 'Piezas a la medida', info: 'Información general' };
    var sel = document.getElementById('f-need');
    var q = new URLSearchParams(location.search).get('need');
    if (q && needs[q]) sel.value = needs[q];
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = function (id) { return (document.getElementById(id).value || '').trim(); };
      if (!v('f-name')) { document.getElementById('f-name').focus(); return; }
      var lines = ['Hola SLOW, soy ' + v('f-name') + (v('f-studio') ? ' de ' + v('f-studio') : '') + '.',
        'Me interesa: ' + v('f-need') + '.'];
      if (v('f-project')) lines.push('Proyecto: ' + v('f-project') + '.');
      if (v('f-details')) lines.push(v('f-details'));
      window.open(waLink(lines.join('\n')), '_blank', 'noopener');
    });
  }
})();
