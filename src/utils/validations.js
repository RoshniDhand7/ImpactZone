import { FirstletterUpperCase, equal, length } from './javascript';
import { emailValidation, passwordValidation } from './regex';

const formValidation = (name, value, data, required = []) => {
  let formErrors = { ...data.formErrors };
  switch (name) {
    case 'email':
      if (equal(length(value))) {
        formErrors[name] = `${FirstletterUpperCase(name)} is required!`;
      } else if (!emailValidation(value)) {
        formErrors[name] = `Please enter valid email!`;
      } else {
        formErrors[name] = '';
      }
      break;
    case 'password':
      if (equal(length(value))) {
        formErrors[name] = `${FirstletterUpperCase(name)} is required!`;
      } else if (!passwordValidation(value)) {
        formErrors[name] =
          `Please enter a password with 8-16 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character`;
      } else {
        formErrors[name] = '';
      }
      break;
    default:
      break;
  }
  return formErrors;
};

export default formValidation;
