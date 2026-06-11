/* ==========================================
   APP
   Myntra Sales Intelligence
========================================== */

import {
  loadAllData
} from "./core/dataLoader.js";

import {
  getAppData
} from "./core/cache.js";

import {
  buildLookups
} from "./core/lookupBuilder.js";

import {
  getLatestMonth
} from "./core/dateUtils.js";

import {
  initializeFilters,
  subscribe
} from "./core/filterStore.js";

import {
  renderHeader,
  renderSummaryBar,
  getTotalRecords
} from "./components/header.js";

import {
  renderFilters,
  buildFilterOptions
} from "./components/filters.js";

import {
  renderTabs,
  onTabChange
} from "./components/tabs.js";

import {
  showFullScreenLoader,
  hideFullScreenLoader,
  updateLoaderMessage
} from "./components/loader.js";

import {
  REPORT_REGISTRY
} from "./config/reportsConfig.js";

/* ==========================================
   APP STATE
========================================== */

let CURRENT_REPORT =
  "dashboard";

/* ==========================================
   INIT
========================================== */

document.addEventListener(
  "DOMContentLoaded",
  initializeApp
);

/* ==========================================
   APP START
========================================== */

async function initializeApp() {

  try {

    showFullScreenLoader(
      "Loading Application..."
    );

    renderHeader();

    /* ======================
       LOAD DATA
    ====================== */

    updateLoaderMessage(
      "Loading Google Sheets..."
    );

    await loadAllData();

    /* ======================
       LOOKUPS
    ====================== */

    updateLoaderMessage(
      "Building Lookups..."
    );

    buildLookups();

    /* ======================
       SALES
    ====================== */

    const sales =
      getAppData(
        "sales"
      ) || [];

    /* ======================
       LATEST MONTH
    ====================== */

    const latestMonth =
      getLatestMonth(
        sales
      );

    initializeFilters(
      latestMonth
        ?.monthKey
    );

    /* ======================
       FILTERS
    ====================== */

    renderGlobalFilters();

    /* ======================
       HEADER SUMMARY
    ====================== */

    renderAppSummary(
      latestMonth
    );

    /* ======================
       TABS
    ====================== */

    renderTabs();

    onTabChange(
      loadReport
    );

    /* ======================
       FILTER EVENTS
    ====================== */

    subscribe(
      () => {

        loadReport(
          CURRENT_REPORT
        );

      }
    );

    /* ======================
       LOAD DASHBOARD
    ====================== */

    updateLoaderMessage(
      "Loading Dashboard..."
    );

    await loadReport(
      "dashboard"
    );

    hideFullScreenLoader();

  } catch (error) {

    console.error(
      error
    );

    hideFullScreenLoader();

    const container =
      document.getElementById(
        "report-container"
      );

    if (
      container
    ) {

      container.innerHTML = `

        <div class="empty-state">

          <div class="empty-state-icon">
            ⚠️
          </div>

          <div class="empty-state-title">
            Application Failed To Load
          </div>

          <div class="empty-state-subtitle">
            ${error.message}
          </div>

        </div>

      `;

    }

  }

}

/* ==========================================
   FILTERS
========================================== */

function renderGlobalFilters() {

  const sales =
    getAppData(
      "sales"
    ) || [];

  const productMaster =
    getAppData(
      "productMaster"
    ) || [];

  const filterOptions =
    buildFilterOptions({

      sales,

      productMaster

    });

  renderFilters(
    filterOptions
  );

}

/* ==========================================
   SUMMARY BAR
========================================== */

function renderAppSummary(
  latestMonth
) {

  const sales =
    getAppData(
      "sales"
    ) || [];

  const latestDate =
    sales
      .map(
        row =>
          row.date
      )
      .filter(Boolean)
      .sort()
      .at(-1) || "-";

  renderSummaryBar({

    selectedMonth:
      latestMonth
        ?.monthLabel ||
      "-",

    recordsLoaded:
      getTotalRecords(),

    latestDate

  });

}

/* ==========================================
   LOAD REPORT
========================================== */

async function loadReport(
  reportId
) {

  try {

    CURRENT_REPORT =
      reportId;

    const report =
      REPORT_REGISTRY[
        reportId
      ];

    if (
      !report
    ) {

      throw new Error(
        `Report not found: ${reportId}`
      );

    }

    const module =
      await import(
        report.binder
      );

    if (
      typeof module.render !==
      "function"
    ) {

      throw new Error(
        `${reportId} binder missing render()`
      );

    }

    await module.render();

  } catch (error) {

    console.error(
      error
    );

    const container =
      document.getElementById(
        "report-container"
      );

    if (
      container
    ) {

      container.innerHTML = `

        <div class="empty-state">

          <div class="empty-state-icon">
            ⚠️
          </div>

          <div class="empty-state-title">
            Report Load Failed
          </div>

          <div class="empty-state-subtitle">
            ${error.message}
          </div>

        </div>

      `;

    }

  }

}