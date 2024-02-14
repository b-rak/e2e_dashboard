<template>
  <div class="flex flex-col gap-6">
    <div
      class="px-6 py-8 border_medium f_neutral_80 flex"
      :class="[
        breakpoint.viewport === 'xs' || breakpoint.viewport === 'sm'
          ? 'flex-col gap-y-4'
          : 'justify-between',
      ]"
    >
      <CustomerHeader
        :customerName="configStoreData.mainName"
        pageTitle="E2E Dashboard"
        :imagePath="configStoreData.logo"
      />
      <ExportButton buttonText="Export as JPG" class="ml-auto" />
    </div>
    <div class="flex flex-col md:flex-row gap-6 w-full">
      <!-- OS Übersicht -->
      <div
        class="p-6 border_medium f_neutral_80 md:min-h-[45rem] h-fit flex flex-col gap-6 top-24 md:sticky"
        :class="{ 'w-[16.5rem]': !breakpoint.mobile }"
      >
        <Heading-2 titleText="Testfallvergleich" class="h-10" />
        <div class="flex flex-col gap-8">
          <div
            class="px-3 pt-3 pb-3 border_small shadow_light_2 basic_white flex flex-col items-center justify-start gap-4"
          >
            <div
              class="w-[8.5rem] h-8 flex gap-4 items-center justify-start f_text_neutral_900"
            >
              <div class="h-6 flex justify-center items-center">
                <DevicesIcon
                  :width="useRem() * 1.5 + ''"
                  :height="useRem() * 1.5 + ''"
                />
              </div>
              <span class="h3_bold_18">Gesamt</span>
            </div>
            <SuccessRate
              :selected="false"
              :dashboardId="-1"
              :latestTwoCaseResults="latestTwoCaseResults"
            />
          </div>
          <!--GesamtKachel class="min-w-[13.5rem]" positionHeading="start" /-->
          <OSPerformance
            v-for="dashboard of dashboards"
            :osName="dashboard.name"
            :iconName="useIcon(dashboard.name, dashboard.icon)"
            :results="
              latestCaseResults.filter(
                (caseResult) => caseResult.environment === dashboard.id + ''
              )
            "
          />
        </div>
      </div>

      <div
        class="flex flex-col sm:grid min-[1920px]:grid-cols-[59.45%_auto] gap-6 w-full"
      >
        <!-- Charts: Vergleich und Quote -->
        <div
          class="flex flex-col gap-6 overflow-hidden"
          :class="{
            'min-w-[51.75rem]':
              !breakpoint.mobile && breakpoint.viewport !== 'lg',
          }"
        >
          <div
            class="p-6 border_medium f_neutral_80 min-h-[25.25rem] flex flex-col gap-6"
            :class="{
              'h-[45rem]': dashboards.length > 3,
              'min-w-[51.75rem]': !breakpoint.mobile,
            }"
          >
            <div
              class="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center sm:gap-0 h-full"
            >
              <Heading-2 titleText="Testfallvergleich" />
              <ResultSwitch
                @select-status="(selection) => (selectedStatus = selection)"
              />
            </div>
            <div
              class="grid gap-3"
              :class="{
                'grid-cols-1': dashboards.length === 1 || breakpoint.mobile,
                'grid-cols-2': dashboards.length === 2 && !breakpoint.mobile,
                'grid-cols-3': dashboards.length > 2 && !breakpoint.mobile,
              }"
            >
              <PolarAreaChart
                v-for="(dashboard, index) of dashboards"
                :displayStatus="selectedStatus"
                :numberOfChart="index + 1"
                :dashboard="dashboard"
                :ratios="dashboardCaseRatios[index]"
                :class="[index === 0 || index === 1 ? '' : '', ,]"
              />
            </div>
          </div>
          <div
            class="p-6 border_medium f_neutral_80 sm:flex flex-col gap-6 min-h-[18.25rem] hidden"
          >
            <Heading-2
              titleText="Zeitlicher Verlauf der Erfolgsquote"
              class="py-1"
            />
            <div
              class="p-3 flex flex-col gap-6 border_small basic_white min-h-[11.25rem]"
            >
              <SuccessRateChart
                v-for="dashboard of dashboards"
                :numberOfDashboards="dashboards.length"
                :dashboard="dashboard"
                :trend="findTrend(dashboard.id)"
              />
            </div>
          </div>
        </div>

        <!-- Ticker -->
        <div
          class="p-6 border_medium f_neutral_80 flex flex-col gap-6 h-[45rem]"
          :class="{ 'min-w-[33.75rem]': !breakpoint.mobile }"
        >
          <Heading-2 titleText="Ticker" />
          <div class="overflow-y-scroll grow">
            <div
              class="basic_white border_small px-4 py-3 flex flex-col items-start gap-3 overflow-hidden mr-6"
            >
              <TickerResult
                v-for="(result, index) of latestCaseResult"
                :key="index"
                :result="result"
                :dashboards="dashboards"
                class="flex-grow"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const configStoreData = useConfigStore().configData as ConfigData;
const dashboardCasesData = useDashboardCasesStore()
  .dashboardCasesData as staticDashboardCases;
const dashboards = dashboardCasesData.dashboards;

const latestCaseResult = await useCasesResults({ sort: "createdDate,desc" });
const currentDate = new Date();
const thirtyDaysAgo = new Date();
thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
const currentDateString = useDate(currentDate);
const thirtyDaysAgoString = useDate(thirtyDaysAgo);
const dashboardCaseRatios = useGroupByProperty(
  await useCasesRatio(thirtyDaysAgoString, currentDateString),
  "dashboardId"
) as Array<Array<CaseRatio>>;

const lastMonthSuccessRates = await useDashboardPassRate(
  thirtyDaysAgoString,
  currentDateString
);

const selectedStatus = ref("PASSED"); // initial state for PolarAreaChart

const breakpoint = useBreakpoint().breakpoints;
definePageMeta({
  middleware: ["auth"],
});

onMounted(() => {
  setTimeout(() => {
    for (const lastMonthSuccessRate of lastMonthSuccessRates) {
      useSuccessRateChart(
        lastMonthSuccessRate.dashboardId,
        lastMonthSuccessRate
      );
    }
  }, 1);
});

let trends: Array<{
  dashboardId: number;
  trend: string;
  successRate: number | string;
}> = [];
for (const lastMonthSuccessRate of lastMonthSuccessRates) {
  let dashboardRates = lastMonthSuccessRate.ratios;
  let trend: string;

  if (dashboardRates.length === 1) {
    trend = "constant";
  } else if (
    usePercentage(dashboardRates[0].ratio, 1) >
    usePercentage(dashboardRates[1].ratio, 1)
  ) {
    trend = "positive";
  } else if (
    usePercentage(dashboardRates[0].ratio, 1) <
    usePercentage(dashboardRates[1].ratio, 1)
  ) {
    trend = "negative";
  } else {
    trend = "constant";
  }
  trends.push({
    dashboardId: lastMonthSuccessRate.dashboardId,
    trend: trend,
    successRate: usePercentage(dashboardRates[0].ratio, 1),
  });
}

const findTrend = (dashboardId: number) => {
  let trend = trends.find((trend) => trend.dashboardId === dashboardId);
  if (trend) return trend;
  else
    return {
      dashboardId: -1,
      trend: "error",
      successRate: "-",
    };
};
// results for bar charts
const results = await useStepsRatio({
  limit: 2,
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

const latestCaseResults = latestTwoCaseResults.filter(
  (caseResult) => caseResult.row_num === 1
);
</script>

<style scoped>
::-webkit-scrollbar {
  width: 0.4375rem;
  background-color: rgba(0, 0, 0, 0);
  -webkit-appearance: none;
}

::-webkit-scrollbar-thumb {
  background-color: #fcfcfc;
  border-radius: 0.75rem;
}

::-webkit-scrollbar-track {
  background-color: #cbd0d4;
  border-radius: 0.75rem;
}

/* For Firefox and other browsers that support the standard */
::-webkit-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #fcfcfc #cbd0d4 !important;
}
</style>
