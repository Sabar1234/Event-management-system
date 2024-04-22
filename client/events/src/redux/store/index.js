import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../reducer/user";
import { eventsReducer, fetchUserEvents, updateEvent } from "../reducer/events";

const store = configureStore({
  reducer: {
    user: userReducer,
    events: eventsReducer,
    userEvents: fetchUserEvents,
    updateEvents:updateEvent
  },
});

export default store;
