export default async (dashboardId: number, caseId: number) =>
  await useBaseFetch<Case>("/dashboards/" + dashboardId + "/cases/" + caseId);
