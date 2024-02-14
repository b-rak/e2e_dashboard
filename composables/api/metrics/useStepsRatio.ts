type FetchParameters = {
  caseId?: number;
  limit?: number;
};

export default async ({ caseId, limit }: FetchParameters = {}) => {
  const queryParams = [
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
