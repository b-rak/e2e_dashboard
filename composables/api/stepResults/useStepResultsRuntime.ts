export default async (
  dashboardId: number,
  caseId: number,
  stepId: number,
  limit: number
) =>
  await useBaseFetch<Array<Runtime>>(
    "/dashboards/" +
      dashboardId +
      "/cases/" +
      caseId +
      "/steps/" +
      stepId +
      "/results/runtime?limit=" +
      limit
  );
