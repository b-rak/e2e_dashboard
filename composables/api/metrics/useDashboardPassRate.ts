export default async (fromDate: string, toDate: string) =>
  //date format: yyyy-mm-ddThh:mm:ss
  await useBaseFetch<Array<PassRate>>(
    "/dashboard-pass-rate?from=" + fromDate + "&to=" + toDate
  );
