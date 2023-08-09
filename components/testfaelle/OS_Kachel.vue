<template>
  <div
    :id="`os-${id}`"
    class="w-[22.188rem] h-[9.6875rem] border_small shadow_light_3 flex flex-col px-6 pt-[1.375rem] gap-6 hover:scale-[1.05]"
    :class="[!selected ? 'basic_white' : 'f_neutral_900']"
    @click="toggleDisplay"
  >
    <div class="h-8 flex flex-row justify-between items-center">
      <div
        class="flex items-center gap-4"
        :class="[!selected ? 'f_text_neutral_900' : 'basic_text_white']"
      >
        <GroupIcon :name="iconName" iconWidth="1.5rem" iconHeight="1.5rem" />
        <span class="h3_bold_18">
          {{ os_name }}
        </span>
      </div>
      <div
        class="f_neutral_80 border_small text-center h-7 w-[6.313rem] p-[0.125rem]"
      >
        <span class="text_bold_14 f_text_neutral_900">
          {{ numberOfCases > 1 ? numberOfCases + " Cases" : "1 Case" }}
        </span>
      </div>
    </div>
    <div class="h-[4.8125rem] flex flex-row items-end gap-6">
      <div class="text-center w-[10.313rem] h-[4.8125rem] flex items-end">
        <canvas
          :id="'chart-' + id"
          style="width: 10.313rem; height: 4.8125rem"
          class="font-lato font-bold leading-6 tracking-[0.0625rem] text-[2rem]"
        ></canvas>
      </div>
      <div
        class="w-[6.5rem] flex flex-col justify-center items-center p-1"
        :class="[!selected ? 'f_text_neutral_900' : 'basic_text_white']"
      >
        <div class="flex flex-row justify-center items-center gap-2">
          <font-awesome-icon
            :icon="{ prefix: 'far', iconName: 'arrow-up' }"
            class="status_text_pass_100 h-[1.5rem] w-[1.5rem] text-[1.5rem]"
          />
          <span class="rate_bold_36 uppercase">30%</span>
        </div>
        <span class="text_regular_14">Success Rate</span>
      </div>
    </div>
  </div>
</template>

<!-- params
line 2: id-number 
line 5: iconName and classes?
line 6: OS Name 
line 9: #cases -> line 2-9: depends on OS config; set only once and update if config gets updated
line 13: chart -> depends on success rate
line 17: iconName and classes? -> depends on success rate
line 18: pass percentage  -> api request
-->

<script lang="ts" setup>
const props = defineProps({
  id: Number,
  iconName: String,
  os_name: String,
  numberOfCases: Number,
  selected: {
    default: true,
    type: Boolean,
  },
});

const emits = defineEmits(["update:display"]);

const getIcon = (iconName: string) => {
  if (iconName === "desktop") {
    return {
      prefix: "fas",
      iconName: "display",
    };
  } else {
    return {
      prefix: "fab",
      iconName: iconName,
    };
  }
};

const toggleDisplay = () => {
  emits("update:display", { selected: !props.selected, id: props.id });
};

onMounted(() => {
  setTimeout(() => {
    useOverviewChart(String(props.id));
  }, 1);
});
</script>
