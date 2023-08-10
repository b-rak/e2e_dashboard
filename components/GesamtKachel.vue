<template>
  <div
    id="os-all"
    class="h-[9.6875rem] px-6 hover:scale-[1.05] border_small shadow_light_3 basic_white flex flex-col items-center justify-start pt-[1.375rem] gap-6"
    :class="[displayAll ? 'f_neutral_900' : 'basic_white shadow_light_3']"
    @click="selectAll"
  >
    <div
      class="w-[8.5rem] flex gap-4 justify-center items-center"
      :class="[!displayAll ? 'f_text_neutral_900' : 'basic_text_white']"
    >
      <div class="h-6 flex justify-center items-center">
        <DevicesIcon />
      </div>
      <span class="h3_bold_18">Gesamt</span>
    </div>
    <SuccessRate :selected="displayAll" />
  </div>
</template>

<script lang="ts" setup>
import { emit } from "process";

const props = defineProps<{
  displayAll: Boolean;
}>();

const emits = defineEmits(["selectAll"]);
const selectAll = () => {
  emits("selectAll");
};
</script>
