<template>
  <div
    class="py-3 border-b border-solid f_border_neutral_90 cursor-pointer self-stretch"
    @click="goToDetails"
  >
    <div class="flex items-center gap-2">
      <div
        class="w-2 h-6 px-3 border_xsmall"
        :class="useResultColor(result.result)"
      ></div>
      <h3 class="h3_medium_18 w-full">{{ result.caseReadableName }}</h3>
      <GroupIcon
        :name="useIcon(environmentName, iconName)"
        :iconWidth="useRem() * 1.5 + ''"
        :iconHeight="useRem() * 1.5 + ''"
      />
    </div>
    <div class="text_regular_14 pl-8 flex flex-col sm:flex-row gap-2">
      <div class="w-[10.5rem] flex gap-2">
        <span>{{ dateAndTime.date }}</span>
        <span>{{ dateAndTime.time }}</span>
      </div>
      <span
        v-if="breakpoint.viewport !== 'xs'"
        class="w-full text-ellipsis overflow-hidden inline-block whitespace-nowrap text-left mr-8"
        >{{ result.testParameter }}</span
      >
    </div>
    <span
      v-if="breakpoint.viewport === 'xs'"
      class="text_regular_14 pl-8 w-full text-ellipsis overflow-hidden inline-block whitespace-nowrap text-left mr-8"
      >{{ result.testParameter }}</span
    >
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  result: CaseResult;
  dashboards: Dashboard[];
}>();

const breakpoint = useBreakpoint().breakpoints;
const dateAndTime = useDateAndTime(props.result.createdDate);
const environmentName = props.dashboards.find(
  (dashboard) => dashboard.id + "" === props.result.environment
)?.name as string;
const iconName = props.dashboards.find(
  (dashboard) => dashboard.id + "" === props.result.environment
)?.icon as string;
const goToDetails = () => {
  navigateTo(
    "/testfaelle/" + props.result.environment + "/" + props.result.caseId
  );
};
</script>
