/* ============================================================
   RAVAGE ERA — GUILD HUB  |  main.js
   Hash-router SPA + boot + particles + spin wheel + sensi wizard
   ============================================================ */
(function () {
  'use strict';

  /* ==========================================================
     CONFIG — edit these
     ========================================================== */
  var SECRET = atob('ODAwMDEy');            // 800012 — community secret code (hidden)
  var PIN    = atob('ODAwMDEy');            // 800012 — sensi pin (hidden)
  var ZEUS_WA = '2349066760078';            // WhatsApp number for Zeus web dev / owner
  var GUILD_EMAIL = 'ge5853987@gmail.com';

  /* ==========================================================
     HELPERS
     ========================================================== */
  function $(s) { return document.querySelector(s); }
  function $$(s) { return Array.prototype.slice.call(document.querySelectorAll(s)); }
  function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function toast(msg, isErr) {
    var t = $('#toast');
    t.textContent = msg;
    t.className = 'toast show' + (isErr ? ' error' : '');
    clearTimeout(t._tm);
    t._tm = setTimeout(function () { t.className = 'toast'; }, 3400);
  }
  function openModal(id) { $('#' + id).classList.add('show'); document.body.classList.add('modal-open'); }
  function closeModal(id) { $('#' + id).classList.remove('show'); document.body.classList.remove('modal-open'); }
  function closeAllModals() { $$('.modal.show').forEach(function (m) { m.classList.remove('show'); }); document.body.classList.remove('modal-open'); }

  /* ==========================================================
     DATA
     ========================================================== */
  var GUILD_STATS = [
    { num: 48, suffix: '', label: 'GUILD MATES' },
    { num: 5000, suffix: '+', label: 'MATCHES PLAYED' },
    { num: 10, suffix: '+', label: 'TRYOUTS RECEIVED' },
    { num: null, suffix: '', label: 'MONTHS STRONG' }
  ];
  var FOUNDED = { month: 2, year: 2025 }; // March 2025 (0-based month)

  var MENU = [
    { n: '01', t: 'TRYOUTS', d: 'Join the guild', href: '#/tryouts' },
    { n: '02', t: 'GUILD', d: 'About RAVAGE ERA', href: '#/guild' },
    { n: '03', t: 'ADMINS', d: 'Meet the team', href: '#/admins' },
    { n: '04', t: 'SPIN & WIN', d: 'Community promotion', href: '#/spin' },
    { n: '05', t: 'LIKES & VISITS', d: 'Community service', href: '#/likes' },
    { n: '06', t: 'SENSI', d: 'Sensi configuration', href: '#/sensi' },
    { n: '07', t: 'GALLERY', d: 'Media & profiles', href: '#/gallery' },
    { n: '08', t: 'CONTACT', d: 'Reach the guild', href: '#/contact' }
  ];

  var ANNOUNCEMENTS = [
    { date: 'THIS WEEK', warn: true, title: 'GUILD POINTS WARNING', body: 'Any guild mate with less than 1,000 guild points at the end of the week will be removed. Earn your points, warriors.' },
    { date: 'UPCOMING', warn: false, title: 'GUILD TOURNAMENT', body: 'Tournament hosted by Assistant Guild Leader KAGURA at 5:30 PM Nigerian time. All squads report in.' },
    { date: 'NEWS', warn: false, title: 'THE SQUAD IS GROWING', body: 'RAVAGE ERA is 48 warriors strong with 5,000+ matches played. We Stand United.' }
  ];

  var TOURNAMENT = { hour: 17, minute: 30, offset: 1 }; // 5:30 PM WAT (UTC+1)

  var MVP = { initials: 'SB', name: 'SLICK BOY', tag: 'GUILD LEADER', desc: 'Founder of RAVAGE ERA. Keeps the squad focused and grinding every week.' };

  var ROLES = [
    { name: 'RUSH', val: 92 }, { name: 'SUPPORT', val: 78 },
    { name: 'SNIPER', val: 64 }, { name: 'LEADERSHIP', val: 85 }
  ];

  var ADMINS = [
    { initials: 'RS', name: 'RE SLICK', role: 'GUILD LEADER', desc: 'Guild Leader of RAVAGE ERA — maintains direction, discipline and competitive identity.' },
    { initials: 'KA', name: 'KAGURA', role: 'ASSISTANT GUILD LEADER', desc: 'Coordinates members, supports guild activities and keeps the team moving forward.' },
    { initials: 'MA', name: 'MARPHY', role: 'ELDER ONE', desc: 'Respected senior member representing experience, consistency and support.' },
    { initials: 'HA', name: 'HAPEX', role: 'ELDER TWO', desc: 'Elder contributing to the community and keeping the guild welcoming.' },
    { initials: 'RD', name: 'RE DANNY', role: 'ELDER TWO', desc: 'Elder offering experience, support and leadership to the community.' },
    { initials: 'RZ', name: 'RE ZEUS', role: 'MOST VALUED MEMBER', desc: 'Highly valued member bringing energy, loyalty and dedication to the guild.' },
    { initials: 'EM', name: 'EMMEX / ZEUS', role: 'WEB DEVELOPER', desc: 'Designs, develops and maintains the Guild Hub and connects all community services.' }
  ];

  var FAQS = [
    { q: 'How do I join RAVAGE ERA?', a: 'Go to the TRYOUTS page, fill in your details, select an administrator and send the prepared WhatsApp message. Our admins will review your application.' },
    { q: 'What does the guild expect from members?', a: 'Active participation, teamwork, respect, consistency — and at least 1,000 guild points per week.' },
    { q: 'Are rewards from SPIN & WIN guaranteed by Garena?', a: 'No. It is a RAVAGE ERA community promotion only. Garena / Free Fire does not officially guarantee these rewards.' },
    { q: 'Does the LIKES & VISITS page add likes directly?', a: 'No. It prepares a request for our web developer / admin, who handles the service. Delivery takes 2 to 5 hours.' },
    { q: 'Who is the web developer?', a: 'EMMEX / ZEUS — the RAVAGE ERA web developer. He designed and maintains the Guild Hub.' }
  ];

  var PLACEHOLDER = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500">' +
    '<rect width="400" height="500" fill="#0d1016"/>' +
    '<rect x="20" y="20" width="360" height="460" fill="none" stroke="#f5c542" stroke-opacity="0.3"/>' +
    '<text x="200" y="245" font-family="Arial" font-size="30" font-weight="900" fill="#f5c542" text-anchor="middle">RAVAGE ERA</text>' +
    '<text x="200" y="285" font-family="Arial" font-size="14" fill="#9aa0ad" text-anchor="middle">PROFILE IMAGE</text>' +
    '</svg>');
  window.__PH = PLACEHOLDER;

  // Add your gallery image files here (put them in the same folder as index.html)
  var ASSETS = [
    { src: 'ravage-profile-01.png', label: 'RAVAGE ERA PROFILE 01' },
    { src: 'IMG_2580.png', label: 'RAVAGE ERA PROFILE 02' },
    { src: 'ravage-profile-03.png', label: 'RAVAGE ERA PROFILE 03' },
    { src: 'ravage-profile-04.png', label: 'RAVAGE ERA PROFILE 04' },
    { src: 'ravage-profile-05.png', label: 'RAVAGE ERA PROFILE 05' },
    { src: 'ravage-profile-06.png', label: 'RAVAGE ERA PROFILE 06' },
    { src: 'ravage-profile-07.png', label: 'RAVAGE ERA PROFILE 07' },
    { src: 'ravage-profile-08.png', label: 'RAVAGE ERA PROFILE 08' }
  ];

  var PHONES = [
    'iPhone', 'Samsung Galaxy', 'Tecno', 'Infinix', 'Xiaomi / Redmi',
    'Realme', 'Oppo', 'Vivo', 'OnePlus', 'Google Pixel',
    'Huawei', 'Motorola', 'Nokia', 'Asus ROG', 'iTel'
  ];
  var FINGERS = ['2 FINGERS', '3 FINGERS', '4 FINGERS', '5 FINGERS'];
  var DPIS = [
    { id: 'lower', label: 'LOWER', range: '400 – 600' },
    { id: 'medium', label: 'MEDIUM', range: '600 – 800' },
    { id: 'higher', label: 'HIGHER', range: '800 – 1000' }
  ];

  /* ==========================================================
     BOOT SEQUENCE
     ========================================================== */
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var bootLines = [
    '> INITIALIZING RAVAGE ERA OS v2.0 ...',
    '> LOADING GUILD HUB MODULES ........ OK',
    '> MOUNTING SPIN & WIN WHEEL ........ OK',
    '> CALIBRATING SENSI ENGINE ......... OK',
    '> CONNECTING COMMUNITY SERVICES .... OK',
    '> WE STAND UNITED. WELCOME, WARRIOR.'
  ];
  var bootDone = false;
  function runBoot() {
    var log = $('#bootLog');
    log.innerHTML = '';
    bootLines.forEach(function (line, i) {
      setTimeout(function () {
        var s = document.createElement('span');
        s.textContent = line;
        log.appendChild(s);
        log.scrollTop = log.scrollHeight;
        if (i === bootLines.length - 1) setTimeout(endBoot, 500);
      }, i * 320);
    });
    setTimeout(endBoot, bootLines.length * 320 + 1200);
  }
  function endBoot() {
    if (bootDone) return;
    bootDone = true;
    $('#boot').classList.add('hide');
    setTimeout(function () { $('#boot').style.display = 'none'; }, 600);
  }
  $('#bootSkip').addEventListener('click', endBoot);
  if (reducedMotion) endBoot(); else runBoot();

  /* ==========================================================
     ROUTER
     ========================================================== */
  var PAGES = ['home', 'tryouts', 'guild', 'admins', 'spin', 'likes', 'sensi', 'gallery', 'contact'];
  function showPage(name) {
    if (PAGES.indexOf(name) === -1) name = 'home';
    $$('.page').forEach(function (p) { p.classList.toggle('active', p.dataset.page === name); });
    $$('.nav-link').forEach(function (l) { l.classList.toggle('active', l.dataset.nav === name); });
    closeSidebar();
    window.scrollTo(0, 0);
    if (name === 'spin') initWheel();
  }
  function currentHash() { return (location.hash || '#/home').replace('#/', '').split('?')[0]; }
  window.addEventListener('hashchange', function () { showPage(currentHash()); });

  /* ==========================================================
     SIDEBAR (mobile)
     ========================================================== */
  function openSidebar() { $('#sidebar').classList.add('open'); $('#navBackdrop').classList.add('show'); }
  function closeSidebar() { $('#sidebar').classList.remove('open'); $('#navBackdrop').classList.remove('show'); }
  $('#btnMenu').addEventListener('click', openSidebar);
  $('#navBackdrop').addEventListener('click', closeSidebar);

  /* ==========================================================
     HOME — stats, menu, announcements, countdown, MVP, bars
     ========================================================== */
  function monthsStrong() {
    var now = new Date();
    return Math.max(1, (now.getFullYear() - FOUNDED.year) * 12 + (now.getMonth() - FOUNDED.month) + 1);
  }
  $('#statsGrid').innerHTML = GUILD_STATS.map(function (s) {
    var num = s.num === null ? monthsStrong() : s.num;
    return '<div class="stat-card"><div class="stat-num">' + num + s.suffix + '</div><div class="stat-label">' + s.label + '</div></div>';
  }).join('');

  $('#menuGrid').innerHTML = MENU.map(function (m) {
    return '<a class="menu-card" href="' + m.href + '">' +
      '<span class="menu-num">' + m.n + '</span><span class="menu-go">➤</span>' +
      '<h4>' + m.t + '</h4><p>' + m.d + '</p></a>';
  }).join('');

  $('#announceList').innerHTML = ANNOUNCEMENTS.map(function (a) {
    return '<div class="announce' + (a.warn ? ' warn' : '') + '">' +
      '<span class="a-date">' + a.date + '</span><h4>' + a.title + '</h4><p>' + a.body + '</p></div>';
  }).join('');

  function drawCountdown() {
    var now = new Date();
    var t = new Date(now.getTime());
    t.setHours(TOURNAMENT.hour, TOURNAMENT.minute, 0, 0);
    t.setTime(t.getTime() - TOURNAMENT.offset * 3600000);
    var diff = t.getTime() - now.getTime();
    if (diff < 0) diff += 86400000;
    var d = Math.floor(diff / 86400000), h = Math.floor(diff % 86400000 / 3600000),
        m = Math.floor(diff % 3600000 / 60000), s = Math.floor(diff % 60000 / 1000);
    $('#countdown').innerHTML =
      '<div class="cd-cell"><div class="cd-num">' + String(d).padStart(2, '0') + '</div><div class="cd-label">DAYS</div></div>' +
      '<div class="cd-cell"><div class="cd-num">' + String(h).padStart(2, '0') + '</div><div class="cd-label">HRS</div></div>' +
      '<div class="cd-cell"><div class="cd-num">' + String(m).padStart(2, '0') + '</div><div class="cd-label">MIN</div></div>' +
      '<div class="cd-cell"><div class="cd-num">' + String(s).padStart(2, '0') + '</div><div class="cd-label">SEC</div></div>';
  }
  drawCountdown();
  setInterval(drawCountdown, 1000);

  $('#mvpCard').innerHTML =
    '<div class="mvp-avatar">' + MVP.initials + '</div>' +
    '<div><span class="mvp-tag">★ MVP OF THE WEEK</span><h4>' + MVP.name + '</h4><p>' + MVP.desc + '</p></div>';

  function renderBars(elId) {
    $('#' + elId).innerHTML = ROLES.map(function (r) {
      return '<div class="bar-row"><div class="bar-label"><span>' + r.name + '</span><span>' + r.val + '%</span></div>' +
        '<div class="bar-track"><div class="bar-fill" style="width:' + r.val + '%"></div></div></div>';
    }).join('');
  }
  renderBars('roleBars');
  renderBars('guildBars');

  /* ==========================================================
     ADMINS
     ========================================================== */
  $('#adminGrid').innerHTML = ADMINS.map(function (a) {
    return '<div class="admin-card"><div class="admin-avatar">' + a.initials + '</div>' +
      '<h4>' + a.name + '</h4><div class="admin-role">' + a.role + '</div><p>' + a.desc + '</p></div>';
  }).join('');

  $('#tAdmin').innerHTML = ADMINS.map(function (a) {
    return '<option>' + a.name + ' — ' + a.role + '</option>';
  }).join('');

  /* ==========================================================
     TRYOUTS — WhatsApp submit
     ========================================================== */
  $('#tryoutForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = true;
    var v = { ign: $('#tIgn'), uid: $('#tUid'), age: $('#tAge'), region: $('#tRegion'), style: $('#tStyle'), admin: $('#tAdmin') };
    [['errTIgn', v.ign], ['errTUid', v.uid], ['errTAge', v.age], ['errTRegion', v.region]].forEach(function (p) {
      if (!v[p[1].id].value.trim()) { $('#' + p[0]).textContent = 'Required'; ok = false; } else { $('#' + p[0]).textContent = ''; }
    });
    if (!v.style.value) { $('#errTStyle').textContent = 'Select a playstyle'; ok = false; } else { $('#errTStyle').textContent = ''; }
    if (!v.admin.value) { $('#errTAdmin').textContent = 'Select an admin'; ok = false; } else { $('#errTAdmin').textContent = ''; }
    if (!ok) { toast('Please complete all required fields.', true); return; }
    var msg = 'RAVAGE ERA TRYOUT APPLICATION%0A' +
      'IGN: ' + encodeURIComponent(v.ign.value.trim()) + '%0A' +
      'UID: ' + encodeURIComponent(v.uid.value.trim()) + '%0A' +
      'AGE: ' + encodeURIComponent(v.age.value.trim()) + '%0A' +
      'REGION: ' + encodeURIComponent(v.region.value.trim()) + '%0A' +
      'PLAYSTYLE: ' + encodeURIComponent(v.style.value) + '%0A' +
      'PREFERRED ADMIN: ' + encodeURIComponent(v.admin.value);
    var adminName = v.admin.value.split(' — ')[0].trim();
    var num = (adminName.indexOf('ZEUS') !== -1) ? ZEUS_WA : ZEUS_WA; // route to Zeus web dev inbox
    window.open('https://wa.me/' + num + '?text=' + msg, '_blank');
    $('#tryoutForm').reset();
    openModal('modalTryoutSuccess');
  });
  $('#btnTryoutClose').addEventListener('click', function () { closeModal('modalTryoutSuccess'); });
  $('#btnTryoutViewGuild').addEventListener('click', function () { closeModal('modalTryoutSuccess'); location.hash = '#/guild'; });

  /* ==========================================================
     CONTACT — email + WhatsApp + FAQ
     ========================================================== */
  $('#emailForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var n = $('#cName').value.trim(), em = $('#cEmail').value.trim(), m = $('#cMessage').value.trim();
    var ok = true;
    if (!n) { $('#errCName').textContent = 'Required'; ok = false; } else $('#errCName').textContent = '';
    if (!em || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)) { $('#errCEmail').textContent = 'Valid email required'; ok = false; } else $('#errCEmail').textContent = '';
    if (!m) { $('#errCMessage').textContent = 'Required'; ok = false; } else $('#errCMessage').textContent = '';
    if (!ok) return;
    window.open('mailto:' + GUILD_EMAIL + '?subject=' + encodeURIComponent('RAVAGE ERA Query from ' + n) + '&body=' + encodeURIComponent(m), '_blank');
    $('#emailForm').reset();
    toast('Opening your email app...');
  });

  $('#waForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var n = $('#wName').value.trim(), p = $('#wPhone').value.trim(), m = $('#wMessage').value.trim();
    var ok = true;
    if (!n) { $('#errWName').textContent = 'Required'; ok = false; } else $('#errWName').textContent = '';
    if (!p) { $('#errWPhone').textContent = 'Required'; ok = false; } else $('#errWPhone').textContent = '';
    if (!m) { $('#errWMessage').textContent = 'Required'; ok = false; } else $('#errWMessage').textContent = '';
    if (!ok) return;
    var msg = 'RAVAGE ERA CONTACT%0AName: ' + encodeURIComponent(n) + '%0APhone: ' + encodeURIComponent(p) + '%0AMessage: ' + encodeURIComponent(m);
    window.open('https://wa.me/' + ZEUS_WA + '?text=' + msg, '_blank');
    $('#waForm').reset();
    toast('Opening WhatsApp...');
  });

  $('#faqList').innerHTML = FAQS.map(function (f, i) {
    return '<div class="faq-item"><button class="faq-q" type="button" data-i="' + i + '">' + f.q +
      '<span class="faq-x">+</span></button><div class="faq-a">' + f.a + '</div></div>';
  }).join('');
  $('#faqList').addEventListener('click', function (e) {
    var btn = e.target.closest('.faq-q');
    if (!btn) return;
    var item = btn.parentElement;
    var wasOpen = item.classList.contains('open');
    $$('.faq-item').forEach(function (f) { f.classList.remove('open'); });
    if (!wasOpen) item.classList.add('open');
  });

  /* ==========================================================
     GALLERY
     ========================================================== */
  var galIndex = 0;
  function galImg(g) { return g.src; }
  function renderGallery() {
    var g = ASSETS[galIndex];
    var img = $('#galMain');
    img.src = g.src;
    img.setAttribute('data-label', g.label);
    img.onerror = function () { if (this.src !== window.__PH) this.src = window.__PH; };
    $('#galCounter').textContent = (galIndex + 1) + ' / ' + ASSETS.length;
    $$('.gal-thumb').forEach(function (t, i) { t.classList.toggle('active', i === galIndex); });
  }
  $('#galThumbs').innerHTML = ASSETS.map(function (g, i) {
    return '<button class="gal-thumb" data-i="' + i + '" aria-label="' + g.label + '" type="button">' +
      '<img src="' + g.src + '" alt="' + g.label + '" onerror="this.onerror=null;this.src=window.__PH;"></button>';
  }).join('');
  function galStep(dir) { galIndex = (galIndex + dir + ASSETS.length) % ASSETS.length; renderGallery(); }
  $('#btnGalPrev').addEventListener('click', function () { galStep(-1); });
  $('#btnGalNext').addEventListener('click', function () { galStep(1); });
  $('#galThumbs').addEventListener('click', function (e) {
    var t = e.target.closest('.gal-thumb');
    if (t) { galIndex = parseInt(t.dataset.i, 10); renderGallery(); }
  });
  $('#btnGalFull').addEventListener('click', function () {
    var g = ASSETS[galIndex];
    $('#galModalImg').src = g.src;
    $('#galModalImg').onerror = function () { if (this.src !== window.__PH) this.src = window.__PH; };
    $('#galModalLabel').textContent = g.label;
    openModal('modalGallery');
  });
  $('#btnGalModalClose').addEventListener('click', function () { closeModal('modalGallery'); });
  renderGallery();

  /* ==========================================================
     MODAL CLOSE
     ========================================================== */
  $$('.modal').forEach(function (m) {
    m.addEventListener('click', function (e) { if (e.target === m) closeModal(m.id); });
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeAllModals(); });

  /* ==========================================================
     SPIN & WIN — gate + circular wheel
     ========================================================== */
  $('#btnWrongCodeClose').addEventListener('click', function () { closeModal('modalWrongCode'); });
  $('#btnWrongCodeWa').href = 'https://wa.me/' + ZEUS_WA + '?text=' + encodeURIComponent('Hello Zeus web dev, I entered a wrong secret code on the RAVAGE ERA Guild Hub. Please help me get the correct code.');

  function unlockSpin(uid) {
    $('#spinGate').hidden = true;
    $('#spinStage').hidden = false;
    $('#spinUid').value = uid;
  }
  $('#spinGateForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var uid = $('#spinUid').value.trim(), code = $('#spinCode').value.trim();
    var ok = true;
    if (!uid) { $('#errSpinUid').textContent = 'UID required'; ok = false; } else $('#errSpinUid').textContent = '';
    if (!code) { $('#errSpinCode').textContent = 'Code required'; ok = false; } else $('#errSpinCode').textContent = '';
    if (!ok) return;
    if (code !== SECRET) { openModal('modalWrongCode'); $('#spinCode').value = ''; return; }
    unlockSpin(uid);
    $('#spinCode').value = '';
  });

  // ---- Wheel drawing ----
  var wheelCtx = $('#wheelCanvas').getContext('2d');
  var SEGS = 6; // GUN SKIN / NOTHING alternating
  var segA = (Math.PI * 2) / SEGS;
  var currentRot = 0;
  var spinning = false;
  var wheelInited = false;

  function drawWheel(rot) {
    var cx = 160, cy = 160, r = 150;
    wheelCtx.clearRect(0, 0, 320, 320);
    wheelCtx.save();
    wheelCtx.translate(cx, cy);
    wheelCtx.rotate(rot);
    for (var i = 0; i < SEGS; i++) {
      var isGun = (i % 2 === 0);
      wheelCtx.beginPath();
      wheelCtx.moveTo(0, 0);
      wheelCtx.arc(0, 0, r, i * segA, (i + 1) * segA);
      wheelCtx.closePath();
      wheel
$$
wheelCtx.fillStyle = isGun ? '#f5c542' : '#141824';
      wheelCtx.fill();
      wheelCtx.strokeStyle = 'rgba(255,255,255,.25)';
      wheelCtx.lineWidth = 1;
      wheelCtx.stroke();

      // Label (text drawn un-rotated)
      wheelCtx.save();
      wheelCtx.rotate(i * segA + segA / 2);
      wheelCtx.textAlign = 'right';
      wheelCtx.fillStyle = isGun ? '#1a1205' : '#9aa0ad';
      wheelCtx.font = 'bold 13px Orbitron, Arial';
      wheelCtx.fillText(isGun ? 'GUN SKIN' : 'NOTHING', r - 14, 4);
      wheelCtx.restore();
    }
    // Center hub
    wheelCtx.beginPath();
    wheelCtx.arc(0, 0, 26, 0, Math.PI * 2);
    wheelCtx.fillStyle = '#06070a';
    wheelCtx.fill();
    wheelCtx.strokeStyle = '#f5c542';
    wheelCtx.lineWidth = 3;
    wheelCtx.stroke();
    wheelCtx.fillStyle = '#f5c542';
    wheelCtx.font = 'bold 12px Orbitron, Arial';
    wheelCtx.textAlign = 'center';
    wheelCtx.fillText('SPIN', 0, 4);
    wheelCtx.restore();
  }

  function initWheel() {
    if (wheelInited) return;
    wheelInited = true;
    drawWheel(currentRot);
  }

  // Weighted outcome: ~35% GUN SKIN, ~65% NOTHING
  function spinOutcome() {
    return Math.random() < 0.35 ? 'GUN SKIN' : 'NOTHING';
  }

  $('#btnSpin').addEventListener('click', function () {
    if (spinning) return;
    spinning = true;
    $('#spinResult').textContent = '';

    var outcome = spinOutcome();                                   // decide result first
    var winIndex = (outcome === 'GUN SKIN') ? 0 : 1;               // segment index
    var targetSeg = winIndex * segA + segA / 2;                    // angle at 12 o'clock

    // Bring target segment to the pointer (top = -PI/2), add 5–7 full spins + jitter
    var targetRot = -(Math.PI / 2) - targetSeg + Math.PI * 2 * rand(5, 7) + (Math.random() * 0.35 - 0.17);

    var start = currentRot;
    var delta = targetRot - start;
    var duration = 4200;
    var t0 = null;

    function frame(ts) {
      if (!t0) t0 = ts;
      var p = Math.min(1, (ts - t0) / duration);
      var ease = 1 - Math.pow(1 - p, 3); // cubic ease-out
      currentRot = start + delta * ease;
      drawWheel(currentRot);
      if (p < 1) {
        requestAnimationFrame(frame);
      } else {
        spinning = false;
        showSpinResult(outcome);
      }
    }
    requestAnimationFrame(frame);
  });

  function showSpinResult(outcome) {
    $('#spinResult').textContent = outcome === 'GUN SKIN' ? '🎉 YOU WON — GUN SKIN!' : 'NOTHING THIS TIME. SPIN AGAIN!';
    $('#spinResult').className = 'spin-result ' + (outcome === 'GUN SKIN' ? 'win' : 'lose');

    $('#spinModalCheck').textContent = outcome === 'GUN SKIN' ? '🏆' : '—';
    $('#spinModalCheck').className = 'modal-check' + (outcome === 'GUN SKIN' ? '' : ' modal-check-red');
    $('#spinModalTitle').textContent = outcome === 'GUN SKIN' ? 'CONGRATULATIONS!' : 'BETTER LUCK NEXT TIME';
    $('#spinModalTitle').className = outcome === 'GUN SKIN' ? 'glow-gold' : 'glow-red';
    $('#spinModalText').textContent = outcome === 'GUN SKIN' ? 'You won a GUN SKIN!' : 'The wheel landed on NOTHING.';
    $('#spinModalBody').hidden = false;
    $('#spinModalThanks').hidden = true;
    $('#btnSpinModalNext').hidden = false;
    $('#btnSpinModalClose').hidden = true;
    openModal('modalSpin');
  }

  // Modal: "will enter within 2 to 5 hrs" first, then thanks
  $('#btnSpinModalNext').addEventListener('click', function () {
    $('#spinModalBody').hidden = true;
    $('#spinModalThanks').hidden = false;
    $('#btnSpinModalNext').hidden = true;
    $('#btnSpinModalClose').hidden = false;
  });
  $('#btnSpinModalClose').addEventListener('click', function () {
    closeModal('modalSpin');
    $('#spinModalBody').hidden = false;
    $('#spinModalThanks').hidden = true;
    $('#btnSpinModalNext').hidden = false;
    $('#btnSpinModalClose').hidden = true;
  });

  /* ==========================================================
     LIKES & VISITS — gate + sliders (min 10 / max 100)
     ========================================================== */
  $('#btnLikesModalNext').addEventListener('click', function () {
    $('#likesModalBody').hidden = true;
    $('#likesModalThanks').hidden = false;
    $('#btnLikesModalNext').hidden = true;
    $('#btnLikesModalClose').hidden = false;
  });
  $('#btnLikesModalClose').addEventListener('click', function () {
    closeModal('modalLikes');
    $('#likesModalBody').hidden = false;
    $('#likesModalThanks').hidden = true;
    $('#btnLikesModalNext').hidden = false;
    $('#btnLikesModalClose').hidden = true;
  });

  $('#likesGateForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var uid = $('#likesUid').value.trim(), code = $('#likesCode').value.trim();
    var ok = true;
    if (!uid) { $('#errLikesUid').textContent = 'UID required'; ok = false; } else $('#errLikesUid').textContent = '';
    if (!code) { $('#errLikesCode').textContent = 'Code required'; ok = false; } else $('#errLikesCode').textContent = '';
    if (!ok) return;
    if (code !== SECRET) { openModal('modalWrongCode'); $('#likesCode').value = ''; return; }
    $('#likesGate').hidden = true;
    $('#likesStage').hidden = false;
    $('#likesUidFinal').value = uid;
    $('#likesCode').value = '';
  });

  var likesRange = $('#likesRange'), visitsRange = $('#visitsRange');
  function syncRanges() {
    $('#likesVal').textContent = likesRange.value;
    $('#visitsVal').textContent = visitsRange.value;
  }
  likesRange.addEventListener('input', syncRanges);
  visitsRange.addEventListener('input', syncRanges);
  syncRanges();

  $('#likesForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var uid = $('#likesUidFinal').value.trim();
    var likes = parseInt(likesRange.value, 10);
    var visits = parseInt(visitsRange.value, 10);
    // Hard clamp 10–100 (belt and braces — inputs already enforce it)
    likes = Math.min(100, Math.max(10, likes));
    visits = Math.min(100, Math.max(10, visits));
    var msg = 'RAVAGE ERA LIKES & VISITS REQUEST%0A' +
      'UID: ' + encodeURIComponent(uid) + '%0A' +
      'LIKES: ' + likes + '%0A' +
      'PROFILE VISITS: ' + visits + '%0A' +
      'Delivery expected: 2 to 5 hours.';
    window.open('https://wa.me/' + ZEUS_WA + '?text=' + msg, '_blank');
    $('#likesModalText').textContent = likes + ' likes + ' + visits + ' profile visits for UID ' + uid;
    $('#likesModalBody').hidden = false;
    $('#likesModalThanks').hidden = true;
    $('#btnLikesModalNext').hidden = false;
    $('#btnLikesModalClose').hidden = true;
    openModal('modalLikes');
  });
