export default (date: Date) => {
  // Extract date components
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-based
  const year = date.getFullYear();

  return `${year}-${month}-${day}T00:00:00`;
};
