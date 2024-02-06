import { serverApi, objectToQueryString } from "../utils/serverApi";
export default defineEventHandler(async (event): Promise<Array<StepResult>> => {
  const api = serverApi(event);
  const query = getQuery(event) as QueryParams;

  try {
    const res = await api.raw(
      `/stepresults?` + objectToQueryString(query),
      "GET",
      {}
    );

    return res._data as Array<StepResult>;
  } catch (err) {
    throw createError("An error occurred while fetching the data.");
  }
});
