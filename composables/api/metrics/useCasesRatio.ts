export default async (
  fromDate: string,
  toDate: string,
  dashboardId?: number,
  caseId?: number
) => {
  //date format: yyyy-MM-ddTHH:mm:ss
  const queryParams = [
    dashboardId !== undefined ? `dashboardId=${dashboardId}` : "",
    caseId !== undefined ? `caseId=${caseId}` : "",
  ]
    .filter(Boolean) // Remove empty strings
    .join("&");

  const url = `/cases-ratios?from=${fromDate}&to=${toDate}${
    queryParams ? `&${queryParams}` : ""
  }`;
  return await useSecureBaseFetch<Array<CaseRatio>>(url);
};
