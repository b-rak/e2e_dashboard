export default async (refreshToken: string) => {
  const url = `/auth/refresh-token`;
  const body = {
    refreshToken: refreshToken,
  };
  return await useBaseFetch<JWT>(url, body);
};
