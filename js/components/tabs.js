/* ==========================================
   TABS COMPONENT
   Myntra Sales Intelligence
========================================== */

import {
  ENABLED_REPORTS,
  DEFAULT_REPORT
} from "../config/reportsConfig.js";

import {
  setHTML
} from "../core/dom.js";

let activeTab =
  DEFAULT_REPORT;

let tabChangeHandler =
  null;

/* ==========================================
   RENDER TABS
========================================== */

export function renderTabs() {

  const html =
    ENABLED_REPORTS
      .map(
        report => {

          return `

            <button
              class="tab-button ${
                report.id === activeTab
                  ? "active"
                  : ""
              }"
              data-report="${
                report.id
              }"
            >

              <span>
                ${report.icon}
              </span>

              <span>
                ${report.label}
              </span>

            </button>

          `;

        }
      )
      .join("");

  setHTML(
    "#tabs-bar",
    html
  );

  bindTabEvents();

}

/* ==========================================
   BIND EVENTS
========================================== */

function bindTabEvents() {

  const tabs =
    document.querySelectorAll(
      ".tab-button"
    );

  tabs.forEach(
    tab => {

      tab.addEventListener(
        "click",
        () => {

          const reportId =
            tab.dataset.report;

          if (
            reportId ===
            activeTab
          ) {

            return;

          }

          setActiveTab(
            reportId
          );

        }
      );

    }
  );

}

/* ==========================================
   SET ACTIVE TAB
========================================== */

export function setActiveTab(
  reportId
) {

  activeTab =
    reportId;

  updateActiveState();

  if (
    typeof tabChangeHandler ===
    "function"
  ) {

    tabChangeHandler(
      reportId
    );

  }

}

/* ==========================================
   UPDATE ACTIVE STATE
========================================== */

function updateActiveState() {

  const tabs =
    document.querySelectorAll(
      ".tab-button"
    );

  tabs.forEach(
    tab => {

      const reportId =
        tab.dataset.report;

      tab.classList.toggle(
        "active",
        reportId ===
          activeTab
      );

    }
  );

}

/* ==========================================
   TAB CHANGE LISTENER
========================================== */

export function onTabChange(
  callback
) {

  tabChangeHandler =
    callback;

}

/* ==========================================
   GET ACTIVE TAB
========================================== */

export function getActiveTab() {

  return activeTab;

}

/* ==========================================
   RESET
========================================== */

export function resetTabs() {

  activeTab =
    DEFAULT_REPORT;

  updateActiveState();

}
