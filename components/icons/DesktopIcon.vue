<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 0 25 25"
  >
    <path
      d="M17.5 21.5H7.5V19.5H9.5V18.5H3.5C2.39543 18.5 1.5 17.6046 1.5 16.5V5.5C1.5 4.39543 2.39543 3.5 3.5 3.5H21.5C22.6046 3.5 23.5 4.39543 23.5 5.5V16.5C23.5 17.6046 22.6046 18.5 21.5 18.5H15.5V19.5H17.5V21.5ZM3.5 5.5V16.5H21.5V5.5H3.5Z"
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
