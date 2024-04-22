import React, { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router";
import axios from "axios";
import { useRef } from "react";

const ListEevent = () => {
  const user = JSON.parse(localStorage.getItem("userLogin"));
  console.log("userLogin at ListEvents", user);
  const userId = user?._id;
  console.log("User-id", userId);
  const [loading, setLoading] = useState(false);
  const [eventData, setEventData] = useState({
    title: "",
    location: "",
    ticket: "",
    startDate: "",
    description: "",
    endDate: "",
    category: "",
    creatorId: userId ? userId : "Please login to access this route",
    image: "",
    seats: "",
  });
  const navigate = useNavigate();
  const cloudinaryRef = useRef();

  console.log("window", window);

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
  }, []);

  const uploadImage = (e) => {
    e.preventDefault();

    if (!cloudinaryRef.current) {
      console.error("Cloudinary not initialized");
      return;
    }

    const widgetRef = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dgiw5xfpq",
        uploadPreset: "gwjd8x4l",
      },
      function (error, result) {
        if (error) {
          console.error("Error uploading image:", error);
          // Provide user feedback, e.g., toast or alert
        } else if (result.event === "success") {
          // setImage(result.info.secure_url);
          setEventData({ ...eventData, image: result.info.secure_url });
        }
      }
    );

    widgetRef.open();
  };
  console.log(eventData.image);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !eventData.title ||
      !eventData.description ||
      !eventData.category ||
      !eventData.startDate ||
      !eventData.endDate ||
      !eventData.location ||
      !eventData.image
    ) {
      return toast.error("Please  fill out all fields!");
    }
    if (!eventData.creatorId) return toast.error("You are not logged in!");

    const ListEevent = async () => {
      try {
        const res = await axios.post(
          "http://localhost:2000/api/events/new",
          eventData
        );
        setLoading(true);
        if (res.data.success) {
          console.log(`Event created successfully ${res.data.message}`);
          toast.success("Event created successfully");
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    ListEevent();

    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <div>
      <Toaster richColors position="bottom-right" />
      <div>
        {loading ? (
          <>
            <div className="container flex justify-center">
              <p className="text-center text-3xl text-red-700 font-semibold">
                ...Loading
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="container mx-auto mt-12 md:mt-5 p-20">
              <form action="" onSubmit={handleSubmit}>
                <div className="flex justify-center items-center h-screen">
                  <div className="w-96 p-6 shadow-lg bg-white rounded-md">
                    <h1 className="block font-semibold text-center text-3xl">
                      List your Event
                    </h1>
                    <hr className="mt-3" />
                    <div className="mt-3">
                      <label
                        htmlFor="username"
                        className="block text-base font-medium mb-2"
                      >
                        Ttile
                      </label>
                      <input
                        value={eventData.title}
                        type="text"
                        id="username"
                        className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                        placeholder="Title of event"
                        onChange={(e) =>
                          setEventData({ ...eventData, title: e.target.value })
                        }
                      />
                    </div>

                    <div className="mt-3">
                      <label
                        htmlFor="message"
                        className="block text-base font-medium  mb-2"
                      >
                        Description
                      </label>
                      <textarea
                        value={eventData.description}
                        id="message"
                        rows={4}
                        className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                        placeholder="Write about your event"
                        onChange={(e) =>
                          setEventData({
                            ...eventData,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="mt-3">
                      <label
                        htmlFor="Eticket"
                        className="block text-base font-medium  mb-2"
                      >
                        Ticket Price
                      </label>
                      <input
                        value={eventData.ticket}
                        type="number"
                        id="Eticket"
                        className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                        placeholder="Set  ticket price"
                        onChange={(e) =>
                          setEventData({
                            ...eventData,
                            ticket: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="mt-3">
                      <label
                        htmlFor="ESeats"
                        className="block text-base font-medium  mb-2"
                      >
                        Seats
                      </label>
                      <input
                        value={eventData.seats}
                        type="number"
                        id="ESeats"
                        className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                        placeholder="Set seats"
                        onChange={(e) =>
                          setEventData({
                            ...eventData,
                            seats: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="mt-3">
                        <label
                          htmlFor="Sdate"
                          className="block font-medium  text-base mb-2"
                        >
                          Start date
                        </label>
                        <input
                          value={eventData.startDate}
                          type="date"
                          id="Sdate"
                          className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                          placeholder="Enter phone number"
                          onChange={(e) =>
                            setEventData({
                              ...eventData,
                              startDate: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="mt-3">
                        <label
                          htmlFor="Edate"
                          className="block font-medium  text-base mb-2"
                        >
                          End date
                        </label>
                        <input
                          value={eventData.endDate}
                          type="date"
                          id="Edate"
                          className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                          placeholder="Enter phone number"
                          onChange={(e) =>
                            setEventData({
                              ...eventData,
                              endDate: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="mt-3">
                      <label
                        htmlFor="location"
                        className="block font-medium  text-base mb-2"
                      >
                        Location
                      </label>
                      <input
                        value={eventData.location}
                        type="text"
                        id="location"
                        className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                        placeholder="Enter location"
                        onChange={(e) =>
                          setEventData({
                            ...eventData,
                            location: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="mt-3">
                      <label
                        onClick={uploadImage}
                        htmlFor="image"
                        className="block font-medium text-base mb-2"
                      >
                        Choose cover Image
                      </label>
                      <input
                        onClick={uploadImage}
                        value="Upload image"
                        // value={image}
                        // onChange={(e) => setImage(e.target.value)}
                        type="button"
                        id="image"
                        className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                        placeholder="Enter phone number"
                      />
                      <img src={eventData.image}></img>
                    </div>

                    <div className="mt-3">
                      <label
                        htmlFor="countries"
                        className="block mb-2 text-base font-medium  "
                      >
                        Select category
                      </label>
                      <select
                        value={eventData.category}
                        onChange={(e) =>
                          setEventData({
                            ...eventData,
                            category: e.target.value,
                          })
                        }
                        id="countries"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        {" "}
                        <option className="text-sm font-medium" value="">
                          Choose
                        </option>
                        <option
                          className="text-sm font-medium"
                          value="Comedy shows"
                        >
                          Comedy shows
                        </option>
                        <option
                          className="text-sm font-medium"
                          value="Music shows"
                        >
                          Music events
                        </option>
                        <option
                          className="text-sm font-medium"
                          value="Workshops"
                        >
                          Workshops
                        </option>
                        <option className="text-sm font-medium" value="Kids">
                          Kids
                        </option>
                        <option
                          className="text-sm font-medium"
                          value="Activities"
                        >
                          Activities
                        </option>
                      </select>
                    </div>

                    <button className="w-full bg-red-700 text-lg text-white mt-4 hover:bg-red-800">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ListEevent;
