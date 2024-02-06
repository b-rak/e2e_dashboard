export default async (stepResultId: number, falsePositive: number) => {
  // can't use useBaseFetch due to PATCH method
  await useFetch(
    `/api/stepResults/patchStepResult?stepResultId=${stepResultId}`,
    {
      method: "PATCH",
      body: JSON.stringify({
        falsePositive: falsePositive,
      }),
    }
  ).catch((error) => {
    console.error(error);
    throw createError({
      ...error.value,
      statusMessage: `Could not patch result with ID ${stepResultId}.`,
    });
  });
};
