import { serverApi } from "../utils/serverApi";
export default defineEventHandler(async (event) => {
  const api = serverApi(event);

  try {
    // commented out due to mock
    // const res = await api.raw(`/api/v1/auth/logout`, "GET", {});
    setCookie(event, "Authorization", "", { maxAge: -1 });
    setCookie(event, "Refresh-Token", "", { maxAge: -1 });
  } catch (err) {
    throw createError("An error occurred while fetching the data.");
  }
});
