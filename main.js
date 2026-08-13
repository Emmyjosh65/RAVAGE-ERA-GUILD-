/* ============================================================
   RAVAGE ERA — GUILD HUB  |  main.js  (v3 — FULL)
   Hash-router SPA + boot + terminal + cloud + widgets +
   circular Spin & Win + Likes slider + Sensi wizard
   ============================================================ */
(function () {
  'use strict';

  /* ==========================================================
     GUILD DATA  (edit numbers/members here)
     ========================================================== */
  var SECRET = '800012';                    // frontend gate only (hidden)
  var ZEUS_WA = '2349066760078';
  var GUILD_EMAIL = 'ge5853987@gmail.com';

  var GUILD_STATS = [
    { num: 48,   suffix: '',  label: 'GUILD MATES' },
    { num: 5000, suffix: '+', label: 'MATCHES PLAYED' },
    { num: 10,   suffix: '+', label: 'TRYOUTS RECEIVED' },
    { num: null, suffix: '',  label: 'MONTHS STRONG' }   // computed from founding date
  ];
  var FOUNDED = { month: 3, year: 2025 };   // March 2025

  var ANNOUNCEMENTS = [
    { date: 'THIS WEEK', warn: true, title: 'GUILD POINTS WARNING',
      body: 'Any guild mate with less than 1,000 guild points at the end of the week will be removed. Earn your points, warriors.' },
    { date: 'UPCOMING', warn: false, title: 'GUILD TOURNAMENT',
      body: 'Hosted by Assistant Guild Leader KAGURA at 5:30 PM Nigerian time. All squads report in.' },
    { date: 'NEWS', warn: false, title: 'THE SQUAD IS GROWING',
      body: 'RAVAGE ERA is 48 warriors strong with 5,000+ matches played. We Stand United.' }
  ];
  var TOURNAMENT = { hour: 17, minute: 30, offset: 1 };  // 5:30 PM WAT (UTC+1)

  var MVP_LIST = [
    { name: 'SLICK BOY', tag: 'GUILD LEADER', desc: 'Founder of RAVAGE ERA. The one who started it all and keeps the guild on course.' },
    { name: 'KAGURA', tag: 'ASSISTANT GUILD LEADER', desc: 'Coordinates the guild and hosts our tournaments. The engine behind guild events.' },
    { name: 'RE DANNY', tag: 'ELDER', desc: 'Part of the first squad. Experience and consistency in every lobby.' },
    { name: 'HAPEX', tag: 'ELDER', desc: 'Keeps the community strong and the environment welcoming for every warrior.' }
  ];

  var TIMELINE = [
    { date: 'MARCH 2025', title: 'THE FOUNDING', body: 'RAVAGE ERA was founded by SLICK BOY with a vision: a guild built on trust, skill and loyalty.' },
    { date: 'MARCH 2025', title: 'THE FIRST SQUAD', body: 'The first squad was formed: SLICK, DANNY and KAGURA — the core that the guild was built around.' },
    { date: '2025 — 2026', title: 'GROWTH & RECRUITMENT', body: 'Tryouts opened and warriors joined from everywhere. The guild grew into a real community.' },
    { date: 'TODAY', title: 'THE CURRENT ERA', body: '48 warriors strong, 5,000+ matches across BR, Clash Squad and guild wars — and we keep climbing.' }
  ];

  var SKILLS = [
    { label: 'RUSH', pct: 92, note: 'Main playstyle — we push hard.' },
    { label: 'SUPPORT', pct: 78, note: 'Covering fire and callouts.' },
    { label: 'SNIPER', pct: 64, note: 'Our web developer is the sniper guy.' },
    { label: 'LEADERSHIP', pct: 85, note: 'Squad leads and elders keep order.' }
  ];

  var FAQ = [
    { q: 'How do I join RAVAGE ERA?', a: 'Go to the TRYOUTS page, fill in your details, select an administrator and send the prepared WhatsApp message. Our admins will review your application.' },
    { q: 'What are the guild requirements?', a: 'Active participation, teamwork, respect, consistency — and at least 1,000 guild points per week.' },
    { q: 'What happens if I have less than 1,000 guild points?', a: 'Any guild mate with less than 1,000 guild points at the end of the week will be removed from the guild.' },
    { q: 'Is the Spin & Win guaranteed by Garena / Free Fire?', a: 'No. It is a RAVAGE ERA community promotion only. Garena / Free Fire does not officially guarantee these rewards and this website does not modify Free Fire accounts.' },
    { q: 'How long does a Spin or Likes request take?', a: 'Rewards are entered within 2 to 5 hours after your request is confirmed.' },
    { q: 'Does this website add likes or visits itself?', a: 'No. The LIKES & VISITS page only prepares a request message for our web developer / admin, who handles the service outside the game.' },
    { q: 'Who built this website?', a: 'EMMEX / ZEUS — the RAVAGE ERA web developer. He designed and maintains the Guild Hub and connects all of the guild\u2019s community services into one organized platform.' }
  ];

  var TERM_COMMANDS = {
    help: 'Available: help · whoami · guild · admins · tryouts · spin · likes · sensi · rules · booyah · slick · kagura · zeus · clear',
    whoami: 'RAVAGER // WARRIOR // MEMBER OF RAVAGE ERA.\nWe Stand United.',
    guild: 'RAVAGE ERA — competitive Free Fire guild.\n48 warriors · 5,000+ matches · founded March 2025 by SLICK BOY.',
    admins: 'GUILD LEADER: RE SLICK\nASSISTANT LEADER: KAGURA\nELDERS: MARPHY, HAPEX, RE DANNY\nMVP: RE ZEUS\nWEB DEV: EMMEX / ZEUS',
    tryouts: 'Think you have what it takes?\nSubmit your application on the TRYOUTS page.',
    spin: 'SPIN & WIN — community promotion.\nReward: GUN SKIN or NOTHING. Access on the SPIN page.',
    likes: 'LIKES & PROFILE VISITS — 10 to 100 per request.\nAccess on the LIKES & VISITS page.',
    sensi: 'SENSI CONFIGURATION — build your Free Fire sensitivity.\nAccess on the SENSI page.',
    rules: 'THE WARRIOR\u2019S CODE:\n01 WE STAND UNITED\n02 EARN YOUR POINTS (min 1,000/week)\n03 RESPECT EVERY WARRIOR\n04 REPRESENT WITH PRIDE\n05 SHOW UP',
    booyah: 'BOOYAH! 🔥🔥🔥 WE STAND UNITED!',
    slick: 'SLICK BOY — Guild Leader. Founder of RAVAGE ERA. The direction, discipline and identity of the guild run through him.',
    kagura: 'KAGURA — Assistant Guild Leader. Coordinates members and hosts the guild tournaments (5:30 PM Nigerian time).',
    zeus: 'EMMEX / ZEUS — Web Developer. Built this Guild Hub. WhatsApp: 09066760078',
    clear: null
  };

  var CLOUD_WORDS = ['BOOYAH', 'RUSH', 'CLUTCH', 'SNIPER', 'HEADSHOT', 'RANKED', 'SQUAD', 'BOOYAH PASS', 'GUN SKIN', 'WARRIOR', 'GLORY', 'UNITED', 'TRYOUT', 'LEGEND', 'ERA', 'VICTORY', 'ELITE', 'SENSI'];

  /* ==========================================================
     RE PLACEHOLDER IMAGE (no photo files needed)
     ========================================================== */
  function reImage(label, big) {
    var t = encodeURIComponent(label || 'GUILD HUB');
    var w = big ? 900 : 640, h = big ? 900 : 640;
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#141824"/><stop offset="1" stop-color="#06070a"/></linearGradient></defs>' +
      '<rect width="' + w + '" height="' + h + '" fill="url(#g)"/>' +
      '<rect x="24" y="24" width="' + (w - 48) + '" height="' + (h - 48) + '" fill="none" stroke="#f5c542" stroke-opacity=".45" stroke-width="2"/>' +
      '<circle cx="' + (w / 2) + '" cy="' + (h / 2 - 60) + '" r="' + (big ? 150 : 110) + '" fill="none" stroke="#f5c542" stroke-opacity=".35" stroke-width="2"/>' +
      '<text x="' + (w / 2) + '" y="' + (h / 2 - 20) + '" font-family="Arial" font-size="' + (big ? 120 : 90) + '" font-weight="900" fill="#f5c542" text-anchor="middle">RE</text>' +
      '<text x="' + (w / 2) + '" y="' + (h / 2 + 90) + '" font-family="Arial" font-size="' + (big ? 34 : 24) + '" font-weight="700" fill="#e8e6df" text-anchor="middle" letter-spacing="6">RAVAGE ERA</text>' +
      '<text x="' + (w / 2) + '" y="' + (h / 2 + 140) + '" font-family="Arial" font-size="' + (big ? 20 : 15) + '" fill="#9aa0ad" text-anchor="middle" letter-spacing="3">' + t + '</text></svg>';
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  var ASSETS = [
    { src: reImage('PROFILE 01'), label: 'RAVAGE ERA PROFILE 01' },
    { src: reImage('PROFILE 02'), label: 'RAVAGE ERA PROFILE 02' },
    { src: reImage('PROFILE 03'), label: 'RAVAGE ERA PROFILE 03' },
    { src: reImage('PROFILE 04'), label: 'RAVAGE ERA PROFILE 04' },
    { src: reImage('PROFILE 05'), label: 'RAVAGE ERA PROFILE 05' },
    { src: reImage('THE GUILD', true), label: 'RAVAGE ERA GUILD' },
    { src: reImage('PROFILE 07'), label: 'RAVAGE ERA PROFILE 07' },
    { src: reImage('PROFILE 08'), label: 'RAVAGE ERA PROFILE 08' }
  ];

  var ADMINS = [
    { name: 'RE SLICK', pos: 'GUILD LEADER', wa: '27835309249', rank: 1, desc: 'Guild Leader of RAVAGE ERA — maintains the direction, discipline and competitive identity of the guild.' },
    { name: 'KAGURA', pos: 'ASSISTANT GUILD LEADER', wa: '420736488219', rank: 1, desc: 'Assistant Guild Leader — coordinates members and supports guild activities.' },
    { name: 'MARPHY', pos: 'ELDER ONE', wa: '2349025007555', rank: 2, desc: 'Senior member — experience, consistency and support for the community.' },
    { name: 'HAPEX', pos: 'ELDER TWO', wa: '2348146067809', rank: 2, desc: 'Elder — keeps the environment strong and welcoming.' },
    { name: 'RE DANNY', pos: 'ELDER TWO', wa: '2349029032927', rank: 2, desc: 'Elder and founding squad member — experience and support.' },
    { name: 'RE ZEUS', pos: 'MOST VALUED MEMBER', wa: '2347064849689', rank: 3, desc: 'Most Valued Member — energy, loyalty and dedication.' },
    { name: 'EMMEX / ZEUS', pos: 'WEB DEVELOPER', wa: ZEUS_WA, rank: 3, desc: 'Web developer behind the Guild Hub — designs, develops and maintains the digital platform.' }
  ];

  /* ==========================================================
     HELPERS
     ========================================================== */
  function $(s) { return document.querySelector(s); }
  function $$(s, p) { return Array.prototype.slice.call((p || document).querySelectorAll(s)); }
  function initials(name) { return name.replace(/[^A-Za-z]/g, '').slice(0, 2).toUpperCase() || 'RE'; }
  function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
  function isPhone(v) { return String(v).replace(/\D/g, '').length >= 7; }
  function setErr(id, msg) { var el = document.getElementById(id); if (el) el.textContent = msg || ''; }
  function markField(id, ok) {
    var el = document.getElementById(id);
    if (!el) return;
    el.style.borderColor = ok ? '' : 'var(--red)';
    el.style.boxShadow = ok ? '' : '0 0 0 3px rgba(226,51,58,.18)';
  }
  function validateField(id, errId, cond, msg) {
    var ok = !!cond;
    setErr(errId, ok ? '' : msg);
    markField(id, ok);
    return ok;
  }
  function openWa(number, text) {
    var url = 'https://wa.me/' + number + '?text=' + encodeURIComponent(text || '');
    var win = window.open(url, '_blank', 'noopener');
    if (!win) window.location.href = url;
    return url;
  }
  function toast(msg) {
    var el = $('#toast');
    if (!el) return;
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(el._t);
    el._t = setTimeout(function () { el.hidden = true; }, 3600);
  }
  function openModal(id) { var m = document.getElementById(id); if (m) m.hidden = false; }
  function closeModal(id) { var m = document.getElementById(id); if (m) m.hidden = true; }
  function closeAllModals() { $$('.modal').forEach(function (m) { m.hidden = true; }); }

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- Image error fallback ---------------- */
  document.addEventListener('error', function (e) {
    var img = e.target;
    if (img && img.tagName === 'IMG' && !img.dataset.fbk) {
      img.dataset.fbk = '1';
      img.src = reImage(img.getAttribute('data-label') || 'GUILD HUB');
    }
  }, true);

  /* ==========================================================
     BOOT SEQUENCE
     ========================================================== */
  var boot = $('#boot'), bootLog = $('#bootLog'), bootTimers = [], bootDone = false;
  var BOOT_LINES = [
    '> INITIALIZING RAVAGE ERA SYSTEMS...',
    '> LOADING GUILD DATA ............ <span class="ok">OK</span>',
    '> SYNCING SQUAD ROSTER (48 MEMBERS) <span class="ok">OK</span>',
    '> CALIBRATING AIM ............... <span class="ok">OK</span>',
    '> CHARGING BOOYAH PROTOCOL ...... <span class="ok">OK</span>',
    '> ENCRYPTING WARRIOR COMMS ....... <span class="ok">OK</span>',
    '> <span class="gold">ACCESS GRANTED — WE STAND UNITED.</span>'
  ];
  function finishBoot() {
    if (bootDone) return;
    bootDone = true;
    bootTimers.forEach(clearTimeout);
    try { sessionStorage.setItem('re_booted', '1'); } catch (e) {}
    boot.classList.add('hide');
    setTimeout(function () { if (boot.parentNode) boot.parentNode.removeChild(boot); }, 550);
  }
  $('#btnBootSkip').addEventListener('click', finishBoot);
  (function runBoot() {
    if (sessionStorage.getItem('re_booted') === '1') { finishBoot(); return; }
    BOOT_LINES.forEach(function (line, i) {
      bootTimers.push(setTimeout(function () {
        var div = document.createElement('div');
        div.innerHTML = line;
        bootLog.appendChild(div);
        bootLog.scrollTop = bootLog.scrollHeight;
      }, 260 + i * 330));
    });
    bootTimers.push(setTimeout(finishBoot, 260 + BOOT_LINES.length * 330 + 500));
  })();

  /* ==========================================================
     ROUTER + SIDEBAR + BRAND
     ========================================================== */
  var ROUTES = ['home', 'tryouts', 'spin', 'likes', 'sensi', 'guild', 'admins', 'gallery', 'profiles', 'contact', 'faq'];

  function getRoute() {
    var h = location.hash.replace(/^#\/?/, '').split('?')[0];
    return ROUTES.indexOf(h) !== -1 ? h : 'tryouts';
  }
  function render() {
    var route = getRoute();
    $$('.page').forEach(function (sec) { sec.classList.toggle('active', sec.id === 'page-' + route); });
    $$('.nav-link').forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#/' + route); });
    closeSidebar();
    window.scrollTo({ top: 0 });
    document.title = route.toUpperCase() + ' — RAVAGE ERA GUILD HUB';
  }
  window.addEventListener('hashchange', render);

  var sidebar = $('#sidebar'), overlay = $('#overlay'), menuBtn = $('#btnMenu');
  function openSidebar() { sidebar.classList.add('open'); overlay.classList.add('show'); menuBtn.classList.add('open'); }
  function closeSidebar() { sidebar.classList.remove('open'); overlay.classList.remove('show'); menuBtn.classList.remove('open'); }
  menuBtn.addEventListener('click', function () { sidebar.classList.contains('open') ? closeSidebar() : openSidebar(); });
  overlay.addEventListener('click', closeSidebar);
  $$('.nav-link').forEach(function (a) { a.addEventListener('click', closeSidebar); });

  var brand = document.querySelector('.brand[data-nav]');
  if (brand) {
    brand.addEventListener('click', function () { location.hash = brand.getAttribute('data-nav'); });
    brand.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); location.hash = brand.getAttribute('data-nav'); }
    });
  }

  /* ==========================================================
     TYPEWRITER
     ========================================================== */
  var TYPED = ['WE STAND UNITED.', 'Built by warriors. United by RAVAGE.', 'Drop in. Squad up. Booyah.', 'Think you have what it takes?', '5,000+ matches. One guild. Zero doubts.'];
  (function typewriter() {
    var el = $('#typewriter');
    if (!el) return;
    if (reducedMotion) { el.textContent = TYPED[0]; return; }
    var pi = 0, ci = 0, deleting = false;
    (function step() {
      var phrase = TYPED[pi];
      el.textContent = phrase.slice(0, ci);
      var delay = deleting ? 20 : 46;
      if (!deleting) {
        if (ci < phrase.length) { ci++; setTimeout(step, delay); return; }
        deleting = true; setTimeout(step, 1900); return;
      }
      if (ci > 0) { ci--; setTimeout(step, delay); return; }
      deleting = false; pi = (pi + 1) % TYPED.length; setTimeout(step, 350);
    })();
  })();

  /* ==========================================================
     STATS COUNTERS
     ========================================================== */
  function monthsSince(m, y) {
    var now = new Date(), d = new Date(y, m - 1, 1);
    return Math.max(0, (now.getFullYear() - d.getFullYear()) * 12 + (now.getMonth() - d.getMonth()));
  }
  function animateCount(el, target, suffix) {
    var start = null;
    function frame(ts) {
      if (!start) start = ts;
      var p = Math.min(1, (ts - start) / 1400);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))).toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  (function buildStats() {
    var grid = $('#stats');
    if (!grid) return;
    grid.innerHTML = GUILD_STATS.map(function (s) {
      var num = s.num === null ? monthsSince(FOUNDED.month, FOUNDED.year) : s.num;
      return '<div class="stat-card" data-n="' + num + '" data-s="' + s.suffix + '"><div class="stat-num">0</div><div class="stat-label">' + s.label + '</div></div>';
    }).join('');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        animateCount(en.target.querySelector('.stat-num'), parseInt(en.target.dataset.n, 10), en.target.dataset.s);
        io.unobserve(en.target);
      });
    }, { threshold: 0.4 });
    $$('.stat-card', grid).forEach(function (c) { io.observe(c); });
  })();

  /* ==========================================================
     ANNOUNCEMENTS
     ========================================================== */
  $('#announcements').innerHTML = ANNOUNCEMENTS.map(function (a) {
    return '<div class="ann' + (a.warn ? ' warn' : '') + '"><div class="ann-date">' + a.date + '</div><div class="ann-title">' + a.title + '</div><p>' + a.body + '</p></div>';
  }).join('');

  /* ==========================================================
     COUNTDOWN  (next 5:30 PM Nigerian time)
     ========================================================== */
  (function countdown() {
    var box = $('#countdown');
    if (!box) return;
    function next() {
      var now = new Date(), t = new Date(now);
      t.setUTCHours(TOURNAMENT.hour - TOURNAMENT.offset, TOURNAMENT.minute, 0, 0);
      if (t <= now) t.setUTCDate(t.getUTCDate() + 1);
      return t;
    }
    function pad(n) { return n < 10 ? '0' + n : '' + n; }
    function tick() {
      var diff = next() - new Date();
      if (diff <= 0) {
        box.innerHTML = '<div class="no-event">● TOURNAMENT LIVE — REPORT IN, WARRIORS!</div>';
        return;
      }
      var d = Math.floor(diff / 86400000), h = Math.floor(diff % 86400000 / 3600000),
          m = Math.floor(diff % 3600000 / 60000), s = Math.floor(diff % 60000 / 1000);
      box.innerHTML =
        '<div class="cd-box"><div class="cd-num">' + pad(d) + '</div><div class="cd-label">DAYS</div></div>' +
        '<div class="cd-box"><div class="cd-num">' + pad(h) + '</div><div class="cd-label">HOURS</div></div>' +
        '<div class="cd-box"><div class="cd-num">' + pad(m) + '</div><div class="cd-label">MIN</div></div>' +
        '<div class="cd-box"><div class="cd-num">' + pad(s) + '</div><div class="cd-label">SEC</div></div>';
    }
    tick();
    setInterval(tick, 1000);
  })();

  /* ==========================================================
     MVP OF THE WEEK
     ========================================================== */
  (function mvp() {
    var box = $('#mvp');
    if (!box) return;
    var idx = 0, timer = null;
    function renderMvp() {
      var m = MVP_LIST[idx];
      box.innerHTML =
        '<div class="mvp"><h4>★ ' + m.name + '</h4>' +
        '<span class="badge">' + m.tag + '</span><p>' + m.desc + '</p></div>';
    }
    function restart() {
      if (timer) clearInterval(timer);
      timer = setInterval(function () { idx = (idx + 1) % MVP_LIST.length; renderMvp(); }, 5000);
    }
    box.addEventListener('mouseenter', function () { clearInterval(timer); });
    box.addEventListener('mouseleave', restart);
    renderMvp(); restart();
  })();

  /* ==========================================================
     TIMELINE + SKILLS (home & guild pages)
     ========================================================== */
  function renderTimeline(el) {
    if (!el) return;
    el.innerHTML = TIMELINE.map(function (t) {
      return '<div class="tl-item"><div class="tl-date">' + t.date + '</div><div class="tl-title">' + t.title + '</div><p class="tl-body">' + t.body + '</p></div>';
    }).join('');
  }
  renderTimeline($('#timeline'));
  renderTimeline($('#timeline2'));

  function renderSkills(el) {
    if (!el) return;
    el.innerHTML = SKILLS.map(function (s) {
      return '<div class="skill-row" data-pct="' + s.pct + '"><div class="sk-head"><span>' + s.label + '</span><span>' + s.pct + '%</span></div><div class="sk-bar"><div class="sk-fill"></div></div><small>' + s.note + '</small></div>';
    }).join('');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.querySelector('.sk-fill').style.width = en.target.dataset.pct + '%';
        io.unobserve(en.target);
      });
    }, { threshold: 0.4 });
    $$('.skill-row', el).forEach(function (r) { io.observe(r); });
  }
  renderSkills($('#skills'));
  renderSkills($('#skills2'));

  /* ==========================================================
     INTERACTIVE TERMINAL
     ========================================================== */
  (function terminal() {
    var body = $('#termBody'), input = $('#termInput');
    if (!body) return;
    function line(html, cls) {
      var div = document.createElement('div');
      if (cls) div.className = cls;
      div.innerHTML = html;
      body.appendChild(div);
      body.scrollTop = body.scrollHeight;
    }
    function run(cmdRaw) {
      var cmd = String(cmdRaw || '').trim().toLowerCase();
      line('<span style="color:var(--gold)">RE@RAVAGE-ERA:~$</span> ' + cmd);
      if (!cmd) { line('Type a command. (help)', 't-err'); return; }
      if (cmd === 'clear') { body.innerHTML = ''; return; }
      var res = TERM_COMMANDS[cmd];
      if (res === undefined) { line('command not found: ' + cmd, 't-err'); line("Type 'help' to list commands."); return; }
      res.split('\n').forEach(function (r) {
        line(r.replace(/^> ?/, ''), /BOOYAH/.test(r) ? 't-gold' : '');
      });
      line('');
    }
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { run(input.value); input.value = ''; }
    });
    line('<span style="color:var(--mut)">Welcome to the RAVAGE ERA Command Center. Type <b>help</b>.</span>');
    line('');
    run('help');
  })();

  /* ==========================================================
     DRAGGABLE BOOYAH CLOUD
     ========================================================== */
  (function cloud() {
    var sphere = $('#cloud');
    if (!sphere) return;
    var words = CLOUD_WORDS.slice(0, 18), n = words.length, R = 130;
    var pts = [], golden = Math.PI * (3 - Math.sqrt(5));
    for (var i = 0; i < n; i++) {
      var y = 1 - (i / (n - 1)) * 2, rad = Math.sqrt(1 - y * y), th = golden * i;
      pts.push({ x: Math.cos(th) * rad, y: y, z: Math.sin(th) * rad });
    }
    sphere.innerHTML = words.map(function (w) {
      return '<span class="cw">' + w + '</span>';
    }).join('');
    var els = $$('.cw', sphere), rx = -0.35, ry = 0.6, dragging = false, lastX = 0, lastY = 0;
    function frame() {
      if (!dragging && !reducedMotion) { ry += 0.0016; rx += 0.0005; }
      for (var i = 0; i < n; i++) {
        var p = pts[i];
        var x1 = p.x * Math.cos(ry) + p.z * Math.sin(ry);
        var z1 = -p.x * Math.sin(ry) + p.z * Math.cos(ry);
        var y2 = p.y * Math.cos(rx) - z1 * Math.sin(rx);
        var z2 = p.y * Math.sin(rx) + z1 * Math.cos(rx);
        var depth = (z2 + 1) / 2;
        var el = els[i];
        el.style.transform = 'translate(-50%,-50%) translate3d(' + (x1 * R) + 'px,' + (y2 * R) + 'px,0) scale(' + (0.72 + depth * 0.55) + ')';
        el.style.opacity = (0.35 + depth * 0.65).toFixed(2);
        el.style.zIndex = Math.round(depth * 100);
        el.style.color = 'hsl(' + Math.round(42 + depth * 20) + ',80%,' + Math.round(45 + depth * 25) + '%)';
      }
      if (!reducedMotion) requestAnimationFrame(frame);
    }
    if (reducedMotion) { frame(); return; }
    sphere.addEventListener('pointerdown', function (e) { dragging = true; lastX = e.clientX; lastY = e.clientY; sphere.setPointerCapture(e.pointerId); });
    sphere.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      ry += (e.clientX - lastX) * 0.005; rx += (e.clientY - lastY) * 0.005;
      lastX = e.clientX; lastY = e.clientY;
    });
    sphere.addEventListener('pointerup', function () { dragging = false; });
    sphere.addEventListener('pointercancel', function () { dragging = false; });
    frame();
  })();

  /* ==========================================================
     FAQ (accordion)
     ========================================================== */
  (function faq() {
    var list = $('#faqList');
    if (!list) return;
    list.innerHTML = FAQ.map(function (f) {
      return '<div class="faq-item"><button class="faq-q" type="button"><span>' + f.q + '</span><span class="faq-x">+</span></button><div class="faq-a">' + f.a + '</div></div>';
    }).join('');
    list.addEventListener('click', function (e) {
      var q = e.target.closest('.faq-q');
      if (!q) return;
      var item = q.parentNode, wasOpen = item.classList.contains('open');
      $$('.faq-item', list).forEach(function (it) { it.classList.remove('open'); });
      if (!wasOpen) item.classList.add('open');
    });
  })();

  /* ==========================================================
     MODAL CLOSE + ESC
     ========================================================== */
  $$('.modal').forEach(function (m) {
    m.addEventListener('click', function (e) { if (e.target === m) closeModal(m.id); });
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeAllModals(); });

  /* ==========================================================
     ADMINS (contact grid + tryout-select grid)
     ========================================================== */
  function adminCard(a, mode) {
    var attr = mode === 'select'
      ? 'data-select-admin="' + a.wa + '"'
      : 'data-contact-admin="' + a.wa + '"';
    var label = mode === 'select' ? 'SELECT ADMIN' : 'CONTACT ON WHATSAPP';
    var cls = mode === 'select' ? 'btn btn-gold btn-sm' : 'btn btn-red btn-sm';
    return '<article class="admin-card rank-' + a.rank + '">' +
      '<div class="admin-avatar">' + initials(a.name) + '</div>' +
      '<h4>' + a.name + '</h4>' +
      '<span class="badge">' + a.pos + '</span>' +
      '<p>' + a.desc + '</p>' +
      '<button class="' + cls + '" ' + attr + ' type="button">' + label + '</button>' +
    '</article>';
  }

  $('#adminsGrid').innerHTML = ADMINS.map(function (a) { return adminCard(a, 'contact'); }).join('');
  $('#tryoutAdminGrid').innerHTML = ADMINS.map(function (a) { return adminCard(a, 'select'); }).join('');

  $('#adminsGrid').addEventListener('click', function (e) {
    var btn = e.target.closest('[data-contact-admin]');
    if (!btn) return;
    var a = ADMINS.filter(function (x) { return x.wa === btn.getAttribute('data-contact-admin'); })[0];
    if (a) { openWa(a.wa); toast('WhatsApp opened for ' + a.name); }
  });

  /* ==========================================================
     TRYOUTS
     ========================================================== */
  var tryoutHero = $('#tryoutHero');
  var tryoutFormPanel = $('#tryoutFormPanel');
  var tryoutAdminPanel = $('#tryoutAdminPanel');
  var tryoutPhotoFile = null;
  var tryoutData = {};

  $('#btnStartTryout').addEventListener('click', function () {
    tryoutHero.hidden = true;
    tryoutFormPanel.hidden = false;
  });
  $('#btnTryoutBack').addEventListener('click', function () {
    tryoutFormPanel.hidden = true;
    tryoutHero.hidden = false;
  });
  $('#btnAdminBack').addEventListener('click', function () {
    tryoutAdminPanel.hidden = true;
    tryoutFormPanel.hidden = false;
  });

  $('#tryoutPhoto').addEventListener('change', function () {
    var f = this.files[0];
    if (!f) return;
    if (!f.type.match(/^image\//)) { setErr('errTryoutPhoto', 'Please choose an image file.'); return; }
    tryoutPhotoFile = f;
    $('#tryoutPhotoName').textContent = f.name;
    $('#tryoutPhotoPreview').src = URL.createObjectURL(f);
    $('#tryoutPhotoPreviewWrap').hidden = false;
    setErr('errTryoutPhoto', '');
    markField('tryoutPhoto', true);
  });
  $('#tryoutPhotoClear').addEventListener('click', function () {
    tryoutPhotoFile = null;
    $('#tryoutPhoto').value = '';
    $('#tryoutPhotoName').textContent = 'Upload Profile';
    $('#tryoutPhotoPreviewWrap').hidden = true;
  });

  $('#tryoutForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var name = $('#tryoutName').value.trim();
    var uid = $('#tryoutUid').value.trim();
    var email = $('#tryoutEmail').value.trim();
    var phone = $('#tryoutPhone').value.trim();
    var ok = true;
    ok = validateField('tryoutName', 'errTryoutName', name.length >= 2, 'In-game name is required.') && ok;
    ok = validateField('tryoutUid', 'errTryoutUid', uid.length >= 4, 'UID is required.') && ok;
    ok = validateField('tryoutEmail', 'errTryoutEmail', email === '' || isEmail(email), email ? 'Enter a valid email.' : '') && ok;
    ok = validateField('tryoutPhone', 'errTryoutPhone', isPhone(phone), 'A valid phone number is required.') && ok;
    ok = validateField('tryoutPhoto', 'errTryoutPhoto', !!tryoutPhotoFile, 'Profile photo is required.') && ok;
    if (!ok) { toast('Please fix the highlighted fields.'); return; }
    tryoutData = { name: name, uid: uid, email: email, phone: phone };
    tryoutFormPanel.hidden = true;
    tryoutAdminPanel.hidden = false;
    window.scrollTo({ top: 0 });
  });

  $('#tryoutAdminGrid').addEventListener('click', function (e) {
    var btn = e.target.closest('[data-select-admin]');
    if (!btn) return;
    var a = ADMINS.filter(function (x) { return x.wa === btn.getAttribute('data-select-admin'); })[0];
    if (!a) return;
    var msg = [
      'RAVAGE ERA TRYOUT APPLICATION', '',
      'In-game name: ' + tryoutData.name,
      'UID: ' + tryoutData.uid,
      'Email: ' + (tryoutData.email || 'Not provided'),
      'Phone: ' + tryoutData.phone,
      '', 'Selected admin: ' + a.name + ' (' + a.pos + ')'
    ].join('\n');
    openWa(a.wa, msg);
    openModal('modalTryoutSuccess');
  });
  $('#btnTryoutClose').addEventListener('click', function () { closeModal('modalTryoutSuccess'); });
  $('#btnTryoutViewGuild').addEventListener('click', function () {
    closeModal('modalTryoutSuccess');
    location.hash = '#/guild';
  });

  /* ==========================================================
     SPIN & WIN — CIRCULAR WHEEL (GUN SKIN / NOTHING)
     8 segments · real 50/50 · lands under the pointer
     ========================================================== */
  var wheel = $('#wheel');
  var SEG = 8, SEG_DEG = 360 / SEG, WHEEL_D = Math.round(150 * 0.68);

  (function buildWheel() {
    var stops = [], labels = '';
    for (var i = 0; i < SEG; i++) {
      var isWin = (i % 2 === 0);            // 0,2,4,6 = GUN SKIN · 1,3,5,7 = NOTHING
      var from = i * SEG_DEG, to = (i + 1) * SEG_DEG;
      stops.push((isWin ? '#f5c142' : '#16162b') + ' ' + from + 'deg ' + to + 'deg');
      var A = i * SEG_DEG + SEG_DEG / 2;    // segment center (wheel-local, clockwise from top)
      var rot = A + 90;
      var color = isWin ? '#1a0b2e' : '#8f9bb3';
      var text = isWin ? 'GUN SKIN' : 'NOTHING';
      labels += '<span class="seg-label" style="width:80px;font-size:10.5px;white-space:nowrap;color:' + color +
        ';transform:translate(-50%,-50%) rotate(' + rot + 'deg) translateY(-' + WHEEL_D + 'px) rotate(-' + rot + 'deg)">' + text + '</span>';
    }
    wheel.style.background = 'conic-gradient(from 90deg, ' + stops.join(',') + ')';
    wheel.insertAdjacentHTML('beforeend', labels);
  })();

  var spinning = false;
  var rotation = 0;

  $('#btnSpinUnlock').addEventListener('click', function () {
    var uid = $('#spinUid').value.trim();
    var code = $('#spinCode').value;
    var ok = true;
    ok = validateField('spinUid', 'errSpinUid', uid.length >= 4, 'UID is required.') && ok;
    ok = validateField('spinCode', 'errSpinCode', code === SECRET, 'Incorrect secret code.') && ok;
    if (!ok) {
      $('#spinPinHelp').hidden = false;
      toast('Incorrect code — contact ZEUS on WhatsApp.');
      return;
    }
    $('#spinPinHelp').hidden = true;
    $('#spinGate').hidden = true;
    $('#spinWheel').hidden = false;
    window.scrollTo({ top: 0 });
  });

  $('#btnSpinPinWa').addEventListener('click', function () {
    openWa(ZEUS_WA, 'I entered a wrong code on the SPIN & WIN page of the RAVAGE ERA Guild Hub. Please send me the code.');
  });

  function showSpinOutcome(win) {
    var out = $('#spinOutcome');
    out.hidden = false;
    if (win) {
      out.className = 'outcome win';
      out.innerHTML = '<div>🎉 GUN SKIN!</div>' +
        '<p>The wheel landed on GUN SKIN. Claim your reward below.</p>' +
        '<button id="btnSpinGoClaim" class="btn btn-gold" type="button">CLAIM YOUR REWARD →</button>';
      $('#btnSpinGoClaim').addEventListener('click', function () {
        $('#spinWheel').hidden = true;
        $('#spinClaim').hidden = false;
        window.scrollTo({ top: 0 });
      });
    } else {
      out.className = 'outcome lose';
      out.innerHTML = '<div>NOTHING this time.</div>' +
        '<p>The wheel landed on NOTHING. Spin again, warrior — We Stand United.</p>' +
        '<button id="btnSpinAgain" class="btn btn-ghost" type="button">SPIN AGAIN</button>';
      $('#btnSpinAgain').addEventListener('click', function () { out.hidden = true; });
    }
  }

  $('#btnSpinStart').addEventListener('click', function () {
    if (spinning) return;
    spinning = true;
    var btn = this;
    btn.disabled = true;
    btn.textContent = 'SPINNING...';
    $('#spinOutcome').hidden = true;

    var win = Math.random() < 0.5;                        // real 50/50
    var candidates = win ? [0, 2, 4, 6] : [1, 3, 5, 7];
    var seg = candidates[Math.floor(Math.random() * 4)];
    var jitter = (Math.random() * 16) - 8;                // ±8° — stays inside the 45° segment
    var target = ((247.5 - seg * SEG_DEG + jitter) % 360 + 360) % 360;
    var spins = 5 + Math.floor(Math.random() * 3);        // 5–7 full rotations
    var cur = rotation % 360;
    var delta = ((target - cur) % 360 + 360) % 360;
    rotation += spins * 360 + delta;
    wheel.style.transform = 'rotate(' + rotation + 'deg)';

    setTimeout(function () {
      spinning = false;
      btn.disabled = false;
      btn.textContent = 'SPIN';
      showSpinOutcome(win);
    }, 4300);
  });

  /* ---- Spin claim (win only) ---- */
  var spinShotFile = null;

  $('#btnSpinBack').addEventListener('click', function () {
    $('#spinClaim').hidden = true;
    $('#spinWheel').hidden = false;
  });

  $('#spinShot').addEventListener('change', function () {
    var f = this.files[0];
    if (!f) return;
    if (!f.type.match(/^image\//)) { setErr('errSpinShot', 'Please choose an image file.'); return; }
    spinShotFile = f;
    $('#spinShotName').textContent = f.name;
    $('#spinShotPreview').src = URL.createObjectURL(f);
    $('#spinShotPreviewWrap').hidden = false;
    setErr('errSpinShot', '');
  });
  $('#btnSpinShotClear').addEventListener('click', function () {
    spinShotFile = null;
    $('#spinShot').value = '';
    $('#spinShotName').textContent = 'Upload Screenshot';
    $('#spinShotPreviewWrap').hidden = true;
  });

  $('#btnSpinClaimNext').addEventListener('click', function () {
    var uid = $('#claimUid').value.trim();
    var ok = validateField('claimUid', 'errClaimUid', uid.length >= 4, 'UID is required.');
    if (!ok) { toast('Please fix the highlighted fields.'); return; }
    var msg = [
      'RAVAGE ERA SPIN & WIN — REWARD CLAIM', '',
      'UID: ' + uid,
      'Reward: GUN SKIN',
      'Screenshot attached: ' + (spinShotFile ? 'YES' : 'NO'),
      'Claim confirmed: YES — I confirm my participation in the RAVAGE ERA Spin & Win community promotion.'
    ].join('\n');
    openWa(ZEUS_WA, msg);
    openModal('modalSpinProcess');     // → "entered within 2 to 5 hours"
  });

  $('#btnSpinProcessOk').addEventListener('click', function () {
    closeModal('modalSpinProcess');
    openModal('modalSpinThanks');      // → thanks message
  });

  $('#btnSpinThanksClose').addEventListener('click', function () {
    closeModal('modalSpinThanks');
    $('#spinClaim').hidden = true;
    $('#spinWheel').hidden = false;
    $('#spinOutcome').hidden = true;
    $('#claimUid').value = '';
    $('#spinShot').value = '';
    spinShotFile = null;
    $('#spinShotName').textContent = 'Upload Screenshot';
    $('#spinShotPreviewWrap').hidden = true;
    setErr('errClaimUid', '');
    setErr('errSpinShot', '');
    window.scrollTo({ top: 0 });
  });

  /* ==========================================================
     LIKES & VISITS (min 10 — max 100)
     ========================================================== */
  $('#btnLikesUnlock').addEventListener('click', function () {
    var uid = $('#likesUid').value.trim();
    var code = $('#likesCode').value;
    var ok = true;
    ok = validateField('likesUid', 'errLikesUid', uid.length >= 4, 'UID is required.') && ok;
    ok = validateField('likesCode', 'errLikesCode', code === SECRET, 'Incorrect secret code.') && ok;
    if (!ok) {
      $('#likesPinHelp').hidden = false;
      toast('Incorrect code — contact ZEUS on WhatsApp.');
      return;
    }
    $('#likesPinHelp').hidden = true;
    $('#likesSummaryUid').textContent = uid;
    $('#likesGate').hidden = true;
    $('#likesConfirm').hidden = false;
    window.scrollTo({ top: 0 });
  });

  $('#btnLikesPinWa').addEventListener('click', function () {
    openWa(ZEUS_WA, 'I entered a wrong code on the LIKES & VISITS page of the RAVAGE ERA Guild Hub. Please send me the code.');
  });

  $('#likesSlider').addEventListener('input', function () {
    $('#likesAmount').textContent = this.value;
  });

  $('#btnLikesBack').addEventListener('click', function () {
    $('#likesConfirm').hidden = true;
    $('#likesGate').hidden = false;
  });

  $('#btnLikesContinue').addEventListener('click', function () {
    var uid = $('#likesSummaryUid').textContent;
    var amount = $('#likesSlider').value;
    var msg = [
      'RAVAGE ERA LIKES / PROFILE VISITS REQUEST', '',
      'UID: ' + uid,
      'Amount: ' + amount,
      'Service: Free Fire likes & profile visits (RAVAGE ERA community service)'
    ].join('\n');
    openWa(ZEUS_WA, msg);
    $('#likesProcessAmount').textContent = amount;
    openModal('modalLikesProcess');    // → "entered within 2 to 5 hours"
  });

  $('#btnLikesProcessOk').addEventListener('click', function () {
    closeModal('modalLikesProcess');
    openModal('modalLikesThanks');     // → thanks message
  });

  $('#btnLikesThanksClose').addEventListener('click', function () {
    closeModal('modalLikesThanks');
    $('#likesConfirm').hidden = true;
    $('#likesGate').hidden = false;
    $('#likesUid').value = '';
    $('#likesCode').value = '';
    $('#likesSlider').value = 50;
    $('#likesAmount').textContent = '50';
    setErr('errLikesUid', '');
    setErr('errLikesCode', '');
    $('#likesPinHelp').hidden = true;
    window.scrollTo({ top: 0 });
  });

  /* ==========================================================
     SENSI CONFIGURATION — 5-STEP WIZARD
     ========================================================== */
  var PHONES = [
    { icon: '🍎', name: 'iPhone' },
    { icon: '📱', name: 'Samsung Galaxy' },
    { icon: '📱', name: 'Tecno' },
    { icon: '📱', name: 'Infinix' },
    { icon: '📱', name: 'Itel' },
    { icon: '📱', name: 'Xiaomi Redmi' },
    { icon: '📱', name: 'Oppo' },
    { icon: '📱', name: 'Vivo' },
    { icon: '📱', name: 'Nokia' },
    { icon: '📱', name: 'Huawei' },
    { icon: '📱', name: 'Realme' },
    { icon: '📱', name: 'OnePlus' },
    { icon: '🤖', name: 'Google Pixel' },
    { icon: '🎮', name: 'Asus ROG' },
    { icon: '📱', name: 'Motorola' }
  ];

  var SENSI_STEPS = ['PHONE TYPE', 'FULL PHONE NAME', 'FINGERS', 'DPI', 'PIN'];
  var sensi = { phone: '', fullName: '', fingers: null, dpi: null };

  function sensiGo(n) {
    for (var i = 1; i <= 5; i++) {
      var el = $('#sensiStep' + i);
      if (el) el.hidden = (i !== n);
    }
    $('#sensiSteps').textContent = 'STEP ' + n + ' / 5 — ' + SENSI_STEPS[n - 1];
    window.scrollTo({ top: 0 });
  }

  $('#phoneGrid').innerHTML = PHONES.map(function (p) {
    return '<button class="phone-btn" data-phone="' + p.name + '" type="button"><span class="p-icon">' + p.icon + '</span>' + p.name + '</button>';
  }).join('');

  $('#phoneGrid').addEventListener('click', function (e) {
    var b = e.target.closest('.phone-btn');
    if (!b) return;
    $$('.phone-btn').forEach(function (x) { x.classList.remove('sel'); });
    b.classList.add('sel');
    sensi.phone = b.dataset.phone;
    sensiGo(2);
  });

  $$('[data-sback]').forEach(function (b) {
    b.addEventListener('click', function () { sensiGo(parseInt(b.dataset.sback, 10)); });
  });

  $('#btnSensiNext3').addEventListener('click', function () {
    var name = $('#sensiPhone').value.trim();
    if (name.length < 2) {
      setErr('errSensiPhone', 'Enter your full phone name (e.g. iPhone 13 Pro Max).');
      toast('Please enter your phone full name.');
      return;
    }
    sensi.fullName = name;
    setErr('errSensiPhone', '');
    sensiGo(3);
  });

  $('#fingerOptions').innerHTML = [2, 3, 4].map(function (f) {
    return '<button class="opt-btn" data-fingers="' + f + '" type="button">' + f + ' FINGERS</button>';
  }).join('');

  $('#fingerOptions').addEventListener('click', function (e) {
    var b = e.target.closest('.opt-btn');
    if (!b) return;
    $$('.opt-btn', this).forEach(function (x) { x.classList.remove('sel'); });
    b.classList.add('sel');
    sensi.fingers = parseInt(b.dataset.fingers, 10);
    sensiGo(4);
  });

  $('#dpiOptions').innerHTML = ['LOW', 'MEDIUM', 'HIGH'].map(function (d) {
    return '<button class="opt-btn" data-dpi="' + d + '" type="button">' + d + '</button>';
  }).join('');

  $('#dpiOptions').addEventListener('click', function (e) {
    var b = e.target.closest('.opt-btn');
    if (!b) return;
    $$('.opt-btn', this).forEach(function (x) { x.classList.remove('sel'); });
    b.classList.add('sel');
    sensi.dpi = b.dataset.dpi;
    sensiGo(5);
  });

  /* PIN check — wrong PIN → contact owner */
  $('#btnSensiGenerate').addEventListener('click', function () {
    var pin = $('#sensiPin').value;
    if (pin !== SECRET) {
      setErr('errSensiPin', 'Incorrect PIN.');
      $('#sensiPinHelp').hidden = false;
      toast('Incorrect PIN — contact the owner for the PIN.');
      return;
    }
    setErr('errSensiPin', '');
    $('#sensiPinHelp').hidden = true;
    generateSensi();
  });

  $('#btnSensiPinWa').addEventListener('click', function () {
    openWa(ZEUS_WA, 'I entered a wrong PIN on the SENSI page of the RAVAGE ERA Guild Hub. Please send me the PIN.');
  });

  /* ---- Sensi generation ---- */
  function ri(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

  var SENSI_SETTINGS = [
    { name: 'GENERAL', min: 100, max: 170 },
    { name: 'RED DOT', min: 70, max: 120 },
    { name: '2X SCOPE', min: 60, max: 110 },
    { name: '4X SCOPE', min: 50, max: 100 },
    { name: 'SNIPER SCOPE', min: 50, max: 90 },
    { name: 'FREE LOOK', min: 80, max: 140 }
  ];

  function generateSensi() {
    var fire = ri(43, 50);   // fire button: 43%–50% (random)
    var rows = SENSI_SETTINGS.map(function (s) {
      var v = ri(s.min, s.max);   // everything else: 50–170
      return '<div class="sensi-row"><span>' + s.name + '</span><b>' + v + '%</b></div>';
    }).join('') +
      '<div class="sensi-row"><span class="fire">🔥 FIRE BUTTON SIZE</span><b>' + fire + '%</b></div>';

    $('#sensiList').innerHTML = rows;
    $('#sensiPhoneLabel').textContent = sensi.phone + ' — ' + sensi.fullName;
    $('#sensiMeta').textContent = sensi.fingers + ' FINGERS · DPI: ' + sensi.dpi;

    $('#sensiStep5').hidden = true;
    $('#sensiResult').hidden = false;
    window.scrollTo({ top: 0 });
  }

  /* Copy / share use the EXACT numbers shown on screen */
  function readShownSensi() {
    return $$('.sensi-row', $('#sensiList')).map(function (row) {
      return row.querySelector('span').textContent.trim() + ': ' + row.querySelector('b').textContent.trim();
    }).join('\n');
  }

  $('#btnSensiCopy').addEventListener('click', function () {
    var text = 'RAVAGE ERA SENSI — ' + sensi.phone + ' ' + sensi.fullName + '\n' +
      sensi.fingers + ' fingers · DPI: ' + sensi.dpi + '\n' + readShownSensi();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { toast('Sensi copied to clipboard!'); });
    } else {
      var ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); toast('Sensi copied to clipboard!'); } catch (err) { toast('Could not copy.'); }
      ta.remove();
    }
  });

  $('#btnSensiWa').addEventListener('click', function () {
    var text = 'RAVAGE ERA SENSI SETTINGS 🎯\n' +
      'Phone: ' + sensi.phone + ' ' + sensi.fullName + '\n' +
      'Fingers: ' + sensi.fingers + ' | DPI: ' + sensi.dpi + '\n' + readShownSensi();
    openWa(ZEUS_WA, text);
    toast('WhatsApp opened — your sensi is ready to send.');
  });

  $('#btnSensiReset').addEventListener('click', function () {
    sensi = { phone: '', fullName: '', fingers: null, dpi: null };
    $('#sensiResult').hidden = true;
    $('#sensiPin').value = '';
    $('#sensiPhone').value = '';
    $$('.phone-btn').forEach(function (x) { x.classList.remove('sel'); });
    $$('.opt-btn').forEach(function (x) { x.classList.remove('sel'); });
    setErr('errSensiPin', '');
    $('#sensiPinHelp').hidden = true;
    sensiGo(1);
  });

  /* ==========================================================
     GALLERY (swipe + thumbnails + fullscreen modal)
     ========================================================== */
  var galIndex = 0;
  var galFeatured = $('#galFeatured');
  var galLabel = $('#galLabel');
  var galCounter = $('#galCounter');

  function renderGallery() {
    var g = ASSETS[galIndex];
    galFeatured.src = g.src;
    galFeatured.setAttribute('data-label', g.label);
    galLabel.textContent = g.label;
    galCounter.textContent = (galIndex + 1) + ' / ' + ASSETS.length;
    $$('.gal-thumb').forEach(function (t, i) {
      t.classList.toggle('active', i === galIndex);
    });
  }

  $('#galThumbs').innerHTML = ASSETS.map(function (g, i) {
    return '<button class="gal-thumb" data-i="' + i + '" aria-label="' + g.label + '" type="button">' +
      '<img src="' + g.src + '" data-label="' + g.label + '" alt="' + g.label + '"></button>';
  }).join('');

  function galStep(dir) {
    galIndex = (galIndex + dir + ASSETS.length) % ASSETS.length;
    renderGallery();
  }

  $('#btnGalPrev').addEventListener('click', function () { galStep(-1); });
  $('#btnGalNext').addEventListener('click', function () { galStep(1); });

  $('#galThumbs').addEventListener('click', function (e) {
    var t = e.target.closest('.gal-thumb');
    if (t) { galIndex = parseInt(t.dataset.i, 10); renderGallery(); }
  });

  var touchX = null;
  var galMain = $('#galMain');
  galMain.addEventListener('touchstart', function (e) { touchX = e.changedTouches[0].clientX; }, { passive: true });
  galMain.addEventListener('touchend', function (e) {
    if (touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) galStep(dx < 0 ? 1 : -1);
    touchX = null;
  }, { passive: true });

  $('#btnGalFull').addEventListener('click', function () {
    var g = ASSETS[galIndex];
    $('#galModalImg').src = g.src;
    $('#galModalImg').setAttribute('data-label', g.label);
    $('#galModalLabel').textContent = g.label;
    openModal('modalGallery');
  });
  $('#btnGalModalClose').addEventListener('click', function () { closeModal('modalGallery'); });

  renderGallery();

  /* ==========================================================
     PROFILES
     ========================================================== */
  $('#profilesGrid').innerHTML = ASSETS.map(function (g, i) {
    return '<article class="profile-card">' +
      '<img class="p-img" src="' + g.src + '" data-label="' + g.label + '" alt="' + g.label + '" loading="lazy">' +
      '<div class="p-body"><div class="p-badges"><span>PROFILE</span><span>GALLERY</span></div>' +
      '<h4>' + g.label + '</h4>' +
      '<button class="btn btn-gold btn-sm" data-view="' + i + '" type="button">VIEW</button></div>' +
    '</article>';
  }).join('');

  $('#profilesGrid').addEventListener('click', function (e) {
    var btn = e.target.closest('[data-view]');
    if (!btn) return;
    var g = ASSETS[parseInt(btn.dataset.view, 10)];
    $('#profModalImg').src = g.src;
    $('#profModalImg').setAttribute('data-label', g.label);
    $('#profModalLabel').textContent = g.label;
    openModal('modalProfile');
  });
  $('#btnProfModalClose').addEventListener('click', function () { closeModal('modalProfile'); });

  /* ==========================================================
     CONTACT — EMAIL + WHATSAPP
     ========================================================== */
  $('#emailForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var name = $('#cName').value.trim();
    var email = $('#cEmail').value.trim();
    var message = $('#cMessage').value.trim();
    var ok = true;
    ok = validateField('cName', 'errCName', name.length >= 2, 'Name is required.') && ok;
    ok = validateField('cEmail', 'errCEmail', isEmail(email), 'A valid email is required.') && ok;
    ok = validateField('cMessage', 'errCMessage', message.length >= 5, 'Message is required.') && ok;
    if (!ok) { toast('Please fix the highlighted fields.'); return; }
    var subject = 'RAVAGE ERA GUILD QUERY';
    var body = [
      'RAVAGE ERA WEBSITE QUERY', '',
      'Name: ' + name,
      'Email: ' + email,
      '', 'Message:', message
    ].join('\n');
    window.location.href = 'mailto:' + GUILD_EMAIL +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);
    toast('Opening your email app with the query pre-filled...');
  });

  $('#waForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var name = $('#wName').value.trim();
    var phone = $('#wPhone').value.trim();
    var message = $('#wMessage').value.trim();
    var ok = true;
    ok = validateField('wName', 'errWName', name.length >= 2, 'Name is required.') && ok;
    ok = validateField('wPhone', 'errWPhone', isPhone(phone), 'A valid phone number is required.') && ok;
    ok = validateField('wMessage', 'errWMessage', message.length >= 5, 'Message is required.') && ok;
    if (!ok) { toast('Please fix the highlighted fields.'); return; }
    var msg = [
      'RAVAGE ERA WEBSITE QUERY', '',
      'Name: ' + name,
      'Phone: ' + phone,
      'Message: ' + message
    ].join('\n');
    openWa(ZEUS_WA, msg);
    toast('WhatsApp opened — your query is ready. Press Send.');
  });

  /* ==========================================================
     PARTICLES (canvas background)
     ========================================================== */
  var fx = $('#fx');
  if (fx && fx.getContext) {
    var fctx = fx.getContext('2d');
    var parts = [], fxW = 0, fxH = 0;
    var COLORS = ['245,197,66', '226,51,58', '123,63,228'];

    function sizeFx() { fxW = fx.width = window.innerWidth; fxH = fx.height = window.innerHeight; }
    function makePart() {
      return {
        x: Math.random() * fxW, y: Math.random() * fxH,
        r: Math.random() * 1.8 + 0.6,
        vx: (Math.random() - 0.5) * 0.28,
        vy: -(Math.random() * 0.38 + 0.08),
        a: Math.random() * 0.5 + 0.1,
        c: COLORS[(Math.random() * COLORS.length) | 0]
      };
    }
    function initParts() {
      var n = Math.min(50, Math.max(18, Math.floor(fxW * fxH / 24000)));
      parts = [];
      for (var i = 0; i < n; i++) parts.push(makePart());
    }
    function tick() {
      fctx.clearRect(0, 0, fxW, fxH);
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.y < -8) { p.y = fxH + 8; p.x = Math.random() * fxW; }
        if (p.x < -8) p.x = fxW + 8;
        if (p.x > fxW + 8) p.x = -8;
        fctx.beginPath();
        fctx.arc(p.x, p.y, p.r * 3, 0, 6.2832);
        fctx.fillStyle = 'rgba(' + p.c + ',' + (p.a * 0.18) + ')';
        fctx.fill();
        fctx.beginPath();
        fctx.arc(p.x, p.y, p.r, 0, 6.2832);
        fctx.fillStyle = 'rgba(' + p.c + ',' + p.a + ')';
        fctx.fill();
      }
      if (!document.hidden) requestAnimationFrame(tick);
    }
    if (!reducedMotion) { sizeFx(); initParts(); tick(); }
    else { fx.style.display = 'none'; }
    window.addEventListener('resize', function () { sizeFx(); initParts(); });
  }

  /* ==========================================================
     INIT
     ========================================================== */
  render();
})();
