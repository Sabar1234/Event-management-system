import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Toaster, toast } from "sonner";

const SingleEventPage = () => {
  const { eventId } = useParams();
  const [isLoading, setIsloading] = useState(false);
  const [event, setEvent] = useState({});
  console.log("EventSingle", event);
  const [ticket, setTicket] = useState(event.ticket);
  console.log("ticket", ticket);
  const user = JSON.parse(localStorage.getItem("userLogin"));
  const [success, setSuccess] = useState(false);
  console.log(user);
  const username = user.name;
  const useremail = user.email;
  const number = user.number;
  const [count, setCount] = useState(1);

  const share = async () => {
    await navigator.share({
      title: document.title,
      url: window.location.href,
    });
  };

  const handleIncrement = () => {
    setCount(count + 1);
    setTicket(ticket * (count + 1));
  };

  const booknow = async () => {
    try {
      const bookingdata = await axios.post(
        `http://localhost:2000/api/events/booknow/${eventId}`,
        { username, useremail, number, ticket }
      );
      console.log(bookingdata);
      setSuccess(true);
      toast.success("Event Booked Kindly Check Mail");
    } catch (error) {
      console.log(error);
      toast.error("Error in booking event");
    }
  };

  useEffect(() => {
    const fetchEvent = async (eventId) => {
      setIsloading(true);
      try {
        const res = await axios.get(
          `http://localhost:2000/api/events/event/${eventId}`
        );
        console.log("Single event response", res);
        if (res.data.success) {
          setEvent(res.data.event);
          setIsloading(false);
        }
      } catch (error) {
        setIsloading(false);
        console.log("Error in fetching single event", error, error.message);
      }
    };

    fetchEvent(eventId);
  }, [eventId]);

  useEffect(() => {
    if (event._id) {
      setTicket(event.ticket);
    }
  }, [event._id]);
  console.log("EVENT", event);

  return (
    <>
      <Toaster position="bottom-right" />
      <div>
        {/* <Header /> */}

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
            {/* section 1 */}
            <div className=" bg-black md:flex md:justify-start py-6 md:py-8">
              <div className="shareBtn bg-gray-700 hidden md:block w-fit md:h-fit absolute font-medium cursor-pointer py-1 right-3 rounded-md px-2 text-white" onClick={share}>
                <i class="fa-solid fa-share-nodes text-sm me-2"></i>Share
              </div>
              <div className="max-w-md mx-auto bg-black md:ms-32 rounded-lg overflow-hidden md:max-w-2xl">
                <div className="md:flex md:items-center">
                  <div className="image text-white">
                    <img
                      src={event.image}
                      className="h-48 object-cover md:h-full md-w-48"
                      alt=""
                    />
                  </div>
                  <div className="content text-white md:p-8 py-5">
                    <div>
                      <h2 className="md:text-3xl text-lg font-semibold">
                        {event.title}
                      </h2>
                      <p className="mt-2 text-sm ">
                        <span className="md:text-base text-sm font-medium">
                          {event.startDate}
                        </span>
                        <span className="md:text-base text-sm mx-2">to</span>
                        <span className="md:text-base text-sm font-medium">
                          {event.endDate}
                        </span>
                      </p>

                      <div className="mt-4 cursor-pointer">
                        <p className="text-lg">
                          {count} Ticket:
                          <span className=" font-semibold text-yellow-300">
                            {" "}
                            ₹{ticket}
                          </span>
                          <span className="ms-4" onClick={handleIncrement}>
                            <i class="fa-solid fa-caret-up"></i>
                          </span>
                        </p>
                      </div>
                      <div className="btnDiv md:w-[300px] mt-2 flex md:flex-row flex-row">
                        <div className="mt-2 bg-gray-700 w-fit rounded-md p-2">
                          <p>Category: {event.category}</p>
                        </div>
                        <div
                          className="mt-2 cursor-pointer bg-orange-700 mx-2 w-fit rounded-md p-2"
                          onClick={booknow}
                        >
                          <p>Book now</p>
                        </div>
                      </div>

                      <div
                        className="shareBtn bg-gray-700 absolute right-3 md:hidden block w-fit md:h-fit font-medium cursor-pointer py-1 rounded-md px-2 text-white"
                        onClick={share}
                      >
                        <i class="fa-solid fa-share-nodes text-sm me-2"></i>
                        Share
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* section2 */}
            <div className=" md:flex md:justify-start py-6 md:py-8">
              <div className="md:ms-32 ms-12">
                <h2 className="md:text-3xl font-bold md:font-bold">
                  About this event
                </h2>
                <div className="w-[70vw]">
                  <p className="mt-3 text-sm">{event.description}</p>
                </div>
              </div>
            </div>

            {/* section3 */}
            <div className=" md:flex md:justify-start py-6 md:py-8">
              <div className="md:ms-32 ms-12">
                <h2 className="md:text-3xl font-bold md:font-bold">
                  About creator
                </h2>
                <div className="w-[70vw]">
                  <p className="mt-3 text-sm">
                    Name: {event.creator ? <>{event.creator.name}</> : null}
                  </p>
                  <p>
                    {" "}
                    Ph.number:{" "}
                    {event.creator ? <>{event.creator.number}</> : null}
                  </p>
                  <p>
                    {" "}
                    Email: {event.creator ? <>{event.creator.email}</> : null}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SingleEventPage;
