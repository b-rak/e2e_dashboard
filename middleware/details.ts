export default defineNuxtRouteMiddleware(async (to, from) => {
  const dashboards = [];
  for (const dashboard of await useDashboards()) {
    dashboards.push(dashboard.id);
  }
  if (!to.path) {
    throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
  }
});
