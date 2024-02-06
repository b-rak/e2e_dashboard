export default async (email: string, password: string) => {
  const url = `/api/authentication/authenticate`;
  const body = {
    email: email,
    password: password,
  };
  return await useBaseFetch<{ message: string }>(url, body);
};
