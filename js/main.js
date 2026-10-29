(function () {
  'use strict';
  var body = document.body;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Sidhuvudet blir vitt när man har scrollat förbi toppen av heron
  var header = document.querySelector('.site-header');
  function onScroll() { header.classList.toggle('solid', window.scrollY > 40); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobilmeny
  var menuBtn = document.getElementById('menu-btn');
  function setMenu(open) {
    body.classList.toggle('nav-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Stäng meny' : 'Öppna meny');
  }
  menuBtn.addEventListener('click', function () { setMenu(!body.classList.contains('nav-open')); });
  document.querySelectorAll('#nav a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && body.classList.contains('nav-open')) { setMenu(false); menuBtn.focus(); } });
  window.addEventListener('resize', function () { if (window.innerWidth > 900) { setMenu(false); } });

  // Bakgrundsvideo: lätt stående version på mobil, stillbild vid reducerad rörelse
  var video = document.getElementById('hero-video');
  var toggle = document.getElementById('video-toggle');
  var toggleIco = document.getElementById('video-toggle-ico');
  var ICON_PAUSE = 'M3 2h3v10H3zM8 2h3v10H8z';
  var ICON_PLAY = 'M3 1.5l9 5.5-9 5.5z';
  if (video && !reduceMotion) {
    video.src = window.innerWidth <= 700 ? video.dataset.srcMobile : video.dataset.srcDesktop;
    video.addEventListener('playing', function () { video.classList.add('on'); toggle.hidden = false; });
    var p = video.play();
    if (p && p.catch) { p.catch(function () {}); }
    toggle.addEventListener('click', function () {
      if (video.paused) { video.play(); } else { video.pause(); }
      var paused = video.paused;
      toggle.setAttribute('aria-label', paused ? 'Spela video' : 'Pausa video');
      toggleIco.setAttribute('d', paused ? ICON_PLAY : ICON_PAUSE);
    });
  }

  // Projektgalleri: visa fler
  var gallery = document.getElementById('gallery');
  var moreBtn = document.getElementById('gallery-more');
  moreBtn.addEventListener('click', function () {
    var open = gallery.classList.toggle('open');
    moreBtn.setAttribute('aria-expanded', String(open));
    moreBtn.textContent = open ? 'Visa färre' : 'Visa alla projektbilder';
    if (!open) { document.getElementById('projekt').scrollIntoView(); }
  });

  // Bildvisare
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lb-img');
  var lbCap = document.getElementById('lb-cap');
  var links = Array.prototype.slice.call(gallery.querySelectorAll('a'));
  var current = 0;
  function visible() { return links.filter(function (a) { return a.offsetParent !== null; }); }
  function show(i) {
    var list = visible();
    current = (i + list.length) % list.length;
    var a = list[current];
    lbImg.src = a.getAttribute('href');
    lbImg.alt = a.dataset.caption;
    lbCap.textContent = a.dataset.caption + ' (' + (current + 1) + ' av ' + list.length + ')';
  }
  links.forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (typeof lb.showModal !== 'function') { return; }
      e.preventDefault();
      show(visible().indexOf(a));
      lb.showModal();
    });
  });
  lb.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-lb]');
    if (btn) {
      var act = btn.dataset.lb;
      if (act === 'close') { lb.close(); } else { show(current + (act === 'next' ? 1 : -1)); }
    } else if (e.target === lb) { lb.close(); }
  });
  lb.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { show(current + 1); }
    if (e.key === 'ArrowLeft') { show(current - 1); }
  });
  var touchX = null;
  lb.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    if (touchX === null) { return; }
    var dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) { show(current + (dx < 0 ? 1 : -1)); }
    touchX = null;
  });

  // Offertformulär: skickas till data-endpoint om den är satt, annars öppnas e-postprogrammet
  var form = document.getElementById('offert-form');
  var status = document.getElementById('form-status');
  var endpoint = form.dataset.endpoint;
  if (!endpoint) { document.getElementById('f-fil-falt').hidden = true; }
  function say(msg, isError) {
    status.textContent = msg;
    status.classList.toggle('error', !!isError);
    status.hidden = false;
  }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var firstBad = null;
    form.querySelectorAll('[required]').forEach(function (el) {
      var bad = !el.checkValidity();
      el.closest('.field').classList.toggle('invalid', bad);
      el.setAttribute('aria-invalid', String(bad));
      if (bad && !firstBad) { firstBad = el; }
    });
    if (firstBad) {
      say('Fyll i de markerade fälten så att vi kan återkomma till dig.', true);
      firstBad.focus();
      return;
    }
    var data = new FormData(form);
    if (endpoint) {
      say('Skickar…');
      fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
        .then(function (r) {
          if (!r.ok) { throw new Error(r.status); }
          form.reset();
          say('Tack! Vi har tagit emot din förfrågan och återkommer så snart vi kan.');
        })
        .catch(function () { say('Det gick inte att skicka just nu. Ring oss på 0735-52 80 05 eller mejla info@tuveel.se.', true); });
      return;
    }
    var lines = [
      'Tjänst: ' + data.get('tjanst'),
      'Namn: ' + data.get('fornamn') + ' ' + data.get('efternamn'),
      'E-post: ' + data.get('epost'),
      'Telefon: ' + data.get('telefon'),
      'Adress: ' + data.get('adress') + ', ' + data.get('postnummer') + ' ' + data.get('ort'),
      '',
      'Arbetsbeskrivning:',
      data.get('beskrivning')
    ];
    window.location.href = 'mailto:' + form.dataset.mailto +
      '?subject=' + encodeURIComponent('Offertförfrågan: ' + data.get('tjanst')) +
      '&body=' + encodeURIComponent(lines.join('\n'));
    say('Ditt e-postprogram öppnas med förfrågan ifylld. Skicka mejlet så återkommer vi så snart vi kan.');
  });
  form.addEventListener('input', function (e) {
    var f = e.target.closest('.field');
    if (f && f.classList.contains('invalid') && e.target.checkValidity()) { f.classList.remove('invalid'); e.target.setAttribute('aria-invalid', 'false'); }
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
