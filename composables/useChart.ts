import { getRandomResults, getResults } from "./../api/database";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Chart,
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  DoughnutController,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";

// Register Chart components
Chart.register(
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  DoughnutController,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip
);

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
            callbacks: {
              label: () => {
                return ["18.07.2023 16:01:12", "10/10 Subcases"];
              },
            },
            enabled: false,
            //external: externalTooltipHandler,
            xAlign: "center",
            yAlign: "bottom",
            intersect: false,
            mode: "index",
            position: "average",
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

// Details Verteilung Chart
export const useDoughnutChart = async function (
  data: [number, number],
  update: Boolean
) {
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
            backgroundColor: ["#1BB298", "#FF6246"],
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

const data = [
  45, 45, 45, 45, 44, 45, 46, 46, 43, 60, 60, 60, 60, 60, 60, 44, 44, 44, 45,
  45, 45, 44, 45, 0, 0, 0, 0, 44, 44, 44, 45, 45, 44, 44, 45, 45, 45, 45, 44,
  45, 46, 46, 43, 44, 44, 44, 45, 45, 45, 44, 45,
];

export const useRuntimeChart = async function (subcaseId: String) {
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
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            titleAlign: "center",
            footerAlign: "center",
            usePointStyle: true,
            callbacks: {
              label: (ctx) => {
                return ctx.dataset.data[ctx.dataIndex] + " Sek.";
              },
              title: () => ["18.07.2023 16:01:12"],
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
            max: 62,
            min: -2,
          },
        },
        responsive: true,
        aspectRatio: 18,
        maintainAspectRatio: false,
      },
      data: {
        labels: data.map((x) => 1),
        datasets: [
          {
            data: data,
            borderColor: "#000",
            pointStyle: false,
            tension: 0.1,
            borderWidth: 2,
          },
        ],
      },
    }
  );
};

const getOrCreateTooltip = (chart: Chart) => {
  let tooltipEl = chart.canvas.parentNode?.querySelector("div");

  if (!tooltipEl) {
    tooltipEl = document.createElement("div");
    tooltipEl.id = "chartjs-tooltip";
    tooltipEl.className = "background";
    const statusDivEl = document.createElement("div");
    const textDivEl = document.createElement("div");
    const caretEl = document.createElement("div");

    statusDivEl.className = "status";
    textDivEl.className = "text";
    textDivEl.textContent = "18.07.2023 17:36:41 10/10 Subcases";
    caretEl.className = "caret";
    tooltipEl.appendChild(statusDivEl);
    tooltipEl.appendChild(textDivEl);
    tooltipEl.appendChild(caretEl);

    chart.canvas.parentNode?.appendChild(tooltipEl);
  }

  return tooltipEl;
};

const externalTooltipHandler = (context: any) => {
  // Tooltip Element
  const { chart, tooltip } = context;
  const tooltipEl = getOrCreateTooltip(chart);

  const yAlign = tooltip.yAlign;
  const xAlign = tooltip.xAlign;
  // Set caret Position
  tooltipEl.classList.remove("top", "bottom", "center", "left", "right");
  if (tooltip.yAlign || tooltip.xAlign) {
    tooltipEl.classList.add(tooltip.yAlign);
    tooltipEl.classList.add(tooltip.xAlign);
  }
  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = "0";
    chart.canvas.parentNode.removeChild(tooltipEl);
    return;
  }

  // Set Text
  if (tooltip.body) {
    const titleLines = tooltip.title || [];
    const bodyLines = tooltip.body.map((b: any) => b.lines);

    const tableHead = document.createElement("thead");

    titleLines.forEach((title: string) => {
      const tr = document.createElement("tr");
      tr.style.borderWidth = "0";

      const th = document.createElement("th");
      th.style.borderWidth = "0";
      const text = document.createTextNode(title);

      th.appendChild(text);
      tr.appendChild(th);
      tableHead.appendChild(tr);
    });

    const tableBody = document.createElement("tbody");
    bodyLines.forEach((body: string, i: number) => {
      const colors = tooltip.labelColors[i];

      const span = document.createElement("span");
      span.style.background = colors.backgroundColor;
      span.style.borderColor = colors.borderColor;
      span.style.borderWidth = "2px";
      span.style.marginRight = "10px";
      span.style.height = "10px";
      span.style.width = "10px";
      span.style.display = "inline-block";

      const tr = document.createElement("tr");
      tr.style.backgroundColor = "inherit";
      tr.style.borderWidth = "0";

      const td = document.createElement("td");
      td.style.borderWidth = "0";

      const text = document.createTextNode(body);
      td.appendChild(span);
      td.appendChild(text);
      tr.appendChild(td);
      tableBody.appendChild(tr);
    });
  }

  // Tooltip height and width
  const { height, width } = tooltipEl.getBoundingClientRect();

  // Chart canvas positions
  const positionY = chart.canvas.offsetTop;
  const positionX = chart.canvas.offsetLeft;

  // Carets
  const caretY = tooltip.caretY;
  const caretX = tooltip.caretX;

  // Final coordinates
  let top = positionY + caretY - height;
  let left = positionX + caretX - width / 2;
  let space = 8; // This for making space between the caret and the element.

  top -= space;
  var timeout;
  /*document.onmousemove = function (e) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(function () {}, 200);
  };*/
  tooltipEl.style.opacity = "1";
  tooltipEl.style.top = `${top}px`;
  tooltipEl.style.left = `${left}px`;

  // Display, position, and set styles for font
  tooltipEl.style.font = tooltip.options.bodyFont.string;
  tooltipEl.style.padding =
    tooltip.options.padding + "px " + tooltip.options.padding + "px";

  // yAlign could be: `top`, `bottom`, `center`
  if (yAlign === "top") {
    top += height + space;
  } else if (yAlign === "center") {
    top += height / 2;
  } else if (yAlign === "bottom") {
    top -= space;
  }
  // xAlign could be: `left`, `center`, `right`
  if (xAlign === "left") {
    left = left + width / 2 - tooltip.xPadding - space / 2;
    if (yAlign === "center") {
      left = left + space * 2;
    }
  } else if (xAlign === "right") {
    left -= width / 2;
    if (yAlign === "center") {
      left = left - space;
    } else {
      left += space;
    }
  }
  console.log(tooltipEl);
  console.log(tooltipEl.classList);
};
