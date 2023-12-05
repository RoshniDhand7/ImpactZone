import api from "../../services/api";
import constants from "../../utils/constants";
import { types } from "../types/types";
import { showToast } from "./toastAction";

const getEmployees = (setLoading) => async (dispatch) => {
    if(setLoading){
        setLoading(true);
    }
    const res = await api("get", constants.endPoints.GetEmployeeTableData);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.EMPLOYEES,
                payload: res.data,
            });
        }
    }
    if(setLoading){
        setLoading(false);
    }
};

export { getEmployees };