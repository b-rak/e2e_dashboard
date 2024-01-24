export default async (stepId: number, limit?: number) => {
  const queryParams = [limit !== undefined ? `limit=${limit}` : ""]
    .filter(Boolean) // Remove empty strings
    .join("&");

  const url = `/runtime/${stepId}${queryParams ? `?${queryParams}` : ""}`;
  return await useBaseFetch<Array<Runtime>>(url);
};
