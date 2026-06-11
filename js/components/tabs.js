/* ==========================================
   TABS COMPONENT
   Myntra Sales Intelligence
========================================== */

import {
  REPORTS
} from "../config/reportsConfig.js";

import {
  setHTML
} from "../core/dom.js";

/* ==========================================
   STATE
========================================== */

let ACTIVE_TAB =
  "dashboard";

let TAB_CALLBACK =
  null;

/* ==========================================
   RENDER TABS
========================================== */

export function renderTabs() {

  const html = `

    <div class="tabs-wrapper">

      ${REPORTS.map(
        report => `

          <button
            class="report-tab ${
              report.id ===
              ACTIVE_TAB
                ? "active"
                : ""
            }"
            data-tab="${
              report.id
            }"
          >

            ${report.name}

          </button>

        `
      ).join("")}

    </div>

  `;

  setHTML(
    "#tabs-bar",
    html
  );

  bindEvents();

}

/* ==========================================
   TAB CHANGE
========================================== */

export function onTabChange(
  callback
) {

  TAB_CALLBACK =
    callback;

}

/* ==========================================
   ACTIVE TAB
========================================== */

export function getActiveTab() {

  return ACTIVE_TAB;

}

/* ==========================================
   SET ACTIVE TAB
========================================== */

export function setActiveTab(
  tabId
) {

  ACTIVE_TAB =
    tabId;

  renderTabs();

}

/* ==========================================
   EVENTS
========================================== */

function bindEvents() {

  document
    .querySelectorAll(
      ".report-tab"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          async event => {

            const tabId =
              event.currentTarget.dataset.tab;

            if (
              tabId ===
              ACTIVE_TAB
            ) {

              return;

            }

            ACTIVE_TAB =
              tabId;

            renderTabs();

            if (
              typeof TAB_CALLBACK ===
              "function"
            ) {

              await TAB_CALLBACK(
                tabId
              );

            }

          }
        );

      }
    );

}