document.addEventListener('DOMContentLoaded', () => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const selectors = [
    '.game--section-giaom0',
    '.bonus--section-giaom0',
    '.games-list-giaom0 > .game-card-link-giaom0',
    '.bonus-list-giaom0 > .bonus-card-giaom0',
    '#seo-content-inject-giaom0 section',
    '#seo-content-inject-giaom0 article.modern-card-giaom0',
    '.simple-action-article',
    '.h3-card',
  ];

  const targets = new Set();
  selectors.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el) => targets.add(el));
  });
  if (!targets.size) return;

  const items = [...targets];
  const EASE = 'cubic-bezier(0.22, 0.61, 0.36, 1)';

  // Step 1: hide instantly (transition:none) so there's no fade-OUT on load,
  // overriding any pre-existing CSS transition on these elements.
  // Inline !important outranks the stylesheet's existing !important rules.
  items.forEach((el) => {
    el.style.setProperty('transition', 'none', 'important');
    el.style.setProperty('opacity', '0', 'important');
    el.style.setProperty('transform', 'translateY(28px)', 'important');
    el.style.setProperty('will-change', 'opacity, transform');
    const parent = el.parentElement;
    const sibs = parent ? [...parent.children].filter((c) => targets.has(c)) : [el];
    const idx = Math.max(0, sibs.indexOf(el));
    el.style.setProperty('transition-delay', Math.min(idx * 70, 420) + 'ms', 'important');
  });

  // Step 2: force a reflow so the hidden state is committed before transitions exist.
  void document.body.offsetHeight;

  // Step 3: now attach the transition — only the reveal (0 -> 1) will animate.
  items.forEach((el) => {
    el.style.setProperty('transition', `opacity 620ms ${EASE}, transform 620ms ${EASE}`, 'important');
  });

  const show = (el) => {
    el.style.setProperty('opacity', '1', 'important');
    el.style.setProperty('transform', 'none', 'important');
  };

  let pending = items.slice();
  let ticking = false;

  const reveal = () => {
    ticking = false;
    const trigger = window.innerHeight * 0.9;
    pending = pending.filter((el) => {
      if (el.getBoundingClientRect().top < trigger) {
        show(el);
        return false;
      }
      return true;
    });
    if (!pending.length) {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    }
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(reveal);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  reveal();
});
