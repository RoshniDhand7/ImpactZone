export const hideLoaderAction = () => async (dispatch) => {
  dispatch({ type: "HIDE_LOADER" });
};
export const showLoaderAction = () => async (dispatch) => {
  dispatch({ type: "SHOW_LOADER" });
};
