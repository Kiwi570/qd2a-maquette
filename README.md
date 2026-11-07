# QD2A : maquette « Le Tapuscrit »

Maquette du site du Quartier des Autrices et des Auteurs (QD2A), comité de lecture international des écritures dramatiques contemporaines de langue française.
Adresse prévue : https://qd2a-maquette.vercel.app

## Pages de la v1

| Page | Fichier | Ouverture et signature |
|---|---|---|
| Accueil | `index.html` | Tapuscrit lauréat à feuilleter à la main (annotations au crayon), titres en bandeaux géants, table de lecture en 3D, carrousel 3D de la saison, plateau en plein écran qui ondule, manifeste raturé, appel tapé à la machine |
| La saison 25/26 | `saison.html` | « 26 » géant et pile qui se forme ; lauréate ; pile des 26 tapuscrits à feuilleter, filtrable par pays ; coups de cœur tamponnés ; lectures de juin ; bandeaux des 12 pays |
| L'appel à textes | `appel-a-textes.html` | Page à l'encre ; lampe qui suit le pointeur ; quatre cachets ; parcours d'un texte (l'enveloppe suit la route) ; dépôt simulé en trois étapes, enveloppe tamponnée « Reçu » |
| L'Hydre | `hydre.html` | Page bleu encre ; quatre cous qui partent d'Ivry ; manifeste mot à mot ; tambour 3D des quatre comités ; vie du Quartier |
| Contact | `contact.html` | Enveloppe adressée au Quartier ; formulaire simulé qui se plie et part ; plan d'accès schématique |
| 404 | `404.html` | « La servante est restée allumée » |

Transition entre les pages : une feuille qui se tourne (forme de voile « page », ajoutée au socle du projet).
Fil conducteur : le trait de crayon rouge du lecteur, dans la marge gauche, sur toutes les pages.

## Mettre à jour

Les textes sont dans `donnees/textes/fr.json`, les données dans `donnees/*.json` (sélection, saison, comités, partenaires), les pages dans `source/pages/`.
Après une modification : `node outils/generer.mjs` (ne jamais modifier les fichiers `.html` à la main).
Images : `python3 -I outils/produire-images.py outils/lot-images.json` (variantes WebP), puis `NODE_PATH=$(npm root -g) node outils/images-partage.mjs` (images de partage).
Audit : `node _audit/audit.mjs` (standard), `--complet` pour la version finale.

## À fournir par le Quartier (à compléter)

- Mentions légales : nom de l'association, adresse du siège, numéro RNA ou SIRET, directeur ou directrice de la publication.
- Hébergeur : Vercel Inc., adresse à vérifier sur le site de Vercel au moment de la mise en ligne.
- Politique de confidentialité (RGPD) : données recueillies par les formulaires, finalité, durée de conservation, droits.
- Montant du prix en numéraire du lauréat.
- Lieux des lectures de juin 2026 (Ivry à confirmer, Cameroun, Belgique) et lecture au Canada s'il y en a eu une.
- Année d'arrivée du comité belge ; ville du comité canadien.
- Texte intégral du manifeste de Laëtitia Ajanohun (l'accueil en donne un résumé, signalé comme tel).
- Crédits photo manquants : portraits d'Israël Nzila et de Nicolas Porcher Jouve.
- Fiche de renseignements 26/27 : elle est aujourd'hui hébergée par Wix ; à reprendre sur le nouveau site.

## Crédits à reporter

- Portrait de Stephie Mazunya : Jules Bédard. Alexandro Christi Nicolas : Heberson Edmé. Esteban Okbi : Hélène Marx (d'après les noms de fichiers du site actuel, à confirmer).
- Couvertures de la collection Quartiers Intranquilles : Éditions Passage(s).
- Logos des partenaires : Théâtre des Quartiers d'Ivry, CED Wallonie-Bruxelles, Avant/Scène, La Bellone, Cité internationale des arts.
- Les images marquées « Illustration générée » ont été créées par intelligence artificielle (Grok). **Garder cette mention sur le site final.**
- Polices : Fraunces et Recursive (SIL Open Font License, fichiers dans `assets/fonts/`).

## Incohérences relevées sur le site actuel

- Le site est resté en saison 25/26 alors que l'appel 26/27 est ouvert ; la saison 24/25 manque aux archives.
- « Plus de 40 lecteurs » (appel à textes) contre « près de 50 » (manifeste international) : la maquette affiche « près de 50 », à confirmer.
- Le manifeste parle de quatre pays mais de « trois équipes » ; le Canada est absent des lectures de juin.
- *Boukan* et *Clipping* sont donnés comme coups de cœur de deux comités selon les pages (Canada ex aequo).
- *C'est là que mon nombril est enterré* est rangé en 22/23 dans les archives, mais « prix 2021-2022 » chez Passage(s).
- Laëtitia / Laetitia Ajanohun ; « Laureate » sans accent ; adresses de pages « copie-de-… ».

## Pages du site actuel non reprises en v1 (disponibles en v2)

Quartiers Intranquilles chez Passage(s) et Traverse(s) (une vingtaine de titres, couvertures déjà récupérées), Les archives (20/21 à 23/24), La vie du Quartier et ses invités, les membres de chaque comité, les fiches détaillées de chaque coup de cœur.

## À retirer à la mise en ligne définitive

- `noindex` : balise robots dans `source/gabarits/commun.mjs` et en-tête `X-Robots-Tag` dans `vercel.json`.
- Les formulaires simulés (dépôt de texte, contact) : à brancher sur un vrai envoi.
- Les mentions « à compléter » et « Maquette ».

## À garder

- La mention « Illustration générée » sur chaque image créée par IA.

## Pièces techniques

- Socle de la skill v10.4, avec deux ajouts propres au projet : la forme de voile « page » (`assets/js/socle/voile.js`) et les attributs SVG (`d`, `viewBox`…) exclus de la typographie française dans `outils/gabarit.mjs`.
- `outils/produire-images.py` remplace ici `produire.mjs` de la bibliothèque (scripts de la bibliothèque non exécutables dans la session de construction).
