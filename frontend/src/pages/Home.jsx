// src/App.js
import React from "react";
import Login from "./Login";

export function Home() {
  return (
    <div
      className="flex justify-center items-center min-h-screen bg-blue-200 relative"
      style={{
        backgroundImage:
          "url('https://hotel-paradis-plage.web.app/img/Design.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col justify-center items-center w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-full flex justify-center items-center mb-8 mt-8">
          <img src="/logo.png" alt="Logo" className="w-32 h-32" />
        </div>
        <div className="w-full p-8">
          <Login />
        </div>
      </div>
    </div>
  );
}
