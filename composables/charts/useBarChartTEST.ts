import { Chart, useRem } from "./chartConfig";

let display: boolean;
// Testcase Kachel Chart
export default (
  canvasId: string,
  results: Array<CasePassRate>,
  displayTooltip: boolean
) => {
  display = displayTooltip;
  console.log("RESULTS", results);
  const data = getFractionResults(results);
  console.log("DATA", data);
  // define Plugin: change the colors of the last results: green (passed) and red (failed)
  const updateColor = {
    id: "updateColor",
    beforeUpdate: function (chartInstance: Chart) {
      for (const dataset of chartInstance.data.datasets) {
        dataset.backgroundColor = useResultHexColor(dataset.label as string);
      }
    },
  };

  // Define Bar Chart
  new Chart(
    document.getElementById("bar-chart-" + canvasId) as HTMLCanvasElement,
    {
      type: "scatter",
      plugins: [updateColor],
      data: {
        labels: data[0].map((x) => x.id),
        datasets: [
          {
            label: "PASSED",
            type: "bar",
            data: data[0].map((x) => x.passed),
            borderRadius: useRem() * 0.5,
            //barThickness: useRem() * 0.25,
            maxBarThickness: useRem() * 0.5,
          },
          {
            label: "FAILED",
            type: "bar",
            data: data[1].map((x) => x.failed),
            borderRadius: useRem() * 0.5,
            //barThickness: useRem() * 0.25,
            maxBarThickness: useRem() * 0.5,
          },
          {
            label: "WARNING",
            type: "bar",
            data: data[2].map((x) => x.warning),
            borderRadius: useRem() * 0.5,
            //barThickness: useRem() * 0.25,
            maxBarThickness: useRem() * 0.5,
          },
          {
            label: "SKIPPED",
            type: "bar",
            data: data[3].map((x) => x.skipped),
            borderRadius: useRem() * 0.5,
            //barThickness: useRem() * 0.25,
            maxBarThickness: useRem() * 0.5,
          },
          {
            label: "FALSEPOSITIVE",
            type: "bar",
            data: data[4].map((x) => x.falsepos),
            borderRadius: useRem() * 0.5,
            //barThickness: useRem() * 0.25,
            maxBarThickness: useRem() * 0.5,
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
            //bounds: "data",
            display: true,
            grid: {
              display: true,
              color: function (ctx) {
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
            stacked: true,
          },
        },
        plugins: {
          tooltip: {
            enabled: displayTooltip,
            padding: {
              left: 0.4375 * useRem(),
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
                console.log("CTX", ctx);
                let createdDate = useDateAndTime(
                  data[ctx.datasetIndex][ctx.dataIndex].createdDate
                );
                if (ctx.dataset.label === "FALSEPOSITIVE") {
                  return [
                    createdDate.date + " " + createdDate.time,
                    "False positive",
                  ];
                } else {
                  return [
                    createdDate.date + " " + createdDate.time,
                    data[ctx.datasetIndex][ctx.dataIndex].absolute +
                      "/" +
                      data[ctx.datasetIndex][ctx.dataIndex].total +
                      " Subcases",
                  ];
                }
              },
              title: () => "",
              labelPointStyle: () => {
                return {
                  pointStyle: "rectRounded",
                  rotation: 0,
                };
              },
            },
          },
          legend: {
            display: false,
          },
        },
        responsive: false,
      },
    }
  );
};

function getFractionResults(results: Array<CasePassRate>) {
  const passedData: Array<{
    id: number;
    passed: number;
    absolute: number;
    total: number;
    createdDate: string;
  }> = [];
  const failedData: Array<{
    id: number;
    failed: number;
    absolute: number;
    total: number;
    createdDate: string;
  }> = [];
  const warningData: Array<{
    id: number;
    warning: number;
    absolute: number;
    total: number;
    createdDate: string;
  }> = [];
  const skippedData: Array<{
    id: number;
    skipped: number;
    absolute: number;
    total: number;
    createdDate: string;
  }> = [];
  const falseposData: Array<{
    id: number;
    falsepos: number;
    total: number;
    createdDate: string;
  }> = [];

  for (let i = results.length - 1; i >= 0; i--) {
    const caseResult = useResultStatus(results[i]);
    if (caseResult === "FALSEPOSITIVE") {
      falseposData.push({
        id: i,
        falsepos: 1,
        total: 0,
        createdDate: results[i].createdDate,
      });
      const numberOfSubcases =
        results[i].passedCount +
        results[i].failedCount +
        results[i].skippedCount +
        results[i].warningCount;
      passedData.push({
        id: i,
        passed: 0,
        absolute: 0,
        total: numberOfSubcases,
        createdDate: results[i].createdDate,
      });
      failedData.push({
        id: i,
        failed: 0,
        absolute: 0,
        total: numberOfSubcases,
        createdDate: results[i].createdDate,
      });
      warningData.push({
        id: i,
        warning: 0,
        absolute: 0,
        total: numberOfSubcases,
        createdDate: results[i].createdDate,
      });
      skippedData.push({
        id: i,
        skipped: 0,
        absolute: 0,
        total: numberOfSubcases,
        createdDate: results[i].createdDate,
      });
    } else {
      const numberOfSubcases =
        results[i].passedCount +
        results[i].failedCount +
        results[i].skippedCount +
        results[i].warningCount;
      passedData.push({
        id: i,
        passed: Number((results[i].passedCount / numberOfSubcases).toFixed(1)),
        absolute: results[i].passedCount,
        total: numberOfSubcases,
        createdDate: results[i].createdDate,
      });
      failedData.push({
        id: i,
        failed:
          -1 * Number((results[i].failedCount / numberOfSubcases).toFixed(1)),
        absolute: results[i].failedCount,
        total: numberOfSubcases,
        createdDate: results[i].createdDate,
      });
      warningData.push({
        id: i,
        warning:
          -1 * Number((results[i].warningCount / numberOfSubcases).toFixed(1)),
        absolute: results[i].warningCount,
        total: numberOfSubcases,
        createdDate: results[i].createdDate,
      });
      skippedData.push({
        id: i,
        skipped: Number(
          (results[i].skippedCount / numberOfSubcases).toFixed(1)
        ),
        absolute: results[i].skippedCount,
        total: numberOfSubcases,
        createdDate: results[i].createdDate,
      });
      falseposData.push({
        id: i,
        falsepos: 0,
        total: 0,
        createdDate: results[i].createdDate,
      });
    }
  }
  return [passedData, failedData, warningData, skippedData, falseposData];
}

const getOrCreateTooltip = (chart: Chart) => {
  let tooltipEl = chart.canvas.parentNode?.querySelector("div");

  if (!tooltipEl) {
    tooltipEl = document.createElement("div");
    tooltipEl.id = "chartjs-tooltip";
    tooltipEl.className =
      "w-[12.5rem] h-[4.5rem] p-3 flex justify-center items-center gap-4 f_neutral_900 border_xsmall absolute opacity-100 transition-all duration-[0.25s] ease-in-out pointer-events-none";
    const statusDivEl = document.createElement("div");
    const textDivEl = document.createElement("div");
    const caretEl = document.createElement("div");
    statusDivEl.className = "w-6 h-6 border_xsmall status_pass_100";
    textDivEl.className =
      "h-12 w-[8.5rem] flex flex-wrap items-start basic_text_white button_regular_14";
    let lines = chart.tooltip?.body[0].lines;
    textDivEl.textContent = lines?.join(" ") as string;
    caretEl.className =
      "absolute -bottom-[0.3125rem] left-1/2 -translate-x-1/2 rotate-45 w-[0.625rem] h-[0.625rem] rounded-br-[22%] f_neutral_900";
    tooltipEl.appendChild(statusDivEl);
    tooltipEl.appendChild(textDivEl);
    tooltipEl.appendChild(caretEl);

    chart.canvas.parentNode?.appendChild(tooltipEl);
  }

  return tooltipEl;
};

const externalTooltipHandler = (context: any): void => {
  if (!display) {
    return;
  }
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
};
