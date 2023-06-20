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

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Legend);

export const useChart = async function (testcaseId: String) {
  const negativeColor = "#FF6246";
  const positiveColor = "#1BB398";
  const data = getRandomResults(50);

  const updateColor = {
    id: "updateColor",
    beforeUpdate: function (chartInstance: Chart) {
      const dataset = chartInstance.data.datasets[0];
      const numberDataset = dataset.data as number[];
      dataset.backgroundColor = numberDataset.map(function (data: number) {
        return data < 0 ? negativeColor : positiveColor;
      });
    },
  };
  console.log("TESTCASE ID: " + testcaseId);
  console.log(document.getElementById("bar-chart-" + testcaseId));
  // Bar chart
  new Chart(
    document.getElementById("bar-chart-" + testcaseId) as HTMLCanvasElement,
    {
      type: "bar",
      plugins: [updateColor],
      data: {
        labels: data.map((x) => x.id),
        datasets: [
          {
            label: "test results",
            data: data.map((x) => (x.result === "passed" ? 1 : -1)),
            borderRadius: 8,
            barPercentage: 1,
            categoryPercentage: 1,
            barThickness: 4,
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

export const useOverviewChart = async function (osId: number) {
  const negativeColor = "#FF917E";
  const positiveColor = "#3ECFB6";
  const data = getResults();

  const updateColor = {
    id: "updateColor",
    beforeUpdate: function (chartInstance: Chart) {
      const dataset = chartInstance.data.datasets[0];
      const numberDataset = dataset.data as number[];
      console.log(numberDataset);
      dataset.backgroundColor = numberDataset.map(function (
        data: number,
        index: number
      ) {
        return index % 2 === 0 ? positiveColor : negativeColor;
      });
    },
  };

  // Bar chart
  new Chart(document.getElementById("rounded-bar") as HTMLCanvasElement, {
    type: "bar",
    plugins: [updateColor, ChartDataLabels],
    data: {
      labels: data.map((x) => ""),
      datasets: [
        {
          label: "test results",
          data: data.map((x) => x.number),
          borderRadius: 8,
          barPercentage: 1,
          categoryPercentage: 1,
          barThickness: 82.5,
          minBarLength: 15,
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
        datalabels: {
          anchor: "start",
          align: "top",
          offset: -5,
          color: "#333",
          font: {
            weight: 700,
            family: "bold",
            size: 12,
            style: "normal",
          },
          formatter: function (value, context) {
            if (value < 3 && context.dataset.datalabels) {
              context.dataset.datalabels.offset = 0;
            }
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
