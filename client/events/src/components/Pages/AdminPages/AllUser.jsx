import React, { useEffect, useState } from "react";
import axios from "axios";

const AllUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:2000/api/user/users");
        setUsers(res.data.users);
        console.log("Fetch all users", res);
      } catch (error) {
        console.log("Error in fetching all users", error, error.message);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h2 className="text-2xl text-center text-black mt-2 font-bold">
        All Users
      </h2>
      <div className=" md:mx-80 w-full md:w-[70vw]">
        <table class="w-full mt-5">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="text-sm text-gray-800 font-semibold p-3 tracking-wide text-left">
                Name
              </th>
              <th className="text-sm text-gray-800 font-semibold p-3 tracking-wide text-left">
                Email
              </th>
              <th className="text-sm text-gray-800 font-semibold p-3 tracking-wide text-left">
                Phone Number
              </th>
            </tr>
          </thead>
          {users.map((user) => (
            <tbody>
              <tr className="bg-white">
                <td className="p-3 text-sm text-gray-700">
                  {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
                </td>
                <td className="p-3 text-sm text-gray-700">{user.email}</td>
                <td className="p-3 text-sm text-gray-700">{user.number}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default AllUser;
