export default async (dashboardId: number) => {
  return await useBaseFetch<Array<Case>>(
    "/dashboards/" + dashboardId + "/cases"
  );
};
