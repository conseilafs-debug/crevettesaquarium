// Mini-parseur Markdown sans dépendance, limité aux besoins éditoriaux du site.
// Supporté : ## ###, paragraphes, listes, tableaux, citations, **gras**, *italique*, `code`, [lien](url),
// encadrés (:::tip / :::warning / :::mistake / :::note), bloc produits (@@products clé1 clé2),
// section FAQ (## FAQ puis ### question + réponse).

export const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const slugify = (s) =>
  String(s)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/œ/g, 'oe')
    .replace(/æ/g, 'ae')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const plain = (html) =>
  String(html)
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();

export function inline(src, ctx = {}) {
  let t = esc(src);
  const stash = [];
  const keep = (h) => '\u0000' + (stash.push(h) - 1) + '\u0000';
  t = t.replace(/`([^`]+)`/g, (m, c) => keep('<code>' + c + '</code>'));
  t = t.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, txt, href) => {
    href = href.replace(/&amp;/g, '&');
    if (href.startsWith('/')) {
      (ctx.links ||= []).push(href);
      return keep(`<a href="${esc(href)}">${txt}</a>`);
    }
    if (/^https?:\/\//.test(href)) {
      return keep(`<a href="${esc(href)}" rel="noopener" target="_blank">${txt}</a>`);
    }
    return keep(`<a href="${esc(href)}">${txt}</a>`);
  });
  t = t.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  t = t.replace(/(^|[\s(>])\*([^*\s][^*]*?)\*(?=[\s).,;:!?<]|$)/g, '$1<em>$2</em>');
  t = t.replace(/\u0000(\d+)\u0000/g, (m, i) => stash[+i]);
  return t;
}

const CALLOUTS = { tip: 'Conseil', warning: 'Attention', mistake: 'Erreur à éviter', note: 'À savoir' };

const isSpecial = (l) => /^(#{2,3}\s|:::|@@|\||[-*]\s|\d+\.\s|>\s?|---+\s*$)/.test(l);

export function parseMarkdown(src, ctx = {}) {
  const lines = String(src).replace(/\r/g, '').split('\n');
  const html = [];
  const toc = [];
  const faq = [];
  let i = 0;
  let inFaq = false;

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i++;
      continue;
    }
    let m;

    // Titres
    if ((m = line.match(/^(#{2,3})\s+(.+?)\s*$/))) {
      const level = m[1].length;
      const text = m[2];
      if (inFaq && level === 3) {
        i++;
        const buf = [];
        while (i < lines.length && !/^#{2,3}\s/.test(lines[i])) buf.push(lines[i++]);
        const ans = parseMarkdown(buf.join('\n'), ctx).html;
        faq.push({ q: plain(inline(text)), a: plain(ans) });
        html.push(
          `<details class="faq-item"><summary>${inline(text, ctx)}</summary><div class="faq-a">${ans}</div></details>`
        );
        continue;
      }
      if (inFaq) {
        html.push('</section>');
        inFaq = false;
      }
      const id = slugify(plain(inline(text)));
      if (level === 2) {
        toc.push({ id, text: plain(inline(text)) });
        if (/^faq\b/i.test(text)) {
          if (ctx.beforeFaq && !ctx.productsInserted) {
            html.push(ctx.beforeFaq());
            ctx.productsInserted = true;
          }
          inFaq = true;
          html.push(`<section class="faq" aria-labelledby="${id}"><h2 id="${id}">${inline(text, ctx)}</h2>`);
          i++;
          continue;
        }
      }
      html.push(`<h${level} id="${id}">${inline(text, ctx)}</h${level}>`);
      i++;
      continue;
    }

    // Encadrés
    if ((m = line.match(/^:::(\w+)\s*(.*)$/))) {
      const type = m[1];
      const title = m[2] || CALLOUTS[type] || 'Note';
      i++;
      const buf = [];
      while (i < lines.length && !/^:::\s*$/.test(lines[i])) buf.push(lines[i++]);
      i++;
      const inner = parseMarkdown(buf.join('\n'), ctx).html;
      html.push(`<aside class="callout callout-${type}"><p class="callout-title">${esc(title)}</p>${inner}</aside>`);
      continue;
    }

    // Emplacement de l'outil interactif
    if (/^@@tool\s*$/.test(line)) {
      html.push('<!--tool-->');
      i++;
      continue;
    }

    // Bloc produits
    if ((m = line.match(/^@@products\s+(.+)$/))) {
      if (ctx.products) html.push(ctx.products(m[1].split(/[,\s]+/).filter(Boolean)));
      ctx.productsInserted = true;
      i++;
      continue;
    }

    // Tableaux
    if (line.startsWith('|')) {
      const rows = [];
      while (i < lines.length && lines[i].startsWith('|')) rows.push(lines[i++]);
      const cells = (r) => r.replace(/^\||\|\s*$/g, '').split('|').map((c) => c.trim());
      const head = cells(rows[0]);
      const hasSep = /^\|[\s:|-]+\|?\s*$/.test(rows[1] || '');
      const body = rows.slice(hasSep ? 2 : 1).map(cells);
      html.push(
        `<div class="table-wrap" role="region" aria-label="Tableau" tabindex="0"><table><thead><tr>${head
          .map((c) => `<th scope="col">${inline(c, ctx)}</th>`)
          .join('')}</tr></thead><tbody>${body
          .map((r) => `<tr>${r.map((c, k) => (k === 0 ? `<th scope="row">${inline(c, ctx)}</th>` : `<td>${inline(c, ctx)}</td>`)).join('')}</tr>`)
          .join('')}</tbody></table></div>`
      );
      continue;
    }

    // Listes
    if (/^[-*]\s/.test(line)) {
      const items = [];
      while (i < lines.length && /^[-*]\s/.test(lines[i])) items.push(lines[i++].replace(/^[-*]\s+/, ''));
      html.push(`<ul>${items.map((x) => `<li>${inline(x, ctx)}</li>`).join('')}</ul>`);
      continue;
    }
    if (/^\d+\.\s/.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) items.push(lines[i++].replace(/^\d+\.\s+/, ''));
      html.push(`<ol>${items.map((x) => `<li>${inline(x, ctx)}</li>`).join('')}</ol>`);
      continue;
    }

    // Citation
    if (/^>\s?/.test(line)) {
      const buf = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) buf.push(lines[i++].replace(/^>\s?/, ''));
      html.push(`<blockquote>${parseMarkdown(buf.join('\n'), ctx).html}</blockquote>`);
      continue;
    }

    if (/^---+\s*$/.test(line)) {
      html.push('<hr>');
      i++;
      continue;
    }

    // Paragraphe
    const buf = [line];
    i++;
    while (i < lines.length && lines[i].trim() && !isSpecial(lines[i])) buf.push(lines[i++]);
    html.push(`<p>${inline(buf.join(' '), ctx)}</p>`);
  }
  if (inFaq) html.push('</section>');
  return { html: html.join('\n'), toc, faq };
}
