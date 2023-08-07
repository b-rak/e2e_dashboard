<template>
  <div class="pt-8">
    <!-- Übersicht oben -->
    <div
      id="overview"
      class="f_neutral_80 h-[14.5rem] w-full border_medium shadow_light_1 flex flex-col items-center py-9"
    >
      <!--Top Row -->
      <div
        id="top-row"
        class="flex flex-row justify-between items-start p-0 w-full px-6"
      >
        <div
          id="customer"
          class="w-[21.313rem] h-24 flex flex-row items-center gap-6 p-0"
        >
          <img
            src="~/assets/images/logo.png"
            alt="Kundenlogo"
            class="w-[5.125rem] h-[5.125rem] border_medium shadow_light_1 block m-auto"
          />
          <div class="flex flex-col items-start w-[14.688rem] h-24">
            <div class="w-[14.688rem] h-16 flex flex-row items-center gap-4">
              <p class="display_semibold_48">Testfälle</p>
              <div class="h-6 w-6 cursor-pointer f_text_neutral_900">
                <font-awesome-icon
                  :icon="{ prefix: 'far', iconName: 'circle-info' }"
                  class="fa-xl"
                />
              </div>
            </div>
            <p class="h3_medium_18 f_text_neutral_900">Appmatics</p>
          </div>
        </div>
        <div id="filter-export" class="h-14 w-auto flex items-center gap-8">
          <ClientOnly>
            <div
              class="px-6 py-3 h-14 flex items-center basic_white border border_medium border-solid border-[#DFE4E7] shadow_light_1 gap-2"
            >
              <font-awesome-icon
                :icon="{ prefix: 'far', iconName: 'calendar-day' }"
                class="fa-flip-horizontal f_text_neutral_500 h-4 w-4 fa-xl"
              />
              <input
                type="text"
                name="daterange"
                class="h-[1.125rem] w-[10.875rem] text-center text_regular_16"
              />
            </div>
            <button
              id="export"
              class="flex items-center h-[3rem] py-3 px-6 gap-2 border_medium f_neutral_500 button_semibold_16 text-center text-white"
            >
              <font-awesome-icon
                :icon="{
                  prefix: 'fas',
                  iconName: 'arrow-up-right-from-square',
                }"
                class="h-4 w-4 fa-xl"
              />
              Export CSV
            </button>
          </ClientOnly>
        </div>
      </div>
      <!-- Bottom Row -->
      <div
        id="bottom-row"
        class="flex flex-row justify-center gap-x-[33px] items-center w-full mt-6 px-[138px]"
      >
        <!-- KACHEL ALL OS -->
        <div
          id="os-all"
          class="h-[9.6875rem] hover:scale-[1.05] border_small shadow_light_3 text-white flex flex-col flex-shrink items-center pt-[1.375rem] gap-6"
          :class="[displayAll ? 'f_neutral_900' : 'basic_white shadow_light_3']"
          @click="selectAll"
        >
          <div
            class="flex gap-4 items-center"
            :class="[!displayAll ? 'f_text_neutral_900' : 'basic_text_white']"
          >
            <div class="h-6 w-6 flex justify-center items-center">
              <DevicesIcon />
            </div>
            <span class="h3_bold_18">Gesamt</span>
          </div>
          <div
            class="h-[6.75rem] w-60 flex flex-col justify-center items-center p-1"
          >
            <div class="flex flex-row justify-center items-center gap-2">
              <font-awesome-icon
                :icon="{ prefix: 'far', iconName: 'arrow-up' }"
                class="status_text_pass_100 h-[1.5rem] w-[1.5rem] text-[1.5rem]"
              />
              <span
                class="rate_bold_36 text-white"
                :class="[
                  !displayAll ? 'f_text_neutral_900' : 'basic_text_white',
                ]"
                >80%</span
              >
            </div>
            <span
              class="text_regular_14 text-white"
              :class="[!displayAll ? 'f_text_neutral_900' : 'basic_text_white']"
              >Success Rate</span
            >
          </div>
        </div>
        <OS-Kachel
          v-bind="config"
          @update:display="updateDisplay"
          :selected="config.selected.value"
        />
        <OS-Kachel
          v-bind="config2"
          @update:display="updateDisplay"
          :selected="config2.selected.value"
        />
        <OS-Kachel
          v-bind="config3"
          @update:display="updateDisplay"
          :selected="config3.selected.value"
        />
      </div>
    </div>
    <!-- Testfall Übersicht nach OS -->
    <div class="flex flex-col gap-y-9 mt-36">
      <OS-Testcases
        v-if="config.selected.value || displayAll"
        name="Web"
        iconName="desktop"
        numberOfCases="10"
      />
      <OS-Testcases
        v-if="config2.selected.value || displayAll"
        name="iOS"
        iconName="apple"
        numberOfCases="6"
      />
      <OS-Testcases
        v-if="config3.selected.value || displayAll"
        name="Android"
        iconName="android"
        numberOfCases="1"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import DateRangePicker from "daterangepicker";

onMounted(() => {
  setTimeout(() => {
    const input = document.querySelector(
      'input[name="daterange"]'
    ) as HTMLElement;
    let daterangepicker = new DateRangePicker(input, {
      opens: "center",
      locale: {
        format: "DD.MM.YYYY",
        separator: " - ",
        applyLabel: "OK",
        cancelLabel: "Abbrechen",
        fromLabel: "Von",
        toLabel: "Bis",
        customRangeLabel: "Custom",
        daysOfWeek: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
        monthNames: [
          "Januar",
          "Februar",
          "März",
          "April",
          "Mai",
          "Juni",
          "Juli",
          "August",
          "September",
          "Oktober",
          "November",
          "Dezember",
        ],
        firstDay: 1,
      },
    });

    document.getElementById("export")?.addEventListener("click", () => {
      console.log("Clicked :)");
    });
  }, 1);
});

const config = {
  id: 1,
  iconName: "desktop",
  os_name: "Web",
  numberOfCases: 10,
  selected: ref(false),
};
const config2 = {
  id: 2,
  iconName: "apple",
  os_name: "iOS",
  numberOfCases: 6,
  selected: ref(false),
};
const config3 = {
  iconName: "android",
  id: 3,
  os_name: "Android",
  numberOfCases: 1,
  selected: ref(false),
};

const configs = [config, config2, config3];

const updateDisplay = (obj: object) => {
  if ("selected" in obj && "id" in obj) {
    let index = obj.id as number;
    configs[index - 1].selected.value = obj["selected"] as boolean;
    updateGesamt();
  }
};

const displayAll = ref(true);
const updateGesamt = () => {
  if (
    config.selected.value &&
    config2.selected.value &&
    config3.selected.value
  ) {
    displayAll.value = true;
    config.selected.value = false;
    config2.selected.value = false;
    config3.selected.value = false;
  } else if (
    !config.selected.value &&
    !config2.selected.value &&
    !config3.selected.value
  ) {
    displayAll.value = true;
  } else {
    displayAll.value = false;
  }
};

const selectAll = () => {
  if (displayAll.value === false) {
    displayAll.value = true;
    config.selected.value = false;
    config2.selected.value = false;
    config3.selected.value = false;
  }
};
</script>
