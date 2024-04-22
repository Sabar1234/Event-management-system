import axios from "axios";
axios.defaults.baseURL = "http://localhost:2000";
axios.defaults.withCredentials = true;

export const FETCH_EVENTS_REQUEST = "FETCH_EVENTS_REQUEST";
export const FETCH_EVENTS_SUCCESS = "FETCH_EVENTS_SUCCESS";
export const FETCH_EVENTS_FAILURE = "FETCH_EVENTS_FAILURE";

export const FETCH_USER_EVENTS_REQUEST = "FETCH_USER_EVENTS_REQUEST";
export const FETCH_USER_EVENTS_SUCCESS = "FETCH_USER_EVENTS_SUCCESS";
export const FETCH_USER_EVENTS_FAILURE = "FETCH_USER_EVENTS_FAILURE";

export const FETCH_SINGLE_EVENT_SUCCESS = "FETCH_SINGLE_EVENT_SUCCESS";
export const FETCH_SINGLE_EVENT_FAILURE = "FETCH_SINGLE_EVENT_FAILURE";

export const DELETE_EVENTS_SUCCESS = " DELETE_EVENTS_SUCCESS";
export const DELETE_EVENT_FAILURE = "DELETE_EVENT_FAILURE";

export const UPDATE_EVENT_REQUEST = "UPDATE_EVENT_REQUEST";
export const UPDATE_EVENT_SUCCESS = "UPDATE_EVENT_SUCCESS";
export const UPDATE_EVENT_FAILURE = "UPDATE_EVENT_FAILURE";

//fetching all events//
export const fetchAllEvents = () => async (dispatch) => {
  dispatch({ type: FETCH_EVENTS_REQUEST });
  try {
    const res = await axios.get("/api/events/events");
    if (res.data.success) {
      dispatch({
        type: FETCH_EVENTS_SUCCESS,
        payload: { events: res.data.events, message: res.data.message },
      });
    }
    dispatch({ type: FETCH_EVENTS_FAILURE, payload: res.data.message });
  } catch (error) {
    console.log("Fetch events error", error);
    dispatch({ type: FETCH_EVENTS_FAILURE, payload: error.message });
  }
};

//fetch events of each user//
export const fetchUserEvents = (userId) => async (dispatch) => {
  dispatch({ type: FETCH_USER_EVENTS_REQUEST });
  try {
    const res = await axios.get(`/api/events/user-events/${userId}`);
    console.log("fetchUserEventResponse", res, userId);

    if (res.data.success) {
      dispatch({
        type: FETCH_USER_EVENTS_SUCCESS,
        payload: { message: res.data.message, events: res.data.userEvents },
      });
      return;
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: FETCH_USER_EVENTS_FAILURE,
      payload: { message: `error in fetching events ${error.message}` },
    });
  }
};

// fetching single event-
export const singleEvent = (eventId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/events/event/${eventId}`);

    if (res.data.success) {
      dispatch({
        type: FETCH_SINGLE_EVENT_SUCCESS,
        payload: { message: "Event fetched succefully", event: res.data.event },
      });
    }
  } catch (error) {
    dispatch({
      type: FETCH_SINGLE_EVENT_FAILURE,
      payload: "Something went wrong",
    });

    console.log("Error in fetching single event", error, error.message);
  }
};

//delete events//
export const deleteEvent = (eventId, userId) => async (dispatch) => {
  try {
    await axios.delete(`/api/events/delete-event/${eventId}/${userId}`);
    dispatch({
      type: DELETE_EVENTS_SUCCESS,
      payload: { message: "Event deleted successfully" },
    });
  } catch (error) {
    dispatch({ type: DELETE_EVENT_FAILURE, payload: "Something went wrong" });
    console.log(error, error.message);
  }
};

//update events//
export const updateEvent =
  (creatorEmail, eventId, formData) => async (dispatch) => {
    dispatch({ type: UPDATE_EVENT_REQUEST });
    try {
      const res = await axios.put(
        `/api/events/update-event/${eventId}/${creatorEmail}`,
        formData
      );
      if (res.data.success) {
        dispatch({
          type: UPDATE_EVENT_SUCCESS,
          payload: "Event succefully updated",
        });
      }
    } catch (error) {
      dispatch({ type: UPDATE_EVENT_FAILURE, payload: "Something went wrong" });
      console.log(error, error.message);
    }
  };
