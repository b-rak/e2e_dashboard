export default async (stepResultId: number, falsePositive: number) => {
  const config = useRuntimeConfig();
  const url = config.public.BASE_URL + `/stepresults/${stepResultId}`;
  console.log("URL", url);
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: "Basic YXBwbWF0aWNzOnBhc3N3b3Jk",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      falsePositive: falsePositive,
    }),
  }).catch((error) => {
    console.error(error);
    throw createError({
      ...error.value,
      statusMessage: `Could not patch result ${url}.`,
    });
  });
};
