import { entries, notEqual, values } from "./javascript";
import { allValidations } from "./formValidations";
import FormValidation from "./AllFormValidation";

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

export const showAllFormErrors = (data, setData, required, initialData) => {
  console.log("initialDataa", initialData);
  let formErrors = {};
  entries(data).forEach(([key, value]) => {
    formErrors = {
      ...formErrors,
      ...FormValidation(key, value, data, required, initialData),
    };
  });

  console.log("showerror", formErrors);
  setData({ ...data, formErrors });
  let bolean;
  values(formErrors).map((item) => {
    if (bolean == false) {
      return;
    }
    console.log("item", item);
    if (typeof item === "object") {
      if (Array.isArray(item)) {
        if (item.length != 0) {
          bolean = false;
          console.log("boleanInArrayFalse", item, bolean);
          return;
        } else {
          bolean = true;
          console.log("boleanInArrayTrue", item, bolean);
        }
      } else {
        if (item == null) {
          bolean = true;
        } else if (!values(item).some((v) => notEqual(v, ""))) {
          bolean = true;
          console.log("boleanInObjectFalse", item, bolean);
        } else {
          bolean = false;
          console.log("boleanInObjectTrue", item, bolean);
          return;
        }
      }
    } else {
      if (item.length == 0) {
        console.log("boleanInSimpleFalse", item, bolean);
        bolean = true;
      } else {
        bolean = false;
        console.log("boleanInSimpleTrue", item, bolean);
        return;
      }
    }
  });
  console.log("bolean", bolean);
  // return !values(formErrors).some((v) => notEqual(v, ""));
  return bolean;
};

// export const removeshowAllFormErrors = (name,value,data, setData,required) => {
//     let formErrors = {};
//     entries(data).forEach(([key, value]) => {
//         formErrors = {
//             ...formErrors,
//             ...FormValidation(key, value, data,required),
//         };
//     });
//     setData({ ...data, formErrors });
//     return !values(formErrors).some((v) => notEqual(v, ""));
// };
