import {
  Chart,
  fNeutral900,
  statusFail100,
  statusPass100,
} from "./chartConfig";

// Details Verteilung Chart
export default async (data: [number, number], update: Boolean) => {
  // Doughnut Chart
  if (update) {
    let chart = Chart.getChart("doughnut") as Chart;
    chart.data.datasets[0].data = data;
    chart.update();
  } else {
    new Chart(document.getElementById("doughnut") as HTMLCanvasElement, {
      type: "doughnut",
      data: {
        labels: ["Passed", "Failed"],
        datasets: [
          {
            data: data,
            backgroundColor: [statusPass100, statusFail100],
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
                return context.label + ": " + context.parsed;
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
