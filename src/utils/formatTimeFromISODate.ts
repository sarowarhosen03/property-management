const defaultOptions: Intl.DateTimeFormatOptions = {
  hour: "2-digit",
  minute: "2-digit",
};

export function formatTimeFromISODate(
  isoDate: string,
  options: Intl.DateTimeFormatOptions = {},
) {
  const date = new Date(isoDate);
  return date.toLocaleTimeString("en-US", { ...defaultOptions, ...options });
}
