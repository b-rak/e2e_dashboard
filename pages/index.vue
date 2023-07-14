<template></template>

<script lang="ts" setup>
definePageMeta({
  middleware: [
    function () {
      return navigateTo("/dashboard");
    },
  ],
});
</script>
