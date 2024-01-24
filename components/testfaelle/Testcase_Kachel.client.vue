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
    <div class="text-center h-14 w-full flex items-center justify-center">
      <canvas
        v-if="!errorData"
        :id="'bar-chart-' + groupName + id"
        style="width: 100%; height: 3.5rem"
        class="mx-auto"
      ></canvas>
      <span v-else class="text_regular_16">Error loading data...</span>
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
  dashboardCase: { dashboardId: number; caseId: number };
  lastResults: CasePassRate[] | undefined;
  icon: string;
}>();
const result = ref("");
const errorData = ref(false);

onMounted(() => {
  setTimeout(async () => {
    if (props.lastResults) {
      result.value = useResultStatus(props.lastResults[0]);
      useBarChart(props.groupName + String(props.id), props.lastResults, false);
      errorData.value = false;
    } else {
      errorData.value = true;
    }
  }, 1);
});

const emits = defineEmits(["goTo:details"]);
const goToDetails = () => {
  emits("goTo:details", {
    dashboardId: props.dashboardCase.dashboardId,
    caseId: props.dashboardCase.caseId,
    icon: props.icon,
  });
};
</script>
