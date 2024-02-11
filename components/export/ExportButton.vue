<template>
  <button
    id="export"
    class="flex items-center h-[3.375rem] whitespace-nowrap py-3 px-6 gap-2 border_medium f_neutral_500 button_semibold_16 text-center basic_text_white"
    @click="exportData"
  >
    <font-awesome-icon
      :icon="{
        prefix: 'fas',
        iconName: 'arrow-up-right-from-square',
      }"
      class="h-4 w-4"
    />
    {{ buttonText }}
  </button>
</template>

<script lang="ts" setup>
const props = defineProps<{
  buttonText: String;
}>();

const exportData = () => {};
</script>
