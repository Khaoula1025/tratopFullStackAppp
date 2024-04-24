import React, { useContext, useEffect } from "react";
import {
  Outlet,
  useNavigate,
  Navigate,
  Link,
  useParams,
} from "react-router-dom";
import { useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import axios from "axios"; // Make sure to install axios if you haven't already
import Travaux from "./Travaux";
import { DynamicForm } from "./DynamicForm";
import SideBar from "./SideBar";

export default function DefaultLayout() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  const { user, token, setUser, setToken } = useStateContext();
  const navigate = useNavigate(); // Add this line
  //const { travauType } = useParams();

  const logout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(null);
      setToken(null);

      navigate("/"); // Use navigate to redirect
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (!token) {
    return <Navigate to="/LandingPage" />;
  }

  return (
    <div className="flex">
      <div className="flex-grow">
        {/* Navbar */}
        <header className="bg-gray-400 text-white p-4 flex justify-between items-center">
          <Link to="#" className="text-white">
            <img src="/logo.png" className="h-16" alt="tra top Logo" />
          </Link>
          <div>
            <Link className="text-white">User information: {user.name}</Link>
          </div>
        </header>
        <div className="flex flex-row">
          {/* Sidebar */}
          <SideBar
            onLogout={logout}
            toggleSidebar={toggleSidebar}
            isSidebarVisible={isSidebarVisible}
          />
          {/* Main content */}
          <main className="p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
