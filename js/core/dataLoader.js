/* ==========================================
   DATA LOADER
   Myntra Sales Intelligence
========================================== */

import {
  SHEETS
} from "../config/sheetConfig.js";

import {
  loadCsv
} from "./csvLoader.js";

import {
  setAppData,
  setLoadedAt
} from "./cache.js";

/* ==========================================
   LOAD ALL DATA
========================================== */

export async function loadAllData() {

  const loaders = [

    loadSheet(
      "sales",
      SHEETS.sales
    ),

    loadSheet(
      "returns",
      SHEETS.returns
    ),

    loadSheet(
      "traffic",
      SHEETS.traffic
    ),

    loadSheet(
      "sjitStock",
      SHEETS.sjitStock
    ),

    loadSheet(
      "sorStock",
      SHEETS.sorStock
    ),

    loadSheet(
      "sellerStock",
      SHEETS.sellerStock
    ),

    loadSheet(
      "productMaster",
      SHEETS.productMaster
    ),

    loadSheet(
      "catalogueMaster",
      SHEETS.catalogueMaster
    )

  ];

  await Promise.all(
    loaders
  );

  setLoadedAt(
    new Date()
  );

}

/* ==========================================
   LOAD SINGLE SHEET
========================================== */

async function loadSheet(
  cacheKey,
  url
) {

  try {

    const rows =
      await loadCsv(
        url
      );

    setAppData(
      cacheKey,
      rows
    );

    console.log(
      `Loaded ${cacheKey}: ${rows.length}`
    );

  } catch (
    error
  ) {

    console.error(
      `Failed loading ${cacheKey}`,
      error
    );

    setAppData(
      cacheKey,
      []
    );

  }

}