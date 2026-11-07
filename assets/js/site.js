/* Effets propres au QD2A (direction « Le Tapuscrit »). Le socle gère l'ouverture, le voile « page », l'en-tête,
   le menu, le mode calme, les boucles et la bibliothèque d'effets ; ici, seulement ce qui est propre au client.
   Effets du plan : tapuscrit, frappe, crayon, fiches, pile, enveloppe, cous, servante (data-effet). */
import { demarrer, boucle, etat, versObjet, quand } from './socle/index.js?v=1';

const gsap = window.gsap;
const ST = window.ScrollTrigger;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const borne = (v, a, b) => Math.min(b, Math.max(a, v));
const calme = () => etat.calme || document.documentElement.classList.contains('secours');
const souris = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ---------- Crayon : fil conducteur rouge dans la marge (grille wouahou, point 4) ---------- */
function crayon() {
  const el = $('.fil');
  if (!el) return;
  const main = el.parentElement, svg = $('svg', el), trait = $('.fil-trait', el), mine = $('.fil-mine', el);
  let h = 0, w = 0, total = 0, haut = 0, vh = 0, reperes = [];
  const xDe = (y) => w / 2 + Math.sin(y / 97) * w * 0.28;
  function construire() {
    h = main.offsetHeight; w = el.clientWidth || 20; haut = main.getBoundingClientRect().top + window.scrollY; vh = window.innerHeight;
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    let d = `M${xDe(0).toFixed(1)} 0`, px = xDe(0), py = 0;
    total = 0;
    for (let y = 40; y <= h; y += 40) { const x = xDe(y); d += ` L${x.toFixed(1)} ${y}`; total += Math.hypot(x - px, y - py); px = x; py = y; }
    trait.setAttribute('d', d);
    trait.style.strokeDasharray = `${total} ${total}`;
    $$('.fil-repere', svg).forEach((r) => r.remove());
    reperes = $$(':scope > section', main).map((s, i) => {
      const y = s.offsetTop + Math.min(90, s.offsetHeight / 3), x = xDe(y), k = Math.min(1, w / 26);
      const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      p.setAttribute('class', 'fil-repere');
      p.setAttribute('d', i % 2 ? `M${x - 7 * k} ${y - 3} L${x - 2 * k} ${y + 4} L${x + 8 * k} ${y - 8}` : `M${x - 8 * k} ${y} L${x + 8 * k} ${y} M${x - 6 * k} ${y + 5} L${x + 7 * k} ${y + 5}`);
      svg.appendChild(p);
      return { p, y };
    });
    poser(window.scrollY);
  }
  function poser(scroll) {
    if (calme()) { trait.style.strokeDashoffset = '0'; reperes.forEach((r) => r.p.classList.add('est-atteint')); return; }
    const y = borne(scroll - haut + vh * 0.62, 0, h);
    trait.style.strokeDashoffset = String(total * (1 - y / Math.max(1, h)));
    mine.style.transform = `translate(${(xDe(y) - w / 2).toFixed(1)}px, ${(y - 18).toFixed(1)}px)`;
    reperes.forEach((r) => r.p.classList.toggle('est-atteint', r.y <= y));
  }
  construire();
  if (ST) {
    ST.addEventListener('refresh', construire);
    if (!calme()) ST.create({ trigger: main, start: 'top bottom', end: 'bottom top', onUpdate: (s) => poser(s.scroll()) });
  }
}

/* ---------- Typographie qui bouge : axe CASL de Recursive, de la machine à la main (point 5) ---------- */
function axes() {
  $$('[data-axes]').forEach((el) => {
    if (!el.dataset.effet) el.dataset.effet = 'axes';
    if (calme() || !ST) { el.style.setProperty('--casl', '1'); return; }
    ST.create({ trigger: el, start: 'top 92%', end: 'top 28%', scrub: 0.4, onUpdate: (s) => el.style.setProperty('--casl', s.progress.toFixed(3)) });
  });
}

/* ---------- Frappe : un titre se tape à la machine quand il entre dans l'écran ---------- */
function frappe() {
  const titres = $$('[data-frappe]');
  if (!titres.length || calme() || etat.arrivee === 'retour') return;
  titres.forEach((el) => {
    const texte = el.textContent;
    el.setAttribute('aria-label', texte);
    const mots = texte.split(/(\s+)/);
    el.innerHTML = mots.map((m) => (/^\s+$/.test(m) ? m : `<span class="frappe-mot" aria-hidden="true" style="white-space:nowrap">${[...m].map((ch) => `<span class="frappe-car">${ch.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</span>`).join('')}</span>`)).join('');
    const cars = $$('.frappe-car', el);
    const curseur = document.createElement('span');
    curseur.className = 'frappe-curseur'; curseur.setAttribute('aria-hidden', 'true');
    const io = new IntersectionObserver((es) => {
      if (!es[0].isIntersecting) return;
      io.disconnect();
      let i = 0;
      const pas = Math.max(22, Math.min(55, 1100 / cars.length));
      const taper = () => {
        if (i >= cars.length) { setTimeout(() => curseur.remove(), 1400); return; }
        cars[i].classList.add('vu');
        cars[i].after(curseur);
        i++;
        setTimeout(taper, pas + (cars[i - 1].textContent === ',' ? 120 : 0));
      };
      taper();
    }, { threshold: 0.6 });
    io.observe(el);
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
  /* Au défilement, le tapuscrit s'éloigne doucement. */
  if (ST && !calme()) gsap.to(t, { '--ty-def': '-60px', ease: 'none', scrollTrigger: { trigger: '.ouv-accueil', start: 'top top', end: 'bottom top', scrub: true } });
  /* Une invitation, une seule fois, après l'ouverture : le coin de la première page se soulève. */
  quand('pret', () => {
    pretVu = true; rendre();
    if (calme() || etat.arrivee === 'retour' || !gsap) return;
    gsap.to(st, { p: 0.32, duration: 0.55, delay: 0.6, ease: 'power2.out', yoyo: true, repeat: 1, onUpdate: rendre });
  });
}

/* ---------- Curseur crayon : une mine rouge qui laisse une trace éphémère (souris seulement) ---------- */
function curseurCrayon() {
  if (calme() || !souris()) return;
  document.documentElement.classList.add('curseur-crayon');
  quand('pret', () => {
    const cv = document.createElement('canvas');
    cv.className = 'trace-crayon'; cv.setAttribute('aria-hidden', 'true'); cv.setAttribute('data-audit-ignorer', ''); cv.setAttribute('data-souris', '');
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
        ctx.strokeStyle = `rgba(200, 50, 30, ${(0.55 * (1 - age)).toFixed(3)})`;
        ctx.lineWidth = 1.6 + 1.2 * (1 - age);
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
    });
  });
}

/* ---------- Table de lecture en 3D : trois fiches, deux tampons, la sélection, le lauréat (point 6) ---------- */
function tableDeLecture() {
  const sec = $('#lecture');
  if (!sec || !gsap) return;
  const table = $('[data-table]', sec), etapes = $$('[data-etape]', sec);
  const fiches = $$('[data-t-fiche]', sec), tampons = $$('[data-t-tampon]', sec);
  const tap = $('[data-t-tap]', sec), lau = $('[data-t-laureat]', sec), pile = $('[data-t-pile]', sec);
  const marquer = (k) => etapes.forEach((e, i) => e.classList.toggle('actif', i === k));
  if (calme() || !ST) { etapes.forEach((e) => e.classList.add('actif')); return; }
  const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } });
  tl.fromTo(tap, { y: '-140%', z: 160, rotate: -8, opacity: 0 }, { y: '0%', z: 0, rotate: 0, opacity: 1, duration: 0.8 }, 0)
    .fromTo(fiches, { x: (i) => ['-180%', '180%', '160%'][i], y: (i) => ['-60%', '-80%', '90%'][i], z: 140, rotate: (i) => [-25, 20, 14][i], opacity: 0 },
      { x: 0, y: 0, z: 0, rotate: (i) => [-6, 5, 3][i], opacity: 1, duration: 0.7, stagger: 0.28 }, 1)
    .fromTo(tampons, { scale: 2.6, opacity: 0, rotate: -30 }, { scale: 1, opacity: 1, rotate: -14, duration: 0.3, ease: 'back.out(2.2)', stagger: 0.3 }, 2.1)
    .to(tap, { left: '8%', top: '52%', rotate: -4, z: 26, duration: 0.8, ease: 'power3.inOut' }, 3)
    .to(fiches, { opacity: 0.35, duration: 0.5 }, 3.1)
    .fromTo(pile, { y: 0 }, { y: '-4%', duration: 0.4 }, 3.4)
    .fromTo(lau, { scale: 3, opacity: 0, rotate: -40 }, { scale: 1, opacity: 1, rotate: -9, duration: 0.35, ease: 'back.out(2)' }, 4.1)
    .fromTo(table, { '--rz': '-22deg' }, { '--rz': '10deg', duration: 5, ease: 'none' }, 0);
  ST.create({ trigger: sec, start: 'top top', end: 'bottom bottom', scrub: 0.5,
    onUpdate: (s) => { tl.progress(s.progress); marquer(Math.min(4, Math.floor(s.progress * 5.2))); } });
  marquer(0);
  /* La table pivote à la main, avec élan. */
  const zone = $('.lecture-scene', sec);
  const rd = { v: 0 };
  const appliquer = () => table.style.setProperty('--rd', `${rd.v.toFixed(1)}deg`);
  let g = null;
  zone.addEventListener('pointerdown', (e) => { g = { x: e.clientX, y: e.clientY, v0: rd.v, decide: e.pointerType === 'mouse', id: e.pointerId, t: performance.now(), dern: e.clientX }; if (g.decide) zone.setPointerCapture(e.pointerId); gsap.killTweensOf(rd); });
  zone.addEventListener('pointermove', (e) => {
    if (!g || e.pointerId !== g.id) return;
    const dx = e.clientX - g.x;
    if (!g.decide) { if (Math.abs(e.clientY - g.y) > 10 && Math.abs(e.clientY - g.y) > Math.abs(dx)) { g = null; return; } if (Math.abs(dx) < 8) return; g.decide = true; zone.setPointerCapture(e.pointerId); }
    rd.v = borne(g.v0 + dx * 0.35, -70, 70); g.vit = (e.clientX - g.dern) / Math.max(1, performance.now() - g.t); g.t = performance.now(); g.dern = e.clientX; appliquer();
  });
  const fin = () => { if (!g) return; const v = g.vit || 0; g = null; gsap.to(rd, { v: borne(rd.v + v * 120, -70, 70), duration: 1.1, ease: 'power3.out', onUpdate: appliquer }); };
  zone.addEventListener('pointerup', fin); zone.addEventListener('pointercancel', fin);
}

/* ---------- Carrousel 3D de la saison et tambour des comités ---------- */
function rotatif({ section, conteneur, cartes, pas, axe, prec, suiv }) {
  const sec = $(section);
  if (!sec) return;
  const anneau = $(conteneur, sec), items = $$(cartes, sec), n = items.length;
  const st = { off: 0 }, sc = { p: 0 };
  const rendre = () => {
    const rot = -sc.p * pas * (n - 1) + st.off;
    anneau.style.setProperty('--rot', `${rot.toFixed(2)}deg`);
    items.forEach((it, i) => {
      let a = ((axe === 'x' ? -i : i) * pas + rot) % 360; if (a > 180) a -= 360; if (a < -180) a += 360;
      const visible = Math.abs(a) < 88;
      it.style.visibility = visible ? '' : 'hidden';
      it.inert = Math.abs(a) > 30;
    });
  };
  if (calme() || !ST || !gsap) { items.forEach((it) => { it.inert = false; }); return; }
  const mesurer = () => {
    if (axe === 'y') { const w = anneau.offsetWidth; anneau.style.setProperty('--R', `${Math.round((w / 2) / Math.tan(Math.PI / n) * 1.55)}px`); }
  };
  mesurer();
  ST.addEventListener('refresh', mesurer);
  ST.create({ trigger: sec, start: 'top top', end: 'bottom bottom', scrub: 0.6, snap: { snapTo: 1 / (n - 1), duration: { min: 0.2, max: 0.6 }, delay: 0.15, ease: 'power2.inOut' }, onUpdate: (s) => { sc.p = s.progress; rendre(); } });
  const tourner = (k) => gsap.to(st, { off: Math.round((st.off + k * pas) / pas) * pas, duration: 0.8, ease: 'power3.out', onUpdate: rendre });
  if (prec) $(prec, sec)?.addEventListener('click', () => tourner(1));
  if (suiv) $(suiv, sec)?.addEventListener('click', () => tourner(-1));
  anneau.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') { e.preventDefault(); tourner(-1); } if (e.key === 'ArrowLeft') { e.preventDefault(); tourner(1); } });
  const zone = anneau.parentElement;
  let g = null;
  zone.addEventListener('pointerdown', (e) => { if (e.target.closest('a, button')) return; g = { x: e.clientX, y: e.clientY, o0: st.off, decide: e.pointerType === 'mouse', id: e.pointerId, t: performance.now(), dern: e.clientX, v: 0 }; if (g.decide) zone.setPointerCapture(e.pointerId); gsap.killTweensOf(st); });
  zone.addEventListener('pointermove', (e) => {
    if (!g || e.pointerId !== g.id) return;
    const dx = e.clientX - g.x;
    if (!g.decide) { if (Math.abs(e.clientY - g.y) > 10 && Math.abs(e.clientY - g.y) > Math.abs(dx)) { g = null; return; } if (Math.abs(dx) < 8) return; g.decide = true; zone.setPointerCapture(e.pointerId); }
    st.off = g.o0 + dx * 0.3; const now = performance.now(); g.v = (e.clientX - g.dern) / Math.max(1, now - g.t); g.t = now; g.dern = e.clientX; rendre();
  });
  const fin = () => { if (!g) return; const cible = Math.round((st.off + g.v * 260) / pas) * pas; g = null; gsap.to(st, { off: cible, duration: 1, ease: 'power3.out', onUpdate: rendre }); };
  zone.addEventListener('pointerup', fin); zone.addEventListener('pointercancel', fin);
  rendre();
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
    crayon(); axes(); frappe(); motAMot();
    auPassage('[data-rature]', 'rature-faite', 0.6);
    auPassage('[data-coches]', 'vu', 0.4);
    tapuscrit(); curseurCrayon(); tableDeLecture(); pileSelection(); statuts(); lampes(); route(); depot();
    rotatif({ section: '#saison', conteneur: '[data-anneau]', cartes: '.anneau-carte', pas: 72, axe: 'y', prec: '[data-car-prec]', suiv: '[data-car-suiv]' });
    rotatif({ section: '#comites', conteneur: '[data-tambour]', cartes: '.tambour-carte', pas: 90, axe: 'x' });
    /* Au défilement : le dessin de l'Hydre et le « 26 » s'éloignent. */
    if (ST && !calme()) {
      ['.hydre-dessin', '.saison-26'].forEach((s) => { if ($(s)) gsap.to(s, { yPercent: -18, ease: 'none', scrollTrigger: { trigger: $(s).closest('section'), start: 'top top', end: 'bottom top', scrub: true } }); });
    }
  },
  /* Intro (moins de 3 s) : le nom se tape à la machine, la feuille file jusqu'à l'objet d'ouverture de la page,
     puis l'écran s'ouvre depuis lui (versObjet). Les effets longs partent hors de la timeline (tl.call). */
  jouer() {
    if (!gsap) return null;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    const cars = $$('.ouverture-car');
    tl.to(cars, { opacity: 1, duration: 0.01, stagger: 0.85 / Math.max(1, cars.length) }, 0.12)
      .to('.ouverture-souligne path', { strokeDashoffset: 0, duration: 0.3, ease: 'power2.inOut' }, 1.02)
      .to('.ouverture-ligne, .ouverture-curseur', { opacity: 0, duration: 0.2 }, 1.3);
    versObjet(tl, { a: 1.4, duree: 0.5, ouverture: 0.7 });
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
