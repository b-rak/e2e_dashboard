export default async (dashboardId?: number, caseId?: number) => {
  const queryParams = [
    dashboardId !== undefined ? `dashboardId=${dashboardId}` : "",
    caseId !== undefined ? `caseId=${caseId}` : "",
  ]
    .filter(Boolean) // Remove empty strings
    .join("&");

  const url = `/latest-case-results${queryParams ? `?${queryParams}` : ""}`;
  return await useSecureBaseFetch<Array<CaseResult>>(url);
};
