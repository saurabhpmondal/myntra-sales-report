/* ==========================================
   DASHBOARD CONFIG
   Myntra Sales Intelligence
========================================== */

export const DASHBOARD_CONFIG = {

  id: "dashboard",

  title: "Dashboard",

  description:
    "Sales, Stock & Performance Overview"

};

/* ==========================================
   KPI CONFIG
========================================== */

export const KPI_CARDS = [

  {
    id: "gmv",
    title: "GMV",
    type: "GMV"
  },

  {
    id: "units",
    title: "TOTAL UNITS",
    type: "UNITS"
  },

  {
    id: "asp",
    title: "ASP",
    type: "ASP"
  },

  {
    id: "sjitStock",
    title: "SJIT STOCK",
    type: "UNITS"
  },

  {
    id: "sorStock",
    title: "SOR STOCK",
    type: "UNITS"
  }

];

/* ==========================================
   CHART CONFIG
========================================== */

export const CHARTS = {

  dailyUnitsTrend: {

    id: "daily-units-trend",

    title: "Daily Units Trend",

    type: "line"

  },

  dailyBrandTrend: {

    id: "daily-brand-trend",

    title: "Daily Brand Wise Sales",

    type: "stacked-bar"

  },

  poTypePerformance: {

    id: "po-type-performance",

    title: "PO Type Performance",

    type: "donut"

  }

};

/* ==========================================
   TABLE CONFIG
========================================== */

export const TABLES = {

  brandProjection: {

    id: "brand-projection",

    title: "Brand Projection"

  },

  poTypeProjection: {

    id: "po-type-projection",

    title: "PO Type Projection"

  },

  statusPerformance: {

    id: "status-performance",

    title: "Status Performance"

  },

  brandPerformance: {

    id: "brand-performance",

    title: "Brand Performance"

  }

};

/* ==========================================
   BRAND PERFORMANCE COLUMNS
========================================== */

export const BRAND_COLUMNS = [

  {
    key: "brand",
    label: "Brand"
  },

  {
    key: "units",
    label: "Units"
  },

  {
    key: "gmv",
    label: "GMV"
  },

  {
    key: "asp",
    label: "ASP"
  },

  {
    key: "share",
    label: "Share %"
  }

];

/* ==========================================
   STATUS PERFORMANCE COLUMNS
========================================== */

export const STATUS_COLUMNS = [

  {
    key: "status",
    label: "ERP Status"
  },

  {
    key: "units",
    label: "Units"
  },

  {
    key: "gmv",
    label: "GMV"
  },

  {
    key: "share",
    label: "Share %"
  }

];

/* ==========================================
   PROJECTION COLUMNS
========================================== */

export const PROJECTION_COLUMNS = [

  {
    key: "name",
    label: "Name"
  },

  {
    key: "currentMonthUnits",
    label: "Current Month Units"
  },

  {
    key: "previousMonthUnits",
    label: "Previous Month Units"
  },

  {
    key: "growth",
    label: "Growth %"
  },

  {
    key: "projectedMonthEnd",
    label: "Projected Month End"
  }

];