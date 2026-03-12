/**
 * news.js — VBCA News Page
 * Category filter for news articles.
 *
 * Filter buttons: .news-filter__btn[data-category]
 * Filterable items: .news-card[data-category], .news-featured__card[data-category]
 *
 * Active filter state: .news-filter__btn--active class + aria-pressed="true"
 * Hidden state: .filtered-hidden class (CSS must set display:none or visibility:hidden)
 *
 * "All" category shows everything.
 * Selecting a category shows only matching items.
 * If no items match, shows a "No results" message.
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    var filterNav = document.querySelector('.news-filter__nav');
    if (!filterNav) return;

    var filterBtns = Array.prototype.slice.call(filterNav.querySelectorAll('.news-filter__btn'));
    if (!filterBtns.length) return;

    // Collect all filterable cards (both featured and grid cards)
    var filterableCards = Array.prototype.slice.call(
      document.querySelectorAll('.news-card[data-category], .news-featured__card[data-category]')
    );
    if (!filterableCards.length) return;

    // Create no-results message element
    var noResults = document.createElement('p');
    noResults.className = 'news-no-results';
    noResults.textContent = 'No articles match the selected category.';
    noResults.setAttribute('aria-live', 'polite');
    noResults.style.display = 'none';

    // Insert no-results after the news grid section
    var newsGrid = document.querySelector('.news-grid');
    if (newsGrid) {
      newsGrid.parentNode.insertBefore(noResults, newsGrid.nextSibling);
    }

    /**
     * Apply a filter category.
     * @param {string} category - The data-category value to filter by, or "all".
     */
    function applyFilter(category) {
      var visibleCount = 0;

      filterableCards.forEach(function (card) {
        var cardCategory = card.getAttribute('data-category');
        var matches = category === 'all' || cardCategory === category;

        if (matches) {
          card.classList.remove('filtered-hidden');
          visibleCount++;
        } else {
          card.classList.add('filtered-hidden');
        }
      });

      noResults.style.display = visibleCount === 0 ? '' : 'none';
    }

    /**
     * Update the active state on filter buttons.
     * @param {HTMLElement} activeBtn - The button that was clicked.
     */
    function updateActiveBtn(activeBtn) {
      filterBtns.forEach(function (btn) {
        if (btn === activeBtn) {
          btn.classList.add('news-filter__btn--active');
          btn.setAttribute('aria-pressed', 'true');
        } else {
          btn.classList.remove('news-filter__btn--active');
          btn.setAttribute('aria-pressed', 'false');
        }
      });
    }

    // Attach click handlers to each filter button
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var category = btn.getAttribute('data-category') || 'all';
        updateActiveBtn(btn);
        applyFilter(category);
      });
    });

    // Initialize: activate "All" filter and ensure nothing is hidden on load
    var allBtn = filterNav.querySelector('[data-category="all"]');
    if (allBtn) {
      updateActiveBtn(allBtn);
      applyFilter('all');
    }

  });

}());
