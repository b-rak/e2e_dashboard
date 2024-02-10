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
  if (token === "ALL") {
    configName = "rheinbahn.config.json";
  } else if (token === "AVV") {
    configName = "avv.config.json";
  } else if (token === "BVG") {
    configName = "bvg.config.json";
  } else if (token === "DEMO") {
    configName = "appmaticsdemo.config.json";
  } else if (token === "KVB") {
    configName = "kvb.config.json";
  } else if (token === "MIGROS") {
    configName = "migros.config.json";
  } else if (token === "RHEINBAHN") {
    configName = "rheinbahn.config.json";
  } else if (token === "RMV") {
    configName = "rmv.config.json";
  } else if (token === "SCHAFERSHOP") {
    configName = "schaefershop.config.json";
  }

  await configStore.loadConfigFile(configName);
  await dashboardCasesStore.getDashboardCases(configName);
} else {
  navigateTo("/login");
}
</script>
