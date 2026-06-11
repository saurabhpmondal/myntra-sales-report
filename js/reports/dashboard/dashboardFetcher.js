/* ==========================================
   DASHBOARD FETCHER
   Myntra Sales Intelligence
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

  const filteredSales =
    applySalesFilters(
      sales,
      styleMaster,
      filters
    );

  return {

    sales:
      filteredSales,

    sjitStock,

    sorStock,

    filters

  };

}

/* ==========================================
   SALES FILTERS
========================================== */

function applySalesFilters(
  rows,
  styleMaster,
  filters
) {

  return rows.filter(
    row => {

      const styleInfo =
        styleMaster[
          row.style_id
        ] || {};

      /* ======================
         MONTH
      ====================== */

      if (
        filters.month !==
        "ALL"
      ) {

        if (
          String(
            row.month || ""
          ) !==
          String(
            filters.month
          )
        ) {

          return false;

        }

      }

      /* ======================
         DATE
      ====================== */

      if (
        filters.date !==
        "ALL"
      ) {

        if (
          String(
            row.date || ""
          ) !==
          String(
            filters.date
          )
        ) {

          return false;

        }

      }

      /* ======================
         BRAND
      ====================== */

      if (
        filters.brand !==
        "ALL"
      ) {

        if (
          String(
            row.brand || ""
          ) !==
          String(
            filters.brand
          )
        ) {

          return false;

        }

      }

      /* ======================
         ARTICLE TYPE
      ====================== */

      if (
        filters.articleType !==
        "ALL"
      ) {

        if (
          String(
            styleInfo.article_type ||
            ""
          ) !==
          String(
            filters.articleType
          )
        ) {

          return false;

        }

      }

      /* ======================
         ERP STATUS
      ====================== */

      if (
        filters.erpStatus !==
        "ALL"
      ) {

        if (
          String(
            styleInfo.status ||
            ""
          ) !==
          String(
            filters.erpStatus
          )
        ) {

          return false;

        }

      }

      return true;

    }
  );

}

/* ==========================================
   ENRICH SALES
========================================== */

export function enrichSalesRows(
  salesRows = []
) {

  const styleMaster =
    getLookup(
      "styleMaster"
    ) || {};

  return salesRows.map(
    row => {

      const styleInfo =
        styleMaster[
          row.style_id
        ] || {};

      return {

        ...row,

        erp_status:
          styleInfo.status ||
          "",

        article_type:
          styleInfo.article_type ||
          "",

        erp_sku:
          styleInfo.erp_sku ||
          ""

      };

    }
  );

}