/* Effets propres au QD2A (direction « Le Tapuscrit »). Le socle gère l'ouverture, le voile « page », l'en-tête,
   le menu, le mode calme, les boucles et la bibliothèque d'effets ; ici, seulement ce qui est propre au client.
   Effets du plan : hydre-q, visages, trajet, q-fil, tapuscrit, trois-lecteurs, pile, enveloppe, cous, servante (data-effet). */
import { demarrer, boucle, etat, versObjet, quand } from './socle/index.js?v=2';

const gsap = window.gsap;
const ST = window.ScrollTrigger;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const borne = (v, a, b) => Math.min(b, Math.max(a, v));
const calme = () => etat.calme || document.documentElement.classList.contains('secours');
const souris = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ---------- Le petit Q des surtitres : une forme de plus à chaque section (grille wouahou, point 4) ---------- */
function qFil() {
  const qs = $$('.q-fil');
  if (!qs.length) return;
  if (calme() || etat.arrivee === 'retour' || !('IntersectionObserver' in window)) { qs.forEach((q) => q.classList.add('vu')); return; }
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('vu'); io.unobserve(e.target); } }), { threshold: 1, rootMargin: '0px 0px -10% 0px' });
  qs.forEach((q) => io.observe(q));
}

/* ---------- Le Q aux visages (accueil) : on attrape une forme, elle s'écarte puis revient avec élan (point 1).
   Profondeur : chaque forme suit la souris à sa distance ; au défilement, le Q se défait doucement. ---------- */
const COULEURS_Q = ['217, 120, 60', '85, 122, 73', '95, 156, 143', '233, 176, 88', '153, 59, 53', '79, 32, 69'];
function qVisages() {
  const svg = $('[data-q]');
  if (!svg) return;
  const pieces = $$('.q-piece', svg), etiquette = $('[data-q-etiquette]'), legende = $$('[data-legende]');
  const noms = Object.fromEntries(legende.map((li) => [li.dataset.legende, li.querySelector('b').textContent]));
  const vb = svg.viewBox.baseVal, cx = vb.x + vb.width / 2, cy = vb.y + vb.height / 2;
  const etats = new Map(pieces.map((p, i) => {
    const im = $('image', p);
    const px = +im.getAttribute('x') + +im.getAttribute('width') / 2, py = +im.getAttribute('y') + +im.getAttribute('height') / 2;
    const n = Math.hypot(px - cx, py - cy) || 1;
    return [p, { x: 0, y: 0, px: 0, py: 0, ex: 0, ey: 0, dx: (px - cx) / n, dy: (py - cy) / n, prof: 0.5 + (i % 3) * 0.35 }];
  }));
  const bouge = new Map(pieces.map((p) => [p, $('.q-bouge', p)]));
  const appliquer = (p) => { const s = etats.get(p); bouge.get(p).setAttribute('transform', `translate(${(s.x + s.px + s.ex).toFixed(2)} ${(s.y + s.py + s.ey).toFixed(2)})`); };
  const montrer = (p, oui) => {
    p.classList.toggle('montre', oui);
    legende.forEach((li) => li.classList.toggle('vise', oui && li.dataset.legende === p.dataset.piece));
    if (etiquette) { if (oui) etiquette.textContent = noms[p.dataset.piece] || ''; etiquette.classList.toggle('visible', oui); }
  };
  const ecarter = (p) => {
    const s = etats.get(p);
    if (!gsap || calme()) return;
    gsap.killTweensOf(s, 'x,y');
    gsap.timeline({ onUpdate: () => appliquer(p) })
      .to(s, { x: s.dx * 20, y: s.dy * 20, duration: 0.35, ease: 'power3.out' })
      .to(s, { x: 0, y: 0, duration: 1.1, ease: 'elastic.out(1, 0.38)' });
  };
  pieces.forEach((p) => {
    p.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') montrer(p, true); });
    p.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse' && !p.classList.contains('saisi')) montrer(p, false); });
    p.addEventListener('focus', () => montrer(p, true));
    p.addEventListener('blur', () => montrer(p, false));
    p.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); montrer(p, true); ecarter(p); } });
  });
  if (calme() || !gsap) return;
  /* Saisie : on tire une forme hors du Q (résistance élastique), elle revient avec l'élan du lâcher.
     Au doigt : un glissement horizontal la saisit, le défilement vertical reste libre. */
  let g = null;
  const resiste = (d) => Math.sign(d) * 150 * (1 - Math.exp(-Math.abs(d) / 150));
  svg.addEventListener('pointerdown', (e) => {
    const p = e.target.closest('.q-piece');
    if (!p || (e.button && e.button !== 0)) return;
    const r = svg.getBoundingClientRect();
    g = { p, x: e.clientX, y: e.clientY, k: vb.width / Math.max(1, r.width), id: e.pointerId, decide: e.pointerType === 'mouse', hist: [] };
    if (g.decide) { svg.setPointerCapture(e.pointerId); p.classList.add('saisi'); montrer(p, true); gsap.killTweensOf(etats.get(p), 'x,y'); }
  });
  svg.addEventListener('pointermove', (e) => {
    if (!g || e.pointerId !== g.id) return;
    const dx = e.clientX - g.x, dy = e.clientY - g.y;
    if (!g.decide) {
      if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) { g = null; return; }
      if (Math.abs(dx) < 8) return;
      g.decide = true; svg.setPointerCapture(e.pointerId); g.p.classList.add('saisi'); montrer(g.p, true); gsap.killTweensOf(etats.get(g.p), 'x,y');
    }
    const s = etats.get(g.p);
    s.x = resiste(dx * g.k); s.y = resiste(dy * g.k);
    g.hist.push([performance.now(), s.x, s.y]); if (g.hist.length > 5) g.hist.shift();
    appliquer(g.p);
  });
  const lacher = (e) => {
    if (!g || e.pointerId !== g.id) return;
    const { p, hist } = g, s = etats.get(p);
    const a = hist[0], b = hist[hist.length - 1];
    const dt = a && b ? Math.max(16, b[0] - a[0]) / 1000 : 1;
    const vx = a && b ? (b[1] - a[1]) / dt : 0, vy = a && b ? (b[2] - a[2]) / dt : 0;
    p.classList.remove('saisi');
    if (!p.matches(':hover')) montrer(p, false);
    g = null;
    gsap.timeline({ onUpdate: () => appliquer(p) })
      .to(s, { x: resiste(s.x + vx * 0.08), y: resiste(s.y + vy * 0.08), duration: 0.18, ease: 'power2.out' })
      .to(s, { x: 0, y: 0, duration: 1.3, ease: 'elastic.out(1, 0.35)' });
  };
  svg.addEventListener('pointerup', lacher);
  svg.addEventListener('pointercancel', lacher);
  /* Profondeur : à la souris, chaque forme suit le pointeur à sa distance, et se stabilise dès qu'il s'arrête. */
  if (souris()) {
    const zone = svg.closest('.q-zone');
    const suivre = pieces.map((p) => {
      const s = etats.get(p);
      return { s, fx: gsap.quickTo(s, 'px', { duration: 0.8, ease: 'power3', onUpdate: () => appliquer(p) }), fy: gsap.quickTo(s, 'py', { duration: 0.8, ease: 'power3', onUpdate: () => appliquer(p) }) };
    });
    zone.addEventListener('pointermove', (e) => {
      const r = zone.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5, ny = (e.clientY - r.top) / r.height - 0.5;
      suivre.forEach((q) => { q.fx(nx * 18 * q.s.prof); q.fy(ny * 14 * q.s.prof); });
    });
    zone.addEventListener('pointerleave', () => suivre.forEach((q) => { q.fx(0); q.fy(0); }));
  }
  /* Au défilement, le Q se défait doucement : chaque forme s'écarte du centre. */
  if (ST) {
    const sec = svg.closest('section');
    ST.create({ trigger: sec, start: 'top top', end: 'bottom top', scrub: 0.4, onUpdate: (st) => {
      pieces.forEach((p) => { const s = etats.get(p); const f = st.progress * 46 * s.prof; s.ex = s.dx * f; s.ey = s.dy * f; appliquer(p); });
    } });
  }
  /* Une invitation, une fois l'ouverture finie : chaque forme s'écarte et revient, l'une après l'autre. */
  quand('pret', () => {
    if (etat.arrivee === 'retour') return;
    pieces.forEach((p, i) => gsap.delayedCall(0.5 + i * 0.12, () => ecarter(p)));
  });
}

/* ---------- Le comité : les 46 visages se regroupent par tête au défilement (recomposition), filtres ---------- */
function mur() {
  const m = $('[data-mur]');
  if (!m) return;
  const sec = m.closest('section');
  const boutons = $$('[data-mur-filtre]'), groupes = $$('[data-groupe]', m);
  boutons.forEach((b) => b.addEventListener('click', () => {
    const f = b.dataset.murFiltre;
    boutons.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    m.dataset.filtre = f;
    groupes.forEach((gr) => gr.classList.toggle('choisi', gr.dataset.groupe === f));
  }));
  if (calme() || !ST || !gsap) return;
  /* La lumière de la section glisse du violet vers l'orange des affiches du Quartier. */
  gsap.fromTo(sec, { '--bgx': '0%' }, { '--bgx': '100%', ease: 'none', scrollTrigger: { trigger: sec, start: 'top bottom', end: 'bottom top', scrub: true } });
  if (etat.arrivee === 'retour') return;
  const visages = $$('.visage', m), noms = $$('.mur-nom', m);
  /* Chaque visage part de la place d'un autre (mélange fixe), puis rejoint sa tête. Positions relatives
     (offsetLeft, offsetTop) : elles ne dépendent pas des transformations en cours. */
  const ordre = visages.map((_, i) => i);
  for (let i = ordre.length - 1, h = 7; i > 0; i--) { h = (h * 9301 + 49297) % 233280; const j = Math.floor((h / 233280) * (i + 1)); [ordre[i], ordre[j]] = [ordre[j], ordre[i]]; }
  const pos = () => visages.map((v) => [v.offsetLeft, v.offsetTop]);
  let P = pos();
  ST.addEventListener('refresh', () => { P = pos(); });
  const tl = gsap.timeline({ scrollTrigger: { trigger: m, start: 'top 92%', end: 'top 30%', scrub: 0.6, invalidateOnRefresh: true } });
  tl.fromTo(visages, { x: (i) => P[ordre[i]][0] - P[i][0], y: (i) => P[ordre[i]][1] - P[i][1], scale: 0.82 }, { x: 0, y: 0, scale: 1, ease: 'power2.inOut', duration: 1 }, 0)
    .fromTo(noms, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.08 }, 0.65);
}

/* ---------- Trois lecteurs tirés au hasard : ceux qui pourraient lire votre texte ---------- */
function troisLecteurs() {
  const bloc = $('[data-trois-lecteurs]');
  if (!bloc) return;
  let liste = [];
  try { liste = JSON.parse($('[data-lecteurs-liste]', bloc).textContent); } catch { return; }
  const imgs = $$('[data-lecteur-img]', bloc);
  const pris = new Set();
  imgs.forEach((img) => {
    let k = Math.floor(Math.random() * liste.length), essais = 0;
    while (pris.has(k) && essais++ < 20) k = Math.floor(Math.random() * liste.length);
    pris.add(k);
    img.src = `/assets/images/${liste[k]}-320.webp`;
  });
  if (!ST || calme() || !gsap || etat.arrivee === 'retour') return;
  gsap.fromTo($$('.trois-lecteur', bloc), { y: 30, rotate: (i) => [-6, 4, -3][i], opacity: 0 }, { y: 0, rotate: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'back.out(1.6)', scrollTrigger: { trigger: bloc, start: 'top 80%' } });
}

/* ---------- Typographie qui bouge : axe CASL de Recursive, de la machine à la main (point 5) ---------- */
function axes() {
  $$('[data-axes]').forEach((el) => {
    if (!el.dataset.effet) el.dataset.effet = 'axes';
    if (calme() || !ST) { el.style.setProperty('--casl', '1'); el.style.setProperty('--axe', '1'); return; }
    ST.create({ trigger: el, start: 'top 92%', end: 'top 28%', scrub: 0.4, onUpdate: (s) => { const v = s.progress.toFixed(3); el.style.setProperty('--casl', v); el.style.setProperty('--axe', v); } });
  });
}

/* ---------- Manifeste mot à mot, rature, coches ---------- */
function motAMot() {
  $$('[data-mot-a-mot]').forEach((el) => {
    if (calme() || !ST || etat.arrivee === 'retour') return;
    el.innerHTML = el.textContent.split(/(\s+)/).map((m) => (/^\s+$/.test(m) ? m : `<span class="mot">${m.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</span>`)).join('');
    const mots = $$('.mot', el);
    let dernier = -1;
    ST.create({ trigger: el, start: 'top 82%', end: 'bottom 52%', scrub: true, onUpdate: (s) => {
      const k = Math.round(s.progress * mots.length);
      if (k === dernier) return;
      mots.forEach((m, i) => m.classList.toggle('allume', i < k));
      dernier = k;
    } });
  });
}
function auPassage(selecteur, classe, seuil = 0.5) {
  const els = $$(selecteur);
  if (!els.length) return;
  if (calme() || etat.arrivee === 'retour') { els.forEach((e) => e.classList.add(classe)); return; }
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add(classe); io.unobserve(e.target); } }), { threshold: seuil });
  els.forEach((e) => io.observe(e));
}

/* ---------- Tapuscrit : l'objet que le visiteur manipule (point 1) ---------- */
function tapuscrit() {
  const t = $('[data-tapuscrit]');
  if (!t) return;
  const pages = $$('.tap-page', t), n = pages.length, num = $('[data-tap-num]');
  const st = { p: 0 };
  let anim = null, pretVu = calme() || etat.arrivee === 'retour';
  const rendre = () => {
    const courante = Math.min(n - 1, Math.round(st.p));
    pages.forEach((pg, i) => {
      const f = borne(st.p - i, 0, 1);
      pg.style.setProperty('--a', `${(f * 100).toFixed(2)}deg`);
      pg.style.setProperty('--l', f.toFixed(3));
      const enJeu = i === Math.floor(st.p) || i === Math.floor(st.p) + 1 && st.p % 1 > 0.002;
      pg.style.visibility = f > 0.985 || (!enJeu && i !== courante) ? 'hidden' : '';
      pg.inert = i !== courante;
      if (pretVu && i === courante && f < 0.15) pg.classList.add('lue');
      pg.setAttribute('aria-hidden', i === courante ? 'false' : 'true');
    });
    if (num) num.textContent = String(courante + 1);
  };
  const aller = (cible, duree = 0.7) => {
    cible = borne(cible, 0, n - 1);
    if (anim) anim.kill();
    if (calme() || !gsap) { st.p = Math.round(cible); rendre(); return; }
    anim = gsap.to(st, { p: cible, duration: duree, ease: 'power3.out', onUpdate: rendre });
  };
  rendre();
  $('[data-tap-prec]')?.addEventListener('click', () => aller(Math.round(st.p) - 1));
  $('[data-tap-suiv]')?.addEventListener('click', () => aller(Math.round(st.p) + 1));
  t.addEventListener('keydown', (e) => {
    if (['ArrowRight', 'ArrowDown', 'PageDown'].includes(e.key)) { e.preventDefault(); aller(Math.round(st.p) + 1); }
    if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); aller(Math.round(st.p) - 1); }
  });
  /* Saisie : on attrape le tapuscrit, on tourne ses pages, il garde son élan. Au doigt : glissement horizontal,
     le défilement vertical reste libre. */
  let saisie = null;
  t.addEventListener('pointerdown', (e) => {
    if (e.button && e.button !== 0) return;
    if (e.target.closest('a, button')) return;
    saisie = { x: e.clientX, y: e.clientY, p0: st.p, larg: t.offsetWidth || 300, decide: e.pointerType === 'mouse', id: e.pointerId, souris: e.pointerType === 'mouse', hist: [[performance.now(), st.p]] };
    if (saisie.decide) { t.setPointerCapture(e.pointerId); t.classList.add('saisi'); if (anim) anim.kill(); }
  });
  t.addEventListener('pointermove', (e) => {
    if (!saisie || e.pointerId !== saisie.id) return;
    const dx = e.clientX - saisie.x, dy = e.clientY - saisie.y;
    if (!saisie.decide) {
      if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) { saisie = null; return; }
      if (Math.abs(dx) < 8) return;
      saisie.decide = true; t.setPointerCapture(e.pointerId); t.classList.add('saisi'); if (anim) anim.kill();
    }
    const d = saisie.souris ? -dx - dy * 0.8 : -dx;
    st.p = borne(saisie.p0 + d / (saisie.larg * 0.75), -0.15, n - 1 + 0.15);
    saisie.hist.push([performance.now(), st.p]);
    if (saisie.hist.length > 6) saisie.hist.shift();
    rendre();
  });
  const lacher = (e) => {
    if (!saisie || e.pointerId !== saisie.id) return;
    const h = saisie.hist, a = h[0], b = h[h.length - 1];
    const v = b && a && b[0] - a[0] > 10 ? (b[1] - a[1]) / ((b[0] - a[0]) / 1000) : 0;
    t.classList.remove('saisi');
    saisie = null;
    aller(Math.round(st.p + v * 0.22), 0.6 + Math.min(0.6, Math.abs(v) * 0.08));
  };
  t.addEventListener('pointerup', lacher);
  t.addEventListener('pointercancel', lacher);
  /* Il réagit à la souris : il s'incline vers elle, et se stabilise dès qu'elle s'arrête. */
  if (gsap && !calme() && souris()) {
    const rx = gsap.quickTo(t, '--tx', { duration: 0.6, ease: 'power3', unit: 'deg' });
    const ry = gsap.quickTo(t, '--ty', { duration: 0.6, ease: 'power3', unit: 'deg' });
    t.addEventListener('pointermove', (e) => {
      const r = t.getBoundingClientRect();
      rx(borne(-((e.clientY - r.top) / r.height - 0.5) * 10, -6, 6));
      ry(borne(((e.clientX - r.left) / r.width - 0.5) * 14, -8, 8));
    });
    t.addEventListener('pointerleave', () => { rx(0); ry(0); });
  }
  /* Une invitation, une seule fois, quand il entre dans l'écran : le coin de la première page se soulève. */
  quand('pret', () => {
    pretVu = true; rendre();
    if (calme() || etat.arrivee === 'retour' || !gsap || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver((es) => {
      if (!es[0].isIntersecting) return;
      io.disconnect();
      gsap.to(st, { p: 0.32, duration: 0.55, delay: 0.3, ease: 'power2.out', yoyo: true, repeat: 1, onUpdate: rendre });
    }, { threshold: 0.7 });
    io.observe(t);
  });
}

/* ---------- Curseur vivant : une petite forme du Q qui laisse une traînée aux couleurs du logo (souris seulement) ---------- */
function curseurVivant() {
  if (calme() || !souris()) return;
  document.documentElement.classList.add('curseur-vivant');
  quand('pret', () => {
    const cv = document.createElement('canvas');
    cv.className = 'trace-vivante'; cv.setAttribute('aria-hidden', 'true'); cv.setAttribute('data-audit-ignorer', ''); cv.setAttribute('data-souris', '');
    document.body.appendChild(cv);
    const ctx = cv.getContext('2d');
    let dpr = 1, W = 0, H = 0;
    const taille = () => { dpr = Math.min(1.5, window.devicePixelRatio || 1); W = innerWidth; H = innerHeight; cv.width = W * dpr; cv.height = H * dpr; };
    taille(); window.addEventListener('resize', taille);
    const pts = [];
    window.addEventListener('pointermove', (e) => { if (e.pointerType !== 'mouse') return; pts.push({ x: e.clientX, y: e.clientY, t: performance.now() }); if (pts.length > 60) pts.shift(); }, { passive: true });
    window.addEventListener('scroll', () => { pts.length = 0; }, { passive: true });
    let vide = true;
    boucle(cv, () => {
      const now = performance.now();
      while (pts.length && now - pts[0].t > 700) pts.shift();
      if (!pts.length) { if (!vide) { ctx.clearRect(0, 0, cv.width, cv.height); vide = true; } return; }
      vide = false;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1], b = pts[i], age = (now - b.t) / 700;
        ctx.strokeStyle = `rgba(${COULEURS_Q[Math.floor(b.t / 140) % 6]}, ${(0.5 * (1 - age)).toFixed(3)})`;
        ctx.lineWidth = 2 + 4 * (1 - age);
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
    });
  });
}

/* ---------- Le trajet d'un texte : de l'e-mail à la scène (scène épinglée du métier : trier, choisir, lire) ---------- */
function trajet() {
  const sec = $('#trajet');
  if (!sec || !gsap) return;
  const etapes = $$('[data-etape]', sec);
  const marquer = (k) => etapes.forEach((e, i) => e.classList.toggle('actif', i === k));
  if (calme() || !ST) { etapes.forEach((e) => e.classList.add('actif')); return; }
  const scene = $('[data-trajet]', sec), grille = $('.tr-grille', scene);
  const textes = $$('[data-tr-texte]', scene), recu = $('.tr-texte--recu', scene), autres = textes.filter((t) => t !== recu);
  const lecteurs = $$('[data-tr-lecteur]', scene), tampons = $$('[data-tr-tampon]', scene);
  const portraits = $$('[data-tr-portrait]', scene), dates = $$('[data-tr-date]', scene);
  const libSel = $('[data-tr-selection]', scene), libRecu = $('[data-tr-recu]', scene);
  /* Le texte reçu arrive au milieu de la scène, en grand, avant de rejoindre sa place dans la sélection. */
  const vers = () => ({ x: scene.offsetWidth / 2 - (grille.offsetLeft + recu.offsetLeft + recu.offsetWidth / 2), y: scene.offsetHeight * 0.41 - (grille.offsetTop + recu.offsetTop + recu.offsetHeight / 2), s: Math.max(2.2, Math.min(3.4, (scene.offsetWidth * 0.3) / Math.max(1, recu.offsetWidth))) });
  let V = vers();
  ST.addEventListener('refresh', () => { V = vers(); });
  const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } });
  tl.fromTo(libRecu, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.35 }, 0)
    .fromTo(recu, { x: () => V.x, y: () => V.y - 90, scale: () => V.s, rotate: -10, opacity: 0 }, { x: () => V.x, y: () => V.y, scale: () => V.s, rotate: -3, opacity: 1, duration: 0.6 }, 0.15)
    .fromTo(lecteurs, { opacity: 0, y: 30, scale: 0.85 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.15 }, 1)
    .fromTo(tampons, { opacity: 0, scale: 2.6, rotate: -30 }, { opacity: 1, scale: 1, rotate: -8, duration: 0.3, ease: 'back.out(2)', stagger: 0.3 }, 2)
    .to([lecteurs, libRecu], { opacity: 0, duration: 0.3 }, 3)
    .to(recu, { x: 0, y: 0, scale: 1, rotate: 0, duration: 0.6, ease: 'power3.inOut' }, 3)
    .fromTo(autres, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.5, stagger: { each: 0.012, from: 13 } }, 3.2)
    .fromTo(libSel, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 3.6)
    .to([textes, libSel], { opacity: 0, scale: 0.85, duration: 0.4, stagger: { each: 0.006, from: 'random' } }, 4)
    .fromTo(portraits, { opacity: 0, y: 40, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1 }, 4.25)
    .fromTo(dates, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.15 }, 5)
    .to({}, { duration: 0.4 }, 5.6);
  ST.create({ trigger: sec, start: 'top top', end: 'bottom bottom', scrub: 0.5, invalidateOnRefresh: true,
    onRefresh: () => tl.invalidate(),
    onUpdate: (s) => { tl.progress(s.progress); marquer(Math.min(5, Math.floor(s.progress * 6.15))); } });
  marquer(0);
}

/* ---------- Hydre : les quatre têtes se dressent l'une après l'autre au défilement ---------- */
function tetes() {
  const cols = $$('[data-tete-col]');
  if (!cols.length || calme() || !ST || !gsap || etat.arrivee === 'retour' || window.innerWidth < 761) return;
  gsap.fromTo(cols, { y: (i) => 60 + i * 50 }, { y: 0, ease: 'power2.out', stagger: 0.1, scrollTrigger: { trigger: '[data-tetes]', start: 'top 98%', end: 'top 30%', scrub: 0.5 } });
}

/* Animations d'entrée lancées hors de la timeline de l'intro : terminées si l'on quitte la page (cache du navigateur). */
const entrees = [];
window.addEventListener('pagehide', () => entrees.forEach((g) => g.progress(1)));

/* ---------- Saison : la pile de l'ouverture, la pile des 26 à feuilleter, les filtres, les statuts ---------- */
function pileOuverture(tl, t0) {
  const traits = $$('.saison-26-pile i'), compte = $('[data-pile-compte]');
  if (!traits.length) return;
  const n = traits.length, c = { v: 0 };
  const g = gsap.timeline();
  g.fromTo(traits, { y: -140, opacity: 0, rotate: () => gsap.utils.random(-8, 8) }, { y: 0, opacity: 1, rotate: 0, duration: 0.35, ease: 'power2.in', stagger: 0.03 }, 0)
    .fromTo(c, { v: 0 }, { v: n, duration: 0.03 * n + 0.3, ease: 'none', onUpdate: () => { compte.textContent = String(Math.round(c.v)).padStart(2, '0'); } }, 0);
  entrees.push(g);
  if (tl) tl.add(g, t0); else g.delay(0.15);
}
function pileSelection() {
  const sec = $('#selection');
  if (!sec) return;
  const items = $$('.tapu', sec), num = $('[data-pile-num]', sec), total = $('[data-pile-total]', sec), vide = $('[data-pile-vide]', sec);
  const boutons = $$('[data-filtre]', sec);
  let visibles = items, c = 0, trig = null;
  const rendre = () => {
    const m = visibles.length;
    visibles.forEach((it, j) => {
      const r = j - c;
      let tr, op, vis = true;
      if (r < 0) { const f = Math.min(1, -r); tr = `translate3d(0, ${(-f * 18).toFixed(1)}%, ${(f * 120).toFixed(0)}px) rotateX(${(-f * 78).toFixed(1)}deg)`; op = borne(1 - (f - 0.25) * 2.2, 0, 1); vis = op > 0.02; }
      else { tr = `translate3d(0, ${(-r * 12).toFixed(1)}px, ${(-r * 34).toFixed(1)}px) rotate(${(r % 2 ? 1 : -1) * Math.min(r, 3) * 0.8}deg)`; op = r < 6 ? 1 : 0; vis = r < 6.5; }
      it.style.transform = tr; it.style.opacity = op.toFixed(3); it.style.zIndex = String(200 - j); it.style.visibility = vis ? '' : 'hidden';
    });
    if (num) num.textContent = String(Math.min(m, Math.round(c) + 1)).padStart(2, '0');
  };
  const filtrer = (pays, pousser = true) => {
    boutons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filtre === pays)));
    items.forEach((it) => { it.hidden = pays !== 'tous' && !it.dataset.pays.split(' ').includes(pays); it.style.cssText = it.getAttribute('style').split(';').filter((x) => x.trim().startsWith('--i')).join(';'); });
    visibles = items.filter((it) => !it.hidden);
    if (total) total.textContent = String(visibles.length).padStart(2, '0');
    vide.hidden = visibles.length > 0;
    sec.style.setProperty('--n', Math.max(2, visibles.length));
    c = 0;
    if (pousser) {
      const u = new URL(location.href);
      if (pays === 'tous') u.searchParams.delete('pays'); else u.searchParams.set('pays', pays);
      history.replaceState(history.state, '', u);
    }
    if (!calme() && ST) {
      rendre();
      ST.refresh();
      if (trig && pousser && window.scrollY > trig.start) window.scrollTo({ top: trig.start, behavior: 'auto' });
    }
  };
  boutons.forEach((b) => b.addEventListener('click', () => filtrer(b.dataset.filtre)));
  const depart = new URLSearchParams(location.search).get('pays');
  if (depart && boutons.some((b) => b.dataset.filtre === depart)) filtrer(depart, false);
  if (calme() || !ST) return;
  trig = ST.create({ trigger: sec, start: 'top top', end: 'bottom bottom', snap: { snapTo: (v) => { const m = Math.max(1, visibles.length - 1); return Math.round(v * m) / m; }, duration: { min: 0.15, max: 0.45 }, delay: 0.12, ease: 'power2.out' }, onUpdate: (s) => { c = s.progress * Math.max(0, visibles.length - 1); rendre(); } });
  const zone = $('[data-pile-zone]', sec);
  zone.addEventListener('keydown', (e) => {
    const pas = (trig.end - trig.start) / Math.max(1, visibles.length - 1);
    if (['ArrowDown', 'ArrowRight'].includes(e.key)) { e.preventDefault(); window.scrollBy({ top: pas }); }
    if (['ArrowUp', 'ArrowLeft'].includes(e.key)) { e.preventDefault(); window.scrollBy({ top: -pas }); }
  });
  rendre();
}
function statuts() {
  const jour = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris' }).format(new Date());
  $$('[data-date]').forEach((li) => {
    const s = $('[data-statut]', li);
    if (s) s.textContent = li.dataset.date < jour ? s.dataset.termine : s.dataset.avenir;
  });
}

/* ---------- Lampe et servante : une lumière qui suit le pointeur (souris), ou le défilement (doigt) ---------- */
function lampes() {
  $$('[data-lampe], [data-effet="servante"]').forEach((el) => {
    const def = el.matches('[data-lampe]') ? [62, 46] : [30, 46];
    const pos = { x: def[0], y: def[1] }, cible = { x: def[0], y: def[1] }, derive = { y: 0 };
    const poser = () => { el.style.setProperty('--lx', `${pos.x.toFixed(2)}%`); el.style.setProperty('--ly', `${(pos.y + derive.y).toFixed(2)}%`); };
    poser();
    if (calme()) return;
    if (souris()) {
      const zone = el.closest('section') || el;
      zone.addEventListener('pointermove', (e) => { const r = el.getBoundingClientRect(); cible.x = borne((e.clientX - r.left) / r.width * 100, 5, 95); cible.y = borne((e.clientY - r.top) / r.height * 100, 5, 95); });
      boucle(el, (dt) => {
        const k = Math.min(1, dt * 5);
        if (Math.abs(cible.x - pos.x) < 0.02 && Math.abs(cible.y - pos.y) < 0.02) return;
        pos.x += (cible.x - pos.x) * k; pos.y += (cible.y - pos.y) * k; poser();
      });
      if (ST) ST.create({ trigger: el, start: 'top top', end: 'bottom top', onUpdate: (s) => { derive.y = s.progress * 30; poser(); } });
    } else if (ST) {
      ST.create({ trigger: el, start: 'top bottom', end: 'bottom top', onUpdate: (s) => { pos.x = def[0] - 22 + s.progress * 44; pos.y = def[1] - 10 + s.progress * 20; poser(); } });
    }
  });
}

/* ---------- Parcours d'un texte : l'enveloppe suit la route, les étapes s'allument ---------- */
function route() {
  const sec = $('#parcours');
  if (!sec) return;
  const carte = $('.route-carte', sec), chemin = $('[data-route]', sec), env = $('[data-route-env]', sec), livres = $('[data-route-livres]', sec);
  const stations = $$('[data-station]', sec), etapes = $$('[data-etape]', sec);
  let L = 0, table = [], ech = 1, ox = 0, oy = 0;
  const mesurer = () => {
    L = chemin.getTotalLength();
    const w = carte.clientWidth, h = carte.clientHeight;
    ech = Math.min(w / 600, h / 560); ox = (w - 600 * ech) / 2; oy = (h - 560 * ech) / 2;
    table = Array.from({ length: 61 }, (_, i) => chemin.getPointAtLength((L * i) / 60));
    chemin.style.strokeDasharray = `${L} ${L}`;
    stations.forEach((s, i) => { const p = table[Math.round((i / 5) * 60)]; s.style.setProperty('--x', `${(ox + p.x * ech).toFixed(1)}px`); s.style.setProperty('--y', `${(oy + p.y * ech).toFixed(1)}px`); });
  };
  const poser = (p) => {
    chemin.style.strokeDashoffset = String(L * (1 - p));
    const f = p * 60, i = Math.min(59, Math.floor(f)), a = table[i], b = table[i + 1], k = f - i;
    if (a && b) { env.style.setProperty('--ex', `${(ox + (a.x + (b.x - a.x) * k) * ech).toFixed(1)}px`); env.style.setProperty('--ey', `${(oy + (a.y + (b.y - a.y) * k) * ech).toFixed(1)}px`); }
    const n = Math.min(5, Math.floor(p * 6.05));
    stations.forEach((s, j) => s.classList.toggle('allumee', j <= n));
    etapes.forEach((e, j) => e.classList.toggle('actif', j === n));
    livres.classList.toggle('visibles', n >= 5);
  };
  mesurer();
  if (calme() || !ST) { poser(1); etapes.forEach((e) => e.classList.add('actif')); return; }
  ST.addEventListener('refresh', mesurer);
  ST.create({ trigger: sec, start: 'top top', end: 'bottom bottom', scrub: 0.4, onUpdate: (s) => poser(s.progress) });
  poser(0);
}

/* ---------- Formulaires : étapes du dépôt, récapitulatif, enveloppe qui part (point 7) ---------- */
const MSG = { requis: 'Ce champ est à remplir.', email: 'Adresse e-mail à vérifier (exemple : nom@domaine.fr).', annee: 'Année à quatre chiffres (exemple : 2025).' };
function erreurChamp(champ, message) {
  const id = 'erreur-' + champ.id;
  let p = document.getElementById(id);
  if (!message) { if (p) p.textContent = ''; champ.removeAttribute('aria-invalid'); return; }
  if (!p) { p = document.createElement('p'); p.id = id; p.className = 'champ-erreur'; p.setAttribute('aria-live', 'polite'); champ.closest('.champ').appendChild(p); champ.setAttribute('aria-describedby', id); }
  p.textContent = message; champ.setAttribute('aria-invalid', 'true');
}
function verifierChamp(c) {
  const v = (c.value || '').trim();
  if (c.required && (c.type === 'checkbox' ? !c.checked : !v)) return MSG.requis;
  if (v && c.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return MSG.email;
  if (v && c.pattern && !new RegExp(`^${c.pattern}$`).test(v)) return MSG.annee;
  return '';
}
function envoiPhysique(form, visuel) {
  form.addEventListener('submit', () => {
    requestAnimationFrame(() => {
      if (form.querySelector('[aria-invalid="true"]')) return;
      const r = visuel.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) visuel.scrollIntoView({ behavior: calme() ? 'auto' : 'smooth', block: 'center' });
      visuel.classList.add('envoye');
    });
  });
}
function depot() {
  const form = $('[data-etapes-form]');
  if (form) {
    const etapes = $$('[data-etape-form]', form), fil = $$('.etapes-fil li', form), recap = $('[data-recap]', form);
    let k = 0;
    const montrer = (i) => {
      etapes.forEach((e, j) => { e.hidden = j !== i; });
      fil.forEach((f, j) => f.classList.toggle('actif', j <= i));
      k = i;
      if (i === 2) {
        const v = (n) => form.elements[n]?.value || '';
        recap.innerHTML = '';
        [['Nom', v('nom')], ['E-mail', v('email')], ['Pays', v('pays')], ['Titre', v('titre')], ['Année', v('annee')]].forEach(([d, t]) => { const dt = document.createElement('dt'); dt.textContent = d; const dd = document.createElement('dd'); dd.textContent = t; recap.append(dt, dd); });
      }
      const leg = $('legend', etapes[i]); leg.tabIndex = -1; leg.focus({ preventScroll: true });
      if (gsap && !calme()) gsap.fromTo(etapes[i], { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', clearProps: 'transform,opacity' });
      if (window.ScrollTrigger) ST.refresh();
    };
    form.addEventListener('click', (e) => {
      if (e.target.closest('[data-etape-suivante]')) {
        const champs = $$('input, select, textarea', etapes[k]);
        let premier = null;
        champs.forEach((c) => { const m = verifierChamp(c); erreurChamp(c, m); if (m && !premier) premier = c; });
        if (premier) { premier.focus(); return; }
        montrer(Math.min(2, k + 1));
      }
      if (e.target.closest('[data-etape-precedente]')) montrer(Math.max(0, k - 1));
    });
    envoiPhysique(form, $('.depot-visuel'));
  }
  const lettre = $('[data-form-lettre]');
  if (lettre) envoiPhysique(lettre, $('.ecrire-visuel'));
}

/* ---------- Hydre : les quatre cous, le dessin qui monte au défilement ---------- */
function cous(tl, t0) {
  const c = $$('[data-cou]'), tetes = $$('[data-tete]'), noms = $$('[data-tete-nom]');
  if (!c.length) return;
  const g = gsap.timeline();
  g.fromTo(c, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut', stagger: 0.12 }, 0)
    .fromTo(tetes, { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.4, ease: 'back.out(3)', stagger: 0.12 }, 0.75)
    .fromTo(noms, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 }, 0.9);
  entrees.push(g);
  if (tl) tl.add(g, t0); else g.delay(0.1);
}

/* ---------- Entrée des pages (intro et voile) ---------- */
function entree(tl, t0) {
  const lignes = $$('.ouv-ligne');
  if (lignes.length) tl.fromTo(lignes, { yPercent: 108, opacity: 1 }, { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }, t0);
  const autres = $$('.ouv [data-anime="gsap"]:not(.ouv-ligne)');
  if (autres.length) tl.fromTo(autres, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out' }, t0 + 0.15);
  const cachet = $('.lettre-cachet');
  if (cachet) tl.fromTo(cachet, { scale: 2.4, opacity: 0, rotate: -40 }, { scale: 1, opacity: 1, rotate: -14, duration: 0.35, ease: 'back.out(2)' }, t0 + 0.4);
}

demarrer({
  preparer() {
    if (!gsap) return;
    /* États de départ des scènes animées par le projet (pas en mode calme ni au retour : état final direct). */
    if (!calme() && etat.arrivee !== 'retour') {
      const poser = (s, v) => { if ($(s)) gsap.set(s, v); };
      poser('[data-cou]', { strokeDashoffset: 1 });
      poser('[data-tete]', { scale: 0, transformOrigin: '50% 50%' });
      poser('[data-tete-nom]', { opacity: 0 });
      poser('.saison-26-pile i', { opacity: 0, y: -140 });
    }
    qFil(); axes(); motAMot();
    auPassage('[data-coches]', 'vu', 0.4);
    qVisages(); mur(); trajet(); troisLecteurs();
    tapuscrit(); curseurVivant(); pileSelection(); statuts(); lampes(); route(); depot();
    tetes();
    /* Au défilement : le dessin de l'Hydre et le « 26 » s'éloignent. */
    if (ST && !calme()) {
      ['.hydre-dessin', '.saison-26'].forEach((s) => { if ($(s)) gsap.to(s, { yPercent: -18, ease: 'none', scrollTrigger: { trigger: $(s).closest('section'), start: 'top top', end: 'bottom top', scrub: true } }); });
    }
  },
  /* Intro (moins de 3 s) : les six formes du logo arrivent de six côtés et forment le Q, le nom apparaît,
     puis le Q file jusqu'à l'objet d'ouverture de la page (à l'accueil, le Q fait de visages : il s'y pose exactement)
     et l'écran s'ouvre depuis lui (versObjet). Les effets longs partent hors de la timeline (tl.call). */
  jouer() {
    if (!gsap) return null;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    const dirs = [[-150, -20], [-10, -150], [150, -90], [170, 20], [-110, 140], [110, 150]];
    tl.fromTo('.oq-piece', { opacity: 0, x: (i) => dirs[i][0], y: (i) => dirs[i][1], rotate: (i) => (i % 2 ? 26 : -26), scale: 0.55 },
      { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1, duration: 0.7, stagger: 0.07, ease: 'back.out(1.5)' }, 0.08)
      .fromTo('.ouverture-mot', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.05 }, 0.5)
      .to('.ouverture-nom, .ouverture-ligne', { opacity: 0, duration: 0.25 }, 1.25);
    versObjet(tl, { a: 1.35, duree: 0.55, ouverture: 0.7, echelleMax: 4 });
    entree(tl, 1.9);
    tl.call(() => { pileOuverture(null); cous(null); }, null, 1.95);
    return tl;
  },
  etatFinal() {
    if (!gsap) return;
    const effacer = (s, v) => { if ($(s)) gsap.set(s, v); };
    effacer('.ouv-ligne, .ouv [data-anime="gsap"], .lettre-cachet', { clearProps: 'transform,opacity' });
    effacer('[data-cou]', { strokeDashoffset: 0 });
    effacer('[data-tete]', { clearProps: 'transform' });
    effacer('[data-tete-nom], .saison-26-pile i', { clearProps: 'opacity,transform' });
  },
  arrivee() {
    if (!gsap) return;
    const tl = gsap.timeline();
    entree(tl, 0.12);
    pileOuverture(null); cous(null);
  },
});
