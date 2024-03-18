import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { uploadImages } from '../../../utils/commonFunctions';
import { types } from '../../types/types';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';
import { showToast } from '../toastAction';

const getCatalogItems = (setLoading) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('get', EndPoints.INVENTORY_CATALOG);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_CATALOG_ITEMS,
                payload: res.data,
            });
        }
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message ?? res }));
    }
    if (setLoading) {
        setLoading(false);
    }
};

const getCatalogItem = (id, returnData) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.INVENTORY_CATALOG + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
    dispatch(hideLoaderAction());
};

const addCatalogItem =
    (data, history, tab = '') =>
    async (dispatch) => {
        dispatch(showLoaderAction());
        if (data.catalogImage.length) {
            data.catalogImage = await uploadImages(data.catalogImage);

            data.catalogImage = data.catalogImage[0];
        } else {
            data.catalogImage = '';
        }
        const payload = {
            ...data,
        };

        const res = await api('post', EndPoints.INVENTORY_CATALOG, payload);
        if (res.success) {
            if (tab) {
                history.replace(`/settings/inventory/catalog-item/edit/${res.data._id}/${tab}`);
            } else {
                history.goBack();
            }
        }
        dispatch(hideLoaderAction());
    };
const editCatalogItem =
    (id, data, history, tab = '') =>
    async (dispatch) => {
        dispatch(showLoaderAction());
        if (data?.catalogImage?.length) {
            data.catalogImage = await uploadImages(data.catalogImage);

            data.catalogImage = data.catalogImage[0];
        } else {
            data.catalogImage = '';
        }
        const payload = {
            ...data,
        };

        const res = await api('put', EndPoints.INVENTORY_CATALOG + id, payload);
        if (res.success) {
            if (tab) {
                history.replace(`/settings/inventory/catalog-item/edit/${res.data._id}/${tab}`);
            } else {
                history.goBack();
            }
        }
        dispatch(hideLoaderAction());
    };

const editUsageItem =
    (id, data, history, tab = '') =>
    async (dispatch) => {
        dispatch(showLoaderAction());

        const payload = {
            ...data,
        };

        const res = await api('put', EndPoints.INVENTORY_CATALOG_USAGE + id, payload);
        if (res.success) {
            if (tab) {
                history.replace(`/settings/inventory/catalog-item/edit/${res.data.catalog}/${tab}`);
            } else {
                history.goBack();
            }
        }
        dispatch(hideLoaderAction());
    };

const editVariationCatalog = (id, data, next) => async (dispatch) => {
    dispatch(showLoaderAction());

    const payload = {
        ...data,
    };

    const res = await api('put', EndPoints.INVENTORY_CATALOG_VARIATION + id, payload);
    console.log(res);
    if (res.success) {
        next();
    }
    dispatch(hideLoaderAction());
};
const editSubVariationCatalog = (id, data, next) => async (dispatch) => {
    dispatch(showLoaderAction());

    const payload = {
        ...data,
    };

    const res = await api('put', EndPoints.INVENTORY_SUB_VARIATION + id, payload);
    console.log(res);
    if (res.success) {
        next();
    }
    dispatch(hideLoaderAction());
};
const getVariationCatalog = (id, returnData) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.INVENTORY_CATALOG_VARIATION_DETAIL + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
    dispatch(hideLoaderAction());
};

const getCatalogVariations = (id, setLoading) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('get', EndPoints.INVENTORY_CATALOG_VARIATION + id);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_INVENTORY_CATALOG_VARIATION,
                payload: res.data,
            });
        }
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message ?? res }));
    }
    if (setLoading) {
        setLoading(false);
    }
};
const getUsageItem = (id, returnData) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.INVENTORY_CATALOG_USAGE + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
    dispatch(hideLoaderAction());
};
const deleteUsageItem = (id, type) => async (dispatch) => {
    const res = await api('delete', EndPoints.INVENTORY_CATALOG_USAGE + id, { type });
    if (res.success) {
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};
const deleteCatalogItem = (id) => async (dispatch) => {
    const res = await api('delete', EndPoints.INVENTORY_CATALOG + id);
    if (res.success) {
        dispatch(getCatalogItems(() => {}));
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};
const deleteAllCatalogVariation = (id, next) => async (dispatch) => {
    const res = await api('delete', EndPoints.INVENTORY_CATALOG_VARIATION_ALL + id);
    if (res.success) {
        next();
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};
const deleteCatalogVariation = (id, next) => async (dispatch) => {
    const res = await api('delete', EndPoints.SUB_VARIATION_DELETE + id);
    if (res.success) {
        next();
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

export {
    getCatalogItems,
    addCatalogItem,
    getCatalogItem,
    editCatalogItem,
    deleteCatalogItem,
    editUsageItem,
    getUsageItem,
    deleteUsageItem,
    editVariationCatalog,
    getCatalogVariations,
    getVariationCatalog,
    deleteCatalogVariation,
    deleteAllCatalogVariation,
    editSubVariationCatalog,
};
