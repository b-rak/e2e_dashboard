import { serverApi } from "../utils/serverApi";
export default defineEventHandler(async (event): Promise<User | null> => {
  const api = serverApi(event);

  try {
    const res = await api.raw(`/users/self`, "GET", {});
    const user = res._data;
    event.context.user = user;
    return user;
  } catch (err) {
    if (err.status === 403) {
      // no user -> user should login again
      return null;
    } else {
      throw createError("An error occurred while fetching user.");
    }
  }
});
