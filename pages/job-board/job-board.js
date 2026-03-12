/**
 * job-board.js — VBCA Job Board Page
 * Filter job cards by level, region, and type.
 *
 * Filter buttons: .jb-filter-btn inside .jb-filter-group[aria-label="Filter by level|region|type"]
 * Filterable items: .job-card[data-level][data-region][data-type]
 *
 * Each filter group operates independently.
 * Cards must match ALL active filters simultaneously (AND logic).
 * "All" in any group disables filtering for that dimension.
 *
 * Active state: .jb-filter-btn--active + aria-pressed="true"
 * Hidden state: .filtered-hidden
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    var jobGrid = document.querySelector('.job-grid');
    if (!jobGrid) return;

    var jobCards = Array.prototype.slice.call(jobGrid.querySelectorAll('.job-card'));
    if (!jobCards.length) return;

    // Track active filter values per dimension
    var activeFilters = {
      level: 'all',
      region: 'all',
      type: 'all'
    };

    // Map aria-label to dimension key
    var dimensionMap = {
      'Filter by level': 'level',
      'Filter by region': 'region',
      'Filter by type': 'type'
    };

    // Collect all filter groups
    var filterGroups = Array.prototype.slice.call(
      document.querySelectorAll('.jb-filter-group[role="group"]')
    );
    if (!filterGroups.length) return;

    // Create no-results message
    var noResults = document.createElement('p');
    noResults.className = 'jb-no-results';
    noResults.textContent = 'No positions match the selected filters.';
    noResults.setAttribute('aria-live', 'polite');
    noResults.style.display = 'none';
    jobGrid.parentNode.insertBefore(noResults, jobGrid.nextSibling);

    /**
     * Apply all active filters to job cards.
     * A card is shown if it matches every active filter dimension.
     */
    function applyFilters() {
      var visibleCount = 0;

      jobCards.forEach(function (card) {
        var levelMatch = activeFilters.level === 'all' ||
          card.getAttribute('data-level') === activeFilters.level;
        var regionMatch = activeFilters.region === 'all' ||
          card.getAttribute('data-region') === activeFilters.region;
        var typeMatch = activeFilters.type === 'all' ||
          card.getAttribute('data-type') === activeFilters.type;

        if (levelMatch && regionMatch && typeMatch) {
          card.classList.remove('filtered-hidden');
          visibleCount++;
        } else {
          card.classList.add('filtered-hidden');
        }
      });

      noResults.style.display = visibleCount === 0 ? '' : 'none';
    }

    /**
     * Update active state on buttons within a filter group.
     * @param {NodeList} btns - All buttons in this group.
     * @param {HTMLElement} activeBtn - The clicked button.
     */
    function updateGroupActive(btns, activeBtn) {
      btns.forEach(function (btn) {
        if (btn === activeBtn) {
          btn.classList.add('jb-filter-btn--active');
          btn.setAttribute('aria-pressed', 'true');
        } else {
          btn.classList.remove('jb-filter-btn--active');
          btn.setAttribute('aria-pressed', 'false');
        }
      });
    }

    filterGroups.forEach(function (group) {
      var label = group.getAttribute('aria-label') || '';
      var dimension = dimensionMap[label];
      if (!dimension) return;

      var btns = Array.prototype.slice.call(group.querySelectorAll('.jb-filter-btn'));
      if (!btns.length) return;

      btns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          // Use data-filter-value if present; otherwise derive from text content.
          // Derivation: lowercase + replace spaces with hyphens to match data attributes on cards.
          // e.g., "High School" → "high-school", "Full-Time" → "full-time", "All" → "all"
          var filterValue;
          if (btn.hasAttribute('data-filter-value')) {
            filterValue = btn.getAttribute('data-filter-value');
          } else {
            var text = btn.textContent.trim().toLowerCase();
            filterValue = text === 'all' ? 'all' : text.replace(/\s+/g, '-');
          }

          activeFilters[dimension] = filterValue;
          updateGroupActive(btns, btn);
          applyFilters();
        });
      });

      // Initialize: mark first "All" button as active in each group
      var allBtn = group.querySelector('.jb-filter-btn--active') || btns[0];
      if (allBtn) {
        updateGroupActive(btns, allBtn);
        var initValue;
        if (allBtn.hasAttribute('data-filter-value')) {
          initValue = allBtn.getAttribute('data-filter-value');
        } else {
          var initText = allBtn.textContent.trim().toLowerCase();
          initValue = initText === 'all' ? 'all' : initText.replace(/\s+/g, '-');
        }
        activeFilters[dimension] = initValue;
      }
    });

    // Apply initial filter state
    applyFilters();

  });

}());
