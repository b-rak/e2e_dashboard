export default async <T>(url: string, body?: object) => {
  const obj: { method: any; server: boolean; body: object | undefined } = {
    method: body ? "POST" : "GET",
    server: true,
    body: body ? body : undefined,
  };

  const { data, error } = await useFetch<T>(url, {
    method: obj.method,
    server: obj.server,
    body: obj.body,
  });

  if (error.value) {
    throw createError({
      statusCode: error.value.statusCode,
      statusMessage: `Could not fetch data from ${url}.`,
    });
  }
  return data.value as T;
};
