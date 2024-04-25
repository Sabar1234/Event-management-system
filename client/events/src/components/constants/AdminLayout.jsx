// import React, { useState } from "react";
// import AllEvents from "../Pages/AdminPages/AllEvents";
// import AllUser from "../Pages/AdminPages/AllUser";
// import { useNavigate } from "react-router";

// const AdminLayout = () => {
//   const [selectedComponent, setSelectedComponent] = useState("AllEvents");
//   const admin = JSON.parse(localStorage.getItem("userName"));
//   const navigate = useNavigate();

//   const handleComponentChange = (component) => {
//     setSelectedComponent(component);
//   };

//   return (
//     <>
//       {admin && (
//         <>
//           {selectedComponent === "AllEvents" && <AllEvents />}
//           {selectedComponent === "AllUser" && <AllUser />}
//         </>
//       )}
//     </>
//   );
// };

// export default AdminLayout;
