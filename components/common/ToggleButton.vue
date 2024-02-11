<template>
  <div class="flex items-center justify-between">
    <span
      class="text_regular_16"
      :class="[!status ? '' : 'f_text_neutral_400']"
      >{{ text }}</span
    >
    <label
      class="relative inline-block w-9 h-5 border_medium"
      :class="[!status ? 'f_neutral_90' : 'f_neutral_400']"
      @click.prevent="markFalse"
    >
      <input type="checkbox" class="hidden" />
      <span
        class="rounded-[2rem] before:content-[''] before:absolute before:h-4 before:w-4 before:left-[0.125rem] before:bottom-[0.125rem] before:rounded-xl before:transition-transform before:duration-100 before:ease-linear"
        :class="[
          !status
            ? 'before:bg-black'
            : 'before:translate-x-4 before:bg-[#e0e3e4]',
        ]"
      ></span>
    </label>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  text: String;
  value: Boolean;
}>();

const status = ref(props.value);
const markFalse = (event: Event) => {
  let target = event.target as HTMLElement;
  if (target.tagName.toLowerCase() === "label") {
    target = (event.target as HTMLElement).querySelector("span") as HTMLElement;
  }
  target.classList.toggle("before:translate-x-4");
  // Das Togglen der BG-Klassen muss hier erfolgen, die Klasse dynamisch über :class zu binden scheint mit :before nicht zu funktionieren
  // Zudem mussten hier die Tailwindklassen verwendet werden (s. bg-black), da custom erstellte Klassen auch nicht erkannt wurden (vermutlich weil before: Tailwind Notation ist)
  target.classList.toggle("before:bg-black");
  target.classList.toggle("before:bg-[#e0e3e4]");
  status.value = !status.value;
  emits("toggleStatus", status.value);
};

const emits = defineEmits(["toggleStatus"]);
</script>
