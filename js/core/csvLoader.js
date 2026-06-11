/* ==========================================
   CSV LOADER
   Myntra Sales Intelligence
========================================== */

const CSV_CACHE = new Map();

/* ==========================================
   PUBLIC
========================================== */

export async function loadCSV(url) {

  if (!url) {
    throw new Error(
      "CSV URL is required."
    );
  }

  if (CSV_CACHE.has(url)) {
    return CSV_CACHE.get(url);
  }

  try {

    const response = await fetch(
      url,
      {
        method: "GET",
        cache: "no-store"
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch CSV: ${response.status}`
      );
    }

    const csvText =
      await response.text();

    const rows =
      parseCSV(csvText);

    CSV_CACHE.set(
      url,
      rows
    );

    return rows;

  } catch (error) {

    console.error(
      "CSV Load Error:",
      error
    );

    throw error;
  }

}

/* ==========================================
   CACHE HELPERS
========================================== */

export function clearCSVCache() {

  CSV_CACHE.clear();

}

export function getCSVCacheSize() {

  return CSV_CACHE.size;

}

/* ==========================================
   CSV PARSER
========================================== */

function parseCSV(csv) {

  if (!csv) return [];

  const lines =
    csv
      .replace(/\r/g, "")
      .split("\n")
      .filter(Boolean);

  if (!lines.length) {
    return [];
  }

  const headers =
    parseCSVLine(lines[0]);

  const output = [];

  for (
    let i = 1;
    i < lines.length;
    i++
  ) {

    const values =
      parseCSVLine(lines[i]);

    const row = {};

    headers.forEach(
      (header, index) => {

        const key =
          sanitizeHeader(header);

        row[key] =
          normalizeValue(
            values[index]
          );

      }
    );

    output.push(row);

  }

  return output;

}

/* ==========================================
   PARSE SINGLE LINE
========================================== */

function parseCSVLine(line) {

  const result = [];

  let current = "";

  let inQuotes = false;

  for (
    let i = 0;
    i < line.length;
    i++
  ) {

    const char = line[i];

    const next =
      line[i + 1];

    if (
      char === '"' &&
      inQuotes &&
      next === '"'
    ) {

      current += '"';

      i++;

      continue;

    }

    if (char === '"') {

      inQuotes =
        !inQuotes;

      continue;

    }

    if (
      char === "," &&
      !inQuotes
    ) {

      result.push(current);

      current = "";

      continue;

    }

    current += char;

  }

  result.push(current);

  return result;

}

/* ==========================================
   HEADER CLEANER
========================================== */

function sanitizeHeader(header) {

  return String(header || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_");

}

/* ==========================================
   VALUE NORMALIZER
========================================== */

function normalizeValue(value) {

  if (
    value === undefined ||
    value === null
  ) {
    return "";
  }

  const cleaned =
    String(value).trim();

  if (cleaned === "") {
    return "";
  }

  if (
    cleaned === "null" ||
    cleaned === "NULL"
  ) {
    return "";
  }

  return cleaned;

}
