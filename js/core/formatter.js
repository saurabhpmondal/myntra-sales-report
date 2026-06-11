/* ==========================================
   FORMATTER
   Myntra Sales Intelligence
========================================== */

/* ==========================================
   NUMBER
========================================== */

export function formatNumber(
  value = 0,
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
   INTEGER
========================================== */

export function formatUnits(
  value = 0
) {

  return formatNumber(
    value,
    0
  );

}

/* ==========================================
   CURRENCY
========================================== */

export function formatCurrency(
  value = 0,
  decimals = 0
) {

  const number =
    Number(value) || 0;

  return `₹${number.toLocaleString(
    "en-IN",
    {
      minimumFractionDigits:
        decimals,
      maximumFractionDigits:
        decimals
    }
  )}`;

}

/* ==========================================
   GMV
========================================== */

export function formatGMV(
  value = 0
) {

  return formatCurrency(
    value,
    0
  );

}

/* ==========================================
   ASP
========================================== */

export function formatASP(
  value = 0
) {

  return formatCurrency(
    value,
    2
  );

}

/* ==========================================
   PERCENTAGE
========================================== */

export function formatPercent(
  value = 0,
  decimals = 2
) {

  const number =
    Number(value) || 0;

  return `${number.toFixed(
    decimals
  )}%`;

}

/* ==========================================
   SHARE %
========================================== */

export function formatShare(
  value = 0
) {

  return formatPercent(
    value,
    2
  );

}

/* ==========================================
   GROWTH %
========================================== */

export function formatGrowth(
  value = 0
) {

  const number =
    Number(value) || 0;

  const prefix =
    number > 0
      ? "+"
      : "";

  return `${prefix}${number.toFixed(
    2
  )}%`;

}

/* ==========================================
   DATE
========================================== */

export function formatDate(
  value
) {

  if (!value) {
    return "-";
  }

  return String(
    value
  );

}

/* ==========================================
   MONTH YEAR
========================================== */

export function formatMonthYear(
  month,
  year
) {

  if (
    !month &&
    !year
  ) {

    return "-";

  }

  return `${month}-${year}`;

}

/* ==========================================
   KPI VALUE
========================================== */

export function formatKpiValue(
  type,
  value
) {

  switch (type) {

    case "GMV":
      return formatGMV(
        value
      );

    case "ASP":
      return formatASP(
        value
      );

    case "UNITS":
      return formatUnits(
        value
      );

    case "PERCENT":
      return formatPercent(
        value
      );

    default:
      return formatNumber(
        value
      );

  }

}

/* ==========================================
   SAFE DIVIDE
========================================== */

export function safeDivide(
  numerator = 0,
  denominator = 0
) {

  numerator =
    Number(
      numerator
    ) || 0;

  denominator =
    Number(
      denominator
    ) || 0;

  if (
    denominator === 0
  ) {

    return 0;

  }

  return (
    numerator /
    denominator
  );

}
