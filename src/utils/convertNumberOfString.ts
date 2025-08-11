export const convertNumberOfString = (obj) => {
  const newObj = { ...obj };
  if (newObj.details.bedrooms) {
    newObj.details.bedrooms = String(newObj.details.bedrooms);
  }
  if (newObj.details.totalFloors) {
    newObj.details.totalFloors = String(newObj.details.totalFloors);
  }
  return newObj;
};
