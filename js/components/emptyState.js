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
  selector,
  {
    title = "No Data Available",
    subtitle = "No records found for selected filters.",
    icon = "📭"
  } = {}
) {

  const html = `

    <div class="empty-state">

      <div class="empty-state-icon">

        ${icon}

      </div>

      <div class="empty-state-title">

        ${title}

      </div>

      <div class="empty-state-subtitle">

        ${subtitle}

      </div>

    </div>

  `;

  setHTML(
    selector,
    html
  );

}

/* ==========================================
   REPORT ERROR
========================================== */

export function renderErrorState(
  selector,
  error
) {

  renderEmptyState(
    selector,
    {

      icon: "⚠️",

      title:
        "Something Went Wrong",

      subtitle:
        error?.message ||
        "Unexpected error occurred."

    }
  );

}

/* ==========================================
   NO DATA
========================================== */

export function renderNoData(
  selector,
  message =
    "No records found."
) {

  renderEmptyState(
    selector,
    {

      icon: "📊",

      title:
        "No Data Available",

      subtitle:
        message

    }
  );

}