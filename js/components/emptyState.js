/* ==========================================
   EMPTY STATE COMPONENT
   Myntra Sales Intelligence
========================================== */

import {
  setHTML
} from "../core/dom.js";

/* ==========================================
   RENDER EMPTY STATE
========================================== */

export function renderEmptyState(
  containerId,
  {
    title = "No Data Available",
    subtitle = "Try changing filters or refresh the data.",
    icon = "📭"
  } = {}
) {

  const html = buildEmptyState({
    title,
    subtitle,
    icon
  });

  setHTML(
    containerId,
    html
  );

}

/* ==========================================
   BUILD EMPTY STATE
========================================== */

export function buildEmptyState(
  {
    title = "No Data Available",
    subtitle = "Try changing filters or refresh the data.",
    icon = "📭"
  } = {}
) {

  return `

    <div class="empty-state">

      <div
        class="empty-state-icon"
      >

        ${icon}

      </div>

      <div
        class="empty-state-title"
      >

        ${title}

      </div>

      <div
        class="empty-state-subtitle"
      >

        ${subtitle}

      </div>

    </div>

  `;

}

/* ==========================================
   REPORT EMPTY STATE
========================================== */

export function buildReportEmptyState(
  reportName = "Report"
) {

  return buildEmptyState({

    icon: "📊",

    title:
      `No ${reportName} Data Found`,

    subtitle:
      "Current filters returned no records."

  });

}

/* ==========================================
   FILTER EMPTY STATE
========================================== */

export function buildFilterEmptyState() {

  return buildEmptyState({

    icon: "🔍",

    title:
      "No Matching Records",

    subtitle:
      "Try broadening the selected filters."

  });

}

/* ==========================================
   ERROR EMPTY STATE
========================================== */

export function buildErrorState(
  message = "Something went wrong."
) {

  return buildEmptyState({

    icon: "⚠️",

    title:
      "Unable To Load Data",

    subtitle:
      message

  });

}