/* ==========================================
   FILTER STORE
   Myntra Sales Intelligence
========================================== */

const DEFAULT_STATE = {

  monthKey: "ALL",

  fromDate: "",

  toDate: "",

  brand: "ALL",

  erpStatus: "ALL",

  articleType: "ALL"

};

let state = {
  ...DEFAULT_STATE
};

const listeners =
  new Set();

/* ==========================================
   GETTERS
========================================== */

export function getFilters() {

  return {
    ...state
  };

}

export function getFilter(
  key
) {

  return state[key];

}

/* ==========================================
   SET FILTER
========================================== */

export function setFilter(
  key,
  value
) {

  if (
    !(key in state)
  ) {

    return;

  }

  state[key] =
    value;

  notify();

}

/* ==========================================
   SET MULTIPLE
========================================== */

export function setFilters(
  payload = {}
) {

  state = {

    ...state,

    ...payload

  };

  notify();

}

/* ==========================================
   RESET
========================================== */

export function resetFilters() {

  state = {
    ...DEFAULT_STATE
  };

  notify();

}

/* ==========================================
   INITIALIZE
========================================== */

export function initializeFilters(
  latestMonthKey
) {

  state = {

    ...DEFAULT_STATE,

    monthKey:
      latestMonthKey ||
      "ALL"

  };

  notify();

}

/* ==========================================
   SUBSCRIBE
========================================== */

export function subscribe(
  callback
) {

  listeners.add(
    callback
  );

  return () => {

    listeners.delete(
      callback
    );

  };

}

/* ==========================================
   NOTIFY
========================================== */

function notify() {

  const snapshot = {
    ...state
  };

  listeners.forEach(
    listener => {

      try {

        listener(
          snapshot
        );

      } catch (
        error
      ) {

        console.error(
          error
        );

      }

    }
  );

}

/* ==========================================
   APPLY SALES FILTERS
========================================== */

export function applyFilters(
  rows = []
) {

  return rows.filter(
    row => {

      /* =====================
         MONTH
      ===================== */

      if (
        state.monthKey !==
        "ALL"
      ) {

        const rowMonthKey =
          `${row.year}-${String(
            row.month
          ).padStart(
            2,
            "0"
          )}`;

        if (
          rowMonthKey !==
          state.monthKey
        ) {

          return false;

        }

      }

      /* =====================
         FROM DATE
      ===================== */

      if (
        state.fromDate
      ) {

        if (
          row.date <
          state.fromDate
        ) {

          return false;

        }

      }

      /* =====================
         TO DATE
      ===================== */

      if (
        state.toDate
      ) {

        if (
          row.date >
          state.toDate
        ) {

          return false;

        }

      }

      /* =====================
         BRAND
      ===================== */

      if (
        state.brand !==
        "ALL"
      ) {

        if (
          row.brand !==
          state.brand
        ) {

          return false;

        }

      }

      /* =====================
         ERP STATUS
      ===================== */

      if (
        state.erpStatus !==
        "ALL"
      ) {

        if (
          row.erp_status !==
          state.erpStatus
        ) {

          return false;

        }

      }

      /* =====================
         ARTICLE TYPE
      ===================== */

      if (
        state.articleType !==
        "ALL"
      ) {

        if (
          row.article_type !==
          state.articleType
        ) {

          return false;

        }

      }

      return true;

    }
  );

}