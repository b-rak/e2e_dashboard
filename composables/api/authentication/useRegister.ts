export default async (
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  role: "ADMIN" | "MANAGER" | "USER"
) => {
  const url = `/auth/register`;
  const body = {
    firstname,
    lastname,
    email,
    password,
    role,
  };
  return await useBaseFetch<JWT>(url, body);
};
