import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

const SingleEventPage = () => {
  const { eventId } = useParams();
  // console.log("EventId",eventId)
  const [isLoading, setIsloading] = useState(false);
  const [event, setEvent] = useState({});
  // const dispatch = useDispatch();

  useEffect(() => {
    const fetchEvent = async (eventId) => {
      setIsloading(true);
      try {
        const res = await axios.get(
          `http://localhost:2000/api/events/event/${eventId}`
        );
        console.log("Single event response", res);
        if (res.data.success) {
          setIsloading(false);
        }
      } catch (error) {
        setIsloading(false);
        console.log("Error in fetching single event", error, error.message);
      }
    };

    fetchEvent(eventId);
  }, [eventId]);

  return (
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
            <div className="shareBtn bg-gray-700 hidden md:block w-fit md:h-fit absolute font-medium cursor-pointer py-1 right-3 rounded-md px-2 text-white">
              <i class="fa-solid fa-share-nodes text-sm me-2"></i>Share
            </div>
            <div className="max-w-md mx-auto bg-black md:ms-32 rounded-lg overflow-hidden md:max-w-2xl">
              <div className="md:flex md:items-center">
                <div className="image  text-white">
                  <img
                    src="/images/samplePic1.png"
                    className="h-48 w-full object-cover md:h-full md-w-48"
                    alt=""
                  />
                </div>
                <div className="content text-white md:p-8 py-5">
                  <div>
                    <h2 className="md:text-3xl text-lg font-semibold">
                      Jatt Nu Chudail Takkri
                    </h2>
                    <p className="mt-2 text-sm ">
                      <span className="md:text-base text-sm font-medium">
                        15-4-2024
                      </span>
                      <span className="md:text-base text-sm mx-2">to</span>
                      <span className="md:text-base text-sm font-medium">
                        18-4-2024
                      </span>
                    </p>
                    <div className="btnDiv mt-2 flex md:flex-row flex-row">
                      <div className="mt-2 bg-gray-700 w-fit rounded-md p-2">
                        <p>Category: Kids</p>
                      </div>
                      <div className="mt-2 cursor-pointer bg-orange-700 mx-2 w-fit rounded-md p-2">
                        <p>Book now</p>
                      </div>
                    </div>
                    <div className="shareBtn bg-gray-700 absolute right-3 md:hidden block w-fit md:h-fit font-medium cursor-pointer py-1 rounded-md px-2 text-white">
                      <i class="fa-solid fa-share-nodes text-sm me-2"></i>Share
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
                <p className="mt-3 text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                  officia praesentium consequatur distinctio quia maiores
                  aperiam repellat sequi. Illum asperiores tempore tenetur omnis
                  vel expedita eum accusantium aliquam, temporibus quos! Facilis
                  nulla quam, harum vero possimus distinctio aut reiciendis
                  doloribus.
                </p>
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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                  officia praesentium consequatur distinctio quia maiores
                  aperiam repellat sequi. Illum asperiores tempore tenetur omnis
                  vel expedita eum accusantium aliquam, temporibus quos! Facilis
                  nulla quam, harum vero possimus distinctio aut reiciendis
                  doloribus.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SingleEventPage;
