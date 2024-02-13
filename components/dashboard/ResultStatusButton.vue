<template>
  <div
    class="px-3 py-1 status_bold_12 w-24 text-center"
    :class="[
      selected
        ? `${color} basic_text_white`
        : 'f_neutral_90 f_text_neutral_500',
    ]"
  >
    {{ status }}
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  status: string;
  color: string;
  selected: boolean;
}>();
</script>
