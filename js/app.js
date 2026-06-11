/* ==========================================
   APP
   Myntra Sales Intelligence
========================================== */

import {
  loadAllData,
  buildCalendar,
  getLatestMonth
} from "./core/dataLoader.js";

import {
  getAppData
} from "./core/cache.js";

import {
  buildLookups
} from "./core/lookupBuilder.js";

import {
  initializeFilters,
  subscribe
} from "./core/filterStore.js";

import {
  buildFilterOptions,
  renderFilters
} from "./components/filters.js";

import {
  renderHeader,
  renderSummaryBar,
  getTotalRecords
} from "./components/header.js";

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

let CALENDAR = [];

let CURRENT_REPORT =
  "dashboard";

/* ==========================================
   START APP
========================================== */

document.addEventListener(
  "DOMContentLoaded",
  initializeApp
);

/* ==========================================
   INITIALIZE
========================================== */

async function initializeApp() {

  try {

    showFullScreenLoader(
      "Loading Data..."
    );

    renderHeader();

    /* ==========================
       LOAD DATA
    ========================== */

    updateLoaderMessage(
      "Loading Google Sheets..."
    );

    await loadAllData();

    /* ==========================
       LOOKUPS
    ========================== */

    updateLoaderMessage(
      "Building Lookups..."
    );

    buildLookups();

    /* ==========================
       CALENDAR
    ========================== */

    updateLoaderMessage(
      "Preparing Calendar..."
    );

    CALENDAR =
      buildCalendar(

        getAppData(
          "sales"
        ),

        getAppData(
          "returns"
        ),

        getAppData(
          "productMaster"
        )

      );

    const latestMonth =
      getLatestMonth(
        CALENDAR
      );

    initializeFilters(
      latestMonth
    );

    /* ==========================
       FILTERS
    ========================== */

    renderGlobalFilters();

    /* ==========================
       SUMMARY
    ========================== */

    renderAppSummary(
      latestMonth
    );

    /* ==========================
       TABS
    ========================== */

    renderTabs();

    onTabChange(
      loadReport
    );

    /* ==========================
       FILTER SUBSCRIPTION
    ========================== */

    subscribe(
      () => {

        loadReport(
          CURRENT_REPORT
        );

      }
    );

    /* ==========================
       INITIAL REPORT
    ========================== */

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

    document
      .getElementById(
        "report-container"
      )
      .innerHTML = `

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

/* ==========================================
   FILTERS
========================================== */

function renderGlobalFilters() {

  const filterOptions =
    buildFilterOptions({

      calendar:
        CALENDAR,

      sales:
        getAppData(
          "sales"
        ),

      productMaster:
        getAppData(
          "productMaster"
        )

    });

  renderFilters(
    filterOptions
  );

}

/* ==========================================
   SUMMARY
========================================== */

function renderAppSummary(
  latestMonth
) {

  const sales =
    getAppData(
      "sales"
    ) || [];

  let latestDate = "-";

  if (
    sales.length
  ) {

    latestDate =
      sales
        .map(
          row =>
            row.date
        )
        .filter(Boolean)
        .sort()
        .at(-1) || "-";

  }

  renderSummaryBar({

    selectedMonth:

      latestMonth
        ? `${latestMonth.month}-${latestMonth.year}`
        : "-",

    recordsLoaded:
      getTotalRecords(),

    latestDate

  });

}

/* ==========================================
   REPORT LOADER
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
        `Unknown Report: ${reportId}`
      );

    }

    const binderModule =
      await import(
        report.binder
      );

    if (
      typeof binderModule.render !==
      "function"
    ) {

      throw new Error(
        `${reportId} binder missing render()`
      );

    }

    await binderModule.render();

  } catch (error) {

    console.error(
      error
    );

    document
      .getElementById(
        "report-container"
      )
      .innerHTML = `

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