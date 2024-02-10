export default async () => {
  const url = `/api/user`;
  return await useBaseFetch<User | null>(url);
};
