import caseResults from "~/server/mocks/caseResult/caseResults";

type FetchParameters = {
  dashboardId?: number;
  caseId?: number;
  resultId?: number;
  page?: number;
  size?: number;
  sort?: string;
};

export default async ({
  dashboardId,
  caseId,
  resultId,
  page,
  size,
  sort,
}: FetchParameters = {}) => {
  const queryParams = [
    dashboardId !== undefined ? `dashboardId=${dashboardId}` : "",
    caseId !== undefined ? `caseId=${caseId}` : "",
    resultId !== undefined ? `resultId=${resultId}` : "",
    page !== undefined ? `page=${page}` : "page=0",
    size !== undefined ? `size=${size}` : "size=20",
    sort !== undefined ? `sort=${encodeURIComponent(sort)}` : "",
  ]
    .filter(Boolean) // Remove empty strings
    .join("&");

  const url = `/api/caseResult/caseresults${
    queryParams ? `?${queryParams}` : ""
  }`;
  return caseResults;
  // return await useBaseFetch<Array<CaseResult>>(url);
};
