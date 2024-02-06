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

  const url = `/api/steps/steps${queryParams ? `?${queryParams}` : ""}`;
  return await useBaseFetch<Array<Step>>(url);
};
