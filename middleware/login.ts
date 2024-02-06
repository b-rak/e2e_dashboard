export default defineNuxtRouteMiddleware(async () => {
  const user = await useFetch("/api/user", {
    headers: useRequestHeaders(["cookie"]),
  });

  if (user.data.value) return navigateTo("/dashboard");
  return;
});
