<template>
  <h1 class="h2_bold_28 text-center">Support</h1>
  <Construction />
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
});

const breakpoint = useBreakpoint();
</script>
