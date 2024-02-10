import { defineStore } from "pinia";

export const useDashboardCasesStore = defineStore("dashboardCases", {
  state: () => ({
    /** @type  */
    dashboardCasesData: null as staticDashboardCases | null,
  }),
  actions: {
    async getDashboardCases(customerName: string) {
      try {
        const dashboards = await useDashboards();
        const cases = await useCases();
        const sorted = useGroupByProperty(cases, "groupId");
        const test = [];
        for (const sort of sorted) {
          test.push({
            groupId: sort[0].groupId,
            caseList: sort,
          });
        }
        const obj = { dashboards: dashboards, cases: test };
        this.dashboardCasesData = obj;
      } catch (e: any) {
        if (isNuxtError(e)) {
          throw createError({
            statusCode: e.statusCode,
            statusMessage: e.message,
            fatal: true,
          });
        }
      }
      //} catch (error: any) {
      //  console.error("Error loading config file:", error);
      //  throw createError({
      //    statusCode: 403,
      //    statusMessage: error.statusMessage,
      //  });
      //}
    },
  },
});
