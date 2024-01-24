<template>
  <div
    v-if="breakpoint.viewport !== 'xs' && breakpoint.viewport !== 'sm'"
    id="nav"
    class="min-h-[5rem] fixed top-0 z-10 flex justify-between items-center basic_white w-full"
    :class="[breakpoint.mobile ? 'px-[4%]' : 'px-[6.25%]']"
  >
    <div
      class="flex justify-around items-center gap-x-[3.75rem] lg:gap-x-[9.188rem]"
    >
      <a href="/" id="appmatics">
        <img
          src="~/assets/images/logo-appmatics-2.png"
          alt="Appmatics Logo"
          id="appmatics-logo"
          class="cursor-pointer h-6 w-[8.75rem]"
        />
      </a>
      <div id="cont-1" class="flex gap-x-14">
        <NavigationLink to="/dashboard" id="dashboard" text="Dashboard" />
        <NavigationLink to="/testfaelle" id="testfaelle" text="Testfälle" />
      </div>
    </div>
    <div id="part-2" class="flex justify-around items-center gap-x-[3.75rem]">
      <div id="cont-2" class="flex gap-x-14">
        <NavigationLink
          to="/mitteilungen"
          id="mitteilungen"
          text="Mitteilungen"
        />
        <NavigationLink to="/support" id="support" text="Support" />
        <NavigationLink to="/faq" id="faq" text="FAQ" />
      </div>
      <a href="/login" id="profile">
        <img
          src="~/assets/images/profilicon.png"
          alt="Profil-Icon"
          id="profile-icon"
          class="cursor-pointer h-10 w-10"
        />
      </a>
    </div>
  </div>
  <div v-else>
    <div
      class="flex justify-between items-center px-[4%] basic_white w-full h-20 relative"
    >
      <font-awesome-icon
        :icon="['fas', 'bars']"
        class="z-[11] w-10 !h-10 text-[#707070] transition-all duration-500 cursor-pointer"
        :class="{ 'opacity-0 scale-y-[0%]': openMenu }"
        @click="toggleMenu()"
        id="hamburger-button"
      />
      <font-awesome-icon
        :icon="['fas', 'xmark']"
        class="absolute z-[11] w-10 !h-10 text-[#707070] transition-all duration-500 cursor-pointer"
        :class="[openMenu ? 'opacity-1' : 'opacity-0 rotate-90']"
        @click="toggleMenu()"
        id="x-button"
      />
      <a
        href="/"
        id="appmatics"
        :class="{
          'filter blur-[5px] brightness-[0.7] select-none pointer-events-none':
            openMenu,
        }"
      >
        <img
          src="~/assets/images/logo-appmatics-2.png"
          alt="Appmatics Logo"
          id="appmatics-logo"
          class="cursor-pointer h-6 w-[8.75rem]"
        />
      </a>
      <a
        href="/login"
        id="profile"
        :class="{
          'filter blur-[5px] brightness-[0.7] select-none pointer-events-none':
            openMenu,
        }"
      >
        <img
          src="~/assets/images/profilicon.png"
          alt="Profil-Icon"
          id="profile-icon"
          class="cursor-pointer h-10 w-10"
        />
      </a>
    </div>
    <div
      class="fixed z-[10] top-0 left-0 md:hidden flex flex-col gap-4 p-6 pt-16 bg-[#eeeeee] transform transition-all duration-[250ms] ease-[cubic-bezier(0.645,0.045,0.355,1)]"
      :class="[openMenu ? 'translate-x-0' : '-translate-x-full']"
      id="menu"
    >
      <NavigationLink
        v-for="route in routes"
        :to="'/' + route.path"
        :id="route.path"
        :text="route.readableName"
        @click="$emit('toggleMenu', false)"
        class="w-fit"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  openMenu: boolean;
}>();

const routes = [
  {
    path: "dashboard",
    readableName: "Dashboard",
  },
  {
    path: "testfaelle",
    readableName: "Testfälle",
  },
  {
    path: "mitteilungen",
    readableName: "Mitteilungen",
  },
  {
    path: "support",
    readableName: "Support",
  },
  {
    path: "faq",
    readableName: "FAQ",
  },
];

const breakpoint = useBreakpoint().breakpoints;

const emit = defineEmits(["toggleMenu"]);
const toggleMenu = () => {
  emit("toggleMenu", !props.openMenu);
};
</script>

<style scoped>
/**
:global(#nav a:not([id]).selected) {
  color: #303436;
  font-weight: 700;
} */
</style>
