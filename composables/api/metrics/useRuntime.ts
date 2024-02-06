export default async (stepId: number, limit?: number) => {
  const queryParams = [limit !== undefined ? `limit=${limit}` : ""]
    .filter(Boolean) // Remove empty strings
    .join("&");

  const url = `/api/metrics/runtime?stepId=${stepId}${
    queryParams ? `&${queryParams}` : ""
  }`;
  return await useBaseFetch<Array<Runtime>>(url);
};
