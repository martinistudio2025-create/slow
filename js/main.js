/* SLOW Concreto Circular | Lógica del formulario
   El formulario arma un mensaje y abre WhatsApp. No usa backend. */

(function () {
  'use strict';

  // Cambia estos datos si el contacto cambia.
  var CONFIG = {
    whatsapp: '573054215050' // formato internacional, sin + ni espacios
  };

  var form = document.getElementById('lead-form');
  var submitBtn = document.getElementById('wa-submit');
  var nameInput = document.getElementById('f-name');
  var studioInput = document.getElementById('f-studio');
  var projectSelect = document.getElementById('f-project');
  var needSelect = document.getElementById('f-need');
  var detailsInput = document.getElementById('f-details');

  function buildMessage() {
    var name = nameInput.value.trim();
    var studio = studioInput.value.trim();
    var details = detailsInput.value.trim();
    var lines = ['Hola SLOW, soy ' + (name || '[mi nombre]') + (studio ? ' de ' + studio : '') + '.'];
    lines.push('Tipo de proyecto: ' + projectSelect.value + '.');
    lines.push('Necesito: ' + needSelect.value + '.');
    if (details) lines.push('Detalles: ' + details);
    return lines.join('\n');
  }

  function update() {
    var ready = nameInput.value.trim().length > 1;
    if (ready) {
      submitBtn.href = 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(buildMessage());
      submitBtn.textContent = 'Enviar solicitud por WhatsApp';
      submitBtn.classList.remove('is-disabled');
      submitBtn.removeAttribute('aria-disabled');
      submitBtn.target = '_blank';
      submitBtn.rel = 'noopener';
    } else {
      submitBtn.href = '#contacto';
      submitBtn.textContent = 'Escribe tu nombre para continuar';
      submitBtn.classList.add('is-disabled');
      submitBtn.setAttribute('aria-disabled', 'true');
      submitBtn.removeAttribute('target');
      submitBtn.removeAttribute('rel');
    }
  }

  if (form && submitBtn) {
    form.addEventListener('input', update);
    form.addEventListener('change', update);
    form.addEventListener('submit', function (e) { e.preventDefault(); });
    update();
  }

  // Los botones de cada línea preseleccionan lo que se necesita en el formulario.
  document.querySelectorAll('[data-need]').forEach(function (el) {
    el.addEventListener('click', function () {
      var value = el.getAttribute('data-need');
      if (needSelect) {
        needSelect.value = value;
        update();
      }
    });
  });

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
