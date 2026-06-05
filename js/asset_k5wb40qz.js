document.addEventListener('DOMContentLoaded', () => {
  const ICONS = ['\u{1F3B0}', '\u{1F3B2}', '\u{1F0CF}', '\u{1F4B0}', '\u{1FA99}', '\u{1F48E}', '\u{1F381}', '\u{1F3C6}', '\u{1F451}', '\u{1F514}', '\u{1F352}', '\u{1F3AF}', '♠️', '♥️', '♦️', '♣️'];
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const isFreeH3 = (el) =>
    el.nodeType === 1 &&
    el.tagName === 'H3' &&
    !el.classList.contains('accordion-header-giaom0') &&
    !el.classList.contains('bonus-card--body__heading-giaom0') &&
    el.textContent.trim().length > 0;

  const freeHeads = (article) => [...article.children].filter(isFreeH3);

  const articles = [...document.querySelectorAll('#seo-content-inject-giaom0 article.modern-card-giaom0')];
  const eligible = articles.filter((a) => freeHeads(a).length >= 2);
  if (!eligible.length) return;

  // Apply to RANDOM sections, not every one. Keep at least one if any qualify.
  let selected = eligible.filter(() => Math.random() < 0.6);
  if (!selected.length) selected = [pick(eligible)];

  selected.forEach((article) => {
    const heads = freeHeads(article);
    const headSet = new Set(heads);

    // Pre-compute each card's nodes (heading + following content up to the next heading).
    const groups = heads.map((h) => {
      const nodes = [h];
      let n = h.nextSibling;
      while (n && !headSet.has(n)) {
        nodes.push(n);
        n = n.nextSibling;
      }
      return nodes;
    });

    const grid = document.createElement('div');
    grid.className = 'h3-card-grid';
    grid.style.gridTemplateColumns = `repeat(${heads.length}, 1fr)`;
    article.insertBefore(grid, heads[0]);

    groups.forEach((nodes) => {
      const card = document.createElement('div');
      card.className = 'h3-card';

      const h3 = nodes[0];
      const icon = document.createElement('span');
      icon.className = 'h3-card__icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = pick(ICONS);
      h3.insertBefore(icon, h3.firstChild);

      nodes.forEach((n) => card.appendChild(n));
      grid.appendChild(card);
    });
  });
});
