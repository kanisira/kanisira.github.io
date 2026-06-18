// ===== BURGER MENU (mobile) =====
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('nav');

toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});

nav?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    if (nav.classList.contains('open')) {
      nav.classList.remove('open');
      toggle?.setAttribute('aria-expanded', 'false');
    }
  });
});

// ===== SCROLLSPY (lien actif) =====
const navLinks = document.querySelectorAll('.side-nav a[href^="#"]');
const sections = Array.from(navLinks)
  .map(l => document.querySelector(l.getAttribute('href')))
  .filter(Boolean);

const spy = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = '#' + entry.target.id;
      navLinks.forEach(a => a.classList.remove('active'));
      document.querySelector(`.side-nav a[href="${id}"]`)?.classList.add('active');
    }
  });
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });

sections.forEach(s => spy.observe(s));

// ===== ANNÉE FOOTER =====
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== BOUTON RETOUR EN HAUT =====
const backToTop = document.getElementById('backToTop');

if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== REVEAL AU SCROLL =====
(function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // légère cascade si plusieurs éléments ensemble
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => revealObs.observe(el));
})();

// ===== ACCORDÉONS MISSIONS =====
(function initAccordions() {
  document.querySelectorAll('.accordion-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const body = btn.nextElementSibling;
      const card = btn.closest('.accordion-card');
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      // ferme tous les autres dans le même groupe
      const parentGrid = btn.closest('.mission-grid');
      if (parentGrid) {
        parentGrid.querySelectorAll('.accordion-trigger').forEach(other => {
          if (other !== btn) {
            other.setAttribute('aria-expanded', 'false');
            const otherBody = other.nextElementSibling;
            const otherCard = other.closest('.accordion-card');
            if (otherBody) otherBody.hidden = true;
            if (otherCard) otherCard.classList.remove('is-open');
          }
        });
      }

      // bascule l'accordéon cliqué
      btn.setAttribute('aria-expanded', String(!isOpen));
      body.hidden = isOpen;
      if (card) card.classList.toggle('is-open', !isOpen);
    });
  });
})();

// ===== GALERIES D'IMAGES (projets) =====
(function initGalleries() {
  document.querySelectorAll('[data-gallery]').forEach(gallery => {
    const imgs = gallery.querySelectorAll('img');
    const prev = gallery.querySelector('.gallery-btn.prev');
    const next = gallery.querySelector('.gallery-btn.next');
    if (!imgs.length) return;

    let current = 0;

    const show = (index) => {
      current = (index + imgs.length) % imgs.length;
      imgs.forEach((img, i) => img.classList.toggle('active', i === current));
    };

    prev?.addEventListener('click', (e) => { e.stopPropagation(); show(current - 1); });
    next?.addEventListener('click', (e) => { e.stopPropagation(); show(current + 1); });
  });
})();

// ===== REFLET SUR LES OUTILS (mousemove) =====
(function toolHighlight() {
  document.querySelectorAll('#tools .tool').forEach(tag => {
    tag.addEventListener('mousemove', (e) => {
      const r = tag.getBoundingClientRect();
      tag.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      tag.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    });
    tag.addEventListener('mouseleave', () => {
      tag.style.removeProperty('--mx');
      tag.style.removeProperty('--my');
    });
  });
})();

// ===== TILT 3D (outils) =====
(function gentleTilt() {
  const tilts = document.querySelectorAll('.tilt-3d');
  if (!tilts.length) return;

  const setTilt = (el, e) => {
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    const max = 6;
    el.style.setProperty('--ry', (px * max) + 'deg');
    el.style.setProperty('--rx', (-py * max) + 'deg');
  };
  const resetTilt = (el) => {
    el.style.setProperty('--ry', '0deg');
    el.style.setProperty('--rx', '0deg');
  };

  tilts.forEach(el => {
    el.addEventListener('mousemove', (e) => setTilt(el, e));
    el.addEventListener('mouseleave', () => resetTilt(el));
    el.addEventListener('touchend', () => resetTilt(el));
  });
})();

// ===== ICÔNES OUTILS (injection SVG) =====
(function addToolIcons() {
  function dbIcon()      { return `<svg viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="5" rx="8" ry="3" fill="currentColor"/><path fill="currentColor" d="M4 8v6c0 1.66 3.58 3 8 3s8-1.34 8-3V8c-1.41 1.13-4.68 1.9-8 1.9S5.41 9.13 4 8z"/></svg>`; }
  function serverIcon()  { return `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="6" rx="1.5" fill="currentColor"/><rect x="3" y="14" width="18" height="6" rx="1.5" fill="currentColor"/><circle cx="7" cy="7" r="1" fill="#fff"/><circle cx="7" cy="17" r="1" fill="#fff"/></svg>`; }
  function diagramIcon()  { return `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="6" r="3" fill="currentColor"/><circle cx="18" cy="6" r="3" fill="currentColor"/><circle cx="12" cy="18" r="3" fill="currentColor"/><path d="M8.5 8.5 10.5 15M15.5 8.5 13.5 15" stroke="currentColor" stroke-width="2" fill="none"/></svg>`; }
  function codeIcon()     { return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18 4 12l5-6" fill="none" stroke="currentColor" stroke-width="2"/><path d="M15 6 20 12l-5 6" fill="none" stroke="currentColor" stroke-width="2"/></svg>`; }
  function gitBranchIcon(){ return `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="6" r="2.5" fill="currentColor"/><circle cx="6" cy="18" r="2.5" fill="currentColor"/><circle cx="18" cy="12" r="2.5" fill="currentColor"/><path d="M8.5 6v6a4 4 0 0 0 4 4H18" stroke="currentColor" stroke-width="2" fill="none"/></svg>`; }
  function chartIcon()    { return `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="12" width="3" height="8" rx="1" fill="currentColor"/><rect x="10.5" y="8" width="3" height="12" rx="1" fill="currentColor"/><rect x="17" y="4" width="3" height="16" rx="1" fill="currentColor"/></svg>`; }
  function cubeIcon()     { return `<svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="12,2 21,7 12,12 3,7" fill="currentColor"/><polygon points="21,7 21,17 12,22 12,12" fill="currentColor"/><polygon points="12,12 12,22 3,17 3,7" fill="currentColor"/></svg>`; }
  function docIcon()      { return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h8l4 4v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" fill="currentColor"/><rect x="8" y="12" width="8" height="2" fill="#fff"/><rect x="8" y="16" width="6" height="2" fill="#fff"/></svg>`; }
  function mindmapIcon()  { return `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3" fill="currentColor"/><circle cx="5" cy="7" r="2" fill="currentColor"/><circle cx="19" cy="7" r="2" fill="currentColor"/><circle cx="5" cy="17" r="2" fill="currentColor"/><circle cx="19" cy="17" r="2" fill="currentColor"/><path d="M7 8l4 3M17 8l-4 3M7 16l4-3M17 16l-4-3" stroke="currentColor" stroke-width="2" fill="none"/></svg>`; }
  function genericIcon()  { return `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="3" fill="currentColor"/></svg>`; }

  const iconMap = {
    'SQLite': dbIcon, 'Oracle SQL': dbIcon, 'MySQLWorkbench': dbIcon, 'MySQL Workbench': dbIcon,
    'phpMyAdmin': serverIcon, 'DBeaver': dbIcon, 'Modelio': diagramIcon,
    'Visual Studio Code': codeIcon, 'Visual Studio': codeIcon, 'IntelliJ IDEA': codeIcon,
    'GitLab': gitBranchIcon,
    'Power BI': chartIcon, 'VirtualBox': cubeIcon,
    'Suite Office 365': docIcon, 'Office 365': docIcon, 'MindView': mindmapIcon
  };

  document.querySelectorAll('#tools .tool').forEach(tag => {
    const key = tag.dataset.tool?.trim() || tag.textContent.trim();
    const maker = iconMap[key] || genericIcon;
    tag.insertAdjacentHTML('afterbegin', maker());
  });
})();