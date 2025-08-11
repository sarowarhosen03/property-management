export const queryString = (params: {
  [key: string]: string | string[] | undefined;
}): string => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((val) => query.append(key, val));
    } else if (value !== undefined) {
      query.append(key, value);
    }
  });
  if (!query.get("page")) {
    query.append("page", "1");
  }
  return query.toString();
};

export function buildQueryString(params: Record<string, any>): string {
  const queryString = Object.keys(params)
    .map((key) => {
      const value = params[key];
      if (Array.isArray(value)) {
        return value
          .map((val) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
          .join("&");
      }
      if (value !== undefined && value !== null) {
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      }
      return "";
    })
    .filter(Boolean)
    .join("&");

  return queryString;
}
