export default async (
  currentPassword: string,
  newPassword: string,
  confirmationPassword: string
) => {
  const config = useRuntimeConfig();
  const jwtStore = useJwtStore();
  const bearerToken = jwtStore.jwtData?.jwt.access_token;

  const url = config.public.BASE_URL + `/auth/change-password`;

  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + bearerToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      currentPassword,
      newPassword,
      confirmationPassword,
    }),
  }).catch((error) => {
    console.error(error);
    throw createError({
      ...error.value,
      statusMessage: `Could not patch result ${url}.`,
    });
  });
};
