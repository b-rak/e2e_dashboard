export default async (
  dashboardId: number,
  caseId: number,
  limit: number,
  offset: number
) =>
  await useBaseFetch<Array<CaseResult>>(
    "/dashboards/" +
      dashboardId +
      "/cases/" +
      caseId +
      "/results?limit=" +
      limit +
      "&offest=" +
      offset
  );
