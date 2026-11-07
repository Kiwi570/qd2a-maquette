#!/usr/bin/env python3
"""Produit les variantes WebP du projet (remplace ici produire.mjs de la bibliothèque, refusé dans la session).
Usage : python3 -I outils/produire-images.py outils/lot-images.json
Chaque entrée : {"source", "nom", "largeurs": [..], "source_mobile"?: "...", "largeurs_mobile"?: [..],
                 "ratio"?: "4:5", "cadrage"?: [x, y] (en %, pour un recadrage au ratio)}
- jamais d'agrandissement : une largeur plus grande que la source est ramenée à la largeur de la source ;
- qualité 80, baissée par paliers si un fichier dépasse 300 Ko.
"""
import json, sys
from pathlib import Path
from PIL import Image, ImageOps

RACINE = Path(__file__).resolve().parent.parent
SORTIE = RACINE / 'assets/images'


def recadrer(img, ratio, cx, cy):
    w, h = img.size
    a, b = map(float, ratio.split(':'))
    r = a / b
    if w / h > r:
        nw = round(h * r)
        x = min(max(0, round(w * cx / 100 - nw / 2)), w - nw)
        return img.crop((x, 0, x + nw, h))
    nh = round(w / r)
    y = min(max(0, round(h * cy / 100 - nh / 2)), h - nh)
    return img.crop((0, y, w, y + nh))


def ecrire(img, chemin, largeur):
    if img.width > largeur:
        img = img.resize((largeur, round(img.height * largeur / img.width)), Image.LANCZOS)
    chemin.parent.mkdir(parents=True, exist_ok=True)
    q = 80
    while True:
        img.save(chemin, 'WEBP', quality=q, method=6)
        if chemin.stat().st_size <= 300_000 or q <= 50:
            break
        q -= 8
    return img.width, chemin.stat().st_size


def ouvrir(p):
    img = Image.open(RACINE / p)
    img = ImageOps.exif_transpose(img)
    return img.convert('RGBA' if img.mode in ('RGBA', 'LA', 'P') else 'RGB')


def traiter(src, nom, largeurs, ratio=None, cadrage=(50, 50)):
    img = ouvrir(src)
    if ratio:
        img = recadrer(img, ratio, *cadrage)
    faites = set()
    for l in sorted(largeurs):
        l = min(l, img.width)
        if l in faites:
            continue
        faites.add(l)
        w, poids = ecrire(img, SORTIE / f'{nom}-{l}.webp', l)
        print(f'{nom}-{l}.webp  {poids // 1024} Ko')


lot = json.load(open(sys.argv[1]))
for e in lot:
    traiter(e['source'], e['nom'], e.get('largeurs', [640, 1280]), e.get('ratio'), e.get('cadrage', (50, 50)))
    if e.get('source_mobile'):
        traiter(e['source_mobile'], e['nom'] + '-mobile', e.get('largeurs_mobile', [540, 784]))
