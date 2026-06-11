
/* ==========================================
   SHEET CONFIG
   Myntra Sales Intelligence
========================================== */

export const SHEETS = {

  SALES:

    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTGOsj66mo-CpS5eTerQgEcjYvr5GuOkQUIQ_9Sy4bwFu6FjGv9wBvCZn5UQBcFB7M-dcuJdbxMxSnj/pub?gid=1679615114&single=true&output=csv",

  RETURNS:

    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTGOsj66mo-CpS5eTerQgEcjYvr5GuOkQUIQ_9Sy4bwFu6FjGv9wBvCZn5UQBcFB7M-dcuJdbxMxSnj/pub?gid=1201655010&single=true&output=csv",

  TRAFFIC:

    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTGOsj66mo-CpS5eTerQgEcjYvr5GuOkQUIQ_9Sy4bwFu6FjGv9wBvCZn5UQBcFB7M-dcuJdbxMxSnj/pub?gid=533529379&single=true&output=csv",

  SJIT_STOCK:

    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTGOsj66mo-CpS5eTerQgEcjYvr5GuOkQUIQ_9Sy4bwFu6FjGv9wBvCZn5UQBcFB7M-dcuJdbxMxSnj/pub?gid=685171659&single=true&output=csv",

  SOR_STOCK:

    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTGOsj66mo-CpS5eTerQgEcjYvr5GuOkQUIQ_9Sy4bwFu6FjGv9wBvCZn5UQBcFB7M-dcuJdbxMxSnj/pub?gid=2104491192&single=true&output=csv",

  SELLER_STOCK:

    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTGOsj66mo-CpS5eTerQgEcjYvr5GuOkQUIQ_9Sy4bwFu6FjGv9wBvCZn5UQBcFB7M-dcuJdbxMxSnj/pub?gid=325497638&single=true&output=csv",

  PRODUCT_MASTER:

    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTGOsj66mo-CpS5eTerQgEcjYvr5GuOkQUIQ_9Sy4bwFu6FjGv9wBvCZn5UQBcFB7M-dcuJdbxMxSnj/pub?gid=205952585&single=true&output=csv",

  CATALOGUE_MASTER:

    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTGOsj66mo-CpS5eTerQgEcjYvr5GuOkQUIQ_9Sy4bwFu6FjGv9wBvCZn5UQBcFB7M-dcuJdbxMxSnj/pub?gid=1400591915&single=true&output=csv"

};

/* ==========================================
   REPORT DATA DEPENDENCIES
========================================== */

export const REPORT_SHEETS = {

  dashboard: [
    "SALES",
    "PRODUCT_MASTER",
    "SJIT_STOCK",
    "SOR_STOCK"
  ],

  salesReturn: [
    "SALES",
    "RETURNS",
    "PRODUCT_MASTER",
    "CATALOGUE_MASTER"
  ],

  growth: [
    "SALES",
    "PRODUCT_MASTER"
  ],

  shipment: [
    "SALES",
    "SJIT_STOCK",
    "SOR_STOCK",
    "PRODUCT_MASTER"
  ],

  businessDashboard: [
    "SALES",
    "PRODUCT_MASTER"
  ],

  oosEye: [
    "SALES",
    "SJIT_STOCK",
    "SOR_STOCK",
    "PRODUCT_MASTER"
  ],

  liveCount: [
    "PRODUCT_MASTER"
  ],

  launchTracker: [
    "PRODUCT_MASTER",
    "SALES"
  ]

};