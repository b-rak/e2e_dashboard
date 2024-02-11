<template>
  <div
    class="flex items-center gap-8 py-4 px-3 w-full"
    :class="[!status ? 'bg_light' : 'bg-[#f3f5f6]']"
  >
    <div
      v-if="!breakpoint.mobile && breakpoint.viewport !== 'lg'"
      class="w-[4.5rem] text-center"
    ></div>
    <div
      class="flex items-center justify-center"
      :class="
        breakpoint.viewport === 'xs' || breakpoint.viewport === 'sm'
          ? 'w-[2.5rem] min-w-[2.5rem]'
          : 'w-[3.988rem] min-w-[3.988rem]'
      "
    >
      <ClientOnly>
        <div
          class="border_xsmall p-2 w-6 h-6"
          :class="[!status ? color : colorDeactivated]"
        ></div>
      </ClientOnly>
    </div>

    <div
      class="flex flex-col gap-2"
      :class="{
        grow: breakpoint.viewport === 'xs' || breakpoint.viewport === 'sm',
      }"
    >
      <div
        class="h3_medium_18 flex"
        :class="{
          f_text_neutral_400: status,
          'w-[20.6875rem]': !breakpoint.mobile && breakpoint.viewport !== 'lg',
          'gap-2': breakpoint.viewport === 'xs',
          'gap-9': breakpoint.viewport !== 'xs',
        }"
      >
        <span
          class="text_regular_16"
          :class="{ 'w-[7rem]': breakpoint.viewport !== 'xs' }"
          >{{ dateAndTime.date }}</span
        >
        <span class="text_regular_16">{{ dateAndTime.time }}</span>
      </div>
      <div
        v-if="breakpoint.viewport === 'xs' || breakpoint.viewport === 'sm'"
        class="text_regular_16 line-clamp-2"
        :class="{
          f_text_neutral_400: status,
        }"
      >
        {{ stepResult.parameter }}
      </div>
    </div>

    <div
      class="flex justify-between items-start gap-6"
      :class="{
        'w-[45rem] grow':
          breakpoint.viewport !== 'xs' && breakpoint.viewport !== 'sm',
      }"
    >
      <div
        v-if="breakpoint.viewport !== 'xs' && breakpoint.viewport !== 'sm'"
        class="text_regular_16"
        :class="{ f_text_neutral_400: status }"
      >
        {{ stepResult.parameter }}
      </div>
      <ToggleButton
        :class="[
          breakpoint.viewport !== 'xs'
            ? 'min-w-[8.5rem]'
            : 'flex-col text-center',
        ]"
        text="Mark false"
        :value="status"
        @toggle-status="updateFalsePositive"
      />
    </div>
    <div
      class="w-fit pr-3 py-2 flex items-center gap-8 justify-end relative"
      :class="[breakpoint.mobile ? 'pl-3' : 'pl-[6.125rem]']"
    >
      <template v-if="!breakpoint.mobile">
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
      </template>
      <DreiPunkteMenue
        v-else
        :screenshot="stepResult.screenshot"
        :video="stepResult.video"
        :logfile="stepResult.randomToken"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  stepResult: StepResult;
}>();

// get Result Date and Time
const dateAndTime = useDateAndTime(props.stepResult.createdDate);

const breakpoint = useBreakpoint().breakpoints;

// set Colors depending on result
const color = ref("");
const colorDeactivated = ref("");
if (props.stepResult.result === "PASSED") {
  color.value = "status_pass_100";
  colorDeactivated.value = "status_pass_75";
} else if (props.stepResult.result === "WARNING") {
  color.value = "status_warning_100";
  colorDeactivated.value = "status_warning_75";
} else if (props.stepResult.result === "FAILED") {
  color.value = "status_fail_100";
  colorDeactivated.value = "status_fail_75";
} else {
  color.value = "status_skip_100";
  colorDeactivated.value = "status_skip_75";
}

const emits = defineEmits(["update:last:result"]);
// set false positive
const status = ref(props.stepResult.falsePositive !== 0);
const updateFalsePositive = async (statusToggle: Boolean) => {
  status.value = statusToggle as boolean;
  // patch in DB
  await usePatchStepResult(props.stepResult.id, Number(status.value));
  emits("update:last:result", {
    stepresultId: props.stepResult.id,
    falsePositive: Number(status.value),
  });
};
</script>
