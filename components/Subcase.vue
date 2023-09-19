<template>
  <div class="w-full">
    <div
      class="flex items-center gap-8 py-4 px-3 border-b border-solid f_border_neutral_90 w-full"
      :class="[selected ? 'f_neutral_700' : '']"
    >
      <div
        class="flex gap-8 py-4 items-center cursor-pointer"
        @click.prevent="toggleRotate"
      >
        <div class="w-[3.5rem] text-center">
          <font-awesome-icon
            :icon="{ prefix: 'far', iconName: 'angle-right' }"
            class="h-8 cursor-pointer text-[2rem] f_text_neutral_500 transition-[transform] duration-100 ease-linear"
            :id="'arrow-' + id"
          />
        </div>
        <ResultIndicator
          :result="currentResult.result === 'PASSED'"
          class="pl-2 pr-[0.375rem] w-16"
        />
        <div
          class="h3_medium_18 w-[20.6875rem] grow"
          :class="[selected ? 'basic_text_white' : '']"
        >
          {{ stepData.readableName }}
          <div class="flex gap-9">
            <span class="text_regular_16 w-[7rem]">{{ dateAndTime.date }}</span>
            <span class="text_regular_16">{{ dateAndTime.time }}</span>
          </div>
        </div>
      </div>
      <div class="w-[45rem] grow relative h-[3rem]">
        <canvas :id="'runtime-' + id" class="border_xsmall"></canvas>
      </div>
      <div
        class="w-fit pl-[6.125rem] pr-5 py-2 flex items-center gap-[2.25rem] justify-end"
      >
        <IconButton
          iconName="image"
          type="far"
          active="true"
          @click="useOpenInNewTab(currentResult.screenshot)"
        />
        <IconButton
          iconName="circle-play"
          type="far"
          active="true"
          @click="useOpenInNewTab(currentResult.video)"
        />
        <IconButton
          iconName="file"
          type="fas"
          active="true"
          @click="useOpenInNewTab(currentResult.randomToken)"
        />
      </div>
    </div>
    <Transition>
      <div v-show="selected" class="border-b border-solid f_border_neutral_90">
        <SubcaseResult
          v-for="(result, index) in lastResults"
          :key="result.environment + '-' + result.stepId + '-' + result.id"
          :stepResult="result"
          @update:last:result="updateLastResultDisplay"
        />
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  id: number;
  stepData: Step;
  latestResult: StepResult;
}>();

const currentResult = ref(props.latestResult);
const dateAndTime = ref(useDateAndTime(currentResult.value.createdDate));

//Result Data
const lastResults = await useStepResults(
  props.stepData.case.group.id,
  props.stepData.case.id,
  props.stepData.id,
  10,
  0
);

const selected = ref(false);
const toggleRotate = () => {
  selected.value = !selected.value;

  const arrowElement = document.getElementById(
    "arrow-" + props.id
  ) as HTMLElement;
  arrowElement.classList.toggle("f_text_neutral_500");
  arrowElement.classList.toggle("basic_text_white");
  arrowElement.classList.toggle("rotate-90");
};

onMounted(() => {
  setTimeout(async () => {
    const runtimeData = await useStepResultsRuntime(
      props.stepData.case.group.id,
      props.stepData.case.id,
      props.stepData.id,
      55
    );
    useRuntimeChart(String(props.id), runtimeData);
  }, 1);
});

const updateLastResultDisplay = async (obj: {
  stepresultId: number;
  falsePositive: number;
}) => {
  let resultAvailable = false;
  // Update local result list
  for (const lastResult of lastResults) {
    if (lastResult.id === obj.stepresultId) {
      lastResult.falsePositive = obj.falsePositive;
      break;
    }
  }
  // search for first non false-positive result
  for (const lastResult of lastResults) {
    if (lastResult.falsePositive === 0) {
      currentResult.value = lastResult;
      resultAvailable = true;
      break;
    }
  }
  // if all local results are marked as false positive get the latest non falsepositive result from the database
  if (!resultAvailable) {
    currentResult.value = await useLatestStepResult(
      Number(currentResult.value.environment),
      Number(currentResult.value.caseId),
      Number(currentResult.value.stepId)
    );
  }
  dateAndTime.value = useDateAndTime(currentResult.value.createdDate);
  //update runtime chart??
};
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transform: scaleY(1);
  transform-origin: top;
  transition: transform 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.3s ease;
}
</style>
