/* ==========================================
   DASHBOARD ENGINE
========================================== */

export function buildDashboard(
  {
    sales = [],
    sjitStock = [],
    sorStock = []
  }
) {

  return {

    kpis:
      buildKpis(
        sales,
        sjitStock,
        sorStock
      ),

    dailyTrend:
      buildDailyTrend(
        sales
      ),

    brandTrend:
      buildBrandTrend(
        sales
      ),

    poTypeChart:
      buildPoTypeChart(
        sales
      ),

    statusPerformance:
      buildStatusPerformance(
        sales
      ),

    brandPerformance:
      buildBrandPerformance(
        sales
      ),

    poTypePerformance:
      buildPoTypePerformance(
        sales
      )

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
      (
        total,
        row
      ) =>
        total +
        Number(
          row.final_amount || 0
        ),
      0
    );

  const units =
    sales.reduce(
      (
        total,
        row
      ) =>
        total +
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
      (
        total,
        row
      ) =>
        total +
        Number(
          row.sellable_inventory_count || 0
        ),
      0
    );

  const sor =
    sorStock.reduce(
      (
        total,
        row
      ) =>
        total +
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
   DAILY UNITS TREND
========================================== */

function buildDailyTrend(
  sales
) {

  const map =
    new Map();

  sales.forEach(
    row => {

      const date =
        row.date;

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

  const labels =
    Array.from(
      map.keys()
    ).sort();

  const values =
    labels.map(
      date =>
        map.get(date)
    );

  return {

    labels,

    values

  };

}

/* ==========================================
   BRAND TREND
========================================== */

function buildBrandTrend(
  sales
) {

  const dates =
    [
      ...new Set(
        sales.map(
          row =>
            row.date
        )
      )
    ].sort();

  const brands =
    [
      ...new Set(
        sales.map(
          row =>
            row.brand
        )
      )
    ].sort();

  const datasets =
    brands.map(
      brand => {

        const data =
          dates.map(
            date => {

              return sales
                .filter(
                  row =>
                    row.date ===
                      date &&
                    row.brand ===
                      brand
                )
                .reduce(
                  (
                    total,
                    row
                  ) =>
                    total +
                    Number(
                      row.qty ||
                        0
                    ),
                  0
                );

            }
          );

        return {

          label:
            brand,

          data

        };

      }
    );

  return {

    labels: dates,

    datasets

  };

}

/* ==========================================
   PO TYPE CHART
========================================== */

function buildPoTypeChart(
  sales
) {

  const map =
    new Map();

  sales.forEach(
    row => {

      const poType =
        row.po_type ||
        "UNKNOWN";

      const qty =
        Number(
          row.qty || 0
        );

      map.set(
        poType,
        (
          map.get(
            poType
          ) || 0
        ) + qty
      );

    }
  );

  return {

    labels:
      Array.from(
        map.keys()
      ),

    values:
      Array.from(
        map.values()
      )

  };

}

/* ==========================================
   ERP STATUS PERFORMANCE
========================================== */

function buildStatusPerformance(
  sales
) {

  const map =
    new Map();

  const totalUnits =
    sales.reduce(
      (
        total,
        row
      ) =>
        total +
        Number(
          row.qty || 0
        ),
      0
    );

  sales.forEach(
    row => {

      const status =
        row.erp_status ||
        "UNKNOWN";

      if (
        !map.has(
          status
        )
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
        map.get(
          status
        );

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

        ...row,

        share:
          totalUnits ===
          0
            ? 0
            : (
                row.units /
                totalUnits
              ) *
              100

      })
    )
    .sort(
      (
        a,
        b
      ) =>
        b.units -
        a.units
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

  const totalUnits =
    sales.reduce(
      (
        total,
        row
      ) =>
        total +
        Number(
          row.qty || 0
        ),
      0
    );

  sales.forEach(
    row => {

      const brand =
        row.brand ||
        "UNKNOWN";

      if (
        !map.has(
          brand
        )
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
        map.get(
          brand
        );

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

        ...row,

        asp:
          row.units ===
          0
            ? 0
            : row.gmv /
              row.units,

        share:
          totalUnits ===
          0
            ? 0
            : (
                row.units /
                totalUnits
              ) *
              100

      })
    )
    .sort(
      (
        a,
        b
      ) =>
        b.units -
        a.units
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

  const totalUnits =
    sales.reduce(
      (
        total,
        row
      ) =>
        total +
        Number(
          row.qty || 0
        ),
      0
    );

  sales.forEach(
    row => {

      const poType =
        row.po_type ||
        "UNKNOWN";

      if (
        !map.has(
          poType
        )
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
        map.get(
          poType
        );

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

        ...row,

        share:
          totalUnits ===
          0
            ? 0
            : (
                row.units /
                totalUnits
              ) *
              100

      })
    )
    .sort(
      (
        a,
        b
      ) =>
        b.units -
        a.units
    );

}