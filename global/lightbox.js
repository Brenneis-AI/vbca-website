/**
 * lightbox.js — VBCA Shared Gallery Lightbox
 * Click any gallery image to open full-screen lightbox with prev/next navigation.
 *
 * Targets:
 *   .gallery-item img          — images inside gallery grid items (convention page)
 *   .asg-gallery__item img     — images inside All-Star Game gallery items
 *
 * Guard: if no gallery images are found on the page, exits silently.
 * Does not affect pages without gallery elements.
 *
 * Accessibility:
 *   - Dialog role with aria-modal
 *   - Focus trapped inside lightbox while open
 *   - Escape key closes
 *   - Arrow keys navigate prev/next
 *   - Click outside (on overlay backdrop) closes
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    // Collect gallery images from all supported gallery patterns
    var galleryItems = Array.prototype.slice.call(
      document.querySelectorAll(
        '.gallery-item img, .asg-gallery__item img, .hof-card__photo img'
      )
    );

    // Filter out placeholder items (images with no real src or from placeholders)
    galleryItems = galleryItems.filter(function (img) {
      return img.src && !img.closest('.gallery-item--placeholder') &&
             !img.closest('.asg-gallery__item--placeholder');
    });

    if (!galleryItems.length) return;

    /* ------------------------------------------------------------------ */
    /* BUILD LIGHTBOX OVERLAY                                               */
    /* ------------------------------------------------------------------ */

    var lightbox = document.createElement('div');
    lightbox.className = 'lightbox-overlay';
    lightbox.id = 'vbca-lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Image lightbox');
    lightbox.setAttribute('hidden', '');

    lightbox.innerHTML = [
      '<div class="lightbox-inner">',
      '  <button class="lightbox-close" id="lightbox-close" aria-label="Close lightbox">',
      '    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">',
      '      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
      '    </svg>',
      '  </button>',
      '  <button class="lightbox-prev" id="lightbox-prev" aria-label="Previous image">',
      '    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">',
      '      <polyline points="15 18 9 12 15 6"/>',
      '    </svg>',
      '  </button>',
      '  <figure class="lightbox-figure">',
      '    <img class="lightbox-img" id="lightbox-img" src="" alt="" loading="eager">',
      '    <figcaption class="lightbox-caption" id="lightbox-caption"></figcaption>',
      '  </figure>',
      '  <button class="lightbox-next" id="lightbox-next" aria-label="Next image">',
      '    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">',
      '      <polyline points="9 18 15 12 9 6"/>',
      '    </svg>',
      '  </button>',
      '  <div class="lightbox-counter" id="lightbox-counter" aria-live="polite" aria-atomic="true"></div>',
      '</div>'
    ].join('\n');

    document.body.appendChild(lightbox);

    var lightboxImg = document.getElementById('lightbox-img');
    var lightboxCaption = document.getElementById('lightbox-caption');
    var lightboxCounter = document.getElementById('lightbox-counter');
    var closeBtn = document.getElementById('lightbox-close');
    var prevBtn = document.getElementById('lightbox-prev');
    var nextBtn = document.getElementById('lightbox-next');
    var lightboxInner = lightbox.querySelector('.lightbox-inner');

    var currentLightboxIndex = 0;
    var triggerEl = null; // element that opened the lightbox — returns focus here on close

    /* ------------------------------------------------------------------ */
    /* OPEN / CLOSE / NAVIGATE                                              */
    /* ------------------------------------------------------------------ */

    function openLightbox(index) {
      currentLightboxIndex = index;
      updateLightboxContent();
      lightbox.removeAttribute('hidden');
      document.body.classList.add('lightbox-open');
      closeBtn.focus();
    }

    function closeLightbox() {
      lightbox.setAttribute('hidden', '');
      document.body.classList.remove('lightbox-open');
      if (triggerEl) {
        triggerEl.focus();
        triggerEl = null;
      }
    }

    function updateLightboxContent() {
      var img = galleryItems[currentLightboxIndex];
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || '';
      lightboxCaption.textContent = img.alt || '';
      lightboxCounter.textContent = (currentLightboxIndex + 1) + ' / ' + galleryItems.length;
    }

    function showPrev() {
      currentLightboxIndex = (currentLightboxIndex - 1 + galleryItems.length) % galleryItems.length;
      updateLightboxContent();
    }

    function showNext() {
      currentLightboxIndex = (currentLightboxIndex + 1) % galleryItems.length;
      updateLightboxContent();
    }

    /* ------------------------------------------------------------------ */
    /* EVENT LISTENERS                                                      */
    /* ------------------------------------------------------------------ */

    // Open on gallery image click
    galleryItems.forEach(function (img, i) {
      // Make the image keyboard accessible
      img.setAttribute('tabindex', '0');
      img.style.cursor = 'pointer';
      img.setAttribute('role', 'button');
      img.setAttribute('aria-haspopup', 'dialog');

      function openFromImg(e) {
        e.preventDefault();
        triggerEl = img;
        openLightbox(i);
      }

      img.addEventListener('click', openFromImg);
      img.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openFromImg(e);
        }
      });
    });

    // Close button
    closeBtn.addEventListener('click', closeLightbox);

    // Prev / Next buttons
    prevBtn.addEventListener('click', showPrev);
    nextBtn.addEventListener('click', showNext);

    // Click outside lightbox inner panel (on backdrop) closes
    lightbox.addEventListener('click', function (e) {
      if (!lightboxInner.contains(e.target)) {
        closeLightbox();
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
      if (lightbox.hasAttribute('hidden')) return;

      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          showPrev();
          break;
        case 'ArrowRight':
          showNext();
          break;
        default:
          break;
      }
    });

    // Focus trap: keep Tab focus inside the lightbox when open
    lightbox.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var focusable = Array.prototype.slice.call(
        lightbox.querySelectorAll('button, [tabindex="0"]')
      ).filter(function (el) {
        return !el.disabled && el.offsetParent !== null;
      });

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
