import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { fetchAllEvents } from "../../redux/actions/events";
import { useNavigate } from "react-router";

const ProductsContainer = (props) => {
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
      <div className="flex flex-col items-center mt-6">
        <div className="container px-8 flex justify-between mx-auto">
          <h2 className="text-start  font-bold text-xl text-gray-700">
            {props.heading}
          </h2>
          <h2 className=" ms-8  text-red-700 cursor-pointer hover:text-red-800">
            {props.seeAll}
          </h2>
        </div>
        <div className="flex container mx-auto gap-16 flex-wrap items-center justify-center">
          {isLoading ? (
            <>
              {" "}
              <div className="container flex justify-center">
                <p className="text-center text-3xl text-red-700 font-semibold">
                  ...Loading
                </p>
              </div>
            </>
          ) : (
            <>
              {events.map((e) => {
                return (
                  <>
                    {e.status === "APPROVED" ? (
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
                                <div>
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
                    ) : (
                      <>{null}</>
                    )}
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

export default ProductsContainer;
