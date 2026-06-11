/* ==========================================
   CARDS COMPONENT
   Myntra Sales Intelligence
========================================== */

import {
  setHTML
} from "../core/dom.js";

import {
  formatGMV,
  formatUnits,
  formatASP
} from "../core/formatter.js";

/* ==========================================
   KPI BUILDER
========================================== */

export function buildDashboardKpis(
  kpis
) {

  return [

    {
      title: "GMV",
      value: formatGMV(
        kpis.gmv
      )
    },

    {
      title: "TOTAL UNITS",
      value: formatUnits(
        kpis.units
      )
    },

    {
      title: "ASP",
      value: formatASP(
        kpis.asp
      )
    },

    {
      title: "SJIT STOCK",
      value: formatUnits(
        kpis.sjitStock
      )
    },

    {
      title: "SOR STOCK",
      value: formatUnits(
        kpis.sorStock
      )
    }

  ];

}

/* ==========================================
   KPI GRID
========================================== */

export function renderKpiGrid(
  selector,
  cards = []
) {

  const html = `

    <div class="kpi-grid">

      ${cards.map(
        card => `

          <div class="kpi-card">

            <div class="kpi-label">

              ${card.title}

            </div>

            <div class="kpi-value">

              ${card.value}

            </div>

          </div>

        `
      ).join("")}

    </div>

  `;

  setHTML(
    selector,
    html
  );

}

/* ==========================================
   SIMPLE CARD GRID
========================================== */

export function renderCardGrid(
  selector,
  cards = []
) {

  const html = `

    <div class="card-grid">

      ${cards.map(
        card => `

          <div class="card">

            <div class="card-title">

              ${card.title}

            </div>

            <div class="card-value">

              ${card.value}

            </div>

          </div>

        `
      ).join("")}

    </div>

  `;

  setHTML(
    selector,
    html
  );

}