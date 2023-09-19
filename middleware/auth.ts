export default defineNuxtRouteMiddleware((to, from) => {
  const loggedIn = sessionStorage.getItem("userLoggedIn");

  if (loggedIn !== "true") {
    return navigateTo("/login", { replace: true });
  } else {
    return;
  }
});
