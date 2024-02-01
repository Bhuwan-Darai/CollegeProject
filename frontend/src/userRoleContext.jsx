/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const UserContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(
    localStorage.getItem("userRole") || null,
  );
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);

  console.log("user role in userprovider", userRole);
  console.log("userId is ", userId);

  const updatedUserRole = (role) => {
    setUserRole(role);
    // Store teh userRole in local stroage
    localStorage.setItem("userRole", role);
    console.log("User Role updated", role);
  };

  const updateUserId = (_id) => {
    setUserId(_id);
    //? store in local storage
    localStorage.setItem("userId", _id);
    console.log("updated Id ", _id);
  };

  const logout = () => {
    // Clear the user role from the storage
    localStorage.removeItem("userRole");
    //  Set the userRole to empty
    setUserRole({});
    console.log("User logged out", userRole);

    localStorage.removeItem("userId", userId);
    setUserId({});
    console.log("NO user Id", userId);
  };

  return (
    <UserContext.Provider
      value={{ userRole, updatedUserRole, updateUserId, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};
