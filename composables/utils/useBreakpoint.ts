import { onMounted, reactive } from "vue";

const screens = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
  xxxl: 1600,
};

const breakpoints = reactive({ w: 0, h: 0, viewport: "xs", mobile: true });

const xs = (val: number) => val >= screens.xs && val < screens.sm;
const sm = (val: number) => val >= screens.sm && val < screens.md;
const md = (val: number) => val >= screens.md && val < screens.lg;
const lg = (val: number) => val >= screens.lg && val < screens.xl;
const xl = (val: number) => val >= screens.xl && val < screens.xxl;
const xxl = (val: number) => val >= screens.xxl && val < screens.xxxl;
const xxxl = (val: number) => val >= screens.xxxl;

const getBreakpoint = (w: number) => {
  if (xs(w)) return "xs";
  else if (sm(w)) return "sm";
  else if (md(w)) return "md";
  else if (lg(w)) return "lg";
  else if (xl(w)) return "xl";
  else if (xxl(w)) return "xxl";
  else if (xxxl(w)) return "xxxl";
  else return "all";
};

const setBreakpoint = () => {
  breakpoints.w = window.innerWidth;
  breakpoints.h = window.innerHeight;
  breakpoints.viewport = getBreakpoint(window.innerWidth);
  breakpoints.mobile = !(
    breakpoints.viewport === "lg" ||
    breakpoints.viewport === "xl" ||
    breakpoints.viewport === "xxl" ||
    breakpoints.viewport === "xxxl"
  );
};

const useBreakpoint = () => {
  onMounted(() => {
    setBreakpoint();
    window.addEventListener("resize", () => {
      setBreakpoint();
    });
  });

  return {
    breakpoints,
  };
};

export default useBreakpoint;
