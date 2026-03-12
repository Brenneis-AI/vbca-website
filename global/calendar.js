/**
 * calendar.js — VBCA Add-to-Calendar
 * Handles Add to Calendar button clicks.
 * Generates .ics file downloads, Google Calendar links, and Outlook links.
 *
 * Event data is read from data attributes on the calendar button's closest
 * ancestor with [data-event-title], or from the button itself.
 *
 * Required data attributes on the event container (e.g., .convention-calendar-options or .ec-event-card):
 *   data-event-title       — "VBCA Annual Convention"
 *   data-event-start       — ISO 8601 date "2026-12-04" or datetime "2026-12-04T09:00:00"
 *   data-event-end         — ISO 8601 date "2026-12-05" or datetime "2026-12-04T17:00:00"
 *   data-event-location    — "UVA Darden School of Business, Charlottesville, VA"
 *   data-event-description — Optional longer description text
 *
 * Calendar button identification:
 *   Buttons/links with:
 *     data-calendar-type="ics"     → download .ics file
 *     data-calendar-type="google"  → open Google Calendar link
 *     data-calendar-type="outlook" → open Outlook Web link
 *
 * PHASE 1 NOTE: Event dates are TBD for most events. Buttons with [aria-disabled="true"]
 * or [disabled] are skipped — the JS will not override the disabled state.
 * When the client confirms dates, update the data attributes in HTML and remove disabled/aria-disabled.
 *
 * Guard: if no calendar buttons are present on the page, exits silently.
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    // Calendar action buttons — look for both link and button variants
    var calBtns = Array.prototype.slice.call(
      document.querySelectorAll('[data-calendar-type]')
    );

    if (!calBtns.length) return;

    /* ------------------------------------------------------------------ */
    /* UTILITY: Read event data from nearest ancestor container            */
    /* ------------------------------------------------------------------ */

    function getEventData(el) {
      // Walk up DOM to find the element carrying data-event-title
      var container = el;
      while (container && container !== document.body) {
        if (container.hasAttribute('data-event-title')) break;
        container = container.parentElement;
      }

      if (!container || !container.hasAttribute('data-event-title')) {
        return null;
      }

      return {
        title: container.getAttribute('data-event-title') || '',
        start: container.getAttribute('data-event-start') || '',
        end: container.getAttribute('data-event-end') || '',
        location: container.getAttribute('data-event-location') || '',
        description: container.getAttribute('data-event-description') || ''
      };
    }

    /* ------------------------------------------------------------------ */
    /* UTILITY: Format date for .ics (YYYYMMDDTHHmmss or YYYYMMDD)       */
    /* ------------------------------------------------------------------ */

    function formatIcsDate(isoString) {
      if (!isoString) return '';
      // Strip dashes, colons, and convert to ICS format
      if (isoString.indexOf('T') !== -1) {
        // Datetime: "2026-12-04T09:00:00" → "20261204T090000"
        return isoString.replace(/[-:]/g, '').replace(/\.\d+Z?$/, '');
      }
      // Date only: "2026-12-04" → "20261204"
      return isoString.replace(/-/g, '');
    }

    /* ------------------------------------------------------------------ */
    /* UTILITY: Escape text for .ics VEVENT fields                         */
    /* ------------------------------------------------------------------ */

    function escapeIcs(str) {
      return str
        .replace(/\\/g, '\\\\')
        .replace(/;/g, '\\;')
        .replace(/,/g, '\\,')
        .replace(/\n/g, '\\n');
    }

    /* ------------------------------------------------------------------ */
    /* GENERATE .ICS FILE AND TRIGGER DOWNLOAD                             */
    /* ------------------------------------------------------------------ */

    function downloadIcs(data) {
      var uid = 'vbca-' + Date.now() + '@vbca.org';
      var now = formatIcsDate(new Date().toISOString());
      var startDate = formatIcsDate(data.start);
      var endDate = formatIcsDate(data.end || data.start);

      // For all-day events (date only, no T), use DATE value type
      var isAllDay = data.start.indexOf('T') === -1;
      var dtStartLine = isAllDay
        ? 'DTSTART;VALUE=DATE:' + startDate
        : 'DTSTART:' + startDate;
      var dtEndLine = isAllDay
        ? 'DTEND;VALUE=DATE:' + endDate
        : 'DTEND:' + endDate;

      var ics = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Virginia Baseball Coaches Association//VBCA//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        'UID:' + uid,
        'DTSTAMP:' + now + 'Z',
        dtStartLine,
        dtEndLine,
        'SUMMARY:' + escapeIcs(data.title),
        'LOCATION:' + escapeIcs(data.location),
        'DESCRIPTION:' + escapeIcs(data.description),
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      var blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = data.title.replace(/\s+/g, '-').toLowerCase() + '.ics';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }

    /* ------------------------------------------------------------------ */
    /* GENERATE GOOGLE CALENDAR LINK                                        */
    /* ------------------------------------------------------------------ */

    function buildGoogleCalendarUrl(data) {
      var base = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
      var startDate = formatIcsDate(data.start);
      var endDate = formatIcsDate(data.end || data.start);

      var params = [
        'text=' + encodeURIComponent(data.title),
        'dates=' + startDate + '/' + endDate,
        'location=' + encodeURIComponent(data.location),
        'details=' + encodeURIComponent(data.description)
      ].join('&');

      return base + '&' + params;
    }

    /* ------------------------------------------------------------------ */
    /* GENERATE OUTLOOK WEB CALENDAR LINK                                  */
    /* ------------------------------------------------------------------ */

    function buildOutlookUrl(data) {
      var base = 'https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent';
      var params = [
        'subject=' + encodeURIComponent(data.title),
        'startdt=' + encodeURIComponent(data.start),
        'enddt=' + encodeURIComponent(data.end || data.start),
        'location=' + encodeURIComponent(data.location),
        'body=' + encodeURIComponent(data.description)
      ].join('&');

      return base + '&' + params;
    }

    /* ------------------------------------------------------------------ */
    /* ATTACH EVENT LISTENERS                                               */
    /* ------------------------------------------------------------------ */

    calBtns.forEach(function (btn) {
      // Skip buttons that are disabled or aria-disabled in Phase 1
      if (btn.disabled || btn.getAttribute('aria-disabled') === 'true') return;

      var calType = btn.getAttribute('data-calendar-type');
      if (!calType) return;

      btn.addEventListener('click', function (e) {
        var data = getEventData(btn);
        if (!data || !data.title || !data.start) {
          // Event data not available — do nothing (button should remain disabled until data present)
          return;
        }

        if (calType === 'ics') {
          e.preventDefault();
          downloadIcs(data);
        } else if (calType === 'google') {
          e.preventDefault();
          window.open(buildGoogleCalendarUrl(data), '_blank', 'noopener,noreferrer');
        } else if (calType === 'outlook') {
          e.preventDefault();
          window.open(buildOutlookUrl(data), '_blank', 'noopener,noreferrer');
        }
      });
    });

  });

}());
