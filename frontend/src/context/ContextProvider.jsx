import { createContext, useState, useContext } from "react";

// Define the context with default values
const StateContext = createContext({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
});

// Define the context provider component
export const ContextProvider = ({ children }) => {
  // State for user and token
  const [user, setUser] = useState({});
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));

  // Function to set the token and update localStorage
  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token); // Corrected typo from "ACCES_TOKEN" to "ACCESS_TOKEN"
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  // Provide the context values to child components
  return (
    <StateContext.Provider
      value={{
        user,
        token,
        setUser,
        setToken,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

// Custom hook to use the context
export const useStateContext = () => useContext(StateContext);
