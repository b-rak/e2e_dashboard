<template>
  <div
    :id="`os-${props.config.id}`"
    class="border_small shadow_light_3 flex flex-col hover:scale-[1.05] self-stretch"
    :class="[
      !selected ? 'basic_white' : 'f_neutral_900',
      breakpoint.mobile ? 'justify-center' : 'justify-between',
      {
        'px-2 py-2 min-w-[9rem] max-w-[9rem]':
          breakpoint.viewport === 'xs' || breakpoint.viewport === 'sm',
        'px-6 py-[1.375rem] w-[15rem]': breakpoint.viewport === 'md',
        'w-[17.75rem] h-[9.6875rem] px-4 pt-[1.375rem]':
          breakpoint.viewport === 'lg',
        'w-[22.188rem] h-[9.6875rem] px-6 pt-[1.375rem]':
          !breakpoint.mobile && breakpoint.viewport !== 'lg',
      },
    ]"
    @click="toggleDisplay"
  >
    <div
      class="flex justify-between items-center gap-4"
      :class="[{ 'flex-col': breakpoint.mobile }]"
    >
      <div
        class="flex items-center justify-center"
        :class="[
          !selected ? 'f_text_neutral_900' : 'basic_text_white',
          breakpoint.viewport === 'xs' || breakpoint.viewport === 'sm'
            ? 'gap-2'
            : 'gap-4',
        ]"
      >
        <GroupIcon
          :name="props.config.iconName"
          :iconWidth="useRem() * 1.5 + ''"
          :iconHeight="useRem() * 1.5 + ''"
        />
        <span class="h3_bold_18 !leading-6 text-center">
          {{ props.config.os_name }}
        </span>
      </div>
      <div
        v-if="breakpoint.viewport !== 'xs' && breakpoint.viewport !== 'sm'"
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
    <div
      class="h-[4.8125rem] flex items-end justify-between"
      :class="[{ hidden: breakpoint.mobile }]"
    >
      <div
        class="text-center flex items-end"
        :class="{
          'w-[10.313rem] h-[4.8125rem] gap-6':
            !breakpoint.mobile && breakpoint.viewport !== 'lg',
          'w-[10.313rem] h-[3.9rem]': breakpoint.viewport === 'lg',
        }"
      >
        <canvas :id="'chart-' + props.config.id"></canvas>
      </div>
      <SuccessRate
        :selected="selected"
        :dashboardId="props.config.dashboardId"
        :latestTwoCaseResults="ratios"
        :class="{ '!px-0': breakpoint.viewport === 'lg' }"
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
    type: Array<LatestCaseResult>,
    required: true,
  },
});
const emits = defineEmits(["update:display"]);

const breakpoint = useBreakpoint().breakpoints;

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
