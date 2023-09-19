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
  fNeutral90: string,
  fNeutral900: string;
try {
  const rootStyles = getComputedStyle(document.documentElement);
  statusFail100 = rootStyles.getPropertyValue("--status_fail_100");
  statusFail75 = rootStyles.getPropertyValue("--status_fail_75");
  statusPass100 = rootStyles.getPropertyValue("--status_pass_100");
  statusPass75 = rootStyles.getPropertyValue("--status_pass_75");
  fNeutral90 = rootStyles.getPropertyValue("--f_neutral_90");
  fNeutral900 = rootStyles.getPropertyValue("--f_neutral_900");
} catch (e) {
  statusFail100 = "#ff6246";
  statusFail75 = "#ff917e";
  statusPass100 = "#1bb298";
  statusPass75 = "#3ecfb6";
  fNeutral90 = "#cbd0d4";
  fNeutral900 = "#222f34";
}

export {
  Chart,
  statusFail100,
  statusFail75,
  statusPass100,
  statusPass75,
  fNeutral90,
  fNeutral900,
  useRem,
  ChartDataLabels,
};
