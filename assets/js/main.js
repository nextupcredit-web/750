// 757 Esthetics — site interactions
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Header scroll state ---------- */
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 40);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile hamburger menu ---------- */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavBackdrop = document.querySelector('.mobile-nav-backdrop');
  const body = document.body;

  function closeMobileNav() {
    if (!hamburger || !mobileNav) return;
    hamburger.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('is-open');
    mobileNavBackdrop?.classList.remove('is-open');
    body.classList.remove('nav-locked');
  }

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!isOpen));
      mobileNav.classList.toggle('is-open', !isOpen);
      mobileNavBackdrop?.classList.toggle('is-open', !isOpen);
      body.classList.toggle('nav-locked', !isOpen);
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMobileNav);
    });

    mobileNavBackdrop?.addEventListener('click', closeMobileNav);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMobileNav();
    });

    // Close mobile nav automatically if resized to desktop width
    window.addEventListener('resize', () => {
      if (window.innerWidth > 860) closeMobileNav();
    });
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Animated stat counters ---------- */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    const countIo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const duration = 1600;
        const start = performance.now();
        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const value = target % 1 === 0 ? Math.floor(eased * target) : (eased * target).toFixed(1);
          el.textContent = value + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        countIo.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(el => countIo.observe(el));
  }

  /* ---------- Testimonial slider ---------- */
  const slides = document.querySelectorAll('.testimonial-slide');
  const dotsWrap = document.querySelector('.testimonial-dots');
  if (slides.length) {
    let active = 0;
    if (dotsWrap) {
      dotsWrap.innerHTML = '';
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        if (i === 0) dot.classList.add('is-active');
        dot.setAttribute('aria-label', `Show testimonial ${i + 1}`);
        dot.addEventListener('click', () => setActive(i));
        dotsWrap.appendChild(dot);
      });
    }
    function setActive(i) {
      slides[active].classList.remove('is-active');
      dotsWrap?.children[active]?.classList.remove('is-active');
      active = i;
      slides[active].classList.add('is-active');
      dotsWrap?.children[active]?.classList.add('is-active');
    }
    setInterval(() => setActive((active + 1) % slides.length), 5500);
  }

  /* ---------- Accordion (FAQ) ---------- */
  document.querySelectorAll('.accordion-item').forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    const panel = item.querySelector('.accordion-panel');
    if (!trigger || !panel) return;
    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      document.querySelectorAll('.accordion-item.is-open').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('is-open');
          openItem.querySelector('.accordion-panel').style.maxHeight = null;
        }
      });
      item.classList.toggle('is-open', !isOpen);
      panel.style.maxHeight = !isOpen ? panel.scrollHeight + 'px' : null;
    });
  });

  /* ---------- Event filters ---------- */
  const filterBtns = document.querySelectorAll('.event-filters button');
  const eventCards = document.querySelectorAll('.event-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const filter = btn.dataset.filter;
      eventCards.forEach(card => {
        const match = filter === 'all' || card.dataset.status === filter;
        card.style.display = match ? '' : 'none';
      });
    });
  });

  /* ---------- Gallery lightbox ---------- */
  const galleryFigures = document.querySelectorAll('.gallery-grid figure img');
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = lightbox?.querySelector('img');
  const lightboxClose = lightbox?.querySelector('.lightbox-close');

  function openLightbox(src, alt) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.classList.add('is-open');
    body.classList.add('nav-locked');
  }
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    body.classList.remove('nav-locked');
  }
  galleryFigures.forEach(img => {
    img.addEventListener('click', () => openLightbox(img.src, img.alt));
  });
  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

  /* ---------- Contact / booking form: opens a pre-filled email to Natasha ---------- */
  const bookingForm = document.querySelector('#booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const getVal = (id) => (document.getElementById(id)?.value || '').trim();
      const name = getVal('name');
      const phone = getVal('phone');
      const email = getVal('email');
      const service = getVal('service');
      const date = getVal('date');
      const message = getVal('message');

      const subject = `Appointment Request: ${service || 'General Inquiry'} — ${name}`;
      const bodyLines = [
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        `Service Interested In: ${service}`,
        date ? `Preferred Date: ${date}` : null,
        '',
        'Notes:',
        message || '(none)'
      ].filter((line) => line !== null);

      const mailtoUrl = `mailto:admin@757esthetics.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
      window.location.href = mailtoUrl;

      const success = document.querySelector('.form-success');
      bookingForm.style.display = 'none';
      success?.classList.add('is-visible');
    });
  }

  /* ---------- Newsletter form (static demo) ---------- */
  const newsletterForm = document.querySelector('#newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = newsletterForm.querySelector('button');
      const original = btn.textContent;
      btn.textContent = 'Thank you!';
      newsletterForm.querySelector('input').value = '';
      setTimeout(() => { btn.textContent = original; }, 3000);
    });
  }

  /* ---------- External booking link (GlossGenius, Vagaro, Acuity, etc.) ---------- */
  const bookingUrl = window.SITE_CONFIG && window.SITE_CONFIG.bookingUrl;
  if (bookingUrl) {
    document.querySelectorAll('a[href="contact.html#book"], a[href="#book"]').forEach((link) => {
      link.href = bookingUrl;
      link.target = '_blank';
      link.rel = 'noopener';
    });
    const section = document.getElementById('external-booking-section');
    if (section) section.style.display = '';
  }

  /* ---------- Active nav link highlight ---------- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-desktop a, .mobile-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
});
