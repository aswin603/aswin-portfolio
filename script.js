(function () {
  'use strict';

  // ----- Theme (dark/light) -----
  const THEME_KEY = 'portfolio-theme';
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  function getStoredTheme() {
    return localStorage.getItem(THEME_KEY);
  }

  function setTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem(THEME_KEY, theme);
  }

  function initTheme() {
    const stored = getStoredTheme();
    if (stored === 'dark' || stored === 'light') {
      setTheme(stored);
    } else {
      setTheme(prefersDark.matches ? 'dark' : 'light');
    }
  }

  function toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    setTheme(isDark ? 'light' : 'dark');
  }

  const themeBtn = document.querySelector('.theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
  }

  prefersDark.addEventListener('change', function (e) {
    if (!getStoredTheme()) setTheme(e.matches ? 'dark' : 'light');
  });

  initTheme();

  // ----- Mobile menu -----
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // ----- Scroll-triggered animations -----
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(function (el) {
    observer.observe(el);
  });

  // ----- Footer year -----
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ----- Experience timeline line: height increases on scroll -----
  const timelineFill = document.getElementById('timeline-line-fill');
  const experienceSection = document.getElementById('experience');

  function updateTimelineLine() {
    if (!timelineFill || !experienceSection) return;

    var rect = experienceSection.getBoundingClientRect();
    var sectionTop = rect.top;
    var sectionHeight = rect.height;
    var sectionBottom = sectionTop + sectionHeight;
    var viewportHeight = window.innerHeight;

    if (sectionTop > viewportHeight) {
      timelineFill.style.height = '0%';
      return;
    }
    if (sectionBottom <= 0) {
      timelineFill.style.height = '100%';
      return;
    }

    var scrollRange = viewportHeight + sectionHeight;
    var scrolled = viewportHeight - sectionTop;
    var fillPercent = scrolled / scrollRange;
    fillPercent = Math.min(1, Math.max(0, fillPercent));
    timelineFill.style.height = (fillPercent * 100) + '%';
  }

  if (timelineFill && experienceSection) {
    window.addEventListener('scroll', updateTimelineLine, { passive: true });
    window.addEventListener('resize', updateTimelineLine);
    updateTimelineLine();
  }
})();
