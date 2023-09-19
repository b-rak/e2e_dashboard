export default async (dashboardId: number, fromDate: string, toDate: string) =>
  //date format: yyyy-mm-ddThh:mm:ss
  await useBaseFetch<Array<Statistics>>(
    "/dashboards/" +
      dashboardId +
      "/cases/ratio?from=" +
      fromDate +
      "&to=" +
      toDate
  );
