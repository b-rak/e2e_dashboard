import { serverApi } from "../utils/serverApi";
export default defineEventHandler(
  async (event): Promise<Array<LatestCaseResult>> => {
    const api = serverApi(event);

    try {
      const res = await api.raw(`/two-latest-case-result`, "GET", {});

      return res._data as Array<LatestCaseResult>;
    } catch (err) {
      throw createError("An error occurred while fetching the data.");
    }
  }
);
