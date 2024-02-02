export default async (fromDate: string, toDate: string) =>
  //date format: yyyy-mm-ddThh:mm:ss
  await useSecureBaseFetch<Array<PassRate>>(
    "/dashboard-pass-rate?from=" + fromDate + "&to=" + toDate
  );
