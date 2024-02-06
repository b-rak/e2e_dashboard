import { serverApi, objectToQueryString } from "../utils/serverApi";
export default defineEventHandler(async (event): Promise<Array<Step>> => {
  const api = serverApi(event);
  const query = getQuery(event) as QueryParams;

  try {
    const res = await api.raw(
      `/steps?` + objectToQueryString(query),
      "GET",
      {}
    );

    return res._data as Array<Step>;
  } catch (err) {
    throw createError("An error occurred while fetching the data.");
  }
});
