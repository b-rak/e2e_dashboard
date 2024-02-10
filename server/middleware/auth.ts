import getNewToken from "../api/utils/getNewToken";

export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);

  if (
    cookies["Authorization"] &&
    cookies["Refresh-Token"] &&
    cookies["Authorization"] !== "" &&
    cookies["Refresh-Token"] !== ""
  ) {
    const user = await $fetch("http://avv.monitoring.appmatics.de/users/self", {
      method: "GET",
      headers: { Authorization: "Bearer " + cookies["Authorization"] },
    });
    event.context.user = user;
  } else if (
    !cookies["Authorization"] &&
    cookies["Refresh-Token"] &&
    cookies["Refresh-Token"] !== ""
  ) {
    await getNewToken(event);
    const user = await $fetch("http://avv.monitoring.appmatics.de/users/self", {
      method: "GET",
    });
    event.context.user = user;
  } else {
    event.context.user = null;
  }
});
