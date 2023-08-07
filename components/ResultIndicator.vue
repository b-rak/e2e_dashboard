<template>
  <div
    :class="{ status_fail_100: !result, status_pass_100: result }"
    class="flex items-center justify-center status_bold_12 basic_text_white border_xsmall"
  >
    {{ result ? "PASSED" : "FAILED" }}
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  result: Boolean;
}>();
</script>
