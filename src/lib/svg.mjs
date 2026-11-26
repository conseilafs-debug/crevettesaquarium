// Illustrations originales générées en SVG (aucune photo tierce, aucun droit à gérer).

const BODY = 'M46 100 C60 60 110 40 148 62 C178 80 176 122 138 134';

/** Crevette stylisée. Coordonnées locales ~ 0..190 x 30..150. */
export function shrimp({ color = '#d8452f', pattern = 'solid', scale = 1, x = 0, y = 0 } = {}) {
  const dark = '#2b2b2b';
  const seg = `<path d="${BODY}" pathLength="100" fill="none" stroke="#fff" stroke-opacity=".22" stroke-width="38" stroke-dasharray="0.7 6.3"/>`;
  let base = color;
  let baseOpacity = 1;
  let overlay = seg;
  let fan = color;
  if (pattern === 'banded') {
    base = '#f4efe6';
    fan = color;
    overlay = `<path d="${BODY}" pathLength="100" fill="none" stroke="${color}" stroke-width="38" stroke-dasharray="11 11"/>`;
  } else if (pattern === 'tiger') {
    base = '#cdb594';
    fan = '#cdb594';
    overlay = `<path d="${BODY}" pathLength="100" fill="none" stroke="#3a2b1c" stroke-width="38" stroke-dasharray="2.2 7.4"/>`;
  } else if (pattern === 'rili') {
    base = '#d6e6ea';
    baseOpacity = 0.85;
    fan = color;
    overlay = `<path d="${BODY}" pathLength="100" fill="none" stroke="${color}" stroke-width="38" stroke-dasharray="20 58 22 100"/>`;
  } else if (pattern === 'clear') {
    base = '#c5d3ca';
    baseOpacity = 0.9;
    fan = '#c5d3ca';
    overlay = `<path d="${BODY}" transform="translate(0 4)" pathLength="100" fill="none" stroke="#6b4a3a" stroke-width="3" stroke-linecap="round" stroke-dasharray="0.01 6"/>`;
  }
  const legs = [
    [58, 84, 54, 106],
    [70, 74, 66, 98],
    [84, 66, 82, 90],
    [98, 62, 98, 86],
    [112, 60, 113, 84],
  ]
    .map(([a, b, c, d]) => `<path d="M${a} ${b} L${c} ${d}" stroke="${dark}" stroke-opacity=".45" stroke-width="2.6" stroke-linecap="round"/>`)
    .join('');
  const fanEls = [10, 35, -15]
    .map((r) => `<ellipse cx="126" cy="138" rx="21" ry="9" transform="rotate(${r + 165} 126 138)" fill="${fan}" opacity=".95"/>`)
    .join('');
  return `<g transform="translate(${x} ${y}) scale(${scale})">
<path d="M40 96 C22 70 12 52 2 40 M40 102 C20 102 8 94 0 88" fill="none" stroke="${dark}" stroke-opacity=".5" stroke-width="1.8" stroke-linecap="round"/>
${legs}
${fanEls}
<path d="${BODY}" fill="none" stroke="${base}" stroke-opacity="${baseOpacity}" stroke-width="38" stroke-linecap="round"/>
${overlay}
<ellipse cx="66" cy="88" rx="34" ry="27" transform="rotate(-22 66 88)" fill="${base}" fill-opacity="${baseOpacity}"/>
<path d="M44 100 C56 112 76 112 92 100" fill="none" stroke="#000" stroke-opacity=".10" stroke-width="5" stroke-linecap="round"/>
<path d="${BODY}" transform="translate(0 9)" fill="none" stroke="#000" stroke-opacity=".12" stroke-width="10" stroke-linecap="round"/>
<path d="${BODY}" transform="translate(0 -9)" fill="none" stroke="#fff" stroke-opacity=".28" stroke-width="5" stroke-linecap="round"/>
<path d="M34 90 L12 80" stroke="${dark}" stroke-opacity=".6" stroke-width="4" stroke-linecap="round"/>
<circle cx="48" cy="84" r="6" fill="#fff"/><circle cx="49.6" cy="84" r="3.2" fill="${dark}"/>
</g>`;
}

const plant = (x, h, color, lean = 0, w = 6) =>
  `<path d="M${x} 345 C${x - 14 + lean} ${345 - h * 0.35} ${x + 18 + lean} ${345 - h * 0.7} ${x + lean} ${345 - h}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>`;

const GLYPHS = {
  drop: '<path d="M12 3C12 3 5 11 5 15a7 7 0 0 0 14 0C19 11 12 3 12 3z"/>',
  leaf: '<path d="M5 19C5 9 12 4 20 4c0 8-5 15-15 15z"/><path d="M5 19L14 10"/>',
  eggs: '<circle cx="8" cy="14" r="3"/><circle cx="15" cy="12" r="3"/><circle cx="12" cy="18" r="3"/>',
  fish: '<path d="M3 12C7 6 14 6 18 12 14 18 7 18 3 12z"/><path d="M18 12L22 8M18 12L22 16"/>',
  alert: '<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16.5v.5"/>',
  sprout: '<path d="M12 21V11"/><path d="M12 13C12 8 8 6 4 6c0 4 3 7 8 7z"/><path d="M12 11c0-4 3-6 7-6 0 4-3 6-7 6z"/>',
  tank: '<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 12c3-2 6 2 9 0s6 2 9 0"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/>',
  tag: '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.2"/>',
  dots: '<circle cx="7" cy="14" r="3"/><circle cx="17" cy="14" r="3"/><circle cx="12" cy="7" r="3"/>',
  page: '<path d="M6 3h9l4 4v14H6z"/><path d="M9 12h7M9 16h7"/>',
};

export const scenes = {
  default: { water: ['#dff2ef', '#8fcfca'], soil: '#6b5440', plant: ['#2f7d4f', '#4aa36b'], shrimp: '#d8452f', glyph: 'drop' },
  'bien-debuter': { water: ['#e4f4ec', '#9fd8bf'], soil: '#6b5440', plant: ['#2f7d4f', '#5fb27a'], shrimp: '#d8452f', glyph: 'sprout' },
  especes: { water: ['#dcecf6', '#8bbbe0'], soil: '#4d3d31', plant: ['#2f7d4f', '#4aa36b'], shrimp: '#2c7fd1', glyph: 'dots' },
  aquarium: { water: ['#d9f0f2', '#7fc6cf'], soil: '#7a6551', plant: ['#2f7d4f', '#3f9b6b'], shrimp: '#ee7a1d', glyph: 'tank' },
  'eau-parametres': { water: ['#d4eef6', '#74bcd6'], soil: '#5a4a3a', plant: ['#2b7a5a', '#46a07c'], shrimp: '#d8452f', glyph: 'drop' },
  alimentation: { water: ['#e8f3df', '#a9d38d'], soil: '#6b5440', plant: ['#3f8f4f', '#6dbb73'], shrimp: '#f0b429', glyph: 'leaf' },
  reproduction: { water: ['#f4e8ee', '#e5b4c6'], soil: '#6b5440', plant: ['#3f8f4f', '#5fb27a'], shrimp: '#c92a2a', glyph: 'eggs' },
  cohabitation: { water: ['#dff0f5', '#8cc9dc'], soil: '#6b5440', plant: ['#2f7d4f', '#4aa36b'], shrimp: '#d8452f', glyph: 'fish' },
  problemes: { water: ['#f8ecd8', '#e4bf86'], soil: '#5a4636', plant: ['#5d8a4e', '#7aa563'], shrimp: '#d8452f', glyph: 'alert' },
  materiel: { water: ['#e0e8f0', '#9bb5cc'], soil: '#53483e', plant: ['#2f7d4f', '#4aa36b'], shrimp: '#2c7fd1', glyph: 'gear' },
  'guides-achat': { water: ['#e0eef0', '#92c3c9'], soil: '#53483e', plant: ['#2f7d4f', '#4aa36b'], shrimp: '#ee7a1d', glyph: 'tag' },
  blog: { water: ['#e8e6f4', '#b3add9'], soil: '#4f4338', plant: ['#2f7d4f', '#4aa36b'], shrimp: '#8a1c3c', glyph: 'page' },
};

/** Scène d'aquarium 640x400. */
export function sceneSvg({ scene = 'default', color, pattern = 'solid', label = 'Illustration d’un aquarium à crevettes' } = {}) {
  const s = scenes[scene] || scenes.default;
  const c = color || s.shrimp;
  const [w1, w2] = s.water;
  const glyph = GLYPHS[s.glyph] || GLYPHS.drop;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400" width="640" height="400" role="img" aria-label="${label}">
<defs><linearGradient id="w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${w1}"/><stop offset="1" stop-color="${w2}"/></linearGradient></defs>
<rect width="640" height="400" fill="url(#w)"/>
<polygon points="80,0 150,0 260,400 120,400" fill="#fff" opacity=".08"/>
<polygon points="320,0 380,0 470,400 360,400" fill="#fff" opacity=".07"/>
<path d="M0 335 Q160 312 320 332 T640 322 V400 H0Z" fill="${s.soil}"/>
<path d="M0 360 Q200 345 400 362 T640 352 V400 H0Z" fill="#000" opacity=".12"/>
${plant(60, 150, s.plant[0], 14)}${plant(84, 110, s.plant[1], -10)}${plant(110, 170, s.plant[0], 18)}
${plant(530, 140, s.plant[1], -16)}${plant(556, 190, s.plant[0], 12)}${plant(584, 120, s.plant[1], -8)}
<ellipse cx="450" cy="344" rx="42" ry="17" fill="#8a8f93"/><ellipse cx="438" cy="338" rx="26" ry="10" fill="#a4a9ac"/>
<ellipse cx="190" cy="346" rx="28" ry="11" fill="#7f8488"/>
${shrimp({ color: c, pattern, scale: 1.7, x: 170, y: 70 })}
<g fill="#fff" opacity=".5"><circle cx="440" cy="120" r="6"/><circle cx="458" cy="86" r="4"/><circle cx="470" cy="150" r="3"/><circle cx="130" cy="90" r="4"/></g>
<g transform="translate(560 24) scale(2)" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" opacity=".8">${glyph}</g>
</svg>`;
}

export function speciesSvg(sp) {
  return sceneSvg({
    scene: sp.group === 'neocaridina' ? 'especes' : 'aquarium',
    color: sp.hex,
    pattern: sp.pattern,
    label: `Illustration stylisée d’une crevette ${sp.name}`,
  });
}

export function faviconSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#0f5257"/><g transform="translate(8 6) scale(0.31)">${shrimp({ color: '#ff7a59', pattern: 'solid' }).replace(/^<g[^>]*>/, '<g>')}</g></svg>`;
}

export function logoMark() {
  return `<svg class="logo" viewBox="0 0 64 64" width="32" height="32" aria-hidden="true" focusable="false"><rect width="64" height="64" rx="14" fill="#0f5257"/><g transform="translate(8 6) scale(0.31)">${shrimp({ color: '#ff7a59', pattern: 'solid' }).replace(/^<g[^>]*>/, '<g>')}</g></svg>`;
}
