<template>
  <NuxtLayout name="default">
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
const configStore = useConfigStore();
const dashboardCasesStore = useDashboardCasesStore();

const user = await useUser();
if (user) {
  const token = user.project;
  let configName = "";
  if (token === "DEMO") {
    configName = "appmaticsdemo.config.json";
  }

  await configStore.loadConfigFile(configName);
  await dashboardCasesStore.getDashboardCases(configName);
} else {
  navigateTo("/login");
}
</script>
