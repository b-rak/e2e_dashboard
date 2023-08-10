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
        <CustomerHeader
          customerName="Appmatics"
          pageTitle="Testfälle"
          imagePath="./img/logo.png"
        />
        <div id="filter-export" class="h-14 w-auto flex items-center gap-8">
          <ClientOnly>
            <DateRangePicker />
            <ExportButton buttonText="Export CSV" />
          </ClientOnly>
        </div>
      </div>
      <!-- Bottom Row -->
      <div
        id="bottom-row"
        class="flex flex-row justify-center gap-x-[33px] items-center w-full mt-6 px-[138px]"
      >
        <GesamtKachel @select-all="selectAll" :displayAll="displayAll" />
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
        @go-to:details="navigate"
      />
      <OS-Testcases
        v-if="config2.selected.value || displayAll"
        name="iOS"
        iconName="apple"
        numberOfCases="6"
        @go-to:details="navigate"
      />
      <OS-Testcases
        v-if="config3.selected.value || displayAll"
        name="Android"
        iconName="android"
        numberOfCases="1"
        @go-to:details="navigate"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
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

import { useDetailsStore } from "~/stores/details";
const store = useDetailsStore();
const navigate = (obj: Object) => {
  store.name = obj.name;
  store.icon = obj.icon;
  navigateTo(("/testfaelle/" + obj.name) as string);
};
</script>
