/* ==========================================
   FILTER STORE
   Myntra Sales Intelligence
========================================== */

const DEFAULT_STATE = {

  month: "ALL",

  date: "ALL",

  brand: "ALL",

  erpStatus: "ALL",

  articleType: "ALL"

};

let state = {
  ...DEFAULT_STATE
};

const listeners = new Set();

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
   SETTERS
========================================== */

export function setFilter(
  key,
  value
) {

  if (!(key in state)) {
    return;
  }

  state[key] = value;

  notify();

}

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
   MONTH DEFAULT
========================================== */

export function initializeFilters(
  latestMonth
) {

  state = {

    ...DEFAULT_STATE,

    month:
      latestMonth?.month ||
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

  if (
    typeof callback !==
    "function"
  ) {
    return () => {};
  }

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

      } catch (error) {

        console.error(
          "Filter Listener Error",
          error
        );

      }

    }
  );

}

/* ==========================================
   FILTER HELPERS
========================================== */

export function applyGlobalFilters(
  rows = [],
  options = {}
) {

  const {

    monthField = "month",

    dateField = "date",

    brandField = "brand",

    articleTypeField =
      "article_type",

    erpStatusField =
      "erp_status"

  } = options;

  return rows.filter(
    row => {

      if (
        state.month !== "ALL" &&
        String(
          row[
            monthField
          ] || ""
        ) !==
          String(
            state.month
          )
      ) {
        return false;
      }

      if (
        state.date !== "ALL" &&
        String(
          row[
            dateField
          ] || ""
        ) !==
          String(
            state.date
          )
      ) {
        return false;
      }

      if (
        state.brand !== "ALL" &&
        String(
          row[
            brandField
          ] || ""
        ) !==
          String(
            state.brand
          )
      ) {
        return false;
      }

      if (
        state.articleType !==
          "ALL" &&
        String(
          row[
            articleTypeField
          ] || ""
        ) !==
          String(
            state.articleType
          )
      ) {
        return false;
      }

      if (
        state.erpStatus !==
          "ALL" &&
        String(
          row[
            erpStatusField
          ] || ""
        ) !==
          String(
            state.erpStatus
          )
      ) {
        return false;
      }

      return true;

    }
  );

}

/* ==========================================
   DEBUG
========================================== */

export function getFilterSnapshot() {

  return {
    ...state
  };

}
