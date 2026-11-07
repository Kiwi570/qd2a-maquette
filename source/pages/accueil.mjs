/* Accueil du QD2A, direction « Le Tapuscrit ».
   Ouverture : le tapuscrit lauréat à feuilleter (objet manipulé, objet d'ouverture de l'intro).
   Puis : les 26 titres en bandeaux géants, la table de lecture en 3D (scène du métier), le carrousel 3D de la saison,
   le plateau qui s'ouvre en plein écran, le manifeste (rature), l'appel à textes (titre tapé), les partenaires. */
import { html, brut } from '../../outils/gabarit.mjs';

export const page = { cle: 'accueil', fichier: 'index', imagePartage: 'grok/g-accueil-ouverture-1168.webp' };

const ANNOT = ["<path d=\"M30 38 C 90 41, 150 36, 196 40\" pathLength=\"1\"/><path d=\"M168 150 L176 160 L192 140\" pathLength=\"1\"/>", "<path d=\"M14 64 L14 112\" pathLength=\"1\"/><path d=\"M8 70 L20 70\" pathLength=\"1\"/><path d=\"M60 120 C 110 124, 160 118, 200 122\" pathLength=\"1\"/>", "<path d=\"M10 70 L12 98 M11 106 L11 108\" pathLength=\"1\"/><path d=\"M40 112 C 100 116, 150 110, 196 114\" pathLength=\"1\"/>", "<path d=\"M150 40 C 175 30, 205 45, 190 62 C 178 74, 150 70, 152 54\" pathLength=\"1\"/><path d=\"M30 100 C 80 104, 130 98, 170 102\" pathLength=\"1\"/>", "<path d=\"M20 120 L28 130 L44 108\" pathLength=\"1\"/><path d=\"M60 54 C 110 58, 160 52, 200 56\" pathLength=\"1\"/>", "<path d=\"M150 150 C 165 135, 195 140, 196 158 C 197 176, 160 180, 152 166\" pathLength=\"1\"/><path d=\"M30 90 L36 98 L50 80\" pathLength=\"1\"/>"];
const DATES = { '2026-06-03': '3 juin 2026', '2026-06-06': '6 juin 2026', '2026-06-12': '12 juin 2026' };

export default (c) => {
  const s = c.donnees.saison, L = s.laureat, sel = c.donnees.selection;
  const titres = sel.textes.map((t) => t.titre);
  const moitie = Math.ceil(titres.length / 2);
  const carrousel = [
    { titre: L.titre, auteur: L.autrice, pays: L.pays, image: 'site/mazunya-portrait', etiquette: c.s('accueil.saison.laureate'), comites: [], laureat: true },
    ...s.coups.map((x) => ({ ...x, etiquette: c.s('accueil.saison.coup') })),
  ];
  const pages = [
    html`<p class="tap-sur">${c.t('accueil.hero.p1sur')}</p><p class="tap-grand">${L.titre}</p><p class="tap-auteur">${L.autrice}</p><p class="tap-pays">${L.pays}</p><span class="tap-tampon">${c.t('accueil.hero.tampon')}</span>`,
    html`<p class="tap-tete">${c.t('accueil.hero.p2titre')}</p><ul class="tap-liste">${L.personnages.map((p) => html`<li><b>${p.nom.toUpperCase()}</b>, ${p.desc}.</li>`)}</ul>`,
    html`<p class="tap-tete">${c.t('accueil.hero.p3titre')}</p><p>${c.t('accueil.hero.p3texte')}</p>`,
    html`<p class="tap-tete">${c.t('accueil.hero.p4titre')}</p><p>${c.t('accueil.hero.p4texte')}</p>`,
    html`<p class="tap-tete">${c.t('accueil.hero.p5titre')}</p><p>${c.t('accueil.hero.p5texte')}</p><p class="tap-fiches"><span>1</span><span>2</span><span>3</span></p>`,
    html`<p class="tap-tete">${c.t('accueil.hero.p6titre')}</p><ul class="tap-liste">${s.lectures.map((l) => html`<li><b>${DATES[l.date]}</b> · ${l.comite}</li>`)}</ul><p class="tap-fin">${c.t('accueil.hero.p6fin')} · ${c.lien('saison', { ancre: 'laureat', texte: c.t('accueil.hero.p1lien') })}</p>`,
  ];
  return html`
<section class="ouv ouv-accueil ecran" id="debut">
  ${c.media({ nom: 'grok/g-accueil-ouverture', alt: c.s('accueil.hero.alt'), cadrage: '70% 50%', cadrageMobile: '50% 60%', priorite: true, classe: 'ouv-fond', sizes: '100vw', attrs: 'data-fx="parallaxe" data-fx-force="6"' })}
  <div class="ouv-grille conteneur">
    <div class="ouv-texte">
      <p class="surtitre masque-ecran-tres-bas" data-anime="gsap">${c.t('accueil.hero.surtitre')}</p>
      <h1 class="ouv-titre"><span class="ligne-masque"><span class="ouv-ligne" data-anime="gsap">${c.t('accueil.hero.l1')}</span></span> <span class="ligne-masque"><span class="ouv-ligne" data-anime="gsap">${c.t('accueil.hero.l2')}</span></span> <span class="ligne-masque"><span class="ouv-ligne" data-anime="gsap">${c.t('accueil.hero.l3')}</span></span></h1>
      <p class="ouv-intro masque-ecran-bas" data-anime="gsap">${c.t('accueil.hero.texte')}</p>
      <p class="ouv-actions" data-anime="gsap">
        ${c.lien('appel', { ancre: 'deposer', classe: 'bouton', texte: c.t('accueil.hero.action'), attrs: 'data-action-principale data-survol="magnetique"' })}
        <span class="ouv-info" data-info-cle><span class="pastille" aria-hidden="true"></span>${c.t('accueil.hero.info')}</span>
      </p>
    </div>
    <div class="tap-zone" data-anime="gsap">
      <div class="tapuscrit" data-tapuscrit data-iris-centre data-grille="manipuler" data-effet="tapuscrit" data-souris tabindex="0" role="region" aria-roledescription="${c.s('accueil.hero.region')}" aria-label="${c.s('accueil.hero.region')}">
        <div class="tap-epaisseur" aria-hidden="true"></div>
        ${pages.map((contenu, i) => html`<article class="tap-page" style="--n:${i}" data-tap-page="${i}"${i ? brut(' aria-hidden="true"') : ''}><div class="tap-recto">${contenu}<span class="tap-folio">${i + 1}</span><svg class="tap-annot" viewBox="0 0 210 297" preserveAspectRatio="none" aria-hidden="true">${brut(ANNOT[i] || '')}</svg></div><div class="tap-verso" data-face="dos" aria-hidden="true"></div></article>`)}
        <span class="tap-agrafe" aria-hidden="true"></span>
      </div>
      <div class="tap-commandes">
        <button type="button" class="rond" data-tap-prec aria-label="${c.s('accueil.hero.precedente')}"><span aria-hidden="true">←</span></button>
        <p class="tap-compteur" aria-live="polite"><b data-tap-num>1</b> / ${pages.length}</p>
        <button type="button" class="rond" data-tap-suiv aria-label="${c.s('accueil.hero.suivante')}"><span aria-hidden="true">→</span></button>
        <p class="tap-consigne masque-ecran-bas"><span class="souris-seulement">${c.t('accueil.hero.consigne')}</span><span class="tactile-seulement">${c.t('accueil.hero.consigneTactile')}</span></p>
      </div>
    </div>
  </div>
</section>

<section class="titres" id="titres" aria-labelledby="titres-h">
  <h2 id="titres-h" class="visuellement-cache">${c.t('accueil.titres.titre')}</h2>
  <div class="titres-bandeau" data-fx="mots-geants" data-fx-force="30" aria-hidden="true" data-ruban data-visuel>
    <p data-fx-rangee class="titres-r1">${titres.slice(0, moitie).join('  ·  ')}  ·  ${titres.slice(0, 4).join('  ·  ')}</p>
    <p data-fx-rangee data-sens="-1" class="titres-r2">${titres.slice(moitie).join('  ·  ')}  ·  ${titres.slice(moitie, moitie + 4).join('  ·  ')}</p>
  </div>
</section>

<section class="lecture" id="lecture" data-scene data-grille="scene" data-entete-cache aria-labelledby="lecture-h">
  <div class="lecture-cadre" data-collant>
    <div class="lecture-texte conteneur-gauche">
      <p class="surtitre">${c.t('accueil.lecture.surtitre')}</p>
      <h2 id="lecture-h" class="lecture-titre axes" data-grille="typo" data-axes>${c.t('accueil.lecture.titre')}</h2>
      <ol class="lecture-etapes" data-etapes>
        ${[1, 2, 3, 4, 5].map((n) => html`<li class="lecture-etape" data-etape="${n - 1}"><span class="lecture-num">${n}</span><span><b>${c.t(`accueil.lecture.e${n}t`)}</b> ${c.t(`accueil.lecture.e${n}`)}</span></li>`)}
      </ol>
      ${c.media({ nom: 'grok/g-accueil-lecteur', alt: c.s('accueil.lecture.alt'), classe: 'lecture-photo masque-ecran-bas', sizes: '(max-width: 760px) 30vw, 14vw', ratio: '4 / 5' })}
    </div>
    <div class="lecture-scene" data-effet="fiches" data-visuel>
      <div class="table3d" data-table aria-hidden="true" data-audit-ignorer>
        <div class="table-plateau">
          <div class="t-tapuscrit" data-t-tap><span>${c.t('accueil.lecture.recu')}</span><i></i><i></i><i></i><i></i></div>
          ${[1, 2, 3].map((n) => html`<div class="t-fiche t-fiche-${n}" data-t-fiche="${n}"><b>${c.t('accueil.lecture.fiche')}</b><span>${c.t('accueil.lecture.lecteur')} ${n}</span><i></i><i></i><i></i>${n < 3 ? html`<em class="t-tampon" data-t-tampon>${c.t('accueil.lecture.favorable')}</em>` : ''}</div>`)}
          <div class="t-pile" data-t-pile><b>${c.t('accueil.lecture.pile')}</b><i></i><i></i><i></i><i></i><i></i></div>
          <em class="t-laureat" data-t-laureat>${c.t('accueil.lecture.laureat')}</em>
        </div>
      </div>
      <p class="lecture-consigne souris-seulement masque-ecran-bas">${c.t('accueil.lecture.consigne')}</p>
    </div>
  </div>
</section>

<section class="carrousel" id="saison" data-scene data-entete-cache aria-labelledby="saison-h">
  <div class="carrousel-cadre" data-collant>
    <div class="carrousel-tete conteneur">
      <div>
        <p class="surtitre">${c.t('accueil.saison.surtitre')}</p>
        <h2 id="saison-h" data-anime="lignes">${c.t('accueil.saison.titre')}</h2>
        <p class="masque-ecran-bas">${c.t('accueil.saison.texte')}</p>
      </div>
      <p class="carrousel-commandes">
        <button type="button" class="rond" data-car-prec aria-label="${c.s('accueil.saison.precedent')}"><span aria-hidden="true">←</span></button>
        <button type="button" class="rond" data-car-suiv aria-label="${c.s('accueil.saison.suivant')}"><span aria-hidden="true">→</span></button>
        ${c.lien('saison', { classe: 'lien-fleche', texte: c.t('accueil.saison.lien') })}
      </p>
    </div>
    <div class="anneau-zone" data-effet="carrousel" data-visuel>
      <div class="anneau" data-anneau role="region" aria-label="${c.s('accueil.saison.region')}" tabindex="0">
        ${carrousel.map((x, i) => html`<article class="anneau-carte${x.laureat ? ' anneau-carte--laureat' : ''}" style="--i:${i}" data-carte="${i}">
          ${c.media({ nom: x.image, alt: c.s('saison.coups.alt', { nom: x.auteur }), classe: 'anneau-photo', sizes: '(max-width: 760px) 55vw, 22vw', ratio: '4 / 5' })}
          <div class="anneau-texte">
            <p class="anneau-etiquette">${x.etiquette}${x.comites.length ? ` · ${x.comites.join(', ')}` : ''}</p>
            <h3>${c.lien('saison', { ancre: x.laureat ? 'laureat' : 'coups-de-coeur', texte: x.titre })}</h3>
            <p>${x.auteur} · ${x.pays}</p>
          </div>
        </article>`)}
      </div>
    </div>
  </div>
</section>

<section class="plein" id="lu" data-fx="plein-ecran" data-fx-longueur="240svh" aria-labelledby="lu-h">
  <div data-collant class="plein-cadre">
    ${c.media({ nom: 'grok/g-accueil-lecture', alt: c.s('accueil.plein.alt'), cadrage: '50% 55%', sizes: '100vw', attrs: 'data-fx="onde" data-fx-force="1.2"' })}
    <h2 id="lu-h" class="plein-mots"><span data-fx-ecarte="g">${c.t('accueil.plein.g')}</span> <span data-fx-ecarte="d">${c.t('accueil.plein.d')}</span></h2>
    <p class="plein-apres" data-fx-apres>${c.t('accueil.plein.apres')}</p>
  </div>
</section>

<section class="manifeste" id="manifeste" aria-labelledby="manifeste-h">
  <div class="conteneur manifeste-grille">
    <div>
      <p class="surtitre">${c.t('accueil.hydre.surtitre')}</p>
      <h2 id="manifeste-h" class="manifeste-titre" data-rature data-effet="rature">${c.t('accueil.hydre.titreDebut')} <span class="rature-avant">${c.t('accueil.hydre.avant')}<svg class="rature-trait" viewBox="0 0 300 40" preserveAspectRatio="none" aria-hidden="true"><path d="M4 26 C 60 14, 120 30, 180 18 S 260 12, 296 20" pathLength="1"/><path d="M10 14 C 80 30, 170 8, 290 28" pathLength="1"/></svg></span>. ${c.t('accueil.hydre.titreFin')} <span class="rature-apres">${c.t('accueil.hydre.apres')}.</span></h2>
      <p class="manifeste-texte" data-mot-a-mot>${c.t('accueil.hydre.texte')}</p>
      <p class="manifeste-signature">${c.t('accueil.hydre.signature')}</p>
      <p>${c.lien('hydre', { classe: 'bouton bouton--contour', texte: c.t('accueil.hydre.lien'), attrs: 'data-survol="magnetique"' })}</p>
    </div>
    <ul class="tetes-mini" data-anime="cascade" aria-label="${c.s('accueil.hydre.pays')}">
      ${c.donnees.comites.map((x) => html`<li>${c.media({ nom: x.image, alt: c.s('hydre.tetes.alt', { pays: x.pays }), classe: 'tete-mini-photo', sizes: '(max-width: 760px) 40vw, 14vw', ratio: '2 / 3', cadrage: '50% 30%' })}<span>${x.pays}</span></li>`)}
    </ul>
  </div>
</section>

<section class="appel-accueil" id="appel" aria-labelledby="appel-h">
  <div class="conteneur appel-grille">
    <div class="appel-texte">
      <p class="surtitre">${c.t('accueil.appel.surtitre')}</p>
      <h2 id="appel-h" class="frappe" data-frappe data-effet="frappe">${c.t('accueil.appel.titre')}</h2>
      <p>${c.t('accueil.appel.texte')}</p>
      <ul class="coches" data-coches>
        ${[1, 2, 3, 4].map((n) => html`<li style="--i:${n - 1}"><svg class="coche" viewBox="0 0 30 30" aria-hidden="true"><path d="M4 16 L12 24 L27 5" pathLength="1"/></svg>${c.t(`accueil.appel.c${n}`)}</li>`)}
      </ul>
      <p class="appel-actions">
        ${c.lien('appel', { ancre: 'deposer', classe: 'bouton', texte: c.t('accueil.appel.action'), attrs: 'data-survol="magnetique"' })}
        <a class="lien-fleche" href="${c.site.contact.fiche}" target="_blank" rel="noopener" aria-label="${c.s('commun.fiche')} ${c.s('commun.nouvelOnglet')}">${c.t('commun.fiche')}</a>
      </p>
    </div>
    ${c.media({ nom: 'grok/g-accueil-appel', alt: c.s('accueil.appel.alt'), cadrage: '40% 50%', classe: 'appel-photo', sizes: '(max-width: 760px) 100vw, 45vw', attrs: 'data-fx="vitesse"' })}
  </div>
</section>

<section class="partenaires" id="partenaires" aria-labelledby="partenaires-h">
  <div class="conteneur">
    <h2 id="partenaires-h" data-anime="lignes">${c.t('accueil.partenaires.titre')}</h2>
    <ul class="partenaires-liste" data-anime="cascade">
      ${c.donnees.partenaires.map((p) => html`<li class="partenaire">
        <span class="partenaire-logo">${c.media({ nom: p.logo, alt: c.s('commun.logo', { nom: p.nom }), classe: 'partenaire-img', sizes: '160px' })}</span>
        <b>${p.nom}</b><span>${p.role}<br>${p.ville}</span>
        <a href="${p.url}" target="_blank" rel="noopener" aria-label="${c.s('accueil.partenaires.visiter')} ${p.nom} ${c.s('commun.nouvelOnglet')}">${c.t('accueil.partenaires.visiter')}</a>
      </li>`)}
    </ul>
  </div>
</section>
`;
};
