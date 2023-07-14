<template>
  <div class="w-[35rem] flex flex-col">
    <span class="display_semibold_48 mb-4 text-center">Willkommen!</span>
    <span class="h2_medium_28 mb-14 basic_text_grey text-center"
      >⚙️ Monitoring in progress...</span
    >
    <div v-if="loginError" class="flex items-center gap-6 mb-8">
      <font-awesome-icon
        :icon="['far', 'circle-exclamation']"
        class="text-[1.5rem] f_text_secondary_00"
      />
      <span class="text_regular_16 f_text_secondary_00 w-full"
        >Die E-Mail Adresse oder das Passwort stimmen nicht überein. Bitte
        überprüfen Sie Ihre Eingaben.</span
      >
    </div>

    <form class="w-full" novalidate @submit.prevent="login">
      <EMailInput :errorMessage="errorMessage" />

      <PasswortInput
        id="password"
        label="Passwort"
        :errorMessage="errorMessagePw"
      />
      <span
        class="cursor-pointer text_regular_16 f_text_secondary_00 py-2 pr-2 mt-2 block text-right"
        @click="goToPasswordForgotten"
        >Passwort vergessen?</span
      >
      <SubmitButton buttonText="Einloggen"
        ><font-awesome-icon
          :icon="['fas', 'arrow-right-to-bracket']"
          class="h-6 w-6"
        />
      </SubmitButton>
    </form>
  </div>
</template>

<script lang="ts" setup>
const errorMessage = ref("");
const errorMessagePw = ref("");
const loginError = ref(false);

const login = () => {
  // get entered values
  const emailElement: HTMLInputElement = document.getElementById(
    "e-mail"
  ) as HTMLInputElement;
  const email = emailElement.value;
  const passwordElement: HTMLInputElement = document.getElementById(
    "password"
  ) as HTMLInputElement;
  const password = passwordElement.value;

  // check email input value
  if (email === "") {
    loginError.value = false;
    errorMessage.value = "Bitte geben Sie eine E-Mail Adresse ein.";
  } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    errorMessage.value =
      "Ungültige E-Mail-Adresse. Das Format sollte test@appmatics.de";
  } else {
    errorMessage.value = "";
  }

  // check password input value
  if (password === "") {
    loginError.value = false;
    errorMessagePw.value = "Bitte geben Sie ein Passwort ein.";
  } else if (password.length < 8) {
    errorMessagePw.value = "Mindestens 8 Zeichen";
  } else {
    errorMessagePw.value = "";
  }

  //
  if (errorMessage.value === "" && errorMessagePw.value === "") {
    checkUser(email, password);
  }
};

// actual login method, TODO: replace with connection to backend; move somewhere else?
const checkUser = async (email: string, password: string) => {
  if (email === "monitoring@appmatics.de" && password === "Test123!") {
    loginError.value = false;
    await navigateTo("/dashboard", { replace: false });
    location.reload();
  } else {
    loginError.value = true;
  }
};

const emits = defineEmits(["goTo:passwordForgot"]);
const goToPasswordForgotten = () => {
  emits("goTo:passwordForgot");
};
</script>
