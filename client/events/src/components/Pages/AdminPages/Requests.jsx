import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { fetchAllEvents } from "../../../redux/actions/events";

const Requests = (props) => {
  const events = useSelector((state) => state.events.events);
  const isLoading = useSelector((state) => state.events.isLoading);
  console.log("All Request events", events);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllEvents());
  }, [dispatch]);

  console.log(events);

  //approve event//
  const handleApprove = async (eventId) => {
    console.log("Event Approved ID",eventId)
    try {
      const res = await axios.put(
        `http://localhost:2000/api/approve-event/${eventId}`
      );
      console.log(res, "Approving events");
    } catch (error) {
      console.log("Error in approving event", error, error.message);
    }
  };

  return (
    <div>
      <h2 className="text-2xl text-center text-black mt-5 font-bold">
        All Event Requests
      </h2>

      <div className="flex flex-col items-center mt-6">
        <div className="container px-8 flex justify-between mx-auto">
          <h2 className="text-start font-bold text-xl text-gray-700">
            {props.heading}
          </h2>
          <h2 className=" ms-8  text-red-700 cursor-pointer hover:text-red-800">
            {props.seeAll}
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-10 container mx-auto items-center justify-center">
          {isLoading ? (
            <>
              <div className="container flex justify-center">
                <p className="text-center text-3xl text-red-700 font-semibold">
                  ...Loading
                </p>
              </div>
            </>
          ) : (
            <>
              {events.length > 0 ? (
                <>
                  {events.map((e) => {
                    return (
                      <>
                        {e.status === "PENDING" ? (
                          <>
                            <div className="cursor-pointer  md:ms-52 parent mt-6">
                              <div className="rounded-xl max-w-52 overflow-hidden ">
                                <div className="flex flex-col">
                                  <div
                                    className="img "
                                    onClick={() =>
                                      handleClick({ eventId: e._id })
                                    }
                                  >
                                    <img
                                      className="h-80 w-full object-cover rounded-xl"
                                      src={e.image}
                                      alt=""
                                    />
                                  </div>
                                  <div className="content p-3">
                                    <div className="flex flex-col items-start">
                                      <p className="text-xl font-bold">
                                        {e.title}
                                      </p>
                                      <p className="text-gray-500 font-medium ">
                                        {e.category}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex justify-around my-2">
                                  <button
                                    className="text-red-700 text-sm font-semibold px-2  hover:text-red-800 "
                                    onClick={() => {
                                      handleApprove(e._id);
                                    }}
                                  >
                                    Approve
                                  </button>
                                  <button
                                    onClick={() => {}}
                                    className="text-white text-sm font-semibold  rounded-sm hover:bg-red-800 bg-red-700 px-1"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : null}
                      </>
                    );
                  })}
                </>
              ) : (
                <>
                 <div className="container flex justify-center">
                <p className="text-center text-3xl text-red-700 font-semibold">
                 No Requests
                </p>
              </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Requests;
