/* Page 404 : la servante (la lampe qu'on laisse allumée sur un plateau vide), qui suit le pointeur. */
import { html } from '../../outils/gabarit.mjs';

export const page = { cle: '404', fichier: '404', partage: false };

export default (c) => html`
<section class="introuvable ecran" id="introuvable" data-servante>
  ${c.media({ nom: 'grok/g-404', alt: c.s('introuvable.alt'), cadrage: '40% 60%', priorite: true, classe: 'introuvable-fond', sizes: '100vw', attrs: 'data-iris-centre data-effet="servante" data-souris' })}
  <div class="conteneur introuvable-texte">
    <p class="surtitre" data-info-cle>404 · ${c.t('pages.404.nav')}</p>
    <h1 data-anime="lignes" data-grille="typo" class="axes" data-axes>${c.t('introuvable.titre')}</h1>
    <p data-anime>${c.t('introuvable.texte')}</p>
    <p>${c.lien('accueil', { classe: 'bouton', texte: c.t('introuvable.retour'), attrs: 'data-action-principale' })}</p>
  </div>
</section>
`;
