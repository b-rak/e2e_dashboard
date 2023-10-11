<template>
  <div
    class="flex items-start gap-8 py-4 px-3 w-full"
    :class="[!status ? 'bg_light' : 'bg-[#f3f5f6]']"
  >
    <div class="w-[4.5rem] text-center"></div>
    <div class="flex items-center justify-center w-[3.988rem] min-w-[3.988rem]">
      <ClientOnly>
        <div
          class="border_xsmall p-2 w-6 h-6"
          :class="[!status ? color : colorDeactivated]"
        ></div>
      </ClientOnly>
    </div>
    <div
      class="h3_medium_18 w-[20.6875rem] grow flex gap-9"
      :class="[!status ? '' : 'f_text_neutral_400']"
    >
      <span class="text_regular_16 w-[7rem]">{{ dateAndTime.date }}</span>
      <span class="text_regular_16">{{ dateAndTime.time }}</span>
    </div>
    <div class="w-[45rem] grow flex justify-between items-start gap-6">
      <div
        class="text_regular_16"
        :class="[!status ? '' : 'f_text_neutral_400']"
      >
        {{ stepResult.parameter }}
      </div>
      <ToggleButton
        class="min-w-[8.5rem]"
        text="Mark false"
        :value="status"
        @toggle-status="updateFalsePositive"
      />
    </div>
    <div
      class="w-fit pl-[6.125rem] pr-5 py-2 flex items-center gap-[2.25rem] justify-end"
    >
      <IconButton
        iconName="image"
        type="far"
        :active="!status"
        @click="!status && useOpenInNewTab(stepResult.screenshot)"
      />
      <IconButton
        iconName="circle-play"
        type="far"
        :active="!status"
        @click="!status && useOpenInNewTab(stepResult.video)"
      />
      <IconButton
        iconName="file"
        type="fas"
        :active="!status"
        @click="!status && useOpenInNewTab(stepResult.randomToken)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  stepResult: StepResult;
}>();
const route = useRoute();

// get Result Date and Time
const dateAndTime = useDateAndTime(props.stepResult.createdDate);

// set Colors depending on result
const color = ref("");
const colorDeactivated = ref("");
if (props.stepResult.result === "PASSED") {
  color.value = "status_pass_100";
  colorDeactivated.value = "status_pass_75";
} else {
  color.value = "status_fail_100";
  colorDeactivated.value = "status_fail_75";
}

const emits = defineEmits(["update:last:result"]);
// set false positive
const status = ref(props.stepResult.falsePositive !== 0);
const updateFalsePositive = async (statusToggle: Boolean) => {
  status.value = statusToggle as boolean;
  // patch in DB
  await usePatchResult(
    Number(route.params.dashboardId),
    Number(route.params.caseId),
    Number(props.stepResult.stepId),
    props.stepResult.id,
    Number(status.value)
  );
  emits("update:last:result", {
    stepresultId: props.stepResult.id,
    falsePositive: Number(status.value),
  });
};
</script>
