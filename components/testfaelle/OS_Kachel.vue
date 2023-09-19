<template>
  <div
    :id="`os-${props.config.id}`"
    class="w-[22.188rem] h-[9.6875rem] border_small shadow_light_3 flex flex-col px-6 pt-[1.375rem] gap-6 hover:scale-[1.05]"
    :class="[!selected ? 'basic_white' : 'f_neutral_900']"
    @click="toggleDisplay"
  >
    <div class="h-8 flex justify-between items-center">
      <div
        class="flex items-center gap-4"
        :class="[!selected ? 'f_text_neutral_900' : 'basic_text_white']"
      >
        <GroupIcon
          :name="props.config.iconName"
          iconWidth="1.5rem"
          iconHeight="1.5rem"
        />
        <span class="h3_bold_18">
          {{ props.config.os_name }}
        </span>
      </div>
      <div
        class="f_neutral_80 border_small text-center h-7 w-[6.313rem] p-[0.125rem]"
      >
        <span class="text_bold_14 f_text_neutral_900">
          {{
            props.config.numberOfCases > 1
              ? props.config.numberOfCases + " Cases"
              : "1 Case"
          }}
        </span>
      </div>
    </div>
    <div class="h-[4.8125rem] flex items-end gap-6">
      <div class="text-center w-[10.313rem] h-[4.8125rem] flex items-end">
        <canvas
          :id="'chart-' + props.config.id"
          style="width: 10.313rem; height: 4.8125rem"
          class="font-lato font-bold leading-6 tracking-[0.0625rem] text-[2rem]"
        ></canvas>
      </div>
      <SuccessRate
        :selected="selected"
        :dashboardId="props.config.dashboardId"
        :ratios="ratios"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
interface Config {
  id: number;
  dashboardId: number;
  iconName: string;
  os_name: string;
  numberOfCases: number;
}
const props = defineProps({
  config: {
    type: Object as PropType<Config>,
    required: true,
  },
  selected: Boolean,
  ratios: {
    type: Array<DashboardRatio>,
    required: true,
  },
});
const emits = defineEmits(["update:display"]);

const toggleDisplay = () => {
  emits("update:display", {
    selected: !props.selected,
    id: props.config.id,
  });
};

onMounted(() => {
  setTimeout(() => {
    useOverviewChart(String(props.config.id), props.config.dashboardId);
  }, 1);
});
</script>
