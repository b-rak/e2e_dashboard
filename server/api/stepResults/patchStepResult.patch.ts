import { serverApi } from "../utils/serverApi";
export default defineEventHandler(async (event) => {
  const api = serverApi(event);
  const query = getQuery(event) as QueryParams;
  const { falsePositive } = await readBody(event);

  try {
    const res = await api.raw(`/stepresults/${query.stepResultId}`, "PATCH", {
      body: JSON.stringify({
        falsePositive: falsePositive,
      }),
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    throw createError("An error occurred while fetching the data.");
  }
});
