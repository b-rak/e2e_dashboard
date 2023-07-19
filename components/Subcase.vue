<template>
  <div
    class="flex items-center gap-8 py-[0.625rem] border-b border-solid f_border_neutral_90 w-full"
  >
    <div class="px-2 py-3">
      <font-awesome-icon
        :icon="{ prefix: 'far', iconName: 'angle-right' }"
        class="f_text_neutral_500 h-8 w-8 cursor-pointer text-[2rem] transition duration-100 ease-linear"
        @click.prevent="toggleRotate"
      />
    </div>
    <div
      class="flex items-center justify-center status_bold_12 basic_text_white status_pass_100 border_small p-1"
    >
      PASSED
    </div>
    <div class="h3_medium_18 w-[20.6875rem] flex-[1_0_0%]">Subcase A</div>
    <div class="w-[45rem] f_neutral_400">ChartJS</div>
    <div class="w-[20.375rem] px-6 py-2 flex items-center gap-[2.25rem]">
      <IconButton iconName="image" type="far" />
      <IconButton iconName="circle-play" type="far" />
      <IconButton iconName="file" type="fas" />
    </div>
    <!-- 
        1. arrow icon
        2. subcase details
        3. chart
        4. media icons
        -->
  </div>
</template>

<script lang="ts" setup>
const toggleRotate = (event: Event) => {
  // the fontawesome icon is inserted as <svg><path></path></svg>. The click event is fired on both tags, which leads to adding the rotate class to either of both tags which again
  // leads to faulty behaviour. The rotate class should only be added to the svg element
  // If the path is clicked then for the parent svg element the class is added
  if ((event.target as HTMLElement).tagName === "path") {
    (event.target as HTMLElement).parentElement?.classList.toggle("rotate-90");
    return;
  }
  (event.target as HTMLElement).classList.toggle("rotate-90");
};
</script>
