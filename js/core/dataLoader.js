/* ==========================================
   DATA LOADER
   Myntra Sales Intelligence
========================================== */

import { SHEETS } from "../config/sheetConfig.js";

import { loadCSV } from "./csvLoader.js";

import {
  setAppData,
  setLoadedAt
} from "./cache.js";

/* ==========================================
   PUBLIC
========================================== */

export async function loadAllData() {

  try {

    console.log(
      "Loading Application Data..."
    );

    const [
      sales,
      returnsData,
      traffic,
      sjitStock,
      sorStock,
      sellerStock,
      productMaster,
      catalogueMaster
    ] = await Promise.all([

      loadCSV(
        SHEETS.SALES
      ),

      loadCSV(
        SHEETS.RETURNS
      ),

      loadCSV(
        SHEETS.TRAFFIC
      ),

      loadCSV(
        SHEETS.SJIT_STOCK
      ),

      loadCSV(
        SHEETS.SOR_STOCK
      ),

      loadCSV(
        SHEETS.SELLER_STOCK
      ),

      loadCSV(
        SHEETS.PRODUCT_MASTER
      ),

      loadCSV(
        SHEETS.CATALOGUE_MASTER
      )

    ]);

    /* ==========================
       STORE IN CACHE
    ========================== */

    setAppData(
      "sales",
      sales
    );

    setAppData(
      "returns",
      returnsData
    );

    setAppData(
      "traffic",
      traffic
    );

    setAppData(
      "sjitStock",
      sjitStock
    );

    setAppData(
      "sorStock",
      sorStock
    );

    setAppData(
      "sellerStock",
      sellerStock
    );

    setAppData(
      "productMaster",
      productMaster
    );

    setAppData(
      "catalogueMaster",
      catalogueMaster
    );

    setLoadedAt(
      new Date()
    );

    const summary =
      buildLoadSummary({
        sales,
        returnsData,
        traffic,
        sjitStock,
        sorStock,
        sellerStock,
        productMaster,
        catalogueMaster
      });

    console.table(
      summary
    );

    return summary;

  } catch (error) {

    console.error(
      "Data Loader Error",
      error
    );

    throw error;

  }

}

/* ==========================================
   LOAD SUMMARY
========================================== */

function buildLoadSummary(
  datasets
) {

  return {

    sales:
      datasets.sales.length,

    returns:
      datasets.returnsData.length,

    traffic:
      datasets.traffic.length,

    sjitStock:
      datasets.sjitStock.length,

    sorStock:
      datasets.sorStock.length,

    sellerStock:
      datasets.sellerStock.length,

    productMaster:
      datasets.productMaster.length,

    catalogueMaster:
      datasets.catalogueMaster.length

  };

}

/* ==========================================
   CALENDAR DATA
========================================== */

export function buildCalendar(
  sales = [],
  returnsData = [],
  productMaster = []
) {

  const map =
    new Map();

  const processRows =
    rows => {

      rows.forEach(
        row => {

          const date =
            row.date || "";

          const month =
            row.month || "";

          const year =
            row.year || "";

          const key =
            `${date}_${month}_${year}`;

          if (!map.has(key)) {

            map.set(
              key,
              {
                date,
                month,
                year
              }
            );

          }

        }
      );

    };

  processRows(
    sales
  );

  processRows(
    returnsData
  );

  processRows(
    productMaster
  );

  return Array.from(
    map.values()
  );

}

/* ==========================================
   LATEST MONTH
========================================== */

export function getLatestMonth(
  calendar = []
) {

  if (!calendar.length) {
    return null;
  }

  const sorted =
    [...calendar]
      .filter(
        item =>
          item.month &&
          item.year
      )
      .sort(
        (a, b) => {

          const aKey =
            `${a.year}${String(a.month).padStart(2, "0")}`;

          const bKey =
            `${b.year}${String(b.month).padStart(2, "0")}`;

          return bKey.localeCompare(
            aKey
          );

        }
      );

  return sorted[0] || null;

}
