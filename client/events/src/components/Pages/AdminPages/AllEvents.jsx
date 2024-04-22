import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { fetchAllEvents } from "../../../redux/actions/events";
import { useNavigate } from "react-router";

const AllEvents = () => {
  const events = useSelector((state) => state.events.events);
  const isLoading = useSelector((state) => state.events.isLoading);
  console.log("All events", events);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  useEffect(() => {
    dispatch(fetchAllEvents());
  }, [dispatch]);

  console.log(events);
  return (
    <div>
      <h2 className="text-2xl text-center text-black mt-5 font-bold">
        All Events
      </h2>

      <div className="flex flex-col items-center mt-6 w-full p-2 md:mx-80  md:w-[70vw]">
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-10 container mx-auto items-center justify-center">
          {isLoading ? (
            <>
              <p className="text-center text-3xl text-red-700 font-semibold">
                ...Loading
              </p>
            </>
          ) : (
            <>
              {events.map((e) => {
                return (
                  <>
                    <div className="cursor-pointer parent mt-6">
                      <div className="rounded-xl max-w-52 overflow-hidden ">
                        <div className="flex flex-col">
                          <div
                            className="img "
                            onClick={() => handleClick(e._id)}
                          >
                            <img
                              className="h-80 w-full object-cover rounded-xl"
                              src={e.image}
                              alt=""
                            />
                          </div>
                          <div className="content p-3">
                            <div className="flex flex-col items-start">
                              <p className="text-xl font-bold">{e.title}</p>
                              <p className="text-gray-500 font-medium ">
                                {e.category}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllEvents;
