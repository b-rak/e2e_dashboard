<template>
  <div class="w-fit relative">
    <button
      type="button"
      class="mr-auto border border-solid p-2 border_small bg_light shadow_light_2"
      @click="toggleDropdown"
    >
      {{ buttonName }}
      <font-awesome-icon
        :icon="{
          prefix: 'far',
          iconName: 'angle-down',
        }"
        class="h-4 w-4 transition-[transform] duration-100 ease-linear"
        :id="'arrow-' + type"
      />
    </button>
    <ul
      v-show="showDropdown"
      class="border_small shadow_light_2 w-fit z-2 absolute basic_white f_border_neutral_500"
    >
      <FilterOption
        v-for="(filter, index) of filters"
        :optionText="filter.optionText"
        :iconName="filter.iconName"
        :selected="filter.selected"
        :color="filter.color"
        :class="{
          'border-b': index !== Object.keys(filters).length - 1,
          'rounded-b-lg': index === Object.keys(filters).length - 1,
          'rounded-t-lg': index === 0,
        }"
        @update:selected="updateDisplay"
      />
    </ul>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  type: string;
  buttonName: string;
}>();
const showDropdown = ref(false);

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;

  const arrowElement = document.getElementById(
    "arrow-" + props.type
  ) as HTMLElement;
  arrowElement.classList.toggle("rotate-180");
};

const statusFilters = [
  reactive({
    optionText: "Gesamt",
    iconName: "",
    color: "",
    selected: true,
  }),
  reactive({
    optionText: "Passed",
    iconName: "",
    color: "status_pass_100",
    selected: false,
  }),
  reactive({
    optionText: "Failed",
    iconName: "",
    color: "status_fail_100",
    selected: false,
  }),
  reactive({
    optionText: "Warning",
    iconName: "",
    color: "status_warning_100",
    selected: false,
  }),
  reactive({
    optionText: "Skipped",
    iconName: "",
    color: "status_skip_100",
    selected: false,
  }),
];
const groupFilters = [
  reactive({
    optionText: "Gesamt",
    iconName: "devices",
    color: "",
    selected: true,
  }),
  reactive({
    optionText: "Web",
    iconName: "desktop",
    color: "",
    selected: false,
  }),
  reactive({
    optionText: "iOS",
    iconName: "apple",
    color: "",
    selected: false,
  }),
  reactive({
    optionText: "Android",
    iconName: "android",
    color: "",
    selected: false,
  }),
];

const filters: Array<FilterOption> =
  props.type === "OS" ? groupFilters : statusFilters;

type FilterOption = {
  optionText: string;
  iconName: string;
  color: string;
  selected: boolean;
};

const updateDisplay = (obj: FilterOption) => {
  if (obj.optionText === "Gesamt") {
    (
      filters.find((filter) => filter.optionText === "Gesamt") as FilterOption
    ).selected = true;
    deselectAllButtons();
  } else {
    (
      filters.find(
        (filter) => filter.optionText === obj.optionText
      ) as FilterOption
    ).selected = obj.selected;
    (
      filters.find((filter) => filter.optionText === "Gesamt") as FilterOption
    ).selected = false;
    if (allButtonsSelected() || allButtonsDeselected()) {
      deselectAllButtons();
    }
  }
};

const allButtonsSelected = () => {
  for (const filter of filters) {
    if (filter.optionText === "Gesamt") continue;
    if (filter.selected === false) return false;
  }
  return true;
};

const allButtonsDeselected = () => {
  for (const filter of filters) {
    if (filter.optionText === "Gesamt") continue;
    if (filter.selected === true) return false;
  }
  return true;
};

const deselectAllButtons = () => {
  for (const filter of filters) {
    filter.selected = filter.optionText === "Gesamt" ? true : false;
  }
};
</script>
