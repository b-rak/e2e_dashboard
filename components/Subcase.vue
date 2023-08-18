<template>
  <div class="w-full">
    <div
      class="flex items-center gap-8 py-4 px-3 border-b border-solid f_border_neutral_90 w-full"
      :class="[selected ? 'f_neutral_700' : '']"
    >
      <div class="w-[4.5rem] text-center">
        <font-awesome-icon
          :icon="{ prefix: 'far', iconName: 'angle-right' }"
          class="h-8 cursor-pointer text-[2rem] f_text_neutral_500 transition-[transform] duration-100 ease-linear"
          @click.prevent="toggleRotate"
        />
      </div>
      <ResultIndicator :result="true" class="p-1" />
      <div
        class="h3_medium_18 w-[20.6875rem] grow"
        :class="[selected ? 'basic_text_white' : '']"
      >
        Subcase A
        <div class="flex gap-9">
          <span class="text_regular_16 w-[7rem]">27.07.2023</span>
          <span class="text_regular_16">17:33:42</span>
        </div>
      </div>
      <div class="w-[45rem] grow relative h-12">
        <canvas :id="'runtime-' + id" class="border_xsmall"></canvas>
      </div>
      <div
        class="w-fit pl-[6.125rem] pr-5 py-2 flex items-center gap-[2.25rem] justify-end"
      >
        <IconButton iconName="image" type="far" active="true" />
        <IconButton iconName="circle-play" type="far" active="true" />
        <IconButton iconName="file" type="fas" active="true" />
      </div>
    </div>
    <Transition>
      <div v-show="selected" class="border-b border-solid f_border_neutral_90">
        <SubcaseResult v-for="n in 10" :key="n" :result="getResult()" />
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  id: Number;
}>();

const selected = ref(false);
const toggleRotate = (event: Event) => {
  selected.value = !selected.value;

  // the fontawesome icon is inserted as <svg><path></path></svg>. The click event is fired on both tags, which leads to adding the rotate class to either of both tags which again
  // leads to faulty behaviour. The rotate class should only be added to the svg element
  // If the path is clicked then for the parent svg element the class is added
  if ((event.target as HTMLElement).tagName.toLowerCase() === "path") {
    (event.target as HTMLElement).parentElement?.classList.toggle(
      "f_text_neutral_500"
    );
    (event.target as HTMLElement).parentElement?.classList.toggle(
      "basic_text_white"
    );
    (event.target as HTMLElement).parentElement?.classList.toggle("rotate-90");
    return;
  }
  (event.target as HTMLElement).classList.toggle("f_text_neutral_500");
  (event.target as HTMLElement).classList.toggle("basic_text_white");
  (event.target as HTMLElement).classList.toggle("rotate-90");
};

const getResult = () => {
  return Math.random() < 0.5;
};

onMounted(() => {
  setTimeout(() => {
    useRuntimeChart(String(props.id));
  }, 1);
});
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
