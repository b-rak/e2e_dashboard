import {
  Chart,
  fNeutral900,
  statusFail100,
  statusPass100,
} from "./chartConfig";

const checkFraction = (
  elementIndex: number,
  data: [number, number, number, number]
) => {
  if (data[elementIndex] === 0) return 0;
  else
    return data[elementIndex] / (data[0] + data[1] + data[2] + data[3]) < 0.1
      ? Math.round((data[0] + data[1] + data[2] + data[3]) / 20)
      : data[elementIndex];
};

// Details Verteilung Chart
export default async (
  data: [number, number, number, number],
  update: Boolean
) => {
  // create an array with objects of the original data value and minimum sized value
  // the minimum sized value is needed to give each data value a minimum fraction for displaying reasons (currently each data value will be displayed at least as 5% of the half-doughnut)
  // the original value is needed so we can still show the correct value on the tooltip
  const dataWithMinimumSize = [
    {
      original: data[0],
      current: checkFraction(0, data),
    },
    {
      original: data[1],
      current: checkFraction(1, data),
    },
    {
      original: data[2],
      current: checkFraction(2, data),
    },
    {
      original: data[3],
      current: checkFraction(3, data),
    },
  ];
  if (update) {
    // update chart data and label for tooltip
    let chart = Chart.getChart("doughnut") as Chart;
    chart.data.datasets[0].data = dataWithMinimumSize.map((x) => x.current);
    chart.config.options.plugins.tooltip.callbacks.label = (context) =>
      context.label + ": " + dataWithMinimumSize[context.dataIndex].original;
    chart.update();
  } else {
    // Doughnut Chart
    new Chart(document.getElementById("doughnut") as HTMLCanvasElement, {
      type: "doughnut",
      data: {
        labels: ["Passed", "Failed", "Warning", "Skipped"],
        datasets: [
          {
            data: dataWithMinimumSize.map((x) => x.current),
            backgroundColor: [
              statusPass100,
              statusFail100,
              statusWarning100,
              statusSkip100,
            ],
            borderJoinStyle: "round",
          },
        ],
      },
      options: {
        rotation: -90,
        circumference: 180,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: fNeutral900,
            cornerRadius: 0.5 * useRem(),
            bodyFont: {
              family: "'Lato', 'sans-serif'",
              size: 0.875 * useRem(),
              weight: "400",
              lineHeight: 1.5,
              style: "normal",
            },
            callbacks: {
              title: () => {
                return "";
              },
              label: (context) => {
                return (
                  context.label +
                  ": " +
                  dataWithMinimumSize[context.dataIndex].original
                );
              },
            },
          },
        },
        responsive: true,
        aspectRatio: 2,
        maintainAspectRatio: false,
        elements: {
          arc: {
            borderWidth: 0,
          },
        },
      },
    });
  }
};
