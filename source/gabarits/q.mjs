/* Le Q du Quartier (v2) : les six formes de couleur du logo et la lettre, vectorisées depuis le logo du client
   (outils/vectoriser-logo.py, donnees/logo.json). Elles servent à trois endroits :
   - symboles (une fois par page) : les tracés, réutilisés par <use> ;
   - qIntro : le logo de l'intro, formes en aplats, qui se pose sur l'objet d'ouverture de la page ;
   - qFil : le petit Q des surtitres, qui se reconstitue forme par forme au fil des sections (grille, point 4) ;
   - qVisages (accueil) : le grand Q dont chaque forme est remplie des vrais visages de son comité. */
import { html, brut } from '../../outils/gabarit.mjs';

export const symboles = (logo) => html`<svg class="q-defs" width="0" height="0" aria-hidden="true" focusable="false"><defs>
${logo.pieces.map((p) => brut(`<path id="q-p-${p.cle}" d="${p.d}"/>`))}
${brut(`<path id="q-lettre" d="${logo.q}" fill-rule="evenodd"/>`)}
</defs></svg>`;

export const qIntro = (logo) => html`<svg class="ouverture-q" viewBox="${logo.viewBox}" data-ouverture-objet aria-hidden="true" focusable="false">
${logo.pieces.map((p, i) => brut(`<use href="#q-p-${p.cle}" class="oq-piece" style="--i:${i}" fill="${p.couleur}"/>`))}
${brut('<use href="#q-lettre" class="oq-lettre"/>')}
</svg>`;

/* k : rang de la section dans la page ; les formes 0 à k sont en couleur, la forme k arrive quand la section entre. */
export const qFil = (logo, k) => brut(`<svg class="q-fil" viewBox="${logo.viewBox}" data-grille="fil" data-effet="q-fil" style="--k:${k}" aria-hidden="true" focusable="false">`
  + logo.pieces.map((p, i) => `<use href="#q-p-${p.cle}" class="q-fil-p${i < Math.min(k, 6) ? ' est-pose' : ''}${i === k ? ' q-fil-nouvelle' : ''}" fill="${p.couleur}"/>`).join('')
  + '<use href="#q-lettre" class="q-fil-l"/></svg>');

/* Grand Q de l'accueil : chaque forme est un bouton (clavier : Entrée l'écarte), remplie d'une mosaïque de visages
   (outils/mosaiques-q.py), sous un voile de sa couleur qui s'efface quand on la touche. */
export const qVisages = (c, logo) => {
  const cadre = (p) => { const [x0, y0, x1, y1] = p.bbox; return { x: x0 - 3, y: y0 - 3, w: x1 - x0 + 6, h: y1 - y0 + 6 }; };
  return html`<svg class="q" viewBox="${logo.viewBox}" data-q data-iris-centre data-grille="manipuler" data-effet="hydre-q" data-souris role="group" aria-label="${c.s('accueil.hero.q')}">
  <defs>${logo.pieces.map((p) => brut(`<clipPath id="qc-${p.cle}"><use href="#q-p-${p.cle}"/></clipPath>`))}</defs>
  ${logo.pieces.map((p, i) => {
    const r = cadre(p);
    return brut(`<g class="q-piece" data-piece="${p.cle}" style="--c:${p.couleur};--i:${i}" tabindex="0" role="button" aria-label="${c.s(`accueil.hero.${p.cle}`)} : ${c.s('accueil.hero.ecarter')}"><g class="q-bouge"><g clip-path="url(#qc-${p.cle})"><image href="/assets/images/site/q/${p.cle}.webp?v=${c.v}" x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" preserveAspectRatio="none"/><rect class="q-voile" x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" fill="${p.couleur}"/></g><use href="#q-p-${p.cle}" class="q-contour"/>${p.cle === 'canada' ? `<rect class="q-prise" x="${r.x}" y="${r.y}" width="${r.w + 22}" height="${r.h}" fill="transparent"/>` : ''}</g></g>`);
  })}
  <use href="#q-lettre" class="q-lettre"/>
</svg>`;
};
