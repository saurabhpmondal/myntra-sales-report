/* ==========================================
   FILTERS COMPONENT
   Myntra Sales Intelligence
========================================== */

import {
  getFilters,
  setFilter
} from "../core/filterStore.js";

import {
  setHTML
} from "../core/dom.js";

/* ==========================================
   FILTER DATA
========================================== */

let FILTER_OPTIONS = {

  months: [],

  dates: [],

  brands: [],

  erpStatuses: [],

  articleTypes: []

};

/* ==========================================
   RENDER FILTERS
========================================== */

export function renderFilters(
  options = {}
) {

  FILTER_OPTIONS = {

    ...FILTER_OPTIONS,

    ...options

  };

  const filters =
    getFilters();

  const html = `

    <div class="filter-group">

      <label class="filter-label">
        Month
      </label>

      <select
        id="filter-month"
        class="filter-control"
      >

        ${buildOptions(
          FILTER_OPTIONS.months,
          filters.month
        )}

      </select>

    </div>

    <div class="filter-group">

      <label class="filter-label">
        Date
      </label>

      <select
        id="filter-date"
        class="filter-control"
      >

        ${buildOptions(
          FILTER_OPTIONS.dates,
          filters.date
        )}

      </select>

    </div>

    <div class="filter-group">

      <label class="filter-label">
        Brand
      </label>

      <select
        id="filter-brand"
        class="filter-control"
      >

        ${buildOptions(
          FILTER_OPTIONS.brands,
          filters.brand
        )}

      </select>

    </div>

    <div class="filter-group">

      <label class="filter-label">
        ERP Status
      </label>

      <select
        id="filter-erp-status"
        class="filter-control"
      >

        ${buildOptions(
          FILTER_OPTIONS.erpStatuses,
          filters.erpStatus
        )}

      </select>

    </div>

    <div class="filter-group">

      <label class="filter-label">
        Article Type
      </label>

      <select
        id="filter-article-type"
        class="filter-control"
      >

        ${buildOptions(
          FILTER_OPTIONS.articleTypes,
          filters.articleType
        )}

      </select>

    </div>

  `;

  setHTML(
    "#global-filters",
    html
  );

  bindEvents();

}

/* ==========================================
   BUILD OPTIONS
========================================== */

function buildOptions(
  values = [],
  selected = "ALL"
) {

  const uniqueValues =
    [
      "ALL",
      ...new Set(
        values.filter(Boolean)
      )
    ];

  return uniqueValues
    .map(
      value => `

        <option
          value="${value}"
          ${
            String(value) ===
            String(selected)
              ? "selected"
              : ""
          }
        >
          ${value}
        </option>

      `
    )
    .join("");

}

/* ==========================================
   EVENTS
========================================== */

function bindEvents() {

  document
    .getElementById(
      "filter-month"
    )
    ?.addEventListener(
      "change",
      event => {

        setFilter(
          "month",
          event.target.value
        );

      }
    );

  document
    .getElementById(
      "filter-date"
    )
    ?.addEventListener(
      "change",
      event => {

        setFilter(
          "date",
          event.target.value
        );

      }
    );

  document
    .getElementById(
      "filter-brand"
    )
    ?.addEventListener(
      "change",
      event => {

        setFilter(
          "brand",
          event.target.value
        );

      }
    );

  document
    .getElementById(
      "filter-erp-status"
    )
    ?.addEventListener(
      "change",
      event => {

        setFilter(
          "erpStatus",
          event.target.value
        );

      }
    );

  document
    .getElementById(
      "filter-article-type"
    )
    ?.addEventListener(
      "change",
      event => {

        setFilter(
          "articleType",
          event.target.value
        );

      }
    );

}

/* ==========================================
   FILTER OPTION BUILDERS
========================================== */

export function buildFilterOptions(
  {
    calendar = [],
    sales = [],
    productMaster = []
  } = {}
) {

  const months =
    [...new Set(
      calendar
        .map(
          row =>
            row.month
        )
        .filter(Boolean)
    )];

  const dates =
    [...new Set(
      calendar
        .map(
          row =>
            row.date
        )
        .filter(Boolean)
    )];

  const brands =
    [...new Set(
      sales
        .map(
          row =>
            row.brand
        )
        .filter(Boolean)
    )]
      .sort();

  const erpStatuses =
    [...new Set(
      productMaster
        .map(
          row =>
            row.status
        )
        .filter(Boolean)
    )]
      .sort();

  const articleTypes =
    [...new Set(
      productMaster
        .map(
          row =>
            row.article_type
        )
        .filter(Boolean)
    )]
      .sort();

  return {

    months,

    dates,

    brands,

    erpStatuses,

    articleTypes

  };

}
