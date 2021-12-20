// import validator from "validator";

export default data => {
  const errors: any = {};

  return {
    isValid: !Object.keys(errors).length,
    errors
  };
};
