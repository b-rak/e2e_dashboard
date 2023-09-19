export default async (
  dashboardId: number,
  caseId: number,
  stepId: number,
  stepResultId: number
) =>
  await useBaseFetch<StepResult>(
    "/dashboards/" +
      dashboardId +
      "/cases/" +
      caseId +
      "/steps/" +
      stepId +
      "/results/" +
      stepResultId
  );
