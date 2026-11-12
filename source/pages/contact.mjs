/* Contact : ouverture compacte sur une enveloppe adressée au Quartier (l'adresse e-mail se tape, le cachet se pose) ;
   formulaire simulé dont la lettre se plie et part ; plan schématique d'accès au TQI ; bandeau vers l'appel. */
import { html } from '../../outils/gabarit.mjs';
import { enveloppe } from './appel.mjs';

export const page = { cle: 'contact', fichier: 'contact', imagePartage: 'grok/g-contact-bandeau-1168.webp' };

export default (c) => html`
<section class="ouv ouv-contact" id="debut">
  <div class="conteneur contact-ouv">
    <div class="ouv-texte">
      <p class="surtitre masque-ecran-tres-bas" data-anime="gsap">${c.t('contact.hero.surtitre')}</p>
      <h1 class="ouv-titre"><span class="ligne-masque"><span class="ouv-ligne" data-anime="gsap">${c.t('contact.hero.titre')}</span></span></h1>
      <p class="ouv-intro masque-ecran-tres-bas" data-anime="gsap">${c.t('contact.hero.texte')}</p>
      <p class="ouv-actions" data-anime="gsap"><a class="bouton" href="#formulaire" data-action-principale data-survol="magnetique">${c.t('contact.hero.action')}</a> <a class="ouv-info ouv-mail" href="mailto:${c.site.contact.email}" data-info-cle>${c.t('contact.hero.mail')}</a></p>
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

<section class="ecrire" id="formulaire" aria-labelledby="formulaire-h">
  <div class="conteneur ecrire-grille">
    <form class="ecrire-form" data-formulaire data-form-lettre novalidate aria-labelledby="formulaire-h">
      <h2 id="formulaire-h" class="titre-axes" data-axes data-grille="typo">${c.t('contact.formulaire.titre')}</h2>
      <p>${c.t('contact.formulaire.texte')}</p>
      <div class="champ"><label for="c-nom">${c.t('contact.formulaire.nom')}</label><input id="c-nom" name="nom" autocomplete="name" required></div>
      <div class="champ"><label for="c-email">${c.t('contact.formulaire.email')}</label><input id="c-email" name="email" type="email" autocomplete="email" required></div>
      <div class="champ"><label for="c-objet">${c.t('contact.formulaire.objet')}</label><select id="c-objet" name="objet" required>
        <option value="texte">${c.t('contact.formulaire.oTexte')}</option><option value="lecture">${c.t('contact.formulaire.oLecture')}</option><option value="partenariat">${c.t('contact.formulaire.oPartenariat')}</option><option value="autre">${c.t('contact.formulaire.oAutre')}</option>
      </select></div>
      <div class="champ"><label for="c-message">${c.t('contact.formulaire.message')}</label><textarea id="c-message" name="message" rows="5" required></textarea></div>
      <p class="mention-donnees">${c.t('contact.formulaire.donnees')}</p>
      <p><button type="submit" class="bouton">${c.t('contact.formulaire.envoyer')}</button></p>
      <p data-message-envoi data-texte="${c.s('contact.formulaire.envoye')}" tabindex="-1" hidden></p>
    </form>
    <div class="ecrire-visuel" data-grille="retour" data-effet="enveloppe" data-fx="vitesse" data-visuel>${enveloppe(c, 'contact.formulaire.recu', 'poste')}</div>
  </div>
</section>

<section class="lieu" id="lieu" aria-labelledby="lieu-h">
  <div class="conteneur lieu-grille">
    <div>
      <h2 id="lieu-h" data-anime="lignes">${c.t('contact.lieu.titre')}</h2>
      <p>${c.t('contact.lieu.texte')}</p>
      <p class="lieu-adresse"><b>${c.site.contact.lieu}</b><br>${c.site.contact.adresse}</p>
      <h3>${c.t('contact.lieu.acces')}</h3>
      <ul class="liste-coches" data-anime="cascade"><li>${c.t('contact.lieu.metro')}</li><li>${c.t('contact.lieu.rer')}</li></ul>
      <p><a class="lien-fleche" href="${c.site.contact.facebook}" target="_blank" rel="noopener" aria-label="${c.s('commun.facebook')} ${c.s('commun.nouvelOnglet')}">${c.t('commun.facebook')}</a></p>
    </div>
    <figure class="plan" data-visuel>
      <svg viewBox="0 0 480 360" role="img" aria-label="${c.s('contact.lieu.plan')}" data-fx="trace">
        <path class="plan-rue" d="M0 250 C 120 240, 260 260, 480 230"/>
        <path class="plan-rue" d="M210 0 C 220 120, 200 220, 230 360"/>
        <path class="plan-rue fine" d="M0 120 C 140 130, 300 100, 480 120"/>
        <path class="plan-chemin" d="M215 245 C 260 230, 300 200, 330 160"/>
      </svg>
      <span class="plan-point plan-point--metro" data-repere>M</span><span class="plan-etiquette plan-etiquette--metro">${c.t('contact.lieu.mairie')}</span>
      <span class="plan-point plan-point--tqi" data-repere></span><span class="plan-etiquette plan-etiquette--tqi">${c.t('contact.lieu.manufacture')}</span>
      <figcaption>${c.t('contact.lieu.plan')}</figcaption>
    </figure>
  </div>
</section>

<section class="bandeau" id="bandeau" aria-labelledby="bandeau-h">
  ${c.media({ nom: 'grok/g-contact-bandeau', alt: c.s('contact.bandeau.alt'), cadrage: '50% 60%', classe: 'bandeau-photo', sizes: '100vw', attrs: 'data-fx="parallaxe"' })}
  <div class="conteneur bandeau-texte">
    <h2 id="bandeau-h" data-anime="lignes">${c.t('contact.bandeau.titre')}</h2>
    <p data-anime>${c.t('contact.bandeau.texte')}</p>
    <p data-anime>${c.lien('appel', { classe: 'bouton', texte: c.t('contact.bandeau.action'), attrs: 'data-survol="magnetique"' })}</p>
  </div>
</section>
`;
