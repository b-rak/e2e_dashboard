import {
  Chart,
  fNeutral900,
  statusPass100,
  statusFail100,
} from "./chartConfig";
import usePercentage from "../utils/usePercentage";

// Polar Area Chart on dashboard page
export default async (
  canvasId: string,
  successChart: boolean,
  caseRatios: CaseRatios
) => {
  const data = caseRatios.cases.map((caseRatio) => {
    return {
      testcaseName: caseRatio.caseName,
      successRate: usePercentage(
        caseRatio.passed,
        caseRatio.passed + caseRatio.failed
      ),
    };
  });
  let chartStatus = Chart.getChart(canvasId); // <canvas> id
  if (chartStatus != undefined) {
    chartStatus.destroy();
  }
  new Chart(document.getElementById(canvasId) as HTMLCanvasElement, {
    type: "polarArea",
    data: {
      datasets: [
        {
          label: "PolarArea Chart " + "Passed",
          data: data.map((x) => {
            const value = successChart ? x.successRate : 100 - x.successRate;
            return value < 20 ? 20 : value;
          }),
          backgroundColor: data.map(() =>
            successChart ? statusPass100 : statusFail100
          ),
        },
      ],
    },
    options: {
      plugins: {
        tooltip: {
          backgroundColor: fNeutral900,
          cornerRadius: 8,
          bodyFont: {
            family: "'Lato', 'sans-serif'",
            size: 12,
            weight: "400",
            lineHeight: 1.5,
          },
          enabled: true,
          usePointStyle: true,
          callbacks: {
            labelPointStyle: () => {
              return {
                pointStyle: "rect",
                rotation: 0,
              };
            },
            label: (context) => {
              const testcaseName = data[context.dataIndex].testcaseName;
              const successRate = data[context.dataIndex].successRate;
              return successChart
                ? testcaseName + ": " + successRate + " %"
                : testcaseName + ": " + (100 - successRate) + " %";
            },
          },
        },
      },
      scales: {
        r: {
          display: false,
          min: 0,
          max: 100,
        },
      },
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1,
    },
  });
};
