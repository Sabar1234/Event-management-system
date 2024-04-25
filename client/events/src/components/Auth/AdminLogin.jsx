import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Toaster, toast } from "sonner";
import { adminLogin } from "../../redux/actions/admin";

const AdminLogin = () => {
  const error = useSelector((state) => state.admin.error);
  const isLoading = useSelector((state) => state.admin.isLoading);
  console.log(error);
  const [userData, setUserData] = useState({ userName: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/admin-signup");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!userData) {
      toast.error("Please fill all the fields");
      return;
    }
    if (error) {
      toast.error(`${error}Correctly fill all the fields`);
    }
    dispatch(adminLogin(userData, navigate));
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
                    htmlFor="username"
                    className="block text-base font-medium  mb-2"
                  >
                    Username
                  </label>
                  <input
                    isrequired
                    value={userData.userName}
                    type="text"
                    id="username"
                    className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                    placeholder="Username"
                    onChange={(e) =>
                      setUserData({ ...userData, userName: e.target.value })
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
                  </div>
                  <input
                    isrequired
                    value={userData.password}
                    type="password"
                    id="password"
                    className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                    placeholder="Create password"
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

export default AdminLogin;
