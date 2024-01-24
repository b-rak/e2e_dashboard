export default (dateString: string) => {
  //dateString has format yyyy-MM-ddTHH:mm:ss
  const date = dateString.split("T")[0];
  const time =
    dateString.split("T")[1].length > 8
      ? dateString.split("T")[1].substring(0, 8)
      : dateString.split("T")[1];

  // Extract date components
  const day = date.split("-")[2];
  const month = date.split("-")[1];
  const year = date.split("-")[0];

  return {
    date: `${day}.${month}.${year}`,
    time: time,
  };
};
