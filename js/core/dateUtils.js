/* ==========================================
   DATE UTILS
   Myntra Sales Intelligence
========================================== */

/* ==========================================
   MONTH NAMES
========================================== */

const MONTH_NAMES = {

  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December"

};

/* ==========================================
   MONTH NAME
========================================== */

export function getMonthName(
  month
) {

  return (
    MONTH_NAMES[
      Number(month)
    ] || String(month)
  );

}

/* ==========================================
   MONTH KEY
========================================== */

export function buildMonthKey(
  month,
  year
) {

  return `${year}-${String(
    month
  ).padStart(
    2,
    "0"
  )}`;

}

/* ==========================================
   MONTH LABEL
========================================== */

export function buildMonthLabel(
  month,
  year
) {

  return `${getMonthName(
    month
  )} ${year}`;

}

/* ==========================================
   BUILD SALES MONTHS
========================================== */

export function buildSalesMonths(
  sales = []
) {

  const map =
    new Map();

  sales.forEach(
    row => {

      const month =
        row.month;

      const year =
        row.year;

      if (
        !month ||
        !year
      ) {

        return;

      }

      const key =
        buildMonthKey(
          month,
          year
        );

      map.set(
        key,
        {

          month,

          year,

          monthKey:
            key,

          monthLabel:
            buildMonthLabel(
              month,
              year
            )

        }
      );

    }
  );

  return Array.from(
    map.values()
  ).sort(
    (a, b) =>
      b.monthKey.localeCompare(
        a.monthKey
      )
  );

}

/* ==========================================
   LATEST MONTH
========================================== */

export function getLatestMonth(
  sales = []
) {

  const months =
    buildSalesMonths(
      sales
    );

  return (
    months[0] ||
    null
  );

}

/* ==========================================
   MONTH OPTIONS
========================================== */

export function getMonthOptions(
  sales = []
) {

  return buildSalesMonths(
    sales
  ).map(
    item => ({

      value:
        item.monthKey,

      label:
        item.monthLabel

    })
  );

}

/* ==========================================
   UNIQUE SALES DATES
========================================== */

export function getSalesDates(
  sales = []
) {

  return [
    ...new Set(
      sales
        .map(
          row =>
            row.date
        )
        .filter(Boolean)
    )
  ].sort();

}

/* ==========================================
   MIN SALES DATE
========================================== */

export function getMinSalesDate(
  sales = []
) {

  const dates =
    getSalesDates(
      sales
    );

  return (
    dates[0] ||
    ""
  );

}

/* ==========================================
   MAX SALES DATE
========================================== */

export function getMaxSalesDate(
  sales = []
) {

  const dates =
    getSalesDates(
      sales
    );

  return (
    dates.at(-1) ||
    ""
  );

}

/* ==========================================
   DATE RANGE FILTER
========================================== */

export function isDateInRange(
  rowDate,
  fromDate,
  toDate
) {

  if (
    !rowDate
  ) {

    return false;

  }

  if (
    fromDate &&
    rowDate < fromDate
  ) {

    return false;

  }

  if (
    toDate &&
    rowDate > toDate
  ) {

    return false;

  }

  return true;

}

/* ==========================================
   GROWTH %
========================================== */

export function calculateGrowth(
  currentValue = 0,
  previousValue = 0
) {

  currentValue =
    Number(
      currentValue
    ) || 0;

  previousValue =
    Number(
      previousValue
    ) || 0;

  if (
    previousValue === 0
  ) {

    return 0;

  }

  return (
    (
      currentValue -
      previousValue
    ) /
    previousValue
  ) * 100;

}