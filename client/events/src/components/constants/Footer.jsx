import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div>
      <div
        className="flex flex-col items-center gap-11 p-11 mt-10"
        style={{ backgroundColor: "rgb(51, 51, 56)" }}
      >
        <div className="w-[98vw] flex justify-center border-b-2 border-gray-500 relative">
          <div
            className="px-2"
            style={{
              position: "absolute",
              top: -19,
              backgroundColor: "rgb(51, 51, 56)",
            }}
          >
            <Link to="/">
              <p className="text-white text-2xl cursor-pointer font-bold">
                Onn<span className="bg-red-700 px-1">E</span>vents
              </p>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center gap-6">
          <FaFacebook className="text-gray-500  hover:text-white cursor-pointer  text-3xl" />
          <FaInstagram className="text-gray-500  hover:text-white cursor-pointer text-3xl " />
          <FaTwitter className="text-gray-500  hover:text-white cursor-pointer  text-3xl" />
          <FaWhatsapp className="text-gray-500  hover:text-white cursor-pointer  text-3xl" />
          <FaLinkedin className="text-gray-500  hover:text-white cursor-pointer  text-3xl" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
