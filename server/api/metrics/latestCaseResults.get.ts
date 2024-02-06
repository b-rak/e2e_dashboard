import { serverApi, objectToQueryString } from "../utils/serverApi";
export default defineEventHandler(async (event): Promise<Array<CaseResult>> => {
  const api = serverApi(event);
  const query = getQuery(event) as QueryParams;

  try {
    const res = await api.raw(
      `/latest-case-results?` + objectToQueryString(query),
      "GET",
      {}
    );

    return res._data as Array<CaseResult>;
  } catch (err) {
    throw createError("An error occurred while fetching the data.");
  }
});
