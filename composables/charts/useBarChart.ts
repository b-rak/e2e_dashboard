import { Chart, useRem, statusPass100, statusFail100 } from "./chartConfig";

let display: boolean;

// Testcase Kachel Chart
export default (
  canvasId: string,
  results: Array<Statistics>,
  displayTooltip: boolean
) => {
  display = displayTooltip;
  const data = getPassedFraction(results);
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
    document.getElementById("bar-chart-" + canvasId) as HTMLCanvasElement,
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
            borderRadius: useRem() * 0.5,
            barPercentage: 1,
            categoryPercentage: 1,
            barThickness: useRem() * 0.25,
          },
          {
            label: "test results2",
            type: "bar",
            data: data.map((x) => (1 - x.passed) * -1),
            borderRadius: useRem() * 0.5,
            barPercentage: 1,
            categoryPercentage: 1,
            barThickness: useRem() * 0.25,
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
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                let createdDate = useDateAndTime(
                  data[ctx.dataIndex].createdDate
                );
                return [
                  createdDate.date + " " + createdDate.time,
                  data[ctx.dataIndex].absolutePassed +
                    "/" +
                    data[ctx.dataIndex].total +
                    " Subcases",
                ];
              },
            },
            enabled: false,
            external: externalTooltipHandler as any,
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

function getPassedFraction(results: Array<Statistics>) {
  let data = [];
  for (let i = 0; i < results.length; i++) {
    data.push({
      id: i,
      passed: Number(
        (results[i].passed / (results[i].passed + results[i].failed)).toFixed(1)
      ),
      createdDate: results[i].caseCreatedDate,
      absolutePassed: results[i].passed,
      total: results[i].passed + results[i].failed,
    });
  }
  return data.reverse();
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
