<template>
  <div
    class="p-3 basic_white flex flex-col justify-between items-end border_small gap-8 shadow_light_2 cursor-pointer"
    @click="goToDetails()"
  >
    <div class="flex flex-row w-full justify-between items-center h-8">
      <div class="flex items-center gap-4 f_text_neutral_900">
        <GroupIcon :name="icon" iconWidth="1.5rem" iconHeight="1.5rem" />
        <span class="h3_bold_18">{{ testcaseName }} </span>
      </div>
      <ResultIndicator :result="result" class="pl-2 pr-[0.375rem]" />
    </div>
    <div class="text-center h-14 w-full">
      <canvas
        :id="'bar-chart-' + groupName + id"
        style="width: 100%; height: 3.5rem"
        class="mx-auto"
      ></canvas>
    </div>
    <div class="f_text_neutral_400 gap-4 cursor-pointer flex items-center">
      <span class="button_regular_14">Details</span>
      <font-awesome-icon
        :icon="{ prefix: 'fas', iconName: 'chevron-right' }"
        class="h-4 w-2"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  id: Number;
  testcaseName: String;
  groupName: String;
  dashboardCase: Object;
  icon: String;
}>();
const result = ref(false);

onMounted(() => {
  setTimeout(async () => {
    const results = await useStepsRatio(
      props.dashboardCase.dashboardId,
      props.dashboardCase.caseId,
      50
    );
    result.value = results[0]["failed"] === 0;
    useBarChart(props.groupName + String(props.id), results, false);
  }, 1);
});

const emits = defineEmits(["goTo:details"]);
const goToDetails = () => {
  //navigateTo("/testfaelle/" + props.groupName + "/" + props.icon)
  emits("goTo:details", {
    dashboardId: props.dashboardCase.dashboardId,
    caseId: props.dashboardCase.caseId,
    icon: props.icon,
  });
};
</script>
