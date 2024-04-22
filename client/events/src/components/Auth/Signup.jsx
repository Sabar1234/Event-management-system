import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { toast, Toaster } from "sonner";
import { userRegister } from "../../redux/actions/user";
import { useEffect } from "react";

const Signup = () => {
  const isLoading = useSelector((state) => state.user.isLoading);
  const success = useSelector((state) => state.user.success);
  console.log("signup", success);
  const error = useSelector((state) => state.user.error);
  console.log("signup", error);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    number: "",
    confirmpassword: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/login");
  };

  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow((prev) => !prev);
    console.log(show);
  };

  useEffect(() => {
    if (success) {
      toast.success(success);
    }
    if (error) {
      toast.error(error);
    }
  }, [success, error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userData) {
      toast.error("Please fill all the fields");
      return;
    }

    dispatch(userRegister(userData, navigate));
  };

  return (
    <>
      <Toaster richColors position="bottom-right" />
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
          <form action="" onSubmit={handleSubmit}>
            <div className="flex justify-center items-center h-screen">
              <div className="w-96 p-6 shadow-lg bg-white rounded-md">
                <h1 className="block font-semibold text-center text-3xl">
                  Sign-up
                </h1>
                <hr className="mt-3" />
                <div className="mt-3">
                  <label
                    htmlFor="username"
                    className="block text-base font-medium mb-2"
                  >
                    Name
                  </label>
                  <input
                    value={userData.name}
                    type="text"
                    id="username"
                    className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                    placeholder="Enter name"
                    onChange={(e) =>
                      setUserData({ ...userData, name: e.target.value })
                    }
                  />
                </div>

                <div className="mt-3">
                  <label
                    htmlFor="email"
                    className="block text-base font-medium  mb-2"
                  >
                    Email
                  </label>
                  <input
                    value={userData.email}
                    type="email"
                    id="email"
                    className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                    placeholder="Enter email"
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                  />
                </div>

                <div className="mt-3">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block font-medium  text-base mb-2"
                    >
                      Create Password
                    </label>
                    <label
                      htmlFor="password"
                      className="block text-red-700 text-xs font-medium  cursor-pointer mb-2"
                      onClick={handleClick}
                    >
                      {show ? "Hide" : "Show"}
                    </label>
                  </div>
                  <input
                    value={userData.password}
                    type={show ? "text" : "password"}
                    id="password"
                    className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                    placeholder="Enter password"
                    onChange={(e) =>
                      setUserData({ ...userData, password: e.target.value })
                    }
                  />
                </div>

                <div className="mt-3">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block font-medium  text-base mb-2"
                    >
                      Confirm password
                    </label>
                    <label
                      htmlFor="password"
                      className="block text-red-700 text-xs font-medium  cursor-pointer mb-2"
                      onClick={handleClick}
                    >
                      {show ? "Hide" : "Show"}
                    </label>
                  </div>
                  <input
                    value={userData.confirmpassword}
                    type={show ? "text" : "password"}
                    id="password"
                    className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                    placeholder="Confirm password"
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        confirmpassword: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mt-3">
                  <label
                    htmlFor="number"
                    className="block font-medium  text-base mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    value={userData.number}
                    type="number"
                    id="number"
                    className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                    placeholder="Enter phone number"
                    onChange={(e) =>
                      setUserData({ ...userData, number: e.target.value })
                    }
                  />
                </div>

                <button className="w-full bg-red-700 text-lg text-white mt-4 hover:bg-red-800">
                  Submit
                </button>

                <div className="my-3 flex justify-between items-center">
                  <p className="text-sm font-medium text-gray-800">
                    Already have an account?{" "}
                  </p>
                  <p
                    className="text-red-700 font-medium cursor-pointer hover:	underline"
                    onClick={handleNavigate}
                  >
                    Login
                  </p>
                </div>
              </div>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default Signup;
