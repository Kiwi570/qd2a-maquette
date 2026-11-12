/* Contact (v4) : ouverture compacte sur une enveloppe adressée au Quartier (le cachet se pose) ;
   quatre objets qui ouvrent la messagerie avec l'adresse et l'objet remplis (aucun formulaire factice) ;
   l'adresse, avec la vraie façade de la Manufacture des Œillets : le comité n'a pas de lieu ouvert au public ;
   bandeau prune vers l'appel. */
import { html } from '../../outils/gabarit.mjs';
import { quatreVisages } from './appel.mjs';

export const page = { cle: 'contact', fichier: 'contact', imagePartage: 'site/q/composition.webp' };

const OBJETS = [['texte', '#d9783c'], ['lecture', '#5f9c8f'], ['partenariat', '#557a49'], ['autre', '#e9b058']];

export default (c) => {
  const mail = (sujet) => `mailto:${c.site.contact.email}?subject=${encodeURIComponent(sujet)}`;
  return html`
<section class="ouv ouv-contact" id="debut">
  <div class="conteneur contact-ouv">
    <div class="ouv-texte">
      <p class="surtitre masque-ecran-tres-bas" data-anime="gsap">${c.t('contact.hero.surtitre')}</p>
      <h1 class="ouv-titre"><span class="ligne-masque"><span class="ouv-ligne" data-anime="gsap">${c.t('contact.hero.titre')}</span></span></h1>
      <p class="ouv-intro masque-ecran-tres-bas" data-anime="gsap">${c.t('contact.hero.texte')}</p>
      <p class="ouv-actions" data-anime="gsap"><a class="bouton" href="${mail(c.s('contact.hero.sujet'))}" data-action-principale data-survol="magnetique">${c.t('contact.hero.action')}</a> <a class="ouv-info ouv-mail" href="mailto:${c.site.contact.email}" data-info-cle>${c.t('contact.hero.mail')}</a></p>
    </div>
    <div class="lettre" data-iris-centre data-effet="lettre" data-visuel>
      <p class="lettre-a" aria-hidden="true">${c.t('contact.hero.enveloppe')}</p>
      <p class="lettre-mail" aria-hidden="true">${c.site.contact.email}</p>
      <p class="lettre-adresse" aria-hidden="true">${c.site.contact.adresse}</p>
      <span class="lettre-timbre" aria-hidden="true"><img src="/assets/images/logo.png" alt="" width="48" height="48"></span>
      <span class="lettre-cachet" aria-hidden="true">Ivry · 94</span>
    </div>
  </div>
</section>

<section class="objets" id="objets" aria-labelledby="objets-h">
  <div class="conteneur">
    <h2 id="objets-h" class="titre-axes" data-axes data-grille="typo">${c.t('contact.objets.titre')}</h2>
    <p>${c.t('contact.objets.texte')}</p>
    <ul class="objets-liste" data-anime="cascade" data-visuel>
      ${OBJETS.map(([k, couleur]) => html`<li style="--c:${couleur}">${k === 'texte'
        ? c.lien('appel', { ancre: 'deposer', classe: 'objet', texte: html`<b>${c.t('contact.objets.texteT')}</b><span>${c.t('contact.objets.texteD')}</span>` })
        : html`<a class="objet" href="${mail(c.s(`contact.objets.${k}S`))}"><b>${c.t(`contact.objets.${k}T`)}</b><span>${c.t(`contact.objets.${k}D`)}</span></a>`}</li>`)}
    </ul>
  </div>
</section>

<section class="lieu" id="lieu" aria-labelledby="lieu-h">
  <div class="conteneur lieu-grille">
    <div>
      <h2 id="lieu-h" data-anime="lignes">${c.t('contact.lieu.titre')}</h2>
      <p>${c.t('contact.lieu.texte')}</p>
      <p class="lieu-adresse"><b>${c.site.contact.lieu}</b><br>${c.site.contact.adresse}<br><a href="mailto:${c.site.contact.email}">${c.site.contact.email}</a></p>
      <p><a class="lien-fleche" href="${c.site.contact.facebook}" target="_blank" rel="noopener" aria-label="${c.s('commun.facebook')} ${c.s('commun.nouvelOnglet')}">${c.t('commun.facebook')}</a></p>
    </div>
    <figure class="facade">
      ${c.media({ nom: 'site/facade-tqi', alt: c.s('contact.lieu.facadeAlt'), classe: 'facade-photo', sizes: '(max-width: 760px) 100vw, 719px', attrs: 'data-anime="rideau"' })}
      <figcaption class="credit">${c.t('contact.lieu.facade')}</figcaption>
    </figure>
  </div>
</section>

<section class="bandeau" id="bandeau" aria-labelledby="bandeau-h">
  <div class="conteneur bandeau-texte">
    ${quatreVisages(c)}
    <h2 id="bandeau-h" data-anime="lignes">${c.t('contact.bandeau.titre')}</h2>
    <p data-anime>${c.t('contact.bandeau.texte')}</p>
    <p data-anime>${c.lien('appel', { classe: 'bouton', texte: c.t('contact.bandeau.action'), attrs: 'data-survol="magnetique"' })}</p>
  </div>
</section>
`;
};
