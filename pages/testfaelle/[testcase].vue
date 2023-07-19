<template>
  <div class="flex flex-col gap-9 pt-9 pb-[7.5rem] bg_light">
    <!-- 1. Breadcrumb -->
    <div class="flex items-center gap-6 text_regular_16 f_text_neutral_400">
      <font-awesome-icon
        :icon="['fas', 'angle-left']"
        class="h-6 w-4 text-[1.5rem]"
      />
      <span>Zurück zu Testfälle</span>
    </div>

    <!-- 2. Case Name plus Subcases -->
    <div class="flex justify-between">
      <span
        class="flex items-center gap-6 f_text_neutral_900 text-[2.5rem] font-semibold font-lora"
      >
        <font-awesome-icon
          v-if="true !== 'android'"
          :icon="getIcon('desktop')"
          class="h-11 w-11 fa-xl"
        />
        <AndroidIcon
          v-else
          class="h-[1.25rem] w-[1.25rem] inline-block"
          :class="[!selected ? 'f_text_neutral_900' : 'basic_text-white']"
        />
        {{ "Produkte" }}
      </span>
      <div
        class="flex items-center justify-center f_neutral_80 border_large h-[3rem] w-[8.5rem] p-4"
      >
        <span class="h3_bold_18 f_text_neutral_900">{{
          numberOfSubcases > 1 ? numberOfSubcases + " Subcases" : "1 Subcase"
        }}</span>
      </div>
    </div>

    <!-- 3. Bar Chart and Pie Chart -->
    <div class="flex gap-6 w-full f_neutral_80 px-6 py-9 border_large">
      <div class="w-full py-8 px-6 basic_white border_large">
        <div class="flex justify-between items-center">
          <span class="h2_bold_28 f_text_neutral_900">Results</span>
          <font-awesome-icon
            :icon="{ prefix: 'fas', iconName: 'circle-info' }"
            class="f_text_neutral_500 h-6 w-6 cursor-pointer text-[1.5rem]"
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
        class="w-[21.3rem] px-6 py-8 basic_white border_large flex flex-col gap-4"
      >
        <span class="h2_bold_28 basic_text_black">Verteilung</span>
        <select
          name="Verteilung"
          id="Verteilung-select"
          class="py-2 pr-2 pl-4 f_neutral_80 w-[11.25rem] mt-2 border_small appearance-none caret"
        >
          <option value="Letzter Tag">Letzter Tag</option>
          <option value="Letzten 7 Tage">Letzten 7 Tage</option>
          <option value="Letzten 30 Tage">Letzten 30 Tage</option>
        </select>
        <div>
          <canvas></canvas>
        </div>
      </div>
    </div>
    <!-- 4. Results -->
    <div
      class="f_neutral_80 border_large p-6 flex flex-col items-start gap-[1.125rem] w-full"
    >
      <div class="flex justify-center items-center gap-2">
        <font-awesome-icon
          :icon="['far', 'chart-line']"
          class="w-12 h-12 text-[2rem]"
        />
        <span class="h2_bold_28 f_text_neutral_900"> Results?</span>
      </div>
      <div
        class="flex flex-col items-start py-6 border_large basic_white w-full"
      >
        <div
          class="flex gap-8 py-[0.625rem] border-b border-solid f_border_neutral_80 w-full"
        >
          <div class="w-12 px-2 basic_white"></div>
          <span class="text_regular_16 f_text_neutral_900 px-2">Status</span>
          <span class="text_regular_16 f_text_neutral_900 pr-[17.31rem]"
            >Subcase</span
          >
          <span class="text_regular_16 f_text_neutral_900 w-[45rem]"
            >Runtime</span
          >
          <span
            class="text_regular_16 f_text_neutral_900 pr-[9.25rem] pl-[8rem]"
            >Attachment</span
          >
        </div>
        <Subcase />
        <Subcase />
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
const route = useRoute();
console.log(route);
const numberOfSubcases = 12;

const getIcon = (iconName: string) => {
  if (iconName === "desktop") {
    return {
      prefix: "fas",
      iconName: "desktop",
    };
  } else {
    return {
      prefix: "fab",
      iconName: iconName,
    };
  }
};

onMounted(() => {
  setTimeout(() => {
    useChart("Web1", 85); // TODO: 85 results; display tooltip
  }, 1);
});
</script>
