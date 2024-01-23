<template>
  <footer
    class="h-[4.625rem] flex items-center py-[1.312rem] text_regular_18"
    :class="[
      breakpoint.viewport === 'xs' || breakpoint.viewport === 'sm'
        ? 'flex-col-reverse justify-center'
        : 'justify-between',
    ]"
  >
    <span class="f_text_neutral_700 h-8">© 2024 appmatics</span>
    <div class="flex justify-between w-[22.375rem] f_text_neutral_900 h-8">
      <NuxtLink
        to="https://www.appmatics.de"
        id="appmatics-homepage"
        class="cursor-pointer f_text_neutral_700"
        target="_blank"
        >Appmatics</NuxtLink
      >
      <NuxtLink
        to="https://www.appmatics.com/de/datenschutz"
        id="appmatics-homepage"
        class="cursor-pointer f_text_neutral_700"
        target="_blank"
        >Datenschutz</NuxtLink
      >
      <NuxtLink
        to="https://www.appmatics.com/de/impressum"
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
