# Nav/Footer Spec — Virginia Baseball Coaches Association
**Prepared by:** UI/UX Designer Agent (Setup Phase)
**Date:** 2026-03-11
**Purpose:** Source of truth for all parallel page-building agents. Use the exact HTML from this document. Do not invent nav or footer HTML.

---

## Nav Structure Decision

**Page-copy.md nav:** Home, Membership, Events, Resources, About, Contact + Member Login utility + Join Now CTA

**Resolved structure (6 primary items + 2 utility):**
- Home (→ `../../index.html` from pages/ depth, `index.html` from root)
- Membership (→ pages depth: `../../pages/membership/membership.html`, root: `pages/membership/membership.html`)
- Events (dropdown: Convention, All-Star Game, Calendar)
- Resources (dropdown: Job Board, Resource Library, News)
- About (dropdown: About Us, Board of Directors, Hall of Fame, Scholarships)
- Contact (→ pages depth: `../../pages/contact/contact.html`, root: `pages/contact/contact.html`)
- Member Login [utility, right-aligned] (→ pages depth: `../../pages/member-portal/member-portal.html`)
- Join Now [primary CTA button] (→ `https://givebutter.com/9XMk3k`)

**Confirmed fits within 900px on 1200px container** — 6 items at ~80px each = 480px for links, leaving 360px for logo + CTA. Dropdowns handled via CSS overlay.

---

## CSS Classes Used in Nav and Footer

### Nav Classes
- `.site-header` — outer `<header>` wrapper; position sticky top 0; z-index var(--z-nav)
- `.site-header--hero` — modifier added by JS when page has hero; starts transparent
- `.site-header--scrolled` — modifier added by JS on scroll past 60px; white bg
- `.nav-container` — inner container div; max-width 1200px
- `.nav-logo` — anchor wrapping logo wordmark
- `.nav-logo__mark` — span for VBCA wordmark text
- `.nav-logo__sub` — span for "COMMONWEALTH OF VIRGINIA" subtitle line
- `.nav-primary` — `<nav>` element
- `.nav-list` — `<ul>` inside nav; flex row
- `.nav-item` — `<li>` for each nav entry
- `.nav-item--has-dropdown` — modifier on items with submenus
- `.nav-link` — `<a>` for nav links
- `.nav-link--active` — active state modifier
- `.nav-dropdown` — `<ul>` submenu list
- `.nav-dropdown__item` — `<li>` inside dropdown
- `.nav-dropdown__link` — `<a>` inside dropdown
- `.nav-util` — right-side utility area (login + CTA)
- `.nav-util__login` — Member Login anchor
- `.btn-nav-cta` — "Join Now" button in nav
- `.nav-hamburger` — hamburger button (mobile)
- `.nav-hamburger__line` — each of the 3 lines in hamburger icon
- `.nav-mobile-overlay` — injected by nav.js; full-screen mobile menu overlay
- `.nav-mobile-list` — `<ul>` inside mobile overlay
- `.nav-mobile-item` — `<li>` inside mobile overlay
- `.nav-mobile-link` — `<a>` inside mobile overlay
- `.nav-mobile-group` — group header for expandable mobile sections
- `.nav-mobile-sublist` — nested `<ul>` inside mobile group
- `.nav-mobile__open` — modifier on `<body>` when mobile nav is open; disables scroll
- `.nav-mobile__close` — close button inside overlay

### Footer Classes
- `.site-footer` — outer `<footer>` wrapper
- `.site-footer__inner` — container div; max-width 1200px
- `.site-footer__cols` — flex row of columns
- `.site-footer__col` — individual column
- `.site-footer__logo` — footer logo area
- `.site-footer__tagline` — tagline below logo
- `.site-footer__social` — social icon row
- `.site-footer__social-link` — individual social link
- `.site-footer__heading` — column heading `<h5>`
- `.site-footer__list` — `<ul>` of links
- `.site-footer__list-item` — `<li>` in footer list
- `.site-footer__link` — `<a>` in footer list
- `.site-footer__legal` — bottom legal bar
- `.site-footer__legal-text` — copyright paragraph
- `.site-footer__legal-links` — legal links (privacy, terms)
- `.footer-va-outline` — SVG Virginia state silhouette (decorative, aria-hidden)

---

## Note on nav-overlay

```
<!-- nav-overlay is injected by nav.js — do not include as a static HTML element -->
```

nav.js creates the `.nav-mobile-overlay` element via `document.createElement` and appends it to `document.body`. Never add a static `.nav-mobile-overlay` div in your HTML.

---

## Header HTML — Root Level Pages (index.html)

Use this exact HTML for `index.html` and any other files at the client root level.
CSS/JS paths: `global/brand.css`, `global/global.css`, `global/nav.js`

```html
<a href="#main-content" class="skip-link">Skip to main content</a>

<header class="site-header site-header--hero" id="site-header">
  <div class="nav-container">
    <a href="index.html" class="nav-logo" aria-label="Virginia Baseball Coaches Association — Home">
      <span class="nav-logo__mark">VBCA</span>
      <span class="nav-logo__sub">Virginia Baseball Coaches Association</span>
    </a>
    <nav class="nav-primary" aria-label="Primary navigation">
      <ul class="nav-list" role="list">
        <li class="nav-item">
          <a href="index.html" class="nav-link nav-link--active" aria-current="page">Home</a>
        </li>
        <li class="nav-item">
          <a href="pages/membership/membership.html" class="nav-link">Membership</a>
        </li>
        <li class="nav-item nav-item--has-dropdown">
          <a href="pages/events-calendar/events-calendar.html" class="nav-link" aria-haspopup="true" aria-expanded="false">Events</a>
          <ul class="nav-dropdown" role="list">
            <li class="nav-dropdown__item"><a href="pages/annual-convention/annual-convention.html" class="nav-dropdown__link">Annual Convention</a></li>
            <li class="nav-dropdown__item"><a href="pages/virginia-all-star-game/virginia-all-star-game.html" class="nav-dropdown__link">Virginia All-Star Game</a></li>
            <li class="nav-dropdown__item"><a href="pages/events-calendar/events-calendar.html" class="nav-dropdown__link">Events Calendar</a></li>
          </ul>
        </li>
        <li class="nav-item nav-item--has-dropdown">
          <a href="pages/resource-library/resource-library.html" class="nav-link" aria-haspopup="true" aria-expanded="false">Resources</a>
          <ul class="nav-dropdown" role="list">
            <li class="nav-dropdown__item"><a href="pages/job-board/job-board.html" class="nav-dropdown__link">Job Board</a></li>
            <li class="nav-dropdown__item"><a href="pages/resource-library/resource-library.html" class="nav-dropdown__link">Resource Library</a></li>
            <li class="nav-dropdown__item"><a href="pages/news/news.html" class="nav-dropdown__link">News</a></li>
          </ul>
        </li>
        <li class="nav-item nav-item--has-dropdown">
          <a href="pages/about/about.html" class="nav-link" aria-haspopup="true" aria-expanded="false">About</a>
          <ul class="nav-dropdown" role="list">
            <li class="nav-dropdown__item"><a href="pages/about/about.html" class="nav-dropdown__link">About Us</a></li>
            <li class="nav-dropdown__item"><a href="pages/board-of-directors/board-of-directors.html" class="nav-dropdown__link">Board of Directors</a></li>
            <li class="nav-dropdown__item"><a href="pages/hall-of-fame/hall-of-fame.html" class="nav-dropdown__link">Hall of Fame</a></li>
            <li class="nav-dropdown__item"><a href="pages/scholarships/scholarships.html" class="nav-dropdown__link">Scholarships</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a href="pages/contact/contact.html" class="nav-link">Contact</a>
        </li>
      </ul>
    </nav>
    <div class="nav-util">
      <a href="pages/member-portal/member-portal.html" class="nav-util__login">Member Login</a>
      <a href="https://givebutter.com/9XMk3k" class="btn-nav-cta" target="_blank" rel="noopener noreferrer">Join Now</a>
    </div>
    <button class="nav-hamburger" id="nav-hamburger" aria-label="Open navigation menu" aria-expanded="false" aria-controls="nav-mobile-overlay">
      <span class="nav-hamburger__line"></span>
      <span class="nav-hamburger__line"></span>
      <span class="nav-hamburger__line"></span>
    </button>
  </div>
</header>
```

---

## Header HTML — Pages Depth (`pages/[page-name]/[page-name].html`)

Use this exact HTML for all pages inside `pages/` subdirectories.
All paths adjusted with `../../` prefix.

For the active page, set `aria-current="page"` on the matching nav link and add `.nav-link--active`.
Remove `site-header--hero` modifier if the page does not have a dark hero section.

```html
<a href="#main-content" class="skip-link">Skip to main content</a>

<header class="site-header" id="site-header">
  <div class="nav-container">
    <a href="../../index.html" class="nav-logo" aria-label="Virginia Baseball Coaches Association — Home">
      <span class="nav-logo__mark">VBCA</span>
      <span class="nav-logo__sub">Virginia Baseball Coaches Association</span>
    </a>
    <nav class="nav-primary" aria-label="Primary navigation">
      <ul class="nav-list" role="list">
        <li class="nav-item">
          <a href="../../index.html" class="nav-link">Home</a>
        </li>
        <li class="nav-item">
          <a href="../../pages/membership/membership.html" class="nav-link">Membership</a>
        </li>
        <li class="nav-item nav-item--has-dropdown">
          <a href="../../pages/events-calendar/events-calendar.html" class="nav-link" aria-haspopup="true" aria-expanded="false">Events</a>
          <ul class="nav-dropdown" role="list">
            <li class="nav-dropdown__item"><a href="../../pages/annual-convention/annual-convention.html" class="nav-dropdown__link">Annual Convention</a></li>
            <li class="nav-dropdown__item"><a href="../../pages/virginia-all-star-game/virginia-all-star-game.html" class="nav-dropdown__link">Virginia All-Star Game</a></li>
            <li class="nav-dropdown__item"><a href="../../pages/events-calendar/events-calendar.html" class="nav-dropdown__link">Events Calendar</a></li>
          </ul>
        </li>
        <li class="nav-item nav-item--has-dropdown">
          <a href="../../pages/resource-library/resource-library.html" class="nav-link" aria-haspopup="true" aria-expanded="false">Resources</a>
          <ul class="nav-dropdown" role="list">
            <li class="nav-dropdown__item"><a href="../../pages/job-board/job-board.html" class="nav-dropdown__link">Job Board</a></li>
            <li class="nav-dropdown__item"><a href="../../pages/resource-library/resource-library.html" class="nav-dropdown__link">Resource Library</a></li>
            <li class="nav-dropdown__item"><a href="../../pages/news/news.html" class="nav-dropdown__link">News</a></li>
          </ul>
        </li>
        <li class="nav-item nav-item--has-dropdown">
          <a href="../../pages/about/about.html" class="nav-link" aria-haspopup="true" aria-expanded="false">About</a>
          <ul class="nav-dropdown" role="list">
            <li class="nav-dropdown__item"><a href="../../pages/about/about.html" class="nav-dropdown__link">About Us</a></li>
            <li class="nav-dropdown__item"><a href="../../pages/board-of-directors/board-of-directors.html" class="nav-dropdown__link">Board of Directors</a></li>
            <li class="nav-dropdown__item"><a href="../../pages/hall-of-fame/hall-of-fame.html" class="nav-dropdown__link">Hall of Fame</a></li>
            <li class="nav-dropdown__item"><a href="../../pages/scholarships/scholarships.html" class="nav-dropdown__link">Scholarships</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a href="../../pages/contact/contact.html" class="nav-link">Contact</a>
        </li>
      </ul>
    </nav>
    <div class="nav-util">
      <a href="../../pages/member-portal/member-portal.html" class="nav-util__login">Member Login</a>
      <a href="https://givebutter.com/9XMk3k" class="btn-nav-cta" target="_blank" rel="noopener noreferrer">Join Now</a>
    </div>
    <button class="nav-hamburger" id="nav-hamburger" aria-label="Open navigation menu" aria-expanded="false" aria-controls="nav-mobile-overlay">
      <span class="nav-hamburger__line"></span>
      <span class="nav-hamburger__line"></span>
      <span class="nav-hamburger__line"></span>
    </button>
  </div>
</header>
```

---

## Footer HTML — Root Level Pages

Use `pages/[page]/[page].html` paths (no `../../`).

```html
<footer class="site-footer">
  <svg class="footer-va-outline" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 300" width="800" height="300">
    <!-- Virginia state silhouette — simplified polygon approximation -->
    <polygon fill="white" fill-opacity="0.04" points="
      0,60 40,55 80,50 120,52 160,48 200,45 240,50 260,46 300,44 340,46 380,48
      420,44 460,46 500,48 530,50 560,55 590,52 620,48 650,52 670,58 690,65
      710,75 730,90 750,105 760,120 770,130 780,118 790,105 800,100
      800,200 780,210 760,205 740,215 720,220 700,218 680,225 660,230
      640,228 620,235 600,240 580,235 560,242 540,238 520,245 500,240
      480,235 460,230 440,232 420,228 400,235 380,230 360,225 340,220
      320,215 300,210 280,215 260,208 240,212 220,205 200,200 180,195
      160,198 140,192 120,188 100,182 80,178 60,175 40,170 20,165 0,160
    " />
  </svg>
  <div class="site-footer__inner">
    <div class="site-footer__cols">
      <div class="site-footer__col site-footer__col--brand">
        <a href="index.html" class="site-footer__logo" aria-label="Virginia Baseball Coaches Association — Home">
          <span class="nav-logo__mark">VBCA</span>
        </a>
        <p class="site-footer__tagline">Unite. Educate. Develop. Support.</p>
        <p class="site-footer__contact"><a href="mailto:tmerry@vbca.org" class="site-footer__link">tmerry@vbca.org</a></p>
        <div class="site-footer__social">
          <p class="site-footer__social-label">Follow VBCA</p>
          <a href="#" class="site-footer__social-link" aria-label="VBCA on X (Twitter)">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.261 5.635zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="#" class="site-footer__social-link" aria-label="VBCA on Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a href="#" class="site-footer__social-link" aria-label="VBCA on Facebook">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
        </div>
      </div>
      <div class="site-footer__col">
        <h5 class="site-footer__heading">Membership</h5>
        <ul class="site-footer__list" role="list">
          <li class="site-footer__list-item"><a href="https://givebutter.com/9XMk3k" class="site-footer__link" target="_blank" rel="noopener noreferrer">Join the VBCA</a></li>
          <li class="site-footer__list-item"><a href="pages/membership/membership.html" class="site-footer__link">Membership Tiers</a></li>
          <li class="site-footer__list-item"><a href="pages/member-portal/member-portal.html" class="site-footer__link">Member Portal</a></li>
          <li class="site-footer__list-item"><a href="https://abca.org/ABCA-VBCA" class="site-footer__link" target="_blank" rel="noopener noreferrer">VBCA × ABCA Joint</a></li>
        </ul>
      </div>
      <div class="site-footer__col">
        <h5 class="site-footer__heading">Programs</h5>
        <ul class="site-footer__list" role="list">
          <li class="site-footer__list-item"><a href="pages/annual-convention/annual-convention.html" class="site-footer__link">Annual Convention</a></li>
          <li class="site-footer__list-item"><a href="pages/virginia-all-star-game/virginia-all-star-game.html" class="site-footer__link">Virginia All-Star Game</a></li>
          <li class="site-footer__list-item"><a href="pages/hall-of-fame/hall-of-fame.html" class="site-footer__link">Hall of Fame</a></li>
          <li class="site-footer__list-item"><a href="pages/scholarships/scholarships.html" class="site-footer__link">Scholarships</a></li>
        </ul>
      </div>
      <div class="site-footer__col">
        <h5 class="site-footer__heading">Resources</h5>
        <ul class="site-footer__list" role="list">
          <li class="site-footer__list-item"><a href="pages/events-calendar/events-calendar.html" class="site-footer__link">Events Calendar</a></li>
          <li class="site-footer__list-item"><a href="pages/job-board/job-board.html" class="site-footer__link">Job Board</a></li>
          <li class="site-footer__list-item"><a href="pages/resource-library/resource-library.html" class="site-footer__link">Resource Library</a></li>
          <li class="site-footer__list-item"><a href="pages/news/news.html" class="site-footer__link">News</a></li>
        </ul>
      </div>
      <div class="site-footer__col">
        <h5 class="site-footer__heading">Organization</h5>
        <ul class="site-footer__list" role="list">
          <li class="site-footer__list-item"><a href="pages/about/about.html" class="site-footer__link">About Us</a></li>
          <li class="site-footer__list-item"><a href="pages/board-of-directors/board-of-directors.html" class="site-footer__link">Board of Directors</a></li>
          <li class="site-footer__list-item"><a href="pages/sponsors/sponsors.html" class="site-footer__link">Sponsors & Partners</a></li>
          <li class="site-footer__list-item"><a href="pages/contact/contact.html" class="site-footer__link">Contact</a></li>
        </ul>
      </div>
    </div>
    <div class="site-footer__legal">
      <p class="site-footer__legal-text">
        &copy; <span id="copyright-year"></span> Virginia Baseball Coaches Association. All rights reserved. 501(c)3 Nonprofit Organization.
      </p>
      <div class="site-footer__legal-links">
        <a href="pages/privacy-policy/privacy-policy.html" class="site-footer__legal-link">Privacy Policy &amp; Terms</a>
      </div>
    </div>
  </div>
</footer>
```

---

## Footer HTML — Pages Depth (`pages/[page-name]/[page-name].html`)

All paths adjusted with `../../` prefix.

```html
<footer class="site-footer">
  <svg class="footer-va-outline" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 300" width="800" height="300">
    <polygon fill="white" fill-opacity="0.04" points="
      0,60 40,55 80,50 120,52 160,48 200,45 240,50 260,46 300,44 340,46 380,48
      420,44 460,46 500,48 530,50 560,55 590,52 620,48 650,52 670,58 690,65
      710,75 730,90 750,105 760,120 770,130 780,118 790,105 800,100
      800,200 780,210 760,205 740,215 720,220 700,218 680,225 660,230
      640,228 620,235 600,240 580,235 560,242 540,238 520,245 500,240
      480,235 460,230 440,232 420,228 400,235 380,230 360,225 340,220
      320,215 300,210 280,215 260,208 240,212 220,205 200,200 180,195
      160,198 140,192 120,188 100,182 80,178 60,175 40,170 20,165 0,160
    " />
  </svg>
  <div class="site-footer__inner">
    <div class="site-footer__cols">
      <div class="site-footer__col site-footer__col--brand">
        <a href="../../index.html" class="site-footer__logo" aria-label="Virginia Baseball Coaches Association — Home">
          <span class="nav-logo__mark">VBCA</span>
        </a>
        <p class="site-footer__tagline">Unite. Educate. Develop. Support.</p>
        <p class="site-footer__contact"><a href="mailto:tmerry@vbca.org" class="site-footer__link">tmerry@vbca.org</a></p>
        <div class="site-footer__social">
          <p class="site-footer__social-label">Follow VBCA</p>
          <a href="#" class="site-footer__social-link" aria-label="VBCA on X (Twitter)">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.261 5.635zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="#" class="site-footer__social-link" aria-label="VBCA on Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a href="#" class="site-footer__social-link" aria-label="VBCA on Facebook">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
        </div>
      </div>
      <div class="site-footer__col">
        <h5 class="site-footer__heading">Membership</h5>
        <ul class="site-footer__list" role="list">
          <li class="site-footer__list-item"><a href="https://givebutter.com/9XMk3k" class="site-footer__link" target="_blank" rel="noopener noreferrer">Join the VBCA</a></li>
          <li class="site-footer__list-item"><a href="../../pages/membership/membership.html" class="site-footer__link">Membership Tiers</a></li>
          <li class="site-footer__list-item"><a href="../../pages/member-portal/member-portal.html" class="site-footer__link">Member Portal</a></li>
          <li class="site-footer__list-item"><a href="https://abca.org/ABCA-VBCA" class="site-footer__link" target="_blank" rel="noopener noreferrer">VBCA × ABCA Joint</a></li>
        </ul>
      </div>
      <div class="site-footer__col">
        <h5 class="site-footer__heading">Programs</h5>
        <ul class="site-footer__list" role="list">
          <li class="site-footer__list-item"><a href="../../pages/annual-convention/annual-convention.html" class="site-footer__link">Annual Convention</a></li>
          <li class="site-footer__list-item"><a href="../../pages/virginia-all-star-game/virginia-all-star-game.html" class="site-footer__link">Virginia All-Star Game</a></li>
          <li class="site-footer__list-item"><a href="../../pages/hall-of-fame/hall-of-fame.html" class="site-footer__link">Hall of Fame</a></li>
          <li class="site-footer__list-item"><a href="../../pages/scholarships/scholarships.html" class="site-footer__link">Scholarships</a></li>
        </ul>
      </div>
      <div class="site-footer__col">
        <h5 class="site-footer__heading">Resources</h5>
        <ul class="site-footer__list" role="list">
          <li class="site-footer__list-item"><a href="../../pages/events-calendar/events-calendar.html" class="site-footer__link">Events Calendar</a></li>
          <li class="site-footer__list-item"><a href="../../pages/job-board/job-board.html" class="site-footer__link">Job Board</a></li>
          <li class="site-footer__list-item"><a href="../../pages/resource-library/resource-library.html" class="site-footer__link">Resource Library</a></li>
          <li class="site-footer__list-item"><a href="../../pages/news/news.html" class="site-footer__link">News</a></li>
        </ul>
      </div>
      <div class="site-footer__col">
        <h5 class="site-footer__heading">Organization</h5>
        <ul class="site-footer__list" role="list">
          <li class="site-footer__list-item"><a href="../../pages/about/about.html" class="site-footer__link">About Us</a></li>
          <li class="site-footer__list-item"><a href="../../pages/board-of-directors/board-of-directors.html" class="site-footer__link">Board of Directors</a></li>
          <li class="site-footer__list-item"><a href="../../pages/sponsors/sponsors.html" class="site-footer__link">Sponsors & Partners</a></li>
          <li class="site-footer__list-item"><a href="../../pages/contact/contact.html" class="site-footer__link">Contact</a></li>
        </ul>
      </div>
    </div>
    <div class="site-footer__legal">
      <p class="site-footer__legal-text">
        &copy; <span id="copyright-year"></span> Virginia Baseball Coaches Association. All rights reserved. 501(c)3 Nonprofit Organization.
      </p>
      <div class="site-footer__legal-links">
        <a href="../../pages/privacy-policy/privacy-policy.html" class="site-footer__legal-link">Privacy Policy &amp; Terms</a>
      </div>
    </div>
  </div>
</footer>
```

---

## Page Folder Names Reference

All pages/ subdirectory names — for consistent relative path construction:

| Page | Folder Name | HTML File |
|------|-------------|-----------|
| Membership | `membership` | `membership.html` |
| Member Portal | `member-portal` | `member-portal.html` |
| Annual Convention | `annual-convention` | `annual-convention.html` |
| Virginia All-Star Game | `virginia-all-star-game` | `virginia-all-star-game.html` |
| Events Calendar | `events-calendar` | `events-calendar.html` |
| Sponsors & Partners | `sponsors` | `sponsors.html` |
| Become a Sponsor | `become-a-sponsor` | `become-a-sponsor.html` |
| Job Board | `job-board` | `job-board.html` |
| Resource Library | `resource-library` | `resource-library.html` |
| News / Blog | `news` | `news.html` |
| About Us | `about` | `about.html` |
| Board of Directors | `board-of-directors` | `board-of-directors.html` |
| Hall of Fame | `hall-of-fame` | `hall-of-fame.html` |
| Scholarships / Donate | `scholarships` | `scholarships.html` |
| Contact | `contact` | `contact.html` |
| Privacy Policy & Terms | `privacy-policy` | `privacy-policy.html` |
