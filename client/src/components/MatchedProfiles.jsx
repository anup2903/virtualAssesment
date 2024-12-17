import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useInfoContext } from '../context/InfoContext'
import Navbar from './Navbar';

const MatchedProfiles = () => {
  const [profiles, setProfiles] = useState([]);
  const { roleContext, skillsContext, setRoleContext } = useInfoContext();
  console.log(skillsContext);
  const userId = sessionStorage.getItem("UserId");
  const skills = sessionStorage.getItem("skills");
  const temprole = sessionStorage.getItem("role");

  const role = temprole === "mentor" ? "mentee" : "mentor";
  const matches = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/profiles/filter/${role}/${skills}`,
        {
          // params: { role, skillsContext },
        }
      );
      setProfiles(response.data); 
      console.log(response);

      setProfiles(response.data); // Store profiles in state
    } catch (error) {
      console.error("Error fetching profiles:", error);
      setProfiles([]); // In case of an error, set an empty array
    }
  };

  const sendNotification = async (recieverId) => {
    try {
      const response = await axios.post("http://localhost:5000/api/notification/send-request", { targetUserId: recieverId, userId: userId });
      console.log(response);
      setConfirmRequest(true);
    } catch (err) {
      if(err.response.data.message=="Profile not found for this user"){
        alert("Your profile hasn't been created yet");
      }
      else alert(err.response.data.message)
      // alert(err.response.data.message)
      console.log(err.response.data.message);
      // al
    }
  };
  // useEffect(()=>{
  //   console.log(roleContext);

  //   if (roleContext && skillsContext.length) {
  //     matches();
  //   }
  // },[roleContext,skillsContext])
  useEffect(() => {
    matches();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center bg-[#1c0b39] text-white h-[90vh]">
        <div className="text-center text-2xl mt-10 font-bold">
          These are some of the matched profiles according to your profile
        </div>
        <div className="overflow-x-auto w-[100%] md:w-[85%] flex justify-center mt-7">
          <table className="min-w-full table-auto border ">
            <thead>
              <tr className="border border-[#1c0b39]">
                <th className="px-4 py-2 border text-left">Name</th>
                <th className="px-4 py-2 border text-left">Role</th>
                <th className="px-4 py-2 border text-left">Bio</th>
                <th className="px-4 py-2 border text-left">Skills</th>
                <th className="px-4 py-2 border text-left">Connect</th>
              </tr>
            </thead>
            <tbody>
              {profiles.length > 0 ? (
                profiles.map((user) => (
                  <tr key={user._id} className="border ">
                    <td className="px-4 py-2 border">{user.user.username}</td>
                    <td className="px-4 py-2 border">{user.role}</td>
                    <td className="px-4 py-2 border text-ellipsis">
                      {user.bio}
                    </td>
                    <td className="px-4 py-2 border text-ellipsis">
                      {user.skills.join(", ")}
                    </td>
                    <td className="px-4 py-2 border">
                      <button
                        onClick={() => {
                          sendNotification(user.user._id);
                        }}
                        className="bg-[#492b7c] text-white py-2 px-4 rounded-md"
                      >
                        Connect
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-2 text-center text-gray-500"
                  >
                    {/* <Lottie
                      play
                      animationData={available}
                      className=" opacity-40"
                    ></Lottie> */}
                    {skills ? (
                      <h1>No matches found</h1>
                    ) : (
                      <h1>You havn't created a profile</h1>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MatchedProfiles