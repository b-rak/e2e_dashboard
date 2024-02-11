<template>
  <div
    class="px-3 py-1 rounded-l-lg status_bold_12"
    :class="[
      togglePassed
        ? 'status_pass_100 basic_text_white'
        : 'f_neutral_90 f_text_neutral_500',
    ]"
    @click="togglePassed ? '' : (togglePassed = true)"
  >
    PASSED
  </div>
  <div
    class="px-3 py-1 rounded-r-lg status_bold_12"
    :class="[
      !togglePassed
        ? 'status_fail_100 basic_text_white'
        : 'f_neutral_90 f_text_neutral_500',
    ]"
    @click="togglePassed ? (togglePassed = false) : ''"
  >
    FAILED
  </div>
</template>

<script lang="ts" setup>
const togglePassed = ref(true);
const emits = defineEmits(["toggleResultSwitch"]);

const toggleSwitch = {};
</script>
