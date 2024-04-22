import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Otp from "./components/Auth/Otp";
import Signup from "./components/Auth/Signup";
import Home from "./components/Pages/Home";
import SearchedEvents from "./components/Pages/SearchedEvents";
import ListEevent from "./components/constants/ListEevent";
import ListedEvents from "./components/constants/ListedEvents";
import Navbar from "./components/constants/Navbar";
import SingleEventPage from "./components/Pages/SingleEventPage";
import MaybeNavbar from "./components/Pages/MaybeNavbar";
import EditEvent from "./components/constants/EditEvent";
import Admin from "./components/Pages/Admin";
import AllUser from "./components/Pages/AdminPages/AllUser";
import AllEvents from "./components/Pages/AdminPages/AllEvents";
import Requests from "./components/Pages/AdminPages/Requests";
import Error from "./components/Pages/404Page";
import AdminNav from "./components/constants/AdminNav";
import Footer from "./components/constants/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <MaybeNavbar>
        <Navbar />
      </MaybeNavbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/list-event" element={<ListEevent />} />
        <Route path="/listed-events" element={<ListedEvents />} />
        <Route path="/search-events" element={<SearchedEvents />} />
        <Route path="/event/:eventId" element={<SingleEventPage />} />
        <Route path="/edit-event/:eventId" element={<EditEvent />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/all-events" element={<AllEvents />} />
        <Route path="/admin/requests" element={<Requests />} />
        <Route path="/admin/all-users" element={<AllUser />} />
        <Route path="/admin-nav" element={<AdminNav />} />
        <Route path="/*" element={<Error />} />
        {/* <Route path="/footer" element={<Footer />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
