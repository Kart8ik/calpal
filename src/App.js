import './App.css';
import React from 'react';
import FrontPage from './pages/FrontPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import YourTasks from './pages/YourTasks';
import YourCalender from './pages/YourCalender';
import FriendsPage from './pages/FriendsPage';
import GroupsPage from './pages/GroupsPage';
import GroupCalender from './pages/GroupCalender';
import {Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/yourtasks" element={<YourTasks />} />
        <Route path="/yourcalendar" element={<YourCalender />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/groups" element={<GroupsPage />} />
        <Route path="/groupcalendar" element={<GroupCalender />} />
      </Routes>
    </div>
  );
}

export default App;
