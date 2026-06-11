/* ==========================================
   CSV LOADER
   Myntra Sales Intelligence
========================================== */

/* ==========================================
   LOAD CSV
========================================== */

export async function loadCsv(
  url
) {

  const response =
    await fetch(url);

  if (
    !response.ok
  ) {

    throw new Error(
      `Failed to load CSV: ${url}`
    );

  }

  const csvText =
    await response.text();

  return parseCsv(
    csvText
  );

}

/* ==========================================
   PARSE CSV
========================================== */

function parseCsv(
  csvText
) {

  const rows = [];

  const lines =
    csvText
      .replace(
        /\r/g,
        ""
      )
      .split("\n")
      .filter(
        line =>
          line.trim()
      );

  if (
    !lines.length
  ) {

    return rows;

  }

  const headers =
    parseLine(
      lines[0]
    ).map(
      header =>
        sanitizeKey(
          header
        )
    );

  for (
    let i = 1;
    i < lines.length;
    i++
  ) {

    const values =
      parseLine(
        lines[i]
      );

    const row = {};

    headers.forEach(
      (
        header,
        index
      ) => {

        row[header] =
          normalizeValue(
            values[
              index
            ]
          );

      }
    );

    rows.push(
      row
    );

  }

  return rows;

}

/* ==========================================
   CSV LINE PARSER
========================================== */

function parseLine(
  line
) {

  const result = [];

  let current =
    "";

  let insideQuotes =
    false;

  for (
    let i = 0;
    i < line.length;
    i++
  ) {

    const char =
      line[i];

    if (
      char === '"'
    ) {

      insideQuotes =
        !insideQuotes;

      continue;

    }

    if (
      char === "," &&
      !insideQuotes
    ) {

      result.push(
        current
      );

      current = "";

      continue;

    }

    current +=
      char;

  }

  result.push(
    current
  );

  return result;

}

/* ==========================================
   NORMALIZE VALUE
========================================== */

function normalizeValue(
  value
) {

  if (
    value ===
      undefined ||
    value === null
  ) {

    return "";

  }

  return String(
    value
  ).trim();

}

/* ==========================================
   SANITIZE HEADER
========================================== */

function sanitizeKey(
  value
) {

  return String(
    value || ""
  )
    .trim()
    .toLowerCase()
    .replace(
      /[^a-z0-9]+/g,
      "_"
    )
    .replace(
      /^_+/,
      ""
    )
    .replace(
      /_+$/,
      ""
    );

}