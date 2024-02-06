export default (params: QueryParams): string => {
  return Object.keys(params)
    .map(
      (key) =>
        encodeURIComponent(key) +
        "=" +
        encodeURIComponent(params[key].toString())
    )
    .join("&");
};
