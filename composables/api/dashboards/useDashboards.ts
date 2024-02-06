export default async (dashboardId?: number) => {
  const queryParams = [
    dashboardId !== undefined ? `dashboardId=${dashboardId}` : "",
  ]
    .filter(Boolean) // Remove empty strings
    .join("&");
  return await useBaseFetch<Array<Dashboard>>(
    `/api/dashboards/dashboards${queryParams ? `?${queryParams}` : ""}`
  );
};
