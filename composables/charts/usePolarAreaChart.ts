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
  caseRatios: Array<CaseRatio>
) => {
  const data = caseRatios.map((caseRatio) => {
    return {
      testcaseName: caseRatio.caseId,
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
          enabled: true,
          usePointStyle: true,
          callbacks: {
            labelPointStyle: () => {
              return {
                pointStyle: false,
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
