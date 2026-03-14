/**
 * index.js — VBCA Home Page
 * HOF inductee carousel: arrow-button navigation + keyboard support.
 * Swipe is handled natively by CSS overflow-x scroll + scroll-snap.
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var track = document.getElementById('hof-track');
    if (!track) return;

    var prevBtn = document.getElementById('hof-prev');
    var nextBtn = document.getElementById('hof-next');

    function getScrollAmount() {
      var card = track.querySelector('.hof-carousel__card');
      if (!card) return 0;
      var gap = parseFloat(getComputedStyle(track).gap) || 16;
      return card.offsetWidth + gap;
    }

    function scrollPrev() {
      track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    }

    function scrollNext() {
      track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    }

    if (prevBtn) prevBtn.addEventListener('click', scrollPrev);
    if (nextBtn) nextBtn.addEventListener('click', scrollNext);

    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { scrollPrev(); e.preventDefault(); }
      if (e.key === 'ArrowRight') { scrollNext(); e.preventDefault(); }
    });
  });

}());
