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
import { InputNumber } from 'primereact/inputnumber';

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

function applyFilters(events, filterOptions) {
    let _events = events;
    let _keys = Object.keys(filterOptions);

    if (_keys.length) {
        _events = _events.filter((event) => {
            return _keys.every((key) => {
                const _condition = filterOptions[key];
                const _val = event[key];

                if (Array.isArray(_val)) {
                    return _condition.some((item) => _val.includes(item));
                } else {
                    return _condition(_val);
                }
            });
        });
    }
    return _events;
}

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
    console.log(items, 'items');
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
            overRideDiscount: item.overRideDiscount,
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
            commissionGroup: item.commissionGroupId ? item.commissionGroupId : null,
        }));
};

export {
    capitalizeCamelCase,
    showFormErrors,
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
};
