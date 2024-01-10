<template>
  <div
    class="fixed top-0 bottom-0 left-0 right-0 flex justify-center bg-black/30 z-10 py-28"
    @click="$emit('close-modal')"
  >
    <div
      class="max-w-[96rem] p-16 bg_light shadow_light_2 border_small flex flex-col gap-8 overflow-y-auto"
      @click.stop
    >
      <div class="flex gap-6 h-8">
        <font-awesome-icon
          :icon="{
            prefix: 'fas',
            iconName: 'arrow-up-right-from-square',
          }"
          size="2xl"
        />
        <Heading-2 titleText="Export Data" />
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div class="flex gap-8 items-center">
          <span class="h3_medium_18 f_text_neutral_900">Filter:</span>
          <FilterDropdown type="OS" buttonName="Gruppe" />
          <FilterDropdown type="Status" buttonName="Status" />
        </div>
        <div class="ml-auto flex gap-6 items-center">
          <span class="h3_medium_18 f_text_neutral_900">Zeitraum:</span>
          <DateRangePicker />
        </div>
      </div>
      <div
        v-for="dashboard of dashboards"
        class="border_medium f_neutral_80 px-6 py-8 flex flex-col gap-6"
      >
        <div class="flex justify-between px-4">
          <div class="f_text_neutral_900 flex items-center gap-6">
            <Checkbox />
            <GroupIcon
              :name="dashboard.icon"
              iconWidth="2rem"
              iconHeight="2rem"
            />
            <span class="h2_bold_28">{{ dashboard.name }}</span>
          </div>
          <CaseIndicator numberOfCases="8" type="Case" class="bg_light" />
        </div>
        <div class="border_small bg_light">
          <div
            class="flex flex-col items-start py-6 border_small shadow_light_2"
          >
            <div
              class="flex gap-4 py-4 pr-[3.5rem] pl-[6.9375rem] border-b border-solid f_border_neutral_80 w-full"
            >
              <div class="text_regular_16 f_text_neutral_900 w-[4.4375rem]">
                Status
              </div>
              <div
                class="text_regular_16 f_text_neutral_900 w-[20.6875rem] grow"
              >
                Testcase
              </div>
              <div class="text_regular_16 f_text_neutral_900 pl-[6.125rem]">
                Subcases
              </div>
            </div>
            <ExportCase v-for="i in 2" :id="i" :key="i" />
          </div>
        </div>
      </div>
      <ExportButton buttonText="Export CSV" class="w-fit ml-auto" />
    </div>
    <font-awesome-icon
      :icon="{
        prefix: 'far',
        iconName: 'xmark',
      }"
      size=""
      @click="$emit('close-modal')"
      class="cursor-pointer text-[3.25rem] ml-4 mt-4 f_text_neutral_75"
    />
  </div>
</template>

<script lang="ts" setup>
const dashboards = [
  { name: "Web", icon: "desktop" },
  { name: "iOS", icon: "apple" },
  { name: "Android", icon: "android" },
]; //useDashboards();
const breakpoint = useBreakpoint();
</script>
