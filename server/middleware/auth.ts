import getNewToken from "../api/utils/getNewToken";

export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);

  if (cookies["Authorization"] && cookies["Refresh-Token"]) {
    //ToDo: const user = await getUser()
    event.context.user = {
      name: "Appmatics",
      projectToken: "DEMO",
    }; // user
  } else if (!cookies["Authorization"] && cookies["Refresh-Token"]) {
    await getNewToken(event);
    //ToDo: const user = await getUser()
    event.context.user = {
      name: "Appmatics",
      projectToken: "DEMO",
    }; // user
  } else {
    event.context.user = null;
  }
});
