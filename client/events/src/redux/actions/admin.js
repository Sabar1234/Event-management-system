import axios from "axios";
axios.defaults.baseURL = "http://localhost:2000";
axios.defaults.withCredentials = true;

export const ADMIN_SIGNUP_REQUEST = "ADMIN_SIGNUP_REQUEST";
export const ADMIN_SIGNUP_SUCCESS = "ADMIN_SIGNUP_SUCCESS";
export const ADMIN_SIGNUP_FAILURE = "ADMIN_SIGNUP_FAILURE";

export const ADMIN_LOGIN_REQUEST = "ADMIN_LOGIN_REQUEST";
export const ADMIN_LOGIN_SUCCESS = "ADMIN_LOGIN_SUCCESS";
export const ADMIN_LOGIN_FAILURE = "ADMIN_LOGIN_FAILURE";

export const ADMIN_LOGOUT_REQUEST = "ADMIN_LOGOUT_REQUEST";
export const ADMIN_LOGOUT_SUCCESS = "ADMIN_LOGOUT_SUCCESS";
export const ADMIN_LOGOUT_FAILURE = "ADMIN_LOGOUT_FAILURE";

export const ADMIN_AUTH_REQUEST = "ADMIN_AUTH_REQUEST";
export const ADMIN_AUTH_SUCCESS = "ADMIN_AUTH_SUCCESS";
export const ADMIN_AUTH_FAILURE = "ADMIN_AUTH_FAILURE";

//Admin signup//
export const adminSignup = (formData, navigate) => async (dispatch) => {
  dispatch({ type: ADMIN_SIGNUP_REQUEST });
  try {
    const res = await axios.post("/api/admin-signup", formData);
    console.log("Response", res);
    if (res.data.success) {
      dispatch({
        type: ADMIN_SIGNUP_SUCCESS,
        payload: { admin: res.data.admin, message: res.data.message },
      });
      localStorage.setItem("userName", JSON.stringify(res.data.admin.userName));
      console.log("Navigating to admin login page");

      navigate("/admin-login");
    }
  } catch (error) {
    // Extract necessary information from the error object
    const errorMessage = error.message;
    dispatch({ type: ADMIN_SIGNUP_FAILURE, payload: errorMessage });
    console.log("Error in Admin signup", error);
  }
};

//Admin login//
export const adminLogin = (formData, navigate) => async (dispatch) => {
  console.log(formData);
  dispatch({ type: ADMIN_LOGIN_REQUEST });
  try {
    const res = await axios.post("/api/admin-login", formData);
    if (res.data.success) {
      dispatch({
        type: ADMIN_SIGNUP_SUCCESS,
        payload: { admin: res.data.admin, message: res.data.message },
      });
      localStorage.setItem("userName", JSON.stringify(res.data.admin.userName));
      console.log("Navigating to admin login page");
      navigate("/admin");
    }
  } catch (error) {
    dispatch({ type: ADMIN_LOGIN_FAILURE, payload: error.message });
    console.log("Error in Admin Login", error);
  }
};

//Admin logout//
export const adminLogout = (navigate) => async (dispatch) => {
  dispatch({ type: ADMIN_LOGOUT_REQUEST });
  try {
    const res = await axios.get("/api/admin-logout");
    if (res.data.success) {
      localStorage.removeItem("userName");
      dispatch({
        type: ADMIN_LOGOUT_SUCCESS,
        payload: res.data.message || "Logged out successfull",
      });
      navigate("/admin-login")
    }
  } catch (error) {
    dispatch({ type: ADMIN_LOGOUT_FAILURE, payload: "Failed to logout" });
    console.log(error, error.message);
  }
};

//AUTHENTICATION//
export const checkAuth = () => async (dispatch) => {
  dispatch({ type: ADMIN_AUTH_REQUEST });
  try {
    const res = await axios.get("/api/authenticate");
    console.log("Auth admin", res.data.admin);
    if (res.data.success) {
      dispatch({
        type: ADMIN_AUTH_SUCCESS,
        payload: { message: res.data.message, admin: res.data.admin },
      });
    }
  } catch (error) {
    dispatch({
      type: ADMIN_AUTH_FAILURE,
      payload: { error: error.message },
    });
    console.log(error);
  }
};
