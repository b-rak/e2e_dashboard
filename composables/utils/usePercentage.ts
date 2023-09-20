export default (fraction: number, total: number) => {
  return Math.round((fraction / total) * 100);
};
