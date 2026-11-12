/* L'appel à textes (v4) : la page des autrices et des auteurs, sur le crème du site.
   Ouverture : « Votre texte sera lu par trois d'entre eux », trois vrais visages du comité tirés au sort,
   qu'on peut tirer de nouveau (objet manipulable) ; les quatre cachets ; les six étapes en liste fixe et les
   livres déjà édités ; la fiche de lecture ; l'envoi réel par e-mail, avec la fiche (aucun formulaire factice). */
import { html, brut } from '../../outils/gabarit.mjs';

export const page = { cle: 'appel', fichier: 'appel-a-textes', imagePartage: 'site/q/composition.webp' };

const COULEURS = ['#d9783c', '#5f9c8f', '#557a49', '#e9b058', '#993b35', '#4f2045'];
const LIVRES = [['site/couv-nombril', 'C’est là que mon nombril est enterré'], ['site/couv-loin-des-hommes', 'Loin des hommes'], ['site/couv-saison-2020', 'Tranzit, Un oiseau à l’aube, Césariennes sous nos tropiques (saison 2020-2021)']];

/* Quatre visages, un par comité, bordés de la couleur du comité (fins de page, bandeau du contact). */
const QUATRE = [['site/lecteurs/france-09', '#d9783c'], ['site/lecteurs/belgique-08', '#5f9c8f'], ['site/lecteurs/cameroun-06', '#557a49'], ['site/lecteurs/canada-02', '#e9b058']];
export const quatreVisages = (c, attrs = '') => html`<ul class="quatre-visages" data-visuel aria-label="${c.s('commun.quatreVisages')}"${brut(attrs ? ' ' + attrs : '')}>${QUATRE.map(([img, couleur], i) => html`<li style="--c:${couleur};--i:${i}"><img src="/assets/images/${img}-160.webp" alt="" width="160" height="160" loading="lazy" decoding="async"></li>`)}</ul>`;

/* Trois lecteurs tirés au sort : bloc partagé avec l'accueil. */
export const troisLecteurs = (c, { titre, note, tirer = '', grand = false, attrs = '' }) => {
  const vrais = c.donnees.lecteurs.lecteurs.filter((x) => !x.affiche);
  return html`<div class="trois-lecteurs${grand ? ' trois-lecteurs--grand' : ''}" data-trois-lecteurs data-effet="trois-lecteurs" data-visuel${brut(attrs ? ' ' + attrs : '')}>
  <p class="trois-titre">${titre}</p>
  <ul>
    ${[0, 1, 2].map((i) => html`<li class="trois-lecteur" style="--i:${i}"><img src="/assets/images/${vrais[[3, 22, 36][i]].image}-320.webp" alt="${c.s('appel.hero.lecteurAlt')}" width="320" height="320"${grand ? '' : brut(' loading="lazy"')} decoding="async" data-lecteur-img><span>${c.t('appel.hero.lecteur', { n: i + 1 })}</span></li>`)}
  </ul>
  ${tirer ? html`<p class="trois-actions"><button type="button" class="bouton bouton--contour" data-tirer data-grille="manipuler">${tirer}</button></p>` : ''}
  <p class="trois-note">${note}</p>
  <script type="application/json" data-lecteurs-liste>${brut(JSON.stringify(vrais.map((x) => x.image)))}</script>
</div>`;
};

export default (c) => {
  const mail = `mailto:${c.site.contact.email}?subject=${encodeURIComponent(c.s('commun.mailSujet'))}`;
  return html`
<section class="ouv ouv-appel ecran" id="debut">
  <div class="appel-ouv conteneur">
    <div class="ouv-texte">
      <p class="surtitre masque-ecran-tres-bas" data-anime="gsap">${c.t('appel.hero.surtitre')}</p>
      <h1 class="ouv-titre"><span class="ligne-masque"><span class="ouv-ligne" data-anime="gsap">${c.t('appel.hero.titre')}</span></span></h1>
      <p class="ouv-intro" data-anime="gsap">${c.t('appel.hero.texte')}</p>
      <p class="ouv-actions" data-anime="gsap">
        <a class="bouton" href="#deposer" data-action-principale data-survol="magnetique">${c.t('appel.hero.action')}</a>
        <span class="ouv-info" data-info-cle><span class="pastille" aria-hidden="true"></span>${c.t('appel.hero.info')}</span>
      </p>
      <p class="ouv-lien masque-ecran-tres-bas" data-anime="gsap"><a class="lien-fleche" href="${c.site.contact.fiche}" target="_blank" rel="noopener" aria-label="${c.s('commun.fiche')} ${c.s('commun.nouvelOnglet')}">${c.t('commun.fiche')}</a></p>
    </div>
    ${troisLecteurs(c, { titre: c.t('appel.hero.lecteurs'), note: c.t('appel.hero.lecteursNote'), tirer: c.t('appel.hero.tirer'), grand: true, attrs: 'data-iris-centre' })}
  </div>
</section>

<section class="cachets" id="conditions" aria-labelledby="conditions-h">
  <div class="conteneur">
    <p class="surtitre">${c.t('appel.conditions.surtitre')}</p>
    <h2 id="conditions-h" class="titre-axes" data-axes data-grille="typo">${c.t('appel.conditions.titre')}</h2>
    <ul class="cachets-liste" data-anime="cascade">
      ${[1, 2, 3, 4].map((n) => html`<li class="cachet-carte" style="--c:${COULEURS[n - 1]}">
        <span class="cachet" data-visuel aria-hidden="true"><svg viewBox="0 0 120 120" data-audit-ignorer><defs><path id="cercle-${n}" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0"/></defs><circle cx="60" cy="60" r="56"/><circle cx="60" cy="60" r="34"/><text><textPath href="#cercle-${n}">${c.t('appel.conditions.cachet')}</textPath></text></svg><b>${n}</b></span>
        <h3>${c.t(`appel.conditions.c${n}t`)}</h3>
        <p>${c.t(`appel.conditions.c${n}`)}</p>
      </li>`)}
    </ul>
  </div>
</section>

<section class="etapes-texte" id="parcours" aria-labelledby="parcours-h">
  <div class="conteneur">
    <p class="surtitre">${c.t('appel.parcours.surtitre')}</p>
    <h2 id="parcours-h" data-anime="lignes">${c.t('appel.parcours.titre')}</h2>
    <ol class="six-etapes" data-anime="cascade">
      ${[1, 2, 3, 4, 5, 6].map((n) => html`<li style="--c:${COULEURS[n - 1]}"><span class="six-num" aria-hidden="true">${n}</span><h3>${c.t(`appel.parcours.e${n}t`)}</h3><p>${c.t(`appel.parcours.e${n}`)}</p></li>`)}
    </ol>
    <div class="livres">
      <p class="livres-titre">${c.t('appel.parcours.livres')}</p>
      <ul class="livres-liste" data-anime="cascade">
        ${LIVRES.map(([n, t]) => html`<li>${c.media({ nom: n, alt: c.s('appel.parcours.livresAlt', { titre: t }), classe: 'livre', sizes: '(max-width: 760px) 28vw, 200px', attrs: 'data-fx="vitesse"' })}</li>`)}
      </ul>
    </div>
  </div>
</section>

<section class="fiche" id="fiche" aria-labelledby="fiche-h">
  <div class="conteneur fiche-grille">
    <p class="fiche-chiffre" data-anime data-visuel><span>${c.t('appel.retour.environ')}</span> <strong>200</strong> <span>${c.t('appel.retour.parSaison')}</span></p>
    <div>
      <p class="surtitre">${c.t('appel.retour.surtitre')}</p>
      <h2 id="fiche-h" class="titre-axes" data-axes>${c.t('appel.retour.titre')}</h2>
      <p>${c.t('appel.retour.texte')}</p>
      <p class="fiche-plus">${c.t('appel.retour.plus')}</p>
    </div>
  </div>
</section>

<section class="depot" id="deposer" aria-labelledby="deposer-h">
  <div class="conteneur depot-grille">
    <div class="depot-texte">
      <p class="surtitre">${c.t('appel.depot.surtitre')}</p>
      <h2 id="deposer-h" data-anime="lignes">${c.t('appel.depot.titre')}</h2>
      <p>${c.t('appel.depot.texte')}</p>
      <figure class="mail-apercu" data-visuel>
        <dl>
          <dt>${c.t('appel.depot.apercu.a')}</dt><dd>${c.site.contact.email}</dd>
          <dt>${c.t('appel.depot.apercu.objet')}</dt><dd>${c.t('commun.mailSujet')}</dd>
          <dt>${c.t('appel.depot.apercu.pj')}</dt><dd><span class="pj">${c.t('appel.depot.apercu.texte')}</span> <span class="pj">${c.t('appel.depot.apercu.fiche')}</span></dd>
        </dl>
        <figcaption>${c.t('appel.depot.apercu.legende')}</figcaption>
      </figure>
    </div>
    <div class="depot-envoi">
      <ol class="depot-etapes" data-anime="cascade">
        <li><span class="six-num" aria-hidden="true">1</span><div><h3>${c.t('appel.depot.e1t')}</h3><p>${c.t('appel.depot.e1')}</p><p><a class="lien-fleche" href="${c.site.contact.fiche}" target="_blank" rel="noopener" aria-label="${c.s('commun.fiche')} ${c.s('commun.nouvelOnglet')}">${c.t('commun.fiche')}</a></p></div></li>
        <li><span class="six-num" aria-hidden="true">2</span><div><h3>${c.t('appel.depot.e2t')}</h3><p>${c.t('appel.depot.e2')}</p></div></li>
        <li><span class="six-num" aria-hidden="true">3</span><div><h3>${c.t('appel.depot.e3t')}</h3><p>${c.t('appel.depot.e3')}</p><p class="depot-adresse"><a href="${mail}">${c.site.contact.email}</a></p></div></li>
      </ol>
      <p class="depot-action"><a class="bouton bouton--grand" href="${mail}" data-survol="magnetique">${c.t('appel.depot.action')}</a></p>
      <p class="depot-note">${c.t('appel.depot.ouvre')}</p>
    </div>
  </div>
</section>
`;
};
