<template>
  <h2 class="h2_bold_28">{{ titleText }}</h2>
</template>

<script lang="ts" setup>
const props = defineProps<{
  titleText: String;
}>();
</script>
