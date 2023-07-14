<template>
  <div class="w-[35rem] flex flex-col">
    <span class="display_semibold_48 mb-4 text-center">Neues Passwort</span>
    <span class="h2_medium_28 mb-14 basic_text_grey text-center"
      >🔒 Bitte vergeben Sie ein neues Passwort</span
    >
    <form class="w-full" novalidate @submit.prevent="resetPassword">
      <PasswortInput
        id="password"
        label="Neues Passwort"
        :errorMessage="msgPw"
      />
      <span
        v-if="!msgPw"
        class="basic_text_grey text_regular_14 block mt-2 mx-2 basic_text_grey"
        >Mindestens 8 Zeichen</span
      >
      <PasswortInput
        id="password-repeat"
        label="Passwort wiederholen"
        :errorMessage="msgPwRepeat"
      />
      <SubmitButton buttonText="Passwort ändern" />
    </form>
  </div>
</template>

<script lang="ts" setup>
const msgPw = ref("");
const msgPwRepeat = ref("");

const emits = defineEmits(["goTo:passwordResetted"]);

const resetPassword = () => {
  // get password values
  const passwordElement: HTMLInputElement = document.getElementById(
    "password"
  ) as HTMLInputElement;
  const passwordRepeatElement: HTMLInputElement = document.getElementById(
    "password-repeat"
  ) as HTMLInputElement;
  const password = passwordElement.value;
  const passwordRepeat = passwordRepeatElement.value;

  // compare entries for length and equality
  if (password.length < 8) {
    msgPwRepeat.value = "";
    msgPw.value = "Mindestens 8 Zeichen";
  } else {
    if (password !== passwordRepeat) {
      msgPw.value = "";
      msgPwRepeat.value = "Die eingegebenen Passwörter stimmen nicht überein.";
    } else {
      msgPwRepeat.value = "";
      emits("goTo:passwordResetted");
    }
  }
};
</script>
