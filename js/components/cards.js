/* ==========================================
   CARDS COMPONENT
   Myntra Sales Intelligence
========================================== */

import {
  formatGMV,
  formatUnits,
  formatASP
} from "../core/formatter.js";

import {
  setHTML
} from "../core/dom.js";

/* ==========================================
   KPI GRID
========================================== */

export function renderKpiGrid(
  containerId,
  cards = []
) {

  const html = `

    <div class="kpi-grid">

      ${cards
        .map(
          card =>
            buildKpiCard(
              card
            )
        )
        .join("")}

    </div>

  `;

  setHTML(
    containerId,
    html
  );

}

/* ==========================================
   KPI CARD
========================================== */

function buildKpiCard(
  {
    title = "",
    value = 0,
    type = "NUMBER",
    subtitle = ""
  }
) {

  return `

    <div class="kpi-card">

      <div class="kpi-label">
        ${title}
      </div>

      <div class="kpi-value">
        ${formatValue(
          type,
          value
        )}
      </div>

      <div class="kpi-footer">
        ${subtitle}
      </div>

    </div>

  `;

}

/* ==========================================
   FORMAT VALUE
========================================== */

function formatValue(
  type,
  value
) {

  switch (type) {

    case "GMV":

      return formatGMV(
        value
      );

    case "ASP":

      return formatASP(
        value
      );

    case "UNITS":

      return formatUnits(
        value
      );

    default:

      return formatUnits(
        value
      );

  }

}

/* ==========================================
   KPI BUILDER
========================================== */

export function buildDashboardKpis(
  {
    gmv = 0,
    units = 0,
    asp = 0,
    sjitStock = 0,
    sorStock = 0
  }
) {

  return [

    {
      title: "GMV",
      value: gmv,
      type: "GMV",
      subtitle:
        "Sales Value"
    },

    {
      title:
        "TOTAL UNITS",
      value: units,
      type: "UNITS",
      subtitle:
        "Units Sold"
    },

    {
      title: "ASP",
      value: asp,
      type: "ASP",
      subtitle:
        "Average Selling Price"
    },

    {
      title:
        "SJIT STOCK",
      value: sjitStock,
      type: "UNITS",
      subtitle:
        "Sellable Inventory"
    },

    {
      title:
        "SOR STOCK",
      value: sorStock,
      type: "UNITS",
      subtitle:
        "Warehouse Stock"
    }

  ];

}