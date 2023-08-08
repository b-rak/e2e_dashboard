import { defineStore } from "pinia";

export const useDetailsStore = defineStore("details", () => {
  const icon = ref("");
  const name = ref("");

  return { icon, name };
});
