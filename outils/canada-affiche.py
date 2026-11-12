#!/usr/bin/env python3
"""Découpe les portraits de l'affiche du QD2A Canada (recu/site/qd2a-recu/qd2a-canada.png) qui ne sont pas
déjà publiés en portrait individuel (canada-02 et canada-03 y figurent) : site/lecteurs/canada-04 à canada-09.
Usage : python3 -I outils/canada-affiche.py
Résolution de l'affiche : environ 236 px par portrait ; à remplacer par les originaux quand le Quartier les fournit."""
from pathlib import Path
from PIL import Image

RACINE = Path(__file__).resolve().parent.parent
src = Image.open(RACINE / 'recu/site/qd2a-recu/qd2a-canada.png').convert('RGB')
s = src.width / 700
cases = [((58, 188), (102, 226)), ((210, 338), (102, 226)), ((510, 640), (102, 226)),
         ((58, 188), (318, 442)), ((364, 492), (318, 442)), ((518, 646), (318, 442))]
for k, ((x0, x1), (y0, y1)) in enumerate(cases):
    cx, h = round((x0 + x1) / 2 * s), round((y1 - y0 - 4) * s)
    top = round((y0 + 2) * s)
    img = src.crop((cx - h // 2, top, cx - h // 2 + h, top + h))
    for w in (160, 320):
        out = img.resize((w, w), Image.LANCZOS) if img.width > w else img
        p = RACINE / f'assets/images/site/lecteurs/canada-{k + 4:02d}-{w}.webp'
        out.save(p, 'WEBP', quality=82, method=6)
        print(p.name, out.size)
