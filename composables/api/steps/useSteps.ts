export default async (
  dashboardId?: number,
  caseId?: number,
  stepId?: number
) => {
  const queryParams = [
    dashboardId !== undefined ? `dashboardId=${dashboardId}` : "",
    caseId !== undefined ? `caseId=${caseId}` : "",
    stepId !== undefined ? `stepId=${stepId}` : "",
  ]
    .filter(Boolean) // Remove empty strings
    .join("&");

  const url = `/steps${queryParams ? `?${queryParams}` : ""}`;
  return await useSecureBaseFetch<Array<Step>>(url);
};
