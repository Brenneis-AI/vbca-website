/**
 * hall-of-fame.js — VBCA Hall of Fame Page
 * HOF class tab switcher with full ARIA tab pattern and keyboard navigation
 *
 * Targets:
 *   [role="tablist"]   — .hof-tabs container
 *   [role="tab"]       — .hof-tab buttons
 *   [role="tabpanel"]  — .hof-class-panel divs
 *
 * ARIA pattern: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    var tabList = document.querySelector('[role="tablist"]');
    if (!tabList) return;

    var tabs = Array.prototype.slice.call(tabList.querySelectorAll('[role="tab"]'));
    if (!tabs.length) return;

    /**
     * Activate a tab: update ARIA attributes, show its panel, hide others.
     * @param {HTMLElement} targetTab - The tab button to activate.
     */
    function activateTab(targetTab) {
      tabs.forEach(function (tab) {
        var panelId = tab.getAttribute('aria-controls');
        var panel = document.getElementById(panelId);

        if (tab === targetTab) {
          // Activate
          tab.setAttribute('aria-selected', 'true');
          tab.classList.add('hof-tab--active');
          tab.removeAttribute('tabindex');
          if (panel) {
            panel.removeAttribute('hidden');
            panel.classList.add('hof-class-panel--active');
          }
        } else {
          // Deactivate
          tab.setAttribute('aria-selected', 'false');
          tab.classList.remove('hof-tab--active');
          tab.setAttribute('tabindex', '-1');
          if (panel) {
            panel.setAttribute('hidden', '');
            panel.classList.remove('hof-class-panel--active');
          }
        }
      });
    }

    /**
     * Handle keyboard navigation within the tablist.
     * Arrow keys move focus; Home/End jump to first/last.
     * Enter/Space activate the focused tab.
     */
    function onKeyDown(e) {
      var currentIndex = tabs.indexOf(document.activeElement);
      if (currentIndex === -1) return;

      var nextIndex = -1;

      switch (e.key) {
        case 'ArrowRight':
          nextIndex = (currentIndex + 1) % tabs.length;
          break;
        case 'ArrowLeft':
          nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
          break;
        case 'Home':
          nextIndex = 0;
          break;
        case 'End':
          nextIndex = tabs.length - 1;
          break;
        case 'Enter':
        case ' ':
          activateTab(document.activeElement);
          e.preventDefault();
          return;
        default:
          return;
      }

      if (nextIndex !== -1) {
        e.preventDefault();
        tabs[nextIndex].focus();
        // Follow focus: activate on arrow key navigation per ARIA auto-activation pattern
        activateTab(tabs[nextIndex]);
      }
    }

    // Attach click handlers
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        activateTab(tab);
      });
    });

    // Attach keyboard handler to the tablist
    tabList.addEventListener('keydown', onKeyDown);

    // Initialize: ensure first tab is active, all others deactivated and tabindex=-1
    var initialActive = tabList.querySelector('[aria-selected="true"]');
    if (initialActive) {
      activateTab(initialActive);
    } else {
      activateTab(tabs[0]);
    }

  });

}());
