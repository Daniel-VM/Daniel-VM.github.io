function initScrollProgress() {
  const el = document.getElementById('scroll-progress');
  if (!el) return;
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    el.style.width = (max > 0 ? Math.min(1, window.scrollY / max) * 100 : 0) + '%';
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function initActiveSection() {
  const links = document.querySelectorAll('[data-nav-link]');
  if (!links.length) return;
  const sections = Array.from(links)
    .map((a) => document.getElementById(a.getAttribute('data-nav-link')))
    .filter(Boolean);
  if (!sections.length) return;

  const setActive = (id) => {
    links.forEach((a) => {
      if (a.getAttribute('data-nav-link') === id) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
  };

  const io = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    },
    { rootMargin: '-45% 0px -45% 0px' }
  );
  sections.forEach((s) => io.observe(s));
}

function initRevealFallback() {
  if (CSS.supports('animation-timeline: view()')) return;
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  targets.forEach((t) => io.observe(t));
}

function primeVideos() {
  document.querySelectorAll('video[data-autoplay]').forEach((v) => {
    v.muted = true;
    v.loop = true;
    v.playsInline = true;
    if (v.paused) v.play().catch(() => {});
  });
}

function initProjectFilter() {
  const grid = document.querySelector('[data-project-grid]');
  const controls = document.querySelectorAll('[data-project-filter]');
  if (!grid || !controls.length) return;
  const cards = Array.from(grid.querySelectorAll('[data-project-cats]'));

  controls.forEach((input) => {
    input.addEventListener('change', () => {
      if (!input.checked) return;
      const value = input.value;
      cards.forEach((card) => {
        const cats = card.getAttribute('data-project-cats').split(' ');
        const show = value === 'all' || cats.includes(value);
        card.hidden = !show;
        if (show) {
          card.classList.remove('fade-in');
          void card.offsetWidth;
          card.classList.add('fade-in');
        }
      });
    });
  });
}

function initLangPersistence() {
  document.querySelectorAll('[data-lang-switch]').forEach((a) => {
    a.addEventListener('click', () => {
      try {
        localStorage.setItem('dvm-lang', a.getAttribute('data-lang-switch'));
      } catch (e) {}
    });
  });
}

function init() {
  initScrollProgress();
  initActiveSection();
  initRevealFallback();
  primeVideos();
  initProjectFilter();
  initLangPersistence();
}

init();
document.addEventListener('astro:page-load', init);
