/**
 * contact.js — VBCA Contact Page
 * Handles contact form validation and success/error state display.
 * Note: This is Phase 1 preview. Form action is "#" — no backend connected.
 * Success state is simulated for preview purposes.
 * Replace form action and this JS behavior when connecting to actual form handler.
 */

(function () {
  'use strict';

  var form = document.getElementById('contact-form');
  var successPanel = document.getElementById('form-success');
  var errorBanner = document.getElementById('form-error-banner');

  if (!form) return;

  function showError(inputId, errorId) {
    var input = document.getElementById(inputId);
    var error = document.getElementById(errorId);
    if (input && error) {
      input.setAttribute('aria-invalid', 'true');
      error.hidden = false;
    }
  }

  function clearErrors() {
    var inputs = form.querySelectorAll('.form-input');
    inputs.forEach(function (input) {
      input.removeAttribute('aria-invalid');
    });
    var errors = form.querySelectorAll('.form-field-error');
    errors.forEach(function (error) {
      error.hidden = true;
    });
    if (errorBanner) errorBanner.hidden = true;
  }

  function validateForm() {
    var valid = true;

    var fullName = document.getElementById('full-name');
    if (!fullName || !fullName.value.trim()) {
      showError('full-name', 'full-name-error');
      valid = false;
    }

    var email = document.getElementById('email');
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email.value.trim())) {
      showError('email', 'email-error');
      valid = false;
    }

    var subject = document.getElementById('subject');
    if (!subject || !subject.value) {
      showError('subject', 'subject-error');
      valid = false;
    }

    var message = document.getElementById('message');
    if (!message || !message.value.trim()) {
      showError('message', 'message-error');
      valid = false;
    }

    return valid;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearErrors();

    if (!validateForm()) {
      // Scroll to first error
      var firstError = form.querySelector('[aria-invalid="true"]');
      if (firstError) {
        firstError.focus();
      }
      return;
    }

    /**
     * Phase 1 Preview: Simulate success state.
     * Replace this block with actual fetch/XHR submission when backend is connected.
     *
     * Example production implementation:
     * fetch('/api/contact', { method: 'POST', body: new FormData(form) })
     *   .then(function(res) {
     *     if (res.ok) { showSuccess(); } else { showErrorState(); }
     *   })
     *   .catch(function() { showErrorState(); });
     */
    showSuccess();
  });

  function showSuccess() {
    form.hidden = true;
    if (successPanel) {
      successPanel.hidden = false;
      successPanel.focus();
    }
    if (errorBanner) errorBanner.hidden = true;
  }

  function showErrorState() {
    if (errorBanner) {
      errorBanner.hidden = false;
      errorBanner.focus();
    }
  }

})();
