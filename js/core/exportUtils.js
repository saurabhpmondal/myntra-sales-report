/* ==========================================
   EXPORT UTILS
   Myntra Sales Intelligence
========================================== */

/* ==========================================
   CSV EXPORT
========================================== */

export function exportToCSV(
  rows = [],
  fileName = "export"
) {

  if (!rows.length) {

    alert(
      "No data available to export."
    );

    return;

  }

  const headers =
    Object.keys(
      rows[0]
    );

  const csv = [

    headers.join(","),

    ...rows.map(
      row => {

        return headers
          .map(
            header => {

              const value =
                row[
                  header
                ] ?? "";

              return `"${String(
                value
              ).replace(
                /"/g,
                '""'
              )}"`;

            }
          )
          .join(",");

      }
    )

  ].join("\n");

  downloadFile(
    csv,
    `${fileName}.csv`,
    "text/csv;charset=utf-8;"
  );

}

/* ==========================================
   JSON EXPORT
========================================== */

export function exportToJSON(
  data = [],
  fileName = "export"
) {

  const json =
    JSON.stringify(
      data,
      null,
      2
    );

  downloadFile(
    json,
    `${fileName}.json`,
    "application/json"
  );

}

/* ==========================================
   TABLE EXPORT
========================================== */

export function exportTableData(
  rows = [],
  fileName = "table-export"
) {

  exportToCSV(
    rows,
    fileName
  );

}

/* ==========================================
   KPI EXPORT
========================================== */

export function exportKpiData(
  metrics = {},
  fileName = "kpi-export"
) {

  const rows =
    Object.entries(
      metrics
    ).map(
      ([key, value]) => ({

        metric: key,

        value

      })
    );

  exportToCSV(
    rows,
    fileName
  );

}

/* ==========================================
   DOWNLOAD
========================================== */

function downloadFile(
  content,
  fileName,
  mimeType
) {

  const blob =
    new Blob(
      [content],
      {
        type: mimeType
      }
    );

  const url =
    URL.createObjectURL(
      blob
    );

  const link =
    document.createElement(
      "a"
    );

  link.href = url;

  link.download =
    fileName;

  document.body.appendChild(
    link
  );

  link.click();

  document.body.removeChild(
    link
  );

  URL.revokeObjectURL(
    url
  );

}

/* ==========================================
   FILE NAME GENERATOR
========================================== */

export function buildExportFileName(
  prefix = "report"
) {

  const now =
    new Date();

  const year =
    now.getFullYear();

  const month =
    String(
      now.getMonth() + 1
    ).padStart(2, "0");

  const day =
    String(
      now.getDate()
    ).padStart(2, "0");

  return `${prefix}_${year}${month}${day}`;

}
