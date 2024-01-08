import { entries, notEqual, values } from './javascript';
import formValidation from './validations';

const showFormErrors = (data, setData, ignore) => {
  let formErrors = {};
  entries(data).forEach(([key, value]) => {
    formErrors = {
      ...formErrors,
      ...formValidation(key, value, data, ignore),
    };
  });
  setData({ ...data, formErrors });
  return !values(formErrors).some((v) => notEqual(v, ''));
};

const capitalizeCamelCase = (str) => {
  let words = str.split(/(?=[A-Z])/);
  let capitalizedWords = words.map(function (word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  let capitalizedString = capitalizedWords.join(' ');
  return capitalizedString;
};

export { capitalizeCamelCase, showFormErrors };
