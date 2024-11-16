import React from "react";
import { createContext } from "react";

const AllContext = createContext();
    const [userDetails, setUserDetails] = useState({});
    const [users, setUsers] = useState([]);
    const [groups, setGroups] = useState([]);
    

export const AllProvider = ({ children }) => {

    return (
        <AllContext.Provider value={{userDetails,setUserDetails,users,setUsers,groups,setGroups}}>
            {children}
        </AllContext.Provider>
    )
}