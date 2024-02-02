<template>
  <div
    class="flex justify-center"
    :class="[
      breakpoint.mobile
        ? 'w-full absolute top-[12%] px-8'
        : 'h-full items-center gap-[11rem] pl-[16%]',
      { '!top-1/4': breakpoint.viewport === 'md' },
    ]"
  >
    <NeuesPasswort
      v-if="pwReset"
      @go-to:password-resetted="showPasswordResetted"
    />
    <PasswortZurueckgesetzt v-if="pwResetted" />
    <Image
      v-if="!breakpoint.mobile"
      :src="'/img/LaptopWithACatOnTheScreen.svg'"
      :alt="'Laptop mit Katzenbild'"
    />
  </div>
</template>

<script setup lang="ts">
const pwReset = ref(true);
const pwResetted = ref(false);

const showPasswordResetted = () => {
  pwReset.value = false;
  pwResetted.value = true;
};

const breakpoint = useBreakpoint().breakpoints;

definePageMeta({
  middleware: ["login"],
});
</script>
