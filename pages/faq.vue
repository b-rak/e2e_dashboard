<template>
  <h1 class="h2_bold_28 text-center">FAQ</h1>
  <button
    class="mr-auto border border-solid p-2 border_small bg_light shadow_light_2"
    @click="showModal = true"
  >
    Click me
  </button>
  <ExportOverlay v-show="showModal" @close-modal="showModal = false" />
  <br />
  <br />
  <div class="flex">
    <FilterDropdown buttonName="Gruppe" type="OS" />
    <FilterDropdown buttonName="Status" type="Status" />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ["check-session"],
});

const jwtStore = useJwtStore();
console.log("STORE LOG", jwtStore.jwtData);

const showModal = ref(false);
</script>

<style scoped>
::-webkit-scrollbar {
  width: 7px;
  right: -100px;
  background-color: rgba(0, 0, 0, 0);
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
