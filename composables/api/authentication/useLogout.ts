export default async () => {
  await useBaseFetch<{}>("/api/v1/auth/logout");
};
