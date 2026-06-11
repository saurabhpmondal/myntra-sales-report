/* ==========================================
   LOOKUP BUILDER
   Myntra Sales Intelligence
========================================== */

import {
  getAppData,
  setLookup
} from "./cache.js";

/* ==========================================
   PUBLIC
========================================== */

export function buildLookups() {

  const productMaster =
    getAppData(
      "productMaster"
    ) || [];

  const catalogueMaster =
    getAppData(
      "catalogueMaster"
    ) || [];

  const styleMaster =
    buildStyleMaster(
      productMaster
    );

  const erpSkuMaster =
    buildErpSkuMaster(
      productMaster
    );

  const catalogueLookup =
    buildCatalogueLookup(
      catalogueMaster
    );

  setLookup(
    "styleMaster",
    styleMaster
  );

  setLookup(
    "erpSkuMaster",
    erpSkuMaster
  );

  setLookup(
    "catalogueMaster",
    catalogueLookup
  );

  return {
    styleMaster,
    erpSkuMaster,
    catalogueLookup
  };

}

/* ==========================================
   STYLE MASTER
========================================== */

function buildStyleMaster(
  rows
) {

  const lookup = {};

  rows.forEach(
    row => {

      const styleId =
        String(
          row.style_id || ""
        ).trim();

      if (!styleId) {
        return;
      }

      lookup[styleId] = {

        style_id:
          row.style_id || "",

        launch_date:
          row.launch_date || "",

        live_date:
          row.live_date || "",

        erp_sku:
          row.erp_sku || "",

        brand:
          row.brand || "",

        article_type:
          row.article_type || "",

        status:
          row.status || "",

        mrp:
          Number(
            row.mrp || 0
          ),

        tp:
          Number(
            row.tp || 0
          ),

        date:
          row.date || "",

        month:
          row.month || "",

        year:
          row.year || "",

        channel_listing_id:
          row.channel_listing_id || ""

      };

    }
  );

  return lookup;

}

/* ==========================================
   ERP SKU MASTER
========================================== */

function buildErpSkuMaster(
  rows
) {

  const lookup = {};

  rows.forEach(
    row => {

      const erpSku =
        String(
          row.erp_sku || ""
        ).trim();

      if (!erpSku) {
        return;
      }

      lookup[erpSku] = row;

    }
  );

  return lookup;

}

/* ==========================================
   CATALOGUE MASTER
========================================== */

function buildCatalogueLookup(
  rows
) {

  const lookup = {};

  rows.forEach(
    row => {

      const erpSku =
        String(
          row.erp_sku || ""
        ).trim();

      if (!erpSku) {
        return;
      }

      lookup[erpSku] = {

        erp_sku:
          row.erp_sku || "",

        saree_type:
          row.saree_type || "",

        master_color:
          row.master_color || "",

        master_fabric:
          row.master_fabric || "",

        master_work:
          row.master_work || "",

        detailed_saree_color:
          row.detailed_saree_color || "",

        detailed_blouse_color:
          row.detailed_blouse_color || "",

        detailed_saree_fabric:
          row.detailed_saree_fabric || "",

        detailed_blouse_fabric:
          row.detailed_blouse_fabric || "",

        detailed_saree_work:
          row.detailed_saree_work || ""

      };

    }
  );

  return lookup;

}

/* ==========================================
   HELPERS
========================================== */

export function getStyleInfo(
  styleId,
  styleMaster
) {

  return (
    styleMaster[
      String(styleId)
    ] || null
  );

}

export function getCatalogueInfo(
  erpSku,
  catalogueMaster
) {

  return (
    catalogueMaster[
      String(erpSku)
    ] || null
  );

}

export function getErpInfo(
  erpSku,
  erpSkuMaster
) {

  return (
    erpSkuMaster[
      String(erpSku)
    ] || null
  );

}
