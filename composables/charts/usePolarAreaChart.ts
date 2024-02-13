import {
  Chart,
  fNeutral900,
  statusPass100,
  statusFail100,
  statusWarning100,
  statusSkip100,
} from "./chartConfig";

// Polar Area Chart on dashboard page
export default async (
  canvasId: string,
  resultStatus: string,
  caseRatios: Array<CaseRatio>,
  caseData: Case[]
) => {
  const data = caseRatios.map((caseRatio) => {
    return {
      testcaseName: (
        caseData.find((testcase) => testcase.id === caseRatio.caseId) as Case
      ).readableName,
      percentages: calculatePercentages(caseRatio),
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
          label: "PolarArea Chart",
          data: data.map((x) => {
            return x.percentages[resultStatus.toLowerCase()] < 20
              ? 20
              : x.percentages[resultStatus.toLowerCase()];
          }),
          backgroundColor: getColor(resultStatus),
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
              const successRate =
                data[context.dataIndex].percentages[resultStatus.toLowerCase()];
              return testcaseName + ": " + successRate + " %";
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

const getColor = (resultStatus: string) => {
  if (resultStatus === "PASSED") {
    return statusPass100;
  } else if (resultStatus === "WARNING") {
    return statusWarning100;
  } else if (resultStatus === "FAILED") {
    return statusFail100;
  } else {
    return statusSkip100;
  }
};

const calculatePercentages = (caseRatio: CaseRatio) => {
  // Calculate total
  const total =
    caseRatio.passed + caseRatio.failed + caseRatio.warning + caseRatio.skipped;

  // Calculate percentages without rounding
  const passedPercentage = (caseRatio.passed / total) * 100;
  const failedPercentage = (caseRatio.failed / total) * 100;
  const warningPercentage = (caseRatio.warning / total) * 100;
  const skippedPercentage = (caseRatio.skipped / total) * 100;

  // Calculate the rounding adjustment
  const roundingAdjustment =
    100 -
    (Math.round(passedPercentage) +
      Math.round(failedPercentage) +
      Math.round(warningPercentage) +
      Math.round(skippedPercentage));

  // Adjust the percentage with the largest rounding error
  const maxPercentage = Math.max(
    passedPercentage,
    failedPercentage,
    warningPercentage,
    skippedPercentage
  );

  let adjustedPassedPercentage = passedPercentage;
  let adjustedFailedPercentage = failedPercentage;
  let adjustedWarningPercentage = warningPercentage;
  let adjustedSkippedPercentage = skippedPercentage;

  if (roundingAdjustment !== 0) {
    if (maxPercentage === passedPercentage) {
      adjustedPassedPercentage += roundingAdjustment;
    } else if (maxPercentage === failedPercentage) {
      adjustedFailedPercentage += roundingAdjustment;
    } else if (maxPercentage === warningPercentage) {
      adjustedWarningPercentage += roundingAdjustment;
    } else {
      adjustedSkippedPercentage += roundingAdjustment;
    }
  }
  return {
    passed: Math.round(passedPercentage),
    failed: Math.round(failedPercentage),
    warning: Math.round(warningPercentage),
    skipped: Math.round(skippedPercentage),
  };
};
