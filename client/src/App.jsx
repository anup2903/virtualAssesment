import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './App.css'
import Signup from "./components/Signup"
import Profile from './components/Profile';
import SearchProfile from './components/SearchProfiles'
import MatchedProfiles from "./components/MatchedProfiles"
import Landing from './components/Landing';
import { InfoProvider } from './context/InfoContext';
import Notifications from './components/Notifications';
import Connections from './components/Connections';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <InfoProvider>
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={<Signup />} />
            
              <Route path="landing" element={<Landing />} />
            
            <Route path="userProfile" element={<Profile />} />
            <Route path="searchProfile" element={<SearchProfile />} />
            <Route path="matchProfile" element={<MatchedProfiles />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="connections" element={<Connections/>} />
          </Route>
        </Routes>
      </Router>
      </InfoProvider>
    </>
  );
}

export default App
