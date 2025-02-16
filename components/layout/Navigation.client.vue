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
      <a href="/" id="company">
        <img
          src="~/assets/images/logo-company.png"
          alt="Company Logo"
          id="company-logo"
          class="cursor-pointer h-12 w-[8.75rem]"
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
      <ProfileIcon
        :openProfileMenu="openProfileMenu"
        @toggle-profile-menu="(open) => toggleProfileMenu(open)"
      />
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
        id="company"
        :class="{
          'filter blur-[5px] brightness-[0.7] select-none pointer-events-none':
            openMenu,
        }"
      >
        <img
          src="~/assets/images/logo-company.png"
          alt="Company Logo"
          id="company-logo"
          class="cursor-pointer h-12 w-[8.75rem]"
        />
      </a>
      <ProfileIcon
        :openProfileMenu="openProfileMenu"
        @toggle-profile-menu="(open) => toggleProfileMenu(open)"
        :class="{
          'filter blur-[5px] brightness-[0.7] select-none pointer-events-none':
            openMenu,
        }"
      />
    </div>
    <div
      class="fixed z-[10] top-20 left-0 md:hidden flex flex-col gap-8 py-6 px-10 bg_light shadow_light_2 border_small transform transition-all duration-[250ms] ease-[cubic-bezier(0.645,0.045,0.355,1)]"
      :class="[openMenu ? 'translate-x-0 ml-[4%]' : '-translate-x-full']"
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
  openProfileMenu: boolean;
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
const emit = defineEmits(["toggleMenu", "toggleProfileMenu"]);
const toggleMenu = () => {
  emit("toggleMenu", !props.openMenu);
};
const toggleProfileMenu = (open: boolean) => {
  emit("toggleProfileMenu", open);
};
</script>
