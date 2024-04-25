import React, { useEffect, useState } from "react";
import Header from "../constants/Header";
import Carousel from "../layout/carousel";
import { useDispatch, useSelector } from "react-redux";

import ProductsContainer from "../constants/ProductsContainer";
import Footer from "../constants/Footer";
import { fetchAllEvents } from "../../redux/actions/events";

const Home = () => {
  const events = useSelector((state) => state.events.events);
  console.log("Events at Home", events);
  const [filteredEvents, setFilteredEvents] = useState(events);

  const filterEvents = (category) => {
    let filtered = [];
    if (category === "all") {
      setFilteredEvents(events); // Set filtered events to all events
      return; // Exit the function early
    }

    filtered = events.filter((event) => event.category === category);
    setFilteredEvents(filtered);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllEvents());
  }, [dispatch]);

  useEffect(() => {
    filterEvents("all");
  }, [events]);

  return (
    <>
      <Header filterEvents={filterEvents} />
      <Carousel />
      <ProductsContainer
        filteredEvents={filteredEvents}
        heading={"Recommended Events"}
      />
      <Footer />
    </>
  );
};

export default Home;
