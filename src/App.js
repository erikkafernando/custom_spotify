import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
} from "react-router-dom";
import './App.scss';
import Profile from '../src/profile/Profile'
import Dashboard from '../src/dashboard/Dashboard'
import Settings from '../src/settings/SettingsPage'

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
        </ul>

        <Routes>
          <Route path='/profile' element={<Profile/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/settings' element={<Settings/>} />
        </Routes>

      </div>
    </Router>
      </header>

      
    </div>
  );
}

export default App;
