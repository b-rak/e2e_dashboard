import { H3Event } from "h3";
import Client from "~/server/api/client";
import objectToQueryString from "./objectToQueryString";

const serverApi = (event: H3Event) => {
  const BASE_URL = useRuntimeConfig().public.BASE_URL;

  const accessToken = getCookie(event, "Authorization");
  const refreshToken = getCookie(event, "Refresh-Token");

  const client = new Client(BASE_URL as string, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Refresh-Token": `Bearer ${refreshToken}`,
    } as HeadersInit,
  });

  return client;
};
export { serverApi, objectToQueryString };
