export default async <T>(url: string) => {
  const config = useRuntimeConfig();
  const { data, error } = await useFetch<T>(url, {
    method: "GET",
    baseURL: config.public.BASE_URL,
    headers: {
      Authorization: "Basic YXBwbWF0aWNzOnBhc3N3b3Jk",
    },
    server: false,
  });

  if (error.value) {
    console.error(error);
    throw createError({
      ...error.value,
      statusMessage: `Could not fetch data from ${url}.`,
    });
  }

  return data.value as T;
};
