import { debounce as lodashDebounce } from "lodash";

export function debounce(func: (...args: any[]) => void, wait: number) {
  return lodashDebounce(func, wait);
}
