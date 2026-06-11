/* ==========================================
   CACHE
   Myntra Sales Intelligence
========================================== */

const APP_DATA = {};

const LOOKUPS = {};

let LOADED_AT = null;

/* ==========================================
   APP DATA
========================================== */

export function setAppData(
  key,
  data
) {

  APP_DATA[key] =
    Array.isArray(data)
      ? data
      : [];

}

export function getAppData(
  key
) {

  return (
    APP_DATA[key] ||
    []
  );

}

export function getAllAppData() {

  return {
    ...APP_DATA
  };

}

export function clearAppData() {

  Object.keys(
    APP_DATA
  ).forEach(
    key =>
      delete APP_DATA[key]
  );

}

/* ==========================================
   LOOKUPS
========================================== */

export function setLookup(
  key,
  data
) {

  LOOKUPS[key] =
    data || {};

}

export function getLookup(
  key
) {

  return (
    LOOKUPS[key] ||
    {}
  );

}

export function getAllLookups() {

  return {
    ...LOOKUPS
  };

}

export function clearLookups() {

  Object.keys(
    LOOKUPS
  ).forEach(
    key =>
      delete LOOKUPS[key]
  );

}

/* ==========================================
   LOAD TIME
========================================== */

export function setLoadedAt(
  value = new Date()
) {

  LOADED_AT =
    value;

}

export function getLoadedAt() {

  return LOADED_AT;

}

/* ==========================================
   RESET CACHE
========================================== */

export function clearCache() {

  clearAppData();

  clearLookups();

  LOADED_AT =
    null;

}