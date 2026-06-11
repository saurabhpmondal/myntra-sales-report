/* ==========================================
   REPORT CONFIG
   Myntra Sales Intelligence
========================================== */

export const REPORTS = [

  {
    id: "dashboard",
    name: "Dashboard"
  },

  {
    id: "sales-return",
    name: "Sales & Return"
  },

  {
    id: "growth",
    name: "Growth"
  },

  {
    id: "shipment",
    name: "Shipment"
  },

  {
    id: "business-dashboard",
    name: "Business Dashboard"
  },

  {
    id: "oos-eye",
    name: "OOS Eye"
  },

  {
    id: "live-count",
    name: "Live Count"
  },

  {
    id: "launch-tracker",
    name: "Launch Tracker"
  }

];

/* ==========================================
   REPORT REGISTRY
========================================== */

export const REPORT_REGISTRY = {

  dashboard: {

    binder:
      "../reports/dashboard/dashboardBinder.js"

  },

  "sales-return": {

    binder:
      "../reports/salesReturn/salesReturnBinder.js"

  },

  growth: {

    binder:
      "../reports/growth/growthBinder.js"

  },

  shipment: {

    binder:
      "../reports/shipment/shipmentBinder.js"

  },

  "business-dashboard": {

    binder:
      "../reports/businessDashboard/businessDashboardBinder.js"

  },

  "oos-eye": {

    binder:
      "../reports/oosEye/oosEyeBinder.js"

  },

  "live-count": {

    binder:
      "../reports/liveCount/liveCountBinder.js"

  },

  "launch-tracker": {

    binder:
      "../reports/launchTracker/launchTrackerBinder.js"

  }

};