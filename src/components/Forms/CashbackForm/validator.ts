import validator from "validator";

export default data => {
  const errors: any = {};

  if (validator.isEmpty(data.amount)) {
    errors.amount = "required";
  }
  if (data.amount > 100) {
    errors.amount = "not less than 100";
  }

  return {
    isValid: !Object.keys(errors).length,
    errors
  };
};
