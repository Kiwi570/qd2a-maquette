/* L'appel à textes : la seule page à l'encre. Ouverture scindée, lampe qui suit le pointeur sur la photo ;
   les quatre cachets ; le parcours d'un texte épinglé (l'enveloppe suit la route, les étapes s'allument) ;
   la fiche reçue ; le dépôt simulé en trois étapes, dont le retour physique est l'enveloppe tamponnée « Reçu ». */
import { html } from '../../outils/gabarit.mjs';

export const page = { cle: 'appel', fichier: 'appel-a-textes', theme: 'encre', imagePartage: 'grok/g-appel-ouverture-1168.webp' };

export const enveloppe = (c, cle, variante = '') => html`<div class="enveloppe${variante ? ` enveloppe--${variante}` : ''}" data-enveloppe aria-hidden="true">
  <div class="env-dos"></div>
  <div class="env-feuille" data-env-feuille><i></i><i></i><i></i><i></i></div>
  <div class="env-face"></div>
  <div class="env-rabat" data-env-rabat></div>
  <span class="env-tampon" data-env-tampon>${c.t(cle)}</span>
</div>`;

export default (c) => html`
<section class="ouv ouv-appel ecran" id="debut">
  <div class="appel-ouv conteneur">
    <div class="ouv-texte">
      <p class="surtitre masque-ecran-tres-bas" data-anime="gsap">${c.t('appel.hero.surtitre')}</p>
      <h1 class="ouv-titre appel-titre" data-anime="lettres">${c.t('appel.hero.titre')}</h1>
      <p class="ouv-intro masque-ecran-bas" data-anime="gsap">${c.t('appel.hero.texte')}</p>
      <p class="ouv-actions" data-anime="gsap">
        <a class="bouton" href="#deposer" data-action-principale data-survol="magnetique">${c.t('appel.hero.action')}</a>
        <span class="ouv-info" data-info-cle><span class="pastille" aria-hidden="true"></span>${c.t('appel.hero.info')}</span>
      </p>
      <p class="ouv-lien masque-ecran-tres-bas" data-anime="gsap"><a class="lien-fleche" href="${c.site.contact.fiche}" target="_blank" rel="noopener" aria-label="${c.s('commun.fiche')} ${c.s('commun.nouvelOnglet')}">${c.t('commun.fiche')}</a></p>
    </div>
    <div class="lampe" data-lampe data-iris-centre data-effet="lampe" data-souris>
      ${c.media({ nom: 'grok/g-appel-ouverture', alt: c.s('appel.hero.alt'), cadrage: '62% 55%', cadrageMobile: '55% 60%', priorite: true, classe: 'lampe-photo', sizes: '(max-width: 760px) 100vw, 50vw' })}
      <span class="lampe-ombre" aria-hidden="true"></span>
      <p class="lampe-consigne souris-seulement masque-ecran-bas">${c.t('appel.hero.lampe')}</p>
    </div>
  </div>
</section>

<section class="cachets" id="conditions" aria-labelledby="conditions-h">
  <div class="conteneur">
    <p class="surtitre">${c.t('appel.conditions.surtitre')}</p>
    <h2 id="conditions-h" class="axes" data-axes data-grille="typo">${c.t('appel.conditions.titre')}</h2>
    <ul class="cachets-liste" data-anime="cascade">
      ${[1, 2, 3, 4].map((n) => html`<li class="cachet-carte">
        <span class="cachet" data-visuel aria-hidden="true"><svg viewBox="0 0 120 120" data-audit-ignorer><defs><path id="cercle-${n}" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0"/></defs><circle cx="60" cy="60" r="56"/><circle cx="60" cy="60" r="34"/><text><textPath href="#cercle-${n}">${c.t('appel.conditions.cachet')}</textPath></text></svg><b>${n}</b></span>
        <h3>${c.t(`appel.conditions.c${n}t`)}</h3>
        <p>${c.t(`appel.conditions.c${n}`)}</p>
      </li>`)}
    </ul>
  </div>
</section>

<section class="route" id="parcours" data-scene data-grille="scene" data-entete-cache aria-labelledby="parcours-h">
  <div class="route-cadre" data-collant>
    <div class="route-texte conteneur-gauche">
      <p class="surtitre">${c.t('appel.parcours.surtitre')}</p>
      <h2 id="parcours-h">${c.t('appel.parcours.titre')}</h2>
      <ol class="route-etapes">
        ${[1, 2, 3, 4, 5, 6].map((n) => html`<li class="route-etape" data-etape="${n - 1}"><span class="route-num">${n}</span><span><b>${c.t(`appel.parcours.e${n}t`)}</b> ${c.t(`appel.parcours.e${n}`)}</span></li>`)}
      </ol>
    </div>
    <div class="route-carte" data-effet="parcours" data-visuel aria-hidden="true">
      <svg class="route-svg" viewBox="0 0 600 560" preserveAspectRatio="xMidYMid meet">
        <path class="route-fond" d="M60 500 C 180 500, 120 380, 240 380 S 420 420, 450 300 S 300 200, 380 140 S 560 120, 540 50"/>
        <path class="route-trait" data-route d="M60 500 C 180 500, 120 380, 240 380 S 420 420, 450 300 S 300 200, 380 140 S 560 120, 540 50"/>
      </svg>
      ${[0, 1, 2, 3, 4, 5].map((i) => html`<span class="route-station" data-station="${i}"><b>${i + 1}</b></span>`)}
      <span class="route-env" data-route-env><i></i></span>
      <div class="route-livres" data-route-livres>
        ${['site/couv-nombril', 'site/couv-loin-des-hommes', 'site/couv-saison-2020'].map((n) => c.media({ nom: n, alt: '', classe: 'route-livre', sizes: '90px' }))}
      </div>
    </div>
  </div>
</section>

<section class="fiche" id="fiche" aria-labelledby="fiche-h">
  <div class="conteneur fiche-grille">
    ${c.media({ nom: 'grok/g-appel-fiches', alt: c.s('appel.retour.alt'), classe: 'fiche-photo', sizes: '(max-width: 760px) 100vw, 38vw', ratio: '3 / 4', attrs: 'data-anime="rideau"' })}
    <div>
      <p class="surtitre">${c.t('appel.retour.surtitre')}</p>
      <h2 id="fiche-h" class="frappe" data-frappe data-effet="frappe">${c.t('appel.retour.titre')}</h2>
      <p data-anime="mots">${c.t('appel.retour.texte')}</p>
      <p class="fiche-chiffre" data-anime><strong data-compteur="200">200</strong> ${c.t('appel.retour.plus')}</p>
    </div>
  </div>
</section>

<section class="depot" id="deposer" aria-labelledby="deposer-h">
  <div class="conteneur depot-grille">
    <div class="depot-texte">
      <p class="surtitre">${c.t('appel.depot.surtitre')}</p>
      <h2 id="deposer-h" data-anime="lignes">${c.t('appel.depot.titre')}</h2>
      <p>${c.t('appel.depot.texte')}</p>
      <div class="depot-visuel" data-grille="retour" data-effet="enveloppe" data-fx="vitesse" data-visuel>${enveloppe(c, 'appel.depot.recu')}<p class="env-legende" data-env-legende>${c.t('appel.depot.lu')}</p></div>
    </div>
    <form class="etapes" data-formulaire data-etapes-form novalidate aria-labelledby="deposer-h">
      <p class="etapes-annonce" id="etapes-annonce">${c.t('appel.depot.etapes')}</p>
      <ol class="etapes-fil" aria-hidden="true"><li class="actif">${c.t('appel.depot.e1')}</li><li>${c.t('appel.depot.e2')}</li><li>${c.t('appel.depot.e3')}</li></ol>
      <fieldset class="etape" data-etape-form="0">
        <legend>${c.t('appel.depot.e1')}</legend>
        <div class="champ"><label for="d-nom">${c.t('appel.depot.nom')}</label><input id="d-nom" name="nom" autocomplete="name" required></div>
        <div class="champ"><label for="d-email">${c.t('appel.depot.email')}</label><input id="d-email" name="email" type="email" autocomplete="email" required></div>
        <div class="champ"><label for="d-pays">${c.t('appel.depot.pays')}</label><input id="d-pays" name="pays" autocomplete="country-name" required></div>
        <p><button type="button" class="bouton" data-etape-suivante>${c.t('appel.depot.suivant')}</button></p>
      </fieldset>
      <fieldset class="etape" data-etape-form="1" hidden>
        <legend>${c.t('appel.depot.e2')}</legend>
        <div class="champ"><label for="d-titre">${c.t('appel.depot.titreTexte')}</label><input id="d-titre" name="titre" required></div>
        <div class="champ"><label for="d-annee">${c.t('appel.depot.annee')}</label><input id="d-annee" name="annee" inputmode="numeric" pattern="[0-9]{4}" required></div>
        <div class="champ champ-fichier"><label for="d-fichier">${c.t('appel.depot.fichierTexte')}</label><input id="d-fichier" name="fichier" type="file" accept=".pdf,application/pdf"><p class="champ-aide">${c.t('appel.depot.fichierAide')}</p></div>
        <div class="champ champ-fichier"><label for="d-fiche">${c.t('appel.depot.fichierFiche')}</label><input id="d-fiche" name="fiche" type="file" accept=".pdf,application/pdf"></div>
        <div class="champ champ-case"><input id="d-fr" name="francais" type="checkbox" value="oui" required><label for="d-fr">${c.t('appel.depot.francais')}</label></div>
        <div class="champ champ-case"><input id="d-inedit" name="inedit" type="checkbox" value="oui" required><label for="d-inedit">${c.t('appel.depot.inedit')}</label></div>
        <p class="etapes-boutons"><button type="button" class="bouton bouton--contour" data-etape-precedente>${c.t('appel.depot.retour')}</button> <button type="button" class="bouton" data-etape-suivante>${c.t('appel.depot.suivant')}</button></p>
      </fieldset>
      <fieldset class="etape" data-etape-form="2" hidden>
        <legend>${c.t('appel.depot.e3')}</legend>
        <dl class="recap" data-recap></dl>
        <p class="mention-donnees">${c.t('appel.depot.donnees')}</p>
        <p class="etapes-boutons"><button type="button" class="bouton bouton--contour" data-etape-precedente>${c.t('appel.depot.retour')}</button> <button type="submit" class="bouton">${c.t('appel.depot.envoyer')}</button></p>
      </fieldset>
      <p data-message-envoi data-texte="${c.s('appel.depot.message')}" tabindex="-1" hidden></p>
    </form>
  </div>
</section>
`;
