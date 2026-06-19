(function () {
  'use strict';

  var WA_NUMBER = '5511983868766';
  var WA_MESSAGE = 'Olá, gostaria de agendar uma consulta.';
  var WA_URL = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(WA_MESSAGE);

  // Dispara evento GA4 se gtag estiver carregado
  function trackEvent(eventName, params) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }
  }

  // Configura todos os elementos .wa-link com URL e tracking
  function setupWALinks() {
    var links = document.querySelectorAll('.wa-link');
    links.forEach(function (el) {
      el.setAttribute('href', WA_URL);
      el.addEventListener('click', function () {
        var label = el.getAttribute('data-label') || 'desconhecido';
        trackEvent('whatsapp_click', {
          event_category: 'CTA',
          event_label: label,
        });
      });
    });
  }

  // Smooth scroll para links âncora internos (nav desktop)
  function setupSmoothScroll() {
    var anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var href = anchor.getAttribute('href');
        if (href === '#') return; // WA links handled by setupWALinks
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    setupWALinks();
    setupSmoothScroll();
  });

})();
