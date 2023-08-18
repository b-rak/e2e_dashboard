<template>
  <div class="flex flex-col gap-8 pt-9 pb-[7.5rem] bg_light">
    <!-- 1. Breadcrumb -->
    <div
      class="flex items-center gap-6 text_regular_16 f_text_neutral_400 cursor-pointer"
      @click="() => navigateTo('/testfaelle')"
    >
      <font-awesome-icon
        :icon="['fas', 'angle-left']"
        class="h-6 w-4 text-[1.5rem]"
      />
      <span>Zurück zu Testfälle</span>
    </div>

    <!-- 2. Case Name plus Subcases -->
    <div class="flex justify-between">
      <div class="f_text_neutral_900 flex items-center gap-6">
        <GroupIcon :name="iconName" iconWidth="3rem" iconHeight="3rem" />
        <span class="text-[2.5rem] font-semibold font-lora">
          {{ testcaseName }}
        </span>
      </div>
      <CaseIndicator numberOfCases="10" type="Subcase" class="f_neutral_80" />
    </div>

    <!-- 3. Bar Chart and Pie Chart -->
    <div
      class="flex flex-col items-start gap-8 w-full f_neutral_80 px-6 py-8 border_medium"
    >
      <div class="flex justify-center items-center gap-6">
        <font-awesome-icon
          :icon="['far', 'chart-line']"
          class="w-8 h-8 text-[2rem]"
        />
        <span class="h2_bold_28 f_text_neutral_900"> Results</span>
      </div>
      <div class="flex w-full gap-8">
        <div class="w-full py-8 px-6 basic_white border_small shadow_light_2">
          <div class="flex justify-between items-center">
            <span class="h3_bold_18 f_text_neutral_900"
              >Zeitlicher Verlauf</span
            >
            <font-awesome-icon
              :icon="{ prefix: 'far', iconName: 'circle-info' }"
              class="f_text_neutral_900 h-6 w-6 cursor-pointer text-[1.5rem]"
            />
          </div>
          <div>
            <canvas
              id="bar-chart-Web1"
              style="width: 100%; height: 9.1875rem"
              class="mt-[5.44rem] mb-[4.133rem]"
            >
            </canvas>
          </div>
        </div>
        <div
          class="w-[21.3rem] px-6 py-8 basic_white border_small flex flex-col items-center gap-8 shadow_light_2"
        >
          <div class="flex flex-col items-start self-stretch gap-6">
            <span class="h3_bold_18 basic_text_black">Verteilung</span>
            <select
              name="Verteilung"
              id="Verteilung-select"
              class="py-2 pr-2 pl-4 f_neutral_80 w-[11.25rem] border_medium appearance-none caret"
              @change="drawChart"
            >
              <option value="Letzter Tag">Letzter Tag</option>
              <option value="Letzten 7 Tage">Letzten 7 Tage</option>
              <option value="Letzten 30 Tage">Letzten 30 Tage</option>
            </select>
          </div>
          <div style="position: relative; width: 17.125rem; height: 136px">
            <canvas id="doughnut"></canvas>
          </div>
          <div class="flex items-start gap-7">
            <div class="status_bold_12">
              <font-awesome-icon
                :icon="['fas', 'circle']"
                class="status_text_pass_100 h-3 w-3"
              />
              PASSED
            </div>
            <div class="status_bold_12">
              <font-awesome-icon
                :icon="['fas', 'circle']"
                class="status_text_fail_100 h-3 w-3"
              />
              FAILED
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 4. Results -->
    <div
      class="f_neutral_80 border_medium py-8 px-6 flex flex-col items-start gap-8 w-full"
    >
      <div class="flex justify-center items-center gap-6">
        <font-awesome-icon
          :icon="['far', 'chart-line']"
          class="w-8 h-8 text-[2rem]"
        />
        <span class="h2_bold_28 f_text_neutral_900"> Results</span>
      </div>
      <div
        class="flex flex-col items-start py-6 border_small basic_white w-full shadow_light_2"
      >
        <div
          class="flex gap-8 py-3 px-3 border-b border-solid f_border_neutral_80 w-full"
        >
          <div class="w-[4.5rem] basic_white"></div>
          <div class="text_regular_16 f_text_neutral_900 pr-[1.25rem]">
            Status
          </div>
          <div class="text_regular_16 f_text_neutral_900 w-[20.6875rem] grow">
            Subcase
          </div>
          <div class="text_regular_16 f_text_neutral_900 w-[45rem] grow">
            Runtime
          </div>
          <div
            class="text_regular_16 f_text_neutral_900 pl-[6.125rem] mr-[8.625rem]"
          >
            Attachment
          </div>
        </div>
        <Subcase v-for="i in 6" :id="i" :key="i" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.caret {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='25' height='24' viewBox='0 0 25 24' fill='none'%3e%3cpath d='M12.5 14.5L17.5 9.5H7.5L12.5 14.5Z' fill='%23053240'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-size: 1.5rem 1.5rem;
  background-position: calc(100% - 16px);
}
</style>

<script lang="ts" setup>
const numberOfSubcases = 12;
onMounted(() => {
  setTimeout(() => {
    useChart("Web1", 85); // TODO: 85 results; display tooltip
    useDoughnutChart([140, 0], false);
  }, 1);
});

const drawChart = (event: Event) => {
  let data: [number, number];
  if ((event.target as HTMLSelectElement).selectedIndex === 0) {
    data = [140, 0];
  } else if ((event.target as HTMLSelectElement).selectedIndex === 1) {
    data = [900, 80];
  } else if ((event.target as HTMLSelectElement).selectedIndex === 2) {
    data = [4000, 200];
  } else {
    data = [0, 0];
  }
  useDoughnutChart(data, true);
};

definePageMeta({
  middleware: "details",
});

const props = withDefaults(
  defineProps<{
    iconName?: String;
    testcaseName?: String;
  }>(),
  {
    iconName: () => store.icon,
    testcaseName: () => store.name,
  }
);
</script>

<script lang="ts">
import { useDoughnutChart } from "~/composables/useChart";
import { useDetailsStore } from "~/stores/details";
const store = useDetailsStore();
</script>
