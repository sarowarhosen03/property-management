const urlEncode = (params: Record<string, any>): string => {
  const queryString = Object.keys(params)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`,
    )
    .join("&");
  return queryString;
};

const urlDecode = <T>(queryString: string): Partial<T> => {
  const params = new URLSearchParams(queryString);
  const result: Partial<T> = {};
  params.forEach((value, key) => {
    (result as any)[key] = value;
  });
  return result;
};

export { urlDecode, urlEncode };
