export default async (fromDate: string, toDate: string) =>
  //date format: yyyy-mm-ddThh:mm:ss
  await useBaseFetch<Array<PassRate>>(
    "/api/metrics/dashboardPassRate?from=" + fromDate + "&to=" + toDate
  );
