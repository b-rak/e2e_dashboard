import useRem from "../utils/useRem";
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
  PolarAreaController,
  RadialLinearScale,
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
  PolarAreaController,
  RadialLinearScale,
  Tooltip
);

// Colors
let statusFail100: string,
  statusFail75: string,
  statusPass100: string,
  statusPass75: string,
  statusWarning100: string,
  statusWarning75: string,
  statusSkip100: string,
  statusSkip75: string,
  statusFalsePositive: string,
  fNeutral90: string,
  fNeutral900: string,
  fNeutral700: string;
try {
  const rootStyles = getComputedStyle(document.documentElement);
  statusFail100 = rootStyles.getPropertyValue("--status_fail_100");
  statusFail75 = rootStyles.getPropertyValue("--status_fail_75");
  statusPass100 = rootStyles.getPropertyValue("--status_pass_100");
  statusPass75 = rootStyles.getPropertyValue("--status_pass_75");
  statusWarning100 = rootStyles.getPropertyValue("--status_warning_100");
  statusWarning75 = rootStyles.getPropertyValue("--status_warning_75");
  statusSkip100 = rootStyles.getPropertyValue("--status_skip_100");
  statusSkip75 = rootStyles.getPropertyValue("--status_skip_75");
  statusFalsePositive = rootStyles.getPropertyValue("--status_false_positive");
  fNeutral90 = rootStyles.getPropertyValue("--f_neutral_90");
  fNeutral900 = rootStyles.getPropertyValue("--f_neutral_900");
  fNeutral700 = rootStyles.getPropertyValue("--f_neutral_700");
} catch (e) {
  statusFail100 = "#ff6246";
  statusFail75 = "#ff917e";
  statusPass100 = "#1bb298";
  statusPass75 = "#3ecfb6";
  statusWarning100 = "#fae84d";
  statusWarning75 = "#e2e227";
  statusSkip100 = "#34a4eb";
  statusSkip75 = "#347ead";
  statusFalsePositive = "#cbd0d4";
  fNeutral90 = "#cbd0d4";
  fNeutral900 = "#222f34";
  fNeutral700 = "#3a4f57";
}

export {
  Chart,
  statusFail100,
  statusFail75,
  statusPass100,
  statusPass75,
  statusWarning100,
  statusWarning75,
  statusSkip100,
  statusSkip75,
  statusFalsePositive,
  fNeutral90,
  fNeutral900,
  fNeutral700,
  useRem,
  ChartDataLabels,
};
