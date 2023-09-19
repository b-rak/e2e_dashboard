export default async (dashboardId: number, caseId: number) =>
  await useBaseFetch<Array<StepResult>>(
    "/dashboards/" + dashboardId + "/cases/" + caseId + "/steps/results/latest"
  );
