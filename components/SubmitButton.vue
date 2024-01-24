<!-- use the slot to insert icons next to the text on the button -->
<template>
  <button
    type="submit"
    class="mt-12 border_medium f_secondary_00 w-full py-4 button_semibold_16 basic_text_white"
  >
    {{ buttonText }}
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
const props = defineProps<{
  buttonText: String;
}>();
</script>
