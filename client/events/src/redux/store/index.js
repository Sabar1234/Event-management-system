import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../reducer/user";
import { eventsReducer, fetchUserEvents, updateEvent } from "../reducer/events";
import { adminReducer } from "../reducer/admin";

const store = configureStore({
  reducer: {
    user: userReducer,
    events: eventsReducer,
    userEvents: fetchUserEvents,
    updateEvents: updateEvent,
    admin: adminReducer,
  },
});

export default store;
