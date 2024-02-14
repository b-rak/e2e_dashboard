<template>
  <div>
    <!-- Übersicht oben -->
    <div
      id="overview"
      class="f_neutral_80 w-full border_medium flex flex-col items-center py-8"
      :class="[
        { 'h-[13.25rem]': breakpoint.viewport === 'md' },
        {
          'h-[14.5rem]':
            breakpoint.viewport === 'lg' ||
            breakpoint.viewport === 'xl' ||
            breakpoint.viewport === 'xxl' ||
            breakpoint.viewport === 'xxxl',
        },
      ]"
    >
      <!--Top Row -->
      <div
        id="top-row"
        class="flex items-start w-full px-6"
        :class="[
          breakpoint.viewport === 'xs' || breakpoint.viewport === 'sm'
            ? 'flex-col gap-y-4'
            : 'justify-between',
        ]"
      >
        <CustomerHeader
          :customerName="configStoreData.mainName"
          pageTitle="Testfälle"
          :imagePath="configStoreData.logo"
        />
        <div
          id="filter-export"
          class="h-14 flex items-center"
          :class="[
            breakpoint.viewport === 'xs' || breakpoint.viewport === 'sm'
              ? 'w-full justify-between'
              : 'gap-8',
          ]"
        >
          <ClientOnly>
            <DateRangePicker />
            <ExportButton buttonText="Export CSV" />
          </ClientOnly>
        </div>
      </div>
      <!-- Bottom Row -->
      <div
        id="bottom-row"
        class="flex items-center w-full mt-6 min-[500px]:justify-center"
        :class="[
          breakpoint.viewport === 'xs' || breakpoint.viewport === 'sm'
            ? 'gap-x-2 px-6 pb-2 overflow-x-scroll overflow-y-hidden scroll-px-6'
            : 'gap-x-8 px-[8.5rem]',
        ]"
      >
        <GesamtKachel
          @select-all="selectAll"
          :displayAll="displayAll"
          positionHeading="center"
          :latestTwoCaseResults="latestTwoCaseResults"
          class="hover:scale-[1.05]"
        />
        <OSKachel
          v-for="config in configs"
          :key="config.id"
          :config="config"
          :latestTwoCaseResults="
            latestTwoCaseResults.filter(
              (caseResult) => caseResult.environment === config.dashboardId + ''
            )
          "
          @update:display="updateDisplay"
          :selected="config.selected.value"
        />
      </div>
    </div>
    <!-- Testfall Übersicht nach OS -->
    <div
      class="flex flex-col gap-y-9"
      :class="[
        breakpoint.viewport === 'xs' || breakpoint.viewport === 'sm'
          ? 'mt-8'
          : 'mt-32',
      ]"
    >
      <template v-for="config in configs" :key="config">
        <OSTestcases
          v-if="config.selected.value || displayAll"
          :name="config.os_name"
          :iconName="config.iconName"
          :dashboardId="config.dashboardId"
          :results="(sortedResults.find(sortedResult => sortedResult.dashId === config.dashboardId)?.cases as any)"
          @go-to:details="navigate"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
const breakpoint = useBreakpoint().breakpoints;

const configStoreData = useConfigStore().configData as ConfigData;

type DashboardConfig = {
  id: number;
  dashboardId: number;
  iconName: string;
  os_name: string;
  numberOfCases: number;
  selected: Ref<boolean>;
};
const configs: DashboardConfig[] = [];
for (let [index, value] of configStoreData.dashboards.entries()) {
  configs.push({
    id: index + 1,
    dashboardId: value.id,
    iconName: useIcon(value.name, value.icon),
    os_name: value.name,
    numberOfCases: value.numberOfCases,
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

// results for bar charts
const results = await useStepsRatio({
  limit: 50,
});

const sortedResults: sortedCasePassRate[] = [];
// sort results for
for (let dashboard of configStoreData.dashboards) {
  const caseIds = (
    useDashboardCasesStore().dashboardCasesData as staticDashboardCases
  ).cases
    .find((cases) => cases.groupId === dashboard.id)
    ?.caseList.map((testcase) => testcase.id);
  const caseArr = [];
  for (const result of results) {
    if (caseIds?.includes(result.caseId)) {
      caseArr.push(result);
    }
  }
  sortedResults.push({ dashId: dashboard.id, cases: caseArr });
}

const latestTwoCaseResults = sortedResults.flatMap((obj) => {
  return obj.cases.flatMap((caseResults) => {
    return caseResults.results.slice(0, 2).map((caseResult, index) => {
      return {
        caseId: caseResult.caseId,
        environment: caseResult.environment,
        result: useResultStatus(caseResult),
        row_num: index + 1,
      };
    });
  });
});

const navigate = (obj: any) => {
  navigateTo(("/testfaelle/" + obj.dashboardId + "/" + obj.caseId) as string);
};

definePageMeta({
  middleware: ["auth"],
});
</script>
