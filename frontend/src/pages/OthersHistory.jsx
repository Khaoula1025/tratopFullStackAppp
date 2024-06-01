import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import UpdateModal from "../components/UpdateModal";

export default function Historique() {
  const [operations, setOperations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [type, setType] = useState("All"); // Default type
  const typeRef = useRef(); // Reference to the select input
  const [isModalOpen, setIsModelOpen] = useState(false);

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
      let url = `/api/history/${typeRef.current.value}`; // Use the selected type
      const response = await axios.get(url, config);
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

  const getTableHeaders = () => {
    if (Array.isArray(operations) && operations.length > 0) {
      console.log("operations", operations);
      const filteredHeaders = Object.keys(operations[0]).filter(
        (key) => key !== "type"
      );
      return [...filteredHeaders, "actions"];
    }
    return [];
  };
  console.log("get table headers", getTableHeaders());
  const operationTypes = [
    "travaux_cadastre",
    "travaux_topographique",
    "travaux_ife",
    "travaux_3d_drone",
    "travaux_3d_slam",
    "travaux_3d_gls",
    "travaux_3d_mms",
  ];
  console.log(operationTypes);
  function displayedType() {
    if (typeRef.current.value === "All") {
      // Return all operation types when "All" is selected
      return operationTypes;
    } else {
      // Return only the selected type
      return [typeRef.current.value];
    }
  }

  const toggleModal = () => {
    setIsModelOpen(!isModalOpen);
  };

  return (
    <div className="flex flex-col ">
      <h1 className="text-3xl font-bold mb-5 mt-5">Others Operations</h1>
      {/* search bar */}
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
        <div className="flex">
          <input
            type="text"
            placeholder="Search"
            className="w-full md:w-80 px-3 h-10 rounded-l border-2 border-gray-500 focus:outline-none focus:border-gray-500"
          />
          <button
            type="submit"
            className="bg-gray-500 text-white rounded-r px-2 md:px-3 py-0 md:py-1"
          >
            rechercher
          </button>
        </div>
        <select
          id="operationType"
          name="operationType"
          ref={typeRef}
          className="h-10 border-2 border-gray-500 focus:outline-none focus:border-gray-500 text-gray-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
        >
          <option value="All">All</option>
          {operationTypes.map((operationType) => (
            <option key={operationType} value={operationType}>
              {operationType}
            </option>
          ))}
        </select>
      </form>
      <div></div>
      {isLoading ? (
        <p>Loading...</p>
      ) : operations.length === 0 ? (
        <p>No operations found.</p>
      ) : (
        <>
          {displayedType().map((operationType) => (
            <div key={operationType} className="w-full">
              <h2 className="text-3xl font-semibold mb-3 text-gray-900 text-center p-2 rounded">
                {operationType}
              </h2>
              <table className="w-full text-center border-collapse overflow-x-auto">
                <thead>
                  <tr>
                    {getTableHeaders().map((header, index) => (
                      <th
                        key={index}
                        className="px-4 py-2 bg-gray-500 text-white font-semibold"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {operations
                    .filter((operation) => operation.type === operationType)
                    .map((operation, index) => (
                      <tr
                        key={index}
                        className={
                          index % 2 === 0 ? "bg-gray-100" : "bg-gray-300"
                        }
                      >
                        {getTableHeaders().map((header, index) => (
                          <td key={index} className="border px-4 py-2">
                            {[
                              "rattachement",
                              "croquis_de_levé",
                              "vidage",
                              "image",
                            ].includes(header) ? (
                              <a
                                href={`${operation[header]}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:text-blue-700"
                              >
                                link
                              </a>
                            ) : header === "actions" ? (
                              <td className="flex flex-row justify-between">
                                <button
                                  onClick={toggleModal}
                                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                >
                                  Update
                                </button>
                                <button
                                  onClick={() => handleDelete(operation.id)}
                                  className="bg-red-500 text-white px-4 py-2 rounded"
                                >
                                  Delete
                                </button>
                              </td>
                            ) : (
                              operation[header]
                            )}
                          </td>
                        ))}
                        {isModalOpen && (
                          <UpdateModal
                            isOpen={isModalOpen}
                            setIsOpen={setIsModelOpen}
                            travauxType={operation.type}
                            id={operation.id}
                          />
                        )}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
