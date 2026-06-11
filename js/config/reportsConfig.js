/* ==========================================
   REPORTS CONFIG
   Myntra Sales Intelligence
========================================== */

export const REPORTS = [

  {
    id: "dashboard",
    label: "Dashboard",
    icon: "📊",
    enabled: true,
    defaultTab: true
  },

  {
    id: "salesReturn",
    label: "Sales & Return",
    icon: "📦",
    enabled: true
  },

  {
    id: "growth",
    label: "Growth",
    icon: "📈",
    enabled: true
  },

  {
    id: "shipment",
    label: "Shipment",
    icon: "🚚",
    enabled: true
  },

  {
    id: "businessDashboard",
    label: "Business Dashboard",
    icon: "🏢",
    enabled: true
  },

  {
    id: "oosEye",
    label: "OOS Eye",
    icon: "👁️",
    enabled: true
  },

  {
    id: "liveCount",
    label: "Live Count",
    icon: "🔴",
    enabled: true
  },

  {
    id: "launchTracker",
    label: "Launch Tracker",
    icon: "🚀",
    enabled: true
  }

];

/* ==========================================
   TAB HELPERS
========================================== */

export const DEFAULT_REPORT =
  REPORTS.find(
    report => report.defaultTab
  )?.id || "dashboard";

export const ENABLED_REPORTS =
  REPORTS.filter(
    report => report.enabled
  );

/* ==========================================
   REPORT REGISTRY
========================================== */

export const REPORT_REGISTRY = {

  dashboard: {
    fetcher:
      "./reports/dashboard/dashboardFetcher.js",
    engine:
      "./reports/dashboard/dashboardEngine.js",
    binder:
      "./reports/dashboard/dashboardBinder.js"
  },

  salesReturn: {
    fetcher:
      "./reports/salesReturn/salesReturnFetcher.js",
    engine:
      "./reports/salesReturn/salesReturnEngine.js",
    binder:
      "./reports/salesReturn/salesReturnBinder.js"
  },

  growth: {
    fetcher:
      "./reports/growth/growthFetcher.js",
    engine:
      "./reports/growth/growthEngine.js",
    binder:
      "./reports/growth/growthBinder.js"
  },

  shipment: {
    fetcher:
      "./reports/shipment/shipmentFetcher.js",
    engine:
      "./reports/shipment/shipmentEngine.js",
    binder:
      "./reports/shipment/shipmentBinder.js"
  },

  businessDashboard: {
    fetcher:
      "./reports/businessDashboard/businessDashboardFetcher.js",
    engine:
      "./reports/businessDashboard/businessDashboardEngine.js",
    binder:
      "./reports/businessDashboard/businessDashboardBinder.js"
  },

  oosEye: {
    fetcher:
      "./reports/oosEye/oosEyeFetcher.js",
    engine:
      "./reports/oosEye/oosEyeEngine.js",
    binder:
      "./reports/oosEye/oosEyeBinder.js"
  },

  liveCount: {
    fetcher:
      "./reports/liveCount/liveCountFetcher.js",
    engine:
      "./reports/liveCount/liveCountEngine.js",
    binder:
      "./reports/liveCount/liveCountBinder.js"
  },

  launchTracker: {
    fetcher:
      "./reports/launchTracker/launchTrackerFetcher.js",
    engine:
      "./reports/launchTracker/launchTrackerEngine.js",
    binder:
      "./reports/launchTracker/launchTrackerBinder.js"
  }

};
