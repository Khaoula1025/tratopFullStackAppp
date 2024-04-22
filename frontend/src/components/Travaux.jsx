import React from "react";
// import data from "../data.json";
function Travaux() {
  return (
    <div className="max-w-xs mx-auto grid gap-6 lg:grid-cols-3 items-start lg:max-w-none">
      {data.data[0].type.map((travaux, key) => (
        <div
          key
          class="flex flex-col h-full bg-white border border-slate-200 shadow shadow-slate-950/5 rounded-2xl overflow-hidden"
        >
          {/* Image */}
          <img
            class="object-cover h-48 w-full"
            src={travaux.image}
            width="304"
            height="192"
            alt="Course 01"
          />
          {/* {/* Card Content */}
          <div class="flex-1 flex flex-col p-6">
            {/* Card body */}
            <div class="flex-1">
              {/* <!-- Header */}
              <header class="mb-2">
                <h2 class="text-xl font-extrabold leading-snug">
                  <a
                    class="text-slate-900 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300"
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
