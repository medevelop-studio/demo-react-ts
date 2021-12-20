import validator from "validator";

export default data => {
  const errors: any = {};

  if (validator.isEmpty(data.login)) {
    errors.login = "required";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "required";
  }
  if (validator.isEmpty(data.name)) {
    errors.name = "required";
  }
  if (data.profitPercent > 100) {
    errors.profitPercent = "no more than 100";
  }

  return {
    isValid: !Object.keys(errors).length,
    errors
  };
};
