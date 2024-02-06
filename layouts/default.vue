<template>
  <div
    class="flex flex-col fullscreen"
    :class="[
      {
        login:
          (path === '/login' || path === '/passwort-zuruecksetzen') &&
          !breakpoint.mobile,
      },
      { 'overflow-y-hidden': menuOpen },
    ]"
  >
    <Navigation
      v-if="path !== '/login' && path !== '/passwort-zuruecksetzen' && loggedIn"
      @toggle-menu="(open: boolean) => menu(open)"
      :openMenu="menuOpen"
      @toggle-profile-menu="(open: boolean) => profileMenu(open)"
      :openProfileMenu="openProfileMenu"
    />
    <a v-else href="/" class="h-[5rem] ml-[4%] flex items-center">
      <img
        class="cursor-pointer h-6 w-[8.75rem]"
        src="~/assets/images/logo-appmatics-2.png"
        alt="Appmatics Logo"
      />
    </a>

    <main
      class="flex-grow bg_light py-10"
      :class="[
        {
          'mt-20':
            breakpoint.viewport !== 'xs' &&
            breakpoint.viewport !== 'sm' &&
            path !== '/login' &&
            path !== '/passwort-zuruecksetzen' &&
            loggedIn,
        },
        { 'px-[6.25%]': !breakpoint.mobile },
        {
          'px-[4%]':
            breakpoint.mobile &&
            path !== '/login' &&
            path !== '/passwort-zuruecksetzen',
        },
        {
          'filter blur-[5px] brightness-[0.7] select-none pointer-events-none':
            menuOpen,
        },
        {
          '!bg-transparent':
            !breakpoint.mobile &&
            (path === '/login' || path === '/passwort-zuruecksetzen'),
        },
      ]"
    >
      <!-- This is where the content of each page will go -->
      <slot />
    </main>
    <Footer
      v-if="path !== '/login' && path !== '/passwort-zuruecksetzen' && loggedIn"
      class="min-[1920px]:px-[6.25%]"
      :class="[
        breakpoint.mobile ? 'px-[4%]' : 'px-[6.25%]',
        {
          'filter blur-[5px] brightness-[0.7] select-none pointer-events-none':
            menuOpen,
        },
      ]"
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
const user = await useFetch("/api/user", {
  headers: useRequestHeaders(["cookie"]),
});
const loggedIn = user.data.value;

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

// mobile menu
const menuOpen = ref(false);
const menu = (open: boolean) => {
  menuOpen.value = open;
};

window.addEventListener("click", (event) => {
  if (!menuOpen.value) return;

  const menuElement = document.getElementById("menu") as HTMLElement;
  const hamburgerElement = document.getElementById(
    "hamburger-button"
  ) as HTMLElement;
  const closeElement = document.getElementById("x-button") as HTMLElement;
  console.log(menuElement);

  if (
    !menuElement.contains(event.target as Node) &&
    !hamburgerElement.contains(event.target as Node) &&
    !closeElement.contains(event.target as Node)
  ) {
    menuOpen.value = false;
  }
});

// profile menu
const openProfileMenu = ref(false);
const profileMenu = (open: boolean) => {
  openProfileMenu.value = open;
};

window.addEventListener("click", (event) => {
  if (!openProfileMenu.value) return;

  const profileMenuElement = document.getElementById(
    "profile-menu"
  ) as HTMLElement;
  const profileIconElement = document.getElementById(
    "profile-icon"
  ) as HTMLElement;

  if (
    !profileMenuElement.contains(event.target as Node) &&
    !profileIconElement.contains(event.target as Node)
  ) {
    openProfileMenu.value = false;
  }
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
