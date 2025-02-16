import dashboards from "~/server/mocks/dashboards/dashboards";

export default async (dashboardId?: number) => {
  const queryParams = [
    dashboardId !== undefined ? `dashboardId=${dashboardId}` : "",
  ]
    .filter(Boolean) // Remove empty strings
    .join("&");
  return dashboards;
  // return await useBaseFetch<Array<Dashboard>>(
  //   `/api/dashboards/dashboards${queryParams ? `?${queryParams}` : ""}`
  // );
};
