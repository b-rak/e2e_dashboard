import { serverApi, objectToQueryString } from "../utils/serverApi";
export default defineEventHandler(async (event): Promise<Dashboard[]> => {
  const api = serverApi(event);
  const query = getQuery(event) as QueryParams;

  try {
    const res = await api.raw(
      `/dashboards?` + objectToQueryString(query),
      "GET",
      {}
    );

    return res._data as Dashboard[];
  } catch (err) {
    throw createError("An error occurred while fetching the data.");
  }
});
