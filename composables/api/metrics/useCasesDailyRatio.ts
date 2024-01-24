export default async (
  fromDate: string,
  toDate: string,
  dashboardId?: number
) => {
  //date format: yyyy-MM-ddTHH:mm:ss
  const queryParams = [
    dashboardId !== undefined ? `dashboardId=${dashboardId}` : "",
  ]
    .filter(Boolean) // Remove empty strings
    .join("&");

  const url = `/cases-daily-ratios?from=${fromDate}&to=${toDate}${
    queryParams ? `&${queryParams}` : ""
  }`;
  return await useBaseFetch<Array<DailyCaseRatio>>(url);
};
