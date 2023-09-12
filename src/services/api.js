import axios from "axios";
import constants from "../utils/constants";
import { isAuthenticated } from "./authService";

const api = (method, urlEndPoint, data = {}, query) =>
  new Promise((myResolve) => {
    let headers = {
      "Content-Type": "application/json",
    };
    if (isAuthenticated()) {
      headers = {
        ...headers,
        Authorization: `Bearer ${isAuthenticated()}`,
      };
    }
    axios({
      method,
      url: constants.base_url + urlEndPoint,
      data,
      headers,
    })
      .then((response) => {
        myResolve({
          message: response.data.message,
          data: response.data.data,
          success: response.data.success,
        });
      })
      .catch((err) => {
        if (err.response) {
          myResolve({
            message: err.response.data.message,
            data: err.response.data.data,
            success: err.response.data.success,
          });
        } else {
          myResolve({
            message: err.toString(),
            data: { ...err },
            success: false,
          });
        }
      });
  });

export default api;
