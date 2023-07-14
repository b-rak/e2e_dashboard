export default defineNuxtRouteMiddleware((to, from) => {
  console.log(to);
  console.log(from);
  return;
  if (from.path !== "/login") {
    console.log(from);
    console.log("from");
    return navigateTo("/login");
  }

  //return navigateTo("/dashboard", { replace: true });
});
