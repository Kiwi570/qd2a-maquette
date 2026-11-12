#!/usr/bin/env python3
"""Mosaïques de visages du Q (accueil de la v2) : une image par forme du logo, remplie des vrais portraits
(lecteurs des quatre comités, coups de cœur, lauréate), au cadre de la forme (donnees/logo.json, unités du dessin).
Usage : python3 -I outils/mosaiques-q.py
Sortie : assets/images/site/q/<cle>.webp (2,4 px par unité du dessin : net jusqu'à environ 1,2 fois sa taille en écran 2x).
"""
import json, math
from pathlib import Path
from PIL import Image, ImageOps

R = Path(__file__).resolve().parent.parent
logo = json.loads((R / 'donnees/logo.json').read_text())
lecteurs = json.loads((R / 'donnees/lecteurs.json').read_text())['lecteurs']
K = 2.4
SORTIE = R / 'assets/images/site/q'
SORTIE.mkdir(parents=True, exist_ok=True)

def visages(pays):
    return [R / 'assets/images' / (x['image'] + '-320.webp') for x in lecteurs if x['pays'] == pays]

SOURCES = {
    'france': (visages('france'), 40),
    'cameroun': (visages('cameroun'), 36),
    'belgique': (visages('belgique'), 40),
    'canada': (visages('canada'), 48),
    'coups': ([R / 'assets/images/site' / f for f in ['nicolas-757.webp', 'okbi-900.webp', 'nzila-900.webp', 'porcher-jouve-550.webp']], 70),
}

def carre(chemin, cote, haut=0.3):
    im = Image.open(chemin).convert('RGB')
    w, h = im.size
    c = min(w, h)
    x = (w - c) // 2
    y = int(max(0, min(h - c, (h - c) * haut)))
    return im.crop((x, y, x + c, y + c)).resize((cote, cote), Image.LANCZOS)

for p in logo['pieces']:
    x0, y0, x1, y1 = p['bbox']
    x0 -= 3; y0 -= 3; x1 += 3; y1 += 3
    W, H = round((x1 - x0) * K), round((y1 - y0) * K)
    toile = Image.new('RGB', (W, H), p['couleur'])
    if p['cle'] == 'laureate':
        im = Image.open(R / 'assets/images/site/mazunya-portrait-800.webp').convert('RGB')
        toile = ImageOps.fit(im, (W, H), Image.LANCZOS, centering=(0.5, 0.18))
    else:
        faces, s = SOURCES[p['cle']]
        cote = round(s * K)
        nx, ny = math.ceil(W / cote), math.ceil(H / cote)
        # Décalage d'une demi-case une rangée sur deux : la grille ne fait pas damier.
        k = 0
        for j in range(ny + 1):
            dec = (cote // 2) if j % 2 else 0
            for i in range(-1, nx + 1):
                toile.paste(carre(faces[k % len(faces)], cote), (i * cote + dec, j * cote))
                k += 1
    chemin = SORTIE / f"{p['cle']}.webp"
    q = 80
    while True:
        toile.save(chemin, 'WEBP', quality=q, method=6)
        if chemin.stat().st_size < 140_000 or q <= 56:
            break
        q -= 6
    print(p['cle'], toile.size, chemin.stat().st_size // 1024, 'Ko', 'cadre', [x0, y0, x1 - x0, y1 - y0])
