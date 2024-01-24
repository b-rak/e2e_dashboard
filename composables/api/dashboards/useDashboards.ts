export default async (dashboardId?: number) => {
  const queryParams = [
    dashboardId !== undefined ? `dashboardId=${dashboardId}` : "",
  ]
    .filter(Boolean) // Remove empty strings
    .join("&");

  const url = `/dashboards${queryParams ? `?${queryParams}` : ""}`;
  return await useBaseFetch<Array<Dashboard>>(url);
};
