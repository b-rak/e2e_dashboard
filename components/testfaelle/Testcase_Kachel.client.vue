<template>
  <div
    class="p-3 basic_white flex flex-col justify-between items-end border_medium gap-8 shadow_light_2"
  >
    <div class="flex flex-row w-full justify-between items-center h-8">
      <div class="flex items-center gap-4 f_text_neutral_900">
        <div class="h-6 w-6 flex items-center justify-center">
          <DesktopIcon v-if="icon === 'desktop'" />
          <IOSIcon v-else-if="icon === 'apple'" />
          <AndroidIcon v-else class="inline-block h-5" />
        </div>
        <span class="h3_bold_18">Testcase {{ id }} </span>
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
const props = withDefaults(
  defineProps<{
    id: Number;
    groupName: String;
    result?: Boolean;
    icon: Object;
  }>(),
  {
    result: () => Math.random() < 0.5,
  }
);

onMounted(() => {
  setTimeout(() => {
    useChart(props.groupName + String(props.id), 50);
  }, 1);
});
</script>
