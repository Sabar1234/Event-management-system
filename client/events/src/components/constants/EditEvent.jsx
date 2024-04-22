import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Toaster, toast } from "sonner";
import { useRef } from "react";
import { updateEvent } from "../../redux/actions/events";

const EditEvent = () => {
  const { eventId } = useParams();
  const success = useSelector((state) => state.updateEvents.success);
  const [edittedEvent, setEdittedEvent] = useState([]);
  console.log("EventToEdit", edittedEvent);
  const creatorEmail = edittedEvent.creator
    ? edittedEvent.creator.email
    : "none";
  console.log("UpdatedEventCreatorEmail", creatorEmail);
  console.log("EditEventId", eventId);
  const [updatedData, setUpdatedData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    ticket: "",
    location: "",
    image: "",
    creatorEmail,
    eventId,
  });

  const dispatch = useDispatch();
  const cloudinaryRef = useRef();
  // console.log("window",window.cloudinary)
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
          setUpdatedData({ ...updatedData, image: result.info.secure_url });
          console.log(result.info.secure_url)
        }
      }
    );

    widgetRef.open();
  };

  useEffect(() => {
    const fetchEvent = async (eventId) => {
      try {
        const res = await axios.get(
          `http://localhost:2000/api/events/event/${eventId}`
        );
        console.log("Single event response", res.data.event);
        setEdittedEvent(res.data.event);
        setUpdatedData({
          // Set the initial state with fetched event data
          title: res.data.event.title,
          description: res.data.event.description,
          startDate: res.data.event.startDate,
          endDate: res.data.event.endDate,
          ticket: res.data.event.ticket,
          location: res.data.event.location,
          image: res.data.event.image,
          creatorEmail: res.data.event.creator
            ? res.data.event.creator.email
            : "none",
          eventId: eventId,
        });

        if (res.data.success) {
        }
      } catch (error) {
        console.log("Error in fetching single event", error, error.message);
      }
    };

    fetchEvent(eventId);
  }, [eventId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateEvent(creatorEmail, eventId, updatedData));
      toast.success("Event updated successfully");
    } catch (error) {
      toast.error("Failed to update event");
    }
  };

  return (
    <div>
      <Toaster richColors position="bottom-right" />
      <div>
        <div className="container mx-auto mt-3 p-6">
          <form action="" onSubmit={handleSubmit}>
            <div className="flex justify-center items-center">
              <div className="w-96 p-6 shadow-lg bg-white rounded-md">
                <h1 className="block font-semibold text-center text-2xl md:text-3xl">
                  Edit event
                </h1>
                <hr className="mt-3" />
                <div className="mt-3">
                  <label
                    htmlFor="username"
                    className="block text-base font-medium mb-2"
                  >
                    Change title
                  </label>
                  <input
                    type="text"
                    value={updatedData.title}
                    onChange={(e) =>
                      setUpdatedData({ ...updatedData, title: e.target.value })
                    }
                    id="username"
                    className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                    placeholder="Title of event"
                  />
                </div>

                <div className="mt-3">
                  <label
                    htmlFor="message"
                    className="block text-base font-medium  mb-2"
                  >
                    Change description
                  </label>
                  <textarea
                    id="message"
                    value={updatedData.description}
                    onChange={(e) =>
                      setUpdatedData({
                        ...updatedData,
                        descrtption: e.target.value,
                      })
                    }
                    rows={4}
                    className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                    placeholder="Write about your event"
                  />
                </div>

                <div className="mt-3">
                  <label
                    htmlFor="Eticket"
                    className="block text-base font-medium  mb-2"
                  >
                    Change ticket price
                  </label>
                  <input
                    type="number"
                    id="Eticket"
                    className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                    placeholder="Set  ticket price"
                    value={updatedData.ticket}
                    onChange={(e) =>
                      setUpdatedData({
                        ...updatedData,
                        ticket: e.target.value,
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
                      Change start date
                    </label>
                    <input
                      value={updatedData.startDate}
                      onChange={(e) =>
                        setUpdatedData({
                          ...updatedData,
                          startDate: e.target.value,
                        })
                      }
                      type="date"
                      id="Sdate"
                      className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div className="mt-3">
                    <label
                      htmlFor="Edate"
                      className="block font-medium  text-base mb-2"
                    >
                      Change end date
                    </label>
                    <input
                      value={updatedData.endDate}
                      onChange={(e) =>
                        setUpdatedData({
                          ...updatedData,
                          endDate: e.target.value,
                        })
                      }
                      type="date"
                      id="Edate"
                      className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <label
                    htmlFor="location"
                    className="block font-medium  text-base mb-2"
                  >
                    Change location
                  </label>
                  <input
                    value={updatedData.location}
                    onChange={(e) =>
                      setUpdatedData({
                        ...updatedData,
                        location: e.target.value,
                      })
                    }
                    type="text"
                    id="location"
                    className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                    placeholder="Enter location"
                  />
                </div>

                <div className="mt-3">
                  <label
                    htmlFor="image"
                    onClick={uploadImage}
                    className="block font-medium text-base mb-2"
                  >
                    Change cover Image
                  </label>
                  <input
                    onChange={(e) =>
                      setUpdatedData({
                        ...updatedData,
                        endDate: e.target.value,
                      })
                    }
                    value="Change image"
                    onClick={uploadImage}
                    type="button"
                    id="image"
                    className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                    placeholder=""
                  />
                  <img className="mt-2" src={edittedEvent.image}></img>
                </div>

                <button className="w-full bg-red-700 text-lg text-white mt-4 hover:bg-red-800">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEvent;
