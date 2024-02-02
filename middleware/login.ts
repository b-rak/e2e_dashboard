export default defineNuxtRouteMiddleware(async () => {
  if (localStorage.getItem("loggedIn") === "true") {
    return navigateTo("/dashboard");
  }
  return;
});
