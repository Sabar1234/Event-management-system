import React from "react";
import { useSelector, useDispatch } from "react-redux";

const Filter = () => {
  const events = useSelector((state) => state.events.events);
  console.log("Filter", events);
  return (
    <div>
      <div className="container">
        <div>
          <h2 className="text-3xl font-bold mb-6">Filters</h2>

          <div className="bg-white p-6 shadow-md">
            <div className="flex items-center justify-between">
              <p className="text-red-700 text-base">Date</p>
              <p className="text-gray-700 text-base cursor-pointer hover:text-red-700">
                Clear
              </p>
            </div>
            <div className="flex mt-6">
              <button className="border-solid mx-4 px-3 py-1 text-red-700 border-2 border-gray-300">
                Today
              </button>
              <button className="border-solid mx-4 px-3 py-1 text-red-700 border-2 border-gray-300">
                Tomorrow
              </button>
            </div>
            <div className="flex flex-col items-center">
              <div className=" mt-5">
                <button className="border-solid mx-4 px-3 py-1 text-red-700 border-2 border-gray-300">
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
              <p className="text-gray-700 text-base cursor-pointer hover:text-red-700">
                Clear
              </p>
            </div>
            <div className="flex mt-6">
              <button className="border-solid mx-4 px-3 py-1 text-red-700 border-2 border-gray-300">
                Music
              </button>
              <button className="border-solid mx-4 px-3 py-1 text-red-700 border-2 border-gray-300">
                Comedy
              </button>
            </div>
            <div className="flex mt-6">
              <button className="border-solid mx-4 px-3 py-1 text-red-700 border-2 border-gray-300">
                Workshops
              </button>
              <button className="border-solid mx-4 px-3 py-1 text-red-700 border-2 border-gray-300">
                kids
              </button>
            </div>
            <div className="flex mt-6">
              <button className="border-solid mx-4 px-3 py-1 text-red-700 border-2 border-gray-300">
                Activities
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
