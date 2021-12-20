import validator from "validator";

export default data => {
  const errors: any = {};

  if (validator.isEmpty(data.amount)) {
    errors.amount = "required";
  }

  return {
    isValid: !Object.keys(errors).length,
    errors
  };
};
