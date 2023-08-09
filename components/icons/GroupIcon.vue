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
    :width="getAndroidSize(iconWidth)"
    :height="getAndroidSize(iconHeight)"
  />
</template>

<script lang="ts" setup>
const props = defineProps<{
  name: String;
  iconHeight: String;
  iconWidth: String;
}>();

const getAndroidSize = (initialRem: String) => {
  if (initialRem === "3rem") {
    return "2.5rem";
  } else if (initialRem === "2rem") {
    return "1.75rem";
  } else if (initialRem === "1.5rem") {
    return "1.5rem";
  }
};
</script>
