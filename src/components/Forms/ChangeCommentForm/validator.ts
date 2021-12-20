import validator from "validator";

export default data => {
  const errors: any = {};

  if (validator.isEmpty(data.text) || data.text.length < 2) {
    errors.text = "required";
  }

  return {
    isValid: !Object.keys(errors).length,
    errors
  };
};
