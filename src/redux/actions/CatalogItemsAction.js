import api from "../../services/api";
import constants from "../../utils/constants";
import { types } from "../types/types";
import { hideLoaderAction, showLoaderAction } from "./loaderAction";

const getAllCatalogItems = () => async (dispatch) => {
    dispatch(showLoaderAction())
    const res = await api("get", constants.endPoints.allCatalogItems);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.ALL_CATALOG_ITEMS,
                payload: res.data,
            });
        }
    }
    dispatch(hideLoaderAction())
  };

  export {getAllCatalogItems}