import { serverApi, objectToQueryString } from "../utils/serverApi";
export default defineEventHandler(async (event): Promise<Array<Runtime>> => {
  const api = serverApi(event);
  const query = getQuery(event) as QueryParams;

  try {
    const res = await api.raw(
      `/runtime/${query.stepId}${query.limit ? "?limit=" + query.limit : ""}`,
      "GET",
      {}
    );

    return res._data as Array<Runtime>;
  } catch (err) {
    throw createError("An error occurred while fetching the data.");
  }
});
