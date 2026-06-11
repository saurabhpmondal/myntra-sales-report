/* ==========================================
   CACHE
   Myntra Sales Intelligence
========================================== */

const STORE = {

  appData: {},

  lookups: {},

  reports: {},

  meta: {
    loadedAt: null
  }

};

/* ==========================================
   APP DATA
========================================== */

export function setAppData(
  key,
  value
) {

  STORE.appData[key] = value;

}

export function getAppData(
  key
) {

  return STORE.appData[key];

}

export function getAllAppData() {

  return STORE.appData;

}

export function clearAppData() {

  STORE.appData = {};

}

/* ==========================================
   LOOKUPS
========================================== */

export function setLookup(
  key,
  value
) {

  STORE.lookups[key] = value;

}

export function getLookup(
  key
) {

  return STORE.lookups[key];

}

export function getAllLookups() {

  return STORE.lookups;

}

export function clearLookups() {

  STORE.lookups = {};

}

/* ==========================================
   REPORT CACHE
========================================== */

export function setReportCache(
  reportId,
  data
) {

  STORE.reports[reportId] = data;

}

export function getReportCache(
  reportId
) {

  return STORE.reports[reportId];

}

export function clearReportCache(
  reportId
) {

  delete STORE.reports[reportId];

}

export function clearAllReportCache() {

  STORE.reports = {};

}

/* ==========================================
   META
========================================== */

export function setLoadedAt(
  value
) {

  STORE.meta.loadedAt = value;

}

export function getLoadedAt() {

  return STORE.meta.loadedAt;

}

/* ==========================================
   FULL RESET
========================================== */

export function resetCache() {

  STORE.appData = {};

  STORE.lookups = {};

  STORE.reports = {};

  STORE.meta.loadedAt = null;

}

/* ==========================================
   DEBUG
========================================== */

export function getCacheSnapshot() {

  return structuredClone(
    STORE
  );

}
