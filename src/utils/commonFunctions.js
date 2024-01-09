import { islandStates } from './constant';
import { entries, notEqual, values } from './javascript';
import formValidation from './validations';
import { Country, State, City } from 'country-state-city';

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

const getAllCountries = () => {
    const country = Country.getAllCountries()?.map((item) => ({ name: item.name, value: item.isoCode }));
    return country;
};
const getStatesByCountry = (countryCode) => {
    const states = State.getStatesOfCountry(countryCode);
    const filteredStates = states.filter((state) => !islandStates.includes(state.name)).map((item) => ({ name: item.name, value: item.isoCode }));
    return filteredStates;
};
const getCitiesByState = (countryCode, stateCode) => {
    const cities = City?.getCitiesOfState(countryCode, stateCode)?.map((item) => ({ name: item.name, value: item.name })) || [];
    return cities;
};

export { capitalizeCamelCase, showFormErrors, getAllCountries, getStatesByCountry, getCitiesByState };
