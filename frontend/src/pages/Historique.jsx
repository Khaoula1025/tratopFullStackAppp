import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function Historique() {
  const [operations, setOperations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const formRef = useRef(); // Reference to the form
  const type = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      // Ensure the URL is correctly formatted to include the type as a path parameter
      let url = `/api/history/${type.current.value}`;
      const response = await axios.get(url, config);
      console.log(response.data);
      if (response.data.message === "Operations fetched successfully.") {
        setOperations(
          Array.isArray(response.data.data) ? response.data.data : []
        );
      } else {
        console.error(
          "Backend failed to fetch operations:",
          response.data.message
        );
      }
    } catch (error) {
      console.error("Failed to fetch user operations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Rest of your component code remains the same

  const getTableHeaders = () => {
    if (Array.isArray(operations) && operations.length > 0) {
      return Object.keys(operations[0]);
    }
    return [];
  };

  // Identify unique operation types
  const operationTypes = [
    ...new Set(operations.map((operation) => operation.type)),
  ];
  console.log(operations);

  return (
    <div className="flex flex-col ">
      <h1 className="text-3xl font-bold mb-5 mt-5">Others Operations</h1>
      {/* search bar */}
      <form class="flex flex-col md:flex-row gap-3" onSubmit={handleSubmit}>
        <div class="flex">
          <input
            type="text"
            placeholder="....."
            class="w-full md:w-80 px-3 h-10 rounded-l border-2 border-gray-500 focus:outline-none focus:border-gray-500"
          />
          <button
            type="submit"
            class="bg-gray-500 text-white rounded-r px-2 md:px-3 py-0 md:py-1"
          >
            rechercher
          </button>
        </div>
        <select
          id="pricingType"
          name="pricingType"
          ref={type}
          class=" h-10 border-2 border-gray-500 focus:outline-none focus:borde-gray-500 text-gray-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
        >
          <option value="All">All</option>
          <option value="travaux_cadastre">travaux cadastre</option>
          <option value="travaux_topographique">travaux topographique</option>
          <option value="travaux_ife">travaux IFE</option>
          <option value="travaux_3d_drone">travaux 3D materiel: drone"</option>
          <option value="travaux_3d_slam">travaux 3D materiel: slam </option>
          <option value="travaux_3d_gls">travaux 3D materiel: gls</option>
          <option value="travaux_3d_mms">travaux 3D materiel: mms</option>
        </select>
      </form>
      <div></div>
      {isLoading ? (
        <p>Loading...</p>
      ) : operations.length === 0 ? (
        <p>No operations found.</p>
      ) : (
        <>
          {operationTypes.map((operationType) => (
            <div key={operationType} className="w-full"></div>
          ))}
        </>
      )}
    </div>
  );
}
