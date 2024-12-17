import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";

const Connections = () => {
  const userId = sessionStorage.getItem("UserId");
  const [activeConnections, setActiveConnections] = useState([]);
  const [confirmRequest, setConfirmRequest] = useState(false);

  // Fetch accepted connections
  const getAcceptedConnections = async () => {
    try {
      const response = await axios.get(
        `https://virtualassesment.onrender.com/api/connection/status/${userId}/accepted`
      );
      console.log(response.data);
      
      setActiveConnections(response.data);
    } catch (error) {
      console.error("Error fetching accepted connections:", error);
    }
  };

  // Remove a connection
  const removeConnection = async (user2) => {
    try {
      await axios.put(
        `https://virtualassesment.onrender.com/api/connection/request/${userId}/${user2}/rejected`
      );
      setConfirmRequest(!confirmRequest); // Toggle to trigger re-fetch
      alert("Connection removed");
    } catch (error) {
      console.error("Error removing connection:", error);
    }
  };

  // Fetch connections when confirmRequest changes
  useEffect(() => {
    getAcceptedConnections();
  }, [confirmRequest]);

  return (
    <div>
      <Navbar />
      <div className=" h-[90vh] bg-[#d5d6ff]">
        <h1 className="text-center text-2xl font-bold py-10">
          Manage Your Connections
        </h1>
        <div className="overflow-x-auto w-[90%] md:w-[85%] mx-auto flex justify-center">
          <table className="min-w-full table-auto border">
            <thead>
              <tr className="bg-[#1c0b39] text-white border-b max-h-[10px] break-words overflow-y-auto">
                <th className="px-4 py-2 border text-left">Name</th>
                <th className="px-4 py-2 border text-left">Role</th>
                <th className="px-4 py-2 border text-left max-h-[10px] ">Bio</th>
                <th className="px-4 py-2 border text-left">Skills</th>
                <th className="px-4 py-2 border text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-[#b097db]">
              {activeConnections.length > 0 ? (
                activeConnections.map((data) => {
                  const user = 
                    data.reciever.user === userId
                      ? data.sender
                      : data.reciever; // Determine the other user
                  return (
                    <tr key={user._id} className="border-b">
                      <td className="px-4 py-2 border">{user.userName}</td>
                      <td className="px-4 py-2 border">{user.role}</td>
                      <td className="px-4 py-2 border text-ellipsis">{user.bio}</td>
                      <td className="px-4 py-2 border">
                        {user.skills.join(", ")}
                      </td>
                      <td className="px-4 py-2 border">
                        <button
                          onClick={() => removeConnection(user.user)}
                          className="bg-[#492b7c] text-white py-1 px-3 rounded-md hover:bg-red-600"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-2 text-center text-gray-500"
                  >
                    No active connections found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Connections;
