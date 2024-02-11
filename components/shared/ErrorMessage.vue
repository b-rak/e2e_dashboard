<template>
  <span
    v-if="message"
    class="text_regular_16 f_text_secondary_00 block w-full p-2"
    >{{ message }}</span
  >
</template>

<script lang="ts" setup>
const props = defineProps<{
  message: String;
}>();
</script>
