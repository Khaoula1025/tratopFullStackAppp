import React, { useState } from "react";
import formFields from "../formFields.json";
import { useNavigate } from "react-router-dom";

function Travaux() {
  const navigate = useNavigate();

  function handleType(travauxType) {
    navigate(`/DynamicForm/${travauxType}`);
  }

  return (
    <div className="max-w-sm mx-auto grid gap-6 lg:grid-cols-4 lg:max-w-none">
      {formFields.data[0].travauxType.map((travaux, key) => (
        <div
          key={key}
          className="flex flex-col h-full bg-slate-300 border border-slate-200 shadow-2xl rounded-2xl overflow-hidden justify-center items-center transform transition-all duration-500 ease-in-out hover:bg-slate-400 hover:scale-105 cursor-pointer"
          onClick={() => handleType(travaux.label)}
        >
          <img
            className="object-cover h-32 w-full"
            src={travaux.image}
            alt="Course 01"
          />
          <div className="flex-1 flex flex-col p-4">
            <div className="flex-1">
              <header className="mb-2">
                <h2 className="text-base font-semibold leading-normal text-center">
                  <a
                    className="text-white focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300"
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
