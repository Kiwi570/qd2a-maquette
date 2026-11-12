# Rapport d’audit

Projet : `qd2a-maquette` · 12/11/2026 19:05:36 · 6 min · 4 page(s) · audit complet ciblé sur /appel-a-textes,/contact,/hydre,/saison (étapes : bords, ecran, mouvement, fluidite)

## Résumé

- Statut : **tout a tourné, aucun échec**
- Passe : `20261112-175940-complet-cible-partiel` · version ?v=4
- Échecs : **0**
- À regarder : **3**
- Non lancé : **0**
- Contrôles passés : bords de l’écran (5), fluidité (8), défilement selon l’appareil (5), mouvement (8), effets du plan (11), souris immobile (8)

## Passes de cette version (?v=4)

Chaque passe garde son rapport dans `_audit/passes/` : une relance ciblée ne fait pas disparaître la preuve d’une passe plus large.

| Passe | Niveau | Pages | Étapes | Échecs | À regarder | Non lancé | Statut |
|---|---|---|---|---:|---:|---:|---|
| 20261112-170642-rapide | rapide | toutes | toutes | 0 | 2 | 1 | complet |
| 20261112-171432-complet | complet | toutes | toutes | 29 | 4 | 1 | échecs |
| 20261112-174009-complet-cible-partiel | complet | /,/appel-a-textes,/contact,/hydre,/saison | fichiers, mesures | 9 | 0 | 0 | échecs |
| 20261112-174825-complet-cible-partiel | complet | /,/appel-a-textes,/contact,/hydre,/saison | fichiers, mesures | 3 | 0 | 0 | échecs |
| 20261112-175538-complet-cible-partiel | complet | /,/hydre | fichiers, mesures | 1 | 0 | 0 | échecs |
| 20261112-175817-complet-cible-partiel | complet | /hydre | fichiers, mesures | 0 | 0 | 0 | complet |
| **20261112-175940-complet-cible-partiel** (celle-ci) | complet | /appel-a-textes,/contact,/hydre,/saison | bords, ecran, mouvement, fluidite | 0 | 3 | 0 | complet |

## Échecs

Aucun.

## À regarder

### effet qui ne bouge pas au défilement (3)

- **effet qui ne bouge pas au défilement** — `/appel-a-textes` — div.trois-lecteurs.trois-lecteurs--grand — trois-lecteurs : il ne bouge ni au défilement ni tout seul à cette taille (effet au survol, au clic, ou réservé à l'ordinateur ?) ; il ne compte pas comme effet de section _(1366×768 normal, 390×844 normal)_
- **effet qui ne bouge pas au défilement** — `/saison` — ol.sommaire-liste — sommaire : il ne bouge ni au défilement ni tout seul à cette taille (effet au survol, au clic, ou réservé à l'ordinateur ?) ; il ne compte pas comme effet de section _(1366×768 normal, 390×844 normal)_
- **effet qui ne bouge pas au défilement** — `/hydre` — ul.tetes-liste — tetes : il ne bouge ni au défilement ni tout seul à cette taille (effet au survol, au clic, ou réservé à l'ordinateur ?) ; il ne compte pas comme effet de section _(390×844 normal)_

## Non lancé

Tout a été lancé.


## Repères

- Accessibilité : axe-core 4.12.1 en plus des contrôles intégrés.
- bords de l’écran /appel-a-textes 1920×1080 : réussi à la tentative 2 (avant : cdpSession.send: Protocol error (Page.startScreencast): Not attached to an active page)
- Bords de l’écran : 487 images d’intro, 8 de voile et 116 de menu jugées (panneau immobile couvrant tout l’écran), barre de défilement classique de 15 px.
- Tient dans l'écran /appel-a-textes : aucune section épinglée ou plein écran.
- Tient dans l'écran /contact : aucune section épinglée ou plein écran.
- Tient dans l'écran /hydre : aucune section épinglée ou plein écran.
- Tient dans l'écran /saison : aucune section épinglée ou plein écran.
- Fluidité /appel-a-textes 1366×768 (molette) : 0 % d'images lentes sur 227, tâche la plus longue 0 ms
- Fluidité /contact 1366×768 (molette) : 0 % d'images lentes sur 175, tâche la plus longue 0 ms
- Fluidité /hydre 1366×768 (molette) : 0 % d'images lentes sur 238, tâche la plus longue 0 ms
- Fluidité /saison 1366×768 (molette) : 0 % d'images lentes sur 330, tâche la plus longue 0 ms
- Fluidité /appel-a-textes 390×844 (doigt) : 0 % d'images lentes sur 1342, tâche la plus longue 0 ms
- Fluidité /contact 390×844 (doigt) : 0 % d'images lentes sur 1337, tâche la plus longue 0 ms
- Fluidité /hydre 390×844 (doigt) : 0 % d'images lentes sur 1334, tâche la plus longue 0 ms
- Fluidité /saison 390×844 (doigt) : 0 % d'images lentes sur 1343, tâche la plus longue 0 ms

## Fichiers

- Captures : `captures/` (téléphone, tablette, ordinateur, écran par écran)
- Films : `films/` (planches contact de l’ouverture, des transitions, des retours, des ancres et des épinglages ; ⚠ = image signalée)
- Comparaisons : `comparaisons/`
- Détail complet : `rapport.json`
