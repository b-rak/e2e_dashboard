<template>
  <div class="relative">
    <img
      src="~/assets/images/profilicon.png"
      alt="Profil-Icon"
      id="profile-icon"
      class="cursor-pointer h-10 w-10"
      @click="toggleProfileMenu()"
    />
    <div
      v-if="openProfileMenu"
      class="flex flex-col bg_light shadow_light_2 border_small absolute right-0 top-14 w-40 text-right"
      id="profile-menu"
    >
      <div class="p-4">Appmatics User</div>
      <div class="flex flex-col border-y border-y-[#cbd0d4]">
        <a href="/profil" class="p-4 hover:bg-[#cbd0d4]">Mein Profil</a>
        <a href="/support" class="p-4 hover:bg-[#cbd0d4]">Support</a>
      </div>
      <span
        class="p-4 cursor-pointer hover:bg-[#dfe4e7] hover:rounded-b-[0.75rem]"
        @click="logout()"
        >Logout</span
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getActivePinia } from "pinia";

const props = defineProps<{
  openProfileMenu: boolean;
}>();

const pinia = getActivePinia();

const logout = () => {
  useLogout();
  // clear all cookies
  const accessToken = useCookie("accessToken");
  const accessTokenExp = useCookie("accessTokenExp");
  const refreshToken = useCookie("refreshToken");
  const refreshTokenExp = useCookie("refreshTokenExp");
  const jwt = useCookie("jwt");

  accessToken.value = null;
  accessTokenExp.value = null;
  refreshToken.value = null;
  refreshTokenExp.value = null;
  jwt.value = null;

  // revert logged in state from local storage
  localStorage.setItem("loggedIn", "false");

  // reset all stores
  pinia._s.forEach((store) => store.$reset());
  // delete config and static data

  navigateTo("/login");
};

// TODO
const emit = defineEmits(["toggleProfileMenu"]);
const toggleProfileMenu = () => {
  console.log("EMIT", !props.openProfileMenu);
  emit("toggleProfileMenu", !props.openProfileMenu);
};
</script>
