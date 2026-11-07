# Rapport d’audit

Projet : `qd2a-maquette` · 07/11/2026 22:29:03 · 26 min · 6 page(s) · audit complet

## Résumé

- Échecs : **0**
- À regarder : **3**
- Non lancé : **1**
- Contrôles passés : vercel.json (1), .vercelignore (1), robots.txt (1), numéro de version (1), langues (1), grille wouahou (7), mesures (312), balayage (5), films d’ouverture (10), films de transition (10), bords de l’écran (6), intro accélérable et passable (7), menu (1), clavier (6), liens et boutons (6), liens profonds (6), liens vers la page en cours (5), changements de hauteur (5), mode calme (10), bouton du mode calme (2), tient dans l’écran (8), fluidité (10), défilement selon l’appareil (5), mouvement (10), effets du plan (8), souris immobile (13), vitesse (5), captures (1)

## Grille wouahou

| Point | État | Détail |
|---|---|---|
| 1. L’effet signature se manipule | ✓ présent | accueil |
| 2. L’intro devient la page | ✓ présent | objet d’ouverture sur 5 page(s), versObjet dans l’intro |
| 3. La transition reprend le motif | ✓ présent | voile en page |
| 4. Un fil conducteur traverse le site | ✓ présent | sur les 5 page(s) |
| 5. La typographie bouge aussi | ✓ présent | sur les 5 page(s) |
| 6. Les scènes épinglées sont des gestes du métier | ✓ présent | geste du métier sur /appel-a-textes, /, /saison |
| 7. L’action principale a un retour physique | ✓ présent | sur /appel-a-textes, /contact |

Le script vérifie les marques (`data-grille`, `data-iris-centre`, forme du voile, `versObjet`) ; la force et la justesse de chaque point se jugent sur les captures et les films.

## Échecs

Aucun.

## À regarder

### numéro de version (1)

- **numéro de version** — ?v=1 est celui de la dernière livraison : à changer avant de livrer

### rechargement au milieu de la page (1)

- **rechargement au milieu de la page** — `/` — écran différent à la même position après rechargement (15.2 %), voir comparaisons/rechargement-*.png _(1366×768)_

### fluidité (1)

- **fluidité** — `/` — 6 % d'images de plus de 50 ms _(1366×768 défilement à la molette, processeur ralenti 4 fois)_

## Non lancé

- **Safari (WebKit)** : WebKit ne peut pas s’installer ici : vérification à faire dans Safari sur le Mac (liste dans le rapport)

### À vérifier dans Safari sur le Mac (WebKit indisponible ici)

- Ouverture de chaque page : rien qui clignote, intro complète au premier chargement et au rechargement.
- Changement de page : le voile couvre l’écran, pas de page blanche ; retour arrière sans intro ni voile resté.
- Défilement : fluide (natif), en-tête qui se cache et revient sans clignoter, sections épinglées entières.
- Menu sur iPhone (mode Responsive de Safari) : ouverture, fermeture, page bloquée derrière.
- Polices, images, mention « Illustration générée », formulaires et barre fixe du bas.

## Repères

- Numéro de version des fichiers : ?v=1
- Journal v1 : 7 étape(s) notée(s), 129 min de travail pour 135 min de budget, 11 min d’attente de l’utilisateur.
- Journal : « audit, regard neuf et corrections » 72 min pour 35 prévues.
- Accessibilité : axe-core 4.12.1 en plus des contrôles intégrés.
- Ouverture / (1366×768) : 2906 ms depuis le premier octet
- Ouverture /appel-a-textes (1366×768) : 2902 ms depuis le premier octet
- Ouverture /contact (1366×768) : 2880 ms depuis le premier octet
- Ouverture /hydre (1366×768) : 2896 ms depuis le premier octet
- Ouverture /saison (1366×768) : 2896 ms depuis le premier octet
- Ouverture / (390×844) : 2884 ms depuis le premier octet
- Ouverture /appel-a-textes (390×844) : 2903 ms depuis le premier octet
- Ouverture /contact (390×844) : 2882 ms depuis le premier octet
- Ouverture /hydre (390×844) : 2908 ms depuis le premier octet
- Ouverture /saison (390×844) : 2895 ms depuis le premier octet
- Bords de l’écran : 549 images d’intro, 10 de voile et 144 de menu jugées (panneau immobile couvrant tout l’écran), barre de défilement classique de 15 px.
- Aucun parcours propre au projet (_audit/parcours.mjs) : filtres, calculateurs, panier, réservation, fenêtres testés seulement par les contrôles généraux.
- Tient dans l'écran /appel-a-textes : aucune section épinglée ou plein écran.
- Tient dans l'écran /contact : aucune section épinglée ou plein écran.
- Tient dans l'écran /hydre : aucune section épinglée ou plein écran.
- Tient dans l'écran /saison : aucune section épinglée ou plein écran.
- Fluidité /appel-a-textes 1366×768 (molette) : 0 % d'images lentes sur 338, tâche la plus longue 0 ms
- Fluidité /contact 1366×768 (molette) : 0 % d'images lentes sur 180, tâche la plus longue 0 ms
- Fluidité /hydre 1366×768 (molette) : 0 % d'images lentes sur 292, tâche la plus longue 0 ms
- Fluidité /saison 1366×768 (molette) : 0 % d'images lentes sur 477, tâche la plus longue 0 ms
- Fluidité / 390×844 (doigt) : 0 % d'images lentes sur 1338, tâche la plus longue 0 ms
- Fluidité /appel-a-textes 390×844 (doigt) : 0 % d'images lentes sur 1337, tâche la plus longue 0 ms
- Fluidité /contact 390×844 (doigt) : 0 % d'images lentes sur 1338, tâche la plus longue 0 ms
- Fluidité /hydre 390×844 (doigt) : 0 % d'images lentes sur 1336, tâche la plus longue 0 ms
- Fluidité /saison 390×844 (doigt) : 0 % d'images lentes sur 1335, tâche la plus longue 0 ms
- Vitesse / : 0.62 s de calcul au chargement (téléphone ralenti).
- Vitesse /appel-a-textes : 0.51 s de calcul au chargement (téléphone ralenti).
- Vitesse /contact : 0.43 s de calcul au chargement (téléphone ralenti).
- Vitesse /hydre : 0.43 s de calcul au chargement (téléphone ralenti).
- Vitesse /saison : 0.53 s de calcul au chargement (téléphone ralenti).

## Fichiers

- Captures : `captures/` (téléphone, tablette, ordinateur, écran par écran)
- Films : `films/` (planches contact de l’ouverture, des transitions, des retours, des ancres et des épinglages ; ⚠ = image signalée)
- Comparaisons : `comparaisons/`
- Détail complet : `rapport.json`
