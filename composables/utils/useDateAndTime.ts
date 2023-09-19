export default (dateString: string) => {
  const dateTime = new Date(dateString);

  // Extract date components
  const day = dateTime.getDate().toString().padStart(2, "0");
  const month = (dateTime.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-based
  const year = dateTime.getFullYear();

  // Extract time components
  const hours = dateTime.getHours().toString().padStart(2, "0");
  const minutes = dateTime.getMinutes().toString().padStart(2, "0");
  const seconds = dateTime.getSeconds().toString().padStart(2, "0");

  return {
    date: `${day}.${month}.${year}`,
    time: `${hours}:${minutes}:${seconds}`,
  };
};
