import React, { useState } from "react";
import {
  FaHome,
  FaPeopleCarry,
  FaRegSquare,
  FaSignOutAlt,
  FaUserFriends,
} from "react-icons/fa";
import { grayBg } from "../colors/colors";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminLogout } from "../../redux/actions/admin";
import { Toaster } from "sonner";

const Sidebar = ({ handleComponentChange }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(adminLogout(navigate));
  };

  return (
    <>
      <Toaster position="bottom-left" richColors />
      <div
        className={`w-64 fixed h-full px-4 py-2 `}
        style={{ backgroundColor: grayBg }}
      >
        <div className="my-2 mb-4">
          <h1 className="md:text-2xl text-lg text-gray-800 font-bold">
            Admin Dashboard
          </h1>
        </div>
        <hr />
        <ul className="mt-3 text-gray-800 font-bold">
          <Link to={"/"}>
            <li className="mb-2 rounded hover:shadow hover:bg-red-700 hover:text-white py-2">
              <span className="px-3" href="">
                <FaHome className="inline-block w-6 h-6 mr-2 -mt-2"></FaHome>
                Home
              </span>
            </li>
          </Link>
          <div onClick={() => handleComponentChange("AllEvents")}>
            <li className="mb-2 rounded hover:shadow hover:bg-red-700 hover:text-white py-2 active:bg-red-900">
              <span className="px-3" href="">
                <FaPeopleCarry className="inline-block w-6 h-6 mr-2 -mt-2"></FaPeopleCarry>
                All Events
              </span>
            </li>
          </div>
          <div onClick={() => handleComponentChange("AllUser")}>
            <li className="mb-2 rounded hover:shadow hover:text-white hover:bg-red-700 py-2 active:bg-red-900">
              <span className="px-3" href="">
                <FaUserFriends className="inline-block w-6 h-6 mr-2 -mt-2"></FaUserFriends>
                All Users
              </span>
            </li>
          </div>
          <div onClick={() => handleComponentChange("Requests")}>
            <li className="mb-2 rounded hover:shadow hover:text-white hover:bg-red-700 py-2 active:bg-red-900">
              <span className="px-3" href="">
                <FaRegSquare className="inline-block w-6 h-6 mr-2 -mt-2"></FaRegSquare>
                Requests
              </span>
            </li>
          </div>

          <div onClick={handleLogout}>
            <li className="mb-2 rounded hover:shadow hover:text-white py-2">
              <span className="px-3 text-red-700" href="">
                <FaSignOutAlt className="inline-block w-6 h-6 mr-2 -mt-2"></FaSignOutAlt>
                Log Out
              </span>
            </li>
          </div>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
