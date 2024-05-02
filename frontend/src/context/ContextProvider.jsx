import { createContext, useState, useContext } from "react";

// Define the context with default values
const StateContext = createContext({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
  setRole: () => {}, // Add this line if you plan to update the role dynamically
});

// Define the context provider component
export const ContextProvider = ({ children }) => {
  // State for user and token
  const [user, setUser] = useState({});
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
  const [role, setRole] = useState(null); // Add this line
  // Function to set the token and update localStorage
  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token); // Corrected typo from "ACCES_TOKEN" to "ACCESS_TOKEN"
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };
  // Function to set the user and update the role
  const setUserAndRole = (user) => {
    setUser(user);
    console.log(user);
    setRole(user.role); // Update the role based on the user object
    localStorage.setItem("userRole", user.role);
  };
  // Provide the context values to child components
  return (
    <StateContext.Provider
      value={{
        user,
        token,
        role,
        setToken,
        setUser: setUserAndRole, // Use the updated function that also sets the role
        setRole, // Include the setRole function in the context value
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

// Custom hook to use the context
export const useStateContext = () => useContext(StateContext);
