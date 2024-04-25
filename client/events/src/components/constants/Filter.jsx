import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllEvents } from "../../redux/actions/events";
import FilteredEvents from "../Pages/FilteredEvents";
import moment from "moment";

const Filter = () => {
  const events = useSelector((state) => state.events.events);
  console.log("Inside searched events", events);
  const [filteredEvents, setFilteredEvents] = useState(events);
  const dispatch = useDispatch();

  const filterEvents = (category) => {
    let filtered = [];
    if (category === "all") {
      filtered = events;
    } else if (category === "Today") {
      filtered = events.filter((event) =>
        moment(event.startDate).isSame(moment(), "day")
      );
    } else if (category === "Tomorrow") {
      filtered = events.filter((event) =>
        moment(event.startDate)
          .startOf("day")
          .isSame(moment().add(1, "day").startOf("day"), "day")
      );
    } else if (category === "This Weekend") {
      filtered = events.filter(
        (event) => moment(event.startDate).isoWeekday() >= 6
      );
    }else {
    // Category filter logic
    filtered = events.filter((event) => event.category === category);
  }
    setFilteredEvents(filtered);
  };

  useEffect(() => {
    dispatch(fetchAllEvents());
  }, [dispatch]);

  useEffect(() => {
    filterEvents("all");
  }, [events]);

  return (
    <>
      <div className="flex md:flex-row flex-col">
        <div className="container">
          <div>
            <h2 className="text-3xl font-bold mb-6">Filters</h2>

            <div className="bg-white p-6 shadow-md">
              <div className="flex items-center justify-between">
                <p className="text-red-700 text-base">Date</p>
                <p
                  className="text-gray-700 text-base cursor-pointer hover:text-red-700"
                  onClick={() => filterEvents("all")}
                >
                  Clear
                </p>
              </div>
              <div className="flex mt-6">
                <button
                  onClick={() => filterEvents("Today")}
                  className="border-solid mx-4 px-3 py-1 text-red-700 border-2 border-gray-300"
                >
                  Today
                </button>
                <button
                  onClick={() => filterEvents("Tomorrow")}
                  className="border-solid mx-4 px-3 py-1 text-red-700 border-2 border-gray-300"
                >
                  Tomorrow
                </button>
              </div>
              <div className="flex flex-col items-center">
                <div className=" mt-5">
                  <button
                    onClick={() => filterEvents("This Weekend")}
                    className="border-solid mx-4 px-3 py-1 text-red-700 border-2 border-gray-300"
                  >
                    This Weekend
                  </button>
                </div>
                <div>
                  <button className="border-solid mt-5 mx-4 px-3 py-1 text-red-700 border-2 border-gray-300">
                    Date Range
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white mt-6 p-6 shadow-md">
              <div className="flex items-center justify-between">
                <p className="text-red-700 text-base">Categories</p>
                <p
                  onClick={() => filterEvents("all")}
                  className="text-gray-700 text-base cursor-pointer hover:text-red-700"
                >
                  Clear
                </p>
              </div>
              <div className="flex mt-6">
                <button
                  onClick={() => filterEvents("Music shows")}
                  className="border-solid mx-4 px-3 py-1 text-red-700 border-2 border-gray-300"
                >
                  Music
                </button>
                <button
                  onClick={() => filterEvents("Comedy shows")}
                  className="border-solid mx-4 px-3 py-1 text-red-700 border-2 border-gray-300"
                >
                  Comedy
                </button>
              </div>
              <div className="flex mt-6">
                <button
                  onClick={() => filterEvents("Workshops")}
                  className="border-solid mx-4 px-3 py-1 text-red-700 border-2 border-gray-300"
                >
                  Workshops
                </button>
                <button
                  onClick={() => filterEvents("Kids")}
                  className="border-solid mx-4 px-3 py-1 text-red-700 border-2 border-gray-300"
                >
                  kids
                </button>
              </div>
              <div className="flex mt-6">
                <button
                  onClick={() => filterEvents("Activities")}
                  className="border-solid mx-4 px-3 py-1 text-red-700 border-2 border-gray-300"
                >
                  Activities
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <FilteredEvents filteredEvents={filteredEvents} />
      </div>
    </>
  );
};

export default Filter;
