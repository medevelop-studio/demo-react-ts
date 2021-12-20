// import validator from "validator";

export default data => {
  const errors: any = {};

  // if (validator.isEmpty(data.price)) {
  //   errors.price = "required";
  // }

  return {
    isValid: !Object.keys(errors).length,
    errors
  };
};
