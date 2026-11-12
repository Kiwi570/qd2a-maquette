/* La saison 25/26 : ouverture centrée sur un « 26 » géant et la pile qui se forme ; la lauréate (titre tapé) ;
   la pile des 26 tapuscrits à feuilleter au défilement, filtrable par pays (scène du métier) ; les coups de cœur
   tamponnés par leur comité ; les lectures de juin (statut calculé) ; les 12 pays en bandeaux géants. */
import { html } from '../../outils/gabarit.mjs';

export const page = { cle: 'saison', fichier: 'saison', imagePartage: 'grok/g-saison-ouverture-1168.webp' };

const DATE = (iso) => {
  const [a, m, j] = iso.split('-').map(Number);
  return `${j} ${['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'][m - 1]} ${a}`;
};
const aujourdhui = new Date().toISOString().slice(0, 10);

export default (c) => {
  const s = c.donnees.saison, L = s.laureat, sel = c.donnees.selection;
  const paysCompte = {};
  sel.textes.forEach((t) => t.pays.forEach((p) => { paysCompte[p] = (paysCompte[p] || 0) + 1; }));
  const paysOrdre = Object.keys(paysCompte).sort((a, b) => paysCompte[b] - paysCompte[a] || sel.pays[a].localeCompare(sel.pays[b], 'fr'));
  const nomsPays = paysOrdre.map((p) => sel.pays[p]);
  return html`
<section class="ouv ouv-saison ecran" id="debut">
  <div class="saison-ouv conteneur">
    <p class="surtitre" data-anime="gsap" data-info-cle><span class="pastille" aria-hidden="true"></span>${c.t('saison.hero.surtitre')} · ${c.t('saison.hero.info')}</p>
    <div class="saison-26" data-iris-centre data-effet="pile" data-visuel aria-hidden="true">
      <span class="saison-26-chiffre" data-pile-compte>26</span>
      <span class="saison-26-pile">${sel.textes.map((t, i) => html`<i style="--i:${i}"></i>`)}</span>
    </div>
    <h1 class="ouv-titre"><span class="ligne-masque"><span class="ouv-ligne" data-anime="gsap">${c.t('saison.hero.titre')}</span></span></h1>
    <p class="ouv-intro masque-ecran-bas" data-anime="gsap">${c.t('saison.hero.texte')}</p>
    <p class="ouv-actions" data-anime="gsap"><a class="bouton" href="#selection" data-action-principale data-survol="magnetique">${c.t('saison.hero.action')}</a></p>
  </div>
</section>

<section class="laureat" id="laureat" aria-labelledby="laureat-h">
  <div class="conteneur laureat-grille">
    <figure class="laureat-portrait">
      ${c.media({ nom: 'site/mazunya', alt: c.s('saison.laureat.alt'), cadrage: '50% 30%', classe: 'laureat-photo', sizes: '(max-width: 760px) 100vw, 40vw', ratio: '4 / 5', attrs: 'data-anime="rideau"' })}
      <figcaption class="credit">${L.credit}</figcaption>
    </figure>
    <div class="laureat-texte">
      <p class="surtitre">${c.t('saison.laureat.surtitre')}</p>
      <h2 id="laureat-h" class="laureat-titre titre-axes" data-axes data-grille="typo">${L.titre}</h2>
      <p class="laureat-autrice">${L.autrice} · ${L.pays}</p>
      <p data-anime="mots">${L.resume}</p>
      <div class="laureat-cols">
        <div>
          <h3>${c.t('saison.laureat.personnages')}</h3>
          <ul class="liste-script" data-anime="cascade">${L.personnages.map((p) => html`<li><b>${p.nom.toUpperCase()}</b> ${p.desc}</li>`)}</ul>
        </div>
        <div>
          <h3>${c.t('saison.laureat.distinctions')}</h3>
          <ul class="liste-coches" data-anime="cascade">${L.distinctions.map((d) => html`<li>${d}</li>`)}</ul>
        </div>
      </div>
      <p class="laureat-bio">${L.bio}</p>
    </div>
  </div>
</section>

<section class="pile-scene" id="selection" data-scene data-grille="scene" data-entete-cache aria-labelledby="selection-h" style="--n:${sel.textes.length}">
  <div class="pile-cadre" data-collant>
    <div class="pile-tete conteneur">
      <div>
        <p class="surtitre">${c.t('saison.selection.surtitre')}</p>
        <h2 id="selection-h" data-anime="lignes">${c.t('saison.selection.titre')}</h2>
        <p class="masque-ecran-bas">${c.t('saison.selection.texte')}</p>
      </div>
      <div class="pile-filtres" role="group" aria-label="${c.s('saison.selection.filtres')}" data-filtres>
        <button type="button" class="filtre" data-filtre="tous" aria-pressed="true">${c.t('saison.selection.tous')} <span>${sel.textes.length}</span></button>
        ${paysOrdre.map((p) => html`<button type="button" class="filtre" data-filtre="${p}" aria-pressed="false">${sel.pays[p]} <span>${paysCompte[p]}</span></button>`)}
      </div>
      <p class="pile-compteur" aria-live="polite"><b data-pile-num>01</b> / <span data-pile-total>${sel.textes.length}</span></p>
    </div>
    <div class="pile-zone" data-effet="feuilleter" data-visuel data-pile-zone role="region" aria-label="${c.s('saison.selection.region')}" tabindex="0">
      <ol class="pile" data-pile>
        ${sel.textes.map((t, i) => html`<li class="tapu${t.distinction ? ' tapu--distingue' : ''}" data-pays="${t.pays.join(' ')}" style="--i:${i}">
          <span class="tapu-num">${String(i + 1).padStart(2, '0')}</span>
          <h3 class="tapu-titre">${t.titre}</h3>
          <p class="tapu-auteur">${t.prenom} ${t.nom}</p>
          <p class="tapu-pays">${t.pays.map((p) => sel.pays[p]).join(' · ')}</p>
          ${t.distinction ? html`<span class="tapu-tampon">${t.distinction}</span>` : ''}
        </li>`)}
      </ol>
      <p class="pile-vide" data-pile-vide hidden>${c.t('saison.selection.aucun')}</p>
    </div>
  </div>
</section>

<section class="coups" id="coups-de-coeur" aria-labelledby="coups-h">
  <div class="conteneur">
    <p class="surtitre">${c.t('saison.coups.surtitre')}</p>
    <h2 id="coups-h" data-anime="lignes">${c.t('saison.coups.titre')}</h2>
    <p class="coups-intro">${c.t('saison.coups.texte')}</p>
    <ul class="coups-liste" data-anime="cascade">
      ${s.coups.map((x) => html`<li class="coup">
        ${c.media({ nom: x.image, alt: c.s('saison.coups.alt', { nom: x.auteur }), classe: 'coup-photo', sizes: '(max-width: 760px) 80vw, 22vw', ratio: '4 / 5', cadrage: '50% 35%', attrs: 'data-fx="vitesse"' })}
        <span class="coup-tampon">${c.t('saison.coups.comite')} QD2A ${x.comites.join(' · ')}</span>
        <h3>${x.titre}</h3>
        <p>${x.auteur} · ${x.pays}</p>
        ${x.credit ? html`<p class="credit">${x.credit}</p>` : ''}
      </li>`)}
    </ul>
  </div>
</section>

<section class="lectures" id="lectures" aria-labelledby="lectures-h">
  <div class="conteneur lectures-grille">
    <div>
      <p class="surtitre">${c.t('saison.lectures.surtitre')}</p>
      <h2 id="lectures-h" data-anime="lignes">${c.t('saison.lectures.titre')}</h2>
      <p>${c.t('saison.lectures.texte')}</p>
      <ol class="agenda" data-anime="cascade">
        ${s.lectures.map((l) => html`<li class="agenda-date" data-date="${l.date}">
          <p class="agenda-jour"><time datetime="${l.date}">${DATE(l.date)}</time> <span class="statut" data-statut data-termine="${c.s('saison.lectures.termine')}" data-avenir="${c.s('saison.lectures.aVenir')}">${l.date < aujourdhui ? c.t('saison.lectures.termine') : c.t('saison.lectures.aVenir')}</span></p>
          <h3>${l.comite}</h3>
          ${l.lieu ? html`<p class="agenda-lieu">${l.lieu}</p>` : ''}
          <ul>${l.textes.map((t) => html`<li>${t}</li>`)}</ul>
        </li>`)}
      </ol>
    </div>
    ${c.media({ nom: 'grok/g-saison-lectures', alt: c.s('saison.lectures.alt'), classe: 'lectures-photo', sizes: '(max-width: 760px) 100vw, 45vw', attrs: 'data-fx="parallaxe"' })}
  </div>
</section>

<section class="pays-liste" id="pays" aria-labelledby="pays-h">
  <div class="conteneur">
    <p class="surtitre">${c.t('saison.pays.surtitre')}</p>
    <h2 id="pays-h" class="titre-axes" data-axes>${c.t('saison.pays.titre')}</h2>
    <ol class="pays-grille" data-anime="cascade" data-visuel>
      ${paysOrdre.map((p) => html`<li><b>${paysCompte[p]}</b><span>${sel.pays[p]}</span><em>${paysCompte[p] > 1 ? c.t('saison.pays.unites') : c.t('saison.pays.unite')}</em></li>`)}
    </ol>
  </div>
</section>

<section class="fin" id="fin" aria-labelledby="fin-h">
  <div class="conteneur fin-grille">
    <div class="fin-pile" data-visuel data-fx="vitesse" aria-hidden="true"><i style="--k:0"></i><i style="--k:1"></i><i style="--k:2"></i><i style="--k:3"></i></div>
    <h2 id="fin-h" data-anime="lignes">${c.t('saison.fin.titre')}</h2>
    <p data-anime>${c.t('saison.fin.texte')}</p>
    <p data-anime>${c.lien('appel', { ancre: 'deposer', classe: 'bouton', texte: c.t('saison.fin.action'), attrs: 'data-survol="magnetique"' })}</p>
  </div>
</section>
`;
};
