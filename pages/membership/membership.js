/**
 * membership.js — VBCA Membership Page
 * FAQ accordion toggle for membership questions.
 */
(function () {
  'use strict';

  var questions = document.querySelectorAll('.faq-item__question');

  questions.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      var answerId = btn.getAttribute('aria-controls');
      var answer = document.getElementById(answerId);
      var icon = btn.querySelector('.faq-item__icon');

      if (expanded) {
        btn.setAttribute('aria-expanded', 'false');
        answer.hidden = true;
        if (icon) icon.textContent = '+';
      } else {
        btn.setAttribute('aria-expanded', 'true');
        answer.hidden = false;
        if (icon) icon.textContent = '−';
      }
    });
  });

}());
