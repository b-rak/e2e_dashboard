<template>
  <div
    class="py-3 px-6 border_small flex items-center justify-center f_text_neutral_900 h3_bold_18 h-[2.25rem] whitespace-nowrap"
  >
    {{ numberOfCases > 1 ? numberOfCases + " " + type + "s" : "1 " + type }}
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  numberOfCases: number;
  type: String;
}>();
</script>
