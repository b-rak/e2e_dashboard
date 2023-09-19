export default async (dashboardId: number, caseId: number, resultId: number) =>
  await useBaseFetch<CaseResult>(
    "/dashboards/" + dashboardId + "/cases/" + caseId + "/results/" + resultId
  );
