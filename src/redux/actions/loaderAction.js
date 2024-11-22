export const hideLoaderAction = () => async (dispatch) => {
    dispatch({ type: 'HIDE_LOADER' });
};
export const showLoaderAction = () => async (dispatch) => {
    dispatch({ type: 'SHOW_LOADER' });
};

export const hideTableLoaderAction = () => async (dispatch) => {
    dispatch({ type: 'HIDE_TABLE_LOADER' });
};
export const showTableLoaderAction = () => async (dispatch) => {
    dispatch({ type: 'SHOW_TABLE_LOADER' });
};
