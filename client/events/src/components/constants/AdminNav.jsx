import React, { useState } from "react";
import { grayBg } from "../colors/colors";

const AdminNav = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div>
      <nav className="px-4" style={{ backgroundColor: grayBg }}>
        <div className="">
          <div className=" container mx-auto h-auto  flex flex-wrap items-center justify-between ">
            <div className="flex flex-wrap">
              {/* logo-- */}
              <div className="logo ">
                <p className="text-gray-800 text-xl cursor-pointer font-bold">
                  Admin Dashboard
                </p>
              </div>
              {/* search-- */}
              <div className="ms-12 search md:block hidden"></div>
            </div>

            <div
              className="md:block hidden"
              style={{ display: "flex", alignItems: "center" }}
            >
              <button
                onClick={handleClick}
                className=" md:hidden block text-4xl text-gray-400 mb-2"
                href="#"
              >
                &#8801;
              </button>

              <div
                className={`${
                  showMenu ? "right-0" : "-right-full"
                } md:relative fixed top-0 h-screen w-64 bg-white z-50 transition-transform duration-300`}
              >
                <button
                  className="md:hidden block absolute right-4 text-gray-400 text-3xl"
                  onClick={handleClick}
                >
                  <span className="text-xl text-gray-400 mb-2 font-semibold">X</span>
                </button>
                <ul className="mt-8 shadow">
                  <li className="py-2 px-4 text-lg font-semibold hover:bg-red-700 hover:text-white">Home</li>
                  <li className="py-2 px-4 text-lg font-semibold hover:bg-red-700 hover:text-white">All Events</li>
                  <li className="py-2 px-4 text-lg font-semibold hover:bg-red-700 hover:text-white">All Users</li>
                  <li className="py-2 px-4 text-lg font-semibold hover:bg-red-700 hover:text-white">Requests</li>
                  <li className="py-2 px-4 text-red-700 text-lg font-semibold hover:bg-red-700 hover:text-white">Log Out</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AdminNav;
