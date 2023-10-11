<template>
  <div
    class="flex flex-col justify-center items-center gap-6 p-6 border_small basic_white shadow_light_2 min-w-[15.75rem]"
  >
    <div class="flex items-center gap-4 f_text_neutral_900 h-6">
      <GroupIcon
        :name="useIcon(dashboard.name, dashboard.icon)"
        iconWidth="1.5rem"
        iconHeight="1.5rem"
      />
      <span class="h3_bold_18">{{ dashboard.name }}</span>
    </div>
    <div style="height: 12.25rem">
      <canvas :id="'polarAreaChart-' + props.numberOfChart"></canvas>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  displaySuccessChart: boolean;
  numberOfChart: number;
  dashboard: Dashboard;
  ratios: CaseRatios;
}>();

watch(
  () => props.displaySuccessChart,
  (value) => {
    usePolarAreaChart(
      "polarAreaChart-" + props.numberOfChart,
      value,
      props.ratios
    );
  }
);
onMounted(() => {
  setTimeout(() => {
    usePolarAreaChart(
      "polarAreaChart-" + props.numberOfChart,
      true,
      props.ratios
    );
  }, 1);
});
</script>
