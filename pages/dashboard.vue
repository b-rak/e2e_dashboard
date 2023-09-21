<template>
  <div class="flex flex-col gap-6">
    <div
      class="mt-10 px-6 py-8 border_medium f_neutral_80 flex justify-between"
    >
      <CustomerHeader
        customerName="Appmatics"
        pageTitle="E2E Dashboard"
        imagePath="./img/logo.png"
      />
      <ExportButton buttonText="Export as JPG" />
    </div>
    <div class="flex gap-6">
      <!-- OS Übersicht -->
      <div
        class="p-6 border_medium f_neutral_80 min-h-[45rem] h-fit w-[16.5rem] flex flex-col gap-6 grow"
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
                <DevicesIcon />
              </div>
              <span class="h3_bold_18">Gesamt</span>
            </div>
            <SuccessRate
              :selected="false"
              :dashboardId="-1"
              :ratios="dashboardsRatio"
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

      <!-- Charts: Vergleich und Quote -->
      <div class="flex flex-col gap-6 grow-[10]">
        <div
          class="p-6 border_medium f_neutral_80 min-w-[51.75rem] min-h-[25.25rem] flex flex-col gap-6"
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
          <div class="flex flex-wrap items-start gap-3">
            <PolarAreaChart
              v-for="(dashboard, index) of dashboards"
              :displaySuccessChart="togglePassed"
              :numberOfChart="index + 1"
              :dashboard="dashboard"
              :ratios="dashboardCaseRatios[index]"
              :class="[index === 0 || index === 1 ? 'grow' : '']"
            />
          </div>
        </div>
        <div
          class="p-6 border_medium f_neutral_80 w-[51.75rem] flex flex-col gap-6 min-h-[18.25rem] grow"
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
              class="flex items-center gap-6 h-full"
            >
              <div class="flex items-center gap-4 f_text_neutral_900 h-6">
                <GroupIcon
                  :name="useIcon(dashboard.name, dashboard.icon)"
                  iconWidth="1.5rem"
                  iconHeight="1.5rem"
                />
                <span class="h3_bold_18 w-[4rem]">{{ dashboard.name }}</span>
              </div>
              <div class="relative h-9 w-full">
                <canvas :id="'successrate-' + dashboard.id"></canvas>
              </div>
              <div
                class="flex justify-center items-center gap-2 min-w-[6.75rem]"
              >
                <font-awesome-icon
                  v-if="trends[index].trend !== 'constant'"
                  :icon="{
                    prefix: 'far',
                    iconName:
                      trends[index].trend === 'positive'
                        ? 'arrow-up'
                        : 'arrow-down',
                  }"
                  class="h-[1.5rem] w-[1.5rem] text-[1.5rem]"
                  :class="[
                    trends[index].trend === 'positive'
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
        class="p-6 border_medium f_neutral_80 w-[33.75rem] flex flex-col grow-[5] gap-6 h-[45rem]"
      >
        <Heading-2 titleText="Ticker" />
        <div class="overflow-y-scroll grow">
          <div
            class="basic_white border_small px-4 py-3 flex flex-col items-start gap-3 min-w-[28.75rem] max-w-[46.75rem] mr-6"
          >
            <TickerResult
              v-for="(result, index) of latestCaseResult"
              :key="index"
              :result="result"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const dashboards = await useDashboards();
const dashboardsRatio = await useDashboardsRatio();
const latestCaseResult = await useCasesResults(20);
const currentDate = new Date();
const thirtyDaysAgo = new Date();
thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
const currentDateString = useDate(currentDate);
const thirtyDaysAgoString = useDate(thirtyDaysAgo);
const dashboardCaseRatios = await useDashboardCasesRatio(
  thirtyDaysAgoString,
  currentDateString
);
const lastMonthSuccessRates = await useDashboardsPassRate(
  thirtyDaysAgoString,
  currentDateString
);
const togglePassed = ref(true);
definePageMeta({
  middleware: ["auth"],
});
onMounted(() => {
  setTimeout(() => {
    for (const [index, dashboard] of dashboards.entries()) {
      useSuccessRateChart(dashboard.id, lastMonthSuccessRates[index]);
    }
  }, 1);
});

let trends = [];
for (const lastMonthSuccessRate of lastMonthSuccessRates) {
  let dashboardRates = lastMonthSuccessRate.ratios;
  let trend: string;
  if (
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
    trend: trend,
    successRate: usePercentage(dashboardRates[0].ratio, 1),
  });
}
</script>

<style scoped>
::-webkit-scrollbar {
  width: 7px;
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
</style>
