<template>
  <div
    :id="`os-${id}`"
    class="w-[22.188rem] h-[9.438rem] border_medium shadow_light_3 my-auto flex flex-col gap-3"
    :class="[!selected ? 'basic_white' : 'f_neutral_900 h-[10.5rem]']"
    @click="toggleDisplay"
  >
    <div class="flex flex-row justify-between items-center mx-4 my-2">
      <span
        class="h3_bold_18"
        :class="[!selected ? 'f_text_neutral_900' : 'basic_text_white']"
      >
        <font-awesome-icon
          :icon="getIcon(iconName)"
          class="h-[1rem] w-[1rem] fa-xl"
        />
        {{ os_name }}
      </span>
      <div
        class="f_neutral_80 border_small text-center h-7 w-[6.313rem] p-[0.125rem]"
      >
        <span class="text_bold_14 f_text_neutral_900">
          {{ numberOfCases > 1 ? numberOfCases + " Cases" : "1 Case" }}
        </span>
      </div>
    </div>
    <div class="h-3/5 flex flex-row justify-between items-center mx-4">
      <div
        class="h-full w-[10.313rem] bg-slate-200 text-center flex flex-row justify-center items-center rounded-xl"
      >
        Chart JS
      </div>

      <div
        class="h-14 w-[6.5rem] flex flex-col justify-center items-center"
        :class="[!selected ? 'f_text_neutral_900' : 'basic_text_white']"
      >
        <div class="flex flex-row justify-center items-center gap-2">
          <font-awesome-icon
            :icon="{ prefix: 'fas', iconName: 'arrow-up' }"
            class="status_text_pass_100 h-[0.938rem] w-[0.688rem]"
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
      iconName: "desktop",
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
</script>
