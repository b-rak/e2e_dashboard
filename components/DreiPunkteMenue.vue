<template>
  <IconButton
    iconName="ellipsis-vertical"
    type="fas"
    :active="true"
    @click="showMenu($event)"
  >
  </IconButton>
  <div
    class="rounded-lg basic_white border border-solid shadow_light_2 bottom-full right-0 transform translate-y-2 translate-x-5 absolute"
    v-if="visible"
  >
    <a
      class="px-3 py-2 block border-b border-solid f_border_neutral_90 text_regular_16 cursor-pointer hover:bg-[#dfe4e7]"
      @click="useOpenInNewTab(screenshot)"
      >Screenshot</a
    >
    <a
      class="px-3 py-2 block border-b border-solid f_border_neutral_90 text_regular_16 cursor-pointer hover:bg-[#dfe4e7]"
      @click="useOpenInNewTab(video)"
      >Video</a
    >
    <a
      class="px-3 py-2 block text_regular_16 cursor-pointer hover:bg-[#dfe4e7]"
      @click="useOpenInNewTab(logfile)"
      >Logfile</a
    >
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  screenshot: string;
  video: string;
  logfile: string;
}>();
const visible = ref(false);
const showMenu = (event: MouseEvent) => {
  event.stopImmediatePropagation();
  if (!visible.value) {
    visible.value = true;
    document.addEventListener("click", hideMenu);
  } else {
    visible.value = false;
    document.removeEventListener("click", hideMenu);
  }
};
const hideMenu = () => {
  visible.value = false;
  document.removeEventListener("click", hideMenu);
};
</script>
