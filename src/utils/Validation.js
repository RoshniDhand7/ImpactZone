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
      errors.barCode = "Barcode is required.";
    }

    return errors;
  };

  const certificationValidations = (data) => {
    if (!data.name) {
      errors.name = "Name is required.";
    }
    if (!data.certificationNumber) {
      errors.certificationNumber = "Certification number is required.";
    }
    if (!data.issuer) {
      errors.issuer = "Issuer is required.";
    }
    if (!data.acquiredDate) {
      errors.acquiredDate = "Acquired date is required.";
    }
    if (!data.expirationDate) {
      errors.expirationDate = "Expiration date is required.";
    }
    if (data.expirationDate < data.acquiredDate) {
      errors.expirationDate = "Expiration date cannot be less than acquired date.";
    }
    if (!data.descriptions) {
      errors.descriptions = "Description is required.";
    }
    return errors;
  };

  const notesValidation = (data) => {
    if (!data.note) {
      errors.note = "Please enter a note"
    }
    return errors;
  }

  return { loginValidations, securityValidations, certificationValidations, notesValidation };
};
export default validation;
