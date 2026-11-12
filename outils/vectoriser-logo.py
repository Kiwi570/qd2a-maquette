import cv2, numpy as np, json, sys
src = sys.argv[1]; out = sys.argv[2]
im0 = cv2.imread(src); im0 = cv2.resize(im0, None, fx=3, fy=3, interpolation=cv2.INTER_CUBIC)
im = im0[:, :, ::-1].astype(np.int32)  # RGB
pal = {'fond': (35, 31, 32), 'q': (255, 255, 255), 'orange': (216, 120, 60), 'vert': (84, 120, 72), 'turquoise': (96, 156, 144),
       'ocre': (228, 168, 72), 'rouge': (144, 48, 48), 'violet': (72, 24, 60)}
noms = list(pal); P = np.array([pal[n] for n in noms])
d = ((im[:, :, None, :] - P[None, None, :, :]) ** 2).sum(-1)
lab = d.argmin(-1)
H, W = lab.shape
res = {'largeur': W // 3, 'hauteur': H // 3, 'pieces': {}}
k = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (9, 9)); kd = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7))
def chemin(mask, eps):
    cs, hi = cv2.findContours(mask, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_NONE)
    parts = []
    for c in cs:
        if cv2.contourArea(c) < 500: continue
        a = cv2.approxPolyDP(c, eps, True).reshape(-1, 2).astype(float)
        for _ in range(2):
            b = np.roll(a, -1, 0); a = np.concatenate([(0.75 * a + 0.25 * b)[:, None], (0.25 * a + 0.75 * b)[:, None]], 1).reshape(-1, 2)
        a = a / 3
        parts.append('M' + ' L'.join(f'{x:.1f} {y:.1f}' for x, y in a) + ' Z')
    return ' '.join(parts)
for i, n in enumerate(noms):
    if n == 'fond': continue
    m = (lab == i).astype(np.uint8) * 255
    m = cv2.morphologyEx(m, cv2.MORPH_OPEN, k); m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, k)
    if n != 'q': m = cv2.dilate(m, kd)
    ys, xs = np.nonzero(m)
    if not len(xs): continue
    res['pieces'][n] = {'d': chemin(m, 2.2), 'bbox': [int(xs.min()/3), int(ys.min()/3), int(xs.max()/3), int(ys.max()/3)], 'aire': int((m > 0).sum()/9),
                        'couleur': '#%02x%02x%02x' % tuple(int(v) for v in im[lab == i].mean(0))}
json.dump(res, open(out, 'w'), indent=1)
for n, p in res['pieces'].items(): print(n, p['bbox'], p['aire'], p['couleur'], len(p['d']))
