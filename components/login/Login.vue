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
const route = useRoute();

const errorMessage = ref("");
const errorMessagePw = ref("");
const loginError = ref(false);

const login = async () => {
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
      "Ungültige E-Mail-Adresse. Das Format sollte test@appmatics.de entsprechen.";
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

  // send login request
  if (errorMessage.value === "" && errorMessagePw.value === "") {
    try {
      const { message } = await useAuthenticate(email, password);
      console.log("MESSAGE", message);

      loginError.value = false;
    } catch (e: any) {
      console.log("Login Error");
      console.log(e);
      if (isNuxtError(e)) {
        console.log("Login NUXTError");
        if (e.statusCode === 500) {
          throw createError({
            statusCode: e.statusCode,
            statusMessage: e.message,
            fatal: true,
          });
        } else if (e.statusCode === 403) {
          throw createError({
            statusCode: e.statusCode,
            statusMessage: "Unauthorized!",
            fatal: true,
          });
        } else if (e.statusCode === 401) {
          loginError.value = true;
        }
      }
    }

    if (!loginError.value) {
      let redirectTo = `${window.location.origin}`;
      if (route.redirectedFrom?.fullPath) {
        redirectTo = `${window.location.origin}${route.redirectedFrom?.fullPath}`;
      }
      await navigateTo(redirectTo, { replace: false, external: true });
    }
  }
};

const emits = defineEmits(["goTo:passwordForgot"]);
const goToPasswordForgotten = () => {
  emits("goTo:passwordForgot");
};
</script>
