// Usage : node scripts/suggest-links.mjs <slug>
import fs from 'node:fs';
import path from 'node:path';
const slug = process.argv[2];
if (!slug) { console.log('Usage : node scripts/suggest-links.mjs <slug>'); process.exit(1); }
const idx = JSON.parse(fs.readFileSync('dist/search-index.json', 'utf8'));
const items = Array.isArray(idx) ? idx : idx.items || [];
const me = items.find(i => (i.url || '').replace(/\//g, '') === slug || (i.slug === slug));
if (!me) { console.log('Slug introuvable dans dist/search-index.json (lancez npm run build).'); process.exit(1); }
const words = new Set(`${me.title} ${me.desc || ''}`.toLowerCase().match(/[a-zà-ÿ]{4,}/g) || []);
const scored = items.filter(i => i !== me).map(i => ({ i, s: [...(`${i.title} ${i.desc || ''}`.toLowerCase().match(/[a-zà-ÿ]{4,}/g) || [])].filter(w => words.has(w)).length })).sort((a, b) => b.s - a.s).slice(0, 8);
console.log(`Suggestions de liens pour « ${me.title} » :`);
scored.forEach(({ i, s }) => console.log(` - ${i.url}  (${s})  ${i.title}`));
