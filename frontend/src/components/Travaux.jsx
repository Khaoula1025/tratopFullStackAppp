import React from "react";
import data from "../data.json";
function Travaux() {
  return (
    <div className="max-w-xs mx-auto grid gap-6 lg:grid-cols-3 items-start lg:max-w-none">
      {data.data[0].type.map((travaux, key) => (
        // <div
        //   key={key}
        //   className="h-full rounded-lg bg-white text-center shadow-lg dark:bg-neutral-700"
        // >
        //   <a href="#">
        //     <img
        //       className="rounded-t-lg w-full h-48 object-cover"
        //       src={travaux.image}
        //       alt=""
        //     />
        //   </a>
        //   <div className="p-5">
        //     <a href="#">
        //       <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        //         {travaux.name}
        //       </h5>
        //     </a>
        //     <a
        //       href="#"
        //       className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        //     >
        //       Read more
        //       <svg
        //         className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
        //         aria-hidden="true"
        //         xmlns="http://www.w3.org/2000/svg"
        //         fill="none"
        //         viewBox="0 0 14 10"
        //       >
        //         <path
        //           stroke="currentColor"
        //           strokeLinecap="round"
        //           strokeLinejoin="round"
        //           strokeWidth="2"
        //           d="M1 5h12m0 0L9 1m4 4L9 9"
        //         />
        //       </svg>
        //     </a>
        //   </div>
        // </div>
        // Card
        <div class="flex flex-col h-full bg-white border border-slate-200 shadow shadow-slate-950/5 rounded-2xl overflow-hidden">
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
