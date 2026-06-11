/* ==========================================
   LOOKUP BUILDER
   Myntra Sales Intelligence
========================================== */

import {
  getAppData,
  setLookup
} from "./cache.js";

/* ==========================================
   BUILD ALL LOOKUPS
========================================== */

export function buildLookups() {

  buildStyleMaster();

  buildErpSkuMaster();

}

/* ==========================================
   STYLE MASTER
========================================== */

function buildStyleMaster() {

  const productMaster =
    getAppData(
      "productMaster"
    ) || [];

  const lookup = {};

  productMaster.forEach(
    row => {

      const styleId =
        String(
          row.style_id || ""
        ).trim();

      if (
        !styleId
      ) {

        return;

      }

      lookup[
        styleId
      ] = {

        style_id:
          row.style_id,

        launch_date:
          row.launch_date,

        live_date:
          row.live_date,

        erp_sku:
          row.erp_sku,

        brand:
          row.brand,

        article_type:
          row.article_type,

        status:
          row.status,

        mrp:
          Number(
            row.mrp || 0
          ),

        tp:
          Number(
            row.tp || 0
          ),

        channel_listing_id:
          row.channel_listing_id

      };

    }
  );

  setLookup(
    "styleMaster",
    lookup
  );

}

/* ==========================================
   ERP SKU MASTER
========================================== */

function buildErpSkuMaster() {

  const productMaster =
    getAppData(
      "productMaster"
    ) || [];

  const lookup = {};

  productMaster.forEach(
    row => {

      const erpSku =
        String(
          row.erp_sku || ""
        ).trim();

      if (
        !erpSku
      ) {

        return;

      }

      lookup[
        erpSku
      ] = {

        style_id:
          row.style_id,

        erp_sku:
          row.erp_sku,

        brand:
          row.brand,

        article_type:
          row.article_type,

        status:
          row.status,

        mrp:
          Number(
            row.mrp || 0
          ),

        tp:
          Number(
            row.tp || 0
          )

      };

    }
  );

  setLookup(
    "erpSkuMaster",
    lookup
  );

}