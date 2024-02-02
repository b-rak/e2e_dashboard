export default async <T>(url: string, body?: object) => {
  const config = useRuntimeConfig();

  const obj = {
    method: body ? "POST" : "GET",
    baseURL: config.public.BASE_URL,
    server: true,
    body: body ? body : undefined,
  };
  const { data, error } = await useFetch<T>(url, obj);

  if (error.value) {
    console.error(error.value);
    console.error(error.value.statusCode);
    throw createError({
      statusCode: error.value.statusCode,
      statusMessage: `Could not fetch data from ${url}.`,
    });
  }

  return data.value as T;
};
