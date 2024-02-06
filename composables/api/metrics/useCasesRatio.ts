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

  const url = `/api/metrics/casesRatio?from=${fromDate}&to=${toDate}${
    queryParams ? `&${queryParams}` : ""
  }`;
  return await useBaseFetch<Array<CaseRatio>>(url);
};
