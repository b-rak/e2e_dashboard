<template>
  <div
    class="f_neutral_80 mt-36 border_large shadow_light_1 pb-9 mx-[7.5rem] w-auto"
  >
    <div class="flex flex-row justify-between items-center px-6 pt-6 pb-3">
      <span class="h2_bold_28 f_text_neutral_900">
        <font-awesome-icon
          :icon="{ prefix: 'fas', iconName: 'desktop' }"
          class="f_text_neutral_900 h-[2.375rem] w-[2.438rem]"
        />
        Web
      </span>
      <div
        class="flex items-center justify-center bg_light border_large h-[2.313rem] w-[8.5rem] py-3 px-6"
      >
        <span class="h3_bold_18 f_text_neutral_900">12 Cases</span>
      </div>
    </div>
    <!--div class="py-0 px-6 mt-6 flex flex-row justify-center max-md:justify-start flex-wrap gap-x-[26px] gap-y-6"-->
    <!--div class="py-0 px-6 mt-6 grid gap-x-[26px] gap-y-6 w-auto justify-around" style="grid-template-columns: repeat(auto-fill, 386px);">   Grid Lösung: funktioniert, aber verteilt den freien Space gleichmäßig wobei die Elemente gleich groß bleiben -->
    <div
      class="py-0 px-6 mt-6 grid gap-x-[1.625rem] gap-y-6 w-auto justify-center"
      style="grid-template-columns: repeat(auto-fill, minmax(24.125rem, 1fr))"
    >
      <Testcase-Kachel v-for="index in 10" :key="index" :id="index" />
    </div>
  </div>
</template>
