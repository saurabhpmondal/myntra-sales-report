/* ==========================================
   DATE UTILS
   Myntra Sales Intelligence
========================================== */

const MONTH_ORDER = {

  JAN: 1,
  FEB: 2,
  MAR: 3,
  APR: 4,
  MAY: 5,
  JUN: 6,
  JUL: 7,
  AUG: 8,
  SEP: 9,
  OCT: 10,
  NOV: 11,
  DEC: 12

};

/* ==========================================
   MONTH KEY
========================================== */

export function buildMonthKey(
  month,
  year
) {

  const monthValue =
    getMonthNumber(
      month
    );

  return Number(
    `${year}${String(
      monthValue
    ).padStart(2, "0")}`
  );

}

/* ==========================================
   MONTH NUMBER
========================================== */

export function getMonthNumber(
  month
) {

  if (
    month === null ||
    month === undefined
  ) {
    return 0;
  }

  const value =
    String(month)
      .trim()
      .toUpperCase();

  if (
    !isNaN(value)
  ) {

    return Number(
      value
    );

  }

  return (
    MONTH_ORDER[
      value.slice(0, 3)
    ] || 0
  );

}

/* ==========================================
   SORT MONTHS
========================================== */

export function sortMonths(
  rows = []
) {

  return [...rows].sort(
    (a, b) => {

      const aKey =
        buildMonthKey(
          a.month,
          a.year
        );

      const bKey =
        buildMonthKey(
          b.month,
          b.year
        );

      return (
        bKey - aKey
      );

    }
  );

}

/* ==========================================
   GET LATEST MONTH
========================================== */

export function getLatestMonth(
  rows = []
) {

  if (!rows.length) {
    return null;
  }

  return sortMonths(
    rows
  )[0];

}

/* ==========================================
   UNIQUE MONTHS
========================================== */

export function getUniqueMonths(
  rows = []
) {

  const map =
    new Map();

  rows.forEach(
    row => {

      const key =
        `${row.month}_${row.year}`;

      if (
        !map.has(key)
      ) {

        map.set(
          key,
          {
            month:
              row.month,
            year:
              row.year
          }
        );

      }

    }
  );

  return sortMonths(
    Array.from(
      map.values()
    )
  );

}

/* ==========================================
   UNIQUE DATES
========================================== */

export function getUniqueDates(
  rows = []
) {

  const map =
    new Map();

  rows.forEach(
    row => {

      const date =
        row.date;

      if (
        !date
      ) {
        return;
      }

      if (
        !map.has(date)
      ) {

        map.set(
          date,
          date
        );

      }

    }
  );

  return Array.from(
    map.values()
  ).sort();

}

/* ==========================================
   MONTH COMPARISON
========================================== */

export function compareMonthValues(
  currentValue = 0,
  previousValue = 0
) {

  if (
    Number(previousValue) === 0
  ) {

    return {
      growth: 0,
      growthText: "0%"
    };

  }

  const growth =
    (
      (
        currentValue -
        previousValue
      ) /
      previousValue
    ) * 100;

  return {

    growth,

    growthText:
      `${growth.toFixed(
        2
      )}%`

  };

}

/* ==========================================
   PROJECT MONTH END
========================================== */

export function projectMonthEnd(
  currentUnits = 0,
  elapsedDays = 1,
  totalDays = 30
) {

  if (
    elapsedDays <= 0
  ) {

    return 0;

  }

  const ads =
    currentUnits /
    elapsedDays;

  return Math.round(
    ads *
      totalDays
  );

}

/* ==========================================
   DAYS IN MONTH
========================================== */

export function getDaysInMonth(
  month,
  year
) {

  const monthNumber =
    getMonthNumber(
      month
    );

  if (
    !monthNumber ||
    !year
  ) {

    return 30;

  }

  return new Date(
    Number(year),
    monthNumber,
    0
  ).getDate();

}

/* ==========================================
   CURRENT MONTH DAY COUNT
========================================== */

export function getElapsedDays(
  latestDate
) {

  if (
    !latestDate
  ) {

    return 1;

  }

  const date =
    new Date(
      latestDate
    );

  const day =
    date.getDate();

  return (
    day || 1
  );

}
