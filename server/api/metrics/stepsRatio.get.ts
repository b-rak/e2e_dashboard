import { serverApi, objectToQueryString } from "../utils/serverApi";
export default defineEventHandler(
  async (
    event
  ): Promise<Array<{ caseId: number; results: Array<CasePassRate> }>> => {
    const api = serverApi(event);
    const query = getQuery(event) as QueryParams;

    try {
      const res = await api.raw(
        `/steps-ratio?` + objectToQueryString(query),
        "GET",
        {}
      );

      return res._data as Array<{
        caseId: number;
        results: Array<CasePassRate>;
      }>;
    } catch (err) {
      throw createError("An error occurred while fetching the data.");
    }
  }
);
