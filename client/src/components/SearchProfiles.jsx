import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import available from "../assets/available.json"
import Lottie from 'react-lottie';

const SearchProfiles = () => {
  const [users, setUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState('mentor');
  const [searchTerm, setSearchTerm] = useState('');
  const [profiles, setProfiles] = useState([]);
  const [confirmRequest , setConfirmRequest ] = useState(false)
  const navigate = useNavigate();

  const token = sessionStorage.getItem('token');
  const userId = sessionStorage.getItem('UserId')

  const handleSearch = async () => {
    try {
      const text = searchTerm.toLowerCase();
      const response = await axios.get(`https://virtualassesment.onrender.com/api/profiles/filter/${roleFilter}/${text}`);
      setProfiles(response.data); // Store profiles in state
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
  };

  useEffect(()=>{
    if(confirmRequest==true){
      handleSearch();
    }
  },[confirmRequest])

  const sendNotification = async (recieverId) => {
    try {
      const response = await axios.post("https://virtualassesment.onrender.com/api/notification/send-request", { targetUserId: recieverId, userId: userId });
      console.log(response);
      setConfirmRequest(true);
    } catch (err) {
      if(err.response.data.message=="Profile not found for this user"){
        alert("Your profile hasn't been created yet");
      }
      // alert(err.response.data.message)
      console.log(err.response.data.message);
      // al
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center min-h-screen bg-[#b097db] p-6">
        <h2 className="text-2xl font-semibold mb-4">
          Search for different users
        </h2>

        {/* Search Filter Section */}
        <div className="flex flex-col md:flex-row mb-4 space-y-4 md:space-y-0 md:space-x-4 md:justify-center w-[95%]">
          <select
            className="p-2 border border-gray-300 rounded-md w-full md:w-auto"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="mentor">Mentors</option>
            <option value="mentee">Mentees</option>
          </select>

          <input
            type="text"
            className="p-2 border border-gray-300 rounded-md w-full md:w-auto"
            placeholder="Search by name or skills"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button
            onClick={handleSearch}
            className="bg-[#1c0b39] text-white py-2 px-4 rounded-md  w-full md:w-auto"
          >
            Search
          </button>
        </div>

        {/* Table for Displaying Profiles */}
        <div className="overflow-x-auto w-[100%] md:w-[85%] flex justify-center">
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
                        className="bg-[#1c0b39] text-white py-2 px-4 rounded-md"
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
                    not available
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

export default SearchProfiles;
