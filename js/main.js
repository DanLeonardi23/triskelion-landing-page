(function () {
  'use strict';

  var WA_NUMBER = '5511936245113';
  var WA_MESSAGE = 'Olá, gostaria de agendar uma consulta.';
  var WA_URL = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(WA_MESSAGE);

  // Identificador da conversão "Clique no WhatsApp" no Google Ads
  var GADS_CONVERSION_LABEL = 'AW-18480596736/lO_kCOLBsokdEICOnuxE';

  // Dispara evento GA4 se gtag estiver carregado
  function trackEvent(eventName, params) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }
  }

  // Dispara a conversão do Google Ads (sem dados pessoais, apenas o sinal de clique)
  function trackConversion() {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', { send_to: GADS_CONVERSION_LABEL });
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
        trackConversion();
      });
    });
  }

  // Altura real do nav sticky, usada pelo scroll-padding-top do CSS
  function updateNavHeight() {
    var nav = document.getElementById('nav');
    if (nav) {
      document.documentElement.style.setProperty('--nav-h', nav.offsetHeight + 'px');
    }
  }

  // Posição Y do alvo descontando nav e scroll-margin. Usa offsetTop (ignora
  // o translateY das animações .reveal, que deslocaria o destino).
  function targetScrollY(target) {
    var y = 0;
    for (var el = target; el; el = el.offsetParent) y += el.offsetTop;
    var nav = document.getElementById('nav');
    var margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
    return Math.max(0, y - (nav ? nav.offsetHeight : 0) - margin);
  }

  function scrollToTarget(target, smooth) {
    var html = document.documentElement;
    var prev = html.style.scrollBehavior;
    if (!smooth) html.style.scrollBehavior = 'auto';
    window.scrollTo({ top: targetScrollY(target), behavior: smooth ? 'smooth' : 'auto' });
    html.style.scrollBehavior = prev;
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
          scrollToTarget(target, true);
          history.replaceState(null, '', href);
        }
      });
    });
  }

  // Abertura direta via URL com âncora (sitelinks do Google Ads, ex.: /#lideranca).
  // Reposiciona após fontes e imagens carregarem, pois mudam a altura do layout,
  // a menos que o usuário já tenha começado a rolar.
  function setupHashLanding() {
    var hash = window.location.hash;
    if (!hash || hash === '#') return;
    var target;
    try { target = document.querySelector(hash); } catch (err) { return; }
    if (!target) return;

    var userScrolled = false;
    ['wheel', 'touchstart', 'keydown'].forEach(function (evt) {
      window.addEventListener(evt, function () { userScrolled = true; }, { once: true, passive: true });
    });

    function land() {
      if (userScrolled) return;
      updateNavHeight();
      scrollToTarget(target, false);
    }

    land();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(land);
    window.addEventListener('load', land);
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
    updateNavHeight();
    setupWALinks();
    setupSmoothScroll();
    setupScrollAnimations();
    setupHashLanding();
  });

  window.addEventListener('resize', updateNavHeight);

})();
