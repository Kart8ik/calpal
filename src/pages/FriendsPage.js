import React, { useContext, useEffect, useState } from "react";
import "../stylesheets/FriendsPage.css";
import NavbarTwo from "./NavbarTwo";
import AllContext from "../context/AllContext";
import apiRequest from "./apiRequest";
const FriendsPage = () => {
  const { userDetails, users, setUserDetails, getUserData } = useContext(AllContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    console.log("Effect running");
    console.log("Dependencies: ", {
      username: userDetails?.username,
      tasks: userDetails?.tasks,
      friends: userDetails?.friendsList,
    });

    const getFriends = () => {
      if (userDetails?.username) {
        console.log("Fetching user data...");
        getUserData(userDetails.username);
        if (Array.isArray(userDetails.friendsList)) {
          setFriends(userDetails.friendsList);
          console.log("Friends: ", userDetails.friendsList);
        }
      }
    };

    getFriends();
  }, [userDetails.username, userDetails.friendsList?.length, getUserData]);

  const addFriend = (friend) => {
    if (!friends.includes(friend)) {
      const newFriendsList = [...friends, friend];
      setFriends(newFriendsList);
      setUserDetails({ ...userDetails, friendsList: newFriendsList });

      const options = {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        }
      };

      try {
        const data = apiRequest(`http://localhost:8080/api/users/${userDetails.username}/friend/${friend}`, options);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    }
  }

  const deleteFriend = (friend) => {
    const newFriendsList = friends.filter((f) => f !== friend);
    setFriends(newFriendsList);
    setUserDetails({ ...userDetails, friendsList: newFriendsList });

    const options = {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      }
    };

    try {
      const data = apiRequest(`http://localhost:8080/api/users/${userDetails.username}/friend/${friend}`, options);
      console.log(data);
    } catch (err) {
      console.error(err);
  }
  }

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    const usernames = users.map((user) => user.username);
    if (value) {
      setResults(usernames.filter((user) => user.toLowerCase().includes(value.toLowerCase())));
    } else {
      setResults([]);
    }
  };

  return (
    <div className="friends-page">
      <NavbarTwo />
      <div className="content">
        {/* Left Section */}
        <div className="friends-list">
          <h2 className="friends-title">Friends</h2>
          <ul>
            {friends.map((friend, index) => (
              <li key={index}>{friend}<button className="delete-friend-button" onClick={() => deleteFriend(friend)}>remove</button></li>
            ))}
          </ul>
        </div>

        {/* Right Section */}
        <div className="friend-search-area">
          <div className="friend-search-container">
            <input type="text" placeholder="Search" className="friend-search-input" value={searchQuery} onChange={handleSearchChange}/>
          </div>

          <div className="results-container">
            {searchQuery ? (
              results.length > 0 ? (
                results.map((user, index) => (
                  <div key={index} className="result-item" onClick={() => addFriend(user)}>
                    {user}
                  </div>
                ))
              ) : (
                <div className="no-results">No users match your search.</div>
              )
            ) : (
              <div className="placeholder">Discover more people who think alike.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;
