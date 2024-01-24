export default async (identifier: string) =>
  await useBaseFetch<CaseIdentifier>("/cases/" + identifier);
