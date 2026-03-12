/**
 * carousel.js — VBCA Sponsor Carousel (shared)
 * Auto-advancing sponsor logo carousel with dot navigation, hover pause, and touch/swipe support.
 *
 * Expects this HTML structure inside a container element with class .sponsors-carousel-placeholder:
 *   <div class="carousel-track">
 *     <div class="carousel-slide">...</div>
 *     <div class="carousel-slide">...</div>
 *     ...
 *   </div>
 *   <div class="carousel-dots" aria-label="Carousel navigation">
 *     <!-- dots are injected by this script -->
 *   </div>
 *
 * NOTE for Phase 1: The home page has static placeholder logos in .sponsors-carousel-placeholder.
 * The carousel is fully initialized when real sponsor logos are added and the HTML structure matches
 * the expected .carousel-track / .carousel-slide pattern.
 * Guard: if .carousel-track is not found, this script exits silently.
 */

(function () {
  'use strict';

  var AUTOPLAY_INTERVAL = 4000; // 4 seconds
  var SWIPE_THRESHOLD = 50;     // minimum px distance to register as a swipe

  document.addEventListener('DOMContentLoaded', function () {

    var carousels = document.querySelectorAll('.sponsors-carousel-placeholder');
    if (!carousels.length) return;

    carousels.forEach(function (carouselEl) {
      var track = carouselEl.querySelector('.carousel-track');
      if (!track) return;

      var slides = Array.prototype.slice.call(track.querySelectorAll('.carousel-slide'));
      if (slides.length < 2) return;

      var dotsContainer = carouselEl.querySelector('.carousel-dots');
      var currentIndex = 0;
      var timer = null;
      var touchStartX = 0;
      var touchStartY = 0;
      var isDragging = false;

      /* ------------------------------------------------------------------ */
      /* DOT NAVIGATION                                                       */
      /* ------------------------------------------------------------------ */

      function buildDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        slides.forEach(function (slide, i) {
          var dot = document.createElement('button');
          dot.type = 'button';
          dot.className = 'carousel-dot' + (i === 0 ? ' carousel-dot--active' : '');
          dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
          dot.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
          dot.addEventListener('click', function () {
            goTo(i);
            restartTimer();
          });
          dotsContainer.appendChild(dot);
        });
      }

      function updateDots() {
        if (!dotsContainer) return;
        var dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach(function (dot, i) {
          if (i === currentIndex) {
            dot.classList.add('carousel-dot--active');
            dot.setAttribute('aria-pressed', 'true');
          } else {
            dot.classList.remove('carousel-dot--active');
            dot.setAttribute('aria-pressed', 'false');
          }
        });
      }

      /* ------------------------------------------------------------------ */
      /* SLIDE NAVIGATION                                                     */
      /* ------------------------------------------------------------------ */

      function goTo(index) {
        slides[currentIndex].classList.remove('carousel-slide--active');
        slides[currentIndex].setAttribute('aria-hidden', 'true');

        currentIndex = (index + slides.length) % slides.length;

        slides[currentIndex].classList.add('carousel-slide--active');
        slides[currentIndex].setAttribute('aria-hidden', 'false');

        updateDots();
      }

      function goNext() {
        goTo(currentIndex + 1);
      }

      /* ------------------------------------------------------------------ */
      /* AUTOPLAY TIMER                                                       */
      /* ------------------------------------------------------------------ */

      function startTimer() {
        timer = setInterval(goNext, AUTOPLAY_INTERVAL);
      }

      function stopTimer() {
        if (timer) {
          clearInterval(timer);
          timer = null;
        }
      }

      function restartTimer() {
        stopTimer();
        startTimer();
      }

      /* ------------------------------------------------------------------ */
      /* HOVER PAUSE                                                          */
      /* ------------------------------------------------------------------ */

      carouselEl.addEventListener('mouseenter', stopTimer);
      carouselEl.addEventListener('mouseleave', startTimer);

      carouselEl.addEventListener('focusin', stopTimer);
      carouselEl.addEventListener('focusout', startTimer);

      /* ------------------------------------------------------------------ */
      /* TOUCH / SWIPE SUPPORT                                               */
      /* ------------------------------------------------------------------ */

      carouselEl.addEventListener('touchstart', function (e) {
        if (!e.touches || !e.touches[0]) return;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        isDragging = true;
      }, { passive: true });

      carouselEl.addEventListener('touchend', function (e) {
        if (!isDragging) return;
        isDragging = false;
        if (!e.changedTouches || !e.changedTouches[0]) return;

        var deltaX = e.changedTouches[0].clientX - touchStartX;
        var deltaY = e.changedTouches[0].clientY - touchStartY;

        // Only register horizontal swipes; ignore if vertical movement is dominant
        if (Math.abs(deltaX) < SWIPE_THRESHOLD || Math.abs(deltaY) > Math.abs(deltaX)) return;

        if (deltaX < 0) {
          goTo(currentIndex + 1);
        } else {
          goTo(currentIndex - 1);
        }
        restartTimer();
      }, { passive: true });

      /* ------------------------------------------------------------------ */
      /* INITIALIZE                                                           */
      /* ------------------------------------------------------------------ */

      // Set initial states
      slides.forEach(function (slide, i) {
        if (i === 0) {
          slide.classList.add('carousel-slide--active');
          slide.setAttribute('aria-hidden', 'false');
        } else {
          slide.setAttribute('aria-hidden', 'true');
        }
      });

      buildDots();
      startTimer();
    });

  });

}());
