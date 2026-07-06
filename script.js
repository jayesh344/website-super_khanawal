document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Sticky nav shrink ---------- */
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });

  /* ---------- Open / closed status chip ---------- */
  const OPEN_HOUR = 11;   // 11 AM
  const CLOSE_HOUR = 23;  // 11 PM
  const chip = document.getElementById('openStatusChip');
  const dot = document.getElementById('statusDot');
  const text = document.getElementById('statusText');

  function updateStatus() {
    const now = new Date();
    const hour = now.getHours();
    const isOpen = hour >= OPEN_HOUR && hour < CLOSE_HOUR;
    chip.classList.toggle('closed', !isOpen);
    if (isOpen) {
      text.textContent = `Open now · until ${CLOSE_HOUR > 12 ? CLOSE_HOUR - 12 : CLOSE_HOUR}:00 PM`;
    } else {
      text.textContent = `Closed now · opens ${OPEN_HOUR > 12 ? OPEN_HOUR - 12 : OPEN_HOUR}:00 AM`;
    }
  }
  updateStatus();

  /* ---------- Menu category tabs ---------- */
  const menuTabs = document.querySelectorAll('#menuTabs .nav-link');
  const menuPanels = document.querySelectorAll('.menu-panel');
  menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      menuTabs.forEach(t => t.classList.remove('active'));
      menuPanels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.querySelector(`.menu-panel[data-panel="${tab.dataset.menu}"]`).classList.add('active');
    });
  });

  /* ---------- Scroll reveal ---------- */
  const revealTargets = document.querySelectorAll(
    '.section-about .col-lg-6, .section-menu .menu-tabs, .menu-panel.active .receipt-card, ' +
    '.gallery-tile, .review-card, .reserve-form, .contact-list, .about-visual'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealTargets.forEach(el => io.observe(el));

  /* ---------- Reservation form (front-end only) ---------- */
  const form = document.getElementById('reserveForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Reservation received ✓';
    btn.disabled = true;
    form.reset();
    setTimeout(() => {
      btn.textContent = original;
      btn.disabled = false;
    }, 2500);
    // NOTE: This form does not send data anywhere yet.
    // Connect it to your email/backend of choice (e.g. Formspree, EmailJS, or your own server).
  });

  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

});
