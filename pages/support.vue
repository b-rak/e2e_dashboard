<template>
  <h1 class="h2_bold_28 text-center">Support</h1>
  <!--br />
  <br />
  <span class="h2_medium_28 w-full flex justify-center"
    >There is no support for you here...</span
  >
  <div class="flex items-center justify-center w-full h-60">
    <font-awesome-icon
      :icon="['fas', 'poo']"
      class="text-[5rem] text-amber-950"
    />
  </div-->
  <div class="py-8 flex flex-col gap-4 h-screen">
    <div class="w-full h-32 rounded-xl bg-slate-500 text-center">
      This is the header
      <OS_KachelTest
        :key="1"
        :config="config"
        :ratios="dashboardsRatio"
        @update:display="() => console.log('hello')"
        :selected="false"
        class="mt-8"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const config = {
  id: 1,
  dashboardId: 4,
  iconName: "desktop",
  os_name: "Web",
  numberOfCases: 5,
  selected: ref(false),
};
const dashboardsRatio = await useTwoLatestCaseResult();
definePageMeta({
  middleware: ["auth"],
});

const breakpoint = useBreakpoint();
</script>
