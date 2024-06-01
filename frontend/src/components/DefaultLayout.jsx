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
import { DynamicForm } from "./DynamicForm";
import { PowerIcon } from "@heroicons/react/24/solid";
import { FaHome, FaInfoCircle, FaUser, FaHistory } from "react-icons/fa";
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

  const navigate = useNavigate();
  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    if (storedRole && role === null) {
      setRole(storedRole);
    }
  }, []);

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
    <div className="min-h-screen bg-gray-50">
      <div className="h-screen flex overflow-hidden">
        {/* Sidebar */}
        <div
          className={`fixed z-40 inset-y-0 left-0 text-gray-900 shadow-md w-64 transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:relative md:translate-x-0 bg-gradient-to-r bg-slate-500`}
          ref={sidebarRef}
        >
          <div className="p-4">
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  to="/"
                  className="flex items-center space-x-2 p-2 rounded-md  hover:bg-red-400 "
                >
                  <FaHome className="h-5 w-5 text-white" />
                  <span className="text-white">Home</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/mesOperations"
                  className="flex items-center space-x-2 p-2 rounded-md  hover:bg-red-400"
                >
                  <FaHistory className="h-5 w-5 text-white" />
                  <span className="text-white">Mes Operations</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/historique"
                  className="flex items-center space-x-2 p-2 rounded-md  hover:bg-red-400"
                >
                  <FaInfoCircle className="h-5 w-5 text-white" />
                  <span className="text-white">Historique</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/profil"
                  className="flex items-center space-x-2 p-2 rounded-md  hover:bg-red-400"
                >
                  <FaUser className="h-5 w-5 text-white" />
                  <span className="text-white">Profil</span>
                </Link>
              </li>
              {role === "admin" && (
                <li>
                  <Link
                    to="/getionDesUtilisateurs"
                    className="flex items-center space-x-2 p-2 rounded-md  hover:bg-red-400"
                  >
                    <FaUser className="h-5 w-5 text-white" />
                    <span className="text-white">Gestion des Utilisateurs</span>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Navbar */}
          <div className=" shadow-md">
            <div className="container mx-auto">
              <div className="flex justify-between items-center py-4 px-6">
                <Link to="/">
                  <img
                    src="/logo.png"
                    className="h-10 w-auto"
                    alt="Tra Top Logo"
                  />
                </Link>
                <div className="flex items-center space-x-4">
                  <button
                    className="text-gray-900 md:hidden"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    ref={openSidebarButtonRef}
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16m-7 6h7"
                      ></path>
                    </svg>
                  </button>
                  <button
                    onClick={logout}
                    className="flex items-center space-x-2 p-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    <PowerIcon className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <main className="flex-1 overflow-auto p-6 bg-gray-100">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
