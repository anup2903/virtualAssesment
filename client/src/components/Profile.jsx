import { useState, useEffect } from 'react';
import axios from 'axios';
import { useInfoContext } from '../context/InfoContext';
import Navbar from './Navbar';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [role,setRole] = useState('mentor')
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState([]);
  const token = sessionStorage.getItem('token');
  const userId = sessionStorage.getItem('UserId');
  const userName = sessionStorage.getItem('name');
  // log

  const {setRoleContext,setSkillsContext,roleContext} = useInfoContext();
  // setRoleContext("hello");

  useEffect(() => {
    if (token) {
      axios
        .get(`http://localhost:5000/api/profiles/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log(response);
          
          setProfile(response.data);
          setRole(response.data.role)
          console.log();
          
          setRoleContext(response.data.role)
          setBio(response.data.bio);
          setSkills(response.data.skills);
          // setSkillsContext(response.data.skills)
        })
        .catch((error) => console.error('Error fetching profile:', error));
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/api/profiles/set',
        {userId,skills, bio, role, userName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      sessionStorage.setItem("skills",skills);
      sessionStorage.setItem("role",role);
      // setRoleContext(role);
      // setSkillsContext(skills)
      console.log(response);
      
      alert('Profile updated!');
    } catch (error) {
      console.error(error);
    }
  };

  // if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />

      <div className="flex justify-center items-center min-h-[93vh] bg-[#b097db] p-6">
        <div className="bg-[#1c0b39] text-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-semibold mb-4">Your Profile</h2>
          <h2>{roleContext}</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              value={userName}
              disabled
              className="w-full p-2 mt-1 border border-gray-300 rounded-md text-white"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Role</label>
            <select
              className="w-full p-2 mt-1 border border-gray-300 rounded-md text-black"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="mentor">Mentor</option>
              <option value="mentee">Mentee</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Skills</label>
            <input
              type="text"
              value={skills}
              onChange={(e) =>
                setSkills(e.target.value.toLowerCase().split(","))
              }
              className="w-full p-2 mt-1 border border-gray-300 rounded-md text-black"
            />
            <p className="text-sm text-black">Separate skills with commas</p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Bio</label>
            <textarea
              className="w-full p-2 mt-1 border border-gray-300 rounded-md text-black"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-[#492b7c]  text-white py-2 rounded-md hover:bg-[#b097db]"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
