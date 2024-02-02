export default async () =>
  await useSecureBaseFetch<Array<LatestCaseResult>>("/two-latest-case-result");
