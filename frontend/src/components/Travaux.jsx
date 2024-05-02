import React, { useState } from "react";
import formFields from "../formFields.json";
import { useNavigate } from "react-router-dom";

function Travaux() {
  const navigate = useNavigate();

  function handleType(travauType) {
    navigate(`/DynamicForm/${travauType}`); // Adjusted path based on your comment
  }

  return (
    <div className="max-w-xs mx-auto grid gap-6 lg:grid-cols-4   lg:max-w-none   ">
      {formFields.data[0].travauxType.map((travaux, key) => (
        <div
          key={key}
          className="flex flex-col h-full  bg-white border border-slate-200 shadow shadow-slate-950/5 rounded-2xl overflow-hidden justify-center items-center"
          onClick={() => handleType(travaux.label)} // Directly handle click to navigate
        >
          {/* Image */}
          <img
            className="object-cover h-48 w-full"
            src={travaux.image}
            width="304"
            height="192"
            alt="Course 01"
          />
          {/* Card Content */}
          <div className="flex-1 flex flex-col p-6">
            {/* Card body */}
            <div className="flex-1">
              {/* Header */}
              <header className="mb-2">
                <h2 className="text-xl font-extrabold leading-snug">
                  <a
                    className="text-slate-900 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300"
                    href="#0"
                  >
                    {travaux.name}
                  </a>
                </h2>
              </header>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Travaux;
