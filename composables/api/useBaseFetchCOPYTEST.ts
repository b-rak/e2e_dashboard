export default async <T>(url: string) => {
  const config = useRuntimeConfig();
  const retries = 3; // Set the number of retries
  let data: T | null = null;
  let error: Error | null = null;
  for (let retryCount = 0; retryCount < retries; retryCount++) {
    try {
      (error = null),
        (data = await useFetch<T>(url, {
          method: "GET",
          baseURL: config.public.BASE_URL,
          headers: {
            Authorization: "Basic YXBwbWF0aWNzOnBhc3N3b3Jk",
          },
          server: false,
        }));
      break;
    } catch (err) {
      console.log("RETRY:", retryCount);
      error = err as Error;
      console.error(error);
    }
  }
  if (error) {
    throw createError({
      statusMessage: `Could not fetch data from ${url}.`,
    });
  }
  return data as T;
};
