export default async (dashboardId: number, caseId: number) => {
  return await useBaseFetch<CaseResult>(
    "/dashboards/" + dashboardId + "/cases/" + caseId + "/results/latest"
  );
};
