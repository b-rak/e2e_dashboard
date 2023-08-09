<template>
  <div
    class="f_neutral_80 border_medium shadow_light_1 flex flex-col gap-8 px-6 py-8"
  >
    <div class="flex justify-between items-center">
      <div class="f_text_neutral_900 flex items-center gap-6">
        <GroupIcon :name="iconName" iconWidth="2rem" iconHeight="2rem" />
        <span class="h2_bold_28">
          {{ name }}
        </span>
      </div>

      <CaseIndicator
        type="Case"
        :numberOfCases="numberOfCases"
        class="bg_light"
      />
    </div>
    <!--div class="py-0 px-6 mt-6 flex flex-row justify-center max-md:justify-start flex-wrap gap-x-[26px] gap-y-6"-->
    <!--div class="py-0 px-6 mt-6 grid gap-x-[26px] gap-y-6 w-auto justify-around" style="grid-template-columns: repeat(auto-fill, 386px);">   Grid Lösung: funktioniert, aber verteilt den freien Space gleichmäßig wobei die Elemente gleich groß bleiben -->
    <div
      class="grid gap-x-[1.625rem] gap-y-6 justify-center"
      style="grid-template-columns: repeat(auto-fill, minmax(24.125rem, 1fr))"
    >
      <Testcase-Kachel
        v-for="index in parseInt(numberOfCases)"
        :key="index"
        :id="index"
        :groupName="name"
        :icon="iconName"
        @go-to:details="goToDetails"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  name: String;
  iconName: String;
  numberOfCases: Number;
}>();

const emits = defineEmits(["goTo:details"]);
const goToDetails = (obj: Object) => {
  console.log("EMITT 222222");
  console.log(obj);
  emits("goTo:details", obj);
};
</script>

<!-- 
- Group Name and Icon
- #Testcases
- active/displayed status?
-->
