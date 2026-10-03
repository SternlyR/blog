// Wonder & Wander Toys: small sprinkles of interactivity.
(() => {
  // Mobile menu
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('open', open);
  };
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });

  // Meet the Crew: tap a character, it wiggles and talks
  const speech = document.querySelector('.speech');
  const crew = document.querySelector('.crew');
  document.querySelectorAll('.pal').forEach((pal) => {
    pal.addEventListener('click', () => {
      document.querySelectorAll('.pal').forEach((p) => p.classList.remove('is-active'));
      void pal.offsetWidth; // restart the wiggle
      pal.classList.add('is-active');

      speech.querySelector('span').textContent = pal.dataset.say;
      speech.classList.remove('pop');
      void speech.offsetWidth;
      speech.classList.add('pop');

      // Point the speech-bubble tail at the chosen friend
      const pr = pal.getBoundingClientRect();
      const sr = speech.getBoundingClientRect();
      const x = Math.min(Math.max(pr.left + pr.width / 2 - sr.left, 30), sr.width - 30);
      speech.style.setProperty('--tail', `${x}px`);
    });
  });

  // Newsletter form (front-end only until it is wired to a provider)
  const form = document.querySelector('.club-form');
  const msg = document.querySelector('.form-msg');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.email.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      msg.textContent = 'Hmm, that email looks a little wobbly. Try again?';
      return;
    }
    msg.textContent = "Ribbit! You're in the loop. 🐸";
    form.reset();
  });

  // Gentle scroll-in for cards
  const targets = document.querySelectorAll('.section-head, .product, .shelf, .workshop, .why-card, .visit-photo, .visit-info, .club');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    targets.forEach((t) => { t.classList.add('reveal'); io.observe(t); });
  }

  document.getElementById('year').textContent = new Date().getFullYear();
})();
