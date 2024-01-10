import { useConfigStore } from "~/stores/configStore";

export default defineNuxtRouteMiddleware((to, from) => {
  const loggedIn = sessionStorage.getItem("userLoggedIn");

  const configStore = useConfigStore();

  if (loggedIn !== "true") {
    return navigateTo("/login", { replace: true });
  } else {
    //TODO: get Token?
    const token = "Rheinbahn";
    let configName = "";
    if (token === "Rheinbahn") {
      configName = "rheinbahn.config.json";
    }

    // Load config file using the store's action
    configStore.loadConfigFile(configName);
    return;
  }
});
