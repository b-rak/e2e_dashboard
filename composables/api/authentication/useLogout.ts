export default async () => {
  await useBaseFetch<{}>("/api/authentication/logout");
};
