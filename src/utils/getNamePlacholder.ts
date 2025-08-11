export const toUpperCase = (str: string) => {
  return str.toUpperCase();
};

export const getNamePlacholder = (
  firstName: string,
  lastName: string,
): string => {
  return `${toUpperCase(firstName.charAt(0))}${toUpperCase(lastName.charAt(0))}`;
};
