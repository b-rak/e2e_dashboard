export default async (
  dashboardId: number,
  caseId: number,
  fromDate: string,
  toDate: string
) =>
  //date format: yyyy-mm-ddThh:mm:ss
  await useBaseFetch<Object>(
    "/dashboards/" +
      dashboardId +
      "/cases/ratio/" +
      caseId +
      "?from=" +
      fromDate +
      "&to=" +
      toDate
  );
