export default async (dashboardId: number, caseId: number, stepId: number) =>
  await useBaseFetch<StepResult>(
    "/dashboards/" +
      dashboardId +
      "/cases/" +
      caseId +
      "/steps/" +
      stepId +
      "/results/latest"
  );
