/* ==========================================
   CHART COMPONENT
   Myntra Sales Intelligence
========================================== */

const CHARTS = {};

/* ==========================================
   DESTROY CHART
========================================== */

export function destroyChart(
  containerId
) {

  if (
    CHARTS[containerId]
  ) {

    CHARTS[
      containerId
    ].destroy();

    delete CHARTS[
      containerId
    ];

  }

}

/* ==========================================
   LINE CHART
========================================== */

export function renderLineChart(
  containerId,
  {
    labels = [],
    values = [],
    label = "Value"
  }
) {

  destroyChart(
    containerId
  );

  const canvas =
    createCanvas(
      containerId
    );

  CHARTS[
    containerId
  ] = new Chart(
    canvas,
    {

      type: "line",

      data: {

        labels,

        datasets: [

          {

            label,

            data: values,

            tension: 0.35,

            fill: true,

            borderWidth: 3

          }

        ]

      },

      options: getBaseOptions()

    }
  );

}

/* ==========================================
   BAR CHART
========================================== */

export function renderBarChart(
  containerId,
  {
    labels = [],
    values = [],
    label = "Value"
  }
) {

  destroyChart(
    containerId
  );

  const canvas =
    createCanvas(
      containerId
    );

  CHARTS[
    containerId
  ] = new Chart(
    canvas,
    {

      type: "bar",

      data: {

        labels,

        datasets: [

          {

            label,

            data: values

          }

        ]

      },

      options: getBaseOptions()

    }
  );

}

/* ==========================================
   STACKED BAR CHART
========================================== */

export function renderStackedBarChart(
  containerId,
  {
    labels = [],
    datasets = []
  }
) {

  destroyChart(
    containerId
  );

  const canvas =
    createCanvas(
      containerId
    );

  CHARTS[
    containerId
  ] = new Chart(
    canvas,
    {

      type: "bar",

      data: {

        labels,

        datasets

      },

      options: {

        responsive: true,

        maintainAspectRatio:
          false,

        interaction: {

          mode: "index",

          intersect: false

        },

        scales: {

          x: {

            stacked: true

          },

          y: {

            stacked: true,

            beginAtZero: true

          }

        }

      }

    }
  );

}

/* ==========================================
   DONUT CHART
========================================== */

export function renderDonutChart(
  containerId,
  {
    labels = [],
    values = []
  }
) {

  destroyChart(
    containerId
  );

  const canvas =
    createCanvas(
      containerId
    );

  CHARTS[
    containerId
  ] = new Chart(
    canvas,
    {

      type: "doughnut",

      data: {

        labels,

        datasets: [

          {

            data: values

          }

        ]

      },

      options: {

        responsive: true,

        maintainAspectRatio:
          false,

        plugins: {

          legend: {

            position:
              "bottom"

          }

        }

      }

    }
  );

}

/* ==========================================
   BASE OPTIONS
========================================== */

function getBaseOptions() {

  return {

    responsive: true,

    maintainAspectRatio:
      false,

    interaction: {

      intersect: false,

      mode: "index"

    },

    plugins: {

      legend: {

        display: true

      }

    },

    scales: {

      y: {

        beginAtZero: true

      }

    }

  };

}

/* ==========================================
   CREATE CANVAS
========================================== */

function createCanvas(
  containerId
) {

  const container =
    document.getElementById(
      containerId
    );

  if (!container) {

    throw new Error(
      `Container not found: ${containerId}`
    );

  }

  container.innerHTML =
    `<canvas></canvas>`;

  return container.querySelector(
    "canvas"
  );

}