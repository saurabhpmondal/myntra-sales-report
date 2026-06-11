/* ==========================================
   FORMATTER
   Myntra Sales Intelligence
========================================== */

/* ==========================================
   NUMBER
========================================== */

export function formatNumber(
  value,
  decimals = 0
) {

  const number =
    Number(value) || 0;

  return number.toLocaleString(
    "en-IN",
    {

      minimumFractionDigits:
        decimals,

      maximumFractionDigits:
        decimals

    }
  );

}

/* ==========================================
   UNITS
========================================== */

export function formatUnits(
  value
) {

  return formatNumber(
    value,
    0
  );

}

/* ==========================================
   GMV
========================================== */

export function formatGMV(
  value
) {

  const number =
    Number(value) || 0;

  return `₹${formatNumber(
    number,
    0
  )}`;

}

/* ==========================================
   ASP
========================================== */

export function formatASP(
  value
) {

  const number =
    Number(value) || 0;

  return `₹${formatNumber(
    number,
    2
  )}`;

}

/* ==========================================
   PERCENT
========================================== */

export function formatPercent(
  value
) {

  const number =
    Number(value) || 0;

  return `${formatNumber(
    number,
    2
  )}%`;

}

/* ==========================================
   CURRENCY
========================================== */

export function formatCurrency(
  value,
  decimals = 2
) {

  const number =
    Number(value) || 0;

  return `₹${formatNumber(
    number,
    decimals
  )}`;

}

/* ==========================================
   DECIMAL
========================================== */

export function formatDecimal(
  value,
  decimals = 2
) {

  return formatNumber(
    value,
    decimals
  );

}

/* ==========================================
   SHARE
========================================== */

export function formatShare(
  value
) {

  return formatPercent(
    value
  );

}

/* ==========================================
   SAFE NUMBER
========================================== */

export function toNumber(
  value
) {

  const number =
    Number(
      String(value || "")
        .replace(/,/g, "")
        .trim()
    );

  return isNaN(
    number
  )
    ? 0
    : number;

}