import { getLatestStepResults } from "~/server/mocks/metrics/latestStepResults";

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

  const url = `/api/metrics/latestStepResults${
    queryParams ? `?${queryParams}` : ""
  }`;
  return getLatestStepResults(Number(dashboardId), Number(caseId), stepId);
  // return await useBaseFetch<Array<StepResult>>(url);
};
