<template>
  <div
    class="flex flex-col gap-4 basic_white border_small shadow_light_2 px-3 pt-3 pb-4"
  >
    <div class="flex items-center gap-4 f_text_neutral_900 h-6">
      <GroupIcon :name="iconName" iconWidth="1.5rem" iconHeight="1.5rem" />
      <span class="h3_bold_18">
        {{ os_name }}
      </span>
    </div>
    <div class="flex gap-x-[0.20813rem] gap-y-2 flex-wrap">
      <div class="w-6 h-6 border_xsmall status_fail_100"></div>
      <div class="w-6 h-6 border_xsmall status_fail_100"></div>
      <div class="w-6 h-6 border_xsmall status_pass_100"></div>
      <div class="w-6 h-6 border_xsmall status_pass_100"></div>
      <div class="w-6 h-6 border_xsmall status_pass_100"></div>
      <div class="w-6 h-6 border_xsmall status_pass_100"></div>
      <div class="w-6 h-6 border_xsmall status_pass_100"></div>
      <div class="w-6 h-6 border_xsmall status_pass_100"></div>
      <div class="w-6 h-6 border_xsmall status_fail_100"></div>
      <div class="w-6 h-6 border_xsmall status_pass_100"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  os_name: String;
  iconName: String;
}>();
</script>
