/**
 * nav.js — Virginia Baseball Coaches Association
 * Shared JS for all pages:
 *   - Mobile nav toggle (hamburger open/close)
 *   - nav-overlay creation and injection
 *   - IntersectionObserver for section-animate elements
 *   - Copyright year population
 *
 * Note: Sponsor carousel and HOF class switcher are page-specific —
 * those belong in their respective page JS files, not here.
 */

(function () {
  'use strict';

  /* ============================================================
     MOBILE NAV OVERLAY
     Created programmatically — not in static HTML
     ============================================================ */

  /**
   * Build the full mobile overlay DOM and append to body.
   * Returns the overlay element for use by toggle functions.
   */
  function buildMobileOverlay() {
    var overlay = document.createElement('div');
    overlay.className = 'nav-mobile-overlay';
    overlay.id = 'nav-mobile-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Navigation menu');

    overlay.innerHTML = [
      '<button class="nav-mobile__close" id="nav-mobile-close" aria-label="Close navigation menu">',
      '  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">',
      '    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
      '  </svg>',
      '</button>',
      '<ul class="nav-mobile-list" role="list">',
      '  <li class="nav-mobile-item">',
      '    <a href="' + getHomeHref() + '" class="nav-mobile-link">Home</a>',
      '  </li>',
      '  <li class="nav-mobile-item">',
      '    <a href="' + getHref('membership/membership.html') + '" class="nav-mobile-link">Membership</a>',
      '  </li>',
      '  <li class="nav-mobile-item">',
      '    <span class="nav-mobile-group">Events</span>',
      '    <ul class="nav-mobile-sublist">',
      '      <li><a href="' + getHref('annual-convention/annual-convention.html') + '">Annual Convention</a></li>',
      '      <li><a href="' + getHref('virginia-all-star-game/virginia-all-star-game.html') + '">Virginia All-Star Game</a></li>',
      '      <li><a href="' + getHref('events-calendar/events-calendar.html') + '">Events Calendar</a></li>',
      '    </ul>',
      '  </li>',
      '  <li class="nav-mobile-item">',
      '    <span class="nav-mobile-group">Resources</span>',
      '    <ul class="nav-mobile-sublist">',
      '      <li><a href="' + getHref('job-board/job-board.html') + '">Job Board</a></li>',
      '      <li><a href="' + getHref('resource-library/resource-library.html') + '">Resource Library</a></li>',
      '      <li><a href="' + getHref('news/news.html') + '">News</a></li>',
      '    </ul>',
      '  </li>',
      '  <li class="nav-mobile-item">',
      '    <span class="nav-mobile-group">About</span>',
      '    <ul class="nav-mobile-sublist">',
      '      <li><a href="' + getHref('about/about.html') + '">About Us</a></li>',
      '      <li><a href="' + getHref('board-of-directors/board-of-directors.html') + '">Board of Directors</a></li>',
      '      <li><a href="' + getHref('hall-of-fame/hall-of-fame.html') + '">Hall of Fame</a></li>',
      '      <li><a href="' + getHref('scholarships/scholarships.html') + '">Scholarships</a></li>',
      '    </ul>',
      '  </li>',
      '  <li class="nav-mobile-item">',
      '    <a href="' + getHref('contact/contact.html') + '" class="nav-mobile-link">Contact</a>',
      '  </li>',
      '</ul>',
      '<div class="nav-mobile__ctas">',
      '  <a href="' + getHref('member-portal/member-portal.html') + '" class="btn-secondary btn-secondary--light">Member Login</a>',
      '  <a href="https://givebutter.com/9XMk3k" class="btn-primary" target="_blank" rel="noopener noreferrer">Join Now</a>',
      '</div>'
    ].join('\n');

    document.body.appendChild(overlay);
    return overlay;
  }

  /**
   * Determine if we are at root level or pages/ depth.
   * Returns the correct prefix for pages/ links.
   */
  function getPagesPrefix() {
    var path = window.location.pathname;
    // If in /pages/something/, use ../../pages/
    // If at root (index.html or /), use pages/
    if (path.indexOf('/pages/') !== -1) {
      return '../../pages/';
    }
    return 'pages/';
  }

  function getHomeHref() {
    var path = window.location.pathname;
    if (path.indexOf('/pages/') !== -1) {
      return '../../index.html';
    }
    return 'index.html';
  }

  function getHref(pageRelative) {
    return getPagesPrefix() + pageRelative;
  }

  /* ============================================================
     NAV TOGGLE
     ============================================================ */

  var hamburger = document.getElementById('nav-hamburger');
  var siteHeader = document.getElementById('site-header');
  var mobileOverlay = null;
  var isNavOpen = false;

  /**
   * Open mobile nav
   */
  function openNav() {
    if (!mobileOverlay) {
      mobileOverlay = buildMobileOverlay();
      // Attach close button listener after building
      var closeBtn = document.getElementById('nav-mobile-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', closeNav);
      }
      // Close when any nav link is clicked
      var mobileLinks = mobileOverlay.querySelectorAll('a');
      mobileLinks.forEach(function (link) {
        link.addEventListener('click', closeNav);
      });
      // Click-outside to close (clicking overlay background)
      mobileOverlay.addEventListener('click', function (e) {
        if (e.target === mobileOverlay) {
          closeNav();
        }
      });
    }

    isNavOpen = true;
    mobileOverlay.classList.add('is-open');
    document.body.classList.add('nav-mobile__open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileOverlay.setAttribute('aria-hidden', 'false');

    // Move focus to close button
    var closeBtn = document.getElementById('nav-mobile-close');
    if (closeBtn) {
      closeBtn.focus();
    }
  }

  /**
   * Close mobile nav
   */
  function closeNav() {
    isNavOpen = false;
    if (mobileOverlay) {
      mobileOverlay.classList.remove('is-open');
      mobileOverlay.setAttribute('aria-hidden', 'true');
    }
    document.body.classList.remove('nav-mobile__open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.focus();
  }

  /**
   * Toggle mobile nav
   */
  function toggleNav() {
    if (isNavOpen) {
      closeNav();
    } else {
      openNav();
    }
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleNav);
  }

  // Close nav on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isNavOpen) {
      closeNav();
    }
  });

  /* ============================================================
     HERO SCROLL BEHAVIOUR
     On pages with .site-header--hero, transitions from transparent
     to white background after scrolling 60px
     ============================================================ */

  if (siteHeader && siteHeader.classList.contains('site-header--hero')) {
    var SCROLL_THRESHOLD = 60;

    function updateHeaderOnScroll() {
      if (window.scrollY > SCROLL_THRESHOLD) {
        siteHeader.classList.add('site-header--scrolled');
      } else {
        siteHeader.classList.remove('site-header--scrolled');
      }
    }

    window.addEventListener('scroll', updateHeaderOnScroll, { passive: true });
    // Run on load in case page is refreshed mid-scroll
    updateHeaderOnScroll();
  }

  /* ============================================================
     INTERSECTION OBSERVER — Section Animate
     Adds 'is-visible' to elements with .section-animate
     when they enter the viewport
     ============================================================ */

  if ('IntersectionObserver' in window) {
    var animateObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Unobserve once animated — no need to reverse
            animateObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    // Observe all .section-animate elements
    var animateTargets = document.querySelectorAll('.section-animate');
    animateTargets.forEach(function (el) {
      animateObserver.observe(el);
    });
  } else {
    // Fallback: make all section-animate elements visible immediately
    var fallbackTargets = document.querySelectorAll('.section-animate');
    fallbackTargets.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ============================================================
     COPYRIGHT YEAR
     Populates #copyright-year span in footer with current year
     ============================================================ */

  var yearEl = document.getElementById('copyright-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

})();
