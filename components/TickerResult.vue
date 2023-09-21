<template>
  <div
    class="py-3 border-b border-solid f_border_neutral_90 w-full cursor-pointer"
    @click="goToDetails"
  >
    <div class="flex items-center gap-2">
      <div
        class="w-2 h-6 px-3 border_xsmall"
        :class="[
          result.result === 'PASSED' ? 'status_pass_100' : 'status_fail_100',
        ]"
      ></div>
      <h3 class="h3_medium_18 w-full">{{ result.caseObject.readableName }}</h3>
      <GroupIcon
        :name="
          useIcon(result.caseObject.group.name, result.caseObject.group.icon)
        "
        iconWidth="1.5rem"
        iconHeight="1.5rem"
      />
    </div>
    <div class="text_regular_14 pl-8 flex gap-2">
      <div class="w-[10.5rem] flex gap-2">
        <span>{{ dateAndTime.date }}</span>
        <span>{{ dateAndTime.time }}</span>
      </div>
      <span class="w-full">{{ result.testParameter }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  result: CaseResultAndObject;
}>();
const dateAndTime = useDateAndTime(props.result.createdDateAsString);

const goToDetails = () => {
  navigateTo(
    "/testfaelle/" + props.result.environment + "/" + props.result.caseObject.id
  );
};
</script>
