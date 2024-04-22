import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";

const MaybeNavbar = ({ children }) => {
  const [showNavbar, setShowNavbar] = useState(true);

  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname === "/otp" ||
      location.pathname === "/signup" ||
      location.pathname === "/login" ||
      location.pathname === "/listed-events" ||
      location.pathname === "/admin" ||
      location.pathname === "/admin/all-users" ||
      location.pathname === "/admin/all-events" ||
      location.pathname === "/admin/requests"
    ) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  }, [location]);

  return <div>{showNavbar && children}</div>;
};

export default MaybeNavbar;
