import { langType } from "@/app/[lang]/(main)/page";
import { providenceDistricList } from "./Areas";

export default function getTranslatedProvinceDistrict({
  from,
  to,
  state,
  city,
}: {
  from: langType;
  to: langType;
  state?: string;
  city?: string;
}) {
  // Default to original values in case translation isn't found
  let translatedState = state;
  let translatedCity = city;

  // Check if the from language and state exist in the providenceDistricList
  if (providenceDistricList[from] && providenceDistricList[from][state]) {
    // Find the index of the `state` in the `from` language list
    const stateIndex = Object.keys(providenceDistricList[from]).indexOf(state);

    // Translate the state if index is valid and exists in the `to` language list
    if (stateIndex !== -1) {
      translatedState = Object.keys(providenceDistricList[to])[stateIndex];

      // Find the city index within the state
      const cityIndex = providenceDistricList[from][state].indexOf(city);

      // Translate the city if the index is valid and exists in the `to` language list
      if (cityIndex !== -1) {
        translatedCity = providenceDistricList[to][translatedState][cityIndex];
      }
    }
  }

  return { state: translatedState, city: translatedCity };
}
