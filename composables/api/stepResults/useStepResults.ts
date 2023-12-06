type FetchParameters = {
  dashboardId?: number;
  caseId?: number;
  stepId?: number;
  stepResultId?: number;
  page?: number;
  size?: number;
  sort?: string;
};

export default async ({
  dashboardId,
  caseId,
  stepId,
  stepResultId,
  page,
  size,
  sort,
}: FetchParameters = {}) => {
  const queryParams = [
    dashboardId !== undefined ? `dashboardId=${dashboardId}` : "",
    caseId !== undefined ? `caseId=${caseId}` : "",
    stepId !== undefined ? `stepId=${stepId}` : "",
    stepResultId !== undefined ? `stepResultId=${stepResultId}` : "",
    page !== undefined ? `page=${page}` : "",
    size !== undefined ? `size=${size}` : "",
    sort !== undefined ? `sort=${encodeURIComponent(sort)}` : "",
  ]
    .filter(Boolean) // Remove empty strings
    .join("&");

  const url = `/stepresults${queryParams ? `?${queryParams}` : ""}`;
  return await useBaseFetch<Array<StepResult>>(url);
};
