/* ==========================================
   DASHBOARD BINDER
   Myntra Sales Intelligence
========================================== */

import {
  fetchDashboardData
} from "./dashboardFetcher.js";

import {
  buildDashboard
} from "./dashboardEngine.js";

import {
  buildDashboardKpis,
  renderKpiGrid
} from "../../components/cards.js";

import {
  renderTable
} from "../../components/table.js";

import {
  showLoader
} from "../../components/loader.js";

import {
  BRAND_COLUMNS,
  STATUS_COLUMNS,
  PROJECTION_COLUMNS
} from "./dashboardConfig.js";

/* ==========================================
   PUBLIC RENDER
========================================== */

export async function render() {

  const container =
    document.getElementById(
      "report-container"
    );

  if (!container) {
    return;
  }

  showLoader(
    "#report-container",
    "Loading Dashboard..."
  );

  try {

    const dashboardData =
      fetchDashboardData();

    const result =
      buildDashboard(
        dashboardData
      );

    container.innerHTML =
      getDashboardHTML();

    renderKpis(
      result.kpis
    );

    renderStatusTable(
      result.statusPerformance
    );

    renderBrandTable(
      result.brandPerformance
    );

    renderBrandProjection(
      result.brandProjection
    );

    renderPoTypeProjection(
      result.poTypeProjection
    );

    renderChartPlaceholders(
      result
    );

  } catch (error) {

    console.error(
      error
    );

    container.innerHTML = `

      <div class="empty-state">

        <div class="empty-state-icon">
          ⚠️
        </div>

        <div class="empty-state-title">
          Dashboard Failed To Load
        </div>

        <div class="empty-state-subtitle">
          ${error.message}
        </div>

      </div>

    `;

  }

}

/* ==========================================
   KPI
========================================== */

function renderKpis(
  kpis
) {

  const cards =
    buildDashboardKpis(
      kpis
    );

  renderKpiGrid(
    "#dashboard-kpis",
    cards
  );

}

/* ==========================================
   STATUS TABLE
========================================== */

function renderStatusTable(
  rows
) {

  renderTable(
    "#status-performance-table",
    {
      columns:
        STATUS_COLUMNS,
      rows
    }
  );

}

/* ==========================================
   BRAND TABLE
========================================== */

function renderBrandTable(
  rows
) {

  renderTable(
    "#brand-performance-table",
    {
      columns:
        BRAND_COLUMNS,
      rows
    }
  );

}

/* ==========================================
   BRAND PROJECTION
========================================== */

function renderBrandProjection(
  rows
) {

  renderTable(
    "#brand-projection-table",
    {
      columns:
        PROJECTION_COLUMNS,
      rows,
      emptyMessage:
        "Projection Coming Soon"
    }
  );

}

/* ==========================================
   PO TYPE PROJECTION
========================================== */

function renderPoTypeProjection(
  rows
) {

  renderTable(
    "#po-type-projection-table",
    {
      columns:
        PROJECTION_COLUMNS,
      rows,
      emptyMessage:
        "Projection Coming Soon"
    }
  );

}

/* ==========================================
   CHART PLACEHOLDERS
========================================== */

function renderChartPlaceholders() {

  const dailyUnits =
    document.getElementById(
      "daily-units-chart"
    );

  const dailyBrand =
    document.getElementById(
      "daily-brand-chart"
    );

  const poType =
    document.getElementById(
      "po-type-chart"
    );

  if (dailyUnits) {

    dailyUnits.innerHTML = `

      <div class="empty-state">

        <div class="empty-state-icon">
          📈
        </div>

        <div class="empty-state-title">
          Daily Units Trend
        </div>

        <div class="empty-state-subtitle">
          Chart Engine Next Step
        </div>

      </div>

    `;

  }

  if (dailyBrand) {

    dailyBrand.innerHTML = `

      <div class="empty-state">

        <div class="empty-state-icon">
          📊
        </div>

        <div class="empty-state-title">
          Brand Trend
        </div>

        <div class="empty-state-subtitle">
          Chart Engine Next Step
        </div>

      </div>

    `;

  }

  if (poType) {

    poType.innerHTML = `

      <div class="empty-state">

        <div class="empty-state-icon">
          🥧
        </div>

        <div class="empty-state-title">
          PO Type Performance
        </div>

        <div class="empty-state-subtitle">
          Chart Engine Next Step
        </div>

      </div>

    `;

  }

}

/* ==========================================
   HTML
========================================== */

function getDashboardHTML() {

  return `

    <div id="dashboard-page">

      <section class="report-section">

        <div class="section-header">

          <div>

            <div class="section-title">
              Dashboard
            </div>

            <div class="section-subtitle">
              Sales, Stock & Performance Overview
            </div>

          </div>

        </div>

      </section>

      <section class="report-section">

        <div id="dashboard-kpis"></div>

      </section>

      <section class="report-section">

        <div class="chart-card">

          <div class="section-header">

            <div class="section-title">
              Daily Units Trend
            </div>

          </div>

          <div
            id="daily-units-chart"
            class="chart-container"
          ></div>

        </div>

      </section>

      <section class="report-section">

        <div class="chart-card">

          <div class="section-header">

            <div class="section-title">
              Daily Brand Wise Sales
            </div>

          </div>

          <div
            id="daily-brand-chart"
            class="chart-container"
          ></div>

        </div>

      </section>

      <section class="report-section">

        <div class="chart-card">

          <div class="section-header">

            <div class="section-title">
              PO Type Performance
            </div>

          </div>

          <div
            id="po-type-chart"
            class="chart-container"
          ></div>

        </div>

      </section>

      <section class="report-section">

        <div class="grid grid-2">

          <div>

            <div class="section-header">

              <div class="section-title">
                Brand Projection
              </div>

            </div>

            <div
              id="brand-projection-table"
            ></div>

          </div>

          <div>

            <div class="section-header">

              <div class="section-title">
                PO Type Projection
              </div>

            </div>

            <div
              id="po-type-projection-table"
            ></div>

          </div>

        </div>

      </section>

      <section class="report-section">

        <div class="section-header">

          <div class="section-title">
            Status Performance
          </div>

        </div>

        <div
          id="status-performance-table"
        ></div>

      </section>

      <section class="report-section">

        <div class="section-header">

          <div class="section-title">
            Brand Performance
          </div>

        </div>

        <div
          id="brand-performance-table"
        ></div>

      </section>

    </div>

  `;

}