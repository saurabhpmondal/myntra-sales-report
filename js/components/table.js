/* ==========================================
   TABLE COMPONENT
   Myntra Sales Intelligence
========================================== */

import {
  setHTML
} from "../core/dom.js";

/* ==========================================
   RENDER TABLE
========================================== */

export function renderTable(
  containerId,
  {
    columns = [],
    rows = [],
    emptyMessage =
      "No Data Available"
  }
) {

  if (!rows.length) {

    setHTML(
      containerId,
      buildEmptyState(
        emptyMessage
      )
    );

    return;

  }

  const html = `

    <div class="table-wrapper">

      <table class="report-table">

        <thead>

          <tr>

            ${columns
              .map(
                column => `

                  <th
                    data-key="${column.key}"
                  >
                    ${column.label}
                  </th>

                `
              )
              .join("")}

          </tr>

        </thead>

        <tbody>

          ${rows
            .map(
              row =>
                buildRow(
                  columns,
                  row
                )
            )
            .join("")}

        </tbody>

      </table>

    </div>

  `;

  setHTML(
    containerId,
    html
  );

}

/* ==========================================
   TABLE ROW
========================================== */

function buildRow(
  columns,
  row
) {

  return `

    <tr>

      ${columns
        .map(
          column => `

            <td>

              ${
                row[
                  column.key
                ] ?? ""
              }

            </td>

          `
        )
        .join("")}

    </tr>

  `;

}

/* ==========================================
   EMPTY STATE
========================================== */

function buildEmptyState(
  message
) {

  return `

    <div class="empty-state">

      <div
        class="empty-state-title"
      >

        No Records Found

      </div>

      <div
        class="empty-state-subtitle"
      >

        ${message}

      </div>

    </div>

  `;

}

/* ==========================================
   COLUMN BUILDER
========================================== */

export function buildColumns(
  fields = []
) {

  return fields.map(
    field => ({

      key: field.key,

      label:
        field.label

    })
  );

}

/* ==========================================
   SIMPLE SEARCH
========================================== */

export function searchRows(
  rows = [],
  keyword = ""
) {

  if (
    !keyword ||
    !rows.length
  ) {

    return rows;

  }

  const search =
    String(keyword)
      .toLowerCase()
      .trim();

  return rows.filter(
    row => {

      return Object.values(
        row
      ).some(
        value =>

          String(value)
            .toLowerCase()
            .includes(
              search
            )
      );

    }
  );

}

/* ==========================================
   SORT ROWS
========================================== */

export function sortRows(
  rows = [],
  field,
  direction = "desc"
) {

  if (
    !field
  ) {

    return rows;

  }

  return [...rows].sort(
    (a, b) => {

      const aValue =
        a[field];

      const bValue =
        b[field];

      const aNumber =
        Number(aValue);

      const bNumber =
        Number(bValue);

      const isNumeric =
        !isNaN(
          aNumber
        ) &&
        !isNaN(
          bNumber
        );

      if (
        isNumeric
      ) {

        return direction ===
          "asc"
          ? aNumber -
              bNumber
          : bNumber -
              aNumber;

      }

      return direction ===
        "asc"
        ? String(
            aValue
          ).localeCompare(
            String(
              bValue
            )
          )
        : String(
            bValue
          ).localeCompare(
            String(
              aValue
            )
          );

    }
  );

}

/* ==========================================
   PAGINATION
========================================== */

export function paginateRows(
  rows = [],
  page = 1,
  pageSize = 50
) {

  const start =
    (page - 1) *
    pageSize;

  const end =
    start +
    pageSize;

  return rows.slice(
    start,
    end
  );

}

/* ==========================================
   TOTAL PAGES
========================================== */

export function getTotalPages(
  totalRows = 0,
  pageSize = 50
) {

  return Math.ceil(
    totalRows /
      pageSize
  );

}