import React, { useEffect, useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import axios from 'axios';
import Navbar from './Navbar';
import profile from "../images/profile-teacher.png"
import match from "../images/match.png"

const Landing = () => {
  const userId = sessionStorage.getItem("UserId");
  const name = sessionStorage.getItem("name");
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  useEffect(()=>{
      if(!token) navigate("/");
  },[])
  console.log(userId);
  

  const [notification, setNotification] = useState([]);

  const getNotif = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/notification/${userId}`);
      console.log(response.data);
      setNotification(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const confirmRequest = async (status, receiverId) => {
    try {
      const response = await axios.post("http://localhost:5000/api/notification/respond-request", {
        userId: userId,
        targetUserId: receiverId,
        response: status
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getNotif();
  }, []);

  return (
    <div className='  text-white '>
      <Navbar />
      <div className="flex  min-h-screen justify-center bg-[#1c0b39] ca">
        <div className='w-full'>
          <div className="text-center text-5xl mt-10 TitleText">Welcome {name}</div>
          <div className="flex justify-around mt-6 lg:mt-28 mb-6  relative text-black landing-div flex-wrap gap-5 lg:gap-0">
            <Link to="/searchProfile">
              <div className='w-[20rem] rounded-xl shadow-lg bg-white p-2 flex flex-col items-center landing-innerDiv'>
                <img src={profile} alt="" className="w-[15rem]" />
                <h1 className='my-4'>Look for other user profiles</h1>
              </div>
            </Link>
            <Link to="/connections">
              <div className='w-[20rem] rounded-xl shadow-lg bg-white p-2 flex flex-col items-center landing-innerDiv'>
                <img src={profile} alt="" className="w-[15rem]" />
                <h1 className='my-4'>Manage your connections</h1>
              </div>
            </Link>
            <Link to="/matchProfile">
              <div className='w-[20rem] rounded-xl  bg-white p-2 flex flex-col items-center landing-innerDiv'>
                <img src={match} alt="" className="w-[18rem]" />
                <h1>Check your matched mentor/mentee</h1>
              </div>
            </Link>
          </div>
         
        </div>
      </div>
    </div>
  );
}

export default Landing;
