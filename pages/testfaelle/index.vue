<template>
  <div class="pt-8">
    <!-- Übersicht oben -->
    <div
      id="overview"
      class="f_neutral_80 h-[14.5rem] w-full border_medium flex flex-col items-center py-9"
    >
      <!--Top Row -->
      <div
        id="top-row"
        class="flex flex-row justify-between items-start p-0 w-full px-6"
      >
        <CustomerHeader
          customerName="Appmatics"
          pageTitle="Testfälle"
          imagePath="./img/logo.png"
        />
        <div id="filter-export" class="h-14 w-auto flex items-center gap-8">
          <ClientOnly>
            <DateRangePicker />
            <ExportButton buttonText="Export CSV" />
          </ClientOnly>
        </div>
      </div>
      <!-- Bottom Row -->
      <div
        id="bottom-row"
        class="flex flex-row justify-center gap-x-[33px] items-center w-full mt-6 px-[138px]"
      >
        <GesamtKachel
          @select-all="selectAll"
          :displayAll="displayAll"
          positionHeading="center"
          :ratios="dashboardsRatio"
          class="hover:scale-[1.05]"
        />
        <OS-Kachel
          v-for="config in configs"
          :key="config"
          :config="config"
          :ratios="dashboardsRatio"
          @update:display="updateDisplay"
          :selected="config.selected.value"
        />
      </div>
    </div>
    <!-- Testfall Übersicht nach OS -->
    <div class="flex flex-col gap-y-9 mt-36">
      <template v-for="config in configs" :key="config">
        <OS-Testcases
          v-if="config.selected.value || displayAll"
          :name="config.os_name"
          :iconName="config.iconName"
          :dashboardId="config.dashboardId"
          @go-to:details="navigate"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
const dashboardData = await useDashboards();
const dashboardsRatio = await useDashboardsRatio();

const configs: object[] = [];
for (let [index, value] of dashboardData.entries()) {
  configs.push({
    id: index + 1,
    dashboardId: value.id,
    iconName: useIcon(value.name, value.icon),
    os_name: value.name,
    numberOfCases: (await useCases(value.id)).length,
    selected: ref(false),
  });
}

const updateDisplay = (obj: object) => {
  if ("selected" in obj && "id" in obj) {
    let index = obj.id as number;
    configs[index - 1].selected.value = obj["selected"] as boolean;
    updateGesamt();
  }
};

const allConfigsSelected = () => {
  for (const config of configs) {
    if (config.selected.value === false) {
      return false;
    }
  }
  return true;
};

const allConfigsDeselected = () => {
  for (const config of configs) {
    if (config.selected.value === true) {
      return false;
    }
  }
  return true;
};

const displayAll = ref(true);
const updateGesamt = () => {
  if (allConfigsSelected()) {
    displayAll.value = true;
    for (const config of configs) {
      config.selected.value = false;
    }
  } else if (allConfigsDeselected()) {
    displayAll.value = true;
  } else {
    displayAll.value = false;
  }
};

const selectAll = () => {
  if (displayAll.value === false) {
    displayAll.value = true;
    for (const config of configs) {
      config.selected.value = false;
    }
  }
};

const navigate = (obj: any) => {
  navigateTo(("/testfaelle/" + obj.dashboardId + "/" + obj.caseId) as string);
};

definePageMeta({
  middleware: ["auth"],
});
</script>
