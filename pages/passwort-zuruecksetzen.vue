<template>
  <div class="ml-[16%] h-full flex items-center">
    <NeuesPasswort
      v-if="pwReset"
      @go-to:password-resetted="showPasswordResetted"
    />
    <PasswortZurueckgesetzt v-if="pwResetted" />
  </div>
</template>

<script setup lang="ts">
const pwReset = ref(true);
const pwResetted = ref(false);

const showPasswordResetted = () => {
  pwReset.value = false;
  pwResetted.value = true;
};
</script>
