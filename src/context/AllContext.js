import React, { useState } from "react";
import { createContext } from "react";
import apiRequest from "../pages/apiRequest";
const AllContext = createContext();
    
export const AllProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState({});
    const [users, setUsers] = useState([]);
    const [groups, setGroups] = useState([]);
    const [tasks,setTasks] = useState([]);

    const getUsersData = async()=>{
        const options = {
            method:'GET',
            headers:{
              'Content-Type':'application/json'
            }
          }
        try {
            const data = await apiRequest("http://localhost:8080/api/users",options)
            setUsers(data)
            console.log('Users imported properly')
        } catch (error) {
            console.log('error in importing users')
            console.log(error)
        }
    }
    
    const getUserData = async(username)=>{
        const options = {
            method:'GET',
            headers:{
              'Content-Type':'application/json'
            }
          }
        try {
            const data = await apiRequest(`http://localhost:8080/api/users/${username}`,options)
            if (JSON.stringify(userDetails.tasks) !== JSON.stringify(data.tasks)) {
                // setUserDetails((prev) => ({ ...prev, tasks: data.tasks }));
                setUserDetails(data)
              }
            
            console.log('Users imported properly')
        } catch (error) {
            console.log('error in importing users')
            console.log(error)
        }
    }

    return (
        <AllContext.Provider value={{userDetails,setUserDetails,users,setUsers,groups,setGroups,tasks,setTasks,getUsersData,getUserData}}>
            {children}
        </AllContext.Provider>
    )
}

export default AllContext