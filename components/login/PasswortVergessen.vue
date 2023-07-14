<template>
  <div class="w-[35rem] flex flex-col">
    <span class="display_semibold_48 mb-4 text-center"
      >Passwort vergessen?</span
    >
    <span class="h2_medium_28 mb-14 basic_text_grey text-center"
      >🔗 Link zum Zurücksetzen senden</span
    >
    <form class="w-full" novalidate @submit.prevent="goToEmailSent">
      <EMailInput :errorMessage="errorMessage" />
      <SubmitButton buttonText="Passwort zurücksetzen" class="my-12" />
      <span
        class="cursor-pointer text_regular_16 f_text_neutral_500 py-2 pr-2 mt-2 block text-center"
        @click="goToLogin"
        >Zurück zum Login</span
      >
    </form>
  </div>
</template>

<script lang="ts" setup>
const errorMessage = ref("");

const emits = defineEmits(["goTo:login", "goTo:emailSent"]);

const goToLogin = () => {
  emits("goTo:login");
};

const goToEmailSent = () => {
  // get input value
  const emailElement: HTMLInputElement = document.getElementById(
    "e-mail"
  ) as HTMLInputElement;
  const email = emailElement.value;

  // check email input value
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    errorMessage.value = "";
    emits("goTo:emailSent", email);
  } else if (email === "") {
    errorMessage.value = "Bitte geben Sie eine E-Mail Adresse ein.";
  } else {
    errorMessage.value =
      "Ungültige E-Mail-Adresse. Das Format sollte test@appmatics.de";
  }
};
</script>
