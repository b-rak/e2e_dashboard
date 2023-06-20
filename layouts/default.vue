<template>
  <div
    class="h-screen w-screen flex flex-col m-0"
    :class="[path === '/login' ? 'login' : '']"
  >
    <Navigation v-if="path !== '/login'" style="min-height: 80px" />
    <a
      v-else
      href="/"
      style="min-height: 80px"
      class="ml-[4%] flex items-center"
    >
      <img
        class="cursor-pointer h-6 w-[8.75rem]"
        src="~/assets/images/logo-appmatics-2.png"
        alt="Appmatics Logo"
      />
    </a>

    <main style="flex: 1">
      <!-- This is where the content of each page will go -->
      <slot />
    </main>
    <Footer v-if="path !== '/login'" style="min-height: 32px" />
    <div v-else class="text_regular_16 text-[#707070] p-2 ml-[4%] mb-12">
      Benötigen Sie Hilfe?
      <span class="cursor-pointer f_text_secondary_00 pl-1">Zum Support</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const path = ref(route.path);
</script>

<style scoped>
.login {
  background-image: url("/img/LoginHintergrund.png");
  background-repeat: no-repeat;
  background-position: bottom right;
  background-size: 48.6% 100%;
}
</style>
