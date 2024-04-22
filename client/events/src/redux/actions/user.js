import axios from "axios";
axios.defaults.baseURL = "http://localhost:2000";
axios.defaults.withCredentials = true;

export const USER_REGISTER_REQUEST = "USER_REGISTER_REQUEST";
export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
export const USER_REGISTER_FAILURE = "USER_REGISTER_FAILURE";
export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";
export const VERIFY_OTP_REQUEST = "VERIFY_OTP_REQUEST";
export const VERIFY_OTP_SUCCESS = "VERIFY_OTP_SUCCESS";
export const VERIFY_OTP_FAILURE = "VERIFY_OTP_FAILURE";
export const LOGOUT_USER_REQUEST = "LOGOUT_USER_REQUEST";
export const LOGOUT_USER_SUCCESS = "LOGOUT_USER_SUCCESS";
export const LOGOUT_USER_FAILURE = "LOGOUT_USER_FAILURE";
export const CLEAR_TOAST_MESSAGE = "CLEAR_TOAST_MESSAGE";

// user register-
export const userRegister = (FormData, navigate) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST });

  try {
    const res =await axios.post("/api/user/sign-up", FormData);
    console.log("Register response", res);

    if (res.data.success) {
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: { message: res.data.message, user: res.data.savedUser },
      });
      localStorage.setItem("email", res.data.savedUser.email);
      navigate("/otp");
    } else {
      console.log("Registration failed:", res.data.message);
      dispatch({ type: USER_REGISTER_FAILURE, payload: res.data.message });
    }
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAILURE,
      payload: error,
    });
  }
};

// user otp-
export const verifyOtp = (otp, navigate) => async (dispatch) => {
  dispatch({ type: VERIFY_OTP_REQUEST });
  const email = localStorage.getItem("email");

  try {
    const res = await axios.post("/api/user/verify-otp",{ otp, email});

    if (res.data.success) {
      dispatch({ type: VERIFY_OTP_SUCCESS, payload: res.data.message });
      localStorage.clear();
      navigate("/login");
    } else {
      dispatch({ type: VERIFY_OTP_FAILURE, payload: res.data.message });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: VERIFY_OTP_FAILURE,
      payload: error.response.data.message,
    });
  }
};

// userLogin-
export const userLogin = (FormData,navigate) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST });

  try {
    const res = await axios.post("/api/user/login", FormData);

    if (res.data.success) {
      localStorage.setItem("userLogin", JSON.stringify(res.data.user));
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: { message: res.data.message, user: res.data.user },
      });
      navigate("/");
    } else {
      dispatch({ type: USER_LOGIN_FAILURE, payload: res.data.message });
    }
  } catch (error) {
    console.log("Login error", error.message);
    dispatch({
      type: USER_LOGIN_FAILURE,
      payload: error.message,
    });
  }
};

// userLogOut-
export const logOutUser = () => async (dispatch) => {
  dispatch({ type: LOGOUT_USER_REQUEST });
  try {
    localStorage.clear();
    const res = await axios.get("/api/user/logout");
    console.log(res);
    if (res.data.success)
      dispatch({ type: LOGOUT_USER_SUCCESS, payload: res.data.message });
  } catch (error) {
    dispatch({ type: LOGOUT_USER_FAILURE });
    console.log(error);
  }
};
