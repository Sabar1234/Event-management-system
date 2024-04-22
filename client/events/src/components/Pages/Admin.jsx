import React from "react";
import AdminLayout from "../constants/AdminLayout";
import Sidebar from "../constants/Sidebar";
import AdminNav from "../constants/AdminNav";

const Admin = () => {
  return (
    <>
      <div className="hidden md:block fixed top-0">
        <Sidebar />
      </div>
      <div className="md:hidden">
        <AdminNav />
      </div>
      <AdminLayout />
    </>
  );
};

export default Admin;
