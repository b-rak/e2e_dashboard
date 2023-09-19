export default async (dashboardId: number, caseId: number, stepId: number) =>
  useBaseFetch<Step>(
    "/dashboards/" + dashboardId + "/cases/" + caseId + "/steps/" + stepId
  );
