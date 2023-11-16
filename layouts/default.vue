<template>
  <div
    class="flex flex-col fullscreen"
    :class="[
      {
        login:
          (path === '/login' || path === '/passwort-zuruecksetzen') &&
          !breakpoint.mobile,
      },
    ]"
  >
    <Navigation
      v-if="path !== '/login' && path !== '/passwort-zuruecksetzen'"
      class="text-center"
    />
    <a v-else href="/" class="h-[5rem] ml-[4%] flex items-center">
      <img
        class="cursor-pointer h-6 w-[8.75rem]"
        src="~/assets/images/logo-appmatics-2.png"
        alt="Appmatics Logo"
      />
    </a>

    <main
      class="flex-grow"
      :class="[
        {
          'bg_light mt-20 pb-10':
            path !== '/login' && path !== '/passwort-zuruecksetzen',
        },
        { 'px-[6.25%]': !breakpoint.mobile },
        {
          'px-[4%]':
            breakpoint.mobile &&
            path !== '/login' &&
            path !== '/passwort-zuruecksetzen',
        },
      ]"
    >
      <!-- This is where the content of each page will go -->
      <slot />
    </main>
    <Footer
      v-if="path !== '/login' && path !== '/passwort-zuruecksetzen'"
      class="min-[1920px]:px-[6.25%]"
      :class="[breakpoint.mobile ? 'px-[4%]' : 'px-[6.25%]']"
    />
    <div
      v-else
      class="text_regular_16 basic_text_grey ml-[4%] h-20 flex items-center"
    >
      Benötigen Sie Hilfe?
      <span class="cursor-pointer f_text_neutral_500 pl-1 underline"
        >Zum Support</span
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const path = ref(route.path);
const breakpoint = useBreakpoint().breakpoints;

watch(
  () => route.path,
  () => {
    path.value = route.path;
  }
);

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty("--vh", `${vh}px`);
// We listen to the resize event
window.addEventListener("resize", () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});
</script>

<style scoped>
.login {
  background-image: url("/img/LoginHintergrund.png");
  background-repeat: no-repeat;
  background-position: bottom right;
  background-size: 48.6% 100%;
}
.fullscreen {
  height: 100vh; /* Fallback for browsers that do not support Custom Properties */
  height: calc(var(--vh, 1vh) * 100);
}
</style>
