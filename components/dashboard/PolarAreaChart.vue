<template>
  <div
    class="flex flex-col justify-center items-center gap-6 p-6 border_small basic_white shadow_light_2"
    :class="{ 'min-w-[15.75rem]': !breakpoint.mobile }"
  >
    <div class="flex items-center gap-4 f_text_neutral_900 h-6">
      <GroupIcon
        :name="useIcon(dashboard.name, dashboard.icon)"
        :iconWidth="useRem() * 1.5 + ''"
        :iconHeight="useRem() * 1.5 + ''"
      />
      <span class="h3_bold_18 !leading-6 text-center">{{
        dashboard.name
      }}</span>
    </div>
    <div class="flex items-center h-[12.25rem]">
      <canvas v-if="!errorData" :id="'polarAreaChart-' + props.numberOfChart">
      </canvas>
      <span v-else class="text_regular_16">Error loading data...</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  displayStatus: string;
  numberOfChart: number;
  dashboard: Dashboard;
  ratios: Array<CaseRatio> | undefined;
}>();

const breakpoint = useBreakpoint().breakpoints;

const dashboardCasesData = useDashboardCasesStore()
  .dashboardCasesData as staticDashboardCases;
const caseData = (
  dashboardCasesData.cases.find(
    (casesObj) => casesObj.groupId === props.dashboard.id
  ) as { groupId: number; caseList: Case[] }
).caseList;

const errorData = ref(false);
watch(
  () => props.displayStatus,
  async (value) => {
    if (props.ratios === undefined) {
      errorData.value = true;
    } else {
      await usePolarAreaChart(
        "polarAreaChart-" + props.numberOfChart,
        value,
        props.ratios,
        caseData
      );
      errorData.value = false;
    }
  }
);
onMounted(() => {
  setTimeout(async () => {
    if (props.ratios === undefined) {
      errorData.value = true;
    } else {
      await usePolarAreaChart(
        "polarAreaChart-" + props.numberOfChart,
        "PASSED",
        props.ratios,
        caseData
      );
      errorData.value = false;
    }
  }, 1);
});
</script>
