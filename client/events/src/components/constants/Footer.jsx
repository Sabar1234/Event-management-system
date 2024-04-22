import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
const Footer = () => {
  return (
    <div>
      <div
        className="flex flex-col items-center gap-11 p-11 mt-10"
        style={{ backgroundColor: "rgb(51, 51, 56)" }}
      >
        <div className="w-[98vw] flex justify-center border-b-2 border-gray-500 relative">
          <div
            className=""
            style={{
              position: "absolute",
              top: -21,
              backgroundColor: "rgb(51, 51, 56)",
            }}
          >
            <p className="text-white text-3xl cursor-pointer font-bold">
              OnnEvents
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-6">
          <FaFacebook className="text-gray-500  hover:text-white cursor-pointer  text-4xl" />
          <FaInstagram className="text-gray-500  hover:text-white cursor-pointer text-4xl " />
          <FaTwitter className="text-gray-500  hover:text-white cursor-pointer  text-4xl" />
          <FaWhatsapp className="text-gray-500  hover:text-white cursor-pointer  text-4xl" />
          <FaLinkedin className="text-gray-500  hover:text-white cursor-pointer  text-4xl" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
