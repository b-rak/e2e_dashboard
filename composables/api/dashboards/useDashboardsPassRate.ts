export default async (fromDate: string, toDate: string) =>
  //date format: yyyy-mm-dd
  await useBaseFetch<Array<PassRate>>(
    "/dashboards/pass-rate?from=" + fromDate + "&to=" + toDate
  );
