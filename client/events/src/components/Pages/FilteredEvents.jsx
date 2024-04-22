import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllEvents } from "../../redux/actions/events";

const FilteredEvents = () => {
  const events = useSelector((state) => state.events.events);
  console.log("Inside searched events", events);
  const [filteredEvents, setFilteredEvents] = useState(events);
  const dispatch = useDispatch();

  const filterEvents = (category) => {
    if (category === "all") {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(
        events.filter((event) => event.category.includes(category))
      );
    }
  };
  useEffect(() => {
    dispatch(fetchAllEvents());
  }, [dispatch]);
  //
  useEffect(() => {
    filterEvents("all");
  }, [events]);

  return (
    <div>
      <div className="flex gap-5">
        <button onClick={() => filterEvents("all")}>All</button>
        <button onClick={() => filterEvents("Music")}>Music</button>
        <button onClick={() => filterEvents("Comedy")}>Comedy</button>
        <button onClick={() => filterEvents("Workshops")}>Workshops</button>
        <button onClick={() => filterEvents("Activities")}>Activities</button>
        <button onClick={() => filterEvents("Kids")}>Kids</button>
      </div>
      <hr />
      {filteredEvents.map((event) => {
        return (
          <>
            <div className="my-4">
              <p>{event.title}</p>
              <div className="flex gap-3">
                <p>
                  Start:{" "}
                  <span className="underline font-medium">
                    {event.startDate}
                  </span>
                </p>
                <p>
                  End:{" "}
                  <span className="underline font-medium">{event.endDate}</span>
                </p>
              </div>
              <div>
                <p className="text-red-700">{event.category}</p>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default FilteredEvents;
