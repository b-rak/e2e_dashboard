export default async (
  dashboardId: number,
  caseId: number,
  stepId: number,
  limit: number,
  offset: number
) =>
  await useBaseFetch<Array<StepResult>>(
    "/dashboards/" +
      dashboardId +
      "/cases/" +
      caseId +
      "/steps/" +
      stepId +
      "/results?limit=" +
      limit +
      "&offset=" +
      offset
  );
