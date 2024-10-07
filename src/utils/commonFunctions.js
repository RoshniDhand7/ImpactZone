import { useMemo } from 'react';
import api from '../services/api';
import EndPoints from '../services/endPoints';
import { islandStates } from './constant';
import { entries, notEqual, values } from './javascript';
import formValidation from './validations';
import { Country, State, City } from 'country-state-city';
import { confirmDialog } from 'primereact/confirmdialog';
import moment from 'moment';
import constants from '../constants';

const showFormErrors = (data, setData, ignore) => {
    let formErrors = {};
    entries(data).forEach(([key, value]) => {
        formErrors = {
            ...formErrors,
            ...formValidation(key, value, data, ignore),
        };
    });
    ignore?.forEach((name) => {
        if (formErrors[name]) {
            formErrors[name] = '';
        }
    });
    setData({ ...data, formErrors });
    return !values(formErrors).some((v) => notEqual(v, ''));
};
const checkFormErrors = (data, ignore) => {
    let formErrors = {};
    entries(data).forEach(([key, value]) => {
        formErrors = {
            ...formErrors,
            ...formValidation(key, value, data, ignore),
        };
    });
    ignore?.forEach((name) => {
        if (formErrors[name]) {
            formErrors[name] = '';
        }
    });
    return formErrors;
};
const showFormErrors1 = (data, setData, ignore) => {
    let formErrors = {};
    entries(data).forEach(([key, value]) => {
        formErrors = {
            ...formErrors,
            ...formValidation(key, value, data, ignore),
        };
    });
    ignore?.forEach((name) => {
        if (formErrors[name]) {
            formErrors[name] = '';
        }
    });
    setData({ ...data, formErrors });
    return !values(formErrors).some((v) => notEqual(v, ''));
};

const showArrayFormErrors = (array, ignore) => {
    let isValid = true;
    let res = array.map((data) => {
        let formErrors = {};
        entries(data).forEach(([key, value]) => {
            formErrors = {
                ...formErrors,
                ...formValidation(key, value, data, ignore),
            };
        });
        ignore?.forEach((name) => {
            if (formErrors[name]) {
                formErrors[name] = '';
            }
        });
        if (values(formErrors).some((v) => notEqual(v, ''))) {
            isValid = false;
        }
        return { ...data, formErrors };
    });

    return { isValid, data: res };
};
const showFormErrorsRowEdit = (newFormErrors, setFormErrors) => {
    let hasErrors = false;

    let updatedErrors = {};
    Object.entries(newFormErrors).forEach(([key, error]) => {
        if (error) {
            updatedErrors[key] = error;
            hasErrors = true;
        } else {
            updatedErrors[key] = '';
        }
    });

    setFormErrors(updatedErrors);
    return hasErrors;
};

export const convertBooleanValues = (data) => {
    return data?.map((item) => {
        const convertedItem = { ...item };
        Object?.keys(item)?.forEach((key) => {
            if (typeof item[key] === 'boolean') {
                convertedItem[key] = item[key] ? 'Yes' : 'No';
            }
        });
        return convertedItem;
    });
};

export const truncateDescription = (description) => {
    if (description?.length > 20) {
        return description?.substring(0, 20) + '...';
    } else {
        return description;
    }
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
const confirmDelete = (onDeleteAction, confirmationMessage, position = 'center', confirmationHeader = 'Delete Confirmation') => {
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
const uploadFile = async (file) => {
    if (typeof file === 'string') {
        return file;
    } else {
        const formData = new FormData();
        formData.append('file', file);
        const res = await api('post', EndPoints.UPLOAD_FILES, formData, {}, 'multipart/form-data');

        if (res.success && res.data) {
            return res.data.path;
        }
    }
};
const uploadSignImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await api('post', EndPoints.UPLOAD_FILES, formData, {}, 'multipart/form-data');

    if (res.success && res.data) {
        return res.data.path;
    }
};

const uploadImages = async (images) => {
    const promises = images?.map(async (item) => {
        if (typeof item === 'string') {
            return item;
        } else {
            const formData = new FormData();
            formData.append('file', item);
            const res = await api('post', EndPoints.UPLOAD_FILES, formData, {}, 'multipart/form-data');
            if (res.success && res.data) {
                return res.data.path;
            }
        }
    });

    const urls = await Promise.all(promises);
    return urls;
};

const uploadFiles = async (files) => {
    const promises = files.map(async (item) => {
        if (typeof item === 'string') {
            return item;
        } else {
            const formData = new FormData();
            formData.append('file', item);
            const res = await api('post', EndPoints.UPLOAD_FILES, formData, {}, 'multipart/form-data');
            if (res.success && res.data) {
                return {
                    path: res.data.path,
                    originalname: res.data.originalname,
                    size: res.data.size,
                };
            }
        }
    });

    const filesArray = await Promise.all(promises);
    return filesArray;
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

const spaceToDash = (inputString) => {
    return inputString.replace(/ /g, '-').toLowerCase();
};

const dashToSpace = (inputString) => {
    return inputString
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

const removeUnusedKeys = (payload) => {
    return Object.fromEntries(
        Object.entries(payload).filter(([key, value]) => {
            return value !== undefined && value !== null && value !== '' && value !== 0; // Check for truthy values, including 0
        }),
    );
};

const getIds = (item) => {
    return item?.map((list) => list._id);
};
const PercentageDifference = (previousValue, newValue) => {
    const percentageDifference = useMemo(() => {
        return ((newValue - previousValue) / previousValue) * 100;
    }, [previousValue, newValue]);
    const isProfit = percentageDifference >= 0;

    return isProfit ? (
        <span className="text-green">{percentageDifference.toFixed(2) + '%'}</span>
    ) : (
        <span className="text-red">{percentageDifference.toFixed(2) + '%'}</span>
    );
};

const calculateTimes = (type) => {
    const times = [];
    let currentTime = 60;
    let increment;

    switch (type) {
        case 'Quarter Hour':
            increment = 15;
            break;
        case 'Hour':
            increment = 60;
            break;
        case 'Half Hour':
            increment = 30;
            break;
        default:
            console.error('Invalid interval type');
            return '';
    }

    for (let i = 0; i < 5; i++) {
        const hours = Math.floor(currentTime / 60);
        const minutes = currentTime % 60;
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        times.push(formattedTime);
        currentTime += increment;
    }

    return times.map((item) => <span className="mx-3 text-blue-500">{item}</span>);
};

const convertArrayToObjectArray = (array) => {
    return array?.map((item) => {
        return { name: item, value: item };
    });
};
const getTime = (date) => {
    return moment(new Date(date)).format('H:mm');
};

const convertToDateTime = (timeString) => {
    var parts = timeString.split(':');
    var hours = parseInt(parts[0], 10);
    var minutes = parseInt(parts[1], 10);
    var newDate = new Date();
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    return newDate;
};

const getImageUrl = (image) => {
    if (image.includes('http')) {
        return image;
    } else {
        return constants.baseUrl + image;
    }
};

const isDateValue = (value) => {
    if (value instanceof Date && !isNaN(value)) {
        return true;
    }
    if (typeof value === 'string') {
        const dateStringRegex = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?(Z|([+-]\d{2}:\d{2})))?$/;

        if (dateStringRegex.test(value)) {
            const parsedDate = new Date(value);
            return !isNaN(parsedDate.getTime());
        }
    }
    return false;
};

const applyFilters = (events, filterOptions) => {
    const filterType = filterOptions.filterType || 'AND';
    const filterKeys = Object.keys(filterOptions).filter((key) => key !== 'filterType');

    if (!filterKeys.length) return events;

    const matchesCondition = (event, key) => {
        let condition = filterOptions[key];
        const eventValue = event[key];

        if (typeof condition === 'number' && key === 'unitPrice') {
            return eventValue <= condition;
        }
        if (isDateValue(condition) && isDateValue(eventValue)) {
            const eventDate = new Date(eventValue);
            const conditionDate = new Date(condition);
            return eventDate.getDate() === conditionDate.getDate();
        }
        if (key === 'primaryPhone') {
            condition = condition.replace(/\D/g, '');
            return condition === eventValue;
        }

        if (Array.isArray(condition) && eventValue) {
            return condition.some((item) => eventValue && eventValue.includes(item));
        } else if (typeof condition === 'string' && typeof eventValue === 'string') {
            return eventValue.toLowerCase().trim().includes(condition.toLowerCase().trim());
        } else {
            return typeof condition === 'function' ? condition(eventValue) : condition === eventValue;
        }
    };

    return events.filter((event) =>
        filterType === 'AND' ? filterKeys.every((key) => matchesCondition(event, key)) : filterKeys.some((key) => matchesCondition(event, key)),
    );
};
function isFileObject(obj) {
    return obj instanceof File;
}

const uniqueData = (data) => {
    const uniqueCatalogs = new Set();
    const unique = data.filter((item) => {
        const duplicate = uniqueCatalogs.has(item.catalogId);
        uniqueCatalogs.add(item.catalogId);
        return !duplicate;
    });

    return unique.map((item) => ({
        ...item,
        numberOfPayments: item.numberOfPayments,
        unitPrice: item.unitPrice,
        firstDueDate: item.firstDueDate ? new Date(item.firstDueDate) : new Date(moment().add(1, 'months')),
        autoRenew: item.autoRenew.toString(),
    }));
};

const processCatalogItems = (items) => {
    return items
        .filter((item) => item.isActive && (item.itemSold === 'POS_ONLY' || item.itemSold === 'POS_AND_AGREEMENTS'))
        .map((item) => ({
            name: item.name,
            upc: item.upc,
            _id: item._id,
            img: item.catalogImage,
            fullName: `${item.upc} ${item.name}`.trim(),
            unitPrice: item.unitPrice,
            unitPrice1: item.unitPrice1,
            unitPrice2: item.unitPrice2,
            unitPrice3: item.unitPrice3,
            moreThan1: item.moreThan1,
            moreThan2: item.moreThan2,
            moreThan3: item.moreThan3,
            totalTaxPercentage: item.totalTaxPercentage,
            allowDiscount: item.allowDiscount,
            overrideDiscount: item.overrideDiscount,
            defaultDiscount: item.defaultDiscount ?? null,
            discount: item.discount ?? null,
            itemCaption: item.itemCaption,
            itemSold: item.itemSold,
            maximumQuantity: item.maximumQuantity,
            minimumQuantity: item.minimumQuantity,
            defaultQuantity: item.defaultQuantity,
            variation: item.variation,
            hasCategory: item.hasCategory,
            waiveTax: false,
            commissionGroup: item.commissionGroup ? item.commissionGroup : null,
        }));
};

const denominationsToDollarConverter = (data, type) => {
    const conversionRates = {
        pennies: 0.01,
        nickels: 0.05,
        dimes: 0.1,
        quarters: 0.25,
        singles: 1,
        fives: 5,
        tens: 10,
        twenties: 20,
        fifties: 50,
        hundreds: 100,
    };

    if (!conversionRates[type]) return 'Invalid denomination type';

    const amount = data[type] * conversionRates[type];
    return amount.toFixed(4);
};

const dateConversions = (date) => {
    const formattedDate = moment(date).format('DD-MM-YYYY');
    const formattedTime = moment(date).format('hh:mm');
    return { formattedDate, formattedTime };
};

function adjustTime(e) {
    let currentMin = e.value.getMinutes();
    let startTime = e.value;
    if (currentMin % 5 !== 0) {
        startTime = new Date(e.value.getTime() + (5 - (currentMin % 5)) * 60000);
    }
    return startTime;
}

const timeString = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const time = `${hours}:${minutes}`;
    return time;
};
const timeConvertToDate = (time) => {
    const [hours, minutes] = time.split(':');
    const currentDate = new Date();
    currentDate.setHours(hours);
    currentDate.setMinutes(minutes);
    return currentDate;
};

const getSearchedData = (arr, filters) => {
    return arr.filter((obj) => {
        return Object.keys(filters).every((key) => {
            if (!filters[key]) return true;

            let value = obj[key]?.toString().toLowerCase();
            if (key === 'primaryPhone') {
                value = value.replace(/\D/g, '');
                const filterValue = filters[key].replace(/\D/g, '');
                return value.includes(filterValue);
            }
            return value.includes(filters[key].toLowerCase());
        });
    });
};
const diffHours = (dt2, dt1) => {
    const date1 = new Date(dt1);
    const date2 = new Date(dt2);
    const diff = (date2.getTime() - date1.getTime()) / (1000 * 60 * 60);
    return Math.abs(Math.round(diff));
};

export {
    capitalizeCamelCase,
    showFormErrors,
    checkFormErrors,
    getAllCountries,
    getStatesByCountry,
    getCitiesByState,
    confirmDelete,
    mobileFormatted,
    spaceToDash,
    dashToSpace,
    uploadFile,
    uploadFiles,
    uploadImages,
    removeUnusedKeys,
    getIds,
    PercentageDifference,
    calculateTimes,
    convertArrayToObjectArray,
    showArrayFormErrors,
    getTime,
    convertToDateTime,
    getImageUrl,
    applyFilters,
    isFileObject,
    uniqueData,
    uploadSignImage,
    showFormErrorsRowEdit,
    processCatalogItems,
    denominationsToDollarConverter,
    dateConversions,
    adjustTime,
    timeString,
    timeConvertToDate,
    showFormErrors1,
    getSearchedData,
    diffHours,
};
