<template>
  <div class="flex cursor-pointer">
    <ResultStatusButton
      status="PASSED"
      color="status_pass_100"
      :selected="selectedStatus === 'PASSED'"
      class="rounded-l-lg"
      @click="selectStatus('PASSED')"
    />
    <ResultStatusButton
      status="FAILED"
      color="status_fail_100"
      :selected="selectedStatus === 'FAILED'"
      @click="selectStatus('FAILED')"
    />
    <ResultStatusButton
      status="WARNING"
      color="status_warning_100"
      :selected="selectedStatus === 'WARNING'"
      @click="selectStatus('WARNING')"
    />
    <ResultStatusButton
      status="SKIPPED"
      color="status_skip_100"
      :selected="selectedStatus === 'SKIPPED'"
      class="rounded-r-lg"
      @click="selectStatus('SKIPPED')"
    />
  </div>
</template>

<script lang="ts" setup>
const emits = defineEmits(["selectStatus"]);
const selectedStatus = ref("PASSED");

const selectStatus = (status: string) => {
  selectedStatus.value = status;
  emits("selectStatus", selectedStatus.value);
};
</script>
