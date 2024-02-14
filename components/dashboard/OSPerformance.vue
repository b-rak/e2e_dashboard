<template>
  <div
    class="flex flex-col gap-4 basic_white border_small shadow_light_2 px-3 pt-3 pb-4"
  >
    <div class="flex items-center gap-4 f_text_neutral_900">
      <GroupIcon
        :name="iconName"
        :iconWidth="useRem() * 1.5 + ''"
        :iconHeight="useRem() * 1.5 + ''"
      />
      <span class="h3_bold_18 !leading-6">
        {{ osName }}
      </span>
    </div>
    <div class="flex gap-x-[0.20813rem] gap-y-2 flex-wrap">
      <OSPerformanceResult
        v-for="(result, index) of results"
        :id="osName + '-' + index"
        :result="result"
      >
      </OSPerformanceResult>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  osName: string;
  iconName: string;
  results: LatestCaseResult[];
}>();
</script>
