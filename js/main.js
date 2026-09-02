(function () {
  'use strict';

  var WA_NUMBER = '5511936245113';
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

  function setupScrollAnimations() {
    if (!window.matchMedia('(min-width: 768px)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;

    var STEP = 80; // ms entre itens em stagger

    // Itens de lista: cada selector tem stagger independente
    ['.esp-item', '.check-item', '.cf-step', '.faq-item', '.seal', '.sobre-bio', '.dif-desc'].forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el, i) {
        el.classList.add('reveal');
        if (i > 0) el.style.transitionDelay = (i * STEP) + 'ms';
      });
    });

    // Blocos individuais (sem delay)
    ['.section-title', '.section-sub', '.sobre-header', '.cf-note', '.excl-text', '.fca-title', '.fca-sub'].forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        el.classList.add('reveal');
      });
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    setupWALinks();
    setupSmoothScroll();
    setupScrollAnimations();
  });

})();
