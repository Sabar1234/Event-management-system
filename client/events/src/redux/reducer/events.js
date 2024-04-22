import {
  DELETE_EVENTS_SUCCESS,
  DELETE_EVENT_FAILURE,
  FETCH_EVENTS_FAILURE,
  FETCH_EVENTS_REQUEST,
  FETCH_EVENTS_SUCCESS,
  FETCH_USER_EVENTS_FAILURE,
  FETCH_USER_EVENTS_REQUEST,
  FETCH_USER_EVENTS_SUCCESS,
  UPDATE_EVENT_FAILURE,
  UPDATE_EVENT_REQUEST,
  UPDATE_EVENT_SUCCESS,
} from "../actions/events";

const initialState = {
  events: [],
  success: "",
  error: "",
  isLoading: false,
};

export const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVENTS_REQUEST:
      return { ...state, isLoading: true };

    case FETCH_EVENTS_SUCCESS:
      return {
        ...state,
        events: action.payload.events,
        isLoading: false,
        success: action.payload.message,
      };

    case FETCH_EVENTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };

    case DELETE_EVENTS_SUCCESS:
      return {
        ...state,
        success: "Event deleted successfully",
        isLoading: false,
      };

    case DELETE_EVENT_FAILURE:
      return {
        ...state,
        success: false,
        isLoading: false,
        error: action.payload.message,
      };

    default:
      return state;
  }
};

//for user events//
const initialUserState = {
  events: [],
  isLoading: false,
  success: "",
  error: "",
};

export const fetchUserEvents = (state = initialUserState, action) => {
  switch (action.type) {
    case FETCH_USER_EVENTS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_USER_EVENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: action.payload.message,
        events: action.payload.events,
      };

    case FETCH_USER_EVENTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        success: false,
        error: action.payload.message,
      };

    default:
      return state;
  }
};

//update events//
const initialUpdateState = {
  isLoading: false,
  success: "",
  error: "",
};
export const updateEvent = (state = initialUpdateState, action) => {
  switch (action.type) {
    case UPDATE_EVENT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case UPDATE_EVENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: action.payload || "Event successfully updated",
      };

    case UPDATE_EVENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload || "Something went wrong",
      };

    default:
      return state;
  }
};
