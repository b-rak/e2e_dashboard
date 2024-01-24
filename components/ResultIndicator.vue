<template>
  <div
    :class="useResultColor(result)"
    class="flex items-center justify-center status_bold_12 basic_text_white border_xsmall"
  >
    {{ result }}
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  result: string;
}>();
</script>
