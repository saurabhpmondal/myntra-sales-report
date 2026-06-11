/* ==========================================
   HEADER COMPONENT
   Myntra Sales Intelligence
========================================== */

import {
  getLoadedAt,
  getAllAppData
} from "../core/cache.js";

import {
  setHTML
} from "../core/dom.js";

/* ==========================================
   RENDER HEADER
========================================== */

export function renderHeader() {

  const html = `
  
    <div class="header-left">

      <img
        src="./assets/logo.png"
        alt="Logo"
        class="header-logo"
      >

      <div class="header-title">

        <h1>
          Myntra Sales Intelligence
        </h1>

        <span>
          Sales • Inventory • Growth • Planning
        </span>

      </div>

    </div>

    <div class="header-right">

      <div class="summary-badge">

        <div class="summary-label">
          Last Refresh
        </div>

        <div
          class="summary-value"
          id="last-refresh-value"
        >
          -
        </div>

      </div>

    </div>

  `;

  setHTML(
    "#app-header",
    html
  );

  updateHeader();

}

/* ==========================================
   UPDATE HEADER
========================================== */

export function updateHeader() {

  updateLastRefresh();

}

/* ==========================================
   LAST REFRESH
========================================== */

function updateLastRefresh() {

  const loadedAt =
    getLoadedAt();

  const element =
    document.getElementById(
      "last-refresh-value"
    );

  if (!element) {
    return;
  }

  if (!loadedAt) {

    element.textContent =
      "-";

    return;

  }

  const date =
    new Date(
      loadedAt
    );

  element.textContent =
    date.toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }
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
  } = {}
) {

  const html = `

    <div class="summary-badge">

      <div class="summary-label">
        Selected Month
      </div>

      <div class="summary-value">
        ${selectedMonth}
      </div>

    </div>

    <div class="summary-badge">

      <div class="summary-label">
        Records Loaded
      </div>

      <div class="summary-value">
        ${Number(
          recordsLoaded
        ).toLocaleString(
          "en-IN"
        )}
      </div>

    </div>

    <div class="summary-badge">

      <div class="summary-label">
        Latest Data Date
      </div>

      <div class="summary-value">
        ${latestDate}
      </div>

    </div>

  `;

  setHTML(
    "#summary-bar",
    html
  );

}

/* ==========================================
   GET TOTAL RECORDS
========================================== */

export function getTotalRecords() {

  const data =
    getAllAppData();

  let total = 0;

  Object.values(
    data
  ).forEach(
    dataset => {

      if (
        Array.isArray(
          dataset
        )
      ) {

        total +=
          dataset.length;

      }

    }
  );

  return total;

}