const capitalizeFirstChar = (str: string): string => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const convertToPathFormat = (str: string): string => {
  return str.toLowerCase().split(" ").join("-");
};

const containsFeature = (features: string[], feature: string): boolean => {
  return features.includes(feature);
};

export { capitalizeFirstChar, containsFeature, convertToPathFormat };
