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
      class="flex flex-col bg_light shadow_light_2 border_small absolute right-0 top-16 text-right text_regular_18 basic_text_grey w-56"
      id="profile-menu"
    >
      <div class="px-6 py-6">{{ `${user?.firstname} ${user?.lastname}` }}</div>
      <div class="flex flex-col border-y border-y-[#cbd0d4]">
        <a href="/profil" class="px-6 py-6 hover:bg-[#cbd0d4]">Mein Profil</a>
        <a href="/support" class="px-6 py-6 hover:bg-[#cbd0d4]">Support</a>
      </div>
      <span
        class="px-6 py-6 cursor-pointer hover:bg-[#dfe4e7] hover:rounded-b-[0.75rem]"
        @click="logout()"
        >Logout</span
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getActivePinia } from "pinia";
const user = await useUser();
const props = defineProps<{
  openProfileMenu: boolean;
}>();

const pinia = getActivePinia();

const logout = async () => {
  await useLogout();
  emit("toggleProfileMenu", false);
  // reset all stores
  pinia._s.forEach((store) => store.$reset());
  // delete config and static data

  navigateTo("/login");
};

const emit = defineEmits(["toggleProfileMenu"]);
const toggleProfileMenu = () => {
  emit("toggleProfileMenu", !props.openProfileMenu);
};
</script>
