import React, { useContext } from "react";
import { Outlet, useNavigate, Navigate, Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axios from "axios"; // Make sure to install axios if you haven't already
import Travaux from "./Travaux";
import { DynamicForm } from "./DynamicForm";

export default function DefaultLayout() {
  const { user, token, setUser, setToken } = useStateContext();
  const navigate = useNavigate(); // Add this line

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
        <header className="bg-gray-700 text-white p-4 flex justify-between items-center">
          <Link to="#" className="text-white">
            <img src="/logo.png" className="h-24" alt="tra top Logo" />
          </Link>
          <div>
            <Link className="text-white">User information: {user.name}</Link>
            <button
              type="button"
              className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </header>
        {/* Main content */}
        <main className="p-4">
          <DynamicForm travauType="forCada" />
          {/* <Outlet /> */}
        </main>
      </div>
    </div>
  );
}
