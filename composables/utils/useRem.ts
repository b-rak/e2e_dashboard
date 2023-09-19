// function to get rem value to calculate chart values
// this function is needed since chartjs only supports px values
export default () => {
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
