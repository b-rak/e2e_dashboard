import {
  Chart,
  ChartDataLabels,
  useRem,
  statusPass100,
  statusFail100,
  fNeutral90,
} from "./chartConfig";

// OS/Group Kachel Chart
export default async (groupdId: String, dashboardId: number) => {
  const data = await getResults(dashboardId);

  // define Plugin: change color of bar depending on passed or failed; exception: value 0 is grey
  const updateColor = {
    id: "updateColor",
    beforeUpdate: function (chartInstance: Chart) {
      const dataset = chartInstance.data.datasets[0];
      const numberDataset = dataset.data as number[];
      dataset.backgroundColor = numberDataset.map(function (
        data: number,
        index: number
      ) {
        if (data === 0) {
          return fNeutral90;
        }
        return index % 2 === 0 ? statusPass100 : statusFail100;
      });
    },
  };

  // Bar chart
  new Chart(document.getElementById("chart-" + groupdId) as HTMLCanvasElement, {
    type: "bar",
    plugins: [updateColor, ChartDataLabels],
    data: {
      labels: ["", ""],
      datasets: [
        {
          label: "test results",
          data: [data.passed, data.failed],
          borderRadius: useRem() * 0.5,
          barPercentage: useRem() * 0.063,
          categoryPercentage: useRem() * 0.063,
          barThickness: useRem() * 5.156,
          minBarLength: 20,
        },
      ],
    },
    options: {
      scales: {
        x: {
          grid: {
            display: false,
          },
          display: false,
        },
        y: {
          grid: {
            display: false,
          },
          display: false,
          min: 0,
          max: data.passed + data.failed,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },
        // set position and font of displayed text on bar
        datalabels: {
          anchor: "start",
          align: "top",
          offset: 0,
          color: "#fff",
          font: {
            weight: 700,
            family: "Lato",
            size: useRem() * 0.75,
            style: "normal",
          },
          formatter: function (value, context) {
            // give bar minimum height so the displayed text is within the bar
            if (value < 3 && context.dataset.datalabels) {
              context.dataset.datalabels.offset = -4;
            }
            // displayed text on bar
            return context.dataIndex % 2 === 0
              ? value + " PASSED"
              : value + " FAILED";
          },
        },
      },
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 2.81,
    },
  });
};

async function getResults(dashboardId: number) {
  const data = await useLatestCaseResults(dashboardId);
  let passed = 0;
  let failed = 0;
  for (const caseResult of data) {
    if (caseResult.result === "PASSED") {
      passed++;
    } else if (caseResult.result === "FAILED") {
      failed++;
    }
  }
  return {
    passed: passed,
    failed: failed,
  };
}
