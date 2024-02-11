<template>
  <div
    class="py-6 px-4 flex items-center gap-8 border-b border-solid f_border_neutral_90 w-full"
    :class="{ f_neutral_700: selected }"
  >
    <Checkbox />
    <div
      class="flex gap-[1.125rem] cursor-pointer"
      @click.prevent="toggleRotate()"
    >
      <div class="text-center">
        <font-awesome-icon
          :icon="{ prefix: 'far', iconName: 'angle-right' }"
          class="h-6 w-6 cursor-pointer text-[2rem] transition-[transform] duration-100 ease-linear f_text_neutral_500"
          :id="'arrow-' + id"
        />
      </div>
      <ResultIndicator result="PASSED" class="pl-2 pr-[0.375rem]" />
      <div class="h3_medium_18" :class="{ basic_text_white: selected }">
        Testcase A
      </div>
    </div>
    <CaseIndicator
      :numberOfCases="8"
      type="Subcase"
      class="f_neutral_80 ml-auto"
    />
  </div>
  <Transition class="w-full">
    <div v-show="selected" class="">
      <ExportSubcase v-for="i in 3" />
    </div>
  </Transition>
</template>

<script lang="ts" setup>
const props = defineProps<{
  id: number;
}>();
const selected = ref(false);
const toggleRotate = () => {
  selected.value = !selected.value;

  const arrowElement = document.getElementById(
    "arrow-" + props.id
  ) as HTMLElement;
  arrowElement.classList.toggle("f_text_neutral_500");
  arrowElement.classList.toggle("basic_text_white");
  arrowElement.classList.toggle("rotate-90");
};
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transform: scaleY(1);
  transform-origin: top;
  transition: transform 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.3s ease;
}
</style>
