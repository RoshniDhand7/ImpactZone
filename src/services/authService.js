import jwt_decode from "jwt-decode";

export const isAuthenticated = () => {
    if (typeof window == "undefined") {
        return false;
    }
    if (localStorage.getItem("authToken")) {
        return JSON.parse(localStorage.getItem("authToken"));
    } else {
        return false;
    }
};

export const getMyId = () => {
    if (localStorage.getItem("authToken")) {
        let decoded = jwt_decode(JSON.parse(localStorage.getItem("authToken")));
        return decoded.userId;
    }
};
export const authenticate = (authToken, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("authToken", JSON.stringify(authToken));
        next();
    }
};
export const logout = (next) => {
    if (typeof window !== "undefined") {
        localStorage.clear();
        next();
    }
};
