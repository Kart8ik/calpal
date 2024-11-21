import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AllContext from '../context/AllContext';
import NavbarTwo from './NavbarTwo';
import '../stylesheets/GroupsPage.css';
import groupimg from '../stylesheets/Group discussion-amico.png'
import aloneimg from '../stylesheets/Alone-amico.png'
import apiRequest from './apiRequest';

const GroupsPage = () => {
  const { userDetails, getGroups, setSelectedGroup, groups} = useContext(AllContext);
  const [userGroups, setUserGroups] = useState([]);
  const [LocalselectedGroup, setLocalSelectedGroup] = useState(null); // Local state to manage selected group
  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [addGroupflag, setAddGroupflag] = useState(false)
  const [deleteGroupflag, setDeleteGroupflag] = useState(false)
  const navigate = useNavigate();
  const url = "http://localhost:8080/api/groups";

  useEffect(() => {
    const getUserGroups = async () => {
      if (userDetails?.username) {
        console.log("Fetching user data...");
        await getGroups();
      }
    };
  
    getUserGroups();
  }, [userDetails, addGroupflag, deleteGroupflag]);

  useEffect(() => {
    if (Array.isArray(groups)) {
      const newUserGroups = groups.filter(group => group.members.includes(userDetails.username));
      setUserGroups(newUserGroups);
      console.log("user Groups", newUserGroups);
    }
  }, [groups]);

  const handleViewCalendarClick = (group) => {
    setSelectedGroup(group);
    // console.log(group)
    navigate('/groupcalendar'); // Navigate to the GroupCalendar page

  };


  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    const groupNames = groups.map((group) => group.groupName);
    if (value) {
      setResults(groupNames.filter((group) => group.toLowerCase().includes(value.toLowerCase())));
    } else {
      setResults([]);
    }
  };

  const handleGroupClick = (group) => {
    setLocalSelectedGroup(group); // Set selected group locally for this component
  };

  const addGroup = async (groupName) => {
    const options = {
      method: 'PUT',
      header: {
        'Content-Type': 'application/json'
      }
    }
    setAddGroupflag(prev=>!prev)
    const newGroup = groups.find(group => group.groupName === groupName)
    if (newGroup.members.includes(userDetails.username)) return;
    const response = await apiRequest(`${url}/${groupName}/userName/${userDetails.username}`, options)
    console.log(response)
    setUserGroups((prevGroups) => [...prevGroups, newGroup]);
  };

  const deleteGroup = async (groupName) => {
    const options = {
      method: 'DELETE',
      header: {
        'Content-Type': 'application/json'
      }
    }
    setDeleteGroupflag(prev=>!prev)
    const response = await apiRequest(`${url}/${groupName}/userName/${userDetails.username}`, options)
    console.log(response)
    const newUserGroups = userGroups.filter(group => group.groupName !== groupName)
    setUserGroups(newUserGroups);
    getGroups();
  }


  return (
    <div>
      <NavbarTwo />
      <div className="groups-container">
        {/* Sidebar for Groups */}
        <div className="groups-sidebar">
          <h1 className="groups-title">Groups</h1>
          <ul className="groups-list">
            {userGroups.map((group) => (
              <li key={group.id} className='group-item' onClick={() => handleGroupClick(group)}>
                {group.groupName}
                <button className="nav-calendar-button" onClick={(e) => { e.stopPropagation(); e.preventDefault(); handleViewCalendarClick(group); }}>View Calendar</button>
                <button className="delete-group-button" onClick={() => {setDeleteGroupflag(prev => !prev);deleteGroup(group.groupName)}}>remove</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Members Section */}
        <div className="group-members">
          {LocalselectedGroup ? (
            <div>
              <h2 className="members-title">Members</h2>
              <ul className="members-list">
                {LocalselectedGroup.members.map((member, index) => (
                  <li key={index}>{member}</li>
                ))}
              </ul>
              <h2>Group Description</h2>
              <p>{LocalselectedGroup.groupDescription}</p>
            </div>
          ) : (
            <p className="placeholder">Select a group to view members and details.</p>
          )}
        </div>

        {/* Search Section */}
        <div className="group-search-area">
          <div className='group-search-container'>
            <input type="text" placeholder="Search groups..." className="group-search-input" value={searchQuery} onChange={(e) => handleSearchChange(e)} />
          </div>
          <div className='results-container'>
            {searchQuery ? (
              results.length > 0 ? (
                results.map((result, index) => (
                  <div key={index} className="result-item" onClick={() => {setAddGroupflag(prev => !prev);addGroup(result)}}>
                    {result}
                  </div>
                ))
              ) : (
                <div>
                <img src={aloneimg} alt="Flower Illustration" className="flower-illustration"/>
                <div className="no-results">No users match your search.</div>
                </div>
              )
            ) : (
              <div>
              <img src={groupimg} alt="Flower Illustration" className="flower-illustration"/>
              <div className="placeholder">Discover more people who think alike.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupsPage;
