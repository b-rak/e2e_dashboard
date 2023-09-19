export default async (limit: number) =>
  await useBaseFetch<Array<CaseResultAndObject>>(
    "/cases/results?limit=" + limit
  );
