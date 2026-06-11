/* ==========================================
   DASHBOARD FETCHER
========================================== */

import {
  getAppData,
  getLookup
} from "../../core/cache.js";

import {
  getFilters
} from "../../core/filterStore.js";

/* ==========================================
   FETCH DASHBOARD DATA
========================================== */

export function fetchDashboardData() {

  const sales =
    getAppData(
      "sales"
    ) || [];

  const sjitStock =
    getAppData(
      "sjitStock"
    ) || [];

  const sorStock =
    getAppData(
      "sorStock"
    ) || [];

  const styleMaster =
    getLookup(
      "styleMaster"
    ) || {};

  const filters =
    getFilters();

  const enrichedSales =
    enrichSalesRows(
      sales,
      styleMaster
    );

  const filteredSales =
    applyFilters(
      enrichedSales,
      filters
    );

  return {

    sales:
      filteredSales,

    sjitStock,

    sorStock

  };

}

/* ==========================================
   ENRICH SALES
========================================== */

function enrichSalesRows(
  sales,
  styleMaster
) {

  return sales.map(
    row => {

      const style =
        styleMaster[
          row.style_id
        ] || {};

      return {

        ...row,

        erp_status:
          style.status ||
          "UNKNOWN",

        article_type:
          style.article_type ||
          "",

        erp_sku:
          style.erp_sku ||
          ""

      };

    }
  );

}

/* ==========================================
   APPLY FILTERS
========================================== */

function applyFilters(
  rows,
  filters
) {

  return rows.filter(
    row => {

      /* =====================
         MONTH
      ===================== */

      if (
        filters.monthKey !==
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
          filters.monthKey
        ) {

          return false;

        }

      }

      /* =====================
         FROM DATE
      ===================== */

      if (
        filters.fromDate
      ) {

        if (
          row.date <
          filters.fromDate
        ) {

          return false;

        }

      }

      /* =====================
         TO DATE
      ===================== */

      if (
        filters.toDate
      ) {

        if (
          row.date >
          filters.toDate
        ) {

          return false;

        }

      }

      /* =====================
         BRAND
      ===================== */

      if (
        filters.brand !==
        "ALL"
      ) {

        if (
          row.brand !==
          filters.brand
        ) {

          return false;

        }

      }

      /* =====================
         ERP STATUS
      ===================== */

      if (
        filters.erpStatus !==
        "ALL"
      ) {

        if (
          row.erp_status !==
          filters.erpStatus
        ) {

          return false;

        }

      }

      /* =====================
         ARTICLE TYPE
      ===================== */

      if (
        filters.articleType !==
        "ALL"
      ) {

        if (
          row.article_type !==
          filters.articleType
        ) {

          return false;

        }

      }

      return true;

    }
  );

}