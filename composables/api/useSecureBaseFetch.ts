export default async <T>(url: string, body?: object) => {
  const config = useRuntimeConfig();

  const bearerToken = useCookie("accessToken").value;
  console.log("BEARER:", bearerToken);
  if (!bearerToken) {
    throw createError({
      statusCode: 403,
      statusMessage: `No bearer token provided.`,
    });
  }

  const obj = {
    method: body ? "POST" : "GET",
    baseURL: config.public.BASE_URL,
    headers: { Authorization: "Bearer " + bearerToken },
    server: true,
    body: body ? body : undefined,
  };
  const { data, error } = await useFetch<T>(url, obj);

  if (error.value) {
    console.error(error);
    throw createError({
      ...error.value,
      statusMessage: `Could not fetch data from ${url}.`,
    });
  }

  return data.value as T;
};
