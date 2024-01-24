<template>
  <DesktopIcon
    v-if="name === 'desktop'"
    :width="iconWidth"
    :height="iconHeight"
  />
  <IOSIcon
    v-else-if="name === 'apple'"
    :width="iconWidth"
    :height="iconHeight"
  />
  <AndroidIcon
    v-else-if="name === 'android'"
    :width="useRem() * getAndroidSize(iconWidth) + ''"
    :height="useRem() * getAndroidSize(iconHeight) + ''"
  />
  <img
    v-else
    :src="name"
    :width="iconWidth"
    :height="iconHeight"
    class="border_xsmall"
  />
</template>

<script lang="ts" setup>
const props = defineProps<{
  name: string;
  iconHeight: string;
  iconWidth: string;
}>();

const getAndroidSize = (initialPx: string): number => {
  // all numbers are rem values
  const initialRem = +initialPx / useRem();
  if (initialRem === 3) {
    return 2.5;
  } else if (initialRem === 2) {
    return 1.75;
  } else if (initialRem === 1.5) {
    return 1.5;
  } else {
    return 1.5; // default size
  }
};
</script>
