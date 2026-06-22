// Navigation partagée — injectée sur toutes les pages
(function injectNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  const pages = [
    { href: 'index.html',       label: 'Accueil',      icon: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' },
    { href: 'competences.html', label: 'Compétences',  icon: 'M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z' },
    { href: 'experience.html',  label: 'Expérience',   icon: 'M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z' },
    { href: 'traduction.html',  label: 'Traduction',   icon: 'M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0 0 14.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z' },
    { href: 'projets.html',     label: 'Projets',      icon: 'M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm10 0h8v8h-8z' },
    { href: 'formations.html',  label: 'Formations',   icon: 'M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z' },
    { href: 'contact.html',     label: 'Contact',      icon: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' },
  ];

  const navLinks = pages.map(p => `
    <a href="${p.href}" ${p.href === currentPage ? 'class="active"' : ''}>
      <svg viewBox="0 0 24 24" aria-hidden="true" width="16" height="16"><path fill="currentColor" d="${p.icon}"/></svg>
      ${p.label}
    </a>
  `).join('');

  const html = `
    <a class="brand" href="index.html">DOUCOURE Kani</a>
    <button class="nav-toggle" type="button" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="nav">
      <span></span><span></span><span></span>
    </button>
    <nav id="nav" class="side-nav" aria-label="Navigation principale">
      ${navLinks}
    </nav>
  `;

  const header = document.querySelector('.side-header');
  if (header) header.innerHTML = html;

  // Burger menu
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('nav');
  toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
  }));
})();

// Année footer
document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});

// Bouton retour en haut
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
});

// Reveal au scroll
document.addEventListener('DOMContentLoaded', () => {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
});

// Accordéons
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.accordion-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const body = btn.nextElementSibling;
      const card = btn.closest('.accordion-card');
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      const grid = btn.closest('.mission-grid');
      if (grid) {
        grid.querySelectorAll('.accordion-trigger').forEach(other => {
          if (other !== btn) {
            other.setAttribute('aria-expanded', 'false');
            const ob = other.nextElementSibling;
            const oc = other.closest('.accordion-card');
            if (ob) ob.hidden = true;
            if (oc) oc.classList.remove('is-open');
          }
        });
      }
      btn.setAttribute('aria-expanded', String(!isOpen));
      body.hidden = isOpen;
      if (card) card.classList.toggle('is-open', !isOpen);
    });
  });
});

// Galeries photos
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-gallery]').forEach(gallery => {
    const imgs = gallery.querySelectorAll('img');
    const prev = gallery.querySelector('.gallery-btn.prev');
    const next = gallery.querySelector('.gallery-btn.next');
    if (!imgs.length) return;
    let current = 0;
    const show = (i) => {
      current = (i + imgs.length) % imgs.length;
      imgs.forEach((img, j) => img.classList.toggle('active', j === current));
    };
    prev?.addEventListener('click', (e) => { e.stopPropagation(); show(current - 1); });
    next?.addEventListener('click', (e) => { e.stopPropagation(); show(current + 1); });
  });
});

// Tilt 3D outils
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.tilt-3d').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty('--ry', (px * 6) + 'deg');
      el.style.setProperty('--rx', (-py * 6) + 'deg');
    });
    el.addEventListener('mouseleave', () => {
      el.style.setProperty('--ry', '0deg');
      el.style.setProperty('--rx', '0deg');
    });
  });
});

// Effet typing sur la page d'accueil
document.addEventListener('DOMContentLoaded', () => {
  const el = document.querySelector('.typing-text');
  if (!el) return;
  const texts = ['Futur Data ingénieur', 'passionnée par la data', 'en recherche d\'alternance'];
  let ti = 0, ci = 0, deleting = false;

  function type() {
    const current = texts[ti];
    if (!deleting) {
      el.textContent = current.slice(0, ci + 1);
      ci++;
      if (ci === current.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      el.textContent = current.slice(0, ci - 1);
      ci--;
      if (ci === 0) {
        deleting = false;
        ti = (ti + 1) % texts.length;
      }
    }
    setTimeout(type, deleting ? 55 : 90);
  }
  type();
});
document.addEventListener('DOMContentLoaded', () => {
  function dbIcon()      { return `<svg viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="5" rx="8" ry="3" fill="currentColor"/><path fill="currentColor" d="M4 8v6c0 1.66 3.58 3 8 3s8-1.34 8-3V8c-1.41 1.13-4.68 1.9-8 1.9S5.41 9.13 4 8z"/></svg>`; }
  function serverIcon()  { return `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="6" rx="1.5" fill="currentColor"/><rect x="3" y="14" width="18" height="6" rx="1.5" fill="currentColor"/><circle cx="7" cy="7" r="1" fill="#fff"/><circle cx="7" cy="17" r="1" fill="#fff"/></svg>`; }
  function codeIcon()    { return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18 4 12l5-6" fill="none" stroke="currentColor" stroke-width="2"/><path d="M15 6 20 12l-5 6" fill="none" stroke="currentColor" stroke-width="2"/></svg>`; }
  function gitIcon()     { return `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="6" r="2.5" fill="currentColor"/><circle cx="6" cy="18" r="2.5" fill="currentColor"/><circle cx="18" cy="12" r="2.5" fill="currentColor"/><path d="M8.5 6v6a4 4 0 0 0 4 4H18" stroke="currentColor" stroke-width="2" fill="none"/></svg>`; }
  function chartIcon()   { return `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="12" width="3" height="8" rx="1" fill="currentColor"/><rect x="10.5" y="8" width="3" height="12" rx="1" fill="currentColor"/><rect x="17" y="4" width="3" height="16" rx="1" fill="currentColor"/></svg>`; }
  function cubeIcon()    { return `<svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="12,2 21,7 12,12 3,7" fill="currentColor"/><polygon points="21,7 21,17 12,22 12,12" fill="currentColor"/><polygon points="12,12 12,22 3,17 3,7" fill="currentColor"/></svg>`; }
  function docIcon()     { return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h8l4 4v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" fill="currentColor"/><rect x="8" y="12" width="8" height="2" fill="#fff"/></svg>`; }
  function mindIcon()    { return `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3" fill="currentColor"/><circle cx="5" cy="7" r="2" fill="currentColor"/><circle cx="19" cy="7" r="2" fill="currentColor"/><circle cx="5" cy="17" r="2" fill="currentColor"/><circle cx="19" cy="17" r="2" fill="currentColor"/><path d="M7 8l4 3M17 8l-4 3M7 16l4-3M17 16l-4-3" stroke="currentColor" stroke-width="2" fill="none"/></svg>`; }
  function genericIcon() { return `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="3" fill="currentColor"/></svg>`; }

  const map = {
    'SQLite': dbIcon, 'Oracle SQL': dbIcon, 'MySQLWorkbench': dbIcon, 'MySQL Workbench': dbIcon,
    'phpMyAdmin': serverIcon, 'DBeaver': dbIcon, 'Modelio': genericIcon,
    'Visual Studio Code': codeIcon, 'Visual Studio': codeIcon, 'IntelliJ IDEA': codeIcon,
    'GitLab': gitIcon, 'Power BI': chartIcon, 'VirtualBox': cubeIcon,
    'Suite Office 365': docIcon, 'Office 365': docIcon, 'MindView': mindIcon
  };

  document.querySelectorAll('.tool').forEach(tag => {
    const key = tag.dataset.tool?.trim() || tag.textContent.trim();
    const maker = map[key] || genericIcon;
    tag.insertAdjacentHTML('afterbegin', maker());
    tag.addEventListener('mousemove', (e) => {
      const r = tag.getBoundingClientRect();
      tag.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      tag.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    });
    tag.addEventListener('mouseleave', () => { tag.style.removeProperty('--mx'); tag.style.removeProperty('--my'); });
  });
});