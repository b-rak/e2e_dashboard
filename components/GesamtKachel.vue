<template>
  <div
    id="os-all"
    class="border_small shadow_light_3 basic_white flex flex-col items-center justify-center gap-6"
    :class="[
      displayAll ? 'f_neutral_900' : 'basic_white shadow_light_3',
      breakpoint.viewport === 'xs' || breakpoint.viewport === 'sm'
        ? 'px-2 py-2'
        : 'px-6 py-[1.375rem]',
      { 'h-[7.5rem]': breakpoint.viewport === 'md' },
      { 'h-[9.6875rem]': !breakpoint.mobile },
    ]"
    @click="selectAll"
  >
    <div
      class="flex items-center self-stretch"
      :class="[
        !displayAll ? 'f_text_neutral_900' : 'basic_text_white',
        'justify-' + positionHeading,
        breakpoint.viewport === 'xs' || breakpoint.viewport === 'sm'
          ? 'gap-2'
          : 'gap-4',
      ]"
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
      v-if="!breakpoint.mobile"
      :selected="displayAll"
      :dashboardId="-1"
      :latestTwoCaseResults="ratios"
    />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  displayAll: Boolean;
  positionHeading: String;
  ratios: Array<LatestCaseResult>;
}>();
const breakpoint = useBreakpoint().breakpoints;

const emits = defineEmits(["selectAll"]);
const selectAll = () => {
  emits("selectAll");
};
</script>
