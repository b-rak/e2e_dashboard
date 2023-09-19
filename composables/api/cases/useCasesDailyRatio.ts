export default async (dashboardId: number, fromDate: string, toDate: string) =>
  //date format: yyyy-mm-ddThh:mm:ss
  await useBaseFetch<Array<DailyCaseRatio>>(
    "/dashboards/" +
      dashboardId +
      "/cases/daily-ratio?from=" +
      fromDate +
      "&to=" +
      toDate
  );
