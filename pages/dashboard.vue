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
            :dashboardId="dashboard.id"
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
            <div class="flex justify-between items-center h-full">
              <Heading-2 titleText="Testfallvergleich" />
              <div class="flex cursor-pointer">
                <div
                  class="px-3 py-1 rounded-l-lg status_bold_12"
                  :class="[
                    togglePassed
                      ? 'status_pass_100 basic_text_white'
                      : 'f_neutral_90 f_text_neutral_500',
                  ]"
                  @click="togglePassed ? '' : (togglePassed = true)"
                >
                  PASSED
                </div>
                <div
                  class="px-3 py-1 rounded-r-lg status_bold_12"
                  :class="[
                    !togglePassed
                      ? 'status_fail_100 basic_text_white'
                      : 'f_neutral_90 f_text_neutral_500',
                  ]"
                  @click="togglePassed ? (togglePassed = false) : ''"
                >
                  FAILED
                </div>
              </div>
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
                :displaySuccessChart="togglePassed"
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
              <div
                v-for="(dashboard, index) of dashboards"
                class="flex items-center gap-6"
              >
                <div class="flex items-center gap-4 f_text_neutral_900 h-6">
                  <GroupIcon
                    :name="useIcon(dashboard.name, dashboard.icon)"
                    :iconWidth="useRem() * 1.5 + ''"
                    :iconHeight="useRem() * 1.5 + ''"
                  />
                  <span class="h3_bold_18 w-[6.25rem] !leading-6">{{
                    dashboard.name
                  }}</span>
                </div>
                <div
                  class="flex items-center justify-center min-w-[10rem] grow"
                  :class="{
                    'h-[9.75rem]': dashboards.length === 1,
                    'h-[4.125rem]': dashboards.length === 2,
                    'h-[2.25rem]': dashboards.length > 2,
                    'min-w-[28.25rem]': !breakpoint.mobile,
                  }"
                >
                  <canvas
                    v-if="trends[index].trend !== 'error'"
                    :id="'successrate-' + dashboard.id"
                    class="border_xsmall"
                  ></canvas>
                  <span v-else class="text_regular_16"
                    >Error loading data...</span
                  >
                </div>
                <div
                  class="flex justify-center items-center gap-2 min-w-[6.75rem]"
                >
                  <font-awesome-icon
                    v-if="
                      trends[index].trend !== 'constant' &&
                      trends[index].trend !== 'error'
                    "
                    :icon="{
                      prefix: 'far',
                      iconName: getTrendIcon(trends[index].trend),
                    }"
                    class="h-[1.5rem] w-[1.5rem] text-[1.5rem]"
                    :class="[
                      getTrendIcon(trends[index].trend) === 'arrow-up'
                        ? 'status_text_pass_100'
                        : 'status_text_fail_100',
                    ]"
                  />
                  <span class="rate_bold_28 uppercase w-full text-right"
                    >{{ trends[index].successRate }}%</span
                  >
                </div>
              </div>
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
console.log("DASHBOARD START");
console.log("DASHBOARD COOKIE", useCookie("accessToken").value);
const dashboards = await useDashboards();

const latestTwoCaseResults = await useTwoLatestCaseResult();
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
const togglePassed = ref(true);
const getTrendIcon = (trend: string) => {
  if (trend === "positive") {
    return "arrow-up";
  } else if (trend === "negative") {
    return "arrow-down";
  }
};

const breakpoint = useBreakpoint().breakpoints;
definePageMeta({
  middleware: ["check-session"],
});

onMounted(() => {
  setTimeout(() => {
    for (const [index, dashboard] of dashboards.entries()) {
      useSuccessRateChart(dashboard.id, lastMonthSuccessRates[index]);
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
outerLoop: for (const dashboard of dashboards) {
  for (const trend of trends) {
    if (dashboard.id === trend.dashboardId) {
      continue outerLoop;
    }
  }
  trends.push({
    dashboardId: -1,
    trend: "error",
    successRate: "-",
  });
}
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
