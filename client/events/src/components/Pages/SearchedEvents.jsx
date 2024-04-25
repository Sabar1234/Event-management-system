import React from "react";
import { grayBg } from "../colors/colors";
import Filter from "../constants/Filter";
import Header from "../constants/Header";

const SearchedEvents = () => {
  return (
    <div>
      <nav className="py-8 h-10 flex justify-center items-center">
        <div className="">
          <div className=" container mx-auto h-auto  flex flex-wrap items-center justify-between ">
            <div className="flex flex-wrap">
              {/* logo-- */}
              <div className="logo ">
                <p className="text-red-700 text-2xl cursor-pointer font-bold">
                  Search Events
                </p>
              </div>
              <div className="ms-12 search md:block hidden"></div>
            </div>
          </div>
        </div>
      </nav>
      <Header />
      <div className="parent mx-auto" style={{ backgroundColor: grayBg }}>
        <div className=" md:flex md:flex-row p-10 flex-col container mx-auto items-start justify-between h-[100%]">
          <Filter />
        </div>
      </div>
    </div>
  );
};

export default SearchedEvents;
