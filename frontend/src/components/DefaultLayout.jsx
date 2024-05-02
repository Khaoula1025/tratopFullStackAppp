import React, { useContext, useEffect, useRef } from "react";
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
import { PowerIcon } from "@heroicons/react/24/solid";
import { FaHome, FaInfoCircle, FaUser, FaEnvelope } from "react-icons/fa"; // Import icons
import axiosClient from "../axios-client";

export default function DefaultLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const openSidebarButtonRef = useRef(null);
  const { user, setUser, token, setToken, role, setRole } = useStateContext();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        openSidebarButtonRef.current &&
        !openSidebarButtonRef.current.contains(event.target)
      ) {
        setIsSidebarOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const navigate = useNavigate(); // Add this line
  //const { travauType } = useParams();
  useEffect(() => {
    // Load the user's role from local storage
    const storedRole = localStorage.getItem("userRole");
    if (storedRole && role === null) {
      // Check if role is not already set
      // Update the role in your state context
      setRole(storedRole);
    }
  }, []);

  console.log(user);
  const logout = async (ev) => {
    ev.preventDefault();

    try {
      await axiosClient.post("/logout");
      setUser({});
      setToken(null);
      localStorage.removeItem("userRole");
      setRole(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (!token) {
    return <Navigate to="/LandingPage" />;
  }

  return (
    <div class="bg-gray-100">
      <div class="h-screen flex overflow-hidden bg-gray-200">
        {/* <!-- Sidebar --> */}
        <div
          className={`absolute bg-gray-400 text-white w-56 min-h-screen overflow-y-auto transition-transform ${
            isSidebarOpen ? "" : "transform -translate-x-full"
          } ease-in-out duration-300 rounded-r-lg shadow-lg`}
          ref={sidebarRef}
        >
          {/* <!-- Your Sidebar Content --> */}
          <div className="p-4">
            <ul className="mt-4">
              <li className="mb-2">
                <Link to="/">
                  <a
                    href="#"
                    className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-lg"
                  >
                    <FaHome className="h-5 w-5" />
                    <span>Home</span>
                  </a>
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/historique">
                  <a
                    href="#"
                    className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-lg"
                  >
                    <FaInfoCircle className="h-5 w-5" />
                    <span>Historique</span>
                  </a>
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/profil">
                  <a
                    href="#"
                    className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-lg"
                  >
                    <FaUser className="h-5 w-5" />
                    <span>Profil</span>
                  </a>
                </Link>
              </li>
              {role === "admin" && (
                <li className="mb-2">
                  <Link to="/getionDesUtilisateurs">
                    <a
                      href="#"
                      className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-lg"
                    >
                      <FaUser className="h-5 w-5" />
                      <span>gestion des utilisataurs</span>
                    </a>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* <!-- Content --> */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* <!-- Navbar --> */}
          <div className="bg-gray-600 shadow">
            <div className="container mx-auto">
              <div className=" flex justify-between py-4 px-2">
                <div>
                  <img src="/logo.png" className="h-20 " alt="tra top Logo" />
                </div>

                <div className="flex items-center  ">
                  <button
                    type="button"
                    className="max-w-[140px]   py-2 px-4 flex justify-center mr-1 items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                    onClick={logout}
                  >
                    <PowerIcon className="h-5 w-5" />
                    Logout
                  </button>
                  <button
                    className="text-gray-500 hover:text-gray-600"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    ref={openSidebarButtonRef}
                  >
                    <svg
                      class="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Content Body --> */}
          <div className="flex-1 overflow-auto p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
