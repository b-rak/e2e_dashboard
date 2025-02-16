import { serverApi } from "../utils/serverApi";

export default defineEventHandler(async (event) => {
  const api = serverApi(event);
  const { refreshToken } = await readBody(event);
  try {
    const access_token = "access_token";
    const refresh_token = "refresh_token";
    const access_payload = { exp: 86400, iat: 0 };
    const refresh_payload = { exp: 604800, iat: 0 };

    // commented out due to mock
    // const res = await api.raw("/auth/refresh-token", "POST", {
    //   body: { refreshToken },
    // });

    // const access_token = res._data.access_token;
    // const refresh_token = res._data.refresh_token;
    // const access_payload = await JSON.parse(
    //   Buffer.from(access_token.split(".")[1], "base64").toString()
    // );
    // const refresh_payload = await JSON.parse(
    //   Buffer.from(refresh_token.split(".")[1], "base64").toString()
    // );

    setCookie(event, "Authorization", access_token, {
      maxAge: access_payload.exp - access_payload.iat,
      httpOnly: true,
      sameSite: true,
    });
    setCookie(event, "Refresh-Token", refresh_token, {
      maxAge: refresh_payload.exp - refresh_payload.iat,
      httpOnly: true,
      sameSite: true,
    });

    return { message: "success" };
  } catch (err) {
    throw createError("An error occurred while fetching the data.");
  }
});
