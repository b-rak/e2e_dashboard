<template>
  <div class="ml-[16%] h-full flex items-center">
    <Login v-if="login" @go-to:password-forgot="showPasswordForgot" />
    <PasswortVergessen
      v-if="pwForgot"
      @go-to:login="showLogin"
      @go-to:email-sent="showEMailSent"
    />
    <EMailVersandt
      v-if="emailSent"
      @go-to:login="showLogin"
      :email="pwResetEMail"
    />
  </div>
</template>

<script setup lang="ts">
const login = ref(true);
const pwForgot = ref(false);
const emailSent = ref(false);

const pwResetEMail = ref("");

definePageMeta({
  middleware: ["auth"],
});

const showPasswordForgot = () => {
  login.value = false;
  pwForgot.value = true;
};

const showLogin = () => {
  pwForgot.value = false;
  emailSent.value = false;
  login.value = true;
};

const showEMailSent = (email: string) => {
  pwForgot.value = false;
  emailSent.value = true;
  pwResetEMail.value = email;
};
</script>
