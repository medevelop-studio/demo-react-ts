import validator from "validator";

export default data => {
  const errors: any = {};

  if (validator.isEmpty(data.username)) {
    errors.username = "required";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "required";
  }

  return {
    isValid: !Object.keys(errors).length,
    errors
  };
};
