import { toast } from "sonner";
import {
  ADMIN_AUTH_SUCCESS,
  ADMIN_AUTH_FAILURE,
  ADMIN_SIGNUP_REQUEST,
  ADMIN_SIGNUP_SUCCESS,
  ADMIN_SIGNUP_FAILURE,
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAILURE,
  ADMIN_LOGOUT_REQUEST,
  ADMIN_LOGOUT_SUCCESS,
  ADMIN_LOGOUT_FAILURE,
} from "../actions/admin";

export const initialState = {
  admin: {},
  isLoading: false,
  success: "",
  error: "",
};

export const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: "",
        error: "",
      };
    case ADMIN_SIGNUP_SUCCESS:
      return {
        ...state,
        admin: action.payload.admin,
        success: action.payload.message,
        error: "",
        isLoading: false,
      };

    case ADMIN_SIGNUP_FAILURE:
      return {
        ...state,
        isLoading: false,
        success: "",
        error: action.payload,
      };

    case ADMIN_LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: "",
        error: "",
      };
    case ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        admin: action.payload.admin,
        success: action.payload.message || "Login successfully",
        error: "",
        isLoading: false,
      };

    case ADMIN_LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        success: "",
        error: action.payload || "Error occured in sign-up",
      };
    case ADMIN_LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: "",
        error: "",
      };

    case ADMIN_LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        admin: {},
        success: action.payload.message,
        error: "",
      };
    case ADMIN_LOGOUT_FAILURE:
      return {
        ...state,
        isLoading: false,
        success: "",
        error: action.payload || "Failed to logout",
      };

    case ADMIN_AUTH_SUCCESS:
      return {
        ...state,
        admin: action.payload.admin,
        success: action.payload.message,
        error: "",
      };
    case ADMIN_AUTH_FAILURE:
      return { ...state, error: action.payload.error, success: "" };
    default:
      return state;
  }
};
