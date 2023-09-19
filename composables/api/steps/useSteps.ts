export default async (dashboardId: number, caseId: number) =>
  useBaseFetch<Array<Step>>(
    "/dashboards/" + dashboardId + "/cases/" + caseId + "/steps"
  );
