/* =============================================================================
   CALMA CALMA — main.js
   GSAP + ScrollTrigger only. Everything animates transform / opacity.

   01 environment   02 dictionary + PT/EN   03 nav   04 generated SVG
   05 hero load     06 the handoff          07 carousel
   08 reveals + parallax + counters         09 hours
   ========================================================================== */
(function () {
  'use strict';

  /* -- 01 ENVIRONMENT ----------------------------------------------------- */
  var reduceMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
  var smallMQ  = window.matchMedia('(max-width: 768px)');
  var REDUCE   = reduceMQ.matches;
  var SMALL    = smallMQ.matches;
  var hasGSAP  = typeof window.gsap !== 'undefined';

  if (hasGSAP && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var svgNS = 'http://www.w3.org/2000/svg';

  /* -- 02 DICTIONARY ------------------------------------------------------ */
  /* Portuguese is what lives in the HTML, so the page is PT with JS off.
     The EN column is swapped in on demand via [data-i18n]. */
  var EN = {
    'a11y.skip': 'Skip to content',
    'a11y.prev': 'Previous moment',
    'a11y.next': 'Next moment',

    'nav.pranzo': 'Pranzo', 'nav.casa': 'The House', 'nav.aperitivo': 'Aperitivo',
    'nav.cena': 'Cena', 'nav.mercearia': 'Grocery', 'nav.onde': 'Find us',
    'nav.ondeLong': 'Where &amp; When',
    'nav.panelScript': 'no rush',

    'cta.reserve': 'Book a table', 'cta.reserveShort': 'Book', 'cta.seeDay': 'See the day',

    'hero.script': 'an Italian in Setúbal',
    'hero.cue': 'slowly',

    'plate.0.label': 'Pranzo', 'plate.0.time': '12:30 - 14:30',
    'plate.0.copy': 'Pasta made this morning, fish off the quay, vegetables from whoever picked them. Lunch takes as long as it takes.',
    'plate.1.label': 'Aperitivo', 'plate.1.time': '18:30 - 20:00',
    'plate.1.copy': 'Musa craft beer, natural wine, calamari fritti. The terrace holds the sun until late.',
    'plate.2.label': 'Cena', 'plate.2.time': '20:00 - 23:30',
    'plate.2.copy': 'Ravioli of the day, agnolotti, spaghettoni with whatever the sea gave. And carbonara, always.',
    'plate.3.label': 'To take home', 'plate.3.time': 'Grocery',
    'plate.3.copy': "The day's fresh pasta, a rotating wine selection and produce from small local farmers.",

    'pranzo.eyebrow': 'The day starts slowly',
    'pranzo.title': 'There is no fixed menu.',
    'pranzo.lede': 'What arrived today and the pasta Seb made this morning.',
    'pranzo.foot': 'Turn the plate to see the rest of the day.',

    'casa.stamp': 'every day',
    'casa.eyebrow': 'The house',
    'casa.title': 'Two countries in one kitchen. Three, if you count the room.',
    'casa.p1': 'Seb - Eusebiu Tuchilus - makes fresh pasta every morning, the way he learned in Italy. Lovejoy, a Filipino architect and his partner, designed the space herself: wood, exposed cement, steel, terracotta and green.',
    'casa.p2': 'They opened on 8 August 2025, on a street in the historic centre of Setúbal. The menu changes with the market and the fish auction. Choco frito stayed, out of respect for the town.',
    'casa.quote': '“It’s a slightly different concept. An Italian restaurant, but we use products from the Setúbal region.”',
    'casa.cite': 'Chef Seb, founder',
    'casa.stat1': 'seats inside', 'casa.stat2': 'on the terrace', 'casa.stat3': 'Portuguese wines',

    'ap.a': 'APER', 'ap.b': 'ITIVO',
    'ap.copy': 'Musa craft beer, natural wine, a vermouth over ice. No big-brand soft drinks - we are proud of that. The terrace catches the last sun on Rua Antão Girão.',

    'cena.eyebrow': 'When the sun goes down',
    'cena.title': 'THE NIGHT LINGERS',
    'cena.script': 'and just as well',
    'cena.wineEyebrow': 'The cellar',
    'cena.w1': 'Portuguese wine', 'cena.w2': 'Italian wine',
    'cena.w3': 'Musa, craft beer', 'cena.w3v': 'on tap',
    'cena.w4': 'Big-brand soft drinks', 'cena.w4v': 'none',
    'cena.wineNote': 'The selection rotates. If you like the bottle, take another one home from the grocery next door.',
    'cena.shrineLabel': 'Always on the menu',
    'cena.shrineTitle': 'Carbonara',
    'cena.shrineCopy': 'Guanciale and pecorino romano. No cream, no shortcuts, no debate.',
    'cena.shrineScript': 'the only constant on the menu',

    'po.eyebrow': 'When the oven opens',
    'po.title': 'PORCHETTA',
    'po.copy': 'Pork belly rolled with rosemary, fennel and garlic, roasting slowly until the skin cracks. It is the slowest dish in the house - and the first to run out.',
    'po.tag': 'Sundays · while it lasts',

    'merc.eyebrow': 'Grocery',
    'merc.title': 'Take the calm home with you.',
    'merc.i1t': 'Local produce', 'merc.i1c': 'From small growers in the region. Whatever there is, whenever there is.',
    'merc.i2t': 'Rotating cellar', 'merc.i2c': 'Portuguese and Italian, always changing. Taste it at the table, take the bottle.',
    'merc.i3t': 'Fresh pasta to go', 'merc.i3c': 'The same pasta as the kitchen, wrapped in paper. Three minutes at home.',
    'merc.cta': '@calmacalmamercearia',

    'rev.eyebrow': 'Those who have tasted it',
    'rev.title': 'They always stay a little longer.',
    'rev.q1': '“Everything was so tasty and the service was always so friendly. We will recommend and be back.”', 'rev.a1': 'Fernanda Martins, Google',
    'rev.q2': '“Food 10/10... Service great and friendly, and a really lovely atmosphere.”', 'rev.a2': 'Luiza Gil, Google',
    'rev.q3': '“Warm, chatty staff. You leave calmer than you arrived.”', 'rev.a3': 'At the counter',
    'rev.rating': 'out of 5 · Tripadvisor &amp; RestaurantGuru',

    'onde.eyebrow': 'Where &amp; when',
    'onde.title': 'Rua Antão Girão, 44',
    'onde.maps': 'Open in Google Maps',
    'onde.hoursEyebrow': 'Opening hours',
    'onde.hoursCaption': 'Opening hours',
    'onde.day': 'Day', 'onde.time': 'Hours',
    'onde.d1': 'Monday to Thursday', 'onde.d2': 'Friday and Saturday', 'onde.d3': 'Sunday',
    'onde.hoursNote': 'Hours subject to confirmation - call us if you are coming from far away.',
    'onde.addr': 'Address', 'onde.phone': 'Phone',

    'res.eyebrow': 'Book',
    'res.title': 'The table is set.',
    'res.script': 'just you now',
    'res.call': 'Call +351 938 102 159',
    'res.dm': 'Message on Instagram',

    'ft.blurb': 'Trattoria and grocery in the historic centre of Setúbal. Italian cooking with what the region gives, since 8 August 2025.',
    'ft.visit': 'Visit', 'ft.follow': 'Follow',

    'alt.hero': 'Flour-dusted hands working fresh pasta dough on the counter.',
    'alt.pasta': 'Two plates of fresh pasta on a laid table, with the calma calma card between them.',
    'alt.share': 'Oysters, cured ham with melon and tomato, seen from above on the tablecloth.',
    'alt.pappardelle': 'Pappardelle al ragù, with grated cheese over the top.',
    'alt.chef': 'A cook at the pass dusting cheese over a row of vegetable dishes.',
    'alt.room': 'A full dining room at night, service moving between the tables in warm light.',
    'alt.carbonara': 'Carbonara with guanciale and pecorino, cheese falling over the plate.',
    'alt.merc': 'Grocery shelves with vegetables and local produce.',
    'alt.porchetta': 'A whole roast porchetta on a platter, with rosemary and garlic cloves.',
    'alt.wineglass': 'A glass of red wine.'
  };

  var PT = {};  /* filled from the markup on first run */

  function collectPT() {
    $$('[data-i18n]').forEach(function (el) { PT[el.dataset.i18n] = el.innerHTML; });
    $$('[data-i18n-alt]').forEach(function (el) { PT[el.dataset.i18nAlt] = el.getAttribute('alt'); });
    $$('[data-i18n-aria]').forEach(function (el) { PT[el.dataset.i18nAria] = el.getAttribute('aria-label'); });
  }

  function setLang(lang) {
    var dict = lang === 'en' ? EN : PT;
    $$('[data-i18n]').forEach(function (el) {
      var v = dict[el.dataset.i18n];
      if (v != null) el.innerHTML = v;
    });
    $$('[data-i18n-alt]').forEach(function (el) {
      var v = dict[el.dataset.i18nAlt];
      if (v != null) el.setAttribute('alt', v);
    });
    $$('[data-i18n-aria]').forEach(function (el) {
      var v = dict[el.dataset.i18nAria];
      if (v != null) el.setAttribute('aria-label', v);
    });
    document.documentElement.lang = lang === 'en' ? 'en' : 'pt-PT';
    $$('.lang__btn').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
    });
    try { localStorage.setItem('cc-lang', lang); } catch (e) {}
  }

  collectPT();
  $$('.lang__btn').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.dataset.lang); });
  });
  try {
    var saved = localStorage.getItem('cc-lang');
    if (saved === 'en') setLang('en');
  } catch (e) {}

  /* -- 03 NAV ------------------------------------------------------------- */
  var nav = $('#nav');
  var navToggle = $('#navToggle');
  var navPanel = $('#navPanel');
  var ticking = false;

  var heroEl = $('#hero');
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      /* solid only once the hero has actually cleared the bar. Switching on a
         fixed 80px put an opaque cream band over the dark hero for the whole
         scroll, and the wordmark and then the plate were visibly sliced by it. */
      var solid = heroEl ? heroEl.getBoundingClientRect().bottom <= nav.offsetHeight
                         : window.scrollY > 80;
      nav.classList.toggle('nav--scrolled', solid);
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* the overlay covers the page, so everything behind it goes inert and focus
     moves into the panel — otherwise tabbing walks off into hidden content */
  var offstage = [document.querySelector('main'), document.querySelector('.footer'),
                  document.querySelector('.reserve-pill')].filter(Boolean);
  function label(open) {
    var en = document.documentElement.lang === 'en';
    return open ? (en ? 'Close menu' : 'Fechar menu') : (en ? 'Open menu' : 'Abrir menu');
  }
  function setMenu(open) {
    nav.classList.toggle('nav--open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', label(open));
    document.body.style.overflow = open ? 'hidden' : '';
    offstage.forEach(function (n) { n.inert = open; });
  }
  function closeMenu() { setMenu(false); }
  navToggle.addEventListener('click', function () {
    var open = !nav.classList.contains('nav--open');
    setMenu(open);
    if (open) { var first = navPanel.querySelector('a'); if (first) first.focus(); }
  });
  $$('a', navPanel).forEach(function (a) { a.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('nav--open')) { closeMenu(); navToggle.focus(); }
  });

  /* -- 04 GENERATED SVG ---------------------------------------------------- */
  /* Every decorative drawing on this page is written by these functions —
     no hand-authored path data, no image requests. */

  function el(tag, attrs) {
    var n = document.createElementNS(svgNS, tag);
    for (var k in attrs) if (attrs.hasOwnProperty(k)) n.setAttribute(k, attrs[k]);
    return n;
  }
  function pt(x, y, i) { return (i ? 'L' : 'M') + x.toFixed(2) + ' ' + y.toFixed(2); }

  /* Archimedean spiral: r = a + b·θ  (the rolled belly) */
  function spiral(a, b, turns, offset, steps) {
    steps = steps || 320;
    var max = turns * Math.PI * 2, d = [], i, t, r;
    for (i = 0; i <= steps; i++) {
      t = max * i / steps;
      r = a + b * t + (offset || 0);
      d.push(pt(r * Math.cos(t), r * Math.sin(t), i));
    }
    return d.join(' ');
  }
  /* the crackling: a circle whose radius is perturbed by three harmonics */
  function wobbly(base, steps) {
    steps = steps || 400;
    var d = [], i, t, r;
    for (i = 0; i < steps; i++) {
      t = (i / steps) * Math.PI * 2;
      r = base + 6 * Math.sin(9 * t) + 3.5 * Math.sin(17 * t) + 2 * Math.sin(29 * t);
      d.push(pt(r * Math.cos(t), r * Math.sin(t), i));
    }
    return d.join(' ') + ' Z';
  }

  /* quadratic helpers, for stems */
  function qPoint(p0, p1, p2, t) {
    var u = 1 - t;
    return [u * u * p0[0] + 2 * u * t * p1[0] + t * t * p2[0],
            u * u * p0[1] + 2 * u * t * p1[1] + t * t * p2[1]];
  }
  function qTangent(p0, p1, p2, t) {
    var u = 1 - t;
    var x = 2 * u * (p1[0] - p0[0]) + 2 * t * (p2[0] - p1[0]);
    var y = 2 * u * (p1[1] - p0[1]) + 2 * t * (p2[1] - p1[1]);
    var m = Math.hypot(x, y) || 1;
    return [x / m, y / m];
  }

  /* rosemary: a quadratic stem with paired needles along it */
  function buildSprig(svg, opts) {
    var p0 = opts.p0, p1 = opts.p1, p2 = opts.p2;
    var g = el('g', { 'class': 'sprig__g' });
    if (opts.mirror) g.setAttribute('transform', 'translate(' + opts.width + ',0) scale(-1,1)');
    g.appendChild(el('path', { d: 'M' + p0 + ' Q' + p1 + ' ' + p2, 'class': 'ln ln--stem' }));

    var a = p0.split(' ').map(Number), b = p1.split(' ').map(Number), c = p2.split(' ').map(Number);
    var n = opts.needles || 26, i, t, P, T, len, ang, dx, dy, s;
    for (i = 1; i < n; i++) {
      t = i / n;
      P = qPoint(a, b, c, t);
      T = qTangent(a, b, c, t);
      len = (opts.needle || 40) * (0.45 + 0.55 * Math.sin(Math.PI * t)) * (i % 2 ? 1 : 0.86);
      for (s = -1; s <= 1; s += 2) {
        ang = 0.62 * s;                       /* needles swept back off the stem */
        dx = T[0] * Math.cos(ang) - T[1] * Math.sin(ang);
        dy = T[0] * Math.sin(ang) + T[1] * Math.cos(ang);
        g.appendChild(el('path', {
          d: 'M' + P[0].toFixed(1) + ' ' + P[1].toFixed(1) +
             'L' + (P[0] + dx * len).toFixed(1) + ' ' + (P[1] + dy * len).toFixed(1),
          'class': 'ln'
        }));
      }
    }
    svg.appendChild(g);
  }

  /* olive branch: same skeleton, oval leaves instead of needles */
  function buildBranch(svg, opts) {
    var g = el('g', {});
    if (opts.mirror) g.setAttribute('transform', 'translate(' + opts.width + ',0) scale(-1,1)');
    var a = opts.p0, b = opts.p1, c = opts.p2;
    g.appendChild(el('path', { d: 'M' + a.join(' ') + ' Q' + b.join(' ') + ' ' + c.join(' '), 'class': 'ln ln--stem' }));
    var n = opts.leaves || 11, i, t, P, T, ang, s, L;
    for (i = 1; i <= n; i++) {
      t = i / (n + 1);
      P = qPoint(a, b, c, t);
      T = qTangent(a, b, c, t);
      for (s = -1; s <= 1; s += 2) {
        ang = Math.atan2(T[1], T[0]) + s * 0.75;
        L = (opts.leaf || 34) * (0.6 + 0.4 * Math.sin(Math.PI * t));
        g.appendChild(el('ellipse', {
          cx: (P[0] + Math.cos(ang) * L * 0.55).toFixed(1),
          cy: (P[1] + Math.sin(ang) * L * 0.55).toFixed(1),
          rx: (L * 0.55).toFixed(1), ry: (L * 0.2).toFixed(1),
          transform: 'rotate(' + (ang * 180 / Math.PI).toFixed(1) + ' ' +
                     (P[0] + Math.cos(ang) * L * 0.55).toFixed(1) + ' ' +
                     (P[1] + Math.sin(ang) * L * 0.55).toFixed(1) + ')',
          'class': 'ln'
        }));
      }
      if (i % 4 === 2) g.appendChild(el('circle', { cx: P[0].toFixed(1), cy: P[1].toFixed(1), r: 5, 'class': 'ln ln--fruit' }));
    }
    svg.appendChild(g);
  }

  /* -- the porchetta watermark -------------------------------------------- */
  /* The dish itself is now a photograph. What stays generated is the oversized
     echo behind it: the same Archimedean spiral the roll actually makes. */
  function buildPorchettaMark(svg) {
    var g = el('g', { 'class': 'po' });
    g.appendChild(el('path', { d: spiral(12, 7.1, 3, 0), 'class': 'po__roll' }));
    g.appendChild(el('path', { d: wobbly(166), 'class': 'po__wm' }));
    svg.appendChild(g);
  }

  buildPorchettaMark($('#poWatermark'));
  buildSprig($('#sprigL'), { p0: '18 452', p1: '96 268', p2: '178 24', width: 300, needle: 46, needles: 26 });
  buildSprig($('#sprigR'), { p0: '18 452', p1: '110 300', p2: '160 18', width: 300, needle: 42, needles: 24, mirror: true });
  buildBranch($('#branchTL'), { p0: [10, 30], p1: [190, 120], p2: [380, 340], width: 400, leaf: 40, leaves: 10 });
  buildBranch($('#branchBR'), { p0: [10, 40], p1: [200, 150], p2: [386, 350], width: 400, leaf: 38, leaves: 9, mirror: true });
  buildBranch($('#apGhost'), { p0: [40, 340], p1: [600, 20], p2: [1160, 320], width: 1200, leaf: 74, leaves: 15 });

  /* -- 05 HERO LOAD -------------------------------------------------------- */
  var heroScript  = $('#heroScript');
  var heroBottom  = $('#heroBottom');
  var heroImg     = $('#heroImg');

  if (hasGSAP && !REDUCE) {
    var intro = gsap.timeline({ defaults: { ease: 'power2.out' } });
    intro.from(heroImg, { scale: 1.06, duration: 2, ease: 'power2.out' }, 0)
         .from($('#heroTitle'), { y: 28, opacity: 0, duration: 1.3 }, 0.25)
         .from(heroScript, { opacity: 0, y: 14, duration: 1 }, 1.05)
         .from(heroBottom, { opacity: 0, y: 16, duration: 1 }, 1.25);
  }

  /* -- 06 THE HANDOFF ------------------------------------------------------ */
  /* One .plate element. The layer it lives on is natively sticky across the
     hero and pranzo, so the fixed → in-flow transition at the bottom of
     pranzo is done by the browser — there is no pin boundary to jump at.
     ScrollTrigger only drives transforms on top of that. */
  var plateWrap = $('#plateWrap');
  var plate     = $('#plate');
  var plateSpin = $('#plateSpin');
  var plateDial = $('#plateDial');
  var plateCounter = $('#plateCounter');
  var plateContent = $('#plateContent');
  var plateUi   = $('#plateUi');
  var forkful   = $('#forkful');
  var heroTop   = $('.hero__top');

  var HERO_SCALE = 0.56;     /* × ≈1.8 — the dial grows into place */
  var HERO_Y     = 17;       /* breaks the bottom third of the lockup's second line */
  var spinTween, counterTween;

  function startAmbientSpin(seconds) {
    if (REDUCE || !hasGSAP) return;
    spinTween    = gsap.to(plateSpin,    { rotation: '+=360', duration: seconds, ease: 'none', repeat: -1 });
    counterTween = gsap.to(plateCounter, { rotation: '-=360', duration: seconds, ease: 'none', repeat: -1 });
  }

  var uiLive = false, inView = false;
  function liveUi() {
    uiLive = true;
    plateUi.classList.add('is-live');
  }

  if (hasGSAP && !REDUCE && !SMALL) {
    /* ---- desktop: scrub-linked handoff ---- */
    gsap.set(plateWrap, { y: HERO_Y, scale: HERO_SCALE });
    gsap.set(plate, { rotateX: 18 });
    gsap.set(plateWrap, { willChange: 'transform' });
    gsap.set(plateContent, { opacity: 0 });   /* the dial's copy arrives with the dial */

    startAmbientSpin(30);
    spinTween.timeScale(0);
    counterTween.timeScale(0);

    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: '+=100%',          /* the move lands exactly where the sticky layer releases */
        scrub: true,
        onLeave: function () {
          gsap.set(plateWrap, { willChange: 'auto' });   /* drop the layer once we land */
          liveUi();
        },
        /* covers a reload that restores scroll past the hero, where onLeave
           never fires and the dial would otherwise sit there inert */
        onUpdate: function (self) { if (self.progress >= 1 && !uiLive) liveUi(); },
        onEnterBack: function () { uiLive = false; plateUi.classList.remove('is-live'); }
      }
    });
    /* 0 → .35   the forkful lifts away */
    tl.to(forkful, { y: -180, opacity: 0, ease: 'power1.in', duration: 0.35 }, 0);
    /* .2 → .7   the arc recedes; the plate flattens from table view to overhead */
    tl.to(heroTop, { scale: 0.8, opacity: 0, ease: 'power1.in', duration: 0.5 }, 0.2);
    tl.to(plate,   { rotateX: 0, ease: 'none', duration: 0.5 }, 0.2);
    /* .4 → 1    the plate grows into the dial and the spin winds up */
    tl.to(plateWrap, { y: 0, scale: 1, ease: 'none', duration: 0.6 }, 0.4);
    tl.to([spinTween, counterTween], { timeScale: 1, ease: 'none', duration: 0.6 }, 0.4);
    tl.to(plateContent, { opacity: 1, duration: 0.22 }, 0.7);
    tl.to(plateUi, { opacity: 1, duration: 0.25 }, 0.78);

  } else if (hasGSAP && !REDUCE && SMALL) {
    /* ---- mobile: no pin, no scrub. an ordinary reveal. ---- */
    gsap.set(plateWrap, { y: 0, scale: 1 });
    gsap.set(plate, { rotateX: 0 });
    startAmbientSpin(45);
    ScrollTrigger.create({
      trigger: '#plateLayer', start: 'top 80%', once: true,
      onEnter: function () {
        gsap.from(plateWrap, { scale: 0.86, opacity: 0, duration: 1.1, ease: 'power2.out' });
        gsap.to(forkful, { y: -70, opacity: 0, duration: 1.1, ease: 'power2.inOut' });
        gsap.to(plateUi, { opacity: 1, duration: 0.6, delay: 0.5, onStart: liveUi });
      }
    });

  } else {
    /* ---- reduced motion (or no GSAP): two static states, no tweening ---- */
    if (hasGSAP) {
      gsap.set(plateWrap, { y: HERO_Y, scale: HERO_SCALE });
      gsap.set(plate, { rotateX: 18 });
      if (window.ScrollTrigger) {
        ScrollTrigger.create({
          trigger: '#pranzo', start: 'top 60%',
          onEnter: function () {
            gsap.set(plateWrap, { y: 0, scale: 1 });
            gsap.set(plate, { rotateX: 0 });
            gsap.set(forkful, { opacity: 0 });
            gsap.set(plateUi, { opacity: 1 });
            liveUi();
          },
          onLeaveBack: function () {
            gsap.set(plateWrap, { y: HERO_Y, scale: HERO_SCALE });
            gsap.set(plate, { rotateX: 18 });
            gsap.set(forkful, { opacity: 1 });
          }
        });
      }
    } else {
      plateUi.style.opacity = 1;
      liveUi();
    }
  }

  /* -- 07 CAROUSEL --------------------------------------------------------- */
  var moments = $$('.moment');
  var dotsHost = $('#plateDots');
  var pagerNow = $('#pagerNow');
  var index = 0, timer = null, paused = false;

  moments.forEach(function (m, i) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'plate-dot';
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-current', String(i === 0));
    b.setAttribute('aria-label', (i + 1) + ' / ' + moments.length);
    b.addEventListener('click', function () { go(i - index, true); });
    dotsHost.appendChild(b);
  });
  var dots = $$('.plate-dot', dotsHost);

  function go(step, user) {
    if (!step) return;
    var next = (index + step % moments.length + moments.length) % moments.length;
    moments[index].classList.remove('is-active');
    moments[next].classList.add('is-active');
    dots[index].setAttribute('aria-current', 'false');
    dots[next].setAttribute('aria-current', 'true');
    pagerNow.textContent = ('0' + (next + 1)).slice(-2);
    index = next;

    /* the dial clicks a quarter turn; the type counter-turns the same amount */
    if (hasGSAP && !REDUCE) {
      var q = 90 * step;
      gsap.to(plateDial,    { rotation: '+=' + q, duration: 0.8, ease: 'power3.inOut' });
      gsap.to(plateContent, { rotation: '-=' + q, duration: 0.8, ease: 'power3.inOut' });
    }
    if (user) restart();
  }
  /* the dial only advances once it has arrived and while it is on screen */
  function tick() { if (!paused && uiLive && inView) go(1, false); }
  function restart() { clearInterval(timer); timer = setInterval(tick, 6000); }

  $('#nextMoment').addEventListener('click', function () { go(1, true); });
  $('#prevMoment').addEventListener('click', function () { go(-1, true); });
  ['mouseenter', 'focusin'].forEach(function (ev) {
    plateUi.addEventListener(ev, function () { paused = true; });
    plateContent.addEventListener(ev, function () { paused = true; });
  });
  ['mouseleave', 'focusout'].forEach(function (ev) {
    plateUi.addEventListener(ev, function () { paused = false; });
    plateContent.addEventListener(ev, function () { paused = false; });
  });
  document.addEventListener('visibilitychange', function () { paused = document.hidden; });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { inView = es[0].isIntersecting; },
      { threshold: 0.35 }).observe($('#centerpiece'));
  } else { inView = true; }
  restart();

  /* swipe */
  (function () {
    var x0 = null, y0 = null;
    var zone = $('#centerpiece');
    zone.addEventListener('touchstart', function (e) {
      x0 = e.touches[0].clientX; y0 = e.touches[0].clientY;
    }, { passive: true });
    zone.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      var dy = e.changedTouches[0].clientY - y0;
      if (Math.abs(dx) > 46 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1, true);
      x0 = y0 = null;
    }, { passive: true });
  })();

  /* keyboard: the controls are real buttons, arrows move between moments */
  plateUi.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { go(1, true); }
    if (e.key === 'ArrowLeft')  { go(-1, true); }
  });

  /* -- 08 REVEALS · PARALLAX · COUNTERS ------------------------------------ */
  if (hasGSAP && window.ScrollTrigger) {

    if (!REDUCE) {
      /* sections rise 24px, once only, calmly */
      $$('.reveal').forEach(function (n) {
        /* pranzo is the one section the dial sits on top of: hold its content
           until the section is squared up under the plate, so nothing ever
           scrolls through the dial. */
        var pinned = !SMALL && n.closest('#pranzo');
        gsap.fromTo(n, { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1.1, ease: 'power2.out',
            scrollTrigger: pinned
              ? { trigger: '#pranzo', start: 'top 6%', once: true }
              : { trigger: n, start: 'top 88%', once: true } });
      });
      $$('.reveal-child').forEach(function (p) {
        gsap.fromTo(p.children, { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1.05, stagger: 0.12, ease: 'power2.out',
            scrollTrigger: { trigger: p, start: 'top 86%', once: true } });
      });

      /* hero photo drifts slower than the page */
      gsap.to('#heroMedia', {
        yPercent: 14, ease: 'none',
        scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true }
      });

      /* framed photos shift −8% → +8% inside their frames */
      $$('.frame--px .photo').forEach(function (img) {
        gsap.fromTo(img, { yPercent: -8 }, {
          yPercent: 8, ease: 'none',
          scrollTrigger: { trigger: img.closest('.frame'), start: 'top bottom', end: 'bottom top', scrub: true }
        });
      });

      /* decorative branches drift at their own rates */
      gsap.to('#branchTL', { yPercent: -22, ease: 'none',
        scrollTrigger: { trigger: '#aperitivo', start: 'top bottom', end: 'bottom top', scrub: true } });
      gsap.to('#branchBR', { yPercent: 16, ease: 'none',
        scrollTrigger: { trigger: '#aperitivo', start: 'top bottom', end: 'bottom top', scrub: true } });
      gsap.to('#sprigL', { yPercent: -14, ease: 'none',
        scrollTrigger: { trigger: '#porchetta', start: 'top bottom', end: 'bottom top', scrub: true } });
      gsap.to('#sprigR', { yPercent: 12, ease: 'none',
        scrollTrigger: { trigger: '#porchetta', start: 'top bottom', end: 'bottom top', scrub: true } });
    } else {
      $$('.reveal, .reveal-child > *').forEach(function (n) { n.style.opacity = 1; });
    }

    /* count-ups */
    $$('[data-count]').forEach(function (n) {
      var end = parseFloat(n.dataset.count), suffix = n.dataset.suffix || '';
      ScrollTrigger.create({
        trigger: n, start: 'top 88%', once: true,
        onEnter: function () {
          if (REDUCE) { n.textContent = end + suffix; return; }
          var o = { v: 0 };
          gsap.to(o, {
            v: end, duration: 1.7, ease: 'power2.out',
            onUpdate: function () { n.textContent = Math.round(o.v) + suffix; }
          });
        }
      });
    });
  } else {
    $$('.reveal, .reveal-child > *').forEach(function (n) { n.style.opacity = 1; });
    $$('[data-count]').forEach(function (n) { n.textContent = n.dataset.count + (n.dataset.suffix || ''); });
  }

  /* -- 09 TODAY'S HOURS ---------------------------------------------------- */
  (function () {
    var today = String(new Date().getDay());
    $$('.hours tbody tr').forEach(function (tr) {
      if ((tr.dataset.day || '').split(',').indexOf(today) > -1) tr.classList.add('is-today');
    });
  })();

  /* if a photo 404s, the frame keeps its palette gradient and states the shot
     it is waiting for — so a missing asset never reads as a broken page */
  $$('.photo').forEach(function (img) {
    img.addEventListener('error', function () {
      img.style.display = 'none';
      var frame = img.closest('.frame');
      if (!frame || frame.querySelector('.frame__note')) return;
      var note = document.createElement('span');
      note.className = 'frame__note';
      note.style.opacity = 1;
      note.textContent = img.getAttribute('alt') || '';
      frame.appendChild(note);
    });
  });

})();
