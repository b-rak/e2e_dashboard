import { serverApi, objectToQueryString } from "../utils/serverApi";
export default defineEventHandler(async (event): Promise<Array<Case>> => {
  const api = serverApi(event);
  const query = getQuery(event) as QueryParams;

  try {
    const res = await api.raw(
      `/cases?` + objectToQueryString(query),
      "GET",
      {}
    );

    return res._data as Array<Case>;
  } catch (err) {
    throw createError("An error occurred while fetching the data.");
  }
});
