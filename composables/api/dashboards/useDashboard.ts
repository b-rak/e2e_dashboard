export default async (dashboardId: number) =>
  await useBaseFetch<Dashboard>("/dashboards/" + dashboardId);
