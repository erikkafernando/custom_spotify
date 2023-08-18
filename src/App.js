import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
} from "react-router-dom";
import './App.scss';
import Profile from '../src/profile/Profile'
import Dashboard from './components/dashboard/Dashboard'
import Settings from '../src/settings/SettingsPage'
import Player from './music-player/Player';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Router>
      <div>
        <ul>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
          <li>
            <Link to="/Player">Player</Link>
          </li>
        </ul>

        <Routes>
          <Route path='/profile' element={<Profile/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/settings' element={<Settings/>} />
          <Route path='/player' element={<Player/>} />

        </Routes>

      </div>
    </Router>
      </header>

      
    </div>
  );
}

export default App;
