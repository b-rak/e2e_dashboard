<template>
  <div class="flex flex-col gap-6">
    <div
      class="mt-10 px-6 py-8 border_medium f_neutral_80 flex justify-between"
    >
      <CustomerHeader
        customerName="Appmatics"
        pageTitle="E2E Dashboard"
        imagePath="./img/logo.png"
      />
      <ExportButton buttonText="Export as JPG" />
    </div>
    <div class="flex gap-6">
      <!-- OS Übersicht -->
      <div
        class="p-6 border_medium f_neutral_80 h-[45rem] w-[16.5rem] flex flex-col gap-6"
      >
        <Heading-2 titleText="Testfallvergleich" class="h-10" />
        <div class="flex flex-col gap-8">
          <div
            class="px-3 pt-3 pb-3 border_small shadow_light_2 basic_white flex flex-col items-center justify-start gap-4"
          >
            <div
              class="w-[8.5rem] h-8 flex gap-4 items-center justify-start f_text_neutral_900"
            >
              <div class="h-6 flex justify-center items-center">
                <DevicesIcon />
              </div>
              <span class="h3_bold_18">Gesamt</span>
            </div>
            <SuccessRate :selected="false" />
          </div>
          <!--GesamtKachel class="min-w-[13.5rem]" positionHeading="start" /-->
          <OSPerformance os_name="Web" iconName="desktop" />
          <OSPerformance os_name="iOS" iconName="apple" />
          <OSPerformance os_name="Android" iconName="android" />
        </div>
      </div>

      <!-- Charts: Vergleich und Quote -->
      <div class="flex flex-col gap-6">
        <div
          class="p-6 border_medium f_neutral_80 w-[51.75m] h-[25.25rem] flex flex-col gap-6"
        >
          <div class="flex justify-between items-center">
            <Heading-2 titleText="Testfallvergleich" />
            <div class="flex">
              <div
                class="px-3 py-1 rounded-l-lg status_bold_12"
                :class="[
                  togglePassed
                    ? 'status_pass_100 basic_text_white'
                    : 'f_neutral_90 f_text_neutral_500',
                ]"
                @click="togglePassed ? '' : (togglePassed = true)"
              >
                PASSED
              </div>
              <div
                class="px-3 py-1 rounded-r-lg status_bold_12"
                :class="[
                  !togglePassed
                    ? 'status_fail_100 basic_text_white'
                    : 'f_neutral_90 f_text_neutral_500',
                ]"
                @click="togglePassed ? (togglePassed = false) : ''"
              >
                FAILED
              </div>
            </div>
          </div>
          <PolarAreaChart />
        </div>
        <div
          class="p-6 border_medium f_neutral_80 w-[51.75rem] flex flex-col gap-6"
        >
          <Heading-2 titleText="Zeitlicher Verlauf der Erfolgsquote" />
          <div class="p-3 flex flex-col gap-6 border_small basic_white">
            <div v-for="i in 3" :key="i" class="flex items-center gap-6">
              <div class="flex items-center gap-4 f_text_neutral_900 h-6">
                <GroupIcon
                  name="desktop"
                  iconWidth="1.5rem"
                  iconHeight="1.5rem"
                />
                <span class="h3_bold_18">Web</span>
              </div>
              <div class="w-full f_neutral_80 h-9">ChartJS</div>
              <div>
                <div class="flex justify-center items-center gap-4">
                  <font-awesome-icon
                    :icon="{ prefix: 'far', iconName: 'arrow-up' }"
                    class="h-[1.5rem] w-[1.5rem] text-[1.5rem]"
                    :class="[
                      iconName === 'arrow-up'
                        ? 'status_text_pass_100'
                        : 'status_text_fail_100',
                    ]"
                  />
                  <span class="rate_bold_28 uppercase">30%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Ticker -->
      <div
        class="p-6 border_medium f_neutral_80 w-[33.75rem] flex flex-col gap-6 h-[45rem]"
      >
        <Heading-2 titleText="Ticker" />
        <div class="overflow-y-scroll">
          <div
            class="basic_white border_small px-4 py-3 flex flex-col items-start gap-3 w-[28.75rem]"
          >
            <TickerResult />
            <TickerResult />
            <TickerResult />
            <TickerResult />
            <TickerResult />
            <TickerResult />
            <TickerResult />
            <TickerResult />
            <TickerResult />
            <TickerResult />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const togglePassed = ref(true);
const iconName = ref("arrow-up");
</script>

<style scoped>
::-webkit-scrollbar {
  width: 7px;
  background-color: rgba(0, 0, 0, 0);
  -webkit-appearance: none;
}

::-webkit-scrollbar-thumb {
  background-color: #fcfcfc;
  border-radius: 0.75rem;
}

::-webkit-scrollbar-track {
  background-color: #cbd0d4;
  border-radius: 0.75rem;
}
</style>
