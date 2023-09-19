export default async (dashboardId: number, caseId: number, limit?: number) =>
  useBaseFetch<Array<Statistics>>(
    "/dashboards/" +
      dashboardId +
      "/cases/" +
      caseId +
      "/steps/ratio" +
      "?limit=" +
      limit
  );
