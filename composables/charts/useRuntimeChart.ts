import { Chart, fNeutral900, useRem, fNeutral700 } from "./chartConfig";

export default async (subcaseId: String, results: Array<any>) => {
  results = results.reverse();
  const customCanvasBackgroundColor = {
    id: "customCanvasBackgroundColor",
    beforeDraw: (chart: Chart) => {
      const { ctx } = chart;
      ctx.save();
      ctx.globalCompositeOperation = "destination-over";
      ctx.fillStyle = "#e8eced";
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    },
  };
  new Chart(
    document.getElementById("runtime-" + subcaseId) as HTMLCanvasElement,
    {
      type: "line",
      plugins: [customCanvasBackgroundColor],
      options: {
        interaction: {
          mode: "nearest",
          axis: "x",
          intersect: false,
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            padding: {
              left: -0.625 * useRem(),
              right: 0.4375 * useRem(),
              top: 0.3125 * useRem(),
              bottom: 0.3125 * useRem(),
            },
            backgroundColor: fNeutral900,
            cornerRadius: 0.5 * useRem(),
            bodyFont: {
              family: "'Lato', 'sans-serif'",
              size: 0.875 * useRem(),
              weight: "400",
              lineHeight: 1.5,
              style: "normal",
            },
            titleAlign: "center",
            footerAlign: "center",
            usePointStyle: true,
            callbacks: {
              label: (ctx) => {
                let createdDate = useDateAndTime(
                  results[ctx.dataIndex].createdDate
                );
                return (
                  createdDate.date +
                  " " +
                  createdDate.time +
                  " - " +
                  results[ctx.dataIndex].runtime +
                  " Sek."
                );
              },
              title: () => "",
              labelPointStyle: () => {
                return {
                  pointStyle: false,
                  rotation: 0,
                };
              },
            },
          },
        },
        scales: {
          x: {
            display: false,
          },
          y: {
            display: false,
            max: 62,
            min: -2,
          },
        },
        responsive: true,
        aspectRatio: 18,
        maintainAspectRatio: false,
      },
      data: {
        labels: results.map((x) => 1),
        datasets: [
          {
            data: results.map((x) => {
              return x.runtime > 60 ? 60 : x.runtime;
            }),
            borderColor: fNeutral700,
            pointStyle: false,
            //pointBackgroundColor: "#000",
            tension: 0.1,
            borderWidth: 2,
          },
        ],
      },
    }
  );
};
