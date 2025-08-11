export function formatNumberShort(number: number): string {
  if (number >= 1e6) {
    return (number / 1e6).toFixed(0) + "M";
  } else if (number >= 1e3) {
    return (number / 1e3).toFixed(0) + "k";
  } else {
    return number?.toString();
  }
}
