<template>
  <footer
    class="h-[4.625rem] flex items-center py-[1.312rem] text_regular_18"
    :class="[
      breakpoint.viewport === 'xs' || breakpoint.viewport === 'sm'
        ? 'flex-col-reverse'
        : 'justify-between',
    ]"
  >
    <span class="f_text_neutral_700 h-8">2023 ©appmatics</span>
    <div class="flex justify-between w-[22.375rem] f_text_neutral_900 h-8">
      <span class="cursor-pointer">Support</span>
      <span class="cursor-pointer">Report a problem</span>
      <span class="cursor-pointer">Contact us</span>
    </div>
  </footer>
</template>

<script lang="ts" setup>
const breakpoint = useBreakpoint().breakpoints;
</script>
