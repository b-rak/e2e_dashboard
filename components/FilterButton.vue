<template>
  <button
    class="flex items-center py-2 px-6 gap-2 border_medium h-[3.375rem] whitespace-nowrap button_bold_16 text-center border-2 border-solid"
    :class="[
      selected ? `basic_text_white ${colorBGClass}` : colorTextClass,
      colorBorderClass,
    ]"
    @click="updateSelected"
  >
    <template v-if="iconName !== ''">
      <GroupIcon
        v-if="iconName !== 'devices'"
        :name="iconName"
        iconWidth="1.5rem"
        iconHeight="1.5rem"
      />
      <DevicesIcon v-else height="1.5rem" width="1.5rem" />
    </template>
    {{ buttonText }}
  </button>
</template>

<script lang="ts" setup>
const props = defineProps<{
  buttonText: string;
  iconName: string;
  selected: boolean;
  color: string;
}>();

const colorBGClass =
  props.color !== "" ? `status_${props.color}_100` : "f_neutral_500";
const colorTextClass =
  props.color !== "" ? `status_text_${props.color}_100` : "f_text_neutral_500";
const colorBorderClass =
  props.color !== ""
    ? `status_border_${props.color}_100`
    : "f_border_neutral_500";

const emits = defineEmits(["update:selected"]);
const updateSelected = () => {
  emits("update:selected", {
    buttonText: props.buttonText,
    selected: !props.selected,
  });
};
</script>
