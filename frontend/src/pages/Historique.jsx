import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStateContext } from "../context/ContextProvider";

export default function Historique() {
  const [operations, setOperations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserOperations = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("ACCESS_TOKEN");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get("/api/history", config);
        // Ensure operations is always an array
        setOperations(Array.isArray(response.data) ? response.data : []);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch user operations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserOperations();
  }, []);

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

  return (
    <div className="flex flex-col ">
      <h1 className="text-3xl font-bold mb-5">Your Operations</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : operations.length === 0 ? (
        <p>No operations found.</p>
      ) : (
        <>
          {operationTypes.map((operationType) => (
            <div key={operationType} className="w-full">
              <h2 className="text-3xl font-semibold mb-3  text-gray-900 text-center p-2 rounded">
                {operationType}
              </h2>
              <table className="w-full text-left border-collapse overflow-x-auto">
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
                                href={`/files/${operation[header]}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:text-blue-700"
                              >
                                link
                              </a>
                            ) : (
                              operation[header]
                            )}
                          </td>
                        ))}
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
