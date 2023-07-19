<template>
  <div
    class="w-11 h-11 cursor-pointer border rounded f_border_neutral_500 f_neutral_500 flex items-center justify-center"
  >
    <font-awesome-icon
      :icon="{ prefix: type, iconName: iconName }"
      class="basic_text_white h-8 w-8 text-[1.75rem]"
    />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  iconName: String;
  type: String;
}>();
</script>
