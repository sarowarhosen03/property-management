type SkipKeys = string[];
const appendFormData = (
  data: Record<string, any>,
  formData: FormData,
  root: string | null = null,
): void => {
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const formKey = root ? `${root}[${key}]` : key;
      const value = data[key];

      if (value instanceof File) {
        formData.append(formKey, value);
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          appendFormData({ [index]: item }, formData, formKey);
        });
      } else if (
        typeof value === "object" &&
        value !== null &&
        !(value instanceof Date)
      ) {
        appendFormData(value, formData, formKey);
      } else {
        formData.append(formKey, value);
      }
    }
  }
};

function convertToFormData(data: any, skipKeys: SkipKeys = []): FormData {
  const formData = new FormData();

  function appendFormData(
    formData: FormData,
    data: any,
    parentKey: string = "",
  ): void {
    if (data && typeof data === "object" && !(data instanceof File)) {
      if (Array.isArray(data)) {
        data.forEach((value, index) => {
          const formKey = `${parentKey}[${index}]`;
          appendFormData(formData, value, formKey);
        });
      } else {
        Object.keys(data).forEach((key) => {
          if (skipKeys.includes(key)) return;

          const formKey = parentKey ? `${parentKey}[${key}]` : key;
          appendFormData(formData, data[key], formKey);
        });
      }
    } else {
      formData.append(parentKey, data);
    }
  }

  appendFormData(formData, data);

  return formData;
}

export { appendFormData, convertToFormData };
