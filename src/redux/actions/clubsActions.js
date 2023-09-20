import api from "../../services/api";
import constants from "../../utils/constants";
import { types } from "../types/types";
import { showToast } from "./toastAction";

const getClubs = (setLoading) => async (dispatch) => {
    if(setLoading){
        setLoading(true);
    }
   
    const res = await api("get", constants.endPoints.GetClubs);
    console.log("resclub",res)
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CLUBS,
                payload: res.data,
            });
        }
    }
    if(setLoading){
        setLoading(false);
    }
    
};

export { getClubs };