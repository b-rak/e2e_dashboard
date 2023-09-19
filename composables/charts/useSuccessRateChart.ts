import usePercentage from "../utils/usePercentage";
import { Chart, fNeutral900 } from "./chartConfig";

const getRatioPercentage = (results: PassRate) => {
  let ratios = [];
  const reversedResults = results.ratios.reverse();
  for (const ratio of reversedResults) {
    ratios.push({
      ratio: usePercentage(ratio.ratio, 1),
      date: useDateAndTime(ratio.date).date,
    });
  }
  return ratios;
};

export default async (id: number, results: PassRate) => {
  const ratios = getRatioPercentage(results);
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
  new Chart(document.getElementById("successrate-" + id) as HTMLCanvasElement, {
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
          backgroundColor: fNeutral900,
          cornerRadius: 8,
          bodyFont: {
            family: "'Lato', 'sans-serif'",
            size: 12,
            weight: "400",
            lineHeight: 1.5,
          },
          titleAlign: "center",
          footerAlign: "center",
          usePointStyle: true,
          callbacks: {
            label: (ctx) => {
              return (
                ratios[ctx.dataIndex].date +
                ": " +
                ratios[ctx.dataIndex].ratio +
                "%"
              );
            },
            title: (ctx) => "",
            labelPointStyle: () => {
              return {
                pointStyle: "rectRounded",
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
          max: 102,
          min: -2,
        },
      },
      responsive: true,
      aspectRatio: 18,
      maintainAspectRatio: false,
    },
    data: {
      labels: ratios.map((x) => 1),
      datasets: [
        {
          data: ratios.map((x) => x.ratio),
          borderColor: "#000",
          pointStyle: false,
          tension: 0.1,
          borderWidth: 2,
        },
      ],
    },
  });
};
