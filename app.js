const Components = (function () {
  const registry = {};

  return {
    register(name, initFn) {
      registry[name] = initFn;
    },
    mount() {
      document.querySelectorAll('[data-component]').forEach(el => {
        const name = el.dataset.component;
        if (typeof registry[name] === 'function') {
          try { registry[name](el); }
          catch (err) { console.error(`[Component: ${name}]`, err); }
        }
      });
    },
  };
})();

Components.register('navbar', navEl => {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  const onScroll = () => navEl.classList.toggle('scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const open = navLinks.classList.toggle('mobile-open');
      hamburger.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
});

const initReveals = () => {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
};

document.addEventListener('DOMContentLoaded', () => {
  Components.mount();
  initReveals();
});