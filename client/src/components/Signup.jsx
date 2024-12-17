import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('mentor');
  const [signin , setSignIn] = useState(true);
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");
  // useEffect(()=>{if(token!==undefined) navigate("/landing")},[])
  

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        username,
        email,
        password,
      });
      console.log("check 1");
      
      sessionStorage.setItem('token', response.data.token);
      sessionStorage.setItem('name', username);
      sessionStorage.setItem('UserId',response.data.userId)
      console.log(response);
       // Store JWT token
      navigate('/landing');
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://virtualassesment.onrender.com/api/users/login', {
        email,
        password,
      });
      console.log("check 1");
      
      sessionStorage.setItem('token', response.data.token);
      sessionStorage.setItem('name', response.data.name);
      sessionStorage.setItem('UserId',response.data.userId)
      console.log(response);
       // Store JWT token
      navigate('/landing');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-[100vh] items-center bg-[#1c0b39] signup-main">
      <div className="w-[50%] bg1"></div>
      <div className="w-[50%] flex justify-center signdiv2">
        {signin ? (
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Welcome to MentornShip!
            </h2>
            <form onSubmit={handleSignUp}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#251342] text-white py-2 rounded-md "
              >
                Sign up
              </button>
              <h2 className="text-center text-[#8037b9] font-medium mt-2 cursor-pointer" onClick={()=>setSignIn(false)}>
                Already have an account? Login
              </h2>
            </form>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Login to your Account
            </h2>
            <form onSubmit={handleLogIn}>
              <div className="my-4">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#251342] text-white py-2 rounded-md "
              >
                Log In
              </button>
              <h2 className="text-center text-[#8037b9] font-medium mt-2 cursor-pointer" onClick={()=>setSignIn(true)}>
                Don't have an account? Sign up
              </h2>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;



