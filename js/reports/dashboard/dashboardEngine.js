/* ==========================================
   DASHBOARD ENGINE
   Myntra Sales Intelligence
========================================== */

import {
  formatGMV,
  formatASP,
  formatUnits,
  formatPercent
} from "../../core/formatter.js";

/* ==========================================
   BUILD DASHBOARD
========================================== */

export function buildDashboard(
  {
    sales = [],
    sjitStock = [],
    sorStock = []
  }
) {

  const kpis =
    buildKpis(
      sales,
      sjitStock,
      sorStock
    );

  const dailyTrend =
    buildDailyTrend(
      sales
    );

  const brandTrend =
    buildBrandTrend(
      sales
    );

  const poTypePerformance =
    buildPoTypePerformance(
      sales
    );

  const brandPerformance =
    buildBrandPerformance(
      sales
    );

  const statusPerformance =
    buildStatusPerformance(
      sales
    );

  const brandProjection =
    buildBrandProjection(
      sales
    );

  const poTypeProjection =
    buildPoTypeProjection(
      sales
    );

  return {

    kpis,

    dailyTrend,

    brandTrend,

    poTypePerformance,

    brandPerformance,

    statusPerformance,

    brandProjection,

    poTypeProjection

  };

}

/* ==========================================
   KPI
========================================== */

function buildKpis(
  sales,
  sjitStock,
  sorStock
) {

  const gmv =
    sales.reduce(
      (sum, row) =>
        sum +
        Number(
          row.final_amount || 0
        ),
      0
    );

  const units =
    sales.reduce(
      (sum, row) =>
        sum +
        Number(
          row.qty || 0
        ),
      0
    );

  const asp =
    units === 0
      ? 0
      : gmv / units;

  const sjit =
    sjitStock.reduce(
      (sum, row) =>
        sum +
        Number(
          row.sellable_inventory_count || 0
        ),
      0
    );

  const sor =
    sorStock.reduce(
      (sum, row) =>
        sum +
        Number(
          row.units || 0
        ),
      0
    );

  return {

    gmv,

    units,

    asp,

    sjitStock: sjit,

    sorStock: sor

  };

}

/* ==========================================
   DAILY TREND
========================================== */

function buildDailyTrend(
  sales
) {

  const map =
    new Map();

  sales.forEach(
    row => {

      const date =
        row.date || "";

      const qty =
        Number(
          row.qty || 0
        );

      map.set(
        date,
        (
          map.get(date) || 0
        ) + qty
      );

    }
  );

  return Array.from(
    map.entries()
  )
    .map(
      ([date, units]) => ({

        date,

        units

      })
    )
    .sort(
      (a, b) =>
        String(a.date)
          .localeCompare(
            String(b.date)
          )
    );

}

/* ==========================================
   BRAND TREND
========================================== */

function buildBrandTrend(
  sales
) {

  const map =
    new Map();

  sales.forEach(
    row => {

      const key =
        `${row.date}|${row.brand}`;

      map.set(
        key,
        (
          map.get(key) || 0
        ) +
          Number(
            row.qty || 0
          )
      );

    }
  );

  return Array.from(
    map.entries()
  ).map(
    ([key, units]) => {

      const [
        date,
        brand
      ] =
        key.split("|");

      return {

        date,

        brand,

        units

      };

    }
  );

}

/* ==========================================
   PO TYPE PERFORMANCE
========================================== */

function buildPoTypePerformance(
  sales
) {

  const map =
    new Map();

  let totalUnits = 0;

  sales.forEach(
    row => {

      const poType =
        row.po_type ||
        "UNKNOWN";

      const qty =
        Number(
          row.qty || 0
        );

      const gmv =
        Number(
          row.final_amount || 0
        );

      totalUnits += qty;

      if (
        !map.has(poType)
      ) {

        map.set(
          poType,
          {
            poType,
            units: 0,
            gmv: 0
          }
        );

      }

      const current =
        map.get(poType);

      current.units += qty;
      current.gmv += gmv;

    }
  );

  return Array.from(
    map.values()
  ).map(
    row => ({

      ...row,

      share:
        totalUnits === 0
          ? 0
          : (
              row.units /
              totalUnits
            ) * 100

    })
  );

}

/* ==========================================
   BRAND PERFORMANCE
========================================== */

function buildBrandPerformance(
  sales
) {

  const map =
    new Map();

  const totalGMV =
    sales.reduce(
      (sum, row) =>
        sum +
        Number(
          row.final_amount || 0
        ),
      0
    );

  sales.forEach(
    row => {

      const brand =
        row.brand ||
        "UNKNOWN";

      if (
        !map.has(brand)
      ) {

        map.set(
          brand,
          {
            brand,
            units: 0,
            gmv: 0
          }
        );

      }

      const current =
        map.get(brand);

      current.units +=
        Number(
          row.qty || 0
        );

      current.gmv +=
        Number(
          row.final_amount || 0
        );

    }
  );

  return Array.from(
    map.values()
  )
    .map(
      row => ({

        brand:
          row.brand,

        units:
          formatUnits(
            row.units
          ),

        gmv:
          formatGMV(
            row.gmv
          ),

        asp:
          formatASP(
            row.gmv /
              (
                row.units ||
                1
              )
          ),

        share:
          formatPercent(
            (
              row.gmv /
              (
                totalGMV ||
                1
              )
            ) * 100
          )

      })
    )
    .sort(
      (a, b) =>
        Number(
          String(
            b.gmv
          ).replace(
            /[^0-9.]/g,
            ""
          )
        ) -
        Number(
          String(
            a.gmv
          ).replace(
            /[^0-9.]/g,
            ""
          )
        )
    );

}

/* ==========================================
   STATUS PERFORMANCE
========================================== */

function buildStatusPerformance(
  sales
) {

  const map =
    new Map();

  const totalGMV =
    sales.reduce(
      (sum, row) =>
        sum +
        Number(
          row.final_amount || 0
        ),
      0
    );

  sales.forEach(
    row => {

      const status =
        row.erp_status ||
        "UNKNOWN";

      if (
        !map.has(status)
      ) {

        map.set(
          status,
          {
            status,
            units: 0,
            gmv: 0
          }
        );

      }

      const current =
        map.get(status);

      current.units +=
        Number(
          row.qty || 0
        );

      current.gmv +=
        Number(
          row.final_amount || 0
        );

    }
  );

  return Array.from(
    map.values()
  ).map(
    row => ({

      status:
        row.status,

      units:
        formatUnits(
          row.units
        ),

      gmv:
        formatGMV(
          row.gmv
        ),

      share:
        formatPercent(
          (
            row.gmv /
            (
              totalGMV ||
              1
            )
          ) * 100
        )

    })
  );

}

/* ==========================================
   PLACEHOLDER
========================================== */

function buildBrandProjection() {

  return [];

}

function buildPoTypeProjection() {

  return [];

}