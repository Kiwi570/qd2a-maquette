/* Accueil du QD2A, v2 « Les visages du Q » (plan magazine).
   Ouverture : le Q du logo fait des vrais visages des quatre comités, de la lauréate et des coups de cœur ; on en
   attrape les formes (objet manipulé, objet d'ouverture de l'intro).
   Puis : le comité en 46 visages qui se regroupent par tête (recomposition) ; le trajet d'un texte, de l'e-mail à la
   scène (scène épinglée du métier : trier) ; la Une de la saison avec le tapuscrit de Chronologies à feuilleter ;
   le manifeste ; l'appel à textes et les trois lecteurs qui vous liront ; les partenaires. */
import { html, brut } from '../../outils/gabarit.mjs';
import { qVisages } from '../gabarits/q.mjs';

export const page = { cle: 'accueil', fichier: 'index', imagePartage: 'site/q/composition.webp' };

const ANNOT = ["<path d=\"M30 38 C 90 41, 150 36, 196 40\" pathLength=\"1\"/><path d=\"M168 150 L176 160 L192 140\" pathLength=\"1\"/>", "<path d=\"M14 64 L14 112\" pathLength=\"1\"/><path d=\"M8 70 L20 70\" pathLength=\"1\"/><path d=\"M60 120 C 110 124, 160 118, 200 122\" pathLength=\"1\"/>", "<path d=\"M10 70 L12 98 M11 106 L11 108\" pathLength=\"1\"/><path d=\"M40 112 C 100 116, 150 110, 196 114\" pathLength=\"1\"/>", "<path d=\"M150 40 C 175 30, 205 45, 190 62 C 178 74, 150 70, 152 54\" pathLength=\"1\"/><path d=\"M30 100 C 80 104, 130 98, 170 102\" pathLength=\"1\"/>", "<path d=\"M20 120 L28 130 L44 108\" pathLength=\"1\"/><path d=\"M60 54 C 110 58, 160 52, 200 56\" pathLength=\"1\"/>", "<path d=\"M150 150 C 165 135, 195 140, 196 158 C 197 176, 160 180, 152 166\" pathLength=\"1\"/><path d=\"M30 90 L36 98 L50 80\" pathLength=\"1\"/>"];
const DATES = { '2026-06-03': ['3', 'juin'], '2026-06-06': ['6', 'juin'], '2026-06-12': ['12', 'juin'] };
const COMITES = ['france', 'belgique', 'cameroun', 'canada'];
const LECTEURS_TRAJET = ['site/lecteurs/france-09', 'site/lecteurs/cameroun-06', 'site/lecteurs/belgique-08'];

export default (c) => {
  const s = c.donnees.saison, L = s.laureat, sel = c.donnees.selection, logo = c.donnees.logo;
  const couleur = Object.fromEntries(logo.pieces.map((p) => [p.cle, p.couleur]));
  const lecteurs = c.donnees.lecteurs.lecteurs;
  const parPays = (pays) => lecteurs.filter((x) => x.pays === pays);
  const COUPS_IMG = { Boukan: 'site/nicolas', 'SP 98': 'site/okbi', Clipping: 'site/nzila', 'Sans retour': 'site/porcher-jouve' };
  const cinq = [{ titre: L.titre, auteur: L.autrice, image: 'site/mazunya-portrait', laureate: true }, ...s.coups.map((x) => ({ titre: x.titre, auteur: x.auteur, image: COUPS_IMG[x.titre] }))];
  const pages = [
    html`<p class="tap-sur">${c.t('accueil.hero2.p1sur')}</p><p class="tap-grand">${L.titre}</p><p class="tap-auteur">${L.autrice}</p><p class="tap-pays">${L.pays}</p><span class="tap-tampon">${c.t('accueil.hero2.tampon')}</span>`,
    html`<p class="tap-tete">${c.t('accueil.hero2.p2titre')}</p><ul class="tap-liste">${L.personnages.map((p) => html`<li><b>${p.nom.toUpperCase()}</b>, ${p.desc}.</li>`)}</ul>`,
    html`<p class="tap-tete">${c.t('accueil.hero2.p3titre')}</p><p>${c.t('accueil.hero2.p3texte')}</p>`,
    html`<p class="tap-tete">${c.t('accueil.hero2.p4titre')}</p><p>${c.t('accueil.hero2.p4texte')}</p>`,
    html`<p class="tap-tete">${c.t('accueil.hero2.p5titre')}</p><p>${c.t('accueil.hero2.p5texte')}</p><p class="tap-fiches"><span>1</span><span>2</span><span>3</span></p>`,
    html`<p class="tap-tete">${c.t('accueil.hero2.p6titre')}</p><ul class="tap-liste">${s.lectures.map((l) => html`<li><b>${DATES[l.date].join(' ')} 2026</b> · ${l.comite}</li>`)}</ul><p class="tap-fin">${c.t('accueil.hero2.p6fin')}</p>`,
  ];
  return html`
<section class="ouv ouv-accueil ecran" id="debut">
  <div class="ouv-grille conteneur">
    <div class="ouv-texte">
      <p class="surtitre masque-ecran-tres-bas" data-anime="gsap">${c.t('accueil.hero.surtitre')}</p>
      <h1 class="ouv-titre"><span class="ligne-masque"><span class="ouv-ligne" data-anime="gsap">${c.t('accueil.hero.l1')}</span></span> <span class="ligne-masque"><span class="ouv-ligne" data-anime="gsap">${c.t('accueil.hero.l2')}</span></span> <span class="ligne-masque"><span class="ouv-ligne" data-anime="gsap">${c.t('accueil.hero.l3')}</span></span></h1>
      <p class="ouv-intro masque-ecran-bas" data-anime="gsap">${c.t('accueil.hero.texte')}</p>
      <p class="ouv-actions" data-anime="gsap" data-masque-barre>
        ${c.lien('appel', { ancre: 'deposer', classe: 'bouton', texte: c.t('accueil.hero.action'), attrs: 'data-action-principale data-survol="magnetique"' })}
        <span class="ouv-info" data-info-cle><span class="pastille" aria-hidden="true"></span>${c.t('accueil.hero.info')}</span>
      </p>
    </div>
    <div class="q-zone">
      ${qVisages(c, logo)}
      <p class="q-etiquette" data-q-etiquette aria-hidden="true"></p>
      <ul class="q-legende" data-anime="gsap">
        ${logo.pieces.map((p) => html`<li style="--c:${p.couleur}" data-legende="${p.cle}"><b>${c.t(`accueil.hero.${p.cle}`)}</b> <span>${c.t(`accueil.hero.${p.cle}D`)}</span></li>`)}
      </ul>
      <p class="q-consigne masque-ecran-bas"><span class="souris-seulement">${c.t('accueil.hero.consigne')}</span><span class="tactile-seulement">${c.t('accueil.hero.consigneTactile')}</span></p>
    </div>
  </div>
</section>

<section class="lecteurs" id="comite" aria-labelledby="lecteurs-h">
  <div class="conteneur lecteurs-grille">
    <div class="lecteurs-texte">
      <p class="surtitre">${c.t('accueil.lecteurs.surtitre')}</p>
      <h2 id="lecteurs-h" class="titre-axes" data-axes data-grille="typo">${c.t('accueil.lecteurs.titre')}</h2>
      <p>${c.t('accueil.lecteurs.texte')}</p>
      <div class="mur-filtres" role="group" aria-label="${c.s('accueil.lecteurs.filtres')}" data-mur-filtres>
        <button type="button" class="mur-filtre" data-mur-filtre="tous" aria-pressed="true">${c.t('accueil.lecteurs.tous')}</button>
        ${COMITES.map((k) => html`<button type="button" class="mur-filtre" data-mur-filtre="${k}" aria-pressed="false" style="--c:${couleur[k]}"><span class="filtre-pastille" aria-hidden="true"></span>${c.t(`accueil.lecteurs.${k}`)}</button>`)}
      </div>
      <p class="lecteurs-note">${c.t('accueil.lecteurs.note')}</p>
      <p>${c.lien('hydre', { ancre: 'comites', classe: 'lien-fleche', texte: c.t('accueil.lecteurs.lien') })}</p>
    </div>
    <div class="mur" data-mur data-effet="visages" data-visuel>
      ${COMITES.map((k) => html`<div class="mur-groupe mur-groupe--${k}" data-groupe="${k}" style="--c:${couleur[k]}" role="group" aria-label="${c.s('accueil.lecteurs.groupe', { pays: c.s(`accueil.lecteurs.${k}`) })}">
        <p class="mur-nom"><b>${c.t(`accueil.lecteurs.${k}`)}</b> <span>${c.t(`accueil.lecteurs.lieu${k[0].toUpperCase() + k.slice(1)}`)}</span></p>
        <ul class="mur-visages">${parPays(k).map((x) => html`<li class="visage"><img src="/assets/images/${x.image}-160.webp" srcset="/assets/images/${x.image}-160.webp 160w, /assets/images/${x.image}-320.webp 320w" sizes="72px" alt="" width="160" height="160" loading="lazy" decoding="async"></li>`)}</ul>
      </div>`)}
    </div>
  </div>
</section>

<section class="trajet" id="trajet" data-scene data-grille="scene" data-entete-cache aria-labelledby="trajet-h">
  <div class="trajet-cadre" data-collant>
    <div class="trajet-texte conteneur-gauche">
      <p class="surtitre">${c.t('accueil.trajet.surtitre')}</p>
      <h2 id="trajet-h" class="titre-axes" data-axes>${c.t('accueil.trajet.titre')}</h2>
      <ol class="trajet-etapes" data-etapes>
        ${[1, 2, 3, 4, 5, 6].map((n) => html`<li class="trajet-etape" data-etape="${n - 1}"><span class="trajet-num">${n}</span><span><b>${c.t(`accueil.trajet.e${n}t`)}</b> <span class="trajet-desc">${c.t(`accueil.trajet.e${n}`)}</span></span></li>`)}
      </ol>
    </div>
    <div class="scene-trajet" data-effet="trajet" data-visuel data-trajet role="img" aria-label="${c.s('accueil.trajet.region')}">
      <div class="tr-grille" aria-hidden="true">
        ${sel.textes.map((t, i) => html`<span class="tr-texte${i === 13 ? ' tr-texte--recu' : ''}" data-tr-texte="${i}"><i></i><i></i><i></i></span>`)}
      </div>
      <span class="tr-libelle tr-libelle--selection" data-tr-selection aria-hidden="true">${c.t('accueil.trajet.selection')}</span>
      <div class="tr-mail" data-tr-recu aria-hidden="true">
        <p><b>${c.t('accueil.trajet.mailA')}</b> ${c.site.contact.email}</p>
        <p><b>${c.t('accueil.trajet.mailObjet')}</b> ${c.t('accueil.trajet.mailObjetTexte')}</p>
        <p><b>${c.t('accueil.trajet.mailPj')}</b> ${c.t('accueil.trajet.mailPjTexte')}</p>
      </div>
      ${LECTEURS_TRAJET.map((img, i) => html`<div class="tr-lecteur tr-lecteur--${i}" data-tr-lecteur="${i}" aria-hidden="true">
        <img src="/assets/images/${img}-160.webp" alt="" width="160" height="160" loading="lazy" decoding="async">
        <span class="tr-fiche"><b>${c.t('accueil.trajet.fiche')}</b> ${c.t('accueil.trajet.lecteur', { n: i + 1 })}${i < 2 ? html`<em class="tr-tampon" data-tr-tampon>${c.t('accueil.trajet.favorable')}</em>` : ''}</span>
      </div>`)}
      <div class="tr-cinq" aria-hidden="true">
        ${cinq.map((x, i) => html`<figure class="tr-portrait${x.laureate ? ' tr-portrait--laureate' : ''}" data-tr-portrait="${i}">
          <span class="tr-titre-texte">${x.titre}</span>
          <figcaption><b>${x.auteur}</b><span>${x.laureate ? c.t('accueil.trajet.laureate') : c.t('accueil.trajet.coup')}</span></figcaption>
        </figure>`)}
      </div>
      <ol class="tr-dates" aria-hidden="true">
        ${s.lectures.map((l, i) => html`<li class="tr-date" data-tr-date="${i}" style="--c:${couleur[['france', 'cameroun', 'belgique'][i]]}"><b>${DATES[l.date][0]}</b><span>${DATES[l.date][1]} 2026</span><em>${l.comite}</em></li>`)}
      </ol>
    </div>
  </div>
</section>

<section class="une" id="saison" aria-labelledby="une-h">
  <div class="conteneur une-grille">
    <figure class="une-portrait">
      ${c.media({ nom: 'site/mazunya', alt: c.s('accueil.saison.alt'), cadrage: '50% 30%', classe: 'une-photo', sizes: '(max-width: 760px) 80vw, 30vw', ratio: '3 / 4', attrs: 'data-fx="parallaxe" data-fx-force="6"' })}
      <figcaption class="credit">${L.credit}</figcaption>
    </figure>
    <div class="une-texte">
      <p class="surtitre">${c.t('accueil.saison.surtitre')}</p>
      <h2 id="une-h" class="une-titre titre-axes" data-axes>${c.t('accueil.saison.titre')}</h2>
      <p class="une-autrice">${L.autrice} · ${L.pays}</p>
      <p>${c.t('accueil.saison.texte')}</p>
      <h3 class="une-sous">${c.t('accueil.saison.distinctions')}</h3>
      <ul class="liste-puces" data-anime="cascade">${L.distinctions.map((d) => html`<li>${d}</li>`)}</ul>
      <p>${c.lien('saison', { classe: 'lien-fleche', texte: c.t('accueil.saison.lien') })}</p>
    </div>
    <div class="tap-zone">
      <div class="tapuscrit" data-tapuscrit data-effet="tapuscrit" data-souris tabindex="0" role="region" aria-roledescription="${c.s('accueil.hero2.region')}" aria-label="${c.s('accueil.hero2.region')}">
        <div class="tap-epaisseur" aria-hidden="true"></div>
        ${pages.map((contenu, i) => html`<article class="tap-page" style="--n:${i}" data-tap-page="${i}"${i ? brut(' aria-hidden="true"') : ''}><div class="tap-recto">${contenu}<span class="tap-folio">${i + 1}</span><svg class="tap-annot" viewBox="0 0 210 297" preserveAspectRatio="none" aria-hidden="true">${brut(ANNOT[i] || '')}</svg></div><div class="tap-verso" data-face="dos" aria-hidden="true"></div></article>`)}
        <span class="tap-agrafe" aria-hidden="true"></span>
      </div>
      <div class="tap-commandes">
        <button type="button" class="rond" data-tap-prec aria-label="${c.s('accueil.hero2.precedente')}"><span aria-hidden="true">←</span></button>
        <p class="tap-compteur" aria-live="polite"><b data-tap-num>1</b> / ${pages.length}</p>
        <button type="button" class="rond" data-tap-suiv aria-label="${c.s('accueil.hero2.suivante')}"><span aria-hidden="true">→</span></button>
        <p class="tap-consigne masque-ecran-bas"><span class="souris-seulement">${c.t('accueil.saison.consigne')}</span><span class="tactile-seulement">${c.t('accueil.saison.consigneTactile')}</span></p>
      </div>
    </div>
  </div>
  <div class="conteneur une-coups">
    <h3>${c.t('accueil.saison.coupsTitre')}</h3>
    <ul class="coups-ligne" data-anime="cascade">
      ${s.coups.map((x) => html`<li class="coup-carte">
        ${c.media({ nom: COUPS_IMG[x.titre], alt: c.s('saison.coups.alt', { nom: x.auteur }), classe: 'coup-carte-photo', sizes: '(max-width: 760px) 44vw, 16vw', ratio: '4 / 5', cadrage: '50% 30%' })}
        <p class="coup-comites">${x.comites.map((k) => { const cle = k.split(' ')[0].toLowerCase(); return html`<span class="tag-${cle}" style="--c:${couleur[cle] || couleur.coups}">${k}</span>`; })}</p>
        <h4>${c.lien('saison', { ancre: 'coups-de-coeur', texte: x.titre })}</h4>
        <p>${x.auteur} · ${x.pays}</p>
      </li>`)}
    </ul>
  </div>
</section>

<section class="manifeste" id="manifeste" aria-labelledby="manifeste-h">
  <div class="conteneur manifeste-grille">
    <div class="manifeste-texte-col">
      <p class="surtitre">${c.t('accueil.hydre.surtitre')}</p>
      <h2 id="manifeste-h" class="manifeste-titre"><span class="manifeste-avant">${c.t('accueil.hydre.titreDebut')}</span> <span class="manifeste-hydre" data-axes data-grille="typo" data-wonk>${c.t('accueil.hydre.titreFin')}</span></h2>
      <p class="manifeste-texte" data-mot-a-mot data-effet="mot-a-mot">${c.t('accueil.hydre.texte')}</p>
      <blockquote class="citation"><p>${c.t('accueil.hydre.citation')}</p><footer>${c.t('accueil.hydre.signature')}</footer></blockquote>
      <p>${c.lien('hydre', { classe: 'bouton bouton--contour', texte: c.t('accueil.hydre.lien'), attrs: 'data-survol="magnetique"' })}</p>
    </div>
    <figure class="manifeste-peinture">
      ${c.media({ nom: 'site/akakpo-comite', alt: c.s('accueil.hydre.peintureAlt'), classe: 'peinture', sizes: '(max-width: 760px) 80vw, 30vw', ratio: '1 / 1', attrs: 'data-fx="parallaxe" data-fx-force="6"' })}
      <figcaption class="credit">${c.t('accueil.hydre.peintureCredit')}</figcaption>
    </figure>
  </div>
</section>

<section class="appel-accueil" id="appel" aria-labelledby="appel-h">
  <div class="conteneur appel-grille">
    <div class="appel-texte">
      <p class="surtitre">${c.t('accueil.appel.surtitre')}</p>
      <h2 id="appel-h" class="titre-axes" data-axes>${c.t('accueil.appel.titre')}</h2>
      <p>${c.t('accueil.appel.texte')}</p>
      <ul class="conditions" data-anime="cascade">
        ${[1, 2, 3, 4].map((n) => html`<li style="--c:${couleur[COMITES[n - 1]]}">${c.t(`accueil.appel.c${n}`)}</li>`)}
      </ul>
      <p class="appel-actions">
        <a class="bouton" href="mailto:${c.site.contact.email}?subject=${encodeURIComponent(c.s('accueil.appel.mailSujet'))}" data-survol="magnetique">${c.t('accueil.appel.mail')}</a>
        ${c.lien('appel', { ancre: 'deposer', classe: 'bouton bouton--contour', texte: c.t('accueil.appel.deposer') })}
        <a class="lien-fleche" href="${c.site.contact.fiche}" target="_blank" rel="noopener" aria-label="${c.s('commun.fiche')} ${c.s('commun.nouvelOnglet')}">${c.t('commun.fiche')}</a>
      </p>
    </div>
    <div class="trois-lecteurs" data-trois-lecteurs data-effet="trois-lecteurs" data-visuel>
      <p class="trois-titre">${c.t('accueil.appel.lecteursTitre')}</p>
      <ul>
        ${[0, 1, 2].map((i) => html`<li class="trois-lecteur" style="--i:${i}"><img src="/assets/images/${lecteurs[[3, 22, 40][i]].image}-320.webp" alt="${c.s('accueil.appel.lecteurAlt')}" width="320" height="320" loading="lazy" decoding="async" data-lecteur-img><span>${c.t('accueil.trajet.lecteur', { n: i + 1 })}</span></li>`)}
      </ul>
      <p class="trois-note">${c.t('accueil.appel.lecteursNote')}</p>
      <script type="application/json" data-lecteurs-liste>${brut(JSON.stringify(lecteurs.map((x) => x.image)))}</script>
    </div>
  </div>
</section>

<section class="partenaires" id="partenaires" aria-labelledby="partenaires-h">
  <div class="conteneur partenaires-ligne">
    <h2 id="partenaires-h" class="partenaires-titre">${c.t('accueil.partenaires.titre')}</h2>
    <ul class="logos" data-anime="cascade">
      ${c.donnees.partenaires.map((p) => html`<li><a href="${p.url}" target="_blank" rel="noopener" aria-label="${c.s('accueil.partenaires.visiter')} ${p.nom} ${c.s('commun.nouvelOnglet')}">${c.media({ nom: p.logo, alt: c.s('commun.logo', { nom: p.nom }), classe: 'logo-partenaire', sizes: '140px' })}</a></li>`)}
    </ul>
  </div>
</section>
`;
};
