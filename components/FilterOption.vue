<template>
  <li
    class="px-4 py-2 flex gap-2 items-center"
    :class="{ f_neutral_500: selected }"
    @click="updateSelected"
  >
    <template v-if="iconName !== ''">
      <GroupIcon
        v-if="iconName !== 'devices'"
        :name="iconName"
        iconWidth="1.5rem"
        iconHeight="1.5rem"
        :class="{ basic_text_white: selected }"
      />
      <DevicesIcon
        v-else
        height="1.5rem"
        width="1.5rem"
        :class="{ basic_text_white: selected }"
      />
    </template>
    <div v-else class="border_xsmall p-2 w-6 h-6" :class="[color]"></div>
    <span class="text_regular_16" :class="{ basic_text_white: selected }">{{
      optionText
    }}</span>
  </li>
</template>

<script lang="ts" setup>
const props = defineProps<{
  optionText: string;
  iconName: string;
  selected: boolean;
  color: string;
}>();

const emits = defineEmits(["update:selected"]);
const updateSelected = () => {
  emits("update:selected", {
    optionText: props.optionText,
    selected: !props.selected,
  });
};
</script>
