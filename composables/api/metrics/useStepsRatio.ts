type FetchParameters = {
  dashboardId?: number;
  caseId?: number;
  limit?: number;
};

export default async ({ dashboardId, caseId, limit }: FetchParameters = {}) => {
  const queryParams = [
    dashboardId !== undefined ? `dashboardId=${dashboardId}` : "",
    caseId !== undefined ? `caseId=${caseId}` : "",
    limit !== undefined ? `limit=${limit}` : "limit=5",
  ]
    .filter(Boolean) // Remove empty strings
    .join("&");

  const url = `/api/metrics/stepsRatio${queryParams ? `?${queryParams}` : ""}`;
  return await useBaseFetch<
    Array<{ caseId: number; results: Array<CasePassRate> }>
  >(url);
};
