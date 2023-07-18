<template>
  <div class="w-[35rem] text-center flex flex-col">
    <div class="flex justify-center">
      <font-awesome-icon
        :icon="['far', 'circle-check']"
        class="status_text_pass_100 text-[3.5rem]"
      />
    </div>
    <span class="display_semibold_48 my-6">E-Mail versandt!</span>
    <span class="h2_medium_28 basic_text_grey mb-[4.5rem]"
      >Wenn Ihre E-Mail-Adresse in unserem System registriert ist, haben wir
      eine E-Mail versandt an:</span
    >
    <span class="h2_bold_28 basic_text_grey mb-6">{{ email }}</span>
    <div
      class="text_regular_16 basic_text_grey py-2 pr-2 pl-[9rem] flex items-center gap-2"
    >
      Keine E-Mail erhalten?
      <span
        v-if="!displaySendAgain"
        class="cursor-pointer status_text_fail_100 pl-2"
        @click="loadingAnimation"
        >Erneut senden
        <font-awesome-icon
          v-if="displayAnimation"
          :icon="['far', 'spinner-third']"
          class="text-[1rem] animate-spin"
      /></span>
      <span v-else class="basic_text_grey pl-2 inline-flex items-center gap-2"
        >Erneut versandt
        <font-awesome-icon
          :icon="['far', 'circle-check']"
          class="status_text_pass_100 text-[1rem]"
        />
      </span>
    </div>
    <span
      class="text_regular_16 cursor-pointer f_text_neutral_500 mt-[4.5rem]"
      @click="goToLogin"
      >Zurück zum Login</span
    >
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  email: String;
}>();
const displaySendAgain = ref(false);
const displayAnimation = ref(false);

const emits = defineEmits(["goTo:login"]);
const goToLogin = () => {
  emits("goTo:login");
};

const loadingAnimation = () => {
  displayAnimation.value = true;
  setTimeout(() => {
    displayAnimation.value = false;
    displaySendAgain.value = true;
    setTimeout(() => {
      displaySendAgain.value = false;
    }, 2000);
  }, 2000);
};
</script>
