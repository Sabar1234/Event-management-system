import React from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logOutUser } from "../../redux/actions/user";

const Navbar = () => {
  const dispatch = useDispatch();

  const userLogout = useSelector((state) => state.user);
  const navigate = useNavigate();
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));
  const userName = userLogin?.name;

  const handleClick = () => {
    navigate("/signup");
  };

  const handleLogout = () => {
    dispatch(logOutUser());
  };
  const handleNavigate = () => {
    navigate("/search-events");
  };
  const navigatgeToHome = () => {
    navigate("/");
  };
  return (
    <div>
      <nav>
        <div className="">
          <div className=" container mx-auto h-auto  flex flex-wrap items-center justify-between px-10 py-3">
            <div className="flex flex-wrap">
              {/* logo-- */}
              <div className="logo ">
                <p
                  className="text-red-700 text-2xl cursor-pointer font-bold"
                  onClick={navigatgeToHome}
                >
                  OnnEvents
                </p>
              </div>
              {/* search-- */}
              <div
                className="ms-12 search md:block hidden"
                onClick={handleNavigate}
              >
                <div className="cursor-text border border-gray-300 flex w-[500px] p-2 rounded-md">
                  <img
                    className="h-5 mx-2"
                    src="images/search-icon.png"
                    alt=""
                  />
                  <p className="text-sm text-gray-400">
                    Search for Events & Activities
                  </p>
                </div>
              </div>
            </div>

            <div
              className="md:block hidden"
              style={{ display: "flex", alignItems: "center" }}
            >
              {userName ? (
                <>
                  {/* Logout btn-- */}
                  <div className="btn md:block hidden mx-2">
                    <button
                      class="bg-red-700 cursor-pointer hover:bg-red-800 text-white text-sm font-bold py-1  px-3 rounded focus:shadow-outline"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* signup btn-- */}
                  <div className="btn md:block hidden mx-2">
                    <button
                      class="bg-red-700 cursor-pointer hover:bg-red-800 text-white text-sm font-bold py-1  px-3 rounded focus:shadow-outline"
                      onClick={handleClick}
                    >
                      Sign Up
                    </button>
                  </div>
                </>
              )}
              {/* btn icon-- */}
              <a
                className=" md:hidden block text-4xl text-gray-400 mb-2"
                href="#"
              >
                &#8801;
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
