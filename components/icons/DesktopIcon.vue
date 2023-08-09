<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 0 24 24"
  >
    <path
      d="M17 21H7V19H9V18H3C1.89543 18 1 17.1046 1 16V4.99998C1 3.89542 1.89543 2.99998 3 2.99998H21C22.1046 2.99998 23 3.89542 23 4.99998V16C23 17.1046 22.1046 18 21 18H15V19H17V21ZM3 4.99998V16H21V4.99998H3Z"
      fill="currentColor"
    />
  </svg>
</template>

<script lang="ts" setup>
const props = defineProps<{
  height: String;
  width: String;
}>();
</script>
