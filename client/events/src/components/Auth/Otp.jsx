import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { toast, Toaster } from "sonner";
import { verifyOtp } from "../../redux/actions/user";

const Otp = () => {
  const isLoading = useSelector((state) => state.user.isLoading);
  const success = useSelector((state) => state.user.success);
  const error = useSelector((state) => state.user.error);
  const [otp, setOtp] = useState("");
  const otpInputRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    dispatch(verifyOtp(otp, navigate));
  };

  useEffect(() => {
    otpInputRef.current.focus();
  }, []);

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
                  OTP
                </h1>
                <hr className="mt-3" />

                <div className="mt-3">
                  <label
                    htmlFor="otp"
                    className="block text-base font-medium mb-2"
                  >
                    Enter OTP
                  </label>
                  <input
                    ref={otpInputRef}
                    value={otp}
                    type="text"
                    id="otp"
                    className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                    placeholder="Enter OTP"
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>

                <button className="w-full bg-red-700 text-lg text-white mt-4 hover:bg-red-800">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default Otp;
