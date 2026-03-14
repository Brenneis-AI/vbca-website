/**
 * hall-of-fame.js — VBCA Hall of Fame Page
 * Accordion timeline, bio modal, jump nav sync
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    /* ================================================================
       ACCORDION — one-open-at-a-time
       ================================================================ */

    var accordion = document.getElementById('hof-accordion');
    if (!accordion) return;

    var items = Array.prototype.slice.call(accordion.querySelectorAll('.hof-accordion__item'));

    function openItem(item) {
      var trigger = item.querySelector('.hof-accordion__trigger');
      var panelId = trigger ? trigger.getAttribute('aria-controls') : null;
      var panel = panelId ? document.getElementById(panelId) : null;

      item.classList.add('hof-accordion__item--active');
      if (trigger) trigger.setAttribute('aria-expanded', 'true');
      if (panel) panel.removeAttribute('hidden');

      syncJumpNav(item.dataset.year);
    }

    function closeItem(item) {
      var trigger = item.querySelector('.hof-accordion__trigger');
      var panelId = trigger ? trigger.getAttribute('aria-controls') : null;
      var panel = panelId ? document.getElementById(panelId) : null;

      item.classList.remove('hof-accordion__item--active');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
      if (panel) panel.setAttribute('hidden', '');
    }

    items.forEach(function (item) {
      var trigger = item.querySelector('.hof-accordion__trigger');
      if (!trigger) return;

      trigger.addEventListener('click', function () {
        var isActive = item.classList.contains('hof-accordion__item--active');

        // Close all items
        items.forEach(function (i) { closeItem(i); });

        // Toggle: only open if it was not already active
        if (!isActive) {
          openItem(item);
          // Scroll to top of accordion header after animation completes
          setTimeout(function () {
            item.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 450);
        }
      });

      // Keyboard: Space / Enter already handled by click; also support
      trigger.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          trigger.click();
        }
      });
    });

    /* ================================================================
       JUMP NAV — sync active link with open accordion item
       ================================================================ */

    function syncJumpNav(year) {
      if (!year) return;
      var navLinks = Array.prototype.slice.call(document.querySelectorAll('.hof-jump-nav__link'));
      navLinks.forEach(function (link) {
        var href = link.getAttribute('href') || '';
        if (href === '#class-' + year) {
          link.classList.add('hof-jump-nav__link--active');
        } else {
          link.classList.remove('hof-jump-nav__link--active');
        }
      });
    }

    // Jump nav link clicks — open corresponding accordion item
    var jumpLinks = Array.prototype.slice.call(document.querySelectorAll('.hof-jump-nav__link'));
    jumpLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = link.getAttribute('href') || '';
        var year = href.replace('#class-', '');
        var target = accordion.querySelector('[data-year="' + year + '"]');
        if (target) {
          items.forEach(function (i) { closeItem(i); });
          openItem(target);
          // Scroll to top of the opened accordion item after animation completes
          setTimeout(function () {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 450);
        }
      });
    });

    // Initialize jump nav to match initially-active item
    var initialActive = accordion.querySelector('.hof-accordion__item--active');
    if (initialActive && initialActive.dataset.year) {
      syncJumpNav(initialActive.dataset.year);
    }

    /* ================================================================
       BIO MODAL
       ================================================================ */

    var modal = document.getElementById('hof-modal');
    if (!modal) return;

    var modalClose = document.getElementById('hof-modal-close');
    var modalBackdrop = document.getElementById('hof-modal-backdrop');
    var modalPhoto = document.getElementById('hof-modal-photo');
    var modalClass = document.getElementById('hof-modal-class');
    var modalAward = document.getElementById('hof-modal-award');
    var modalName = document.getElementById('hof-modal-name');
    var modalSchool = document.getElementById('hof-modal-school');
    var modalStat = document.getElementById('hof-modal-stat');
    var modalBio = document.getElementById('hof-modal-bio');

    var lastFocused = null;

    function openModal(card) {
      var name = card.dataset.name || '';
      var classYear = card.dataset.class || '';
      var photo = card.dataset.photo || '';
      var school = card.dataset.school || '';
      var stat = card.dataset.stat || '';
      var bio = card.dataset.bio || '';
      var award = card.dataset.award || '';

      if (modalPhoto) {
        modalPhoto.src = photo;
        modalPhoto.alt = name + (classYear ? ' — VBCA Hall of Fame Class of ' + classYear : '');
      }
      if (modalClass) modalClass.textContent = classYear ? 'Class of ' + classYear : '';
      if (modalAward) {
        modalAward.textContent = award || '';
        modalAward.style.display = award ? '' : 'none';
      }
      if (modalName) modalName.textContent = name;
      if (modalSchool) modalSchool.textContent = school;
      if (modalStat) modalStat.textContent = stat;
      if (modalBio) modalBio.textContent = bio;

      modal.removeAttribute('hidden');
      document.body.classList.add('hof-modal-open');

      lastFocused = document.activeElement;
      if (modalClose) modalClose.focus();
    }

    function closeModal() {
      modal.setAttribute('hidden', '');
      document.body.classList.remove('hof-modal-open');
      if (lastFocused) lastFocused.focus();
      lastFocused = null;
    }

    // Open modal on bio button click
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.hof-card__bio-btn');
      if (!btn) return;
      var card = btn.closest('.hof-card, .hof-award-card');
      if (card) openModal(card);
    });

    // Close on X button
    if (modalClose) modalClose.addEventListener('click', closeModal);

    // Close on backdrop click
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.hasAttribute('hidden')) {
        closeModal();
      }
    });

    // Focus trap within modal
    modal.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab' || modal.hasAttribute('hidden')) return;

      var focusable = Array.prototype.slice.call(
        modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
      ).filter(function (el) { return !el.disabled && !el.closest('[hidden]'); });

      if (!focusable.length) return;

      var first = focusable[0];
      var last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });

  });

}());
