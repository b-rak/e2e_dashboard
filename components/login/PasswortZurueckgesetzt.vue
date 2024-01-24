<template>
  <div class="w-[35rem] flex flex-col text-center">
    <font-awesome-icon
      :icon="['far', 'circle-check']"
      class="status_text_pass_100 text-[3.5rem]"
    />
    <span class="display_semibold_48 my-6">Passwort zurückgesetzt</span>
    <span class="h2_medium_28 basic_text_grey"
      >Sie haben Ihr Passwort erfolgreich zurückgesetzt!</span
    >
    <SubmitButton
      buttonText="Zurück zum Login"
      class="mt-14"
      @click="goToLogin"
    />
  </div>
</template>

<script lang="ts" setup>
const goToLogin = () => {
  navigateTo("/login");
};
</script>
