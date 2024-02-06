import { serverApi, objectToQueryString } from "../utils/serverApi";
export default defineEventHandler(async (event): Promise<Array<PassRate>> => {
  const api = serverApi(event);
  const query = getQuery(event) as QueryParams;

  try {
    const res = await api.raw(
      `/dashboard-pass-rate?` + objectToQueryString(query),
      "GET",
      {}
    );

    return res._data as Array<PassRate>;
  } catch (err) {
    throw createError("An error occurred while fetching the data.");
  }
});
