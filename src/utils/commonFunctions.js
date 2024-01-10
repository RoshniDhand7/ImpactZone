import { multipartApi } from '../services/api';
import EndPoints from '../services/endPoints';
import { islandStates } from './constant';
import { entries, notEqual, values } from './javascript';
import formValidation from './validations';
import { Country, State, City } from 'country-state-city';
import { confirmDialog } from 'primereact/confirmdialog';

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
const confirmDelete = (onDeleteAction, confirmationMessage, position, confirmationHeader = 'Delete Confirmation') => {
    confirmDialog({
        message: confirmationMessage,
        icon: 'pi pi-info-circle',
        header: confirmationHeader,
        acceptClassName: 'bg-main',
        position,
        accept: () => {
            onDeleteAction();
        },
        reject: () => {},
    });
};

const uploadImages = async (images) => {
    const promises = images?.map(async (item) => {
        if (typeof item === 'string') {
            return item;
        } else {
            const formData = new FormData();
            formData.append('file', item);
            const res = await multipartApi('post', EndPoints.UPLOAD_FILES, formData);
            if (res.success && res.data) {
                console.log('data>>', res.data);
                return res.data.path;
            }
        }
    });

    const urls = await Promise.all(promises);
    return urls;
};
const mobileFormatted = (phoneNumber) => {
    if (phoneNumber) {
        const cleaned = phoneNumber?.toString().replace(/\D/g, '');
        const match = cleaned?.match(/^(\d{3})(\d{3})(\d{4})$/);

        if (match) {
            return `(${match[1]}) ${match[2]}-${match[3]}`;
        }
    }
    return phoneNumber;
};

export { capitalizeCamelCase, showFormErrors, getAllCountries, getStatesByCountry, getCitiesByState, confirmDelete, uploadImages, mobileFormatted };
