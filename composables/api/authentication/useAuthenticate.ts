export default async (email: string, password: string) => {
  const url = `/auth/authenticate`;
  const body = {
    email: email,
    password: password,
  };
  return await useBaseFetch<JWT>(url, body);
};
