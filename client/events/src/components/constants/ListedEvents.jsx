import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEvent, fetchUserEvents } from "../../redux/actions/events";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router";
import axios from "axios";

const ListedEvents = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("userLogin"));
  const userId = loggedInUser?._id;
  console.log("listedEventUserId", userId);
  const userEvents = useSelector((state) => state.userEvents.events);
  console.log("UserEvents", userEvents);
  const isLoading = useSelector((state) => state.userEvents.isLoading);
  const success = useSelector((state) => state.userEvents.success);
  const error = useSelector((state) => state.userEvents.error);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hadleNavigate = () => {
    navigate("/");
  };

  const hadleNavigate2 = (eventId) => {
    navigate(`/edit-event/${eventId}`);
  };

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    } else if (success) {
      toast.success("Events fethced successfully");
    } else if (error) {
      toast.error("Failed to fetch events");
    } else {
      dispatch(fetchUserEvents(userId));
    }
  }, [userId, dispatch]);

  const handleDelete = (eventId) => {
    dispatch(deleteEvent(eventId, userId));
    toast.success("Event deleted successfully");
  };

  return (
    <div>
      <Toaster position="bottom-right" richColors />
      <div className="flex justify-between items-center px-10 mt-4 shadow-sm ">
        <div className="logo ">
          <p
            className="text-red-700 text-2xl font-bold cursor-pointer"
            onClick={hadleNavigate}
          >
            OnnEvents
          </p>
        </div>
        <div>
          <h2 className="">
            Hi,
            <span className="font-bold text-red-700 ">
              {loggedInUser.name.charAt(0).toUpperCase() +
                loggedInUser.name.slice(1)}
            </span>
          </h2>
        </div>
      </div>
      <div className="container mx-auto p-6 mt-5 ">
        {isLoading ? (
          <>
            <div className="container flex justify-center">
              <p className="text-center  text-red-700 font-semibold">
                ...Loading
              </p>
            </div>
          </>
        ) : (
          <>
            {userEvents.length > 0 ? (
              <>
                <div className="text-center mb-2">
                  <h2 className="text-3xl font-semibold">Your events</h2>
                </div>

                <div className="flex container mx-auto gap-16 flex-wrap items-center justify-center">
                  {userEvents.map((e) => {
                    return (
                      <div className="cursor-pointer parent mt-6">
                        <div className="rounded-xl max-w-52 shadow-sm overflow-hidden ">
                          <div className="flex flex-col">
                            <div className="img ">
                              <img
                                className="h-80 w-full object-cover rounded-xl"
                                src={e.image}
                                alt=""
                              />
                            </div>
                            <div className="content p-3">
                              <div>
                                <div className="flex justify-between items-center">
                                  <p className="text-xl font-bold">{e.title}</p>
                                  <p className="text-xs ">
                                    {e.status.toUpperCase()}
                                  </p>
                                </div>
                                <p className="text-gray-500 ">
                                  Starts at:
                                  <span className="text-red-700 font-medium ">
                                    Rs{e.ticket}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-around my-2">
                            <button
                              className="text-red-700 px-2  hover:text-red-800 "
                              onClick={() => {
                                hadleNavigate2(e._id);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                handleDelete(e._id);
                              }}
                              className="text-white rounded-sm hover:bg-red-800 bg-red-700 px-1"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                <div className="container flex justify-center">
                  <p className="text-center text-3xl text-red-700 font-semibold">
                    No events yet!
                  </p>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ListedEvents;
