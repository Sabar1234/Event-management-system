import React, { useEffect, useState } from "react";
import Sidebar from "../constants/Sidebar";
import AdminNav from "../constants/AdminNav";
import { useDispatch } from "react-redux";
import { checkAuth } from "../../redux/actions/admin";
import AllEvents from "./AdminPages/AllEvents";
import AllUser from "./AdminPages/AllUser";
import { useNavigate } from "react-router";
import Requests from "./AdminPages/Requests";

const Admin = () => {
  const [selectedComponent, setSelectedComponent] = useState("AllEvents");
  const admin = JSON.parse(localStorage.getItem("userName"));
  const navigate = useNavigate();

  if (!admin) {
    navigate("/admin-login");
  }

  const handleComponentChange = (component) => {
    setSelectedComponent(component);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  return (
    <>
      {admin && (
        <>
          <div className="hidden md:block fixed top-0">
            <Sidebar handleComponentChange={handleComponentChange} />
          </div>
          <div className="md:hidden">
            <AdminNav />
          </div>
          {selectedComponent === "AllEvents" && <AllEvents  />}
          {selectedComponent === "AllUser" && <AllUser />}
          {selectedComponent === "Requests" && <Requests/>}
        </>
      )}
    </>
  );
};

export default Admin;
