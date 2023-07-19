import { getRandomResults, getResults } from "./../api/database";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Legend,
} from "chart.js";

// Register Chart components
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Legend);

// Colors
let statusFail100: string,
  statusFail75: string,
  statusPass100: string,
  statusPass75: string,
  fNeutral90: string;
try {
  const rootStyles = getComputedStyle(document.documentElement);
  statusFail100 = rootStyles.getPropertyValue("--status_fail_100");
  statusFail75 = rootStyles.getPropertyValue("--status_fail_75");
  statusPass100 = rootStyles.getPropertyValue("--status_pass_100");
  statusPass75 = rootStyles.getPropertyValue("--status_pass_75");
  fNeutral90 = rootStyles.getPropertyValue("--f_neutral_90");
} catch (e) {
  statusFail100 = "#ff6246";
  statusFail75 = "#ff917e";
  statusPass100 = "#1bb298";
  statusPass75 = "#3ecfb6";
  fNeutral90 = "#cbd0d4";
}

// Testcase Kachel Chart
export const useChart = async function (
  testcaseId: String,
  numberOfResults: Number
) {
  const data = getRandomResults(Number(numberOfResults));
  // define Plugin: change the colors of the last results: green (passed) and red (failed)
  const updateColor = {
    id: "updateColor",
    beforeUpdate: function (chartInstance: Chart) {
      for (let i = 0; i < 2; i++) {
        const dataset = chartInstance.data.datasets[i];
        const numberDataset = dataset.data as number[];
        dataset.backgroundColor = numberDataset.map(function (data: number) {
          return data < 0 ? statusFail100 : statusPass100;
        });
      }
    },
  };

  // Define Bar Chart
  new Chart(
    document.getElementById("bar-chart-" + testcaseId) as HTMLCanvasElement,
    {
      type: "scatter",
      plugins: [updateColor],
      data: {
        labels: data.map((x) => x.id),
        datasets: [
          {
            label: "test results",
            type: "bar",
            data: data.map((x) => x.passed * 1),
            borderRadius: getRem() * 0.5,
            barPercentage: 1,
            categoryPercentage: 1,
            barThickness: getRem() * 0.25,
          },
          {
            label: "test results2",
            type: "bar",
            data: data.map((x) => (1 - x.passed) * -1),
            borderRadius: getRem() * 0.5,
            barPercentage: 1,
            categoryPercentage: 1,
            barThickness: getRem() * 0.25,
          },
        ],
      },
      options: {
        scales: {
          x: {
            display: false,
            grid: {
              display: false,
            },
            ticks: {
              display: false,
            },
            border: {
              display: true,
            },
            stacked: true,
          },
          y: {
            border: {
              display: false,
            },
            display: true,
            grid: {
              display: true,
              color: function (ctx, options) {
                return ctx.tick.value === 0 ? "#677076" : "#FFFFFF";
              },
              z: 1,
            },
            min: -1.1,
            max: 1.1,
            ticks: {
              display: false,
              maxTicksLimit: 3,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
        },
        responsive: false,
      },
    }
  );
};

// OS/Group Kachel Chart
export const useOverviewChart = async function (groupdId: String) {
  const data = getResults();

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
      labels: data.map((x) => ""),
      datasets: [
        {
          label: "test results",
          data: data.map((x) => x.number),
          borderRadius: getRem() * 0.5,
          barPercentage: getRem() * 0.063,
          categoryPercentage: getRem() * 0.063,
          barThickness: getRem() * 5.156,
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
          max: 20,
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
            size: getRem() * 0.75,
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
      responsive: false,
    },
  });
};

// function to get rem value to calculate chart values
// this function is needed since chartjs only supports px values
const getRem = () => {
  if (window.innerWidth <= 1150) {
    return 10;
  } else if (window.innerWidth <= 1350) {
    return 12;
  } else if (window.innerWidth < 1600) {
    return 14;
  } else {
    return 16;
  }
};
