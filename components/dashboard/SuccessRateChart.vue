<template>
  <div class="flex items-center gap-6">
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
        'h-[9.75rem]': numberOfDashboards === 1,
        'h-[4.125rem]': numberOfDashboards === 2,
        'h-[2.25rem]': numberOfDashboards > 2,
        'min-w-[28.25rem]': !breakpoint.mobile,
      }"
    >
      <canvas
        v-if="trend.trend !== 'error'"
        :id="'successrate-' + dashboard.id"
        class="border_xsmall"
      ></canvas>
      <span v-else class="text_regular_16">Error loading data...</span>
    </div>
    <div class="flex justify-center items-center gap-2 min-w-[6.75rem]">
      <font-awesome-icon
        v-if="trend.trend !== 'constant' && trend.trend !== 'error'"
        :icon="{
          prefix: 'far',
          iconName: getTrendIcon(trend.trend),
        }"
        class="h-[1.5rem] w-[1.5rem] text-[1.5rem]"
        :class="[
          getTrendIcon(trend.trend) === 'arrow-up'
            ? 'status_text_pass_100'
            : 'status_text_fail_100',
        ]"
      />
      <span class="rate_bold_28 uppercase w-full text-right"
        >{{ trend.successRate }}%</span
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  numberOfDashboards: number;
  dashboard: Dashboard;
  trend: {
    dashboardId: number;
    trend: string;
    successRate: string | number;
  };
}>();

const breakpoint = useBreakpoint().breakpoints;
</script>

<script lang="ts">
const getTrendIcon = (trend: string) => {
  if (trend === "positive") {
    return "arrow-up";
  } else if (trend === "negative") {
    return "arrow-down";
  }
};
</script>
