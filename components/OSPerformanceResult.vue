<template>
  <div
    class="w-6 h-6 border_xsmall relative inline-block cursor-pointer"
    :class="[
      result.result === 'PASSED' ? 'status_pass_100' : 'status_fail_100',
    ]"
    @mouseover="showTooltip = true"
    @mouseout="showTooltip = false"
    @click="goToDetails"
  >
    <span
      class="button_regular_14 px-2 py-1 f_neutral_900 basic_text_white whitespace-nowrap text-center border_xsmall absolute z-[1] transition-opacity duration-300 bottom-[125%] left-1/2 after:content-[''] after:absolute after:top-full after:left-1/2 after:-ml-1 after:border-solid after:border-[0.25rem] after:border-t-[#222f34] after:border-b-transparent after:border-x-transparent"
      :class="[showTooltip ? 'visible opacity-100' : 'invisible opacity-0']"
      :id="id"
      >{{
        result.caseReadableName +
        ": " +
        result.result.charAt(0).toUpperCase() +
        result.result.slice(1).toLowerCase()
      }}</span
    >
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  id: string;
  result: CaseResult;
}>();

const showTooltip = ref(false);

const setMargin = () => {
  const textElement = document.getElementById(props.id);
  const leftPos = (textElement?.getBoundingClientRect() as DOMRect).width / 2;
  textElement.style.marginLeft = (-1 * leftPos) / useRem() + "rem";
};
onMounted(() => {
  setTimeout(() => {
    setMargin();
  }, 1);
  window.addEventListener("resize", () => {
    setMargin();
  });
});

const goToDetails = () => {
  navigateTo(
    "/testfaelle/" + props.result.environment + "/" + props.result.caseId
  );
};
</script>
