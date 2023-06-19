const validation = () => {
  let errors = {};

  const loginValidations = (data) => {
    if (!data.email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Email is invalid.";
    }
    if (!data.password) {
      errors.password = "Password is required";
    } else if (data.password.length < 8) {
      errors.password = "Password must be more than 8 characters.";
    }

    return errors;
  };

  const securityValidations = (data) => {
    if (!data.firstName) {
      errors.firstName = "First Name is required.";
    }
    if (!data.lastName) {
      errors.lastName = "Last Name is required.";
    }
    if (!data.email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Email is invalid.";
    }
    if (!data.barCode) {
      errors.barCode = "barCode is required.";
    }

    return errors;
  };

  return { loginValidations, securityValidations };
};
export default validation;
