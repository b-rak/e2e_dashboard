export default async () =>
  await useBaseFetch<Array<LatestCaseResult>>(
    "/api/metrics/twoLatestCaseResult"
  );
