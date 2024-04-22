import {
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
} from "../actions/user";

const initialState = {
  user: {},
  isLoading: false,
  success: "",
  error: "",
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // userRegister-
    case USER_REGISTER_REQUEST:
      return { ...state, isLoading: true };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        success: action.payload.message,
        error: "",
      };
    case USER_REGISTER_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    //   verify OTP-
    case VERIFY_OTP_REQUEST:
      return { ...state, isLoading: true };
    case VERIFY_OTP_SUCCESS:
      return { ...state, isLoading: false, success: action.payload };

    //   userLogin-
    case USER_LOGIN_REQUEST:
      return { ...state, isLoading: true };

    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        success: action.payload.message,
      };

    case USER_LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    // logout User
    case LOGOUT_USER_REQUEST:
      return { ...state, isLoading: true };

    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: action.payload.message,
        user: {},
      };
    default:
      return state;
  }
};
