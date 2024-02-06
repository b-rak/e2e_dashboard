export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = await useFetch("/api/user", {
    headers: useRequestHeaders(["cookie"]),
  });
  console.log("AUTH MIDDLEWARE USER", user.data.value);
  if (!user.data.value) return navigateTo(`/login`);
  return;
});
