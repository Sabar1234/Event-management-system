import React from "react";
import { grayBg } from "../colors/colors";
import { useNavigate } from "react-router";

const Header = ({ filterEvents }) => {
  const navigate = useNavigate();
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));
  const userName = userLogin?.name;

  const handleNavigate = () => {
    if (userName) {
      navigate("list-event");
    } else {
      navigate("/login");
    }
  };
  const handleNavigate2 = () => {
    if (userName) {
      navigate("listed-events");
    } else {
      navigate("/login");
    }
  };
  return (
    <div
      className="w-full border-b-2 border-gray-300"
      style={{ backgroundColor: grayBg }}
    >
      <div className="container mx-auto md:flex py-3 hidden p-8 flex-wrap items-center justify-between">
        <div className="left flex flex-wrap items-center justify-center">
          <p
            className="cursor-pointer mx-2 text-sm font-normal"
            onClick={() => {
              filterEvents("all");
            }}
          >
            All
          </p>
          <p
            className="cursor-pointer mx-2 text-sm font-normal"
            onClick={() => {
              filterEvents("Comedy shows");
            }}
          >
            Comedy
          </p>
          <p
            className="cursor-pointer mx-2 text-sm font-normal"
            onClick={() => {
              filterEvents("Music shows");
            }}
          >
            Music
          </p>
          <p
            className="cursor-pointer mx-2 text-sm font-normal"
            onClick={() => {
              filterEvents("Kids");
            }}
          >
            Kids
          </p>
          <p
            className="cursor-pointer mx-2 text-sm font-normal"
            onClick={() => {
              filterEvents("Workshops");
            }}
          >
            Workshops
          </p>
          <p
            className="cursor-pointer mx-2 text-sm font-normal"
            onClick={() => {
              filterEvents("Activities");
            }}
          >
            Activities
          </p>
        </div>

        <div className="right flex flex-wrap items-center justify-center">
          <p
            className="cursor-pointer  mx-2 text-sm font-normal"
            onClick={handleNavigate}
          >
            ListYourEvent
          </p>
          <p
            className="cursor-pointer mx-2 text-sm font-normal"
            onClick={handleNavigate2}
          >
            ListedEvents
          </p>
          <p className="cursor-pointer mx-2 text-sm font-normal">Offers</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
