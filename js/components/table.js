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
  selector,
  {
    columns = [],
    rows = []
  }
) {

  const html = `

    <div class="table-wrapper">

      <table class="report-table">

        <thead>

          <tr>

            ${columns
              .map(
                column => `

                  <th>

                    ${column.label}

                  </th>

                `
              )
              .join("")}

          </tr>

        </thead>

        <tbody>

          ${
            rows.length
              ? rows
                  .map(
                    row => `

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

                    `
                  )
                  .join("")
              : `

                <tr>

                  <td
                    colspan="${columns.length}"
                    class="table-empty"
                  >

                    No Data Available

                  </td>

                </tr>

              `
          }

        </tbody>

      </table>

    </div>

  `;

  setHTML(
    selector,
    html
  );

}

/* ==========================================
   BUILD COLUMN
========================================== */

export function buildColumn(
  key,
  label
) {

  return {
    key,
    label
  };

}