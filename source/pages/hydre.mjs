/* L'Hydre de Lerne : la page aubergine. Ouverture où quatre cous partent d'Ivry vers quatre têtes qui sont
   des visages du comité, chacune à la couleur de son pays ; le manifeste signé de Laëtitia Ajanohun ; les quatre
   comités en visages ; comment l'Hydre choisit (quatre traits qui se rejoignent) ; la vie du Quartier ; partenaires. */
import { html } from '../../outils/gabarit.mjs';
import { quatreVisages } from './appel.mjs';

export const page = { cle: 'hydre', fichier: 'hydre', theme: 'bleu', imagePartage: 'site/q/composition.webp' };

/* Têtes de l'Hydre : position en % de la boîte du dessin (x, y), depuis le corps à Ivry (50 %, 96 %).
   Chaque tête est un visage publié du comité de ce pays. */
const TETES = [[12, 34], [35, 20], [65, 20], [88, 34]];
const VISAGES = { france: 'site/lecteurs/france-09', belgique: 'site/lecteurs/belgique-08', cameroun: 'site/lecteurs/cameroun-06', canada: 'site/lecteurs/canada-02' };
const R = 40;

export default (c) => {
  const comites = c.donnees.comites;
  const lecteurs = c.donnees.lecteurs.lecteurs;
  const couleurs = Object.fromEntries(c.donnees.logo.pieces.map((p) => [p.cle, p.couleur]));
  const cou = ([x, y], i) => `M300,384 C300,${250 - i * 12} ${x * 6},${y * 4 + 170} ${x * 6},${y * 4}`;
  return html`
<section class="ouv ouv-hydre ecran" id="debut">
  <div class="hydre-ouv conteneur">
    <div class="hydre-dessin" data-iris-centre data-effet="cous" data-visuel aria-hidden="true">
      <svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid meet">
        <defs>${TETES.map(([x, y], i) => html`<clipPath id="tete-${i}"><circle cx="${x * 6}" cy="${y * 4}" r="${R}"/></clipPath>`)}</defs>
        ${TETES.map((t, i) => html`<path class="cou" data-cou d="${cou(t, i)}" pathLength="1" style="--c:${couleurs[comites[i].cle]}"/>`)}
        ${TETES.map(([x, y], i) => html`<g class="tete" data-tete style="--c:${couleurs[comites[i].cle]}"><circle class="tete-anneau" cx="${x * 6}" cy="${y * 4}" r="${R + 6}"/><image href="/assets/images/${VISAGES[comites[i].cle]}-160.webp" x="${x * 6 - R}" y="${y * 4 - R}" width="${R * 2}" height="${R * 2}" clip-path="url(#tete-${i})" preserveAspectRatio="xMidYMid slice"/></g>`)}
        <circle class="corps" cx="300" cy="384" r="7"/>
      </svg>
      ${TETES.map(([x, y], i) => html`<span class="tete-nom" data-tete-nom style="--x:${x}%;--y:${((y * 4 - R - 10) / 4).toFixed(1)}%;--c:${couleurs[comites[i].cle]}">${comites[i].pays}</span>`)}
      <span class="tete-nom tete-nom--ivry" style="--x:50%;--y:96%">${c.t('hydre.hero.ivry')}</span>
    </div>
    <p class="surtitre" data-anime="gsap">${c.t('hydre.hero.surtitre')}</p>
    <h1 class="ouv-titre"><span class="ligne-masque"><span class="ouv-ligne" data-anime="gsap">${c.t('hydre.hero.titre')}</span></span></h1>
    <p class="ouv-intro masque-ecran-bas" data-anime="gsap">${c.t('hydre.hero.texte')}</p>
    <p class="ouv-actions" data-anime="gsap">
      <a class="bouton" href="#manifeste" data-action-principale data-survol="magnetique">${c.t('hydre.hero.action')}</a>
      <span class="ouv-info" data-info-cle>${c.t('hydre.hero.info')}</span>
    </p>
  </div>
</section>

<section class="marais" id="manifeste" aria-labelledby="manifeste-h">
  <div class="conteneur marais-grille">
  <div class="marais-texte">
    <p class="surtitre">${c.t('hydre.manifeste.surtitre')}</p>
    <h2 id="manifeste-h" class="titre-axes" data-axes data-grille="typo">${c.t('hydre.manifeste.titre')}</h2>
    <blockquote class="citation citation--grande" data-anime><p>${c.t('hydre.manifeste.citation')}</p><footer>${c.t('hydre.manifeste.source')}</footer></blockquote>
    <p class="manifeste-texte">${c.t('hydre.manifeste.texte')}</p>
  </div>
  <figure class="marais-peinture">
    ${c.media({ nom: 'site/akakpo-peche', alt: c.s('hydre.manifeste.peintureAlt'), classe: 'peinture', sizes: '(max-width: 760px) 80vw, 443px', ratio: '443 / 448', attrs: 'data-anime="rideau"' })}
    <figcaption class="credit">${c.t('hydre.manifeste.peintureCredit')}</figcaption>
  </figure>
  </div>
</section>

<section class="tetes" id="comites" aria-labelledby="comites-h">
  <div class="conteneur">
    <p class="surtitre">${c.t('hydre.tetes.surtitre')}</p>
    <h2 id="comites-h" data-anime="lignes">${c.t('hydre.tetes.titre')}</h2>
    <p class="tetes-intro">${c.t('hydre.tetes.texte')}</p>
    <ul class="tetes-liste" data-tetes data-effet="tetes" data-visuel>
      ${comites.map((x, i) => html`<li class="tete-col" style="--c:${couleurs[x.cle]};--i:${i}" data-tete-col>
        <h3><span class="tete-pastille" aria-hidden="true"></span>QD2A ${x.pays}</h3>
        <p class="tete-depuis">${[x.ville, x.depuis].filter(Boolean).join(' · ')}</p>
        <ul class="tete-visages" aria-label="${c.s('hydre.tetes.membres', { pays: x.pays })}">${lecteurs.filter((l) => l.pays === x.cle).map((l) => html`<li><img src="/assets/images/${l.image}-160.webp" alt="" width="160" height="160" loading="lazy" decoding="async"></li>`)}</ul>
      </li>`)}
    </ul>
    <p class="tetes-note">${c.t('hydre.tetes.affiche')}</p>
  </div>
</section>

<section class="choix" id="fonctionnement" aria-labelledby="choix-h">
  <div class="conteneur choix-grille">
    <div class="choix-schema" data-visuel aria-hidden="true">
      <svg viewBox="0 0 400 300" data-fx="trace">
        ${[40, 140, 260, 360].map((x) => html`<path d="M${x} 30 C ${x} 140, 200 140, 200 250" fill="none"/>`)}
        <circle cx="200" cy="262" r="12"/>
      </svg>
      <span class="choix-4">${c.t('hydre.choix.quatre')}</span><span class="choix-1">${c.t('hydre.choix.un')}</span>
    </div>
    <div>
      <p class="surtitre">${c.t('hydre.choix.surtitre')}</p>
      <h2 id="choix-h" data-anime="lignes">${c.t('hydre.choix.titre')}</h2>
      <div class="choix-cols" data-anime="cascade">
        <div><h3>${c.t('hydre.choix.communT')}</h3><p>${c.t('hydre.choix.commun')}</p></div>
        <div><h3>${c.t('hydre.choix.singT')}</h3><p>${c.t('hydre.choix.sing')}</p></div>
      </div>
    </div>
  </div>
</section>

<section class="vie" id="vie" aria-labelledby="vie-h">
  <div class="conteneur vie-grille">
    <div>
      <p class="surtitre">${c.t('hydre.coordination.surtitre')}</p>
      <h2 id="vie-h" class="titre-axes" data-axes>${c.t('hydre.coordination.titre')}</h2>
      <p data-anime="mots">${c.t('hydre.coordination.texte')}</p>
    </div>
    ${c.media({ nom: 'site/vie-quartier', alt: c.s('hydre.coordination.alt'), cadrage: '54% 42%', classe: 'vie-photo', sizes: '(max-width: 760px) 100vw, 50vw', attrs: 'data-fx="zoom"' })}
  </div>
  <div class="conteneur partenaires-bande">
    <h3>${c.t('hydre.partenaires.titre')}</h3>
    <ul data-anime="cascade">${c.donnees.partenaires.map((p) => html`<li><a href="${p.url}" target="_blank" rel="noopener" aria-label="${p.nom} ${c.s('commun.nouvelOnglet')}">${c.media({ nom: p.logo, alt: '', classe: 'bande-logo', sizes: '120px' })}<span>${p.nom}</span></a></li>`)}</ul>
  </div>
</section>

<section class="fin" id="fin" aria-labelledby="fin-h">
  <div class="conteneur fin-grille">
    ${quatreVisages(c, 'data-fx="vitesse"')}
    <h2 id="fin-h" data-anime="lignes">${c.t('hydre.fin.titre')}</h2>
    <p data-anime>${c.t('hydre.fin.texte')}</p>
    <p data-anime>${c.lien('appel', { ancre: 'deposer', classe: 'bouton', texte: c.t('hydre.fin.action'), attrs: 'data-survol="magnetique"' })}</p>
  </div>
</section>
`;
};
