export default async (dashboardId: number) => {
  return await useBaseFetch<Array<CaseResult>>(
    "/dashboards/" + dashboardId + "/cases/results/latest"
  );
};
