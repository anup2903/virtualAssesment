import React, { useEffect , useState } from 'react'
import Navbar from './Navbar';
import axios from 'axios';

const Connections = () => {
    const userId = sessionStorage.getItem('UserId');
    const [activeConnections ,setActiveConnections] = useState([]);
    const [pendingConnections ,setPendingConnections] = useState([]);
    const [confirmRequest , setConfirmRequest] = useState(false)
    
    const getPendingConnections = async()=>{
        try {
            const response = await axios.get(`https://virtualassesment.onrender.com/api/connection/status/${userId}/pending`);
            console.log(response.data);
            setPendingConnections(response.data);
            
        } catch (error) {
            console.log(error);
            
        }
    }
    useEffect(()=>{
        getPendingConnections();
    },[confirmRequest])



    const acceptConnection = async(user2)=>{
        try {
            const response = await axios.put(`https://virtualassesment.onrender.com/api/connection/request/${userId}/${user2}/accepted`);
            console.log(response);
            setConfirmRequest(true);
            alert("accepted connection")
            
        } catch (error) {
            console.log(error);
            
        }
    }
  return (
    <div>
      <Navbar />
      <div className="flex justify-center w-[100%] md:w-full  bg-[#201238] h-[90vh]">
        <div className=" ">
          <h1 className='my-10 text-center text-3xl text-white'>Check your notifications</h1>
          <div className='flex justify-center m-auto w-[90%] md:w-full bg-white rounded-xl'>
          {pendingConnections &&
            pendingConnections.map((data) => {
              const user =
                data.reciever.user == userId ? data.sender : data.reciever;
              return (
                <div
                  key={user._id}
                  className=" rounded-xl p-2  text-center flex flex-col mb-3"
                >
                  <div className="flex justify-between">
                    <h1 className="text-3xl">{user.userName}</h1>
                    <button
                      className="p-2 rounded-xl bg-[#b097db] text-white"
                      onClick={() => {
                        acceptConnection(user.user);
                      }}
                    >
                      Accept
                    </button>
                  </div>
                  <div className="flex flex-col gap-4 md:flex-row md:gap-6 mt-2 text-left">
                    <h1 className="text-base md:text-lg">
                      <span className="font-bold text-[#201238]">Role:</span>{" "}
                      {user.role}
                    </h1>
                    <h1 className="text-base md:text-lg">
                      <span className="font-bold text-[#201238]">Skills:</span>{" "}
                      {user.skills.join(", ")}
                    </h1>
                    <h1 className="text-base md:text-lg text-ellipsis overflow-hidden">
                      <span className="font-bold text-[#201238]"> Bio:</span>{" "}
                      {user.bio}
                    </h1>
                  </div>
                </div>
              );
            })}
            </div>
        </div>
      </div>
    </div>
  );
}

export default Connections