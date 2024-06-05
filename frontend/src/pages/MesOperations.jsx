import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MesOperations() {
  const [operations, setOperations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [type, setType] = useState("single");

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

        const response = await axios.get(`/api/history/${type}`, config);
        const fetchedOperations = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        setOperations(fetchedOperations);
      } catch (error) {
        console.error("Failed to fetch user operations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserOperations();
  }, [type]);

  const handleDelete = async (id, travauxType) => {
    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.delete(`/api/${travauxType}/${id}`, config);
      if (response.data.success) {
        setOperations((prevOperations) =>
          prevOperations.filter((operation) => operation.id !== id)
        );
        toast.success("Operation deleted successfully.");
      } else {
        toast.error("Failed to delete operation.");
      }
    } catch (error) {
      console.error("Failed to delete operation:", error);
      toast.error("There was an error deleting the operation.");
    }
  };

  const getTableHeaders = () => {
    if (Array.isArray(operations) && operations.length > 0) {
      return Object.keys(operations[0]).filter((key) => key !== "user_name");
    }
    return [];
  };

  const operationTypes = [
    ...new Set(operations.map((operation) => operation.type)),
  ];

  return (
    <div className="flex flex-col p-5 bg-gray-50 min-h-screen">
      <ToastContainer />
      <h1 className="text-4xl font-bold mb-5 text-gray-800">Your Operations</h1>
      {isLoading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : operations.length === 0 ? (
        <p className="text-center text-gray-600">No operations found.</p>
      ) : (
        <>
          {operationTypes.map((operationType) => (
            <div key={operationType} className="w-full mb-5">
              <h2 className="text-2xl font-semibold mb-3 text-gray-800">
                {operationType}
              </h2>
              <div className="overflow-x-auto shadow-md rounded-md">
                <table className="w-full text-center border-collapse">
                  <thead>
                    <tr>
                      {getTableHeaders().map((header, index) => (
                        <th
                          key={index}
                          className="px-4 py-2 bg-blue-500 text-white"
                        >
                          {header}
                        </th>
                      ))}
                      <th className="px-4 py-2 bg-blue-500 text-white">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {operations
                      .filter((operation) => operation.type === operationType)
                      .map((operation, index) => (
                        <tr
                          key={index}
                          className={
                            index % 2 === 0 ? "bg-gray-100" : "bg-white"
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
                                  Link
                                </a>
                              ) : (
                                operation[header]
                              )}
                            </td>
                          ))}
                          <td className="border px-4 py-2">
                            <button
                              onClick={() =>
                                handleDelete(operation.id, operation.type)
                              }
                              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
