import { useDetailsStore } from "~/stores/details";

export default defineNuxtRouteMiddleware((to, from) => {
  console.log(from);
  console.log(to);
  // isAuthenticated() is an example method verifying if a user is authenticated
  if (!to.path.includes("Testcase")) {
    throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
  }
});
