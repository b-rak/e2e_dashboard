<template>
  <div
    :id="`os-${props.config.id}`"
    class="border_small shadow_light_3 flex flex-col gap-6 hover:scale-[1.05]"
    :class="[
      !selected ? 'basic_white' : 'f_neutral_900',
      {
        'px-2 py-2':
          breakpoint.viewport === 'xs' || breakpoint.viewport === 'sm',
        'px-6 py-[1.375rem]': breakpoint.viewport === 'md',
        'w-[22.188rem] h-[9.6875rem] px-6 py-[1.375rem]':
          !breakpoint.mobile && breakpoint.viewport !== 'lg',
        'w-[17.75rem] h-[9.6875rem] px-4 py-[1.375rem]':
          breakpoint.viewport === 'lg',
      },
    ]"
    @click="toggleDisplay"
  >
    <div
      class="flex justify-between items-center gap-4"
      :class="[{ 'flex-col': breakpoint.mobile }]"
    >
      <div
        class="flex items-center"
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
        <span class="h3_bold_18">
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
      class="h-[4.8125rem] flex items-end gap-6"
      :class="[{ hidden: breakpoint.mobile }]"
    >
      <div
        class="text-center flex items-end"
        :class="{
          'w-[10.313rem] h-[4.8125rem]':
            !breakpoint.mobile && breakpoint.viewport !== 'lg',
          'w-32 h-[3.9rem]': breakpoint.viewport === 'lg',
        }"
      >
        <canvas :id="'chart-' + props.config.id"></canvas>
      </div>
      <SuccessRate
        :selected="selected"
        :dashboardId="props.config.dashboardId"
        :latestTwoCaseResults="ratios"
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

const breakpoint = ref(useBreakpoint().breakpoints);

const toggleDisplay = () => {
  emits("update:display", {
    selected: !props.selected,
    id: props.config.id,
  });
};

onMounted(() => {
  setTimeout(() => {
    useOverviewTest(
      String(props.config.id),
      props.config.dashboardId,
      false,
      breakpoint.value.viewport
    );
    watch(
      () => breakpoint.value.viewport,
      (newValue, oldValue) => {
        useOverviewTest(
          String(props.config.id),
          props.config.dashboardId,
          true,
          newValue
        );
      }
    );
  }, 1);
});
</script>
