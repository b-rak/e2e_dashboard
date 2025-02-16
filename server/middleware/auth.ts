import getNewToken from "../api/utils/getNewToken";
import user from "../mocks/user/user";

export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);
  const BASE_URL = useRuntimeConfig().public.BASE_URL;
  if (
    cookies["Authorization"] &&
    cookies["Refresh-Token"] &&
    cookies["Authorization"] !== "" &&
    cookies["Refresh-Token"] !== ""
  ) {
    // commented out due to mock
    // const user = await $fetch(`${BASE_URL}/users/self`, {
    //   method: "GET",
    //   headers: { Authorization: "Bearer " + cookies["Authorization"] },
    // });
    event.context.user = user;
  } else if (
    !cookies["Authorization"] &&
    cookies["Refresh-Token"] &&
    cookies["Refresh-Token"] !== ""
  ) {
    const newAccessToken = await getNewToken(event);
    // commented out due to mock
    // const user = await $fetch(`${BASE_URL}/users/self`, {
    //   method: "GET",
    //   headers: { Authorization: "Bearer " + newAccessToken },
    // });
    event.context.user = user;
  } else {
    event.context.user = null;
  }
});
