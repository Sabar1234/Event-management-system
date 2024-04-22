import React from "react";
import { grayBg } from "../colors/colors";
import Filter from "../constants/Filter";
import Header from "../constants/Header";
import FilteredEvents from "./FilteredEvents";

const SearchedEvents = () => {
  return (
    <div>
      <Header />

      <div className="parent mx-auto" style={{ backgroundColor: grayBg }}>
        <div className=" md:flex md:flex-row p-10 flex-col container mx-auto items-start justify-between h-[100%]">
          <Filter />
          <FilteredEvents />
        </div>
      </div>
    </div>
  );
};

export default SearchedEvents;
