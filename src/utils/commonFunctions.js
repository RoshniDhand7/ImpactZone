import { entries, notEqual, values } from "./javascript";
import { allValidations } from "./formValidations";

export const showFormErrors = (data, setData, ignore) => {
    let formErrors = {};
    entries(data).forEach(([key, value]) => {
        formErrors = {
            ...formErrors,
            ...allValidations(key, value, data, ignore),
        };
        // console.log(formErrors)
    });
    setData({ ...data, formErrors });
    return values(formErrors).some((v) => notEqual(v, ""));
};

export const removeEmpty = (obj) => {
    const newObj = {};
    Object.entries(obj).forEach(([k, v]) => {
        if (v === Object(v)) {
            newObj[k] = removeEmpty(v);
        } else if (v !== "" && v !== null) {
            newObj[k] = obj[k];
        }
    });
    return newObj;
};

export const getSearchedData = (arr, keyword, keys) => {
    if (keyword.length) {
        arr = arr.filter((obj) =>
            keys.some((key) => {
                const keys = key.split(".");
                let value = obj;
                keys.forEach((k) => (value = value[k]));
                return value.toLowerCase()?.includes(keyword?.toLowerCase());
            })
        );
    }
    return arr;
};
