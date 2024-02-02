export default async (stepResultId: number, falsePositive: number) => {
  const config = useRuntimeConfig();
  const jwtStore = useJwtStore();
  const bearerToken = jwtStore.jwtData?.jwt.access_token;

  const url = config.public.BASE_URL + `/stepresults/${stepResultId}`;
  console.log("URL", url);
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + bearerToken,
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
