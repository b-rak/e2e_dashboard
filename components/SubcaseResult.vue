<template>
  <div
    class="flex items-center gap-8 py-4 px-3 w-full"
    :class="[!status ? 'bg_light' : 'bg-[#f3f5f6]']"
  >
    <div class="w-[4.5rem] text-center"></div>
    <div class="flex items-center justify-center w-[3.988rem] min-w-[3.988rem]">
      <ClientOnly>
        <div
          class="border_xsmall p-2 w-6 h-6"
          :class="[!status ? color : colore]"
        ></div>
      </ClientOnly>
    </div>
    <div
      class="h3_medium_18 w-[20.6875rem] grow flex gap-9"
      :class="[!status ? '' : 'f_text_neutral_400']"
    >
      <span class="text_regular_16 w-[7rem]">27.07.2023</span>
      <span class="text_regular_16">17:33:42</span>
    </div>
    <div class="w-[45rem] grow flex justify-between gap-6">
      <div class="f_neutral_80" :class="[!status ? '' : 'f_text_neutral_400']">
        Text lorem ipsum
      </div>
      <ToggleButton
        class="min-w-[8.5rem]"
        text="Mark false"
        @toggle-status="changeStyles"
      />
    </div>
    <div
      class="w-fit pl-[6.125rem] pr-5 py-2 flex items-center gap-[2.25rem] justify-end"
    >
      <IconButton iconName="image" type="far" :active="!status" />
      <IconButton iconName="circle-play" type="far" :active="!status" />
      <IconButton iconName="file" type="fas" :active="!status" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  result: Boolean;
}>();

const color = ref("");
const colore = ref("");
if (props.result) {
  color.value = "status_pass_100";
  colore.value = "status_pass_75";
} else {
  color.value = "status_fail_100";
  colore.value = "status_fail_75";
}

const status = ref(false);
const changeStyles = (statusToggle: Boolean) => {
  status.value = statusToggle as boolean;
};
</script>
