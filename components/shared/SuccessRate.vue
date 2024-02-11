<template>
  <div
    class="flex flex-col justify-center items-center p-1"
    :class="[!selected ? 'f_text_neutral_900' : 'basic_text_white']"
  >
    <div class="flex justify-center items-center gap-2 w-[6.75rem]">
      <font-awesome-icon
        v-if="trend.trend !== 'constant'"
        :icon="{ prefix: 'far', iconName: iconName }"
        class="h-[1.5rem] w-[1.5rem] text-[1.5rem]"
        :class="[
          iconName === 'arrow-up'
            ? 'status_text_pass_100'
            : 'status_text_fail_100',
        ]"
      />
      <span class="rate_bold_36 uppercase">{{ trend.currentRatio }}%</span>
    </div>
    <span class="text_regular_14">Success Rate</span>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  selected: Boolean;
  dashboardId: Number;
  latestTwoCaseResults: Array<LatestCaseResult>;
}>();
const trend = computed(() => {
  let currentRun: Array<LatestCaseResult> = [];
  let lastRun: Array<LatestCaseResult> = [];
  for (const latestTwoCaseResult of props.latestTwoCaseResults) {
    if (
      props.dashboardId !== -1 &&
      latestTwoCaseResult.environment !== String(props.dashboardId)
    )
      continue;
    if (latestTwoCaseResult.row_num === 1) currentRun.push(latestTwoCaseResult);
    if (latestTwoCaseResult.row_num === 2) lastRun.push(latestTwoCaseResult);
  }
  const currentRatio = getRatio(currentRun);
  const lastRatio = getRatio(lastRun);

  return {
    currentRatio: currentRatio,
    trend: getTrend(currentRatio, lastRatio),
  };
});

const getRatio = (results: Array<LatestCaseResult>) => {
  let sumPassed = 0;
  for (const result of results) {
    if (result.result === "PASSED") sumPassed++;
  }
  return usePercentage(sumPassed, results.length);
};

const getTrend = (currentRatio: number, lastRatio: number) => {
  if (currentRatio > lastRatio) return "positive";
  else if (currentRatio < lastRatio) return "negative";
  else return "constant";
};

const iconName = computed(() => {
  if (trend.value.trend === "positive") {
    return "arrow-up";
  } else if (trend.value.trend === "negative") {
    return "arrow-down";
  }
});
onMounted(() => {
  setTimeout(() => {}, 1);
});
</script>
