export default (fraction: number, total: number) => {
  return Number((fraction / total).toFixed(2)) * 100;
};
