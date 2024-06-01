import React from "react";
import "../App.css";
import Typewriter from "typewriter-effect";
import Login from "./Login";
import { Link } from "react-router-dom";

const HomeHome = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-500 to-red-600">
      <div className="bg-gray-300 shadow-2xl rounded-lg flex flex-col md:flex-row  ">
        <div className="flex flex-col items-center justify-center space-y-4 relative p-8 md:p-4">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Bienvenue dans notre Platforme
          </h1>
          <div className="text-xl text-gray-600">
            <Typewriter
              options={{
                strings: ["Vos données, ", "notre attention:", "Succeed."],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
          <div className="w-64 h-64 flex items-center justify-center relative">
            <img
              src="/logo.png"
              className="absolute w-full bottom-0  object-contain"
              alt="Platform"
            />
          </div>
        </div>
        <div className=" w-full md:w-80 p-8 flex rounded-lg items-center justify-center text-gray-800 rounded-b-lg md:rounded-l-lg md:rounded-b-none">
          <Login />
        </div>
      </div>
    </div>
  );
};

export default HomeHome;
