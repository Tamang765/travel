export const appendFormValuesToFormData = (formData, values) => {
  for (const key in values) {
    if (values.hasOwnProperty(key)) {
      formData.append(key, values[key]);
    }
  }
};
