/* L'Hydre de Lerne : la page bleu encre. Ouverture plein cadre où quatre cous partent d'Ivry vers les quatre têtes ;
   le manifeste international mot à mot sur fond de marais ; les quatre comités reliés par leurs cous (carrousel
   3D au défilement) ; comment l'Hydre choisit (quatre traits qui se rejoignent) ; la vie du Quartier ; partenaires. */
import { html } from '../../outils/gabarit.mjs';

export const page = { cle: 'hydre', fichier: 'hydre', theme: 'bleu', imagePartage: 'grok/g-hydre-ouverture-1168.webp' };

/* Têtes de l'Hydre : position en % de la boîte du dessin (x, y), depuis le corps à Ivry (50 %, 96 %). */
const TETES = [[14, 22], [38, 8], [62, 8], [86, 22]];

export default (c) => {
  const comites = c.donnees.comites;
  const cou = ([x, y], i) => `M300,384 C300,${250 - i * 12} ${x * 6},${y * 4 + 170} ${x * 6},${y * 4}`;
  return html`
<section class="ouv ouv-hydre ecran" id="debut">
  ${c.media({ nom: 'grok/g-hydre-ouverture', alt: c.s('hydre.hero.alt'), cadrage: '50% 70%', priorite: true, classe: 'hydre-fond', sizes: '100vw', attrs: 'data-fx="parallaxe" data-fx-force="8"' })}
  <div class="hydre-ouv conteneur">
    <div class="hydre-dessin" data-iris-centre data-effet="cous" data-visuel aria-hidden="true">
      <svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid meet">
        ${TETES.map((t, i) => html`<path class="cou" data-cou d="${cou(t, i)}" pathLength="1"/>`)}
        ${TETES.map(([x, y]) => html`<circle class="tete" data-tete cx="${x * 6}" cy="${y * 4}" r="9"/>`)}
        <circle class="corps" cx="300" cy="384" r="7"/>
      </svg>
      ${TETES.map(([x, y], i) => html`<span class="tete-nom" data-tete-nom style="--x:${x}%;--y:${y * 1}%">${comites[i].pays}</span>`)}
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
  ${c.media({ nom: 'grok/g-hydre-marais', alt: c.s('hydre.manifeste.alt'), classe: 'marais-fond', sizes: '100vw', attrs: 'data-fx="parallaxe" data-fx-force="12"' })}
  <div class="conteneur marais-texte">
    <p class="surtitre">${c.t('hydre.manifeste.surtitre')}</p>
    <h2 id="manifeste-h" class="axes" data-axes data-grille="typo">${c.t('hydre.manifeste.titre')}</h2>
    <p class="manifeste-texte" data-mot-a-mot data-effet="mot-a-mot">${c.t('hydre.manifeste.texte')}</p>
    <blockquote class="citation" data-anime><p>${c.t('hydre.manifeste.citation')}</p><footer>${c.t('hydre.manifeste.source')}</footer></blockquote>
  </div>
</section>

<section class="tetes" id="comites" data-scene data-entete-cache aria-labelledby="comites-h">
  <div class="tetes-cadre" data-collant>
    <div class="conteneur tetes-tete">
      <p class="surtitre">${c.t('hydre.tetes.surtitre')}</p>
      <h2 id="comites-h" data-anime="lignes">${c.t('hydre.tetes.titre')}</h2>
      <p class="masque-ecran-bas">${c.t('hydre.tetes.texte')}</p>
    </div>
    <div class="tambour-zone" data-effet="tambour" data-visuel>
      <ul class="tambour" data-tambour>
        ${comites.map((x, i) => html`<li class="tambour-carte" style="--i:${i}" data-carte="${i}">
          ${c.media({ nom: x.image, alt: c.s('hydre.tetes.alt', { pays: x.pays }), classe: 'tambour-photo', sizes: '(max-width: 760px) 50vw, 20vw', ratio: '2 / 3' })}
          <div class="tambour-texte"><h3>QD2A ${x.pays}</h3><p>${x.depuis}</p></div>
        </li>`)}
      </ul>
    </div>
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
      <h2 id="vie-h" class="frappe" data-frappe data-effet="frappe">${c.t('hydre.coordination.titre')}</h2>
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
    <div class="fin-pile" data-visuel data-fx="vitesse" aria-hidden="true"><i style="--k:0"></i><i style="--k:1"></i><i style="--k:2"></i><i style="--k:3"></i></div>
    <h2 id="fin-h" data-anime="lignes">${c.t('hydre.fin.titre')}</h2>
    <p data-anime>${c.t('hydre.fin.texte')}</p>
    <p data-anime>${c.lien('appel', { ancre: 'deposer', classe: 'bouton', texte: c.t('hydre.fin.action'), attrs: 'data-survol="magnetique"' })}</p>
  </div>
</section>
`;
};
