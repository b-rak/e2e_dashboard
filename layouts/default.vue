<template>
  <div
    class="grid min-h-full grid-rows-[auto_1fr_auto] h-screen"
    :class="[
      path === '/login' || path === '/passwort-zuruecksetzen' ? 'login' : '',
    ]"
  >
    <Navigation
      v-if="path !== '/login' && path !== '/passwort-zuruecksetzen'"
      class="min-h-[5rem] fixed top-0 z-10"
    />
    <a v-else href="/" class="h-[5rem] ml-[4%] flex items-center">
      <img
        class="cursor-pointer h-6 w-[8.75rem]"
        src="~/assets/images/logo-appmatics-2.png"
        alt="Appmatics Logo"
      />
    </a>

    <main
      class="px-[7.5rem] min-[1920px]:px-[6.25%] h-full"
      :class="[
        path !== '/login' && path !== '/passwort-zuruecksetzen'
          ? 'bg_light pt-20'
          : '',
      ]"
    >
      <!-- This is where the content of each page will go -->
      <slot />
    </main>
    <Footer
      v-if="path !== '/login' && path !== '/passwort-zuruecksetzen'"
      class="min-h-[2rem] bg_light px-[7.5rem] min-[1920px]:px-[6.25%]"
    />
    <div v-else class="text_regular_16 basic_text_grey p-2 ml-[4%] mb-12">
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

watch(
  () => route.path,
  () => {
    path.value = route.path;
  }
);
</script>

<style scoped>
.login {
  background-image: url("/img/LoginHintergrund.png");
  background-repeat: no-repeat;
  background-position: bottom right;
  background-size: 48.6% 100%;
}
</style>
