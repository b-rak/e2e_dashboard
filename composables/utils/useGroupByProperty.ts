type GroupedArray<T> = { [key: string]: T[] };

export default <T>(arr: T[], prop: keyof T): T[][] => {
  const grouped: GroupedArray<T> = {};

  arr.forEach((obj) => {
    const key = obj[prop] as string;
    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(obj);
  });

  // Convert the grouped object into an array of arrays
  const result = Object.values(grouped);
  return result;
};
