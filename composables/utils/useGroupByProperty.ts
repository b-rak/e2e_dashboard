export default (arr: Array<Object>, prop: any) => {
  const grouped = {};

  arr.forEach((obj) => {
    const key = obj[prop];
    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(obj);
  });

  // Convert the grouped object into an array of arrays
  const result = Object.values(grouped);
  return result;
};
