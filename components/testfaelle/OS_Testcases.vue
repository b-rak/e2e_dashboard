<template>
  <div class="f_neutral_80 border_medium flex flex-col gap-8 px-6 py-8">
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
        v-for="(testcase, index) in cases"
        :key="index"
        :id="index"
        :testcaseName="testcase.readableName"
        :groupName="name"
        :icon="iconName"
        :dashboardCase="{ dashboardId, caseId: testcase.id }"
        :lastResults="lastResults(testcase)"
        @go-to:details="goToDetails"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  name: string;
  iconName: string;
  dashboardId: number;
}>();
const cases = await useCases(props.dashboardId);
const numberOfCases = cases.length;

const results = await useStepsRatio({
  limit: 50,
});

const lastResults = (testcase: Case) => {
  return results.find((element) => element.caseId === testcase.id)?.results;
};

const emits = defineEmits(["goTo:details"]);
const goToDetails = (obj: Object) => {
  emits("goTo:details", obj);
};
</script>
