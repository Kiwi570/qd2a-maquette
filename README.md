# QD2A : maquette « Les visages du Q » (v2)

Maquette du site du Quartier des Autrices et des Auteurs (QD2A), comité de lecture international des écritures dramatiques contemporaines de langue française.
Adresse prévue : https://qd2a-maquette.vercel.app

## Pages (v2)

| Page | Fichier | Ouverture et signature |
|---|---|---|
| Accueil | `index.html` | Le Q du logo fait des vrais visages du comité (formes à attraper) ; les 46 visages qui se regroupent par tête ; le trajet d'un texte, de l'e-mail à la scène ; la Une de la saison avec le tapuscrit de *Chronologies* à feuilleter ; le manifeste ; l'appel et les trois lecteurs tirés au hasard ; les partenaires |
| La saison 25/26 | `saison.html` | « 26 » géant et pile qui se forme ; lauréate ; pile des 26 tapuscrits à feuilleter, filtrable par pays ; coups de cœur ; lectures de juin ; les 12 pays en chiffres |
| L'appel à textes | `appel-a-textes.html` | Page à l'encre ; lampe qui suit le pointeur ; quatre cachets ; parcours d'un texte (l'enveloppe suit la route) ; dépôt simulé en trois étapes, enveloppe tamponnée « Reçu » |
| L'Hydre | `hydre.html` | Page aubergine ; quatre cous aux couleurs des comités qui partent d'Ivry ; manifeste mot à mot ; les quatre têtes en visages ; vie du Quartier |
| Contact | `contact.html` | Enveloppe adressée au Quartier ; formulaire simulé qui se plie et part ; plan d'accès schématique |
| 404 | `404.html` | « La servante est restée allumée » |

Intro : les six formes du logo arrivent et forment le Q, puis il se pose sur l'objet d'ouverture de la page.
Transition entre les pages : une feuille qui se tourne (forme de voile « page », ajoutée au socle du projet).
Fil conducteur : le petit Q devant chaque surtitre, qui se reconstitue forme par forme au fil des sections.
Couleurs : celles du logo, une par comité (France orange, Belgique bleu-vert, Cameroun vert, Canada ocre ; brique pour les coups de cœur, aubergine pour la lauréate).

## Mettre à jour

Les textes sont dans `donnees/textes/fr.json`, les données dans `donnees/*.json` (sélection, saison, comités, partenaires), les pages dans `source/pages/`.
Après une modification : `node outils/generer.mjs` (ne jamais modifier les fichiers `.html` à la main).
Images : `python3 -I outils/produire-images.py outils/lot-images.json` (variantes WebP ; `outils/lot-lecteurs.json` pour les 46 visages, `outils/lot-v2.json` pour la peinture), `python3 -I outils/mosaiques-q.py` (mosaïques de visages des formes du Q), puis `NODE_PATH=$(npm root -g) node outils/images-partage.mjs` (images de partage). Formes du logo : `python3 -I outils/vectoriser-logo.py <logo sur fond sombre> <sortie.json>` (données dans `donnees/logo.json`).
Audit : `node _audit/audit.mjs` (standard), `--complet` pour la version finale.

## À fournir par le Quartier (à compléter)

- Mentions légales : nom de l'association, adresse du siège, numéro RNA ou SIRET, directeur ou directrice de la publication.
- Hébergeur : Vercel Inc., adresse à vérifier sur le site de Vercel au moment de la mise en ligne.
- Politique de confidentialité (RGPD) : données recueillies par les formulaires, finalité, durée de conservation, droits.
- Montant du prix en numéraire du lauréat (retiré du parcours d'un texte, page Appel).
- Lieux des lectures de juin 2026 au Cameroun et en Belgique (seul Ivry-sur-Seine est affiché) et lecture au Canada s'il y en a eu une (la mention a été retirée).
- Année d'arrivée du comité belge (remplacée par « La tête bruxelloise de l'Hydre ») ; ville du comité canadien (retirée).
- Texte intégral du manifeste de Laëtitia Ajanohun (l'accueil et l'Hydre en donnent un résumé).
- Portraits individuels des membres du QD2A Canada (deux seulement sur le site, l'affiche du comité en montre huit).
- Rôle de l'Institut français du Cameroun et de l'Ambassade de France au Cameroun (logos sur la page du comité camerounais, non repris comme partenaires).
- Accord des membres des comités pour la publication de leur portrait (46 visages repris du site actuel, pages des membres), et leurs noms si le Quartier souhaite les afficher.
- Crédits photo manquants : portraits d'Israël Nzila et de Nicolas Porcher Jouve.
- Fiche de renseignements 26/27 : elle est aujourd'hui hébergée par Wix ; à reprendre sur le nouveau site.

## Crédits à reporter

- Portrait de Stephie Mazunya : Jules Bédard. Alexandro Christi Nicolas : Heberson Edmé. Esteban Okbi : Hélène Marx (d'après les noms de fichiers du site actuel, à confirmer).
- Couvertures de la collection Quartiers Intranquilles : Éditions Passage(s).
- Logos des partenaires : Théâtre des Quartiers d'Ivry, CED Wallonie-Bruxelles, Avant/Scène, La Bellone, Cité internationale des arts.
- Portraits des membres des comités : photos du site actuel (pages des membres), crédits à demander au Quartier.
- Peinture « La palabre africaine, faut pas être pressé » (accueil) : reprise du site actuel, auteur à confirmer (signée, légendée Gustave Akakpo sur le site).
- Logo du Quartier : ses six formes et la lettre ont été redessinées en vectoriel à partir du logo du site actuel ; à remplacer par le fichier source si le Quartier l'a.
- Les images marquées « Illustration générée » ont été créées par intelligence artificielle (Grok). **Garder cette mention sur le site final.**
- Polices : Fraunces et Recursive (SIL Open Font License, fichiers dans `assets/fonts/`).

## Incohérences relevées sur le site actuel

- Le site est resté en saison 25/26 alors que l'appel 26/27 est ouvert ; la saison 24/25 manque aux archives.
- « Plus de 40 lecteurs » (appel à textes) contre « près de 50 » (manifeste international) : la maquette affiche « près de 50 », à confirmer.
- Le manifeste parle de quatre pays mais de « trois équipes » ; le Canada est absent des lectures de juin.
- *Boukan* et *Clipping* sont donnés comme coups de cœur de deux comités selon les pages (Canada ex aequo).
- *C'est là que mon nombril est enterré* est rangé en 22/23 dans les archives, mais « prix 2021-2022 » chez Passage(s).
- Laëtitia / Laetitia Ajanohun ; « Laureate » sans accent ; adresses de pages « copie-de-… ».

## Pages du site actuel non reprises (disponibles dans une prochaine version)

Quartiers Intranquilles chez Passage(s) et Traverse(s) (une vingtaine de titres, couvertures déjà récupérées), Les archives (20/21 à 23/24), La vie du Quartier et ses invités, une page par comité avec ses membres nommés, les fiches détaillées de chaque coup de cœur.

## À retirer à la mise en ligne définitive

- `noindex` : balise robots dans `source/gabarits/commun.mjs` et en-tête `X-Robots-Tag` dans `vercel.json`.
- Les formulaires simulés (dépôt de texte, contact) : à brancher sur un vrai envoi.
- Les mentions « à compléter » et « Maquette ».

## À garder

- La mention « Illustration générée » sur chaque image créée par IA.

## Pièces techniques

- Socle de la skill v10.4 (v1), mis à niveau en v2 avec l'audit de la skill v10.10 ; deux ajouts propres au projet : la forme de voile « page » (`assets/js/socle/voile.js`) et les attributs SVG (`d`, `viewBox`…) exclus de la typographie française dans `outils/gabarit.mjs`.
- `outils/produire-images.py` remplace ici `produire.mjs` de la bibliothèque (scripts de la bibliothèque non exécutables dans la session de construction).
