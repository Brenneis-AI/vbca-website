/**
 * events-calendar.js — VBCA Events Calendar Page
 * Filter event cards by type category.
 *
 * NOTE: Per the Developer Handoff comments in events-calendar.html, the calendar
 * buttons (.ec-event-card__cal-btn) are currently [disabled] pending date confirmation.
 * This file handles the filter interaction.
 * Add-to-calendar functionality is handled by global/calendar.js using data attributes.
 *
 * Filter buttons: .ec-filter-btn[data-type] (if present in HTML)
 * Filterable items: .ec-event-card[data-type]
 *
 * If no filter UI is present on the page, this script exits silently
 * and the page functions as static content, which is the intended Phase 1 behavior.
 *
 * Active state: .ec-filter-btn--active + aria-pressed="true"
 * Hidden state: .filtered-hidden
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    /* ------------------------------------------------------------------ */
    /* EVENT TYPE FILTER (present only if filter UI is added in HTML)      */
    /* ------------------------------------------------------------------ */

    var filterNav = document.querySelector('.ec-filter-nav');

    if (filterNav) {
      var filterBtns = Array.prototype.slice.call(filterNav.querySelectorAll('.ec-filter-btn'));
      var eventCards = Array.prototype.slice.call(
        document.querySelectorAll('.ec-event-card[data-type]')
      );

      if (filterBtns.length && eventCards.length) {

        var noResults = document.createElement('p');
        noResults.className = 'ec-no-results';
        noResults.textContent = 'No events match the selected type.';
        noResults.setAttribute('aria-live', 'polite');
        noResults.style.display = 'none';

        var eventsGrid = document.querySelector('.ec-events-grid');
        if (eventsGrid) {
          eventsGrid.parentNode.insertBefore(noResults, eventsGrid.nextSibling);
        }

        function applyEventFilter(type) {
          var count = 0;
          eventCards.forEach(function (card) {
            var cardType = card.getAttribute('data-type') || '';
            var visible = type === 'all' || cardType === type;
            if (visible) {
              card.classList.remove('filtered-hidden');
              count++;
            } else {
              card.classList.add('filtered-hidden');
            }
          });
          noResults.style.display = count === 0 ? '' : 'none';
        }

        function updateActiveFilter(activeBtn) {
          filterBtns.forEach(function (btn) {
            if (btn === activeBtn) {
              btn.classList.add('ec-filter-btn--active');
              btn.setAttribute('aria-pressed', 'true');
            } else {
              btn.classList.remove('ec-filter-btn--active');
              btn.setAttribute('aria-pressed', 'false');
            }
          });
        }

        filterBtns.forEach(function (btn) {
          btn.addEventListener('click', function () {
            var type = btn.getAttribute('data-type') || 'all';
            updateActiveFilter(btn);
            applyEventFilter(type);
          });
        });

        var allBtn = filterNav.querySelector('[data-type="all"]') || filterBtns[0];
        if (allBtn) {
          updateActiveFilter(allBtn);
          applyEventFilter('all');
        }
      }
    }

    /* ------------------------------------------------------------------ */
    /* ADD-TO-CALENDAR BUTTONS (Phase 1 — currently disabled)             */
    /* The [disabled] buttons are handled by global/calendar.js via       */
    /* data-calendar-type attributes once event dates are confirmed.      */
    /* No action needed here for Phase 1.                                  */
    /* ------------------------------------------------------------------ */

  });

}());
