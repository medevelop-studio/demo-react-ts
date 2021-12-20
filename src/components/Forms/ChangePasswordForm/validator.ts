import validator from "validator";

export default data => {
  const errors: any = {};

  if (validator.isEmpty(data.newPassword)) {
    errors.newPassword = "required";
  }
  if (validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "required";
  }

  if (!validator.equals(data.newPassword, data.confirmPassword)) {
    errors.newPassword = "not equal";
    errors.confirmPassword = "not equal";
  }

  return {
    isValid: !Object.keys(errors).length,
    errors
  };
};
