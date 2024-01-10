import { defineStore } from "pinia";

export const useConfigStore = defineStore("config", {
  state: () => ({
    /** @type ConfigData */
    configData: null as ConfigData | null,
  }),
  actions: {
    async loadConfigFile(fileName: string) {
      try {
        const res = await fetch(`${fileName}`);
        console.log(res);
        const data = await res.clone().json();
        this.configData = data;
      } catch (error) {
        console.error("Error loading config file:", error);
      }
    },
  },
});
