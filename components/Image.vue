<template>
  <div class="flex justify-center items-center h-full">
    <img :src="src" :alt="alt" class="w-[32rem]" />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  src: string;
  alt: string;
}>();
</script>
