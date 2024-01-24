<template>
  <div
    class="flex justify-around"
    :class="[
      breakpoint.mobile
        ? 'w-full absolute top-[12%] px-8'
        : 'h-full items-center gap-[11rem]',
      { '!top-1/4': breakpoint.viewport === 'md' },
    ]"
  >
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
    <Image
      v-if="!breakpoint.mobile"
      :src="'/img/LaptopWithACatOnTheScreen.svg'"
      :alt="'Laptop mit Katzenbild'"
    />
  </div>
</template>

<script setup lang="ts">
const login = ref(true);
const pwForgot = ref(false);
const emailSent = ref(false);

const pwResetEMail = ref("");

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

const breakpoint = useBreakpoint().breakpoints;
</script>
