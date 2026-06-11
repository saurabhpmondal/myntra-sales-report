/* ==========================================
   DASHBOARD BINDER
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
  renderLineChart,
  renderStackedBarChart,
  renderDonutChart
} from "../../components/chart.js";

import {
  ERP_STATUS_COLUMNS,
  BRAND_COLUMNS,
  PO_TYPE_COLUMNS
} from "./dashboardConfig.js";

import {
  formatGMV,
  formatUnits,
  formatASP,
  formatPercent
} from "../../core/formatter.js";

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

  const data =
    fetchDashboardData();

  const dashboard =
    buildDashboard(
      data
    );

  container.innerHTML =
    getDashboardHTML();

  renderKpis(
    dashboard.kpis
  );

  renderCharts(
    dashboard
  );

  renderStatusTable(
    dashboard.statusPerformance
  );

  renderBrandTable(
    dashboard.brandPerformance
  );

  renderPoTypeTable(
    dashboard.poTypePerformance
  );

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
   CHARTS
========================================== */

function renderCharts(
  dashboard
) {

  renderLineChart(
    "daily-units-chart",
    {
      labels:
        dashboard
          .dailyTrend
          .labels,

      values:
        dashboard
          .dailyTrend
          .values,

      label:
        "Units"
    }
  );

  renderStackedBarChart(
    "daily-brand-chart",
    {
      labels:
        dashboard
          .brandTrend
          .labels,

      datasets:
        dashboard
          .brandTrend
          .datasets
    }
  );

  renderDonutChart(
    "po-type-chart",
    {
      labels:
        dashboard
          .poTypeChart
          .labels,

      values:
        dashboard
          .poTypeChart
          .values
    }
  );

}

/* ==========================================
   STATUS TABLE
========================================== */

function renderStatusTable(
  rows
) {

  const formatted =
    rows.map(
      row => ({

        status:
          row.status,

        units:
          formatUnits(
            row.units
          ),

        gmv:
          formatGMV(
            row.gmv
          ),

        share:
          formatPercent(
            row.share
          )

      })
    );

  renderTable(
    "#status-table",
    {

      columns:
        ERP_STATUS_COLUMNS,

      rows:
        formatted

    }
  );

}

/* ==========================================
   BRAND TABLE
========================================== */

function renderBrandTable(
  rows
) {

  const formatted =
    rows.map(
      row => ({

        brand:
          row.brand,

        units:
          formatUnits(
            row.units
          ),

        gmv:
          formatGMV(
            row.gmv
          ),

        asp:
          formatASP(
            row.asp
          ),

        share:
          formatPercent(
            row.share
          )

      })
    );

  renderTable(
    "#brand-table",
    {

      columns:
        BRAND_COLUMNS,

      rows:
        formatted

    }
  );

}

/* ==========================================
   PO TYPE TABLE
========================================== */

function renderPoTypeTable(
  rows
) {

  const formatted =
    rows.map(
      row => ({

        poType:
          row.poType,

        units:
          formatUnits(
            row.units
          ),

        gmv:
          formatGMV(
            row.gmv
          ),

        share:
          formatPercent(
            row.share
          )

      })
    );

  renderTable(
    "#po-type-table",
    {

      columns:
        PO_TYPE_COLUMNS,

      rows:
        formatted

    }
  );

}

/* ==========================================
   HTML
========================================== */

function getDashboardHTML() {

  return `

    <div id="dashboard-page">

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
              PO Type Wise Units
            </div>

          </div>

          <div
            id="po-type-chart"
            class="chart-container"
          ></div>

        </div>

      </section>

      <section class="report-section">

        <div class="section-header">

          <div class="section-title">
            ERP Status Performance
          </div>

        </div>

        <div
          id="status-table"
        ></div>

      </section>

      <section class="report-section">

        <div class="section-header">

          <div class="section-title">
            Brand Performance
          </div>

        </div>

        <div
          id="brand-table"
        ></div>

      </section>

      <section class="report-section">

        <div class="section-header">

          <div class="section-title">
            PO Type Performance
          </div>

        </div>

        <div
          id="po-type-table"
        ></div>

      </section>

    </div>

  `;

}