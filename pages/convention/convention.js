/**
 * convention.js — VBCA Annual Convention Page
 * FAQ accordion toggle
 * Lightweight functional JS — no dependencies
 */

(function () {
  'use strict';

  /**
   * FAQ Accordion
   * Toggles aria-expanded and hidden attribute on answer panels
   */
  function initFaqAccordion() {
    var questions = document.querySelectorAll('.faq-item__question');
    if (!questions.length) return;

    questions.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var expanded = btn.getAttribute('aria-expanded') === 'true';
        var answerId = btn.getAttribute('aria-controls');
        var answer = document.getElementById(answerId);
        if (!answer) return;

        // Toggle this item
        btn.setAttribute('aria-expanded', !expanded);
        if (expanded) {
          answer.setAttribute('hidden', '');
        } else {
          answer.removeAttribute('hidden');
        }
      });

      // Keyboard: Enter and Space already trigger click on buttons
      // This handler ensures focus styling is visible
      btn.addEventListener('focusin', function () {
        btn.closest('.faq-item').classList.add('faq-item--focused');
      });
      btn.addEventListener('focusout', function () {
        btn.closest('.faq-item').classList.remove('faq-item--focused');
      });
    });
  }

  // Init when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFaqAccordion);
  } else {
    initFaqAccordion();
  }

}());
