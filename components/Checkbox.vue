<template>
  <label class="relative cursor-pointer select-none w-6">
    <input type="checkbox" class="opacity-0 h-0 w-0" />
    <span
      class="absolute left-0 h-6 w-6 border_xxsmall f_neutral_90 border border-solid f_border_neutral_700 hover:bg-[#9aabb1] after:mx-auto after:mt-[0.125rem] after:w-[0.625rem] after:h-[0.9375rem] after:border-solid after:border-[#3A4F57] after:border-r-[0.1875rem] after:border-b-[0.1875rem] after:rounded-tr-sm after:rounded-bl-sm after:rounded-br-sm after:transform after:rotate-45"
      :class="[checked ? 'after:block' : 'after:hidden']"
      @click="toggleChecked()"
    ></span>
  </label>
</template>

<script lang="ts" setup>
const checked = ref(false);

const toggleChecked = () => {
  checked.value = !checked.value;
};
</script>
