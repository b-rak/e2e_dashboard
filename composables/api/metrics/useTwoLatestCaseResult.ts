export default async () =>
  await useBaseFetch<Array<LatestCaseResult>>("/two-latest-case-result");
