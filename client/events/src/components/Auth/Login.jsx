import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Toaster, toast } from "sonner";
import { userLogin } from "../../redux/actions/user";

const Login = () => {
  const error = useSelector((state) => state.user.error);
  const isLoading = useSelector((state) => state.user.isLoading);
  console.log(error);
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/signup");
  };

  const handleClick = () => {
    setShow((prev) => !prev);
    console.log(show);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!password || !email) {
      toast.error("Please fill all the fields");
      return;
    }
    if (error) {
      toast.error(`${error}Correctly fill all the fields`);
    }
    dispatch(userLogin(userData, navigate));
  };
  return (
    <>
      <Toaster richColors position="bottom-right" />
      {isLoading ? (
        <>
          {" "}
          <div className="container flex justify-center">
            <p className="text-center text-3xl text-red-700 font-semibold">
              ...Loading
            </p>
          </div>
        </>
      ) : (
        <>
          <form action="" onSubmit={submitHandler}>
            <div className="flex justify-center items-center h-screen">
              <div className="w-96 p-6 shadow-lg bg-white rounded-md">
                <h1 className="block font-semibold text-center text-3xl">
                  Login
                </h1>
                <hr className="mt-3" />

                <div className="mt-3">
                  <label
                    htmlFor="email"
                    className="block text-base font-medium  mb-2"
                  >
                    Email
                  </label>
                  <input
                    isrequired
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
                      Enter password
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
                    isrequired
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

                <button className="w-full bg-red-700 text-lg text-white mt-4 hover:bg-red-800">
                  Submit
                </button>
                <div className="my-3 flex justify-between items-center">
                  <p className="text-sm font-medium text-gray-800">
                    Do not have an account?
                  </p>
                  <p
                    className="text-red-700 font-medium cursor-pointer hover:	underline"
                    onClick={handleNavigate}
                  >
                    Sign-up
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

export default Login;
