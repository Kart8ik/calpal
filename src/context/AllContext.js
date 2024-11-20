import React, { useState } from "react";
import { createContext } from "react";
import apiRequest from "../pages/apiRequest";
const AllContext = createContext();

export const AllProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState({});
    const [users, setUsers] = useState([]);
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState({})

    const getUsersData = async () => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const data = await apiRequest("http://localhost:8080/api/users", options)
        if (!data) return;
        setUsers(data)
        console.log('Users imported properly')
    }

    const getGroups = async () => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        console.log("Fetching groups data...");
        const data = await apiRequest("http://localhost:8080/api/groups", options)
        if (!data) return;
        setGroups(data)
        console.log(data)
        console.log('imported group properly!')
    }

    const getGroup = async (groupName) => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        console.log("Fetching groups data...");
        const data = await apiRequest(`http://localhost:8080/api/groups/${groupName}`, options)
        if (!data) return;
        console.log(data.length)
        console.log('imported groups properly!')
        return (data)
    }

    const getUserData = async (username) => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const data = await apiRequest(`http://localhost:8080/api/users/${username}`, options)
        if (!userDetails.tasks || JSON.stringify(userDetails.tasks) !== JSON.stringify(data.tasks)) {
            setUserDetails(data)
        }

        console.log('Users imported properly')
    }

    return (
        <AllContext.Provider value={{ userDetails, setUserDetails, users, setUsers, groups, setGroups, getUsersData, getUserData, getGroups, getGroup, selectedGroup, setSelectedGroup }}>
            {children}
        </AllContext.Provider>
    )
}

export default AllContext