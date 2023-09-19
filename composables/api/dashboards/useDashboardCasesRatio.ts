export default async (fromDate: string, toDate: string) =>
  await useBaseFetch<Array<CaseRatios>>(
    "/dashboards/cases/ratios?from=" + fromDate + "&to=" + toDate
  );
