import axios from "axios";
import constants from "../utils/constants";

const api = (method, urlEndPoint, data, requestHeaders = { "Content-Type": "application/json" }) =>
  new Promise((myResolve) => {
    const token = localStorage.getItem("token");
    let headers = requestHeaders;
    headers = {
      ...headers,
      Authorization: `Bearer ${token}`,
    };

    axios({
      method: method,
      url: constants.base_url + urlEndPoint,
      data,
      headers,
    })
      .then((response) => {
        myResolve({
          message: response.data.message,
          data: response.data.data,
          success: response.data.success,
          count: response.data.count,
        });
      })
      .catch((err) => {
        myResolve({
          message: err.response.data.message,
          data: err.response.data.data,
          success: err.response.data.success,
        });
      });
  });

export default api;
