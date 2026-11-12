# Ce qui a changé

Chaque version ajoute sa partie en tête de ce fichier, construite en comparant l'archive précédente et la nouvelle, jamais de mémoire.

## v2 — « Les visages du Q » (12 novembre 2026)

Comparaison faite fichier par fichier avec l'archive de la v1 (pages, données, styles, scripts, images).

**Pourquoi** : le regard d'un directeur artistique extérieur a jugé l'accueil de la v1 à refaire (2,9 sur 5). Il était trop long (15 écrans sur ordinateur, 18 sur téléphone). La table de lecture dessinée en code faisait jouet. Le carrousel 3D, les bandeaux de mots géants et le crayon dans la marge reprenaient ceux de deux autres maquettes. Et les 46 portraits des lecteurs n'étaient pas utilisés.

**L'identité du Quartier**
- Les couleurs du logo remplacent le papier ivoire et le crayon rouge, une couleur par comité : France orange, Belgique bleu-vert, Cameroun vert, Canada ocre. Le brique va aux coups de cœur, l'aubergine à la lauréate et aux boutons.
- Le logo est redessiné en vectoriel, avec ses six formes et sa lettre (`donnees/logo.json`, `outils/vectoriser-logo.py`).
- Les 46 portraits des membres des quatre comités sont repris du site actuel et recadrés sur le visage (`donnees/lecteurs.json`, `assets/images/site/lecteurs/`).

**Sur toutes les pages**
- **Intro** : les six formes du logo arrivent de six côtés et forment le Q, puis il se pose sur l'objet d'ouverture de la page. Le nom tapé à la machine, qui débordait de sa carte, n'existe plus.
- **Fil conducteur** : un petit Q devant chaque surtitre, qui se reconstitue forme par forme au fil des sections, remplace le trait de crayon dans la marge.
- **Titres** : ils ne se tapent plus à la machine et ne sont plus en machine à écrire. Ce sont des titres Fraunces dont la police s'assouplit au défilement.
- **Curseur** : une petite forme aubergine qui laisse une traînée aux couleurs du logo remplace le crayon.
- **Faits** : les « à compléter » ont été retirés du corps des pages. Restent seulement ceux du pied de page et des formulaires.
  - le lieu des lectures à confirmer ;
  - l'année d'arrivée du comité belge ;
  - la ville du comité canadien ;
  - le montant du prix ;
  - la lecture au Canada ;
  - la mention « texte intégral à reprendre ».

**Accueil, refait (9,5 écrans sur ordinateur, 13,7 sur téléphone)**
- **Ouverture** : le Q du logo, dont chaque forme est remplie des vrais visages de son comité, de la lauréate et des coups de cœur.
  - On en attrape les formes ; elles reviennent avec élan.
  - Elles suivent la souris en profondeur et se défont doucement au défilement.
  - La légende des six formes est visible sans interaction.
- **Le comité** : « Près de 50 lecteurs, quatre têtes ».
  - Les 46 visages se regroupent par comité au défilement, avec un filtre par comité.
  - La lumière de la section passe du violet à l'orange des affiches du Quartier.
- **Le trajet d'un texte** (scène épinglée), de l'e-mail à la scène : l'e-mail et ses pièces jointes, trois lecteurs et leurs fiches, deux avis favorables, 26 textes en sélection finale, la lauréate et quatre coups de cœur, puis les trois lectures de juin.
- **La Une de la saison** : portrait de Stephie Mazunya, *Chronologies* et ses distinctions, le tapuscrit à feuilleter, les quatre coups de cœur marqués de la couleur de leur comité.
- **Le manifeste** : « C'est une Hydre de Lerne », avec le texte mot à mot, la citation et la peinture « La palabre africaine » reprise du site.
- **L'appel** :
  - les quatre conditions ;
  - les vrais gestes : déposer en ligne, envoyer par e-mail, la fiche PDF ;
  - « Votre texte sera lu par trois d'entre eux », trois visages tirés au hasard à chaque visite.
- **Partenaires** : une ligne de logos remplace les cinq cartes.
- **Retirés** : la table 3D, le carrousel 3D, les bandeaux des 26 titres, le plateau en plein écran, la rature et les images générées de l'ouverture, de la table, du lecteur et de l'enveloppe.

**Les autres pages**
- **L'Hydre** : la page passe du bleu à l'aubergine.
  - Les quatre cous prennent la couleur de leur comité.
  - Les quatre têtes se montrent en visages (une colonne par comité, qui se dresse au défilement) à la place du tambour 3D et des affiches réduites.
  - Les quatre traits de « Comment l'Hydre choisit » sont à leurs couleurs.
- **La saison** :
  - la pile des 26 se feuillette en deux fois moins de défilement ;
  - les 12 pays en chiffres remplacent le bandeau rouge qui défilait ;
  - le titre de la lauréate n'est plus tapé.
- **L'appel à textes** :
  - le parcours d'un texte est plus court (3 écrans de défilement au lieu de 4) ;
  - le texte d'ouverture est posé sur un fond sombre sur téléphone, pour rester lisible.
- **Contact** : le cachet de la poste est plus contrasté.
- **Images retirées** (plus utilisées) :
  - six illustrations générées de l'ancien accueil, avec leurs variantes ;
  - les quatre affiches des comités.

**Technique**
- L'audit passe à la version v10.10 de la skill.
- Les fichiers de travail sont rangés dans `_suivi/` : relevé, direction, vitrine, regards du directeur artistique.
- `outils/mosaiques-q.py` fabrique les mosaïques de visages des formes du Q.
- Les numéros de version passent de `?v=1` à `?v=2`.

## v1 — la base (7 novembre 2026)

- **Direction « Le Tapuscrit »** : papier ivoire, encre, crayon rouge du lecteur, bleu stylo ; Fraunces pour les titres, Recursive pour le texte et la machine à écrire. Logo du QD2A dans l'en-tête, le pied de page, l'icône et les images de partage.
- **Six pages** : accueil, la saison 25/26, l'appel à textes, l'Hydre, contact, 404. Chaque page a sa propre ouverture et son propre monde (ivoire, encre, bleu).
- **Intro** : le nom du Quartier se tape à la machine, la feuille file jusqu'à l'objet d'ouverture de la page, puis l'écran s'ouvre depuis lui.
- **Transition** entre pages : une feuille qui se tourne (nouvelle forme de voile « page »).
- **Fil conducteur** : trait de crayon rouge dans la marge, repères qui s'allument à chaque section.
- **Accueil** : tapuscrit lauréat à feuilleter à la main, avec annotations au crayon ; bandeaux géants des 26 titres ; table de lecture en 3D (trois fiches, deux tampons, la sélection, le lauréat) qui pivote à la main ; carrousel 3D de la saison ; plateau qui s'ouvre en plein écran et ondule ; manifeste raturé ; appel tapé à la machine ; partenaires tamponnés ; curseur crayon sur ordinateur.
- **Saison** : « 26 » géant, pile des 26 tapuscrits à feuilleter et filtrer par pays (filtre gardé dans l'adresse), lauréate, coups de cœur, lectures de juin marquées « Terminé » selon la date réelle.
- **Appel à textes** : lampe qui suit le pointeur, quatre cachets, parcours d'un texte épinglé, dépôt simulé en trois étapes avec enveloppe tamponnée « Reçu ».
- **Hydre** : quatre cous dessinés depuis Ivry, manifeste mot à mot, tambour 3D des quatre comités, vie du Quartier, partenaires.
- **Contact** : enveloppe adressée au Quartier, formulaire simulé, plan d'accès schématique (métro 7 Mairie d'Ivry, RER C Ivry-sur-Seine).
- **Images** : portraits, comités, logos et couvertures du site actuel ; 17 illustrations Grok avec la mention « Illustration générée ».
- **Mise en ligne** : noindex, images de partage 1200×630 par page, données structurées (Organization), mode calme complet.
