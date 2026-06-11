/* ==========================================
   HEADER COMPONENT
   Myntra Sales Intelligence
========================================== */

import {
  setHTML
} from "../core/dom.js";

import {
  getLoadedAt
} from "../core/cache.js";

/* ==========================================
   RENDER HEADER
========================================== */

export function renderHeader() {

  const html = `

    <div class="app-header-inner">

      <div class="app-brand">

        <div class="app-logo">

          📊

        </div>

        <div>

          <div class="app-title">

            Myntra Sales Intelligence

          </div>

          <div class="app-subtitle">

            Sales • Stock • Business Analytics

          </div>

        </div>

      </div>

      <div class="app-actions">

        <button
          id="refresh-btn"
          class="header-btn"
        >

          Refresh

        </button>

        <button
          id="export-btn"
          class="header-btn primary"
        >

          Export

        </button>

      </div>

    </div>

  `;

  setHTML(
    "#app-header",
    html
  );

}

/* ==========================================
   SUMMARY BAR
========================================== */

export function renderSummaryBar(
  {
    selectedMonth = "-",
    recordsLoaded = 0,
    latestDate = "-"
  }
) {

  const loadedAt =
    getLoadedAt();

  const refreshTime =
    loadedAt
      ? loadedAt.toLocaleString(
          "en-IN"
        )
      : "-";

  const html = `

    <div class="summary-grid">

      <div class="summary-card">

        <div class="summary-label">
          Selected Month
        </div>

        <div class="summary-value">
          ${selectedMonth}
        </div>

      </div>

      <div class="summary-card">

        <div class="summary-label">
          Latest Date
        </div>

        <div class="summary-value">
          ${latestDate}
        </div>

      </div>

      <div class="summary-card">

        <div class="summary-label">
          Records Loaded
        </div>

        <div class="summary-value">
          ${recordsLoaded.toLocaleString("en-IN")}
        </div>

      </div>

      <div class="summary-card">

        <div class="summary-label">
          Last Refresh
        </div>

        <div class="summary-value">
          ${refreshTime}
        </div>

      </div>

    </div>

  `;

  setHTML(
    "#summary-bar",
    html
  );

}

/* ==========================================
   TOTAL RECORDS
========================================== */

export function getTotalRecords() {

  return 0;

}