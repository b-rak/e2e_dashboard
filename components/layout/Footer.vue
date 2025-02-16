<template>
  <footer
    class="h-[4.625rem] flex items-center py-[1.312rem] text_regular_18"
    :class="[
      breakpoint.viewport === 'xs' || breakpoint.viewport === 'sm'
        ? 'flex-col-reverse justify-center'
        : 'justify-between',
    ]"
  >
    <span class="f_text_neutral_700 h-8">© 2025 test company</span>
    <div class="flex justify-between w-[22.375rem] f_text_neutral_900 h-8">
      <NuxtLink
        to=""
        id="appmatics-homepage"
        class="cursor-pointer f_text_neutral_700"
        target="_blank"
        >Test Company</NuxtLink
      >
      <NuxtLink
        to="https://www.burak-tas.com"
        id="appmatics-homepage"
        class="cursor-pointer f_text_neutral_700"
        target="_blank"
        >Datenschutz</NuxtLink
      >
      <NuxtLink
        to="https://www.burak-tas.com"
        id="appmatics-homepage"
        class="cursor-pointer f_text_neutral_700"
        target="_blank"
        >Impressum</NuxtLink
      >
    </div>
  </footer>
</template>

<script lang="ts" setup>
const breakpoint = useBreakpoint().breakpoints;
</script>
