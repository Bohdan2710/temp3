document.addEventListener('DOMContentLoaded', () => {
  
  const header = document.querySelector('header');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 0) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  
  const menuToggler = document.querySelector('.navbar-toggler-giaom0');
  const navMenu = document.querySelector('.header__navigation-giaom0');
  if (menuToggler && navMenu) {
    menuToggler.classList.add('collapsed-giaom0');
    menuToggler.addEventListener('click', () => {
      navMenu.classList.toggle('show');
      menuToggler.classList.toggle('collapsed-giaom0');
      document.body.style.overflow = navMenu.classList.contains('show') ? 'hidden' : '';
    });
    navMenu.querySelectorAll('a').forEach(link => {
      
      if (link.closest('.has-submenu-giaom0') && link.dataset.submenuToggle === 'true') return;
      link.addEventListener('click', () => {
        navMenu.classList.remove('show');
        menuToggler.classList.add('collapsed-giaom0');
        document.body.style.overflow = '';
      });
    });
  }

  
  document.querySelectorAll('.header-navigation-list__item-giaom0.has-submenu-giaom0').forEach(item => {
    const toggle = item.querySelector('[data-submenu-toggle-giaom0="true"]');
    if (toggle) {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        item.classList.toggle('open');
      });
    }
  });
  document.addEventListener('click', (e) => {
    document.querySelectorAll('.header-navigation-list__item-giaom0.has-submenu-giaom0.open').forEach(item => {
      if (!item.contains(e.target)) item.classList.remove('open');
    });
  });

  
  document.querySelectorAll('.accordion-button-giaom0').forEach(button => {
    button.addEventListener('click', function () {
      const targetSel = this.getAttribute('data-bs-target');
      const target = targetSel ? document.querySelector(targetSel) : null;
      const expanded = this.getAttribute('aria-expanded') === 'true';

      document.querySelectorAll('.accordion-collapse-giaom0.show').forEach(c => {
        if (c !== target) {
          c.classList.remove('show');
          const rel = document.querySelector(`[data-bs-target="#${c.id}"]`);
          if (rel) {
            rel.classList.add('collapsed-giaom0');
            rel.setAttribute('aria-expanded', 'false');
          }
        }
      });

      if (!expanded && target) {
        this.classList.remove('collapsed-giaom0');
        this.setAttribute('aria-expanded', 'true');
        target.classList.add('show');
      } else if (target) {
        this.classList.add('collapsed-giaom0');
        this.setAttribute('aria-expanded', 'false');
        target.classList.remove('show');
      }
    });
  });

  
  (function () {
    const tocList = document.getElementById('toc-list-giaom0');
    const tocContainer = document.getElementById('toc-container-giaom0');
    const tocToggleBtn = document.getElementById('toc-toggle-giaom0');
    const tocHeader = document.getElementById('toc-header-giaom0');
    const h2s = document.querySelectorAll('main h2');

    if (tocList && h2s.length > 0) {
      h2s.forEach((h2, idx) => {
        const id = h2.getAttribute('id') || ('section-' + idx);
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = h2.textContent;
        a.setAttribute('href', '#' + id);
        a.addEventListener('click', (e) => {
          e.preventDefault();
          const target = document.getElementById(id);
          if (!target) return;
          const offset = 100;
          const pos = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top: pos, behavior: 'smooth' });
        });
        li.appendChild(a);
        tocList.appendChild(li);
      });
    } else if (tocContainer) {
      tocContainer.style.display = 'none';
    }

    function toggleToc() {
      if (!tocContainer) return;
      const collapsed = tocContainer.classList.toggle('toc-collapsed');
      if (tocToggleBtn) tocToggleBtn.textContent = collapsed ? 'Show' : 'Hide';
    }
    if (tocToggleBtn) {
      tocToggleBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleToc(); });
    }
    if (tocHeader) tocHeader.addEventListener('click', toggleToc);
  })();

  
  const scrollBtn = document.getElementById('scrollToTopBtn-giaom0');
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollBtn.style.display = 'flex';
        scrollBtn.style.opacity = '1';
      } else {
        scrollBtn.style.opacity = '0';
        setTimeout(() => {
          if (window.scrollY <= 300) scrollBtn.style.display = 'none';
        }, 200);
      }
    }, { passive: true });
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  
  
  document.querySelectorAll('.modern-card-giaom0 table, .auto-content-wrapper-giaom0 table').forEach(table => {
    if (table.parentElement && table.parentElement.classList.contains('table-scroll')) return;
    const wrap = document.createElement('div');
    wrap.className = 'table-scroll';
    table.parentNode.insertBefore(wrap, table);
    wrap.appendChild(table);
  });

  
  const footerDate = document.querySelector('#footer__date-giaom0');
  if (footerDate) footerDate.textContent = new Date().getFullYear();
});
