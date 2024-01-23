<template>
  <div class="flex flex-col gap-8 pt-9 pb-[7.5rem] bg_light">
    <!-- 1. Breadcrumb -->
    <div
      class="flex items-center gap-6 text_regular_16 f_text_neutral_400 cursor-pointer"
      @click="() => navigateTo('/testfaelle')"
    >
      <font-awesome-icon
        :icon="['fas', 'angle-left']"
        class="h-6 w-4 text-[1.5rem]"
      />
      <span>Zurück zu Testfälle</span>
    </div>

    <!-- 2. Case Name plus Subcases -->
    <div class="flex justify-between items-center">
      <div class="f_text_neutral_900 flex items-center gap-6">
        <GroupIcon :name="caseData.icon" iconWidth="3rem" iconHeight="3rem" />
        <span class="text-[2.5rem] font-semibold font-lora">
          {{ caseData.readableName }}
        </span>
      </div>
      <CaseIndicator
        :numberOfCases="numberOfSubcases"
        type="Subcase"
        class="f_neutral_80"
      />
    </div>

    <!-- 3. Bar Chart and Pie Chart -->
    <div
      class="flex flex-col items-start gap-8 w-full f_neutral_80 px-6 py-8 border_medium"
    >
      <div class="flex justify-center items-center gap-6">
        <font-awesome-icon
          :icon="['far', 'chart-line']"
          class="w-8 h-8 text-[2rem]"
        />
        <span class="h2_bold_28 f_text_neutral_900"> Results</span>
      </div>
      <div
        class="flex w-full gap-8"
        :class="[breakpoint.mobile ? 'flex-col' : '']"
      >
        <div class="w-full py-8 px-6 basic_white border_small shadow_light_2">
          <div class="flex justify-between items-center">
            <span class="h3_bold_18 f_text_neutral_900"
              >Zeitlicher Verlauf</span
            >
            <font-awesome-icon
              :icon="{ prefix: 'far', iconName: 'circle-info' }"
              class="f_text_neutral_900 h-6 w-6 cursor-pointer text-[1.5rem]"
            />
          </div>
          <div>
            <canvas
              id="bar-chart-details"
              style="width: 100%; height: 11.1875rem"
              class="mt-[5.44rem] mb-[4.133rem]"
            >
            </canvas>
          </div>
        </div>
        <div
          class="min-w-[21.3rem] px-6 py-8 basic_white border_small flex flex-col items-center gap-8 shadow_light_2"
        >
          <div class="flex flex-col items-start self-stretch gap-6">
            <span class="h3_bold_18 basic_text_black">Verteilung</span>
            <select
              name="Verteilung"
              id="Verteilung-select"
              class="py-2 pr-2 pl-4 f_neutral_80 w-[11.25rem] border_medium appearance-none caret"
              @change="drawChart"
            >
              <option value="Letzter Tag">Letzter Tag</option>
              <option value="Letzten 7 Tage">Letzten 7 Tage</option>
              <option value="Letzten 30 Tage">Letzten 30 Tage</option>
            </select>
          </div>
          <div
            class="flex justify-center items-center relative w-[17.125rem] h-[8.5rem]"
          >
            <canvas v-if="!errorData" id="doughnut"></canvas>
            <span v-else class="text_regular_16">Error loading data...</span>
          </div>
          <div class="grid grid-cols-2 gap-x-4 gap-y-2">
            <div class="status_bold_12">
              <font-awesome-icon
                :icon="['fas', 'circle']"
                class="status_text_pass_100 h-3 w-3"
              />
              PASSED
            </div>
            <div class="status_bold_12">
              <font-awesome-icon
                :icon="['fas', 'circle']"
                class="status_text_skip_100 h-3 w-3"
              />
              SKIPPED
            </div>
            <div class="status_bold_12">
              <font-awesome-icon
                :icon="['fas', 'circle']"
                class="status_text_warning_100 h-3 w-3"
              />
              WARNING
            </div>
            <div class="status_bold_12">
              <font-awesome-icon
                :icon="['fas', 'circle']"
                class="status_text_fail_100 h-3 w-3"
              />
              FAILED
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 4. Results -->
    <div
      class="f_neutral_80 border_medium py-8 px-6 flex flex-col items-start gap-8 w-full"
    >
      <div class="flex justify-center items-center gap-6">
        <font-awesome-icon
          :icon="['far', 'chart-line']"
          class="w-8 h-8 text-[2rem]"
        />
        <span class="h2_bold_28 f_text_neutral_900"> Results</span>
      </div>
      <div
        class="flex flex-col items-start py-6 border_small basic_white w-full shadow_light_2"
      >
        <div
          class="flex gap-8 py-3 px-3 border-b border-solid f_border_neutral_80 w-full"
        >
          <div class="w-[1rem] sm:w-[3rem] basic_white shrink-0"></div>
          <div class="text_regular_16 f_text_neutral_900 pr-[1.25rem]">
            Status
          </div>
          <div class="text_regular_16 f_text_neutral_900 w-[20.6875rem] grow">
            Subcase
          </div>
          <div
            v-if="false"
            class="text_regular_16 f_text_neutral_900 w-[45rem] grow"
          >
            Runtime
          </div>
          <div
            class="text_regular_16 f_text_neutral_900 ml-auto"
            :class="[breakpoint.mobile ? 'mr-3' : 'mr-[8.625rem]']"
          >
            Attachment
          </div>
        </div>
        <Subcase
          v-for="(step, index) in stepData"
          :id="index"
          :key="index"
          :stepData="step"
          :latestResult="latestResults[index]"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.caret {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='25' height='24' viewBox='0 0 25 24' fill='none'%3e%3cpath d='M12.5 14.5L17.5 9.5H7.5L12.5 14.5Z' fill='%23053240'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-size: 1.5rem 1.5rem;
  background-position: calc(100% - 16px);
}
</style>

<script lang="ts" setup>
const route = useRoute();
const dashboardId = route.params.dashboardId;
const caseId = route.params.caseId;
const caseData = (await useCases(Number(dashboardId), Number(caseId)))[0];
const stepData = await useSteps(Number(dashboardId), Number(caseId));
const latestResults = await useLatestStepResults(
  Number(dashboardId),
  Number(caseId)
);
const numberOfSubcases = stepData.length;

const breakpoint = useBreakpoint().breakpoints;
const errorData = ref(false);

onMounted(() => {
  let number: number;
  if (breakpoint.viewport === "sm" || breakpoint.viewport === "xs") {
    number = 45;
  } else if (breakpoint.viewport === "md") {
    number = 65;
  } else {
    number = 85;
  }
  setTimeout(async () => {
    const results = await useStepsRatio({
      caseId: Number(caseId),
      limit: number,
    });
    useBarChart(
      "details",
      results.find((element) => element.caseId === Number(caseId))?.results,
      true
    );
    const rangeDates = getDateRange(1);
    let rangeData = await useCasesRatio(
      rangeDates.from,
      rangeDates.current,
      Number(dashboardId),
      Number(caseId)
    );
    if (
      rangeData[0].passed === 0 &&
      rangeData[0].failed === 0 &&
      rangeData[0].warning === 0 &&
      rangeData[0].skipped === 0
    ) {
      errorData.value = true;
    } else {
      useDoughnutChart(
        [
          rangeData[0].passed,
          rangeData[0].failed,
          rangeData[0].warning,
          rangeData[0].skipped,
        ],
        false
      );
      errorData.value = false;
    }
  }, 1);
});

const drawChart = async (event: Event) => {
  let pastDays: number;
  if ((event.target as HTMLSelectElement).selectedIndex === 0) {
    pastDays = 1;
  } else if ((event.target as HTMLSelectElement).selectedIndex === 1) {
    pastDays = 7;
  } else if ((event.target as HTMLSelectElement).selectedIndex === 2) {
    pastDays = 30;
  } else {
    pastDays = 1;
  }
  const rangeDates = getDateRange(pastDays);
  let rangeData = await useCasesRatio(
    rangeDates.from,
    rangeDates.current,
    Number(dashboardId),
    Number(caseId)
  );
  if (
    rangeData[0].passed === 0 &&
    rangeData[0].failed === 0 &&
    rangeData[0].warning === 0 &&
    rangeData[0].skipped === 0
  ) {
    errorData.value = true;
  } else {
    useDoughnutChart(
      [
        rangeData[0].passed,
        rangeData[0].failed,
        rangeData[0].warning,
        rangeData[0].skipped,
      ],
      true
    );
    errorData.value = false;
  }
};

definePageMeta({
  middleware: "details",
});
</script>

<script lang="ts">
const getDateRange = (pastDays: number) => {
  const currentDate = new Date();
  const from = new Date(currentDate.getTime() - pastDays * 24 * 60 * 60 * 1000);
  return {
    current: formatDateToISOString(currentDate),
    from: formatDateToISOString(from),
  };
};

function formatDateToISOString(date: any) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}
</script>
