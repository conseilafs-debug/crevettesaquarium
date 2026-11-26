// Génère (une fois) les icônes PNG et l'image Open Graph à partir des illustrations SVG.
// Nécessite rsvg-convert (librsvg). Les PNG produits sont committés dans public/ : inutile de relancer à chaque build.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { faviconSvg, sceneSvg } from '../src/lib/svg.mjs';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const pub = path.join(root, 'public');
const tmp = fs.mkdtempSync('/tmp/assets-');
const png = (svg, out, w, h) => {
  const f = path.join(tmp, path.basename(out) + '.svg');
  fs.writeFileSync(f, svg);
  execFileSync('rsvg-convert', ['-w', String(w), '-h', String(h), '-o', path.join(pub, out), f]);
};

fs.writeFileSync(path.join(pub, 'favicon.svg'), faviconSvg());
png(faviconSvg(), 'apple-touch-icon.png', 180, 180);
png(faviconSvg(), 'logo-512.png', 512, 512);

const scene = Buffer.from(sceneSvg({ scene: 'default' })).toString('base64');
const og = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1200 630" width="1200" height="630">
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0f5257"/><stop offset="1" stop-color="#1c7a70"/></linearGradient></defs>
<rect width="1200" height="630" fill="url(#g)"/>
<image href="data:image/svg+xml;base64,${scene}" x="700" y="110" width="450" height="281"/>
<text x="70" y="240" font-family="DejaVu Serif" font-weight="700" font-size="72" fill="#fff">Crevettes</text>
<text x="70" y="326" font-family="DejaVu Serif" font-weight="700" font-size="72" fill="#fff">Aquarium</text>
<text x="70" y="400" font-family="DejaVu Sans" font-size="27" fill="#cfe6e2">Le guide pratique des crevettes d’eau douce</text>
<text x="70" y="450" font-family="DejaVu Sans" font-size="24" fill="#9fcfc8">Espèces · Eau · Aquarium · Reproduction · Problèmes</text>
</svg>`;
png(og, 'og-default.png', 1200, 630);
console.log('Assets générés dans public/');
