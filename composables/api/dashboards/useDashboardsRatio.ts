export default async () =>
  await useBaseFetch<Array<DashboardRatio>>("/dashboards/ratio");
