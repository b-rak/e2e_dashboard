<template>
  <div
    class="p-3 basic_white flex flex-col justify-between items-end border_large"
  >
    <div class="flex flex-row w-full justify-between items-center h-8">
      <div class="flex items-center gap-3">
        <font-awesome-icon
          :icon="{ prefix: 'fas', iconName: 'desktop' }"
          class="f_text_neutral_900 fa-xl h-[1.125rem] w-[1.375rem]"
        />
        <span class="h3_bold_18">Testcase {{ id }} </span>
      </div>
      <div
        :class="{ status_fail_100: !result, status_pass_100: result }"
        class="border_small py-0 px-[0.375rem] flex justify-center"
      >
        <span
          class="flex items-center status_bold_12 text-white text-center pl-[0.125rem]"
          >{{ result ? "PASSED" : "FAILED" }}</span
        >
      </div>
    </div>
    <div class="text-center h-14 my-[1.313rem] w-full">
      <canvas
        :id="'bar-chart-' + id"
        style="width: 100%; height: 54px"
        class="mx-auto"
      ></canvas>
    </div>
    <div>
      <span class="button_regular_14 text-[#677076] cursor-pointer">
        Details
        <font-awesome-icon
          :icon="{ prefix: 'fas', iconName: 'chevron-right' }"
          class="text-[#677076] h-3 w-2"
        />
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    id: Number;
    result?: Boolean;
  }>(),
  {
    result: () => Math.random() < 0.5,
  }
);

onMounted(() => {
  setTimeout(() => {
    useChart(props.id as number);
  }, 1);
});
</script>
