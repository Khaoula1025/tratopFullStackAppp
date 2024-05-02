import React, { useState, useRef, useEffect } from "react";

export default function NavbarAndSideBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const openSidebarButtonRef = useRef(null);

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

  return (
    <div class="bg-gray-100">
      <div class="h-screen flex overflow-hidden bg-gray-200">
        {/* <!-- Sidebar --> */}
        <div
          className={`absolute bg-gray-800 text-white w-56 min-h-screen overflow-y-auto transition-transform ${
            isSidebarOpen ? "" : "transform -translate-x-full"
          } ease-in-out duration-300`}
          ref={sidebarRef}
        >
          {/* <!-- Your Sidebar Content --> */}
          <div class="p-4">
            <h1 class="text-2xl font-semibold">Sidebar</h1>
            <ul class="mt-4">
              <li class="mb-2">
                <a href="#" class="block hover:text-indigo-400">
                  Home
                </a>
              </li>
              <li class="mb-2">
                <a href="#" class="block hover:text-indigo-400">
                  About
                </a>
              </li>
              <li class="mb-2">
                <a href="#" class="block hover:text-indigo-400">
                  Services
                </a>
              </li>
              <li class="mb-2">
                <a href="#" class="block hover:text-indigo-400">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* <!-- Content --> */}
        <div class="flex-1 flex flex-col overflow-hidden">
          {/* <!-- Navbar --> */}
          <div class="bg-white shadow">
            <div class="container mx-auto">
              <div class="flex justify-between items-center py-4 px-2">
                <h1 class="text-xl font-semibold">Animated Drawer</h1>

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
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {/* <!-- Content Body --> */}
          <div class="flex-1 overflow-auto p-4"></div>
        </div>
      </div>
    </div>
  );
}
